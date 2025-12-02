@extends('master')

@section('contents')
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
<section class="w-100 bg-white rounded overflow-hidden mb-4" style="font-family: sans-serif;">
    <div class="p-2 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold">Filters</h3>
    </div>

    <form method="GET" action="{{ route('packages.index') }}">
        <div class="py-3 px-4 d-flex justify-content-between border align-items-center">
            <div class="col-md-12">
                <div class="row g-3">

                    <!-- SEARCH -->
                    <div class="col-md-3">
                        <label class="form-label">Search Package</label>
                        <input type="text" name="name" class="form-control"
                               value="{{ request()->name }}" placeholder="Search by name...">
                    </div>

                    <div class="flex justify-end items-center gap-3 mt-3">
                        <a href="{{ route('packages.index') }}" class="px-8 py-2 rounded-xl text-sm font-medium border shadow-md">
                            Reset Filters
                        </a>
                        <button type="submit" class="px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white shadow-md">
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
        <h3 class="text-lg font-semibold m-0">Package List</h3>
        @hasPermission('packages.create')
        <a href="{{ route('packages.create') }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition">
            <i class="fa-solid fa-plus"></i> Create Package
        </a>
        @endHasPermission
    </div>

    <div class="table-responsive">
        <table class="table table-striped table-hover border align-middle">
            <thead>
                <tr class="text-center">
                    <th>
                        <a href="{{ route('packages.index', ['order_by' => 'name', 'direction' => (request()->direction == 'asc' ? 'desc' : 'asc')]) }}">
                            Name
                        </a>
                    </th>

                    <th>
                        <a href="{{ route('packages.index', ['order_by' => 'price', 'direction' => (request()->direction == 'asc' ? 'desc' : 'asc')]) }}">
                            Price
                        </a>
                    </th>

                    <th>
                        <a href="{{ route('packages.index', ['order_by' => 'order', 'direction' => (request()->direction == 'asc' ? 'desc' : 'asc')]) }}">
                            Sequence
                        </a>
                    </th>

                    <th>Status</th>

                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                @foreach($packages as $package)
                <tr class="text-center">
                    <td>{{ $package->name }}</td>

                    <td>
                        {{ $package->is_free == 1 ? 'FREE' : $package->price }}
                    </td>

                    {{-- <td>{{ $package->short_description }}</td> --}}

                    <td class="text-center">{{ $package->order }}</td>

                    <td class="flex justify-center">
                        <form action="{{ route('packages.toggleStatus', $package->id) }}" method="POST" class="pt-2">
                            @csrf
                            <div class="form-check form-switch toggle-switch-lg">
                                <input class="form-check-input"
                                    type="checkbox"
                                    onclick="return confirmToggle(this)"
                                    {{ $package->status ? 'checked' : '' }}>
                            </div>
                        </form>
                    </td>

                    <td class="justify-center">
                        <div class="flex gap-2 justify-center">
                            @hasPermission('packages.edit')
                            <a href="{{ route('packages.edit', $package->id) }}"
                                class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">
                                Edit
                            </a>
                            @endHasPermission

                            {{-- @hasPermission('packages.destroy')
                            <form action="{{ route('packages.destroy', $package->id) }}"
                                  method="POST" onsubmit="return confirm('Are you sure?')">
                                @csrf
                                @method('DELETE')
                                <button class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 shadow-md transition">
                                    Delete
                                </button>
                            </form>
                            @endHasPermission --}}
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="d-flex justify-content-center mt-3">
        {{ $packages->links() }}
    </div>

</section>

<script>
    function confirmToggle(checkbox) {
        const form = checkbox.closest('form');

        let message = checkbox.checked
            ? "Do you want to activate this package?"
            : "Do you want to deactivate this package?";

        if (confirm(message)) {
            form.submit();
            return true;
        } else {
            // Revert back because user canceled
            checkbox.checked = !checkbox.checked;
            return false;
        }
    }
</script>

@endsection
