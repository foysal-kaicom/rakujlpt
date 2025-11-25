@extends('master')

@section('contents')
<div class="">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 border-b pb-3">
        <h1 class="h3">Team Members</h1>

        @hasPermission('team.create')
        <a href="{{ route('our-team.create') }}"
           class="bg-indigo-500 text-white px-8 py-2 rounded-lg hover:bg-indigo-600 duration-300">
            <i class="fas fa-plus"></i> Create Member
        </a>
        @endHasPermission
    </div>

    <!-- Success Message -->
    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

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

    <!-- Table -->
    <div class="shadow-sm">
        <div class="p-0 min-w-[300px] overflow-x-auto">
            <table class="min-w-full border border-gray-300 text-sm stripe">
                <thead class="bg-indigo-300 border">
                    <tr>
                        <th class="px-4 py-3">#</th>
                        <th class="px-4 py-3">Photo</th>
                        <th class="px-4 py-3">Name</th>
                        <th class="px-4 py-3">Email</th>
                        <th class="px-4 py-3">Designation</th>
                        <th class="px-4 py-3">Serial No.</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    @forelse ($teamList as $index => $member)
                    <tr class="border">
                        <td class="px-4 py-3">{{ $index + 1 }}</td>

                        <!-- Photo -->
                        <td class="px-4 py-3">
                            @if($member->photo)
                                <img src="{{ $member->photo }}"
                                     alt="photo"
                                     class="rounded-md border"
                                     style="width: 40px; height: 40px; object-fit: cover;">
                            @else
                                <span class="text-gray-400 text-xs">N/A</span>
                            @endif
                        </td>

                        <td class="px-4 py-3">{{ $member->name }}</td>
                        <td class="px-4 py-3">{{ $member->email ?? 'N/A' }}</td>
                        <td class="px-4 py-3">{{ $member->designation }}</td>
                        <td class="px-4 py-3">{{ $member->serial_no }}</td>
                        <td class="px-4 py-3">
                            <form action="{{ route('our-team.toggleStatus', $member->id) }}" method="POST" class="d-flex">
                                @csrf
                                <div class="form-check form-switch toggle-switch-lg">
                                    <input class="form-check-input"
                                        type="checkbox"
                                        id="toggleExam{{ $member->id }}"
                                        onchange="if(confirm('Are you sure you want to {{ $member->status ? 'disable' : 'enable' }} this exam?')) { this.form.submit(); } else { this.checked = !this.checked; }"
                                        {{ $member->status ? 'checked' : '' }}>
                                </div>
                            </form>
                        </td>

                        <!-- Actions -->
                        <td class="px-4 py-3 flex">

                            @hasPermission('our-team.edit')
                            <a href="{{ route('our-team.edit', $member->id) }}"
                               class="px-3 py-2 rounded-lg text-xs font-medium bg-sky-500 text-white hover:bg-sky-600 shadow-md transition">
                                Edit
                            </a>
                            @endHasPermission

                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="9" class="text-center p-3">No team members found.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- Pagination -->
    <div class="mt-3">
        {{ $teamList->links() }}
    </div>
</div>
@endsection
