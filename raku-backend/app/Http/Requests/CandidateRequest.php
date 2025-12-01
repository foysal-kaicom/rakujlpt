<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CandidateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }



    public function rules(): array
    {
        $isUpdate = $this->isMethod('PUT');
        $candidateId = $this->route('id');

        return [
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'date_of_birth' => 'required|date|before_or_equal:' . now()->subYears(10)->toDateString(),
            'national_id' => 'required|string|max:20',
            'gender' => 'required|in:male,female',
            'currently_living_country' => 'nullable|in:Bangladesh,Japan',
            'social_facebook' => 'nullable|url',
            'social_linkedin' => 'nullable|url',
            'address' => 'nullable|string|max:500',

            'photo' => $isUpdate
                ? ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048']
                : ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], 

            'email' => $isUpdate
                ? ['prohibited']
                : ['required', 'email', Rule::unique('candidates', 'email')->whereNull('deleted_at')],

           'phone_number' => [
                'required',
                Rule::unique('candidates', 'phone_number')->ignore($candidateId)
            ],

        ];
    }
}
