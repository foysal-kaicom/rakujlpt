@extends('master')

@section('contents')

<div class="bg-white rounded-3 shadow-sm border p-0">
    <!-- Indigo Header -->
    <div class="text-black d-flex align-items-center justify-content-between px-4 py-3 rounded-top-3">
        <div class="d-flex align-items-center gap-2">
            <p class="p-2 rounded-full bg-white text-indigo-600 mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"/>
                </svg>
            </p>
            <span class="h5 mb-0 fw-bold">Features</span>
        </div>

        @hasPermission('features.create')
        <a href="{{ route('features.create') }}"
           class="btn bg-indigo-500 btn-sm text-white fw-semibold rounded-2 shadow-sm d-inline-flex align-items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/>
            </svg>
            New Feature
        </a>
        @endHasPermission
    </div>

    <div class="p-6">
        {{-- Flash --}}
        @if (session('success'))
            <div class="alert alert-success rounded-2">{{ session('success') }}</div>
        @endif

        <div class="table-responsive">
            <table class="table align-middle">
                <thead class="table-light bg-indigo-500">
                    <tr>
                        <th>#</th>
                        <th>Icon</th>
                        <th>Title</th>
                        <th>Order</th>
                        <th>Status</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($features as $feature)
                        <tr>
                            <td>{{ $loop->iteration + ($features->currentPage() - 1) * $features->perPage() }}</td>
                            <td>
                                @if($feature->icon)
                                    <img src="{{ $feature->icon }}" class="rounded-2" alt="icon" style="height:34px;width:34px;object-fit:contain;">
                                @else
                                    <span class="text-muted small">N/A</span>
                                @endif
                            </td>
                            <td class="fw-semibold">{{ $feature->title }}</td>
                            <td>{{ $feature->order }}</td>
                            <td>
                                @if($feature->status)
                                    <span class="badge bg-success-subtle border text-success">Active</span>
                                @else
                                    <span class="badge bg-secondary-subtle border text-secondary">Inactive</span>
                                @endif
                            </td>
                            <td class="text-end">
                                <div class="d-inline-flex gap-2">
                                    @hasPermission('features.update')
                                    <a href="{{ route('features.edit', $feature->id) }}" class="btn btn-sm btn-outline-primary rounded-2 shadow-sm">Edit</a>
                                    @endHasPermission

                                    @hasPermission('features.destroy')
                                    <form action="{{ route('features.destroy', $feature->id) }}" method="POST" onsubmit="return confirm('Delete this feature?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger rounded-2 shadow-sm">Delete</button>
                                    </button>
                                    </form>
                                    @endHasPermission
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="text-center text-muted py-4">No features found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="mt-3">
            {{ $features->links() }}
        </div>
    </div>
</div>

@endsection
