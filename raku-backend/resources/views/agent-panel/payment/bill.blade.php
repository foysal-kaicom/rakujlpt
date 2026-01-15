@extends('agent-panel.layout.agent_master')

@section('contents')

@php
    $months = [
        1=>'January',2=>'February',3=>'March',4=>'April',5=>'May',6=>'June',
        7=>'July',8=>'August',9=>'September',10=>'October',11=>'November',12=>'December'
    ];

    $selectedMonth = old('billing_month', $billing_month ?? '');
    $selectedYear  = old('billing_year', $billing_year ?? '');

    $totalBill     = $total_bill ?? null;
    $approvedPaid  = $approved_paid ?? null;
    $pendingAmount = $pending_amount ?? null;
    $dueAmount     = $due_amount ?? null;

    $canDisburse = is_numeric($dueAmount) && (float) $dueAmount > 0;
@endphp

<style>
    .disburse-btn{
        border:none;
        border-radius:50px;
        font-weight:700;
        color:#fff!important;
        background:linear-gradient(135deg,#ff8a00,#ff3d00);
        transition:all .25s ease-in-out;position:relative;overflow:hidden
    }
    .disburse-btn:hover{
        transform:translateY(-4px);
        box-shadow:0 18px 35px rgba(255,90,0,.35);
        background:linear-gradient(135deg,#ff3d00,#ff8a00)
    }
    .disburse-btn:active{
        transform:scale(.98);
        box-shadow:0 10px 18px rgba(255,90,0,.2)
    }
    .disburse-btn:disabled{
        background:#bbd2d4!important;
        color:#131b12!important;
        box-shadow:none!important;
        cursor:not-allowed;
        transform:none!important
    }
    .disburse-btn::before{
        content:"";
        position:absolute;
        top:0;
        left:-75%;
        width:50%;
        height:100%;
        background:rgba(255,255,255,.3);transform:skewX(-25deg);transition:.6s
    }
    .disburse-btn:hover::before{
        left:125%
    }
</style>

<div class="bg-white rounded shadow-sm">
    <div class="text-dark p-3 rounded-top" style="background-color: hsla(197, 66%, 81%, 0.879);color:#04070a">
        <h3 class="fs-5">Agent Billing</h3>
    </div>

    @if(isset($error) && $error)
        <div class="alert alert-danger m-4">{{ $error }}</div>
    @endif

    {{-- CALCULATE FORM --}}
    <form action="{{ route('agent.payment.index') }}" method="GET" enctype="multipart/form-data" class="bg-white p-4 rounded-bottom">

        <div class="row g-4 flex items-end">

            {{-- Month --}}
            <div class="col-md-5">
                <label class="form-label">Month</label>
                <select name="billing_month" class="form-control" id="monthSelect">
                    <option value="">Select Month</option>
                    @foreach($months as $mKey => $mName)
                        <option value="{{ $mKey }}" {{ (string)$selectedMonth === (string)$mKey ? 'selected' : '' }}>
                            {{ $mName }}
                        </option>
                    @endforeach
                </select>
                @error('billing_month')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>

            {{-- Year --}}
            <div class="col-md-5">
                <label class="form-label">Year</label>
                <select name="billing_year" class="form-control" id="yearSelect">
                    <option value="">Select Year</option>
                    @php
                        $currentYear = (int) now()->format('Y');
                        $years = range($currentYear - 1, $currentYear + 5);
                    @endphp
                    @foreach($years as $yr)
                        <option value="{{ $yr }}" {{ (string)$selectedYear === (string)$yr ? 'selected' : '' }}>
                            {{ $yr }}
                        </option>
                    @endforeach
                </select>
                @error('billing_year')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>

            {{-- Buttons --}}
            <div class="col-md-2">
                <div class="d-flex gap-2">
                    <button type="submit" id="calculateBtn" class="btn btn-primary w-100" disabled>
                        Calculate
                    </button>

                    <a href="{{ route('agent.payment.index') }}" class="btn btn-outline-danger w-100 text-center">
                        Reset
                    </a>
                </div>
            </div>

        </div>

        {{-- SUMMARY CARDS --}}
        <div class="row g-4 mt-4">

            {{-- Total Bill --}}
            <div class="col-md-3">
                <div class="card h-100 shadow-sm" style="min-height: 200px;">
                    <div class="card-header text-white" style="background-color: #346faf;">
                        <h5 class="card-title mb-0">Total Bill</h5>
                    </div>
                    <div class="card-body d-flex align-items-center justify-content-center" style="font-size: 1.5rem;">
                        <i class="fas fa-file-invoice-dollar" style="font-size:2rem;color:#346faf;margin-right:10px;"></i>
                        <span>
                            {{ $totalBill !== null ? number_format((float)$totalBill, 0) : '-' }}
                            @if($totalBill !== null) BDT @endif
                        </span>
                    </div>
                </div>
            </div>

            {{-- Approved Paid --}}
            <div class="col-md-3">
                <div class="card h-100 shadow-sm" style="min-height: 200px;">
                    <div class="card-header text-white" style="background-color:#489548;">
                        <h5 class="card-title mb-0">Approved Paid</h5>
                    </div>
                    <div class="card-body d-flex align-items-center justify-content-center" style="font-size: 1.5rem;">
                        <i class="fas fa-check-circle" style="font-size:2rem;color:#489548;margin-right:10px;"></i>
                        <span>
                            {{ $approvedPaid !== null ? number_format((float)$approvedPaid, 0) : '-' }}
                            @if($approvedPaid !== null) BDT @endif
                        </span>
                    </div>
                </div>
            </div>

            {{-- Pending --}}
            <div class="col-md-3">
                <div class="card h-100 shadow-sm" style="min-height: 200px;">
                    <div class="card-header text-white" style="background-color:#6f2a67;">
                        <h5 class="card-title mb-0">Pending</h5>
                    </div>
                    <div class="card-body d-flex align-items-center justify-content-center" style="font-size: 1.5rem;">
                        <i class="fas fa-clock" style="font-size:2rem;color:#6f2a67;margin-right:10px;"></i>
                        <span>
                            {{ $pendingAmount !== null ? number_format((float)$pendingAmount, 0) : '-' }}
                            @if($pendingAmount !== null) BDT @endif
                        </span>
                    </div>
                </div>
            </div>

            {{-- Due --}}
            <div class="col-md-3">
                <div class="card h-100 shadow-sm" style="min-height: 200px;">
                    <div class="card-header text-white" style="background-color:#b64343;">
                        <h5 class="card-title mb-0">Due</h5>
                    </div>
                    <div class="card-body d-flex align-items-center justify-content-center" style="font-size: 1.5rem;">
                        <i class="fas fa-times-circle" style="font-size:2rem;color:#b64343;margin-right:10px;"></i>
                        <span id="dueAmountText" data-due="{{ is_numeric($dueAmount) ? (float)$dueAmount : '' }}">
                            {{ $dueAmount !== null ? number_format((float)$dueAmount, 0) : '-' }}
                            @if($dueAmount !== null) BDT @endif
                        </span>
                    </div>
                </div>
            </div>

        </div>

    </form>
</div>

{{-- DISBURSE BUTTON --}}
<div class="d-flex justify-content-center mt-4">
    <button type="button"
        id="disburseBtn"
        class="btn disburse-btn px-5 py-3 d-flex align-items-center gap-2"
        data-bs-toggle="modal"
        data-bs-target="#disburseModal"
        {{ $canDisburse ? '' : 'disabled' }}>
        <i class="fas fa-money-check-alt" style="font-size:1.25rem;"></i>
        <span style="font-size:1.1rem;letter-spacing:.5px;">Disburse</span>
    </button>
</div>

{{-- DISBURSE HISTORY --}}
<section class="card border shadow-sm mt-4">
    <div class="py-3 px-4" style="background-color: hsla(197, 66%, 81%, 0.879);color:#04070a">
        <h3 class="font-semibold text-lg">Disburse History</h3>
    </div>

    <div class="card-body p-0">
        <table class="table table-striped m-0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Month/Year</th>
                    <th>Amount</th>
                    <th>Channel</th>
                    <th>TRX ID</th>
                    <th>Status</th>
                    <th>Paid Date</th>
                    <th>Proof</th>
                </tr>
            </thead>
            <tbody>
                @if(isset($disburse_histories) && $disburse_histories && count($disburse_histories) > 0)
                    @foreach($disburse_histories as $key => $history)
                        <tr>
                            <td>{{ $key + 1 }}</td>
                            <td>
                                {{ $months[(int)$history->billing_month] ?? $history->billing_month }}
                                {{ (int)$history->billing_year }}
                            </td>
                            <td>{{ number_format((float)$history->payout_amount, 0) }} BDT</td>
                            <td>{{ $history->payout_channel ?? '-' }}</td>
                            <td>{{ $history->trx_id ?? '-' }}</td>
                            <td>
                                <span class="badge
                                    {{ $history->status == 'approved' ? 'bg-success' :
                                       ($history->status == 'pending' ? 'bg-warning' :
                                       ($history->status == 'rejected' ? 'bg-danger' : 'bg-secondary')) }}">
                                    {{ ucfirst($history->status) }}
                                </span>
                            </td>
                            <td>{{ $history->paid_at ? \Carbon\Carbon::parse($history->paid_at)->format('d M Y') : '-' }}</td>
                            <td>
                                @if($history->image)
                                    <a href="{{ $history->image }}" target="_blank" class="btn btn-sm btn-primary">View</a>
                                @else
                                    -
                                @endif
                            </td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <td colspan="8" class="text-center py-4">
                            {{ ($selectedMonth && $selectedYear) ? 'No disburse history found.' : 'Please select month & year and click calculate.' }}
                        </td>
                    </tr>
                @endif
            </tbody>
        </table>
    </div>
</section>

{{-- DISBURSE MODAL --}}
<div class="modal fade" id="disburseModal" tabindex="-1" aria-labelledby="disburseModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <form action="{{ route('agent.payment.disburse') }}" method="POST" enctype="multipart/form-data" class="modal-content">
            @csrf

            <div class="modal-header">
                <h5 class="modal-title" id="disburseModalLabel">Submit Disburse Request</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                {{-- Month/Year must come from calculated result --}}
                <input type="hidden" name="billing_month" value="{{ $billing_month ?? '' }}">
                <input type="hidden" name="billing_year" value="{{ $billing_year ?? '' }}">

                <div class="row g-3">

                    <div class="col-md-6">
                        <label class="form-label">Payment Channel</label>
                        <input type="text" name="payout_channel" class="form-control" placeholder="Bkash / Nagad / Bank / etc">
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Paid Amount</label>
                        <input type="number" name="payout_amount" class="form-control" required placeholder="Enter paid amount">
                        <small class="text-muted">
                            Due: {{ is_numeric($dueAmount) ? number_format((float)$dueAmount, 0) : '-' }} BDT
                        </small>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Transaction ID</label>
                        <input type="text" name="trx_id" class="form-control" placeholder="Transaction ID / Ref No">
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Payment Proof (Image)</label>
                        <input type="file" name="image" id="disburseProofImage" class="form-control" accept="image/*">
                        <div class="mt-2">
                            <img id="disburseProofPreview"
                                 src=""
                                 alt="Preview"
                                 class="rounded border"
                                 style="width: 120px; height: 90px; object-fit: cover; display: none;">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Paid Date (Optional)</label>
                        <input type="date" name="paid_at" class="form-control">
                    </div>

                    <div class="col-md-12">
                        <label class="form-label">Remarks (Optional)</label>
                        <textarea name="remarks" class="form-control" rows="2" placeholder="Write remarks if any"></textarea>
                    </div>

                    <div class="col-md-12">
                        <div class="alert alert-info mb-0">
                            <strong>Note:</strong> Your request will be <strong>Pending</strong> until admin approves it.
                        </div>
                    </div>

                </div>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary px-4">Submit</button>
            </div>

        </form>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const monthSelect = document.getElementById("monthSelect");
        const yearSelect = document.getElementById("yearSelect");
        const calculateBtn = document.getElementById("calculateBtn");

        function toggleCalculate() {
            calculateBtn.disabled = !(monthSelect.value && yearSelect.value);
        }

        toggleCalculate();
        monthSelect.addEventListener("change", toggleCalculate);
        yearSelect.addEventListener("change", toggleCalculate);
    });
</script>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const input = document.getElementById("disburseProofImage");
        const preview = document.getElementById("disburseProofPreview");
        const modal = document.getElementById("disburseModal");

        if (input) {
            input.addEventListener("change", function () {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        preview.src = e.target.result;
                        preview.style.display = "block";
                    };
                    reader.readAsDataURL(file);
                } else {
                    preview.src = "";
                    preview.style.display = "none";
                }
            });
        }

        if (modal) {
            modal.addEventListener("hidden.bs.modal", function () {
                if (input) input.value = "";
                preview.src = "";
                preview.style.display = "none";
            });
        }
    });
</script>

@endsection
