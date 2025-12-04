<?php

namespace App\Http\Controllers;

use App\Http\Requests\CandidateRequest;
use App\Jobs\SendRegistrationEmailJob;
use App\Models\Booking;
use App\Models\Candidate;
use App\Services\FileStorageService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Throwable;
use Carbon\Carbon;
use Yajra\DataTables\Facades\DataTables;

class CandidateController extends Controller
{

    public $fileStorageService;
    public function __construct(FileStorageService $fileStorageService)
    {
        $this->fileStorageService = $fileStorageService;
    }
    /**
     * Show all candidates
     */
    public function list(Request $request)
    {
        if ($request->ajax()) {
            $status = $request->get('status', 'active');
            
           $query = Candidate::query();

            if ($status !== 'all') {
                $query->where('status', $status);
            }

            $data = $query->latest('id')->get();

            return DataTables::of($data)
                ->addColumn('name', function ($row) {
                    $editUrl = route('candidate.edit', $row->id);
                    return '<a href="' . $editUrl . '" class="text-blue-600 hover:underline">' . $row->first_name . ' ' . $row->last_name . '</a>';
                })
               ->addColumn('photo', function ($row) {
                    $photoUrl = asset($row->photo ?: 'imagePH.png');
                    $subscription = $row->current_package_name ?? 'Free';

                    return '
                        <div style="position: relative; width: 60px; height: 60px;">
                            <img src="'.$photoUrl.'" 
                                style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                            
                            <span style="
                                position: absolute;
                                bottom: -4px;
                                right: -4px;
                                background: #1e40af;
                                color: #fff;
                                font-size: 9px;
                                padding: 2px 5px;
                                border-radius: 10px;
                                ">
                                '.$subscription.'
                            </span>
                        </div>';
                })

                ->addColumn('action', function ($row) {
                    if (!$row->deleted_at) {
                        if (checkAdminPermission('candidate.delete')) {
                        // $viewApplicationUrl = route('candidate.applications', $row->id);
                        $deleteUrl = route('candidate.delete', $row->id);
                        return '<form action="' . $deleteUrl . '" method="POST" style="display:inline-block; margin-left:5px;" onsubmit="return confirm(\'Are you sure you want to delete this?\')">
                                ' . csrf_field() . '
                                ' . method_field('DELETE') . '
                                <button type="submit" class="px-3 py-2 rounded-lg text-xs font-medium bg-red-400 text-white hover:bg-red-500 shadow-md transition">Delete</button>
                            </form>';
                        }    
                    }
                })
                ->addColumn('status', function ($row) {
                    $isChecked = $row->status === 'active' ? 'checked' : '';
                    $switchId  = 'toggle_' . $row->id;

                    if (checkAdminPermission('candidate.toggleStatus')) {
                        $toggleUrl = route('candidate.toggleStatus', $row->id);

                        return '
                            <form method="POST" action="'.$toggleUrl.'" class="m-0 p-0 d-inline toggle-form">
                                '.csrf_field().'
                                <div class="form-check form-switch ml-10 p-0">
                                    <input 
                                        type="checkbox" 
                                        class="form-check-input toggle-switch" 
                                        id="'.$switchId.'" 
                                        '.$isChecked.' 
                                        aria-label="Toggle status"
                                    >
                                </div>
                            </form>';
                    }
                })      
                ->editColumn('created_at', function ($row) {
                    return $row->created_at
                        ? Carbon::parse($row->created_at)
                            ->timezone(config('app.timezone'))
                            ->format('m-d-Y')
                        : '-';
                })
                ->rawColumns(['photo', 'name', 'action', 'status'])
                ->make(true);
        }
    
        return view('candidate.list');
    }
    

    /**
     * New candidate page
     */
    public function showRegistration()
    {
        return view('candidate.create');
    }

    /**
     * Add new Candidate
     */
    public function register(CandidateRequest $request)
    {
        $data = $request->validated();

        try {
            if ($request->hasFile('photo')) {
                $image = $request->file('photo');

                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'candidate');
                $data['photo'] = $imageUploadResponse['public_path'];
            }

            $plainPassword = (string) random_int(100000, 999999);
            $data['password'] = bcrypt($plainPassword);

            $candidate = Candidate::create($data);

            dispatch(new SendRegistrationEmailJob($candidate, $plainPassword));

            Toastr::success('Candidate Registered Successfully.');
            return redirect()->route('candidate.list');
        }
        catch (Throwable $e) {
            return $this->responseWithError($e->getMessage(), 'Something went wrong.');
        }
    }

    /**
     * Show Details
     */
    public function edit(string $id)
    {
        $candidate = Candidate::with('UserSubscriptions.package:id,name',
        'UserSubscriptions.subscriptionDetails.exam')->findOrFail($id);
        // return $candidate;
        return view('candidate.edit', compact('candidate'));
    }

    /**
     * Update Functionality
     */
    public function update(CandidateRequest $request, $id)
    {
        $candidate = Candidate::findOrFail($id);

        $data = $request->validated();

        if ($request->hasFile('photo')) {
            if ($candidate->photo) {
                // Update existing file in cloud
                $newFile = $request->file('photo');
                $fileToDelete = $candidate->photo;
                $imageUploadResponse = $this->fileStorageService->updateFileFromCloud($fileToDelete, $newFile);

                $data['photo'] = $imageUploadResponse['public_path'];
            } else {
                // Upload new image
                $image = $request->file('photo');
                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'candidate');
                $data['photo'] = $imageUploadResponse['public_path'];
            }
        }

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $candidate->update($data);

        Toastr::success('Candidate Updated Successfully.');

        return redirect()->back();
    }

    /**
     * Soft delete candidate
     */
    public function destroy($id)
    {
        $candidate = Candidate::findOrFail($id);
        $candidate->delete();

        Toastr::success('Candidate Deleted Successfully.');
        return redirect()->route('candidate.list');
    }

    /**
     * Restore candidate
     */
    public function toggleStatus($id)
    {
        try {
            $candidate = Candidate::findOrFail($id);

            if ($candidate->status == 'active') {
                $candidate->status = 'frozen';
                $candidate->save();
            } else {
                $candidate->status = 'active';
                $candidate->save();
            }
            Toastr::success('Status changed successfully.');
            return redirect()->route('candidate.list');
        } catch (\Exception $e) {
            Toastr::success('Status not changed');
            return redirect()->route('candidate.list');
        }
    }

    public function candidateApplications($candidateId)
    {

        $bookings = [];

        return view('candidate.applications', compact('bookings'));
    }



    public function resetPassword(Request $request, $id)
    {
        $validate=Validator::make($request->all(),[
            'new_password' => 'required|string|min:6',
            'admin_password' => 'required|string',
        ]);

        if($validate->fails())
        {
            Toastr::error($validate->getMessageBag());
            return redirect()->back();
        }

        if (!Hash::check($request->admin_password, auth()->user()->password)) {
            
            Toastr::error("Invalid admin password.");
            return redirect()->back();
        }

        $candidate = Candidate::findOrFail($id);
        $candidate->password = bcrypt($request->new_password);
        $candidate->save();

        Toastr::success("Password reset successfully.");
        return redirect()->back();
    }
}
