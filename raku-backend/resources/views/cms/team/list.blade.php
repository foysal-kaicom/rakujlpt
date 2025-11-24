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
                        <th class="px-4 py-3">LinkedIn</th>
                        <th class="px-4 py-3">Facebook</th>
                        <th class="px-4 py-3">Github</th>
                        <th class="">Actions</th>
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

                        <!-- LinkedIn -->
                        <td class="px-4 py-3">
                            @if($member->linkedin_url)
                                <a href="{{ $member->linkedin_url }}" target="_blank"
                                   class="text-blue-600 underline text-xs">
                                    Visit Link
                                </a>
                            @else
                                <span class="text-gray-400 text-xs">N/A</span>
                            @endif
                        </td>

                        <!-- Facebook -->
                        <td class="px-4 py-3">
                            @if($member->facebook_url)
                                <a href="{{ $member->facebook_url }}" target="_blank"
                                   class="text-blue-600 underline text-xs">
                                   Visit Link
                                </a>
                            @else
                                <span class="text-gray-400 text-xs">N/A</span>
                            @endif
                        </td>

                        <!-- Github -->
                        <td class="px-4 py-3">
                            @if($member->github_url)
                                <a href="{{ $member->github_url }}" target="_blank"
                                   class="text-blue-600 underline text-xs">
                                   Visit Link
                                </a>
                            @else
                                <span class="text-gray-400 text-xs">N/A</span>
                            @endif
                        </td>

                        <!-- Actions -->
                        <td class="px-4 py-3 flex">

                            @hasPermission('our-team.edit')
                            <a href="{{ route('our-team.edit', $member->id) }}"
                               class="px-3 py-2 rounded-lg text-xs font-medium bg-sky-500 text-white hover:bg-sky-600 shadow-md transition">
                                Edit
                            </a>
                            @endHasPermission

                            {{-- @hasPermission('our-team.delete') --}}
                            <a href=""
                               onclick="return confirm('Are you sure you want to delete this member?')"
                               class="ml-2 px-3 py-2 rounded-lg text-xs font-medium bg-red-400 text-white hover:bg-red-500 shadow-md transition">
                                Delete
                            </a>
                            {{-- @endHasPermission --}}

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
