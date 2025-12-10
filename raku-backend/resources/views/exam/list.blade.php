@extends('master')

@section('contents')

<section class="w-100 bg-white rounded overflow-hidden mb-4" style="font-family: sans-serif;">
    <!-- Section Header -->
    <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold">Filters</h3>
    </div>
    <form method="GET" action="{{ route('mock-tests.exam.list') }}">
        <div class="py-3 px-4 lg:flex justify-between border items-end space-y-3">
            <div class="w-full lg:w-[330px]">
                <label class="form-label">Search</label>
                <input type="text" name="title" value="{{ old('title', request()->title) }}" class="form-control" placeholder="Search a title..." />
                @error('title')
                <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>

            <div class="flex justify-end items-center gap-3">
                <a href="{{ route('mock-tests.exam.list') }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium border shadow-md transition">Reset Filters</a>
                <button type="submit" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">Apply Filters</button>
            </div>
        </div>
    </form>
</section>

<section class="w-100 bg-white rounded overflow-hidden" style="font-family: sans-serif;">
    <div class="py-3 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold m-0">Exam List</h3>
        @hasPermission('mock-tests.exam.create')
        <a href="{{ route('mock-tests.exam.create') }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition">
            <i class="fa-solid fa-plus"></i> Create New Exam
        </a>
        @endHasPermission
    </div>



    <!-- Table -->
    <div class="table-responsive">
        <table class="table table-striped table-hover border align-middle">
            <thead class="">
                <tr>
                    <th scope="col" class="text-uppercase text-secondary small px-4 py-3">
                        <a href="{{ route('mock-tests.exam.list', ['order_by' => 'id', 'direction' => (request()->direction == 'asc' ? 'desc' : 'asc')]) }}" class="text-primary hover-effect">
                            ID
                        </a>
                    </th>
                    <th scope="col" class="d-none d-sm-table-cell text-secondary small px-4 py-3">
                        <a href="{{ route('mock-tests.exam.list', ['order_by' => 'title', 'direction' => (request()->direction == 'asc' ? 'desc' : 'asc')]) }}" class="text-primary hover-effect">
                            Title
                        </a>
                    </th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small py-3">
                        <a href="{{ route('mock-tests.exam.list', ['order_by' => 'exam_date', 'direction' => (request()->direction == 'asc' ? 'desc' : 'asc')]) }}" class="text-primary hover-effect">
                            Short Name
                        </a>
                    </th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small py-3">
                        <a href="{{ route('mock-tests.exam.list', ['order_by' => 'duration', 'direction' => (request()->direction == 'asc' ? 'desc' : 'asc')]) }}" class="text-primary hover-effect">
                            Duration
                        </a>
                    </th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small py-3">
                        <a href="{{ route('mock-tests.exam.list', ['order_by' => 'total_point', 'direction' => (request()->direction == 'asc' ? 'desc' : 'asc')]) }}" class="text-primary hover-effect">
                            Total Point
                        </a>
                    </th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small py-3">
                        <a href="{{ route('mock-tests.exam.list', ['order_by' => 'answer_value', 'direction' => (request()->direction == 'asc' ? 'desc' : 'asc')]) }}" class="text-primary hover-effect">
                            Answer Value
                        </a>
                    </th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small py-3">Created By</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small py-3">Status</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small py-3">Action</th>
                </tr>
            </thead>

            <tbody>
                @foreach($exams as $exam)
                <tr>
                    <td class="px-4 py-1">{{ $exam->id }}</td>
                    <td class="d-none d-sm-table-cell px-4 py-1">
                        {{ $exam->title }}
                    </td>
                    <td class="d-none d-sm-table-cell py-1 text-nowrap">{{ $exam->name }}</td>
                    <td class="d-none d-sm-table-cell py-1 text-nowrap">{{ $exam->duration }}</td>
                    <td class="d-none d-sm-table-cell py-1 text-nowrap">{{ $exam->total_point }}</td>
                    <td class="d-none d-sm-table-cell py-1 text-nowrap">{{ $exam->answer_value }}</td>
                    <td class="d-none d-sm-table-cell py-1 text-nowrap">{{ $exam->creator->name }}</td>

                    <td class="d-none d-sm-table-cell py-1">
                        @hasPermission('mock-tests.exam.toggleStatus')
                        <form action="{{ route('mock-tests.exam.toggleStatus', $exam->id) }}" method="POST" class="d-flex pt-4 ">
                            @csrf
                            <div class="form-check form-switch toggle-switch-lg">
                                <input class="form-check-input"
                                    type="checkbox"
                                    id="toggleExam{{ $exam->id }}"
                                    onchange="if(confirm('Are you sure you want to {{ $exam->status ? 'disable' : 'enable' }} this exam?')) { this.form.submit(); } else { this.checked = !this.checked; }"
                                    {{ $exam->status ? 'checked' : '' }}>
                            </div>
                        </form>
                        @endHasPermission
                    </td>


                    <td class="d-none d-sm-table-cell">
                        <div class="flex gap-2">
                            @hasPermission('mock-tests.exam.create')
                            <a href="{{ route('mock-tests.exam.edit', ['id' => $exam->id, 'isCopy' => true]) }}" onclick="return confirmAction(event, this.href)" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 shadow-md transition">
                                <button>Copy</button>
                            </a>
                            @endHasPermission
                            @hasPermission('mock-tests.exam.edit')
                            <a href="{{ route('mock-tests.exam.edit', $exam->id) }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">
                                <button>Edit</button>
                            </a>
                            @endHasPermission
                        </div>
                    </td>


                </tr>
                @endforeach

            </tbody>
        </table>

    </div>

    <!-- Pagination Links -->
    <div class="d-flex justify-content-center mt-3">
        {{ $exams->links() }}
    </div>

    <style>
        .statusbtn-active {
            background-color: hsla(215, 94%, 42%, 0.879);
            cursor: pointer;
        }

        .statusbtn-disabled {
            background-color: hsla(358, 92%, 33%, 0.879);
            cursor: pointer;
        }

        th a:hover {
            color: #031a33;
            text-decoration: underline;
        }

        .hover-effect:hover .badge {
            background-color: rgb(29, 37, 43);
            cursor: pointer;
            text-decoration: underline;
        }

        .toggle-switch-lg .form-check-input {
            width: 3rem;
            height: 1.5rem;
            cursor: pointer;
        }

        .toggle-switch-lg .form-check-input:checked {
            background-color: #28a745;
            /* green for active */
            border-color: #28a745;
        }
    </style>

</section>

@endsection

<script>
    function confirmAction(event, url) {
        const userConfirmed = confirm('Are you sure you want to copy this exam?');

        if (!userConfirmed) {
            event.preventDefault();
            return false;
        }
        window.location.href = url;
        return true;
    }
</script>