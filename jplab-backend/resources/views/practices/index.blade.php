@extends('master')

@section('contents')

<section class="w-100 bg-white rounded overflow-hidden mb-4" style="font-family: sans-serif;">
    <!-- Section Header -->
    <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold">Filters</h3>
    </div>
    <form method="GET" action="{{ route('practices.index') }}">
        <div class="py-3 px-4 d-flex justify-content-between border align-items-center">
            <div class="col-md-12">
                <div class="row g-3">
                    <!-- Search Filter -->
                    <div class="col-md-4">
                        <label class="form-label">Search by Stage or Roadmap</label>
                        <input type="text" name="title" value="{{ old('title', request()->title) }}" class="form-control" placeholder="Search..." />
                    </div>

                    <!-- Date Filter -->
                    <div class="col-md-3">
                        <label class="form-label">From</label>
                        <input type="date" name="from_date" value="{{ old('from_date', request()->from_date) }}" class="form-control" />
                    </div>

                    <div class="col-md-3">
                        <label class="form-label">To</label>
                        <input type="date" name="to_date" value="{{ old('to_date', request()->to_date) }}" class="form-control" />
                    </div>

                    <div class="flex justify-end items-center gap-3 mt-3">
                        <a href="{{ route('practices.index') }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium border shadow-md transition">Reset Filters</a>
                        <button type="submit" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">Apply Filters</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</section>

<section class="w-100 bg-white rounded overflow-hidden" style="font-family: sans-serif;">
    <div class="py-3 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold m-0">Practice Questions</h3>
        <a href="{{ route('practices.create') }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition">
            <i class="fa-solid fa-plus"></i> Create New Group
        </a>
    </div>

    <!-- Table -->
    <div class="table-responsive">
        <table class="table table-striped table-hover border align-middle">
            <thead>
                <tr>
                    <th scope="col" class="text-uppercase text-secondary small px-4 py-3">#</th>
                    <th scope="col" class="text-secondary small py-3">Roadmap</th>
                    <th scope="col" class="text-secondary small py-3">Stage</th>
                    <th scope="col" class="text-secondary small py-3">Questions Count</th>
                    <th scope="col" class="text-secondary small py-3">Created At</th>
                    <th scope="col" class="text-secondary small py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach($practices as $index => $practice)
                <tr>
                    <td>{{ $practices->firstItem() + $index }}</td>
                    <td>{{ $practice->stage->roadmap->title ?? '-' }}</td>
                    <td>{{ $practice->stage->title ?? '-' }}</td>
                    {{-- <td>{{ count($practice->questions ?? []) }}</td> --}}
                    <td>{{ is_array(json_decode($practice->questions, true)) ? count(json_decode($practice->questions, true)) : 0 }}</td>

                    <td>{{ $practice->created_at->format('Y-m-d') }}</td>
                    <td>
                        <div class="flex gap-2">
                            <a href="{{ route('practices.edit', $practice->id) }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">Edit</a>
                            <form action="{{ route('practices.destroy', $practice->id) }}" method="POST" onsubmit="return confirm('Are you sure?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 shadow-md transition">Delete</button>
                            </form>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-center mt-3">
        {{ $practices->links() }}
    </div>
</section>

@endsection
