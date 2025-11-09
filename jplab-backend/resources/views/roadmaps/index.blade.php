@extends('master')

@section('contents')

<!-- Filter Section -->
<section class="w-100 bg-white rounded overflow-hidden mb-4" style="font-family: sans-serif;">
    <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold">Filters</h3>
    </div>

    <form method="GET" action="{{ route('roadmaps.index') }}">
        <div class="py-3 px-4 d-flex justify-content-between border align-items-center">
            <div class="col-md-12">
                <div class="row g-3">
                    <!-- Search -->
                    <div class="col-md-3">
                        <label class="form-label">Search</label>
                        <input type="text" name="title" value="{{ old('title', request()->title) }}"
                            class="form-control" placeholder="Search a title..." />
                        @error('title') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>

                    <!-- Date Filter -->
                    <div class="col-md-3">
                        <label class="form-label">Choose Date:</label>
                        <select name="date_filter" class="form-select">
                            <option value="">Select option...</option>
                            <option value="created_at" {{ request('date_filter') == 'created_at' ? 'selected' : '' }}>Created At</option>
                            <option value="updated_at" {{ request('date_filter') == 'updated_at' ? 'selected' : '' }}>Updated At</option>
                        </select>
                    </div>

                    <!-- From Date -->
                    <div class="col-md-3">
                        <label class="form-label">From</label>
                        <input type="date" name="from_date" value="{{ request('from_date') }}" class="form-control" />
                        @error('from_date') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>

                    <!-- To Date -->
                    <div class="col-md-3">
                        <label class="form-label">To</label>
                        <input type="date" name="to_date" value="{{ request('to_date') }}" class="form-control" />
                        @error('to_date') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>

                    <!-- Buttons -->
                    <div class="flex justify-end items-center gap-3 mt-3">
                        <a href="{{ route('roadmaps.index') }}"
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

<!-- Roadmap List Section -->
<section class="w-100 bg-white rounded overflow-hidden" style="font-family: sans-serif;">
    <div class="py-3 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold m-0">Roadmap List</h3>
        <a href="{{ route('roadmaps.create') }}"
            class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition">
            <i class="fa-solid fa-plus"></i> Create New Roadmap
        </a>
    </div>

    <div class="table-responsive">
        <table class="table table-striped table-hover border align-middle">
            <thead>
                <tr>
                    <th scope="col" class="text-uppercase text-secondary small px-4 py-3">#</th>
                    <th scope="col" class="text-secondary small px-4 py-3">
                        <a href="{{ route('roadmaps.index', [
                            'order_by' => 'title',
                            'direction' => request('direction') === 'asc' ? 'desc' : 'asc'
                        ]) }}" class="text-primary hover-effect">
                            Title
                        </a>
                    </th>
                    <th scope="col" class="text-secondary small py-3">Slug</th>
                    <th scope="col" class="text-secondary small py-3">Created At</th>
                    <th scope="col" class="text-secondary small py-3">Action</th>
                </tr>
            </thead>

            <tbody>
                @forelse($roadmaps as $index => $roadmap)
                    <tr>
                        <td>{{ $roadmaps->firstItem() + $index }}</td>
                        <td>{{ $roadmap->title }}</td>
                        <td>{{ $roadmap->slug }}</td>
                        <td>{{ $roadmap->created_at?->format('Y-m-d') }}</td>
                        <td>
                            <div class="flex gap-2">
                                <a href="{{ route('roadmaps.edit', $roadmap->id) }}"
                                    class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">
                                    Edit
                                </a>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="text-center py-4 text-muted">No roadmaps found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-center mt-3">
        {{ $roadmaps->links() }}
    </div>
</section>

<style>
    th a:hover { color: #031a33; text-decoration: underline; }
</style>

@endsection
