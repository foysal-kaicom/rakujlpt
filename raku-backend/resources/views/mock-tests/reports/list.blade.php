@extends('master')

@section('contents')
<section class="w-100 bg-white rounded overflow-hidden">
    <!-- Header -->
    <div class="py-3 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="text-lg font-semibold m-0">Mock Test Reports</h3>
    </div>

    <!-- Filters -->
    <div class="px-4 py-3 d-flex gap-3 flex-wrap bg-light">
        <form method="GET" action="{{ route('mock-tests.reports.list') }}" class="d-flex gap-2 flex-wrap">

            <input type="date" name="from_date" class="form-control w-auto"
                   value="{{ request('from_date') }}">
        
            <input type="date" name="to_date" class="form-control w-auto"
                   value="{{ request('to_date') }}">
        
            <select name="exam_id" class="form-select w-auto">
                <option value="">-- Select Exam --</option>
                @foreach($exams as $exam)
                    <option value="{{ $exam->id }}" {{ request('exam_id') == $exam->id ? 'selected' : '' }}>
                        {{ $exam->title }}
                    </option>
                @endforeach
            </select>
        
            <button type="submit" class="btn btn-primary">Filter</button>
            <a href="{{ route('mock-tests.reports.list') }}" class="btn btn-secondary">Reset</a>
            <a href="{{ route('mock-tests.reports.export', request()->query()) }}" 
                class="btn btn-success">
                 Export CSV
             </a>
        </form>
    </div>

    <!-- Table -->
    <div class="table-responsive px-4 py-3">
        <table class="table table-striped table-hover border align-middle">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Candidate</th>
                    <th>Exam</th>
                    <th>Question Set</th>
                    <th>Reading Answered</th>
                    <th>Correct Reading</th>
                    <th>Wrong Reading</th>
                    <th>Listening Answered</th>
                    <th>Correct Listening</th>
                    <th>Wrong Listening</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                @forelse($records as $record)
                    <tr>
                        <td>{{ $record->id }}</td>
                        <td>
                            @if($record->candidate)
                                <a href="{{ route('candidate.edit', $record->candidate->id) }}"
                                   class="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors">
                                    {{ $record->candidate->full_name }}
                                </a>
                            @else
                                -
                            @endif
                        </td>
                        <td>{{ $record->exam->title ?? '-' }}</td>
                        <td>{{ $record->question_set }}</td>
                        <td>{{ $record->reading_answered }}</td>
                        <td>{{ $record->correct_reading_answer }}</td>
                        <td>{{ $record->wrong_reading_answer }}</td>
                        <td>{{ $record->listening_answered }}</td>
                        <td>{{ $record->correct_listening_answer }}</td>
                        <td>{{ $record->wrong_listening_answer }}</td>
                        <td>{{ $record->created_at->format('Y-m-d H:i') }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="11" class="text-center">No records found</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Pagination & Record Count -->
    <div class="d-flex justify-content-between align-items-center px-4 flex-wrap">
        <div class="text-muted medium mb-2 mb-sm-0">
            @if ($records->total() > 0)
                Showing <strong>{{ $records->firstItem() }}</strong> to 
                <strong>{{ $records->lastItem() }}</strong> of 
                <strong>{{ $records->total() }}</strong> records
            @else
                Showing <strong>0</strong> records
            @endif
        </div>

        <div>
            {{ $records->links() }}
        </div>
    </div>
</section>
@endsection
