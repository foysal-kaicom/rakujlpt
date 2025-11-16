@extends('master')

@section('contents')

<div class="card shadow-lg border-0 rounded-3">
    <!-- Header -->
    <div class="card-header py-3 rounded-top bg-indigo-300">
        <h3 class="fs-5 fw-semibold mb-0 flex items-center gap-2">
            Edit Stage
        </h3>
    </div>

    <!-- Form -->
    <form action="{{ route('stages.update', $stage->id) }}" method="POST" enctype="multipart/form-data" class="p-4">
        @csrf
        @method('PUT')

        <div class="row g-4">
            <!-- Image Upload -->
            <div class="col-md-3 text-center">
                <div class="position-relative border rounded bg-light d-flex align-items-center justify-content-center shadow-sm h-[250px]">
                    <img id="imagePreview" src="{{ $stage->image ? asset('storage/'.$stage->image) : asset('imagePH.png') }}" 
                        alt="Stage Image" class="w-100 h-[250px] object-fit-cover rounded" />
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
                    <!-- Roadmap -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Select Roadmap</label>
                        <select name="roadmap_id" class="form-select shadow-sm rounded-2">
                            <option value="">Choose a roadmap...</option>
                            @foreach($roadmaps as $roadmap)
                                <option value="{{ $roadmap->id }}" {{ old('roadmap_id', $stage->roadmap_id) == $roadmap->id ? 'selected' : '' }}>
                                    {{ $roadmap->title }}
                                </option>
                            @endforeach
                        </select>
                        @error('roadmap_id') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Order -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Order</label>
                        <input type="number" name="order" value="{{ old('order', $stage->order) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="EX: 1" required />
                        @error('order') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Stage Title -->
                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Stage Title</label>
                        <input type="text" id="titleInput" name="title" value="{{ old('title', $stage->title) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Enter stage title" required />
                        @error('title') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Stage Slug -->
                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Slug</label>
                        <input type="text" id="slugInput" name="slug" value="{{ old('slug', $stage->slug) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Unique slug" required readonly />
                        @error('slug') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Duration -->
                    <div class="col-md-4">
                        <label class="block font-semibold">Duration (minutes)</label>
                        <input type="number" name="duration" value="{{ old('duration', $stage->duration) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Enter duration in minutes" />
                        @error('duration') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>
                    
                    <!-- Description -->
                    <div class="col-md-12">
                        <label class="form-label fw-semibold">Description</label>
                        <textarea name="description" rows="4" class="form-control shadow-sm rounded-2"
                            placeholder="Stage description">{{ old('description', $stage->description) }}</textarea>
                        @error('description') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>
                </div>
            </div>
        </div>

        <div class="pt-4 flex justify-end">
            <button type="submit"
                class="w-full md:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition">
                Update Stage
            </button>
        </div>
    </form>
</div>

<!-- JavaScript for Image Preview -->
<script>
    const fileInput = document.getElementById("fileInput");
    const imagePreview = document.getElementById("imagePreview");
    const removeBtn = document.getElementById("removeImage");

    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = function(e){
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    removeBtn.addEventListener("click", function(){
        imagePreview.src = "{{ asset('imagePH.png') }}";
        fileInput.value = "";
    });
</script>
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
