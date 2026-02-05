@extends('master')

@section('contents')

@php
    $isCustom = ($exam->type ?? 'general') === 'custom';

    // Prefill custom selections (sent from controller edit())
    $selectedExamId = old('exam_id', $selectedExamId ?? ($exam->id ?? null));
    $selectedModuleIds = old('modules', $selectedModuleIds ?? []);
    $selectedSectionWeights = old('module', $selectedSectionWeights ?? []);
@endphp

<div class="card shadow-lg border-0 rounded-3">
    <div class="card-header py-3 rounded-top bg-indigo-300">
        <h3 class="fs-5 fw-semibold mb-0 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 8V12H19V9H14V4H5V20H11V22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8Z"></path>
            </svg>

            {{ $isCustom ? 'Edit Custom Mock Test' : 'Edit Full Mock Test' }}
        </h3>
    </div>

    <form action="{{ $isCopy ? route('mock-tests.exam.store', ['type' => $isCustom ? 'custom' : 'general']) : route('mock-tests.exam.update', $exam->id) }}"
          method="POST" enctype="multipart/form-data" class="p-4">
        @csrf
        @if(!$isCopy)
        @endif

        {{-- keep type fixed in update --}}
        <input type="hidden" name="type" value="{{ $isCustom ? 'custom' : 'general' }}">

        <div class="row g-4">

            {{-- Image Upload --}}
            <div class="col-md-3 text-center">
                <div class="position-relative border rounded bg-light d-flex align-items-center justify-content-center shadow-sm h-[250px]">
                    <img id="imagePreview"
                         src="{{ $exam->image ? asset($exam->image) : asset('imagePH.png') }}"
                         alt="Exam Image" class="w-100 h-[250px] object-fit-cover rounded" />
                    <button type="button" id="removeImage"
                            class="btn btn-sm btn-light border shadow-sm position-absolute top-0 end-0 rounded-circle">×</button>
                </div>

                <input type="file" accept="image/*" id="fileInput" name="image" class="d-none" />
                <label for="fileInput" class="btn btn-outline-primary mt-3 w-100 rounded-pill flex items-center gap-2 justify-center">
                    📷 Change Image
                </label>
                @error('image') <div class="text-danger small">{{ $message }}</div> @enderror
            </div>

            {{-- Fields --}}
            <div class="col-md-9">
                <div class="row g-3">

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Exam Title <span class="text-danger">*</span></label>
                        <input type="text" name="title" value="{{ old('title', $exam->title) }}"
                               class="form-control form-control-lg shadow-sm rounded-2" required />
                        @error('title') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Select Exam Type <span class="text-danger">*</span></label>
                        <select name="name" class="form-control form-control-lg shadow-sm rounded-2" required>
                            <option value="" disabled {{ old('name', $exam->name) ? '' : 'selected' }}>Select Short Name</option>
                            <option value="JLPT" {{ old('name', $exam->name)==='JLPT' ? 'selected' : '' }}>JLPT</option>
                            <option value="JPT"  {{ old('name', $exam->name)==='JPT'  ? 'selected' : '' }}>JPT</option>
                            <option value="NAT"  {{ old('name', $exam->name)==='NAT'  ? 'selected' : '' }}>NAT</option>
                            <option value="JFT"  {{ old('name', $exam->name)==='JFT'  ? 'selected' : '' }}>JFT</option>
                        </select>
                        @error('name') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Duration (minutes)</label>
                        <input type="number" name="duration" min="1" value="{{ old('duration', $exam->duration) }}"
                               class="form-control form-control-lg shadow-sm rounded-2" />
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Pass Point</label>
                        <input type="number" name="pass_point" min="1" value="{{ old('pass_point', $exam->pass_point) }}"
                               class="form-control form-control-lg shadow-sm rounded-2" />
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Total Point</label>
                        <input type="number" name="total_point" min="1" value="{{ old('total_point', $exam->total_point) }}"
                               class="form-control form-control-lg shadow-sm rounded-2" />
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Answer Value</label>
                        <input type="number" name="answer_value" min="1" value="{{ old('answer_value', $exam->answer_value) }}"
                               class="form-control form-control-lg shadow-sm rounded-2" />
                    </div>

                    {{-- CUSTOM ONLY: Exam + Modules + Sections --}}
                    @if($isCustom)
                        <div class="col-md-12">
                            <div class="grid grid-cols-2 xl:grid-cols-3 gap-8 border p-3 capitalize bg-blue-50">

                                <div>
                                    <label for="exam_select" class="form-label font-semibold">Select Exam</label>
                                    <select name="exam_id" id="exam_select" class="border rounded p-2 w-full">
                                        <option value="">-- Select an Exam --</option>
                                        @foreach($exams as $e)
                                            <option value="{{ $e->id }}" {{ (string)$selectedExamId === (string)$e->id ? 'selected' : '' }}>
                                                {{ $e->title }}
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

                            </div>
                        </div>
                    @endif

                    <div class="col-md-12">
                        <label class="form-label fw-semibold">Description</label>
                        <textarea name="description" rows="4" class="form-control shadow-sm rounded-2">{{ old('description', $exam->description) }}</textarea>
                    </div>

                </div>
            </div>
        </div>

        <div class="pt-4 flex justify-end">
            <button type="submit"
                    class="w-full md:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition flex items-center gap-1">
                Save Changes
            </button>
        </div>
    </form>
