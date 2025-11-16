{{-- @extends('master')

@section('contents')

<div class="card shadow-lg border-0 rounded-3">
    <!-- Header -->
    <div class="card-header py-3 rounded-top bg-indigo-300">
        <h3 class="fs-5 fw-semibold mb-0 flex items-center gap-2">
            Create Stage
        </h3>
    </div>

    <!-- Form -->
    <form action="{{ route('stages.store') }}" method="POST" enctype="multipart/form-data" class="p-4">
        @csrf

        <div class="row g-4">
            <!-- Image Upload -->
            <div class="col-md-3 text-center">
                <div class="position-relative border rounded bg-light d-flex align-items-center justify-content-center shadow-sm h-[250px]">
                    <img id="imagePreview" src="{{ asset('imagePH.png') }}" alt="Display Image"
                        class="w-100 h-[250px] object-fit-cover rounded" />
                    <button type="button" id="removeImage"
                        class="btn btn-sm btn-light border shadow-sm position-absolute top-0 end-0 rounded-circle">&times;</button>
                </div>
                <input type="file" accept="image/*" id="fileInput" name="image" class="d-none" />
                <label for="fileInput" class="btn btn-outline-primary mt-3 w-100 rounded-pill flex items-center gap-2 justify-center">
                    Choose Image
                </label>
                @error('image')
                <div class="text-danger small">{{ $message }}</div>
                @enderror
            </div>

            <!-- Form Fields -->
            <div class="col-md-9">
                <div class="row g-3">
                    <!-- Roadmap -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Select Roadmap</label>
                        <select name="roadmap_id" class="form-select shadow-sm rounded-2">
                            <option value="">Choose a roadmap...</option>
                            @foreach($roadmaps as $roadmap)
                                <option value="{{ $roadmap->id }}" {{ old('roadmap_id') == $roadmap->id ? 'selected' : '' }}>
                                    {{ $roadmap->title }}
                                </option>
                            @endforeach
                        </select>
                        @error('roadmap_id') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                     <!-- Order -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Order</label>
                        <input type="number" name="order" value="{{ old('order') }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="EX: 1" required />
                        @error('order') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Stage Title -->
                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Stage Title</label>
                        <input type="text" name="title" id="titleInput" value="{{ old('title') }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Enter stage title" required />
                        @error('title') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Stage Slug -->
                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Slug</label>
                        <input type="text" name="slug" id="slugInput" value="{{ old('slug') }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Slug" readonly required />
                        @error('slug') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Duration -->
                    <div class="col-md-4">
                        <label class="block font-semibold">Duration (minutes)</label>
                        <input type="number" name="duration" value="{{ old('duration') }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Enter duration in minutes" />
                        @error('duration') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Description -->
                    <div class="col-md-12">
                        <label class="form-label fw-semibold">Description</label>
                        <textarea name="description" rows="4" class="form-control shadow-sm rounded-2"
                            placeholder="Stage description">{{ old('description') }}</textarea>
                        @error('description') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>
                </div>
            </div>
        </div>


    

        <div id="questionsContainer" class="pt-5"></div>

        <!-- Add More Button -->
        <div class="flex justify-center mt-5">
            <button type="button" id="addMoreBtn" class="px-8 py-2 rounded-md bg-green-500 text-white font-semibold hover:opacity-90 duration-300 w-[250px]">
            Add More Question
            </button>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center mt-5 mb-5">
            <button type="submit" class="px-8 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:opacity-90 duration-300 w-[250px]">
            Create Questions
            </button>
        </div>
    </form>
</div> --}}




