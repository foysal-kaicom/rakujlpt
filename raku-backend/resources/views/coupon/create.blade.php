@extends('master')

@section('contents')

<div class="rounded shadow-sm">
    <div class="p-3 rounded-top bg-indigo-300">
        <h3 class="fs-5">Create Coupon</h3>
    </div>

    <!-- Form Start -->
    <form action="{{ route('coupon.store') }}" method="POST" class="bg-white p-4 rounded-bottom">
        @csrf

        <div class="row g-4">
            <div class="col-md-12">
                
                <!-- First Row -->
                <div class="row g-3">
                    <!-- Title -->
                    <div class="col-md-3">
                        <label class="form-label">Title</label>
                        <input required type="text" name="title" class="form-control" placeholder="e.g. Winter Sale" value="{{ old('title') }}" />
                        @error('title')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Coupon Code -->
                    <div class="col-md-3">
                        <label class="form-label">Coupon Code</label>
                        <input required type="text" name="coupon_code" id="couponCode" class="form-control"
                               placeholder="e.g. NEWYEAR26" value="{{ old('coupon_code') }}" />
                        <small class="text-muted">Auto formatted (NEWYEAR26)</small>
                        @error('coupon_code')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Type -->
                    <div class="col-md-3">
                        <label class="form-label">Type</label>
                        <select required name="type" id="couponType" class="form-select">
                            <option value="" disabled {{ old('type') ? '' : 'selected' }}>Select Type</option>
                            <option value="fixed" {{ old('type') == 'fixed' ? 'selected' : '' }}>Fixed</option>
                            <option value="percentage" {{ old('type') == 'percentage' ? 'selected' : '' }}>Percentage</option>
                        </select>
                        @error('type')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Status -->
                    <div class="col-md-3">
                        <label class="form-label">Status</label>
                        <select required name="status" class="form-select">
                            <option value="active" {{ old('status', 'active') == 'active' ? 'selected' : '' }}>Active</option>
                            <option value="inactive" {{ old('status') == 'inactive' ? 'selected' : '' }}>Inactive</option>
                        </select>
                        @error('status')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <!-- Second Row -->
                <div class="row g-3 mt-3">
                    <!-- Discount Value -->
                    <div class="col-md-4">
                        <label class="form-label">Discount Value</label>
                        <div class="input-group">
                            <input required type="number" step="0.01" min="0" name="discount_value" id="discountValue" class="form-control"
                                   placeholder="e.g. 100 or 10" value="{{ old('discount_value') }}" />
                            <span class="input-group-text" id="discountSuffix">৳</span>
                        </div>
                        <small class="text-muted" id="discountHint">For fixed: amount. For percentage: 0 - 100.</small>
                        @error('discount_value')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Max Discount -->
                    <div class="col-md-4">
                        <label class="form-label">Max Discount</label>
                        <input type="number" step="0.01" min="0" name="max_discount" class="form-control"
                               placeholder="e.g. 500 (optional for fixed)" value="{{ old('max_discount') }}" />
                        @error('max_discount')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Usage Limit -->
                    <div class="col-md-4">
                        <label class="form-label">Usage Limit</label>
                        <input type="number" min="0" name="usage_limit" class="form-control"
                               placeholder="0 = unlimited" value="{{ old('usage_limit', 0) }}" />
                        @error('usage_limit')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <!-- Third Row -->
                <div class="row g-3 mt-3">
                    <!-- Start Date -->
                    <div class="col-md-6">
                        <label class="form-label">Start Date</label>
                        <input required type="datetime-local" name="start_date" class="form-control" value="{{ old('start_date') }}" />
                        @error('start_date')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- End Date -->
                    <div class="col-md-6">
                        <label class="form-label">End Date</label>
                        <input required type="datetime-local" name="end_date" class="form-control" value="{{ old('end_date') }}" />
                        @error('end_date')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <!-- Fourth Row -->
                <div class="row g-3 mt-3">
                    <!-- Description -->
                    <div class="col-md-12">
                        <label class="form-label">Description</label>
                        <textarea name="description" rows="3" class="form-control" placeholder="Short description...">{{ old('description') }}</textarea>
                        @error('description')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                @hasPermission('coupons.store')
                <div class="row g-3 mt-3">
                    <div class="col-12 text-end">
                        <button type="submit" class="btn btn-primary px-4">Save</button>
                    </div>
                </div>
                @endHasPermission

            </div>
        </div>
    </form>
    <!-- Form End -->
</div>

<script>
    const typeEl = document.getElementById('couponType');
    const suffixEl = document.getElementById('discountSuffix');
    const hintEl = document.getElementById('discountHint');
    const valueEl = document.getElementById('discountValue');

    function applyTypeUI() {
        const t = typeEl.value;

        if (t === 'percentage') {
            suffixEl.textContent = '%';
            hintEl.textContent = 'Percentage coupon: use 0 - 100.';
            valueEl.max = 100;
        } else {
            suffixEl.textContent = '৳';
            hintEl.textContent = 'Fixed coupon: amount in currency.';
            valueEl.removeAttribute('max');
        }
    }

    typeEl.addEventListener('change', applyTypeUI);
    applyTypeUI(); // initial

    const codeEl = document.getElementById('couponCode');

    function formatCouponCode() {
        codeEl.value = codeEl.value
            .replace(/[^a-zA-Z0-9]/g, '')
            .toUpperCase();
    }

    codeEl.addEventListener('input', formatCouponCode);
    formatCouponCode(); // initial
</script>

@endsection
