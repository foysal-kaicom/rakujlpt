<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImportMockTestCsvNamesRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'csv' => 'required|file|mimes:csv,txt|max:20480', // 20MB
        ];
    }
}