{{-- <!-- JavaScript for Image Preview -->
<script>
    const fileInput = document.getElementById("fileInput");
    const imagePreview = document.getElementById("imagePreview");
    const removeBtn = document.getElementById("removeImage");

    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = function(e){
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    removeBtn.addEventListener("click", function(){
        imagePreview.src = "{{ asset('imagePH.png') }}";
        fileInput.value = "";
    });
</script>
<script>
    const titleInput = document.getElementById("titleInput");
    const slugInput = document.getElementById("slugInput");

    function slugify(text) {
        return text.toString().toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-')   // Replace spaces & non-word chars with -
            .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
    }

    titleInput.addEventListener("input", function() {
        slugInput.value = slugify(this.value);
    });
</script>


<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const questionsContainer = document.getElementById("questionsContainer");
    const addMoreBtn = document.getElementById("addMoreBtn");

    // Function to create a question block
    function createQuestionBlock(existingQuestion = null) {
        const currentIndex = questionsContainer.querySelectorAll(".questionBlock").length;

        const questionData = existingQuestion || {
            proficiency_level: '',
            question_type: 'text',
            question: '',
            options: {1:'',2:'',3:'',4:''},
            answer: '',
            hints: '',
            explanation: ''
        };

        const questionBlock = document.createElement("div");
        questionBlock.classList.add("questionBlock", "border", "rounded-lg", "mb-5", "relative");
        questionBlock.dataset.index = currentIndex;

        questionBlock.innerHTML = `
            <h3 class="text-xl font-semibold p-[12px] rounded-t-lg text-black bg-indigo-300 flex justify-between items-center">
                <span>Create Question ${currentIndex + 1}</span>
                <button type="button" class="removeQuestionBtn text-red-600 font-bold text-lg">&times;</button>
            </h3>
            <div class="p-8 rounded-b-lg bg-white border">
                <div class="grid grid-cols-4 gap-4">
                    <div class="space-y-2">
                        <label class="block font-semibold">Proficiency Level</label>
                        <select name="questions[${currentIndex}][proficiency_level]" class="bg-white drop-shadow-md text-sm border rounded px-3 py-2" required>
                            <option value="">Select Level</option>
                            <option value="n4" ${questionData.proficiency_level === 'n4' ? 'selected' : ''}>N4</option>
                            <option value="n5" ${questionData.proficiency_level === 'n5' ? 'selected' : ''}>N5</option>
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="block font-semibold">Question Type</label>
                        <select name="questions[${currentIndex}][question_type]" class="questionType bg-white drop-shadow-md text-sm border rounded px-3 py-2" required>
                            <option value="text" ${questionData.question_type === 'text' ? 'selected' : ''}>Text</option>
                            <option value="image" ${questionData.question_type === 'image' ? 'selected' : ''}>Image</option>
                        </select>
                    </div>

                    <div class="space-y-2 col-span-2">
                        <label class="block font-semibold">Question</label>
                        <input name="questions[${currentIndex}][question]" type="${questionData.question_type === 'image' ? 'file' : 'text'}" 
                        value="${questionData.question_type === 'text' ? questionData.question : ''}" placeholder="Enter question" 
                        class="questionInput bg-white drop-shadow-md text-sm border rounded px-3 py-2 w-full" required />
                    </div>
                </div>

                <div class="p-6 rounded-lg border bg-white mt-[30px] space-y-7">
                    <h3 class="font-semibold rounded text-black">Create Options (Choose the correct answer)</h3>
                    <div class="grid grid-cols-2 gap-4">
                        ${[1,2,3,4].map(opt => `
                        <div class="flex items-center gap-1">
                            <input type="radio" name="questions[${currentIndex}][answer]" value="${opt}" class="size-5" ${questionData.answer == opt ? 'checked' : ''} required>
                            <input type="text" name="questions[${currentIndex}][options][${opt}]" placeholder="Option ${opt}" class="bg-white text-sm border rounded px-3 py-2 w-full" value="${questionData.options[opt] || ''}" required>
                        </div>`).join('')}
                    </div>
                </div>

                <div class="mt-4 space-y-2">
                    <label class="block font-semibold">Hints</label>
                    <input type="text" name="questions[${currentIndex}][hints]" placeholder="Enter hints" class="bg-white text-sm border rounded px-3 py-2 w-full" value="${questionData.hints || ''}">
                </div>

                <div class="mt-4 space-y-2">
                    <label class="block font-semibold">Explanation</label>
                    <textarea name="questions[${currentIndex}][explanation]" rows="2" placeholder="Enter explanation" class="bg-white text-sm border rounded px-3 py-2 w-full resize-none">${questionData.explanation || ''}</textarea>
                </div>
            </div>
        `;

        questionsContainer.appendChild(questionBlock);

        // Question type change handler
        const questionTypeSelect = questionBlock.querySelector(".questionType");
        questionTypeSelect.addEventListener("change", function () {
            const inputEl = questionBlock.querySelector(".questionInput");
            if (this.value === "image") {
                inputEl.type = "file";
                inputEl.placeholder = "";
                inputEl.value = "";
            } else {
                inputEl.type = "text";
                inputEl.placeholder = "Enter question";
            }
        });
    }

    // Add More button click handler
    addMoreBtn.addEventListener("click", () => createQuestionBlock());

    // Initialize with one question
    createQuestionBlock();

    // Remove question with SweetAlert and never delete first
    questionsContainer.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains("removeQuestionBtn")) {
            const questionBlock = e.target.closest(".questionBlock");
            const index = parseInt(questionBlock.dataset.index);

            if (index === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Cannot Delete',
                    text: 'The first question cannot be deleted!',
                });
                return;
            }

            Swal.fire({
                title: 'Are you sure?',
                text: "This will remove the question permanently!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    questionBlock.remove();

                    // Re-index remaining questions
                    const blocks = questionsContainer.querySelectorAll(".questionBlock");
                    blocks.forEach((block, idx) => {
                        block.dataset.index = idx;
                        block.querySelectorAll("input, select, textarea").forEach(input => {
                            input.name = input.name.replace(/\d+/, idx);
                        });
                        block.querySelector("h3 span").textContent = `Create Question ${idx + 1}`;
                    });
                }
            });
        }
    });

    // Form validation
    document.querySelector("form").addEventListener("submit", function(e) {
        let valid = true;

        document.querySelectorAll(".questionBlock").forEach(block => {
            block.querySelectorAll("input, select, textarea").forEach(input => {
                if (!input.value && input.type !== "file") {
                    valid = false;
                    input.classList.add("border-red-500");
                } else {
                    input.classList.remove("border-red-500");
                }
            });
        });

        if (!valid) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill all required fields in the question blocks!',
            });
        }
    });
});
</script> --}}

{{-- @endsection --}}
















