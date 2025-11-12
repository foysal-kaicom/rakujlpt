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

<form action="{{ route('practices.store') }}" method="POST" enctype="multipart/form-data" class="px-10">
    @csrf

    <div class="questionBlock border rounded-lg mb-5 relative">
        <h3 class="text-xl font-semibold p-[12px] rounded-t-lg text-black bg-indigo-300">
            Create Question
        </h3>

        <div class="p-8 rounded-b-lg bg-white border">
            <div class="grid grid-cols-4 gap-4">
                <input type="hidden" name="stage_id" value="{{ $stageId }}" />

                {{-- Proficiency Level --}}
                <div class="space-y-2">
                    <label class="block font-semibold">Proficiency Level</label>
                    <select name="question[proficiency_level]" class="bg-white drop-shadow-md text-sm border rounded px-3 py-2" required>
                        <option value="">Select Level</option>
                        <option value="N4">N4</option>
                        <option value="N5">N5</option>
                    </select>
                </div>

                {{-- Question Type --}}
                <div class="space-y-2">
                    <label class="block font-semibold">Question Type</label>
                    <select name="question[question_type]" class="questionType bg-white drop-shadow-md text-sm border rounded px-3 py-2" required>
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                        <option value="audio">Audio</option>
                    </select>
                </div>

               
                <div class="space-y-2 col-span-2">
                    <label class="block font-semibold">Question</label>

                    {{-- Main Question Input --}}
                
                    <textarea id="content" name="question[question]" class="tinymce"></textarea>


                    {{-- Image Preview --}}
                    <img id="imagePreview" src="#" alt="Image Preview" class="hidden mt-2 max-h-48 border rounded" />

                    {{-- Audio File Input (only for audio type) --}}
                    <div id="audioInputContainer" class="hidden mt-2">
                        <label class="block font-semibold">Upload Audio</label>
                        <input type="file" name="question[audio_file]" accept="audio/*"
                            class="audioInput bg-white drop-shadow-md border rounded px-3 py-2 w-full">
                    </div>

                    {{-- Audio Preview --}}
                    <audio id="audioPreview" controls class="hidden mt-2"></audio>
                </div>




            </div>

            {{-- Audio file input, hidden by default --}}
            {{-- <div class="mt-4 space-y-2 hidden audioInputWrapper">
                <label class="block font-semibold">Upload Audio</label>
                <input type="file" name="question[audio_file]" accept="audio/*" class="bg-white text-sm border rounded px-3 py-2 w-full">
            </div> --}}

            {{-- Options --}}
            <div class="p-6 rounded-lg border bg-white mt-[30px] space-y-7">
            <h3 class="font-semibold rounded text-black">Create Options (Choose the correct answer)</h3>
            <div class="grid lg:grid-cols-2 gap-4">
                    @for ($i = 1; $i <= 4; $i++)
                        

                        <input type="radio" name="questions[answer]" value="{{ $i }}" class="size-5">
                  <div class="optionWrapper w-full" data-q="${i}" data-opt="${opt}">
                    <textarea id="content" name="question[options][{{ $i }}]" placeholder="Option {{ $i }}" class="tinymce"></textarea>
                  </div>
                    @endfor
                </div>
            </div>

            {{-- Hints --}}
            <div class="mt-4 space-y-2">
                <label class="block font-semibold">Hints</label>
                <input type="text" name="question[hints]" placeholder="Enter hints" 
                       class="bg-white text-sm border rounded px-3 py-2 w-full">
            </div>

            {{-- Explanation --}}
            <div class="mt-4 space-y-2">
                <label class="block font-semibold">Explanation</label>
                <textarea name="question[explanation]" rows="2" placeholder="Enter explanation" 
                          class="bg-white text-sm border rounded px-3 py-2 w-full resize-none"></textarea>
            </div>
        </div>
    </div>

    {{-- Submit Button --}}
    <div class="flex justify-center mt-5">
        <button type="submit" class="px-8 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:opacity-90 duration-300 w-[250px]">
            Create Question
        </button>
    </div>
</form>




<script>
document.addEventListener("DOMContentLoaded", function() {
    const questionTypeSelect = document.querySelector(".questionType");
    const questionInput = document.querySelector(".questionInput");
    const imagePreview = document.getElementById("imagePreview");

    const audioInputContainer = document.getElementById("audioInputContainer");
    const audioInput = document.querySelector(".audioInput");
    const audioPreview = document.getElementById("audioPreview");

    questionTypeSelect.addEventListener("change", function () {
        const type = this.value;

        // Reset fields
        questionInput.value = "";
        questionInput.type = "text";
        questionInput.placeholder = "Enter question";
        questionInput.accept = "";
        imagePreview.classList.add("hidden");
        audioInputContainer.classList.add("hidden");
        audioPreview.classList.add("hidden");

        if (type === "text") {
            questionInput.type = "text";
            questionInput.required = true;
        } 
        else if (type === "image") {
            questionInput.type = "file";
            questionInput.accept = "image/*";
            questionInput.required = true;
        } 
        else if (type === "audio") {
            // Main question becomes image input
            questionInput.type = "file";
            questionInput.accept = "image/*";
            questionInput.required = true;

            // Show audio file input
            audioInputContainer.classList.remove("hidden");
        }
    });

    // Preview main image (for image or audio type)
    questionInput.addEventListener("change", function() {
        if (this.files && this.files[0] && (questionTypeSelect.value === "image" || questionTypeSelect.value === "audio")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.classList.remove("hidden");
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Preview audio
    audioInput.addEventListener("change", function() {
        if (this.files && this.files[0]) {
            const url = URL.createObjectURL(this.files[0]);
            audioPreview.src = url;
            audioPreview.classList.remove("hidden");
        }
    });
});

</script>




@endsection