</div>

{{-- Image preview --}}
<script>
document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("imagePreview").src = e.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById("removeImage").addEventListener("click", function() {
    document.getElementById("imagePreview").src = "{{ asset('imagePH.png') }}";
    document.getElementById("fileInput").value = "";
});
</script>

@endsection


@push('js')
@if($isCustom)
<script>
$(document).ready(function() {
    const $examSelect = $('#exam_select');
    const $modulesContainer = $('#modules_container');
    const $modulesList = $('#modules_list');
    const $sectionsContainer = $('#sections_container');
    const $sectionsList = $('#sections_list');

    const selectedModuleIds = @json(array_map('strval', $selectedModuleIds ?? []));
    const selectedSectionWeights = @json($selectedSectionWeights ?? []);

    function getWeight(moduleId, sectionId) {
        if (!selectedSectionWeights[moduleId]) return null;
        if (!selectedSectionWeights[moduleId]['section_weights']) return null;
        return selectedSectionWeights[moduleId]['section_weights'][sectionId] ?? null;
    }

    // 1) Load modules
    $examSelect.on('change', function() {
        const examId = $(this).val();

        $modulesList.empty();
        $sectionsList.empty();
        $modulesContainer.addClass('hidden');
        $sectionsContainer.addClass('hidden');

        if (!examId) return;

        $.ajax({
            url: '/api/get-modules-by-exam/' + examId,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (!response || response.length === 0) return;

                let modulesHtml = '';
                response.forEach(module => {
                    const isChecked = selectedModuleIds.includes(String(module.id)) ? 'checked' : '';
                    modulesHtml += `
                        <div class="mb-2">
                            <input type="checkbox" name="modules[]" value="${module.id}" id="module_${module.id}"
                                class="module-checkbox" ${isChecked}>
                            <label for="module_${module.id}">${module.name}</label>
                        </div>
                    `;
                });

                $modulesList.html(modulesHtml);
                $modulesContainer.removeClass('hidden');

                // Auto load sections for pre-checked modules
                if ($('.module-checkbox:checked').length) {
                    $('.module-checkbox:checked').first().trigger('change');
                }
            }
        });
    });

    // 2) Load sections
    $modulesContainer.on('change', '.module-checkbox', function() {
        const checkedModules = [];
        $('.module-checkbox:checked').each(function() {
            checkedModules.push($(this).val());
        });

        $sectionsList.empty();
        $sectionsContainer.addClass('hidden');

        if (checkedModules.length === 0) return;

        $.ajax({
            url: '/api/get-sections-by-modules',
            type: 'POST',
            data: {
                module_ids: checkedModules,
                _token: '{{ csrf_token() }}'
            },
            dataType: 'json',
            success: function(response) {
                if (!response || response.length === 0) return;

                let sectionsHtml = '';
                response.forEach(section => {
                    const moduleId = String(section.mock_test_module_id);
                    const sectionId = String(section.id);
                    const weightName = `module[${moduleId}][section_weights][${sectionId}]`;

                    const weightVal = getWeight(moduleId, sectionId);
                    const isChecked = (weightVal !== null && weightVal !== undefined && weightVal !== '') ? 'checked' : '';
                    const isDisabled = isChecked ? '' : 'disabled';
                    const isRequired = isChecked ? 'required' : '';

                    sectionsHtml += `
                        <div class="pl-5 flex justify-between items-center gap-2 mb-2">
                            <div class="w-[calc(100%-84px)] flex gap-1.5">
                                <input type="checkbox" id="section_${sectionId}"
                                    class="section-checkbox"
                                    data-target-weight="#weight_${sectionId}"
                                    ${isChecked}>
                                <label class="w-[calc(100%-18px)]" for="section_${sectionId}">${section.title}</label>
                            </div>
                            <input type="number" name="${weightName}" id="weight_${sectionId}"
                                class="border rounded p-1 ml-2 w-20 bg-white"
                                placeholder="quantity" value="${weightVal ?? ''}" ${isDisabled} ${isRequired}>
                        </div>
                    `;
                });

                $sectionsList.html(sectionsHtml);
                $sectionsContainer.removeClass('hidden');
            }
        });
    });

    // 3) checkbox enable/disable weight
    $sectionsContainer.on('change', '.section-checkbox', function() {
        const targetId = $(this).data('target-weight');
        const $weightInput = $(targetId);

        if ($(this).is(':checked')) {
            $weightInput.prop('disabled', false).prop('required', true);
        } else {
            $weightInput.val('').prop('disabled', true).prop('required', false);
        }
    });

    // ✅ Auto-trigger on load if exam already selected
    if ($examSelect.val()) {
        $examSelect.trigger('change');
    }
});
</script>
@endif
@endpush
