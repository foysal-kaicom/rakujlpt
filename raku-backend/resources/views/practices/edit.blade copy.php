@extends('master')

@section('contents')

    @if ($errors->any())
        <div class="bg-red-100 border border-red-300 rounded-lg p-4 text-white">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
<form action="{{ route('practices.update', $practice->id) }}" method="POST" enctype="multipart/form-data" class="px-10">
    @csrf
    @method('PUT')

    <div class="questionBlock border rounded-lg mb-5 relative">
        <h3 class="text-xl font-semibold p-[12px] rounded-t-lg text-black bg-indigo-300">
            Question
        </h3>

        <div class="p-8 rounded-b-lg bg-white border">
            <div class="grid grid-cols-4 gap-4">
                {{-- <input type="hidden" name="stage_id" value="{{ $stages->id }}" /> --}}
                <input type="hidden" name="stage_id" value="{{ $practice->stage_id }}" />

                {{-- Proficiency Level --}}
                <div class="space-y-2">
                    <label class="block font-semibold">Proficiency Level</label>
                    <select name="question[proficiency_level]" class="bg-white drop-shadow-md text-sm border rounded px-3 py-2" required>
                        <option value="N4" @selected(($practice->questions_array[0]['proficiency_level'] ?? '') === 'N4')>N4</option>
                        <option value="N5" @selected(($practice->questions_array[0]['proficiency_level'] ?? '') === 'N5')>N5</option>
                    </select>
                </div>

                {{-- Question Type --}}
                <div class="space-y-2">
                    <label class="block font-semibold">Question Type</label>
                    <select name="question[question_type]" class="questionType bg-white drop-shadow-md text-sm border rounded px-3 py-2" required>
                        <option value="text" @selected(($practice->questions_array[0]['question_type'] ?? '') === 'text')>Text</option>
                        <option value="image" @selected(($practice->questions_array[0]['question_type'] ?? '') === 'image')>Image</option>
                    </select>
                </div>

                {{-- Question Input --}}
                <div class="space-y-2 col-span-2">
                    <label class="block font-semibold">Question</label>
                    <input name="question[question]" 
                        type="{{ ($practice->questions_array[0]['question_type'] ?? 'text') === 'image' ? 'file' : 'text' }}" 
                        value="{{ ($practice->questions_array[0]['question_type'] ?? 'text') === 'text' ? ($practice->questions_array[0]['question'] ?? '') : '' }}" 
                        placeholder="Enter question" 
                        class="questionInput bg-white drop-shadow-md text-sm border rounded px-3 py-2 w-full" 
                        required />
                </div>
            </div>

            {{-- Options --}}
            <div class="p-6 rounded-lg border bg-white mt-[30px] space-y-7">
                <h3 class="font-semibold rounded text-black">Create Options (Choose the correct answer)</h3>
                <div class="grid grid-cols-2 gap-4">
                    @for ($i = 1; $i <= 4; $i++)
                        <div class="flex items-center gap-1">
                            <input type="radio" name="question[answer]" value="{{ $i }}" class="size-5" 
                                @if(($practice->questions_array[0]['answer'] ?? '') == $i) checked @endif required>
                            <input type="text" name="question[options][{{ $i }}]" placeholder="Option {{ $i }}" 
                                class="bg-white text-sm border rounded px-3 py-2 w-full" 
                                value="{{ $practice->questions_array[0]['options'][$i] ?? '' }}" required>
                        </div>
                    @endfor
                </div>
            </div>

            {{-- Hints --}}
            <div class="mt-4 space-y-2">
                <label class="block font-semibold">Hints</label>
                <input type="text" name="question[hints]" placeholder="Enter hints" 
                    class="bg-white text-sm border rounded px-3 py-2 w-full" 
                    value="{{ $practice->questions_array[0]['hints'] ?? '' }}">
            </div>

            {{-- Explanation --}}
            <div class="mt-4 space-y-2">
                <label class="block font-semibold">Explanation</label>
                <textarea name="question[explanation]" rows="2" placeholder="Enter explanation" 
                    class="bg-white text-sm border rounded px-3 py-2 w-full resize-none">{{ $practice->questions_array[0]['explanation'] ?? '' }}</textarea>
            </div>
        </div>
    </div>

    {{-- Submit Button --}}
    <div class="flex justify-center mt-5">
        <button type="submit" class="px-8 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:opacity-90 duration-300 w-[250px]">
            Update Question
        </button>
    </div>
</form>
@endsection
