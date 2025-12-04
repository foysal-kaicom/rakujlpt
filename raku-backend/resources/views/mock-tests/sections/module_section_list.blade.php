@extends('master')

@section('contents')


<section class="bg-white rounded overflow-hidden">

    <div class="p-2 px-4 bg-indigo-300 d-flex justify-content-between align-items-center">
        <h3 class="text-lg font-semibold">Mock Test Modules & Sections</h3>
        @hasPermission('mock-tests.section.create')
        <a href="{{ route('mock-tests.section.create') }}"
            class="px-4 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition">
            <i class="fa-solid fa-plus"></i> Create New Section
        </a>
        @endHasPermission
    </div>

    <div class="p-3">
        <table id="modulesTable" class="table table-striped table-hover">
            <thead>
                <tr class="table-light ">
                    <th>Exam</th>
                    <th>Module</th>
                    <th>Section</th>
                    <th>Question Limit</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <!-- NO TBODY — AJAX WILL CREATE IT -->
        </table>
    </div>

</section>
@endsection

<!-- DataTables CDN -->


@push('js')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script>
$(document).ready(function() {
    $('#modulesTable').DataTable({
        processing: true,
        serverSide: false, // because we load all at once
        ajax: "{{ route('mock-tests.sections-with-modules.fetch') }}",

        columns: [
            { data: 'exam', name: 'exam' },
            { data: 'module', name: 'module' },
            { data: 'section', name: 'section' },
            { data: 'question_limit', name: 'question_limit' },
            { data: 'actions', name: 'actions', orderable: false, searchable: false },
        ]
    });
});
</script>

@endpush
