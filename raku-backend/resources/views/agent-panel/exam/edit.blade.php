@extends('agent-panel.layout.agent_master')

@section('contents')

<div class="card shadow-lg border-0 rounded-3">
    <div class="rounded-top bg-indigo-300 px-8 pt-3">
        <h5 class="fs-5 fw-semibold mb-0 flex items-center gap-2 bg-white px-3 py-2 rounded-top w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 8V12H19V9H14V4H5V20H11V22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8ZM10 8H12V10H10V8ZM8 12H16V14H8V12ZM8 16H16V18H8V16Z"></path>
            </svg>
            Edit Mock Test
        </h5>
    </div>

    <form action="{{ route('agent.exam.update', $exam->id) }}" method="POST" enctype="multipart/form-data" class="p-4">
        @csrf
        <input type="hidden" name="type" id="type" value="agent">

        <div id="customExamForm" class="row g-4">
            <div class="col-md-3 text-center">
                <div class="position-relative border rounded bg-light d-flex align-items-center justify-content-center shadow-sm h-[250px]">
                    <img id="customImagePreview"
                         src="{{ $exam->image ? asset($exam->image) : asset('imagePH.png') }}"
                         alt="Display Image"
                         class="w-100 h-[250px] object-fit-cover rounded" />
                    <button type="button" id="customRemoveImage"
                        class="btn btn-sm btn-light border shadow-sm position-absolute top-0 end-0 rounded-circle">
                        ×
                    </button>
                </div>

                <input type="file" accept="image/*" id="customFileInput" name="image" class="d-none" />

                <label for="customFileInput" class="btn btn-outline-primary mt-3 w-100 rounded-pill flex items-center gap-2 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
                    </svg>
                    Change Image
                </label>

                @error('image')
                    <div class="text-danger small">{{ $message }}</div>
                @enderror
            </div>

            <div class="col-md-9">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Exam Title <span class="text-danger">*</span></label>
                        <input type="text" name="title" value="{{ old('title', $exam->title) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Enter exam title" required />
                        @error('title') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Select Exam Type <span class="text-danger">*</span></label>
                        <select name="name" class="form-control form-control-lg shadow-sm rounded-2" required>
                            <option value="" disabled>Select Short Name</option>
                            <option value="JLPT" {{ old('name', $exam->name) === 'JLPT' ? 'selected' : '' }}>JLPT</option>
                            <option value="JPT"  {{ old('name', $exam->name) === 'JPT'  ? 'selected' : '' }}>JPT</option>
                            <option value="NAT"  {{ old('name', $exam->name) === 'NAT'  ? 'selected' : '' }}>NAT</option>
                            <option value="JFT"  {{ old('name', $exam->name) === 'JFT'  ? 'selected' : '' }}>JFT</option>
                        </select>
                        @error('name') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Duration (minutes)</label>
                        <input type="number" name="duration" min="1" value="{{ old('duration', $exam->duration) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="e.g. 90" />
                        @error('duration') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Pass Point</label>
                        <input type="number" min="1" name="pass_point" value="{{ old('pass_point', $exam->pass_point) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="e.g. 60" />
                        @error('pass_point') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Total Point</label>
                        <input type="number" min="1" name="total_point" value="{{ old('total_point', $exam->total_point) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="e.g. 100" />
                        @error('total_point') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Answer Value</label>
                        <input type="number" min="1" name="answer_value" value="{{ old('answer_value', $exam->answer_value) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="e.g. 1" />
                        @error('answer_value') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    {{-- <div class="grid grid-cols-2 xl:grid-cols-3 gap-8 border p-3 capitalize bg-blue-50">
                        <div>
                            <label for="exam_select" class="form-label font-semibold">Select Exam</label>
                            <select name="exam_id" id="exam_select" class="border rounded p-2">
                                <option value="">-- Select an Exam --</option>
                                @foreach($exams as $baseExam)
                                    <option value="{{ $baseExam->id }}" {{ (string)old('exam_id', $selectedBaseExamId) === (string)$baseExam->id ? 'selected' : '' }}>
                                        {{ $baseExam->title }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div id="modules_container" class="space-y-3 border-r hidden">
                            <p class="form-label font-semibold">Select Module</p>
                            <div id="modules_list" class="pl-5"></div>
                        </div>

                        <div id="sections_container" class="space-y-3 col-span-2 xl:col-span-1 hidden">
                            <p class="form-label font-semibold">Select Section</p>
                            <div id="sections_list"></div>
                        </div>
                    </div> --}}

                    <div class="col-md-12">
                        <label class="form-label fw-semibold">Description</label>
                        <textarea name="description" rows="4" class="form-control shadow-sm rounded-2"
                            placeholder="Brief details about the exam">{{ old('description', $exam->description) }}</textarea>
                        @error('description') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>
                </div>

                <div class="pt-4 flex justify-end">
                    <button type="submit"
                        class="w-full md:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4" fill="currentColor">
                            <path d="M18 21V13H6V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H18ZM16 21H8V15H16V21Z"></path>
                        </svg>
                        Update Exam
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>

<script>
    document.getElementById("customFileInput").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("customImagePreview").src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    document.getElementById("customRemoveImage").addEventListener("click", function() {
        document.getElementById("customImagePreview").src = "{{ $exam->image ? asset($exam->image) : asset('imagePH.png') }}";
        document.getElementById("customFileInput").value = "";
    });
</script>

@endsection

@push('js')
<script>
    $(document).ready(function() {
        const $examSelect = $('#exam_select');
        const $modulesContainer = $('#modules_container');
        const $modulesList = $('#modules_list');
        const $sectionsContainer = $('#sections_container');
        const $sectionsList = $('#sections_list');

        const preSelectedModules = @json($selectedModules ?? []);
        const preSelectedWeights = @json($selectedWeights ?? []);

        function loadModules(examId, callback) {
            $modulesList.empty();
            $modulesContainer.addClass('hidden');

            if (!examId) return;

            $.ajax({
                url: '/api/get-modules-by-exam/' + examId,
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    if (response.length > 0) {
                        let modulesHtml = '';
                        $.each(response, function(index, module) {
                            const checked = preSelectedModules.includes(module.id) ? 'checked' : '';
                            modulesHtml += `
                                <div class="mb-2">
                                    <input type="checkbox" value="${module.id}" id="module_${module.id}" class="module-checkbox" ${checked}>
                                    <label for="module_${module.id}">${module.name}</label>
                                </div>
                            `;
                        });
                        $modulesList.html(modulesHtml);
                        $modulesContainer.removeClass('hidden');
                        if (callback) callback();
                    }
                }
            });
        }

        function loadSections(moduleIds) {
            $sectionsList.empty();
            $sectionsContainer.addClass('hidden');

            if (!moduleIds || moduleIds.length === 0) return;

            $.ajax({
                url: '/api/get-sections-by-modules',
                type: 'POST',
                dataType: 'json',
                data: {
                    module_ids: moduleIds,
                    _token: '{{ csrf_token() }}'
                },
                traditional: true,
                success: function(response) {
                    if (response.length > 0) {
                        let sectionsHtml = '';
                        $.each(response, function(index, section) {
                            const weightInputName = `module[${section.mock_test_module_id}][section_weights][${section.id}]`;
                            const sectionId = `section_${section.id}`;
                            const value = preSelectedWeights[section.id] ?? '';
                            const isChecked = value !== '' ? 'checked' : '';
                            const isDisabled = value === '' ? 'disabled' : '';
                            const isRequired = value !== '' ? 'required' : '';

                            sectionsHtml += `
                                <div class="pl-5 flex justify-between items-center gap-2 mb-2">
                                    <div class="w-[calc(100%-84px)] flex gap-1.5">
                                        <input type="checkbox" id="${sectionId}" class="section-checkbox"
                                            data-target-weight="#weight_${section.id}" ${isChecked}>
                                        <label class="w-[calc(100%-18px)]" for="${sectionId}">${section.title}</label>
                                    </div>
                                    <input type="number" name="${weightInputName}" id="weight_${section.id}"
                                        class="border rounded p-1 ml-2 w-20 bg-white" placeholder="quantity"
                                        value="${value}" ${isDisabled} ${isRequired}>
                                </div>
                            `;
                        });
                        $sectionsList.html(sectionsHtml);
                        $sectionsContainer.removeClass('hidden');
                    }
                }
            });
        }

        $examSelect.on('change', function() {
            const examId = $(this).val();
            $sectionsList.empty();
            $sectionsContainer.addClass('hidden');

            loadModules(examId, function() {
                const checkedModules = [];
                $('.module-checkbox:checked').each(function() {
                    checkedModules.push($(this).val());
                });
                loadSections(checkedModules);
            });
        });

        $modulesContainer.on('change', '.module-checkbox', function() {
            const checkedModules = [];
            $('.module-checkbox:checked').each(function() {
                checkedModules.push($(this).val());
            });
            loadSections(checkedModules);
        });

        $('#sections_container').on('change', '.section-checkbox', function() {
            const $checkbox = $(this);
            const targetId = $checkbox.data('target-weight');
            const $weightInput = $(targetId);

            if ($checkbox.is(':checked')) {
                $weightInput.prop('disabled', false);
                $weightInput.prop('required', true);
            } else {
                $weightInput.val('');
                $weightInput.prop('disabled', true);
                $weightInput.prop('required', false);
            }
        });

        const initialExamId = $examSelect.val();
        if (initialExamId) {
            loadModules(initialExamId, function() {
                const checkedModules = [];
                $('.module-checkbox:checked').each(function() {
                    checkedModules.push($(this).val());
                });
                loadSections(checkedModules);
            });
        }
    });
</script>
@endpush
