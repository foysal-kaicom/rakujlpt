@extends('agent-panel.layout.agent_master')

@section('title', 'Agent | Import Candidates')

@section('contents')

<section class="card border shadow-sm mb-4">
    <!-- Section Header -->
    <div class="card-header py-3 px-4 d-flex justify-content-between align-items-center bg-indigo-300">
        <h3 class="font-semibold text-lg">👤 Upload Candidate CSV</h3>
    </div>

    <!-- Form to upload CSV -->
    <form action="{{ route('agent.candidate.import') }}" method="POST" enctype="multipart/form-data" id="uploadForm">
        @csrf
        <div class="card-body">
            <div class="row g-4">

                <!-- Drag & Drop CSV Upload -->
                <div class="col-md-12">
                    <label for="candidate_csv_file" class="form-label fw-medium font-semibold">Upload CSV</label>

                    <div id="dropZone"
                        class="border-2 border-dashed rounded p-4 text-center bg-light cursor-pointer h-[200px] flex flex-col w-full justify-center items-center">
                        <p class="mb-1">📂 Drag & Drop your Candidate CSV here</p>
                        <small class="text-muted">or click to select</small>
                        <input type="file" id="candidate_csv_file" name="csv_file" accept="text/csv" required class="d-none">
                    </div>

                    <div class="d-flex justify-content-start mt-3">
                        <a href="{{ route('agent.candidate.sample.csv') }}"
                           class="btn btn-outline-primary btn-sm d-flex align-items-center gap-2">
                            ⬇️ Download Sample CSV
                        </a>
                    </div>
                    
                </div>
            </div>

            <!-- Preview Section -->
            <div id="previewContainer" class="mt-4 d-none">
                <h6 class="fw-semibold mb-2">Preview</h6>
                <div class="border rounded p-3 d-flex align-items-center">
                    <span class="me-3 fs-3">📑</span>
                    <div>
                        <p id="fileName" class="m-0 fw-medium"></p>
                        <small id="fileSize" class="text-muted"></small>
                    </div>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="d-flex justify-content-end mt-4">
                <button type="submit"
                    class="text-white bg-indigo-500 px-4 py-2 font-semibold shadow-sm hover:bg-indigo-400 rounded">
                    Upload Candidate CSV
                </button>
            </div>
        </div>
    </form>
</section>

<section class="card border shadow-sm mt-4">
    <div class="py-3 px-4 bg-indigo-200">
        <h3 class="font-semibold text-lg">📋 Candidate CSV Processing Status</h3>
    </div>

    <div class="card-body p-0">
        <table class="table table-striped m-0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Process Name</th>
                    <th>File Name</th>
                    <th>Status</th>
                    <th>Uploaded At</th>
                </tr>
            </thead>

            <tbody>
                @forelse($fileProcesses as $fp)
                    <tr>
                        <td>{{ $fp->id }}</td>
                        <td>{{ $fp->process_name }}</td>
                        <td>{{ $fp->file_name }}</td>
                        <td>
                            @if($fp->status == 'success')
                                <span class="badge bg-success">{{ $fp->status }}</span>
                            @elseif($fp->status == 'failed')
                                <span class="badge bg-danger">{{ $fp->status }}</span>
                            @elseif($fp->status == 'processing')
                                <span class="badge bg-warning text-dark">{{ $fp->status }}</span>
                            @else
                                <span class="badge bg-secondary">{{ $fp->status }}</span>
                            @endif
                        </td>
                        <td>{{ $fp->created_at }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="text-center py-4 text-muted">
                            No import history found.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</section>

<!-- Drag & Drop JS -->
<script>
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('candidate_csv_file');
    const previewContainer = document.getElementById('previewContainer');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');

    // Open file dialog on click
    dropZone.addEventListener('click', () => fileInput.click());

    // Handle drag events
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('bg-primary', 'text-white');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('bg-primary', 'text-white');
    });

    // Handle file drop
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('bg-primary', 'text-white');
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            showPreview(fileInput.files[0]);
        }
    });

    // Handle file selection
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            showPreview(fileInput.files[0]);
        }
    });

    function showPreview(file) {
        // Some browsers give "" for csv mime-type, so check extension too
        const isCsv = (file.type === "text/csv") || file.name.toLowerCase().endsWith(".csv");

        if (file && isCsv) {
            previewContainer.classList.remove('d-none');
            fileName.textContent = file.name;
            fileSize.textContent = (file.size / 1024).toFixed(2) + " KB";
        } else {
            previewContainer.classList.add('d-none');
        }
    }
</script>

@endsection
