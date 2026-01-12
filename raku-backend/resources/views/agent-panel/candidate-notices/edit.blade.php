@extends('agent-panel.layout.agent_master')

@section('contents')
    <div class="bg-white rounded-3 shadow-sm border p-6">

        <!-- Header -->
        <div class="text-2xl font-bold text-gray-800 border-b pb-3 mb-5 flex items-center gap-2">
            <p class="p-2 rounded-full bg-indigo-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M19.7134 9.12811L19.4668 9.69379C19.2864 10.1079 18.7136 10.1079 18.5331 9.69379L18.2866 9.12811C17.8471 8.11947 17.0555 7.31641 16.0677 6.87708L15.308 6.53922C14.8973 6.35653 14.8973 5.75881 15.308 5.57612L16.0252 5.25714C17.0384 4.80651 17.8442 3.97373 18.2761 2.93083L18.5293 2.31953C18.7058 1.89349 19.2942 1.89349 19.4706 2.31953L19.7238 2.93083C20.1558 3.97373 20.9616 4.80651 21.9748 5.25714L22.6919 5.57612C23.1027 5.75881 23.1027 6.35653 22.6919 6.53922L21.9323 6.87708C20.9445 7.31641 20.1529 8.11947 19.7134 9.12811Z" />
                </svg>
            </p>
            Edit Candidate Notice
        </div>

        <!-- Form -->
        <form action="{{ route('agent.candidate-notices.update', $candidateNotice->id) }}" method="POST">
            @csrf

            <div class="row g-4">
                <!-- Title -->
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value="{{ old('title', $candidateNotice->title) }}"
                        class="form-control form-control-lg shadow-sm rounded-2"
                        placeholder="Enter title">
                    @error('title')
                        <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <!-- Type -->
                <div class="col-md-3">
                    <label class="form-label fw-semibold">Type</label>
                    <select name="type" class="form-select form-select-lg shadow-sm rounded-2">
                        <option value="general" {{ old('type', $candidateNotice->type) == 'general' ? 'selected' : '' }}>
                            General
                        </option>
                        <option value="exam_schedule" {{ old('type', $candidateNotice->type) == 'exam_schedule' ? 'selected' : '' }}>
                            Exam Schedule
                        </option>
                        <option value="reminder" {{ old('type', $candidateNotice->type) == 'reminder' ? 'selected' : '' }}>
                            Reminder
                        </option>
                        <option value="promotional" {{ old('type', $candidateNotice->type) == 'promotional' ? 'selected' : '' }}>
                            Promotional
                        </option>
                    </select>
                    @error('type')
                        <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <!-- Status -->
                <div class="col-md-3">
                    <label class="form-label fw-semibold">Status</label>
                    <select name="status" class="form-select form-select-lg shadow-sm rounded-2">
                        <option value="1" {{ old('status', $candidateNotice->status) == 1 ? 'selected' : '' }}>
                            Active
                        </option>
                        <option value="0" {{ old('status', $candidateNotice->status) == 0 ? 'selected' : '' }}>
                            Inactive
                        </option>
                    </select>
                    @error('status')
                        <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>
            </div>

            <!-- Message -->
            <div class="mt-4">
                <label class="form-label fw-semibold">Message</label>
                <textarea
                    name="message"
                    rows="5"
                    class="form-control form-control-lg shadow-sm rounded-2"
                    placeholder="Write notification message...">{{ old('message', $candidateNotice->message) }}</textarea>
                @error('message')
                    <small class="text-danger">{{ $message }}</small>
                @enderror
            </div>

            <!-- Agent ID (locked) -->
            <input type="hidden" name="agent_id" value="{{ $candidateNotice->agent_id }}">

            <!-- Submit -->
            <div class="pt-4 flex gap-2">
                <button type="submit"
                    class="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M18 21V13H6V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H18ZM16 21H8V15H16V21Z" />
                    </svg>
                    Update Notice
                </button>

                <a href="{{ route('agent.candidate-notices.list') }}"
                    class="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition">
                    Cancel
                </a>
            </div>
        </form>
    </div>
@endsection
