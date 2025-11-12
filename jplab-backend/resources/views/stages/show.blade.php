@extends('master')

@section('contents')

<section class="w-100 bg-white rounded overflow-hidden mb-4" style="font-family: sans-serif;">
    <div class="p-4 d-flex justify-content-between align-items-center bg-indigo-300">
        {{-- <h3 class="text-lg font-semibold">Stage: {{ $stage->title }}</h3> --}}
        <h3 class="text-lg font-semibold">Question List for {{ $stage->title }}</h3>
        {{-- <a href="{{ route('practices.create.stage', $stage->id) }}" 
           class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium border shadow-md transition">
           Create New Practice
        </a> --}}
        <a href="{{ route('practices.create.stage', $stage->id) }}" class="flex items-center gap-2 px-8 py-2 rounded-xl text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition">
            <i class="fa-solid fa-plus"></i> Create New Question
        </a>
    </div>

    <div class="p-4">
        

        @php
            $allQuestions = [];
            foreach($stage->practices as $practice) {
                foreach($practice->questions_array ?? [] as $question) {
                    $question['practice_title'] = $practice->title;
                    $question['practice_id'] = $practice->id;
                    $allQuestions[] = $question;
                }
            }
        @endphp

        @if(!empty($allQuestions))
        <table class="w-full border border-gray-300 rounded-lg text-sm">
            <thead class="bg-gray-100">
                <tr>
                     <th class="p-2 text-left border">#</th>
                    {{-- <th class="p-2 text-left border">Practice</th> --}}
                    <th class="p-2 text-left border">Question</th>
                    <th class="p-2 text-left border">Type</th>
                    <th class="p-2 text-left border">Proficiency Level</th>
                    <th class="p-2 text-left border">Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($allQuestions as $index => $question)
                <tr>
                    <td class="p-2 border">{{ $index + 1 }}</td> {{-- Serial number --}}
                    {{-- <td class="p-2 border">{{ $question['practice_title'] }}</td> --}}
                    {{-- <td class="p-2 border">{{ $question['question'] ?? '-' }}</td> --}}
                    <td class="p-2 border">
                        @if($question['question_type'] === 'text')
                            {{ $question['question'] ?? '-' }}
                        @elseif(in_array($question['question_type'], ['image', 'audio']))
                            @if($question['question'])
                                <img src="{{ asset('storage/' . $question['question']) }}" alt="Question Image" class="max-h-20 rounded">
                            @else
                                -
                            @endif
                        @else
                            -
                        @endif
                    </td>

                    <td class="p-2 border">{{ $question['question_type'] ?? '-' }}</td>
                    <td class="p-2 border">{{ $question['proficiency_level'] ?? '-' }}</td>
                    <td class="p-2 border">
                        <a href="{{ route('practices.edit', $question['practice_id']) }}"  
                           class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded">Edit</a>
                        <button type="button" class="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded delete-btn" data-id="{{ $question['practice_id'] }}">
                            Delete
                        </button>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
        @else
            <p class="text-gray-500 italic">No questions found for this stage.</p>
        @endif
    </div>
</section>

{{-- SweetAlert Delete --}}
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const id = this.dataset.id;
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the practice!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/practices/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Accept': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(() => {
                    Swal.fire("Deleted!", "Practice deleted successfully.", "success")
                        .then(() => window.location.reload());
                });
            }
        });
    });
});
</script>

@endsection
