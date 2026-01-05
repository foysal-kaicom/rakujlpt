<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WebCandidateRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name'    => 'required|string|max:100',
            'last_name'     => 'required|string|max:100',
            'email'         => 'nullable|email|unique:candidates|required_without:phone_number|max:150',
            'phone_number'  => 'nullable|string|unique:candidates|required_without:email|max:20',
            'password'      => 'required|min:6|confirmed',
            'referral_code'    => 'nullable|string|max:100',
        ];
    }
}
