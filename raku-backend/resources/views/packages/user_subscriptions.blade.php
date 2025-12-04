@extends('master')

@section('contents')

<!-- DataTables CSS -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css">

<style>
    .dataTables_wrapper .dataTables_length{
        margin-bottom: 12px;
    }
    .dataTables_filter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        gap: 15px;
        width: 100%;
    }

    .dataTables_filter label {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .summary-card {
        border-left-width: 6px;
        transition: 0.3s ease;
    }
</style>

<div class="container-fluid py-3">

    <!-- Summary Cards -->
    <div class="row mb-4">
        <div class="col-md-3">
            <div class="p-4 bg-white shadow rounded-lg summary-card" style="border-left-color:#667eea;">
                <h6 class="text-sm font-semibold uppercase">Total Subscriptions</h6>
                <h3 class="mb-0" style="color:#667eea; font-weight:700;">{{ $totalSubscriptions }}</h3>
            </div>
        </div>

        <div class="col-md-3">
            <div class="p-4 bg-white shadow rounded-lg summary-card" style="border-left-color:#10b981;">
                <h6 class="text-sm font-semibold uppercase">Total Amount</h6>
                <h3 class="mb-0" style="color:#10b981; font-weight:700;">৳{{ number_format($totalRevenue,2) }}</h3>
            </div>
        </div>

        <div class="col-md-3">
            <div class="p-4 bg-white shadow rounded-lg summary-card" style="border-left-color:#10b981;">
                <h6 class="text-sm font-semibold uppercase">Confirmed</h6>
                <h3 class="mb-0" style="color:#10b981; font-weight:700;">{{ $confirmed }}</h3>
            </div>
        </div>

        <div class="col-md-3">
            <div class="p-4 bg-white shadow rounded-lg summary-card" style="border-left-color:#f59e0b;">
                <h6 class="text-sm font-semibold uppercase">Pending</h6>
                <h3 class="mb-0" style="color:#f59e0b; font-weight:700;">{{ $pending }}</h3>
            </div>
        </div>
    </div>

    <!-- Subscription Table -->
    <div class="bg-white p-4 shadow rounded-lg border border-gray-300">
        <h2 class="text-xl font-semibold mb-3">User Subscriptions</h2>

        <table id="subscriptionTable" class="table table-striped table-bordered w-100">
            <thead class="bg-indigo-300">
                <tr>
                    <th>ID</th>
                    <th>Candidate</th>
                    <th>Package</th>
                    <th>Payment Status</th>
                    <th>Total Paid Amount</th>
                    <th>Status</th>
                    <th>Subscription Date</th>
                </tr>
            </thead>
            <tbody>
                <!-- DataTables will populate -->
            </tbody>
        </table>
    </div>

</div>

@push('js')
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

<script>
    $(function () {
        let table = $('#subscriptionTable').DataTable({
            processing: true,
            serverSide: true,
            destroy: true,

            ajax: {
                url: '{{ route("user-payments") }}',
                data: function (d) {
                    d.payment_status = $('#filterPaymentStatus').val();
                    d.status = $('#filterSubStatus').val();
                }
            },

            columns: [
                { data: 'id', name: 'id' },
                { data: 'candidate', name: 'candidate', orderable: false },
                { data: 'package', name: 'package' },
                { data: 'payment_status', name: 'payment_status', orderable: false, searchable: false },
                { data: 'total_payable', name: 'total_payable' },
                { data: 'status', name: 'status', orderable: false, searchable: false },
                { data: 'subscription_date', name: 'subscription_date' }
            ],

            initComplete: function () {
                const filter = $('#subscriptionTable_filter');

                const dropdowns = `
                    <div class="flex items-center gap-2 ml-4">
                        <label class="text-sm font-medium">Status:</label>
                        <select id="filterSubStatus" 
                            class="border border-gray-300 text-sm rounded-lg px-3 py-1.5 focus:ring-2">
                            <option value="all">All</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div class="flex items-center gap-2 ml-4">
                        <label class="text-sm font-medium">Payment Status:</label>
                        <select id="filterPaymentStatus"
                            class="border border-gray-300 text-sm rounded-lg px-3 py-1.5 focus:ring-2">
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="success">Success</option>
                            <option value="failed">Failed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                `;

                if (!$('#filterSubStatus').length) {
                    filter.append(dropdowns);
                }

                $(document).on('change', '#filterSubStatus, #filterPaymentStatus', function () {
                    table.ajax.reload();
                });
            }
        });
    });
</script>

@endpush

@endsection
