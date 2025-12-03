<?php
 
namespace App\Http\Requests;
 
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;
 
class StoreMockTestRequest extends FormRequest
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
            'section_id'        => 'required|integer|exists:mock_test_sections,id',
            'group_type'        => 'required|in:single,multiple',
            'group_by'          => 'nullable|in:passage,audio',
            'question_quantity' => 'required|integer|min:1',
 
 
                'passage_or_file' => [
                    'nullable',
                    Rule::when(fn($input) => $input->group_by === 'passage', [
                        'string',
                        'max:5000',
                    ]),
                    Rule::when(fn($input) => $input->group_by === 'audio', [
                        'file',
                        'mimes:mp3,wav,ogg',
                        'max:10240',
                    ]),
                ],
 
            'questions'                     => 'required|array|min:1',
            'questions.*.proficiency_level' => 'required|in:N4,N5',
            'questions.*.question_type'     => 'required|in:text,image,audio',

            'questions.*.question'          => [
                'required',
                function ($attribute, $value, $fail) {
                    $parts = explode('.', $attribute);
                    $index = $parts[1] ?? null;
                    $type  = request()->input("questions.$index.question_type");

                    if ($type === 'text' && !is_string($value)) {
                        $fail('The question must be text when type is text.');
                    }
                    if ($type === 'image' && !($value instanceof \Illuminate\Http\UploadedFile)) {
                        $fail('The question must be an image file when type is image.');
                    }
                    if ($type === 'audio' && !($value instanceof \Illuminate\Http\UploadedFile)) {
                        $fail('The question must be an audio file when type is audio.');
                    }
                }
            ],

            'questions.*.options' => 'required|array|min:3|max:4',

            'questions.*.options.1' => 'required|string',
            'questions.*.options.2' => 'required|string',
            'questions.*.options.3' => 'required|string',
            'questions.*.options.4' => 'nullable|string',

            // Answer must correspond to a non-empty option
            'questions.*.answer' => [
                'required',
                'integer',
                function ($attribute, $value, $fail) {
                    $parts = explode('.', $attribute);
                    $index = $parts[1] ?? null;

                    $options = request()->input("questions.$index.options", []);

                    if (!array_key_exists($value, $options)) {
                        return $fail("Selected answer does not correspond to a valid option.");
                    }

                    if (trim($options[$value]) === '') {
                        return $fail("Cannot select an empty option as the answer.");
                    }
                }
            ],

            'set_no' => 'required|integer'
        ];
    }
 
    /**
     * Custom messages for validation.
     */
   protected function failedValidation(Validator $validator)
    {
        foreach ($validator->errors()->all() as $error) {
            Toastr::error($error);
        }
 
        throw new HttpResponseException(
            redirect()->back()->withInput()
        );
    }
}