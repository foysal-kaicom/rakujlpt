<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PartnerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        return [
            'name'   => 'required|string|max:255|unique:partners,name,' . $id,
            'info'   => 'nullable|string',
            'logo'   => ($this->isMethod('post') ? 'nullable' : 'nullable') . '|image|mimes:jpg,jpeg,png,webp,svg|max:3072',
        ];
    }
}
