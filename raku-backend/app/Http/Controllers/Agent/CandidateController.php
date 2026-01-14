<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Http\Requests\CandidateRequest;
use App\Jobs\SendBatchRegistrationEmailJob;
use App\Jobs\SendRegistrationEmailJob;
use App\Models\Candidate;
use App\Models\FileProcess;
use App\Models\Package;
use App\Models\PackageDetail;
use App\Models\UserSubscription;
use App\Models\UserSubscriptionDetails;
use App\Services\FileStorageService;
use Brian2694\Toastr\Facades\Toastr;
use Throwable;
use Carbon\Carbon;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CandidateController extends Controller
{
    public $fileStorageService;
    public function __construct(FileStorageService $fileStorageService)
    {
        $this->fileStorageService = $fileStorageService;
    }

    public function importCandidatesCSV(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'csv_file' => 'required|file|mimes:csv,txt|max:5120'
        ]);

        if ($validate->fails()) {
            Toastr::error($validate->errors()->first());
            return redirect()->back();
        }

        $expectedHeaders = [
            'Name Prefix',
            'First Name',
            'Last Name',
            'Sur Name',
            'Email',
            'Date of Birth',
            'Phone',
            'Nationality',
            'NID/Passport',
            'Address'
        ];

        $file = $request->file('csv_file');
        $path = $file->getRealPath();
        $originalName = $file->getClientOriginalName();

        $fileProcess = FileProcess::create([
            'user_id' => auth('agent')->id(),
            'process_name' => 'candidate_csv_import',
            'file_name' => $originalName,
            'status' => 'processing',
            'error_message' => null,
        ]);

        DB::beginTransaction();

        $autoPackage = Package::with('package_details')
            ->where('assign_on_agent_import', true)
            ->where('is_active', true)
            ->where('status', 1)
            ->orderByDesc('id')
            ->first();
    
        $packageDetails = $autoPackage?->package_details ?? collect();
    
        $rows = [];
        if (($handle = fopen($path, 'r')) !== false) {
            while (($data = fgetcsv($handle, 0, ',')) !== false) {
                $rows[] = $data;
            }
            fclose($handle);
        }

        $headers = array_map('trim', $rows[0]);

        if (count($headers) !== count($expectedHeaders)) {
            $msg = 'CSV file has wrong number of columns.';
            $fileProcess->update(['status' => 'failed', 'error_message' => $msg]);
            DB::rollBack();
            Toastr::error($msg);
            return redirect()->back();
        }

        foreach ($expectedHeaders as $i => $expected) {
            if (strtolower($headers[$i]) !== strtolower($expected)) {
                $msg = "Invalid CSV format. Expected '{$expected}', got '{$headers[$i]}' at column " . ($i + 1);
                $fileProcess->update(['status' => 'failed', 'error_message' => $msg]);
                DB::rollBack();
                Toastr::error($msg);
                return redirect()->back();
            }
        }

        unset($rows[0]);

        $importedCount = 0;
        $existCount = 0;
        $skippedCount = 0;

        try {
            foreach ($rows as $row) {
                $row = array_map('trim', $row);

                if (empty(array_filter($row)) || count($row) < 10) {
                    $skippedCount++;
                    continue;
                }

                [$prefix, $first, $last, $surname, $email, $dob, $phone, $nationality, $nid, $address] = $row;

                $email = strtolower(trim($email));
                if (!$email) {
                    $skippedCount++;
                    continue;
                }

                $email = sanitizeEmail($email);

                $candidate = Candidate::where('email', strtolower($email))->first();

                if ($candidate) { $existCount++; continue; }

                if (!$candidate) {
                    $dateOfBirth = ($dob === '') ? null : Carbon::parse($dob)->format('Y-m-d');

                    $gender = 'unknown';
                    if ($prefix === 'Mr.' || strtolower($prefix) === 'mr') $gender = 'male';
                    if (in_array($prefix, ['Ms.', 'Mrs.']) || in_array(strtolower($prefix), ['ms', 'mrs'])) $gender = 'female';
    
                    $initialPassword = (string) random_int(100000, 999999);
                    $candidateCode = $this->generateCandidateCode();

                    $newCandidate = Candidate::create([
                        'prefix' => $prefix ?: null,
                        'first_name' => $first,
                        'last_name' => $last ?: null,
                        'surname' => $surname ?: null,
                        'email' => $email,
                        'password' => Hash::make($initialPassword),
                        'date_of_birth' => $dateOfBirth,
                        'phone_number' => $phone ?: null,
                        'nationality' => $nationality ?: null,
                        'national_id' => $nid ?: null,
                        'address' => $address ?: null,
                        'gender' => $gender,
                        'agent_id' => auth('agent')->id(),
                        'candidate_code' => $candidateCode,
                        'status' => 'active',
                        'is_email_verified' => 0,
                        'is_phone_verified' => 0,
                        'is_subscribed' => 0,
                        'is_free' => 0,
                        'otp_reset_attempts' => 0,
                        'currently_living_country' => 'Bangladesh'
                    ]);

                    $newCandidates[] = [
                        'email' => strtolower($email),
                        'password' => $initialPassword
                    ];
    
                    if ($autoPackage) {
                        $subscription = UserSubscription::create([
                            'candidate_id' => $newCandidate->id,
                            'package_id' => $autoPackage->id,
                            'tran_id' => (string) Str::uuid(),
                            'status' => 'confirmed',
                            'payment_status' => 'success',
                            'total_payable' => (float) $autoPackage->price,
                            'updated_by' => auth('agent')->id(),
                            'title' => $autoPackage->name,
                        ]);
    
                        if ($packageDetails->isNotEmpty()) {
                            foreach ($packageDetails as $pd) {
                                UserSubscriptionDetails::create([
                                    'user_subscription_id' => $subscription->id,
                                    'package_details_id' => $pd->id,
                                    'exam_id' => $pd->exam_id,
                                    'max_exam_attempt' => $pd->max_exam_attempt,
                                    'used_exam_attempt' => 0,
                                ]);
                            }
                        }
    
                        $newCandidate->update([
                            'user_subscriptions_id' => $subscription->id,
                            'current_package_id' => $autoPackage->id,
                            'current_package_name' => $autoPackage->name,
                            'is_subscribed' => 1,
                            'is_free' => ((float) $autoPackage->price <= 0) ? 1 : 0,
                        ]);
                    }
                    $importedCount++;
                }
            }

            if (!empty($newCandidates)) {
                dispatch(new SendBatchRegistrationEmailJob($newCandidates));
                Log::info('job done');
            } else {
                Log::info('no new candidates');
            }

            DB::commit();
            $fileProcess->update([
                'status' => 'success',
                'error_message' => null,
            ]);

            Toastr::success("Imported: {$importedCount}. Exists: {$existCount}. Skipped: {$skippedCount}");
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollBack();

            if ($fileProcess) {
                $fileProcess->update([
                    'status' => 'failed',
                    'error_message' => $e->getMessage(),
                ]);
            }

            Log::info('error_message:');
            Log::info($e->getMessage());
            Toastr::error($e->getMessage());
            return redirect()->back();
        }
    }

    private function generateCandidateCode(): string
    {
        do {
            $code = 'CAND-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6));
            $exists = Candidate::where('candidate_code', $code)->exists();
        } while ($exists);

        return $code;
    }

    public function downloadSampleCandidateCSV()
    {
        $headers = ['Name Prefix', 'First Name', 'Last Name', 'Sur Name', 'Email', 'Date of Birth', 'Phone', 'Nationality', 'NID/Passport', 'Address'];

        $sampleRow = [
            'Mr.',
            'John',
            'Doe',
            'Doe',
            'john@example.com',
            '1998-01-15',
            '01700000000',
            'Bangladeshi',
            '1234567890',
            'Dhaka, Bangladesh',
        ];

        $fileName = 'candidate_format_sample.csv';

        $callback = function () use ($headers, $sampleRow) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $headers);
            fputcsv($file, $sampleRow);
            fclose($file);
        };

        return response()->streamDownload($callback, $fileName, [
            'Content-Type' => 'text/csv',
        ]);
    }


    public function showImportCandidatesPage()
    {
        $fileProcesses = FileProcess::where('process_name', 'candidate_csv_import')
            ->orderByDesc('id')
            ->limit(50)
            ->get();

        return view('agent-panel.candidate.import', compact('fileProcesses'));
    }


