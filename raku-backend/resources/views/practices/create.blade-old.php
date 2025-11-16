@extends('master')

@section('contents')
<style>
    .removeQuestionBtn {
        font-size: 2rem;
        padding-right: 1rem;
    }
</style>

<form action="{{ route('practices.store') }}" class="px-10" method="post" enctype="multipart/form-data">
    @csrf
    <h3 class="text-xl font-semibold p-[12px] rounded-t-lg text-black bg-indigo-300">Create Question Group</h3>
    <div class="p-8 rounded-b-lg bg-white border">
        <div class="grid grid-cols-3 gap-6">
            {{-- Stage Select --}}
            <div class="space-y-2">
                <label for="stageSelect" class="block text-sm font-semibold text-gray-700">Select Stage <span class="text-red-500">*</span></label>
                <select id="stageSelect" name="stage_id"
                    class="bg-white border border-gray-300 rounded-lg p-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full">
                    <option value="">-- Choose Stage --</option>
                    @foreach($stages as $stage)
                        <option value="{{ $stage->id }}"> {{ $stage->roadmap->title }} - {{ $stage->title }}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>

    <!-- Container for questions -->
    <div id="questionsContainer"></div>

    <!-- Add More Button -->
    <div class="flex justify-center mt-5">
        <button type="button" id="addMoreBtn" class="px-8 py-2 rounded-md bg-green-500 text-white font-semibold hover:opacity-90 duration-300 w-[250px]">
        Add More Question
        </button>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-center mt-5">
        <button type="submit" class="px-8 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:opacity-90 duration-300 w-[250px]">
        Create Questions
        </button>
    </div>
</form>

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
</script>


@endsection