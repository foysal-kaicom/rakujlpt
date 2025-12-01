@extends('master')

@section('contents')

<section class="w-100 bg-white rounded overflow-hidden mb-4" style="font-family: sans-serif;">
    <!-- Section Header -->
    <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold">Filters</h3>
    </div>

    <form method="GET" action="{{ route('mock-test-modules.index') }}">
        <div class="py-3 px-4 d-flex justify-content-between border align-items-center">
            <div class="col-md-12">
                <div class="row g-3">

                    <!-- Module Name Search -->
                    <div class="col-md-3">
                        <label class="form-label">Module Name</label>
                        <input type="text" name="name" value="{{ request()->name }}"
                            class="form-control" placeholder="Search module..." />
                    </div>

                    <!-- Exam Filter -->
                    <div class="col-md-3">
                        <label class="form-label">Exam</label>
                        <select name="exam_id" class="form-select">
                            <option value="">All Exams</option>
                            @foreach($exams as $exam)
                                <option value="{{ $exam->id }}"
                                    {{ request()->exam_id == $exam->id ? 'selected' : '' }}>
                                    {{ $exam->title }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <!-- Buttons -->
                    <div class="flex justify-end items-center gap-3 mt-3">
                        <a href="{{ route('mock-test-modules.index') }}"
                            class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium border shadow-md transition">
                            Reset Filters
                        </a>

                        <button type="submit"
                            class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">
                            Apply Filters
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </form>
</section>

<section class="w-100 bg-white rounded overflow-hidden" style="font-family: sans-serif;">
    <div class="py-3 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold m-0">Mock Test Modules List</h3>

        @hasPermission('mock-test-modules.create')
        <a href="{{ route('mock-test-modules.create') }}"
            class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition">
            <i class="fa-solid fa-plus"></i> Create New Module
        </a>
        @endHasPermission
    </div>

    <!-- Table -->
    <div class="table-responsive">
        <table class="table table-striped table-hover border align-middle">
            <thead>
                <tr>
                    <th>
                        <a href="{{ route('mock-test-modules.index', ['order_by' => 'id', 'direction' => request()->direction == 'asc' ? 'desc' : 'asc']) }}">
                            ID
                        </a>
                    </th>

                    <th>
                        <a href="{{ route('mock-test-modules.index', ['order_by' => 'exam_id', 'direction' => request()->direction == 'asc' ? 'desc' : 'asc']) }}">
                            Exam Name
                        </a>
                    </th>

                    <th>
                        <a href="{{ route('mock-test-modules.index', ['order_by' => 'name', 'direction' => request()->direction == 'asc' ? 'desc' : 'asc']) }}">
                            Module Name
                        </a>
                    </th>

                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                @foreach($modules as $module)
                <tr>
                    <td>{{ $module->id }}</td>
                    <td>{{ $module->exam?->title ?? '-' }}</td>
                    <td>{{ $module->name }}</td>

                    <!-- Status -->
                    <td>
                        @hasPermission('mock-test-modules.toggleStatus')
                        <form action="{{ route('mock-test-modules.toggleStatus', $module->id) }}" method="POST">
                            @csrf
                            <div class="form-check form-switch toggle-switch-lg">
                                <input class="form-check-input"
                                    type="checkbox"
                                    onchange="if(confirm('Change status?')) this.form.submit(); else this.checked = !this.checked;"
                                    {{ $module->status == 'active' ? 'checked' : '' }}>
                            </div>
                        </form>
                        @endHasPermission
                    </td>

                    <!-- Action Buttons -->
                    <td class="d-none d-sm-table-cell">
                        <div class="flex gap-2 mb-2">
                        @hasPermission('mock-test-modules.edit')
                        <a href="{{ route('mock-test-modules.edit', $module->id) }}"
                            class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">
                            Edit
                        </a>
                        @endHasPermission
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <!-- Pagination -->
        <div class="d-flex justify-content-center mt-3">
            {{ $modules->links() }}
        </div>
    </div>

    <style>
        th a:hover {
            color: #031a33;
            text-decoration: underline;
        }

        .toggle-switch-lg .form-check-input {
            width: 3rem;
            height: 1.5rem;
            cursor: pointer;
        }

        .toggle-switch-lg .form-check-input:checked {
            background-color: #28a745;
            border-color: #28a745;
        }
    </style>

</section>

@endsection