////////////////////////////////////***Manual Candidate Routes***////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

    public function list(Request $request)
    {
        if ($request->ajax()) {
            $status = $request->get('status', 'active');
            $query = Candidate::query();

            if ($status !== 'all') {
                $query->where('status', $status);
            }

            $data = $query->latest('id')->where('agent_id', auth('agent')->id())->get();

            return DataTables::of($data)
                ->addColumn('name', function ($row) {
                    $editUrl = route('agent.candidate.edit', $row->id);
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
                    // $viewApplicationUrl = route('candidate.applications', $row->id);
                    $deleteUrl = route('agent.candidate.delete', $row->id);
                    return '<form action="' . $deleteUrl . '" method="POST" style="display:inline-block; margin-left:5px;" onsubmit="return confirm(\'Are you sure you want to delete this?\')">
                            ' . csrf_field() . '
                            ' . method_field('DELETE') . '
                            <button type="submit" class="px-3 py-2 rounded-lg text-xs font-medium bg-red-400 text-white hover:bg-red-500 shadow-md transition">Delete</button>
                        </form>';
                    }    
                })
                ->addColumn('status', function ($row) {
                    $isChecked = $row->status === 'active' ? 'checked' : '';
                    $switchId  = 'toggle_' . $row->id;

                    $toggleUrl = route('agent.candidate.toggleStatus', $row->id);

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
    
        return view('agent-panel.candidate.list');
    }
    
    public function showRegistration()
    {
        return view('agent-panel.candidate.create');
    }

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
            $data['agent_id'] = auth('agent')->id();

            $candidate = Candidate::create($data);

            dispatch(new SendRegistrationEmailJob($candidate, $plainPassword));

            Toastr::success('Candidate Registered Successfully.');
            return redirect()->route('agent.candidate.list');
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
        return view('agent-panel.candidate.edit', compact('candidate'));
    }

    public function update(CandidateRequest $request, $id)
    {
        $candidate = Candidate::findOrFail($id);

        $data = $request->validated();

        if ($request->hasFile('photo')) {
            if ($candidate->photo) {
                $newFile = $request->file('photo');
                $fileToDelete = $candidate->photo;
                $imageUploadResponse = $this->fileStorageService->updateFileFromCloud($fileToDelete, $newFile);

                $data['photo'] = $imageUploadResponse['public_path'];
            } else {
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

        return redirect()->route('agent.candidate.list');
    }


    public function destroy($id)
    {
        $candidate = Candidate::findOrFail($id);
        $candidate->delete();

        Toastr::success('Candidate Deleted Successfully.');
        return redirect()->route('agent.candidate.list');
    }


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
            return redirect()->route('agent.candidate.list');
        } catch (\Exception $e) {
            Toastr::success('Status not changed');
            return redirect()->route('agent.candidate.list');
        }
    }

    public function candidateApplications($candidateId)
    {

        $bookings = [];

        return view('agent-panel.candidate.applications', compact('bookings'));
    }

}
