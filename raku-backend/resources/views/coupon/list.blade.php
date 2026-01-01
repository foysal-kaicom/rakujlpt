@extends('master')

@section('contents')

<style>
    .toggle-switch-lg .form-check-input {
        width: 3rem;
        height: 1.5rem;
        cursor: pointer;
    }

    .toggle-switch-lg .form-check-input:checked {
        background-color: #28a745;
        border-color: #28a745;
    }
</style>

<!-- Flash Messages -->
@if(session('success'))
    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif
@if(session('error'))
    <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
        {{ session('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif

<section class="w-100 bg-white rounded overflow-hidden shadow">
    <!-- Header -->
    <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300" >
        <h3 class="text-md m-0">Coupons</h3>

        @hasPermission('coupon.create')
        <a href="{{ route('coupon.create') }}" class="btn btn-primary btn-sm" style="background-color: hsla(227, 64%, 37%, 0.879);">
            <i class="fa-solid fa-plus"></i> Create Coupon
        </a>
        @endHasPermission
    </div>

    <!-- Table -->
    <div class="table-responsive">
        <table class="table table-striped table-hover align-middle">
            <thead class="table-light">
                <tr>
                    <th class="small text-secondary">ID</th>
                    <th class="small text-secondary text-center d-none d-lg-table-cell">Coupon Code</th>
                    <th class="small text-secondary">Title</th>
                    <th class="small text-secondary d-none d-md-table-cell">Type</th>
                    <th class="small text-secondary text-center d-none d-lg-table-cell">Discount</th>
                    <th class="small text-secondary text-center d-none d-lg-table-cell">Max Discount</th>
                    <th class="small text-secondary d-none d-md-table-cell">Start</th>
                    <th class="small text-secondary d-none d-md-table-cell">End</th>
                    <th class="small text-secondary text-center d-none d-lg-table-cell">Status</th>
                    <th class="small text-secondary">Action</th>
                </tr>
            </thead>

            <tbody>
                @forelse($coupons as $coupon)
                    <tr>
                        <td>{{ $coupon->id }}</td>
                        <td>
                            <div class="fw-semibold">{{ $coupon->coupon_code }}</div>
                        </td>
                        <td>
                            <div class="">{{ $coupon->title }}</div>
                        </td>

                        <td class="d-none d-md-table-cell text-capitalize">{{ $coupon->type }}</td>

                        <td class="text-center d-none d-lg-table-cell">
                            @if($coupon->type === 'percentage')
                                {{ rtrim(rtrim(number_format($coupon->discount_value, 2), '0'), '.') }}%
                            @else
                                ৳{{ rtrim(rtrim(number_format($coupon->discount_value, 2), '0'), '.') }}
                            @endif
                        </td>

                        <td class="text-center d-none d-lg-table-cell">
                            @if((float)$coupon->max_discount > 0)
                                ৳{{ rtrim(rtrim(number_format($coupon->max_discount, 2), '0'), '.') }}
                            @else
                                —
                            @endif
                        </td>
                        <td class="d-none d-md-table-cell">
                            {{ \Carbon\Carbon::parse($coupon->start_date)->format('d M, Y h:i A') }}
                        </td>

                        <td class="d-none d-md-table-cell">
                            {{ \Carbon\Carbon::parse($coupon->end_date)->format('d M, Y h:i A') }}
                        </td>

                        <!-- Toggle Status -->
                        <td class="d-none d-sm-table-cell py-1 text-center">
                            <form action="{{ route('coupon.toggleStatus', $coupon->id) }}" method="POST">
                                @csrf
                                <div class="form-check form-switch toggle-switch-lg d-flex justify-content-center">
                                    <input class="form-check-input"
                                        type="checkbox"
                                        onchange="if(confirm('Are you sure you want to {{ $coupon->status === 'active' ? 'disable' : 'enable' }} this coupon?')) { this.form.submit(); } else { this.checked = !this.checked; }"
                                        {{ $coupon->status === 'active' ? 'checked' : '' }}>
                                </div>
                            </form>
                        </td>

                        <td>
                            <div class="d-flex gap-2">
                                @hasPermission('coupon.edit')
                                <a href="{{ route('coupon.edit', $coupon->id) }}"
                                   class="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 shadow-md transition">
                                    Edit
                                </a>
                                @endHasPermission
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="10" class="text-center text-muted py-4">No coupons found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    @if(method_exists($coupons, 'links'))
        <div class="px-3 pb-3">
            {{ $coupons->links() }}
        </div>
    @endif
</section>

@endsection
