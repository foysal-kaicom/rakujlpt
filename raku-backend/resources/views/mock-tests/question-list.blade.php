@extends('master')

@section('contents')
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
    <style>
        .dataTables_filter {
            display: flex;
            justify-content: space-between;
            align-items: right;
            margin-bottom: 10px;
        }

        .dataTables_filter label {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .form-check-input.toggle-switch {
            width: 3rem;
            height: 1.6rem;
        }

        .form-check-input:checked {
            background-color: #28a745;
            border-color: #28a745;
        }

        table.dataTable {
            width: 100% !important;
        }
    </style>

    <section class="w-100 bg-white px-2 overflow-hidden rounded">
        <!-- Section Header -->
        <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300">

            <h3 class="text-md mr-2">All Questions</h3>

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
            </div>

            <div class="flex gap-5">
                <div class="dropdown rounded"
                style="width: 150px;background-color: hsla(199, 76%, 75%, 0.841);color:#04070a">
                <a href="{{ route('mock-tests.question-import-page') }}">
                    <p class="cursor-pointer bg-green-700 text-center text-white p-2 rounded hover:bg-green-600">
                        Import Question
                    </p>
                </a>
            </div>

                @hasPermission('mock-tests.question-setup.form')
                    <div class="dropdown rounded"
                        style="width: 150px;background-color: hsla(199, 76%, 75%, 0.841);color:#04070a">
                        <a href="{{ route('mock-tests.question-setup.form') }}">
                            <p class="cursor-pointer bg-blue-800 text-center text-white p-2 rounded hover:bg-blue-600">
                                Create New
                            </p>
                        </a>
                    </div>
                @endHasPermission
            </div>
        </div>

        <div class="">
            <div class="table-responsive mt-3">

                <table id="questions-table" class="table table-striped table-hover align-middle">
                    <thead class="bg-indigo-300">
                        <tr>
                            <th class="text-uppercase text-secondary small">ID</th>
                            <th class="text-uppercase text-secondary small">Question</th>
                            <th class="text-uppercase text-secondary small">Section</th>
                            <th class="text-uppercase text-secondary small">Type</th>
                            <th class="text-uppercase text-secondary small">Proficiency Level</th>
                            <th class="text-uppercase text-secondary small">Bundle Type</th>
                            <th class="text-uppercase text-secondary small">Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

            </div>
        </div>

    </section>

@endsection



@push('js')
    <!-- jQuery & DataTables -->
    <script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>

    <script>
        $(document).ready(function() {

            const urlParams = new URLSearchParams(window.location.search);

            const selectedExam = urlParams.get('exam_id');
            const selectedModule = urlParams.get('module_id');
            const selectedSection = urlParams.get('section_id');
            const selectedPage = urlParams.get('page'); // Get page number from URL

            if (selectedExam) $('#examSelect').val(selectedExam);
            if (selectedModule) $('#moduleSelect').val(selectedModule);
            if (selectedSection) $('#sectionSelect').val(selectedSection);

            // Load modules and sections as before
            if (selectedExam) {
                $.get(`/mock-tests/modules/${selectedExam}`, function(modules) {
                    $('#moduleSelect').html('<option value="">Select Module</option>');
                    modules.forEach(m => $('#moduleSelect').append(
                        `<option value="${m.id}">${m.name}</option>`));
                    if (selectedModule) $('#moduleSelect').val(selectedModule);

                    if (selectedModule) {
                        $.get(`/mock-tests/sections/${selectedModule}`, function(sections) {
                            $('#sectionSelect').html('<option value="">Select Section</option>');
                            sections.forEach(s => $('#sectionSelect').append(
                                `<option value="${s.id}">${s.title}</option>`));
                            if (selectedSection) $('#sectionSelect').val(selectedSection);
                        });
                    }
                });
            }

            let table = $('#questions-table').DataTable({
                processing: true,
                serverSide: true,
                responsive: true,
                pageLength: 10, // Adjust default page length if needed
                ajax: {
                    url: "{{ route('mock-tests.question.list') }}",
                    data: function(d) {
                        d.exam_id = $('#examSelect').val();
                        d.module_id = $('#moduleSelect').val();
                        d.section_id = $('select[name="section_id"]').val();
                        d.page = selectedPage ?? 1;
                    }
                },
                columns: [{
                        data: 'id',
                        name: 'id'
                    },
                    {
                        data: 'question',
                        name: 'title',
                        orderable: false,
                        searchable: true
                    },
                    {
                        data: 'section',
                        name: 'section.title'
                    },
                    {
                        data: 'type',
                        name: 'type'
                    },
                    {
                        data: 'proficiency_level',
                        name: 'proficiency_level'
                    },
                    {
                        data: 'bundle_type',
                        name: 'mockTestQuestionGroup.type'
                    },
                    {
                        data: 'action',
                        name: 'action',
                        orderable: false,
                        searchable: false
                    },
                ],
                order: [
                    [0, "desc"]
                ],
                // Set the initial page if query param exists
                displayStart: selectedPage ? (parseInt(selectedPage) - 1) * 10 : 0
            });

            function updateURL() {
                const url = new URL(window.location.href);

                const exam = $('#examSelect').val();
                const module = $('#moduleSelect').val();
                const section = $('#sectionSelect').val();
                const pageInfo = table.page.info();

                exam ? url.searchParams.set('exam_id', exam) : url.searchParams.delete('exam_id');
                module ? url.searchParams.set('module_id', module) : url.searchParams.delete('module_id');
                section ? url.searchParams.set('section_id', section) : url.searchParams.delete('section_id');
                url.searchParams.set('page', pageInfo.page + 1); // DataTables page is zero-indexed

                window.history.replaceState({}, '', url);
            }

            // Dropdown change events
            $('#examSelect').on('change', function() {
                $('#moduleSelect').html('<option value="">Select Module</option>');
                $('#sectionSelect').html('<option value="">Select Section</option>');
                updateURL();
                table.ajax.reload(null, false); // false to stay on current page
                const examId = $(this).val();
                if (examId) {
                    $.get(`/mock-tests/modules/${examId}`, function(modules) {
                        modules.forEach(module => $('#moduleSelect').append(
                            `<option value="${module.id}">${module.name}</option>`));
                    });
                }
            });

            $('#moduleSelect').on('change', function() {
                $('#sectionSelect').html('<option value="">Select Section</option>');
                updateURL();
                table.ajax.reload(null, false);
                const moduleId = $(this).val();
                if (moduleId) {
                    $.get(`/mock-tests/sections/${moduleId}`, function(sections) {
                        sections.forEach(section => $('#sectionSelect').append(
                            `<option value="${section.id}">${section.title}</option>`));
                    });
                }
            });

            $('#sectionSelect').on('change', function() {
                updateURL();
                table.ajax.reload(null, false);
            });

            // Update URL on pagination or redraw
            table.on('draw', function() {
                updateURL();
            });

        });
    </script>
@endpush
