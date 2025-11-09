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

@php
    $question = $practice->questions_array[0] ?? [];
@endphp

<form action="{{ route('practices.update', $practice->id) }}" method="POST" enctype="multipart/form-data" class="px-10">
    @csrf
    @method('PUT')

    <div class="questionBlock border rounded-lg mb-5 relative">
        <h3 class="text-xl font-semibold p-[12px] rounded-t-lg text-black bg-indigo-300">
            Edit Question
        </h3>

        <div class="p-8 rounded-b-lg bg-white border">
            <div class="grid grid-cols-4 gap-4">
                <input type="hidden" name="stage_id" value="{{ $practice->stage_id }}" />

                {{-- Proficiency Level --}}
                <div class="space-y-2">
                    <label class="block font-semibold">Proficiency Level</label>
                    <select name="question[proficiency_level]" class="bg-white drop-shadow-md text-sm border rounded px-3 py-2" required>
                        <option value="">Select Level</option>
                        <option value="N4" {{ ($question['proficiency_level'] ?? '') == 'N4' ? 'selected' : '' }}>N4</option>
                        <option value="N5" {{ ($question['proficiency_level'] ?? '') == 'N5' ? 'selected' : '' }}>N5</option>
                    </select>
                </div>

                {{-- Question Type --}}
                <div class="space-y-2">
                    <label class="block font-semibold">Question Type</label>
                    <select name="question[question_type]" class="questionType bg-white drop-shadow-md text-sm border rounded px-3 py-2" required>
                        <option value="text" {{ ($question['question_type'] ?? '') == 'text' ? 'selected' : '' }}>Text</option>
                        <option value="image" {{ ($question['question_type'] ?? '') == 'image' ? 'selected' : '' }}>Image</option>
                        <option value="audio" {{ ($question['question_type'] ?? '') == 'audio' ? 'selected' : '' }}>Audio</option>
                    </select>
                </div>

                {{-- Question Input --}}
                <div class="space-y-2 col-span-2">
                    <label class="block font-semibold">Question</label>

                    {{-- Show current value for text type --}}
                    @if(($question['question_type'] ?? '') === 'text')
                        <input name="question[question]" type="text" placeholder="Enter question"
                            value="{{ $question['question'] ?? '' }}"
                            class="questionInput bg-white drop-shadow-md text-sm border rounded px-3 py-2 w-full" required />
                    @else
                        {{-- For image/audio, show file input --}}
                        <input name="question[question]" type="file" accept="image/*"
                            class="questionInput bg-white drop-shadow-md text-sm border rounded px-3 py-2 w-full" />
                        
                        {{-- Show existing image if available --}}
                        @if(!empty($question['question']) && in_array($question['question_type'] ?? '', ['image', 'audio']))
                            <div class="mt-2">
                                <p class="text-sm text-gray-600 mb-1">Current Image:</p>
                                <img src="{{ asset('storage/' . $question['question']) }}" alt="Current Question" class="max-h-48 border rounded" id="currentImage" />
                            </div>
                        @endif
                    @endif

                    {{-- Image Preview for new uploads --}}
                    <img id="imagePreview" src="#" alt="Image Preview" class="hidden mt-2 max-h-48 border rounded" />

                    {{-- Audio File Input (only for audio type) --}}
                    <div id="audioInputContainer" class="{{ ($question['question_type'] ?? '') === 'audio' ? '' : 'hidden' }} mt-2">
                        <label class="block font-semibold">Upload Audio</label>
                        <input type="file" name="question[audio_file]" accept="audio/*"
                            class="audioInput bg-white drop-shadow-md border rounded px-3 py-2 w-full">
                        
                        {{-- Show existing audio if available --}}
                        @if(!empty($question['audio_file']))
                            <div class="mt-2">
                                <p class="text-sm text-gray-600 mb-1">Current Audio:</p>
                                <audio controls class="mt-2" id="currentAudio">
                                    <source src="{{ asset('storage/' . $question['audio_file']) }}" type="audio/mpeg">
                                </audio>
                            </div>
                        @endif
                    </div>

                    {{-- Audio Preview for new uploads --}}
                    <audio id="audioPreview" controls class="hidden mt-2"></audio>
                </div>
            </div>

            {{-- Options --}}
            <div class="p-6 rounded-lg border bg-white mt-[30px] space-y-7">
                <h3 class="font-semibold rounded text-black">Edit Options (Choose the correct answer)</h3>
                <div class="grid grid-cols-2 gap-4">
                    @for ($i = 1; $i <= 4; $i++)
                        <div class="flex items-center gap-1">
                            <input type="radio" name="question[answer]" value="{{ $i }}" 
                                   {{ ($question['answer'] ?? 1) == $i ? 'checked' : '' }}
                                   class="size-5" required>
                            <input type="text" name="question[options][{{ $i }}]" placeholder="Option {{ $i }}"
                                   value="{{ $question['options'][$i] ?? '' }}"
                                   class="bg-white text-sm border rounded px-3 py-2 w-full" required>
                        </div>
                    @endfor
                </div>
            </div>

            {{-- Hints --}}
            <div class="mt-4 space-y-2">
                <label class="block font-semibold">Hints</label>
                <input type="text" name="question[hints]" placeholder="Enter hints" 
                       value="{{ $question['hints'] ?? '' }}"
                       class="bg-white text-sm border rounded px-3 py-2 w-full">
            </div>

            {{-- Explanation --}}
            <div class="mt-4 space-y-2">
                <label class="block font-semibold">Explanation</label>
                <textarea name="question[explanation]" rows="2" placeholder="Enter explanation" 
                          class="bg-white text-sm border rounded px-3 py-2 w-full resize-none">{{ $question['explanation'] ?? '' }}</textarea>
            </div>
        </div>
    </div>

    {{-- Submit Button --}}
    <div class="flex justify-center mt-5 gap-4">
        <a href="{{ route('stages.index') }}" class="px-8 py-2 rounded-md bg-gray-500 text-white font-semibold hover:opacity-90 duration-300 w-[250px] text-center">
            Cancel
        </a>
        <button type="submit" class="px-8 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:opacity-90 duration-300 w-[250px]">
            Update Question
        </button>
    </div>
