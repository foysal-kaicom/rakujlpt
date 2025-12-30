<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CouponRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'          => ['required', 'string', 'max:255'],
            'description'    => ['nullable', 'string'],
            'type'           => ['required', 'in:fixed,percentage'],
            'discount_value' => ['required', 'numeric', 'min:0.01'],
            'max_discount'   => ['nullable', 'numeric', 'min:0'],
            'start_date'     => ['required', 'date'],
            'end_date'       => ['required', 'date', 'after:start_date'],
            'usage_limit'    => ['nullable', 'integer', 'min:0'],
            'status'         => ['required', 'in:active,inactive'],
        ];
    }

    /**
     *  Custom validation messages
     */
    public function messages(): array
    {
        return [
            'title.required'          => 'Coupon title is required.',
            'title.max'               => 'Coupon title may not be greater than 255 characters.',

            'type.required'           => 'Please select a coupon type.',
            'type.in'                 => 'Coupon type must be either Fixed or Percentage.',

            'discount_value.required' => 'Discount value is required.',
            'discount_value.numeric'  => 'Discount value must be a number.',
            'discount_value.min'      => 'Discount value must be greater than zero.',

            'max_discount.numeric'    => 'Max discount must be a valid number.',
            'max_discount.min'        => 'Max discount cannot be negative.',

            'start_date.required'     => 'Start date is required.',
            'start_date.date'         => 'Start date must be a valid date.',

            'end_date.required'       => 'End date is required.',
            'end_date.date'           => 'End date must be a valid date.',
            'end_date.after'          => 'End date must be after the start date.',

            'usage_limit.integer'     => 'Usage limit must be a whole number.',
            'usage_limit.min'         => 'Usage limit cannot be negative.',

            'status.required'         => 'Please select coupon status.',
            'status.in'               => 'Status must be Active or Inactive.',
        ];
    }

    /**
     * Friendly attribute names (Blade will show these)
     */
    public function attributes(): array
    {
        return [
            'discount_value' => 'discount value',
            'max_discount'   => 'maximum discount',
            'usage_limit'    => 'usage limit',
            'start_date'     => 'start date',
            'end_date'       => 'end date',
        ];
    }

    /**
     *  Extra conditional validation
     */
    protected function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (
                $this->type === 'percentage'
                && $this->discount_value > 100
            ) {
                $validator->errors()->add(
                    'discount_value',
                    'Percentage discount cannot be greater than 100.'
                );
            }
        });
    }
}
