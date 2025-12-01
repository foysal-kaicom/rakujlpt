@extends('master')

@section('contents')

    <form action="{{ route('mock-tests.question-setup.post') }}" class="px-10" method="post" enctype="multipart/form-data">
        @csrf
        <h3 class="text-xl font-semibold p-[12px] rounded-t-lg text-black bg-indigo-300">Create Question Group</h3>
        <div class="p-8 rounded-b-lg bg-white border">
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">

                <!-- Exam Dropdown -->
                <div class="space-y-2">
                    <label for="examSelect" class="block font-semibold">Select Exam</label>
                    <select id="examSelect" name="exam_id"
                        class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full">
                        <option value="">Select Exam</option>
                        @foreach ($exams as $exam)
                            <option value="{{ $exam->id }}">{{ $exam->title }}</option>
                        @endforeach
                    </select>
                </div>

                <!-- Module Dropdown -->
                <div class="space-y-2">
                    <label for="moduleSelect" class="block font-semibold">Select Module</label>
                    <select id="moduleSelect" name="module_id"
                        class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full">
                        <option value="">Select Module</option>
                    </select>
                </div>

                <!-- Section Dropdown -->
                <div class="space-y-2">
                    <label for="sectionSelect" class="block font-semibold">Select Section</label>
                    <select id="sectionSelect" name="section_id"
                        class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full">
                        <option value="">Select Section</option>
                    </select>
                </div>




                <div class="space-y-2">
                    <label for="questionTypeSelect" class="block font-semibold">Group Type</label>
                    <select id="questionTypeSelect" name="group_type"
                        class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full">
                        <option value="single" selected>Single</option>
                        <option value="multiple">Multiple</option>
                    </select>
                </div>

                <div class="space-y-2">
                    <label for="groupBySelect" class="block font-semibold">Group By </label>
                    <select id="groupBySelect" name="group_by"
                        class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full">
                        <option value="">Select Group</option>
                        <option value="passage">Passage</option>
                        <option value="audio">Audio</option>
                    </select>
                    <span class="text-xs text-gray-400"> (If multiple questions under a passage or audio) </span>
                </div>

                <div class="space-y-2">
                    <label class="block font-semibold">Set No</label>
                    <input type="number" name="set_no" min="0" max="10"
                        class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                        placeholder="Enter set number">
                </div>
                <div class="space-y-2 col-span-2">
                    <label class="block font-semibold">Remarks</label>
                    <input type="text" name="remarks"
                        class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                        placeholder="Enter remarks">
                </div>



                <div id="questionQuantityWrapper" class="space-y-2 hidden">
                    <label for="questionQuantity" class="block font-semibold">Question Quantity</label>
                    <select id="questionQuantity" name="question_quantity"
                        class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                    </select>
                </div>
            </div>

            <div class="flex gap-5">
                <div id="fileInputWrapper" class="space-y-2 hidden mt-3">
                    <label for="fileInput" class="block font-semibold">Audio file</label>
                    <input type="file" id="fileInput" name="passage_or_file"
                        class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full" />
                </div>
                <div id="passageTextareaWrapper" class="space-y-2 hidden mt-3 w-full">
                    <label for="passageTextarea" class="block font-semibold">Write Passage</label>
                    <textarea rows="8" name="passage_or_file"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 tinymce"
                        placeholder="Write passage ..."></textarea>
                </div>
            </div>
        </div>

        <!-- Container for questions -->
        <div id="questionsContainer"></div>

        @hasPermission('mock-tests.question-setup.post')
            <div class="flex justify-center">
                <button
                    class="px-8 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:opacity-90 duration-300 w-[250px]">
                    Create question
                </button>
            </div>
        @endHasPermission
    </form>

    <!-- TinyMCE -->
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const questionTypeSelect = document.getElementById("questionTypeSelect");
            const groupBySelect = document.getElementById("groupBySelect");
            const questionQuantityWrapper = document.getElementById("questionQuantityWrapper");
            const fileInputWrapper = document.getElementById("fileInputWrapper");
            const passageTextareaWrapper = document.getElementById("passageTextareaWrapper");
            const questionQuantity = document.getElementById("questionQuantity");
            const questionsContainer = document.getElementById("questionsContainer");

            function initTiny(selector) {
                tinymce.init({
                    selector,
                    menubar: false,
                    plugins: 'link image lists code',
                    toolbar: 'undo redo | bold italic furigana | bullist numlist | link image | code',
                    height: 150,
                    extended_valid_elements: 'ruby,rt,rp',
                    setup: function(editor) {
                        editor.ui.registry.addButton('furigana', {
                            text: 'Furigana',
                            onAction: function() {
                                editor.windowManager.open({
                                    title: 'Add Furigana',
                                    body: {
                                        type: 'panel',
                                        items: [{
                                                type: 'input',
                                                name: 'kanji',
                                                label: 'Kanji'
                                            },
                                            {
                                                type: 'input',
                                                name: 'reading',
                                                label: 'Furigana'
                                            }
                                        ]
                                    },
                                    buttons: [{
                                            type: 'cancel',
                                            text: 'Close'
                                        },
                                        {
                                            type: 'submit',
                                            text: 'Insert',
                                            primary: true
                                        }
                                    ],
                                    onSubmit: function(api) {
                                        const data = api.getData();
                                        // Insert ruby annotation
                                        editor.insertContent(
                                            `<ruby>${data.kanji}<rt>${data.reading}</rt></ruby>`
                                        );
                                        api.close();
                                    }
                                });
                            }
                        });
                    }
                });
            }


            function generateQuestions(qty) {
                // Remove all existing TinyMCE editors
                tinymce.remove();

                questionsContainer.innerHTML = "";

                for (let i = 0; i < qty; i++) {
                    const questionBlock = `
        <h3 class="text-xl font-semibold p-[12px] rounded-t-lg text-black bg-indigo-300 mt-5">
          Create Question ${i + 1}
        </h3>
        <div class="p-8 rounded-b-lg bg-white border mb-5">
          <div class="grid grid-cols-4 gap-4">
            <div class="grid grid-cols-1 col-span-4 lg:col-span-1 gap-3">
              <div class="space-y-2">
                <label class="block font-semibold">Proficiency Level</label>
                <select name="questions[${i}][proficiency_level]" class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 w-full">
                  <option value="N4">N4</option>
                  <option value="N5">N5</option>
                </select>
              </div>
  
              <div class="space-y-2">
                <label class="block font-semibold">Each Question Type</label>
                <select name="questions[${i}][question_type]"
                  class="questionType bg-white drop-shadow-md text-sm border rounded px-3 py-2 w-full"
                  data-index="${i}">
                  <option value="text" selected>Text</option>
                  <option value="image">Image</option>
                </select>
                </div>
                </div>
                <div class="space-y-2 col-span-4 lg:col-span-3">
                <label class="block font-semibold">Question</label>
                <div class="questionInputWrapper" data-index="${i}">
                    <textarea id="question-${i}" name="questions[${i}][question]" class="tinymce"></textarea>
                </div>
                </div>
            </div>
 
          <div class="p-6 rounded-lg border bg-white mt-[30px] space-y-7">
            <h3 class="font-semibold rounded text-black">Create Options (Choose the correct answer)</h3>
            <div class="grid lg:grid-cols-2 gap-4">
              ${[1,2,3,4].map(opt => `
                    <div class="flex items-center gap-1">
                      <input type="radio" name="questions[${i}][answer]" value="${opt}" class="size-5">
                      <div class="optionWrapper w-full" data-q="${i}" data-opt="${opt}">
                        <textarea id="question-${i}-option-${opt}" name="questions[${i}][options][${opt}]" class="tinymce"></textarea>
                      </div>
                    </div>`).join('')}
            </div>
          </div>
        </div>
      `;
                    questionsContainer.insertAdjacentHTML("beforeend", questionBlock);
                }

                // Init TinyMCE for all question & option textareas
                initTiny('.tinymce');

                // Add change listener for switching Text ↔ Image
                document.querySelectorAll(".questionType").forEach((selectEl) => {
                    selectEl.addEventListener("change", function() {
                        const index = this.dataset.index;
                        const wrapper = document.querySelector(
                            `.questionInputWrapper[data-index="${index}"]`);
                        wrapper.innerHTML = "";

                        if (this.value === "image") {
                            if (tinymce.get(`question-${index}`)) {
                                tinymce.get(`question-${index}`).remove();
                            }
                            wrapper.innerHTML =
                                `<div class="flex gap-4 flex-col"> <input type="file" name="questions[${index}][question]" class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 w-[250px]" /> <textarea  id="question-${index}" name="questions[${index}][hints]" placeholder="Enter Question hints" class="tinymce border p-2"></textarea></div>`;
                                initTiny(`#question-${index}`);
                        } else {
                            wrapper.innerHTML =
                                `<textarea id="question-${index}" name="questions[${index}][question]" class="tinymce"></textarea>`;
                            initTiny(`#question-${index}`);
                        }
                    });
                });
            }

            // Event listeners
            questionTypeSelect.addEventListener("change", (e) => {
                if (e.target.value === "multiple") {
                    questionQuantityWrapper.style.display = "block";
                } else {
                    questionQuantityWrapper.style.display = "none";
                    generateQuestions(1);
                }
            });

            groupBySelect.addEventListener("change", (e) => {
                if (e.target.value === "passage") {
                    passageTextareaWrapper.style.display = "block";
                    fileInputWrapper.style.display = "none";
                } else if (e.target.value === "audio") {
                    fileInputWrapper.style.display = "block";
                    passageTextareaWrapper.style.display = "none";
                } else {
                    passageTextareaWrapper.style.display = "none";
                    fileInputWrapper.style.display = "none";
                }
            });

            questionQuantity.addEventListener("change", (e) => {
                generateQuestions(parseInt(e.target.value));
            });

            // Init with 1 question
            generateQuestions(1);
        });
    </script>
    <script>
        const examSelect = document.getElementById('examSelect');
        const moduleSelect = document.getElementById('moduleSelect');
        const sectionSelect = document.getElementById('sectionSelect');

        examSelect.addEventListener('change', function() {
            const examId = this.value;
            moduleSelect.innerHTML = '<option value="">Select Module</option>';
            sectionSelect.innerHTML = '<option value="">Select Section</option>';

            if (examId) {
                fetch(`/mock-tests/modules/${examId}`)
                    .then(response => response.json())
                    .then(modules => {
                        modules.forEach(module => {
                            const option = document.createElement('option');
                            option.value = module.id;
                            option.textContent = module.name;
                            moduleSelect.appendChild(option);
                        });
                    });
            }
        });

        moduleSelect.addEventListener('change', function() {
            const moduleId = this.value;
            sectionSelect.innerHTML = '<option value="">Select Section</option>';

            if (moduleId) {
                fetch(`/mock-tests/sections/${moduleId}`)
                    .then(response => response.json())
                    .then(sections => {
                        sections.forEach(section => {
                            const option = document.createElement('option');
                            option.value = section.id;
                            option.textContent = section.title;
                            sectionSelect.appendChild(option);
                        });
                    });
            }
        });
    </script>

@endsection
