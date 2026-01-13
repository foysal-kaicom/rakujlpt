@extends('agent-panel.layout.agent_master')

@section('contents')
    <section class="w-100 bg-white rounded overflow-hidden">

        <div class="d-flex justify-content-between align-items-center mb-4 border-b pb-3">
            <h1 class="h3">Candidate Notice List</h1>

            <div class="flex gap-5 items-center">
                <form action="{{ route('agent.candidate-notices.list') }}" method="GET" class="">
                    <select
                        class="flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition focus:outline-none cursor-pointer"
                        name="status" onchange="this.form.submit()">
                        <option value="1" {{ request('status') == '1' ? 'selected' : '' }}>Only Active</option>
                        <option value="0" {{ request('status') == '0' ? 'selected' : '' }}>All</option>
                    </select>
                </form>

                <a href="{{ route('agent.candidate-notices.create') }}"
                    class="bg-indigo-500 text-white px-8 py-2 rounded-lg hover:bg-indigo-600 duration-300">
                    <i class="fas fa-plus"></i> Create Candidate Notice
                </a>

            </div>

        </div>


        <!-- Table -->
        <div class="">
            <table class="w-full border">
            <colgroup>
                <col class="w-[70px]"> <!-- ID -->
                <col class="w-[50%]"> <!-- Title -->
                <col> <!-- Type -->
                <col> <!-- Status -->
                <col> <!-- Action -->
            </colgroup>

            <thead class="bg-indigo-300">
                <tr class="text-sm">
                <th class="text-uppercase px-4 py-3">ID</th>
                <th class="hidden sm:table-cell text-uppercase px-4 py-3">Title</th>
                <th class="text-uppercase px-4 py-3">Type</th>
                <th class="hidden md:table-cell text-uppercase px-4 py-3">Status</th>
                <th class="hidden md:table-cell text-uppercase px-4 py-3">Action</th>
                </tr>
            </thead>

            <tbody>
                @foreach ($candidateNotices as $notice)
                <tr class="border-b text-sm">
                    <td class="px-4 py-3">{{ $notice->id }}</td>

                    <td class="hidden sm:table-cell px-4 py-3">
                    <span class="truncate-1" title="{{ $notice->title }}">
                        {{ $notice->title }}
                    </span>
                    </td>

                    <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {{ ucfirst(str_replace('_', ' ', $notice->type)) }}
                    </span>
                    </td>

                    <td class="hidden md:table-cell px-4 py-3">
                    <form action="{{ route('agent.candidate-notices.toggleStatus', $notice->id) }}" method="POST"
                        class="d-flex justify-content-start align-items-center m-0">
                        @csrf
                        <div class="form-check form-switch toggle-switch-lg m-0">
                        <input type="checkbox" class="form-check-input toggle-switch"
                            id="noticeToggle{{ $notice->id }}"
                            onchange="if(confirm('Are you sure you want to {{ $notice->status ? 'disable' : 'enable' }} this notice?')) { this.form.submit(); } else { this.checked = !this.checked; }"
                            {{ $notice->status ? 'checked' : '' }}>
                        </div>
                    </form>
                    </td>

                    <td class="hidden md:flex items-center gap-1.5 px-4 py-3">
                    <a href="{{ route('agent.candidate-notices.edit', $notice->id) }}" class="hover-effect">
                        <span class="px-3 py-2 rounded-lg text-xs font-medium bg-sky-500 text-white hover:bg-sky-600 shadow-md transition">Edit</span>
                    </a>

                    <form action="{{ route('agent.candidate-notices.delete', $notice->id) }}" class="d-inline-block m-0"
                        method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit"
                        class="px-3 py-2 rounded-lg text-xs font-medium bg-red-400 text-white hover:bg-red-500 shadow-md transition"
                        onclick="return confirm('Are you sure you want to delete this notice?')">Delete</button>
                    </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
            </table>
        </div>

    </section>

    <style>
        .table-fixed {
            table-layout: fixed;
        }

        .truncate-1 {
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .toggle-switch-lg .form-check-input {
            width: 3rem;
            height: 1.5rem;
            cursor: pointer;
        }

        .form-check-input:checked {
            background-color: #28a745;
            border-color: #28a745;
        }

        .form-check-input:not(:checked) {
            background-color: #ffffff;
            border-color: #a6a6a6;
        }

        .form-check-input:focus {
            box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, .25);
        }
    </style>
@endsection
