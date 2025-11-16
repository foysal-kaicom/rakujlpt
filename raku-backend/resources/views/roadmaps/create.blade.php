@extends('master')

@section('contents')

<div class="card shadow-lg border-0 rounded-3">
    <!-- Header -->
    <div class="card-header py-3 rounded-top bg-indigo-300">
        <h3 class="fs-5 fw-semibold mb-0 flex items-center gap-2">
            Create Roadmap
        </h3>
    </div>

    <!-- Form -->
    <form action="{{ route('roadmaps.store') }}" method="POST" enctype="multipart/form-data" class="p-4">
        @csrf

        <div class="row g-4">
            <!-- Image Upload -->
            <div class="col-md-3 text-center">
                <div class="position-relative border rounded bg-light d-flex align-items-center justify-content-center shadow-sm h-[250px]">
                    <img id="imagePreview" src="{{ asset('imagePH.png') }}" alt="Display Image"
                        class="w-100 h-[250px] object-fit-cover rounded" />
                    <button type="button" id="removeImage"
                        class="btn btn-sm btn-light border shadow-sm position-absolute top-0 end-0 rounded-circle">&times;</button>
                </div>
                <input type="file" accept="image/*" id="fileInput" name="image" class="d-none" />
                <label for="fileInput" class="btn btn-outline-primary mt-3 w-100 rounded-pill flex items-center gap-2 justify-center">
                    Choose Image
                </label>
                @error('image')
                <div class="text-danger small">{{ $message }}</div>
                @enderror
            </div>

            <!-- Form Fields -->
            <div class="col-md-9">
                <div class="row g-3">
                    <!-- Roadmap Title -->
                    <div class="col-md-12">
                        <label class="form-label fw-semibold">Roadmap Title</label>
                        <input type="text" name="title" id="titleInput" value="{{ old('title') }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Enter roadmap title" required />
                        @error('title') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Slug -->
                    <div class="col-md-12">
                        <label class="form-label fw-semibold">Slug</label>
                        <input type="text" name="slug" id="slugInput" value="{{ old('slug') }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Slug" readonly required />
                        @error('slug') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Description -->
                    <div class="col-md-12">
                        <label class="form-label fw-semibold">Description</label>
                        <textarea name="description" rows="4" class="form-control shadow-sm rounded-2"
                            placeholder="Roadmap description">{{ old('description') }}</textarea>
                        @error('description') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Stage Pattern (JSON Input) -->
                     
                </div>
            </div>
        </div>

        <div class="pt-4 flex justify-end">
            <button type="submit"
                class="w-full md:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition">
                Save Roadmap
            </button>
        </div>
    </form>
</div>

<!-- Image Preview -->
<script>
    const fileInput = document.getElementById("fileInput");
    const imagePreview = document.getElementById("imagePreview");
    const removeBtn = document.getElementById("removeImage");

    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    removeBtn.addEventListener("click", function() {
        imagePreview.src = "{{ asset('imagePH.png') }}";
        fileInput.value = "";
    });
</script>

<!-- Slug Auto Generation -->
<script>
    const titleInput = document.getElementById("titleInput");
    const slugInput = document.getElementById("slugInput");

    function slugify(text) {
        return text.toString().toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-')   // Replace spaces & non-word chars with -
            .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
    }

    titleInput.addEventListener("input", function() {
        slugInput.value = slugify(this.value);
    });
</script>

@endsection
