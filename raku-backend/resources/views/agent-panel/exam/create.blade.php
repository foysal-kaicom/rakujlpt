@extends('agent-panel.layout.agent_master')

@section('contents')

<div class="card shadow-lg border-0 rounded-3">
    <!-- Header -->
    <div class="rounded-top bg-indigo-300 px-8 pt-3">
        <h5 class="fs-5 fw-semibold mb-0 flex items-center gap-2 bg-white px-3 py-2 rounded-top w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 8V12H19V9H14V4H5V20H11V22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8ZM13.7857 15.3269C13.8246 14.5997 14.3858 14.0083 15.11 13.9313L15.9807 13.8389C16.0841 13.8279 16.1815 13.7845 16.2589 13.715L16.9102 13.1299C17.4519 12.6431 18.2669 12.6218 18.8334 13.0795L19.5145 13.6298C19.5954 13.6951 19.6949 13.7333 19.7988 13.7389L20.6731 13.7857C21.4003 13.8246 21.9917 14.3858 22.0687 15.11L22.1611 15.9807C22.1721 16.0841 22.2155 16.1815 22.285 16.2589L22.8701 16.9102C23.3569 17.4519 23.3782 18.2669 22.9205 18.8334L22.3702 19.5145C22.3049 19.5954 22.2667 19.6949 22.2611 19.7988L22.2143 20.6731C22.1754 21.4003 21.6142 21.9917 20.89 22.0687L20.0193 22.1611C19.9159 22.1721 19.8185 22.2155 19.7411 22.285L19.0898 22.8701C18.5481 23.3569 17.7331 23.3782 17.1666 22.9205L16.4855 22.3702C16.4046 22.3049 16.3051 22.2667 16.2012 22.2611L15.3269 22.2143C14.5997 22.1754 14.0083 21.6142 13.9313 20.89L13.8389 20.0193C13.8279 19.9159 13.7845 19.8185 13.715 19.7411L13.1299 19.0898C12.6431 18.5481 12.6218 17.733 13.0795 17.1666L13.6298 16.4855C13.6951 16.4046 13.7333 16.3051 13.7389 16.2012L13.7857 15.3269ZM21.0303 17.0303L19.9697 15.9697L17.5 18.4393L16.0303 16.9697L14.9697 18.0303L17.5 20.5607L21.0303 17.0303Z"></path>
            </svg>
            Create Mock Test
        </h5>
    </div>

    <!-- Custom Exam Form -->
    <form action="{{ route('agent.exam.store') }}" method="POST" enctype="multipart/form-data" class="p-4">
        @csrf
        <input type="hidden" name="type" id="type" value="agent">

        <div id="customExamForm" class="row g-4">
            <!-- Image Upload -->
            <div class="col-md-3 text-center">
                <div class="position-relative border rounded bg-light d-flex align-items-center justify-content-center shadow-sm h-[250px]">
                    <img id="customImagePreview" src="{{ asset('imagePH.png') }}" alt="Display Image"
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
                    Choose Image
                </label>

                @error('image')
                    <div class="text-danger small">{{ $message }}</div>
                @enderror
            </div>

            <!-- Form Fields -->
            <div class="col-md-9">
                <div class="row g-3">
                    <!-- Exam Title -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Exam Title <span class="text-danger">*</span></label>
                        <input type="text" name="title" value="{{ old('title') }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Enter exam title" required />
                        @error('title') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Exam Name -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Select Exam Type <span class="text-danger">*</span></label>
                        <select name="name" class="form-control form-control-lg shadow-sm rounded-2" required>
                            <option value="" disabled {{ old('name') ? '' : 'selected' }}>Select Short Name</option>
                            <option value="JLPT" {{ old('name') === 'JLPT' ? 'selected' : '' }}>JLPT</option>
                            <option value="JPT"  {{ old('name') === 'JPT'  ? 'selected' : '' }}>JPT</option>
                            <option value="NAT"  {{ old('name') === 'NAT'  ? 'selected' : '' }}>NAT</option>
                            <option value="JFT"  {{ old('name') === 'JFT'  ? 'selected' : '' }}>JFT</option>
                        </select>
                        @error('name') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Duration -->
                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Duration (minutes)</label>
                        <input type="number" name="duration" min="1" value="{{ old('duration') }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="e.g. 90" />
                        @error('duration') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- pass_point -->
                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Pass Point</label>
                        <input type="number" min="1" name="pass_point" value="{{ old('pass_point') }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="e.g. 60" />
                        @error('pass_point') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Total Point -->
                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Total Point</label>
                        <input type="number" min="1" name="total_point" value="{{ old('total_point') }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="e.g. 100" />
                        @error('total_point') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Answer Value -->
                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Answer Value</label>
                        <input type="number" min="1" name="answer_value" value="{{ old('answer_value') }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="e.g. 1" />
                        @error('answer_value') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Exam/Module/Section selector -->
                    <div class="grid grid-cols-2 xl:grid-cols-3 gap-8 border p-3 capitalize bg-blue-50">
                        <div>
                            <label for="exam_select" class="form-label font-semibold">Select Exam</label>
                            <select name="exam_id" id="exam_select" class="border rounded p-2">
                                <option value="">-- Select an Exam --</option>
                                @foreach($exams as $exam)
                                    <option value="{{$exam->id}}">{{$exam->title}}</option>
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

                    <!-- Description -->
                    <div class="col-md-12">
                        <label class="form-label fw-semibold">Description</label>
                        <textarea name="description" rows="4" class="form-control shadow-sm rounded-2"
                            placeholder="Brief details about the exam">{{ old('description') }}</textarea>
                        @error('description') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>
                </div>

                <div class="pt-4 flex justify-end">
                    <button type="submit"
                        class="w-full md:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4" fill="currentColor">
                            <path d="M18 21V13H6V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H18ZM16 21H8V15H16V21Z"></path>
                        </svg>
                        Save Custom Exam
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>