</form>

<script>
document.addEventListener("DOMContentLoaded", function() {
    const questionTypeSelect = document.querySelector(".questionType");
    const questionInput = document.querySelector(".questionInput");
    const imagePreview = document.getElementById("imagePreview");
    const currentImage = document.getElementById("currentImage");
    const audioInputContainer = document.getElementById("audioInputContainer");
    const audioInput = document.querySelector(".audioInput");
    const audioPreview = document.getElementById("audioPreview");
    const currentAudio = document.getElementById("currentAudio");

    // Get initial type
    const initialType = questionTypeSelect.value;

    questionTypeSelect.addEventListener("change", function () {
        const type = this.value;

        // Reset fields
        questionInput.value = "";
        imagePreview.classList.add("hidden");
        audioInputContainer.classList.add("hidden");
        audioPreview.classList.add("hidden");
        
        if (currentImage) currentImage.classList.add("hidden");
        if (currentAudio) currentAudio.parentElement.classList.add("hidden");

        if (type === "text") {
            questionInput.type = "text";
            questionInput.accept = "";
            questionInput.placeholder = "Enter question";
            questionInput.required = true;
        } 
        else if (type === "image") {
            questionInput.type = "file";
            questionInput.accept = "image/*";
            questionInput.placeholder = "";
            questionInput.required = false; // Not required for edit (can keep existing)
            if (currentImage) currentImage.classList.remove("hidden");
        } 
        else if (type === "audio") {
            questionInput.type = "file";
            questionInput.accept = "image/*";
            questionInput.placeholder = "";
            questionInput.required = false;
            audioInputContainer.classList.remove("hidden");
            if (currentImage) currentImage.classList.remove("hidden");
            if (currentAudio) currentAudio.parentElement.classList.remove("hidden");
        }
    });

    // Preview main image (for image or audio type)
    questionInput.addEventListener("change", function() {
        if (this.files && this.files[0] && (questionTypeSelect.value === "image" || questionTypeSelect.value === "audio")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.classList.remove("hidden");
                if (currentImage) currentImage.classList.add("hidden");
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Preview audio
    if (audioInput) {
        audioInput.addEventListener("change", function() {
            if (this.files && this.files[0]) {
                const url = URL.createObjectURL(this.files[0]);
                audioPreview.src = url;
                audioPreview.classList.remove("hidden");
                if (currentAudio) currentAudio.parentElement.classList.add("hidden");
            }
        });
    }
});
</script>

@endsection