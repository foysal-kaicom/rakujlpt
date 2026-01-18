@extends('master')

@section('contents')

<section class="w-100 bg-white rounded overflow-hidden mb-4" style="font-family: sans-serif;">
    <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold m-0">Disbursement Details</h3>

        <a href="{{ url()->previous() }}"
           class="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium border shadow-md transition">
            Back
        </a>
    </div>

    <div class="p-4 border">
        <div class="row g-3">

            <div class="col-md-4">
                <label class="form-label">Agent</label>
                <input type="text" class="form-control" value="{{ $history->agent?->name ?? '-' }}" disabled>
            </div>

            <div class="col-md-4">
                <label class="form-label">Billing Period</label>
                <input type="text" class="form-control"
                       value="{{ \Carbon\Carbon::create()->month($history->billing_month)->format('F') }} - {{ $history->billing_year }}"
                       disabled>
            </div>

            <div class="col-md-4">
                <label class="form-label">Payout Amount</label>
                <input type="text" class="form-control" value="{{ number_format($history->payout_amount, 0) }}" disabled>
            </div>

            <div class="col-md-4">
                <label class="form-label">Payout Channel</label>
                <input type="text" class="form-control" value="{{ $history->payout_channel ?? '-' }}" disabled>
            </div>

            <div class="col-md-4">
                <label class="form-label">Transaction ID</label>
                <input type="text" class="form-control" value="{{ $history->trx_id ?? '-' }}" disabled>
            </div>

            <div class="col-md-4">
                <label class="form-label">Paid At</label>
                <input type="text" class="form-control"
                       value="{{ $history->paid_at ? \Carbon\Carbon::parse($history->paid_at)->format('d M Y, h:i A') : '-' }}"
                       disabled>
            </div>

            <div class="col-md-8">
                <label class="form-label">Proof</label>
                <div class="d-flex align-items-center gap-3">
                    @if($history->image)
                        <a href="{{ asset($history->image) }}" target="_blank"
                           class="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition">
                            View Proof
                        </a>
                        <small class="text-muted">Opens in new tab</small>
                    @else
                        <input type="text" class="form-control" value="No proof uploaded" disabled>
                    @endif
                </div>
            </div>

        </div>
    </div>
</section>


<section class="w-100 bg-white rounded overflow-hidden" style="font-family: sans-serif;">
    <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold m-0">Update Status</h3>
    </div>

    <div class="p-4 border">
        <form method="POST"
              action="{{ route('agents.payment.update', $history->id) }}">
            @csrf

            <div class="row g-3">
                <div class="col-md-4">
                    <label class="form-label">Status</label>
                    <select name="status" class="form-control">
                        @foreach(['pending','approved','rejected','cancelled'] as $opt)
                            <option value="{{ $opt }}" {{ old('status', $history->status) === $opt ? 'selected' : '' }}>
                                {{ ucfirst($opt) }}
                            </option>
                        @endforeach
                    </select>
                    @error('status')
                        <div class="text-danger mt-1">{{ $message }}</div>
                    @enderror
                </div>

                <div class="col-md-8">
                    <label class="form-label">Remarks (optional)</label>
                    <input type="text"
                           name="remarks"
                           class="form-control"
                           value="{{ old('remarks', $history->remarks) }}"
                           placeholder="Write a note (optional)">
                    @error('remarks')
                        <div class="text-danger mt-1">{{ $message }}</div>
                    @enderror
                </div>

                <div class="col-12 d-flex justify-content-end gap-2 mt-2">
                    <a href="{{ url()->previous() }}"
                       class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium border shadow-md transition">
                        Cancel
                    </a>

                    <button type="submit"
                            class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition border-0">
                        Update Status
                    </button>
                </div>
            </div>

        </form>
    </div>
</section>

@endsection
