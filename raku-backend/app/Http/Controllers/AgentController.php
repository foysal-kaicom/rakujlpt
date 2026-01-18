<?php

namespace App\Http\Controllers;

use App\Http\Requests\AgentRequest;
use App\Models\Agent;
use App\Models\AgentDisburseHistory;
use App\Services\FileStorageService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Throwable;

class AgentController extends Controller
{
    public $fileStorageService;
    public function __construct(FileStorageService $fileStorageService)
    {
        $this->fileStorageService = $fileStorageService;
    }

    public function list(Request $request)
    {
        $status = $request->get('status');
    
        if ($status !== null) {
            $agents = Agent::where('status', $status)->paginate(10);
        } else {
            $agents = Agent::paginate(10);
        }
    
        return view('agents.list', compact('agents'));
    }
    

    public function showCreate(){
        return view('agents.create');
    }

    public function store(AgentRequest $request)
    {
        $data = $request->validated();

        try {
            if ($request->hasFile('photo')) {
                $image = $request->file('photo');

                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'agents');
                $data['photo'] = $imageUploadResponse['public_path'];
            }
            $data['password'] = bcrypt($data['password']);

            Agent::create($data);

            Toastr::success('Agent Created Successfully.');
            return redirect()->route('agents.list');
        }
        catch (Throwable $e) {
            Toastr::error('Something went wrong. Agent not created.'. $e->getMessage());
            return redirect()->route('agents.list');
        }
    }

    public function edit($id)
    {
        try {
            $agent = Agent::findOrFail($id);
            return view('agents.edit', compact('agent'));
        } catch (Throwable $e) {
            Toastr::error('Something went wrong. Agent not found.');
            return redirect()->route('agents.list');
        }
    }

    public function update(AgentRequest $request, $id)
    {
        $data = $request->validated();
    
        try {
            $agent = Agent::findOrFail($id);
    
            if ($request->hasFile('photo')) {
                if ($agent->photo) {
                    $newFile = $request->file('photo');
                    $fileToDelete = $agent->photo;
                    $imageUploadResponse = $this->fileStorageService->updateFileFromCloud($fileToDelete, $newFile);
    
                    $data['photo'] = $imageUploadResponse['public_path'];
                }
                else{
                    $newFile = $request->file('photo');
                    $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($newFile, 'agents');
                    $data['photo'] = $imageUploadResponse['public_path'];
                }
            }

            if ($request->filled('password')) {
                $data['password'] = bcrypt($data['password']);
            } else {
                unset($data['password']);
            }
    
            $agent->update($data);
    
            Toastr::success('Agent Updated Successfully.');
            return redirect()->route('agents.list');
        } catch (Throwable $e) {
            Toastr::error('Something went wrong. Agent not updated.');
            return redirect()->route('agents.list');
        }
    }
    

    public function toggleStatus($id)
    {
        try {
            $agent = Agent::findOrFail($id);
    
            if ($agent->status) {
                $agent->status = false;
                $agent->save();
            } else {
                $agent->status = true;
                $agent->save();
            }
            Toastr::success('Status changed successfully.');
            return redirect()->route('agents.list');
        } catch (\Exception $e) {
            Toastr::error('Status not changed');
            return redirect()->route('agents.list');
        }
    }

    public function paymentHistory(Request $request)
    {
        $agents = Agent::select('id', 'name')->orderBy('name')->get();

        if ($request->filled('agent_id')) {
            $query = AgentDisburseHistory::with(['agent:id,name'])->where('agent_id', $request->agent_id)->orderByDesc('id');

            if ($request->filled('month')) {
                $query->where('billing_month', $request->month);
            }
            if ($request->filled('year')) {
                $query->Where('billing_year', $request->year);
            }

            $disbursements = $query->paginate(10)->appends($request->query());
            return view('agents.payment.index', compact('agents', 'disbursements'));
        }

        return view('agents.payment.index', compact('agents'));
    }


    public function editPaymentHistory($id)
    {
        $agents = Agent::select('id','name')->orderBy('name')->get();

        $history = AgentDisburseHistory::with(['agent:id,name'])->findOrFail($id);

        return view('agents.payment.edit-payment', compact('agents', 'history'));
    }

    public function updatePaymentHistoryStatus(Request $request, $id)
    {
        $request->validate([
            'status'  => 'required|in:pending,approved,rejected,cancelled',
            'remarks' => 'nullable|string|max:1000',
        ]);

        $history = AgentDisburseHistory::findOrFail($id);

        $history->status = $request->status;
        $history->remarks = $request->remarks;
        $history->approved_by = auth()->id();
        $history->paid_at = $request->status === 'approved' ? now() : null;

        $history->save();

        Toastr::success('Disbursement status updated successfully.');
        return redirect()->route('agents.payment.history', [
            'agent_id' => $history->agent_id,
            'month'    => $history->billing_month,
            'year'     => $history->billing_year,
        ]);
    }


}