<!-- Custom Image Preview -->
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
        document.getElementById("customImagePreview").src = "{{ asset('imagePH.png') }}";
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

        // 1) EXAM -> MODULES
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
                    if (response.length > 0) {
                        let modulesHtml = '';
                        $.each(response, function(index, module) {
                            modulesHtml += `
                                <div class="mb-2">
                                    <input type="checkbox" value="${module.id}" id="module_${module.id}" class="module-checkbox">
                                    <label for="module_${module.id}">${module.name}</label>
                                </div>
                            `;
                        });
                        $modulesList.html(modulesHtml);
                        $modulesContainer.removeClass('hidden');
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error fetching modules:", error);
                    alert("Could not load modules. Please try again.");
                }
            });
        });

        // 2) MODULES -> SECTIONS
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
                    if (response.length > 0) {
                        let sectionsHtml = '';
                        $.each(response, function(index, section) {
                            const weightInputName = `module[${section.mock_test_module_id}][section_weights][${section.id}]`;
                            const sectionId = `section_${section.id}`;

                            sectionsHtml += `
                                <div class="pl-5 flex justify-between items-center gap-2 mb-2">
                                    <div class="w-[calc(100%-84px)] flex gap-1.5">
                                        <input type="checkbox" id="${sectionId}" class="section-checkbox"
                                            data-target-weight="#weight_${section.id}">
                                        <label class="w-[calc(100%-18px)]" for="${sectionId}">${section.title}</label>
                                    </div>
                                    <input type="number" name="${weightInputName}" id="weight_${section.id}"
                                        class="border rounded p-1 ml-2 w-20 bg-white" placeholder="quantity" disabled>
                                </div>
                            `;
                        });
                        $sectionsList.html(sectionsHtml);
                        $sectionsContainer.removeClass('hidden');
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error fetching sections:", error);
                    alert("Could not load sections. Please try again.");
                }
            });
        });

        // 3) SECTION CHECKBOX -> ENABLE/DISABLE WEIGHT INPUT
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
    });
</script>
@endpush
