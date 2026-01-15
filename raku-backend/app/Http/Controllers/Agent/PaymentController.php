<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Models\AgentBill;
use App\Models\AgentDisburseHistory;
use App\Services\FileStorageService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Throwable;

class PaymentController extends Controller
{
    public $fileStorageService;
    public function __construct(FileStorageService $fileStorageService)
    {
        $this->fileStorageService = $fileStorageService;
    }

    public function index()
    {
        $agent = auth('agent')->user();
        if (!$agent) {
            abort(403, 'Unauthorized');
        }
    
       
        if(request()->has('billing_month') && request()->has('billing_year') ){
            $month = (int) request()->billing_month;
            $year  = (int) request()->billing_year;
    
            $totalBill = (int) AgentBill::where('agent_id', $agent->id)
                ->where('billing_month', $month)
                ->where('billing_year', $year)
                ->sum('commission_amount');
    
            $approvedPaid = (int) AgentDisburseHistory::where('agent_id', $agent->id)
                ->where('billing_month', $month)
                ->where('billing_year', $year)
                ->where('status', 'approved')
                ->sum('payout_amount');
    
            $pendingAmount = (int) AgentDisburseHistory::where('agent_id', $agent->id)
                ->where('billing_month', $month)
                ->where('billing_year', $year)
                ->where('status', 'pending')
                ->sum('payout_amount');
    
            $dueAmount = max(0, $totalBill - $approvedPaid - $pendingAmount);
    
            $histories = AgentDisburseHistory::where('agent_id', $agent->id)
                ->where('billing_month', $month)
                ->where('billing_year', $year)
                ->orderByDesc('id')
                ->get();
    
                return view('agent-panel.payment.bill', [
                    'billing_month' => $month,
                    'billing_year' => $year,
                    'total_bill' => $totalBill,
                    'approved_paid' => $approvedPaid,
                    'pending_amount' => $pendingAmount,
                    'due_amount' => $dueAmount,
                    'disburse_histories' => $histories,
                ]);

        }
        return view('agent-panel.payment.bill', [
            'billing_month' => null,
            'billing_year' => null,
            'total_bill' => null,
            'approved_paid' => null,
            'pending_amount' => null,
            'due_amount' => null,
            'disburse_histories' => collect(),
            'error' => null,
        ]);
    }

    public function storeDisburse(Request $request)
    {
        $agent = auth('agent')->user();
        if (!$agent) {
            abort(403, 'Unauthorized');
        }

        $data = $request->validate([
            'billing_month'  => 'required|integer|min:1|max:12',
            'billing_year'   => 'required|integer|min:2000|max:2100',
            'payout_channel' => 'nullable|string|max:255',
            'payout_amount'  => 'required|numeric|min:1',
            'trx_id'         => 'nullable|string|max:255',
            'image'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'paid_at'        => 'nullable|date',
            'remarks'        => 'nullable|string|max:1000',
        ]);

        try {
            $data['agent_id'] = $agent->id;
            $data['status'] = 'pending';
            $data['approved_by'] = null;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'agent_disburse_proofs');
                $data['image'] = $imageUploadResponse['public_path'] ?? null;
            }

            AgentDisburseHistory::create($data);
    
            Toastr::success('Disburse request submitted successfully.');
            return redirect()->route('agent.payment.index', [
                'billing_month' => (int) $request->billing_month,
                'billing_year'  => (int) $request->billing_year,
            ]);
            

        } catch (Throwable $e) {
            Toastr::error('Disburse request not submitted.');
            return back()->with('error', 'Something went wrong. ' . $e->getMessage());
        }
    }
}
