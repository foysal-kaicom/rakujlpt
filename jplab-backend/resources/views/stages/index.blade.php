@extends('master')

@section('contents')
<style>
    .col-md-3{
        width: 20% !important;
    }
    </style>
<section class="w-100 bg-white rounded overflow-hidden mb-4" style="font-family: sans-serif;">
    <!-- Section Header -->
    <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold">Filters</h3>
    </div>
    <form method="GET" action="{{ route('stages.index') }}">
        <div class="py-3 px-4 d-flex justify-content-between border align-items-center">
            <div class="col-md-12">
                <div class="row g-3">
                    <!-- Roadmap Filter -->
                    <div class="col-md-3">
                        <label class="form-label">Select Roadmap</label>
                        <select name="roadmap_id" class="form-select">
                            <option value="">Choose a roadmap...</option>
                            @foreach($roadmaps as $roadmap)
                                <option value="{{ $roadmap->id }}" {{ old('roadmap_id', request()->roadmap_id) == $roadmap->id ? 'selected' : '' }}>
                                    {{ $roadmap->title }}
                                </option>
                            @endforeach
                        </select>
                        @error('roadmap_id') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>
                    
                    <!-- Search Filter -->
                    <div class="col-md-3">
                        <label class="form-label">Search</label>
                        <input type="text" name="title" value="{{ old('title', request()->title) }}" class="form-control" placeholder="Search a title..." />
                        @error('title') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>

                    <!-- Date Filter -->
                    <div class="col-md-3">
                        <label class="form-label">Choose Date:</label>
                        <select name="date_filter" class="form-select">
                            <option value="">Select option...</option>
                            <option value="created_at" {{ old('date_filter', request()->date_filter) == 'created_at' ? 'selected' : '' }}>Created At</option>
                            <option value="updated_at" {{ old('date_filter', request()->date_filter) == 'updated_at' ? 'selected' : '' }}>Updated At</option>
                        </select>
                    </div>

                    <!-- From Date -->
                    <div class="col-md-3">
                        <label class="form-label">From</label>
                        <input type="date" name="from_date" value="{{ old('from_date', request()->from_date) }}" class="form-control" />
                        @error('from_date') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>

                    <!-- To Date -->
                    <div class="col-md-3">
                        <label class="form-label">To</label>
                        <input type="date" name="to_date" value="{{ old('to_date', request()->to_date) }}" class="form-control" />
                        @error('to_date') <div class="text-danger">{{ $message }}</div> @enderror
                    </div>

                    <div class="flex justify-end items-center gap-3 mt-3">
                        <a href="{{ route('stages.index') }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium border shadow-md transition">Reset Filters</a>
                        <button type="submit" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">Apply Filters</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</section>

<section class="w-100 bg-white rounded overflow-hidden" style="font-family: sans-serif;">
    <div class="py-3 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold m-0">Stage List</h3>
        <a href="{{ route('stages.create') }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition">
            <i class="fa-solid fa-plus"></i> Create New Stage
        </a>
    </div>

    <!-- Table -->
    <div class="table-responsive">
        <table class="table table-striped table-hover border align-middle">
            <thead>
                <tr>
                    <th scope="col" class="text-uppercase text-secondary small px-4 py-3">#</th>
                    <th scope="col" class="text-secondary small px-4 py-3">Roadmap</th>
                    <th scope="col" class="text-secondary small px-4 py-3">Title</th>
                    <th scope="col" class="text-secondary small py-3">Order</th>
                    <th scope="col" class="text-secondary small py-3">Duration (mins)</th>
                    <th scope="col" class="text-secondary small py-3">Total Questions</th>
                    <th scope="col" class="text-secondary small py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach($stages as $index => $stage)
                <tr>
                    <!-- Serial Number -->
                    <td>{{ $stages->firstItem() + $index }}</td>
                    <td>{{ $stage->roadmap->title ?? '-' }}</td>
                    <td>{{ $stage->title }}</td>
                    <td>{{ $stage->order }}</td>
                    <td>{{ $stage->duration }}</td>
                    <td class="text-center">{{ $stage->question_count ?? 0 }}</td>
                    <td class="d-none d-sm-table-cell py-1">
                        <div class="form-check form-switch toggle-switch-lg">
                            <input class="form-check-input toggle-stage"
                                type="checkbox"
                                data-id="{{ $stage->id }}"
                                {{ $stage->status ? 'checked' : '' }}>
                        </div>
                    </td>
                   
                    <td>
                        <div class="flex gap-2">
                            <a href="{{ route('stages.edit', $stage->id) }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">Edit</a>
                            <a href="{{ route('stages.show', $stage->id) }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 shadow-md transition">View</a>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-center mt-3">
        {{ $stages->links() }}
    </div>
</section>

<style>
    .toggle-switch-lg .form-check-input { width: 3rem; height: 1.5rem; cursor: pointer; }
    .toggle-switch-lg .form-check-input:checked { background-color: #28a745; border-color: #28a745; }
    th a:hover { color: #031a33; text-decoration: underline; }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
$(document).ready(function() {
    $('.toggle-stage').on('change', function() {
        var checkbox = $(this);
        var stageId = checkbox.data('id');
        var isChecked = checkbox.is(':checked'); // new intended status
        var token = "{{ csrf_token() }}";

        // Ask for confirmation
        Swal.fire({
            title: 'Are you sure?',
            text: isChecked ? "You want to enable this stage?" : "You want to disable this stage?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with AJAX
                $.ajax({
                    url: '/stages/' + stageId + '/toggle-status',
                    type: 'POST',
                    data: { _token: token },
                    success: function(response) {
                        if(response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: response.message,
                                timer: 1500,
                                showConfirmButton: false
                            });
                        }
                    },
                    error: function() {
                        // Revert checkbox if AJAX fails
                        checkbox.prop('checked', !checkbox.prop('checked'));

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Something went wrong!',
                        });
                    }
                });
            } else {
                // User canceled → revert checkbox
                checkbox.prop('checked', !checkbox.prop('checked'));
            }
        });
    });
});
</script>




@endsection
