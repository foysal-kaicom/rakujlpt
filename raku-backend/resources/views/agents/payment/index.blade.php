@extends('master')

@section('contents')

<section class="w-100 bg-white rounded overflow-hidden mb-4" style="font-family: sans-serif;">
    <!-- Section Header -->
    <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold">Filters</h3>
    </div>

    <form method="GET" action="">
        <div class="py-3 px-4 lg:flex justify-between border items-end space-y-3">

            <div class="w-full lg:w-[280px]">
                <label class="form-label">Agent</label>
                <select name="agent_id" class="form-control">
                    <option value="">-- All Agents --</option>
                    @foreach($agents as $agent)
                        <option value="{{ $agent->id }}" {{ request()->agent_id == $agent->id ? 'selected' : '' }}>
                            {{ $agent->name }}
                        </option>
                    @endforeach
                </select>
                @error('agent_id')
                <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>

            <div class="w-full lg:w-[220px]">
                <label class="form-label">Month</label>
                <select name="month" class="form-control">
                    <option value="">-- All Months --</option>
                    @for($m=1; $m<=12; $m++)
                        <option value="{{ $m }}" {{ (string)request()->month === (string)$m ? 'selected' : '' }}>
                            {{ \Carbon\Carbon::create()->month($m)->format('F') }}
                        </option>
                    @endfor
                </select>
                @error('month')
                <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>

            <div class="w-full lg:w-[220px]">
                <label class="form-label">Year</label>
                <select name="year" class="form-control">
                    <option value="">-- All Years --</option>
                    @php
                        $currentYear = now()->year;
                    @endphp
                    @for($y = $currentYear; $y >= $currentYear - 10; $y--)
                        <option value="{{ $y }}" {{ (string)request()->year === (string)$y ? 'selected' : '' }}>
                            {{ $y }}
                        </option>
                    @endfor
                </select>
                @error('year')
                <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>

            <div class="flex justify-end items-center gap-3">
                <a href="{{ route('agents.payment.history') }}"
                   class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium border shadow-md transition">
                    Reset Filters
                </a>
                <button type="submit"
                        class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">
                    Apply Filters
                </button>
            </div>

        </div>
    </form>
</section>

<section class="w-100 bg-white rounded overflow-hidden" style="font-family: sans-serif;">
    <div class="py-3 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold m-0">Disbursement History</h3>
    </div>

    <!-- Table -->
    <div class="table-responsive">
        <table class="table table-striped m-0">
            <thead class="">
                <tr>
                    <th scope="col" class="text-uppercase text-secondary small px-4 py-3">ID</th>
                    <th scope="col" class="text-secondary small px-4 py-3">Agent</th>
                    <th scope="col" class="text-secondary small py-3">Disburse Date</th>
                    <th scope="col" class="text-secondary small py-3">Amount</th>
                    <th scope="col" class="text-secondary small py-3">Method</th>
                    <th scope="col" class="text-secondary small py-3">Status</th>
                    <th scope="col" class="text-secondary small py-3">Action</th>
                </tr>
            </thead>

            <tbody>
                @if(request()->filled('agent_id'))
                    @forelse($disbursements as $item)
                        <tr>
                            <td class="px-4 pt-3">{{ $item->id }}</td>
                            <td class="px-4 py-3 text-nowrap">{{ $item->agent?->name ?? '-' }}</td>
                            <td class="py-1 py-3 text-nowrap">
                                {{ $item->paid_at ? \Carbon\Carbon::parse($item->paid_at)->format('d M Y') : '-' }}
                            </td>
                            <td class="py-3 text-nowrap">{{ number_format($item->payout_amount, 2) }}</td>
                            <td class="py-3 text-nowrap">{{ $item->payout_channel ?? '-' }}</td>
                            <td class="py-3 text-nowrap">
                                @if(($item->status ?? '') === 'approved')
                                    <span class="inline-flex items-center rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-medium text-white">
                                        Approved
                                    </span>
                                @elseif(($item->status ?? '') === 'pending')
                                    <span class="inline-flex items-center rounded-full bg-yellow-500 px-2.5 py-0.5 text-xs font-medium text-white">
                                        Pending
                                    </span>
                                @else
                                    <span class="inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white">
                                        {{ ucfirst($item->status ?? 'unknown') }}
                                    </span>
                                @endif
                            </td>
                            <td>
                                <a href="{{ route('agents.payment.Details', $item->id) }}" class="hover-effect">
                                    <span class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 shadow-md transition">
                                        Edit
                                    </span>
                                </a>
                            </td>

                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="text-center py-4 text-muted">
                                No disbursement history found.
                            </td>
                        </tr>
                    @endforelse
                @else
                <tr>
                    <td colspan="8" class="text-center py-4 text-muted">
                        Apply filter to see history.
                    </td>
                </tr>
                @endif    
            </tbody>
        </table>
    </div>

    <!-- Pagination Links -->
    <div class="d-flex justify-content-center mt-3">
        @if(request()->filled('agent_id'))
            {{ $disbursements->appends(request()->query())->links() }}
        @endif
    </div>

    <style>
        th a:hover {
            color: #031a33;
            text-decoration: underline;
        }
    </style>
</section>

@endsection
