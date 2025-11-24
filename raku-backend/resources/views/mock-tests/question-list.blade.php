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

        <h3 class="text-md m-0">All Questions</h3>

        <div class="flex gap-10">
            <form action="{{ route('mock-tests.question.list') }}" method="GET" class="d-flex align-items-center">
                <select name="section_id" class="form-select me-2" style="width:200px;">
                    <option value="all">All Questions</option>
                    @foreach($sections as $section)
                        <option value="{{ $section->id }}">
                            {{ $section->title }}
                        </option>
                    @endforeach
                </select>
            </form>

            @hasPermission('mock-tests.question-setup.form')
            <div class="dropdown rounded" style="width: 150px;background-color: hsla(199, 76%, 75%, 0.841);color:#04070a">
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
$(document).ready(function () {

    let table = $('#questions-table').DataTable({
        processing: true,
        serverSide: true,
        responsive: true,   

        ajax: {
            url: "{{ route('mock-tests.question.list') }}",
            data: function (d) {
                d.section_id = $('select[name="section_id"]').val();
            }
        },

        columns: [
            { data: 'id', name: 'id' },

            { data: 'question', name: 'title', orderable: false, searchable: true },

            { data: 'section', name: 'section.title' },

            { data: 'type', name: 'type' },

            { data: 'proficiency_level', name: 'proficiency_level' },

            { data: 'bundle_type', name: 'mockTestQuestionGroup.type' },

            { data: 'action', name: 'action', orderable: false, searchable: false },
        ],

        order: [[0, "desc"]],
    });

    // When dropdown changes → reload data
    $('select[name="section_id"]').on('change', function () {
        table.ajax.reload();
    });

});
</script>

@endpush
