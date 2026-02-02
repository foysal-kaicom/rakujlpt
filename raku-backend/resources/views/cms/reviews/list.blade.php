@extends('master')

@section('contents')

<style>
    .toggle-switch-lg .form-check-input {
        width: 3rem;
        height: 1.5rem;
        cursor: pointer;
    }
    .form-check-input:checked { background-color: #28a745; border-color: #28a745; }
    .form-check-input:not(:checked) { background-color: #ffffff; border-color: #777272; }
    .form-check-input:focus { box-shadow: 0 0 0 0.2rem rgba(40,167,69,.25); }
    .avatar {
        width: 44px; height: 44px; border-radius: 8px; object-fit: cover; border: 1px solid #e5e7eb;
    }
    .truncate-2 {
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        max-width: 420px;
    }
</style>

<section class="w-100 bg-white rounded overflow-hidden">
    <!-- Section Header -->
    <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300"
         style=" color:#04070a">
        <h3 class="text-md m-0">Review List</h3>

        @hasPermission('review.create')
        <a href="{{ route('review.create') }}" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-plus"></i> Create New Review
        </a>
        @endHasPermission
    </div>

    <!-- Table -->
    <div class="table-responsive">
        <table class="table table-striped table-hover align-middle">
            <thead class="table-light">
                <tr>
                    {{-- <th scope="col" class="text-uppercase text-secondary small">ID</th> --}}
                    <th scope ="col" class="text-uppercase text-secondary small">Review Date</th>
                    <th scope="col" class="d-none d-sm-table-cell text-uppercase text-secondary small">Reviewer</th>
                    <th scope="col" class="d-none d-lg-table-cell text-uppercase text-secondary small">Designation</th>
                    <th scope="col" class="d-none d-xl-table-cell text-uppercase text-secondary small">Review</th>
                    <th scope="col" class="text-uppercase text-secondary small">Rating</th>
                    <th scope="col" class="d-none d-md-table-cell text-uppercase text-secondary small">Image</th>
                    <th scope="col" class="text-uppercase text-secondary small">Status</th>
                    
                    <th scope="col" class="d-none d-md-table-cell text-uppercase text-secondary small">Created</th>
                    <th scope="col" class="text-uppercase text-secondary small">Action</th>
                </tr>
            </thead>
            <tbody>
                @forelse($reviews as $review)
                    <tr>
                        {{-- <td>{{ $review->id }}</td> --}}
                        <td class="d-none d-md-table-cell">
                            {{ $review->created_at?->format('d M Y') }}
                        </td>

                        <td class="d-none d-sm-table-cell fw-semibold">{{ $review->reviewer_name }}</td>

                        <td class="d-none d-lg-table-cell">{{ $review->reviewer_designation ?: '—' }}</td>

                        <td class="d-none d-xl-table-cell text-muted truncate-2">
                            {{ \Illuminate\Support\Str::limit($review->body, 30) }}
                        </td>

                        <td>
                            <span class="badge bg-indigo-600">{{ $review->rating }}/5</span>
                        </td>

                        <td class="d-none d-md-table-cell">
                            @if($review->image)
                                <img class="avatar" src="{{ asset($review->image) }}" alt="review image">
                            @else
                                <img class="avatar" src="{{ asset('imagePH.png') }}" alt="placeholder">
                            @endif
                        </td>

                        <!-- ✅ Status Toggle -->
                        <td>
                            @hasPermission('review.toggleStatus')
                            <form action="{{ route('review.toggleStatus', $review->id) }}" method="POST" class="d-inline-block">
                                @csrf
                                <div class="form-check form-switch toggle-switch-lg">
                                    <input 
                                        type="checkbox" 
                                        class="form-check-input toggle-switch" 
                                        id="reviewToggle{{ $review->id }}" 
                                        onchange="if(confirm('Are you sure you want to {{ $review->status == 'active' ? 'deactivate' : 'activate' }} this review?')) { this.form.submit(); } else { this.checked = !this.checked; }"
                                        {{ $review->status == true ? 'checked' : '' }}
                                    >
                                </div>
                            </form>
                            @endHasPermission
                        </td>
                        <td>
                            @php
                                switch($review->review_status) {
                                    case 'approved':
                                        $badgeClass = 'bg-success text-white';
                                        break;
                                    case 'rejected':
                                        $badgeClass = 'bg-danger text-white';
                                        break;
                                    default: // pending
                                        $badgeClass = 'bg-warning text-dark';
                                }
                            @endphp
                            <span class="badge {{ $badgeClass }}">
                                {{ ucfirst($review->review_status) }}
                            </span>
                        </td>

                        

                        <td>
                            <div class="d-flex gap-2">
                                @hasPermission('review.edit')
                                <a href="{{ route('review.edit', $review->id) }}" class="badge p-2 bg-success text-white" style="width: 70px">Edit</a>
                                @endHasPermission

                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="9" class="text-center text-muted py-4">No reviews found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    @if(method_exists($reviews, 'links'))
    <div class="px-4 pb-3">
        {{ $reviews->links() }}
    </div>
    @endif
</section>

@endsection
