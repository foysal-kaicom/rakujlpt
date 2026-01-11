@extends('master')

@section('contents')

<section class="w-100 bg-white rounded overflow-hidden" style="font-family: sans-serif;">
    <div class="py-3 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold m-0">Agent List</h3>
        
        <div class="flex items-center gap-4">
            <!-- Dropdown for filtering by status -->
            <form method="GET" action="{{ route('agents.list') }}">
                <select name="status" class="text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" onchange="this.form.submit()">
                    <option value="">All</option>
                    <option value="1" {{ request('status') == '1' ? 'selected' : '' }}>Active</option>
                    <option value="0" {{ request('status') == '0' ? 'selected' : '' }}>Disabled</option>
                </select>
            </form>

            <a href="{{ route('agents.create') }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition">
                <i class="fa-solid fa-plus"></i> Create New Agent
            </a>
        </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
        <table class="table table-striped table-hover border align-middle">
            <thead>
                <tr>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">ID</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">Image</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">Agent Name</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">Agency Name</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">Email</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">Phone</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">Location</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">Status</th>
                    <th scope="col" class="d-none d-md-table-cell text-secondary small px-2 py-3">Action</th>
                </tr>
            </thead>

            <tbody>
                @foreach($agents as $agent)
                <tr>
                    <td class="px-2 py-1">{{ $agent->id }}</td>
                    <td>
                        <img style="width: 50px; height: 50px; object-fit: cover;" class="cat-thumb" src="{{ $agent->photo ? $agent->photo  : asset('imagePH.png') }}" alt="Category">
                    </td>
                    <td class="d-none d-sm-table-cell px-2 py-1">{{ $agent->name }}</td>
                    <td class="d-none d-md-table-cell px-2 py-1">{{ $agent->business_name }}</td>
                    <td class="d-none d-md-table-cell px-2 py-1">{{ $agent->email }}</td>
                    <td class="d-none d-md-table-cell px-2 py-1">{{ $agent->phone }}</td>
                    <td class="d-none d-md-table-cell px-2 py-1">{{ $agent->location }}</td>

                    <td class="d-none d-sm-table-cell px-2 py-1">
                        <form action="{{ route('agents.toggleStatus', $agent->id) }}" method="POST" class="d-flex">
                            @csrf
                            <div class="form-check form-switch toggle-switch-lg">
                                <input class="form-check-input"
                                    type="checkbox"
                                    id="toggleAgent{{ $agent->id }}"
                                    onchange="if(confirm('Are you sure you want to {{ $agent->status ? 'disable' : 'enable' }} this agent?')) { this.form.submit(); } else { this.checked = !this.checked; }"
                                    {{ $agent->status ? 'checked' : '' }}>
                            </div>
                        </form>
                    </td>

                    <td class="d-none d-sm-table-cell px-2">
                        <div class="flex gap-2">
                            <a href="{{ route('agents.edit', $agent->id) }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">
                                <button>Edit</button>
                            </a>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Pagination Links -->
    <div class="d-flex justify-content-center mt-3">
        {{ $agents->links() }}
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
            border-color: #28a745;
        }
    </style>

</section>

<script>
    function confirmAction(event, url) {
        const userConfirmed = confirm('Are you sure you want to copy this agent?');

        if (!userConfirmed) {
            event.preventDefault();
            return false;
        }
        window.location.href = url;
        return true;
    }
</script>


@endsection

