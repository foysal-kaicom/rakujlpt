@extends('master')

@section('contents')

<div class="rounded shadow-sm">
    <div class="p-3 rounded-top bg-indigo-300">
        <h3 class="fs-5">Edit Coupon</h3>
    </div>

    <!-- Form Start -->
    <form action="{{ route('coupon.update', $coupon->id) }}" method="POST" class="bg-white p-4 rounded-bottom">
        @csrf

        <div class="row g-4">
            <div class="col-md-12">
                <div class="row g-3">
                    <!-- Title -->
                    <div class="col-md-4">
                        <label class="form-label">Title</label>
                        <input required type="text" name="title" class="form-control"
                               placeholder="e.g. Winter Sale"
                               value="{{ old('title', $coupon->title) }}" />
                        @error('title')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Type -->
                    <div class="col-md-4">
                        <label class="form-label">Type</label>
                        <select required name="type" id="couponType" class="form-select">
                            <option value="" disabled>Select Type</option>
                            <option value="fixed" {{ old('type', $coupon->type) == 'fixed' ? 'selected' : '' }}>Fixed</option>
                            <option value="percentage" {{ old('type', $coupon->type) == 'percentage' ? 'selected' : '' }}>Percentage</option>
                        </select>
                        @error('type')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Status -->
                    <div class="col-md-4">
                        <label class="form-label">Status</label>
                        <select required name="status" class="form-select">
                            <option value="active" {{ old('status', $coupon->status) == 'active' ? 'selected' : '' }}>Active</option>
                            <option value="inactive" {{ old('status', $coupon->status) == 'inactive' ? 'selected' : '' }}>Inactive</option>
                        </select>
                        @error('status')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row g-3 mt-3">
                    <!-- Discount Value -->
                    <div class="col-md-4">
                        <label class="form-label">Discount Value</label>
                        <div class="input-group">
                            <input required type="number" step="0.01" min="0" name="discount_value" id="discountValue"
                                   class="form-control" placeholder="e.g. 100 or 10"
                                   value="{{ old('discount_value', $coupon->discount_value) }}" />
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
                               placeholder="e.g. 500 (optional for fixed)"
                               value="{{ old('max_discount', $coupon->max_discount) }}" />
                        @error('max_discount')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Usage Limit -->
                    <div class="col-md-4">
                        <label class="form-label">Usage Limit</label>
                        <input type="number" min="0" name="usage_limit" class="form-control"
                               placeholder="0 = unlimited"
                               value="{{ old('usage_limit', $coupon->usage_limit) }}" />
                        @error('usage_limit')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row g-3 mt-3">
                    <!-- Start Date -->
                    <div class="col-md-6">
                        <label class="form-label">Start Date</label>
                        <input required type="datetime-local" name="start_date" class="form-control"
                               value="{{ old('start_date', \Carbon\Carbon::parse($coupon->start_date)->format('Y-m-d\TH:i')) }}" />
                        @error('start_date')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- End Date -->
                    <div class="col-md-6">
                        <label class="form-label">End Date</label>
                        <input required type="datetime-local" name="end_date" class="form-control"
                               value="{{ old('end_date', \Carbon\Carbon::parse($coupon->end_date)->format('Y-m-d\TH:i')) }}" />
                        @error('end_date')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row g-3 mt-3">
                    <!-- Description -->
                    <div class="col-md-12">
                        <label class="form-label">Description</label>
                        <textarea name="description" rows="3" class="form-control"
                                  placeholder="Short description...">{{ old('description', $coupon->description) }}</textarea>
                        @error('description')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                @hasPermission('coupons.update')
                <div class="row g-3 mt-3">
                    <div class="col-12 text-end">
                        <button type="submit" class="btn btn-primary px-4">Update</button>
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
    applyTypeUI();
</script>

@endsection
