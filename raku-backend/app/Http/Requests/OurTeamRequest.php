<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OurTeamRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'          => 'required|string|max:255',
            'email'         => 'nullable|email|max:255',
            'designation'   => 'required|string|max:255',
            'description'   => 'nullable|string',
            'photo'         => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'linkedin_url'  => 'nullable|url',
            'facebook_url'  => 'nullable|url',
            'github_url'    => 'nullable|url',
            'serial_no'     => 'required|integer|min:0'
        ];
    }
}
