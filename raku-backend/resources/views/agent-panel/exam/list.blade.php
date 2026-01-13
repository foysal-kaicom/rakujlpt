@extends('agent-panel.layout.agent_master')

@section('contents')

<section class="w-100 bg-white rounded overflow-hidden" style="font-family: sans-serif;">
    <div class="py-3 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold m-0">Mock Tests</h3>

        <div class="flex items-center gap-4">
            <!-- Optional: Filter by status -->
            <form method="GET" action="">
                <select name="status"
                    class="text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onchange="this.form.submit()">
                    <option value="">All</option>
                    <option value="1" {{ request('status') == '1' ? 'selected' : '' }}>Active</option>
                    <option value="0" {{ request('status') == '0' ? 'selected' : '' }}>Disabled</option>
                </select>
            </form>

            <a href="{{ route('agent.exam.create') }}"
               class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition">
                <i class="fa-solid fa-plus"></i> Create New Mock Test
            </a>
        </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
        <table class="table table-striped table-hover border align-middle">
            <thead>
                <tr>
                    <th scope="col" class="text-secondary small px-2 py-3">ID</th>
                    <th scope="col" class="text-secondary small px-2 py-3">Image</th>
                    <th scope="col" class="text-secondary small px-2 py-3">Title</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">Exam Type</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">Duration</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">Pass / Total</th>
                    <th scope="col" class="d-none d-sm-table-cell text-secondary small px-2 py-3">Status</th>
                    <th scope="col" class="text-secondary small px-2 py-3">Action</th>
                </tr>
            </thead>

            <tbody>
                @forelse($exams as $exam)
                <tr>
                    <td class="px-2 py-1">{{ $exam->id }}</td>

                    <td class="px-2 py-1">
                        <img style="width: 50px; height: 50px; object-fit: cover;"
                             src="{{ $exam->image ? $exam->image : asset('imagePH.png') }}"
                             alt="Exam Image">
                    </td>

                    <td class="px-2 py-1">
                        <div class="fw-semibold">{{ $exam->title }}</div>
                        <div class="text-muted small">Answer Value: {{ $exam->answer_value ?? '-' }}</div>
                    </td>

                    <td class="d-none d-md-table-cell px-2 py-1">
                        {{ $exam->name ?? '-' }}
                    </td>

                    <td class="d-none d-md-table-cell px-2 py-1">
                        {{ $exam->duration ? $exam->duration . ' min' : '-' }}
                    </td>

                    <td class="d-none d-md-table-cell px-2 py-1">
                        {{ $exam->pass_point ?? '-' }} / {{ $exam->total_point ?? '-' }}
                    </td>

                    <td class="d-none d-sm-table-cell px-2 py-1">
                        <form action="{{ route('agent.exam.toggleStatus', $exam->id) }}" method="POST" class="d-flex">
                            @csrf
                            <div class="form-check form-switch toggle-switch-lg">
                                <input class="form-check-input"
                                    type="checkbox"
                                    id="toggleExam{{ $exam->id }}"
                                    onchange="if(confirm('Are you sure you want to {{ $exam->status ? 'disable' : 'enable' }} this mock test?')) { this.form.submit(); } else { this.checked = !this.checked; }"
                                    {{ $exam->status ? 'checked' : '' }}>
                            </div>
                        </form>
                    </td>

                    <td class="px-2 py-1">
                        <div class="flex gap-2">
                            <a href="{{ route('agent.exam.edit', $exam->id) }}"
                               class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">
                                Edit
                            </a>
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="8" class="text-center py-4 text-muted">
                        No mock tests found.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-center mt-3">
        {{ $exams->links() }}
    </div>

    <style>
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
