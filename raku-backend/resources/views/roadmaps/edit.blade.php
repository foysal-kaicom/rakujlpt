@extends('master')

@section('contents')

<div class="card shadow-lg border-0 rounded-3">
    <!-- Header -->
    <div class="card-header py-3 rounded-top bg-indigo-300">
        <h3 class="fs-5 fw-semibold mb-0 flex items-center gap-2">
            Edit Roadmap
        </h3>
    </div>

    @if (session('success'))
        <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">    
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    @if (session('error'))
        <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">    
            {{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif
    @if ($errors->any())
        <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">    
            @foreach ($errors->all() as $error)
                {{ $error }}
            @endforeach
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif
    <!-- Form -->
    <form action="{{ route('roadmaps.update', $roadmap->id) }}" method="POST" enctype="multipart/form-data" class="p-4">
        @csrf
        @method('PUT')

        <div class="row g-4">
            <!-- Image Upload -->
            <div class="col-md-3 text-center">
                <div class="position-relative border rounded bg-light d-flex align-items-center justify-content-center shadow-sm h-[250px]">
                    <img id="imagePreview"
                        src="{{ $roadmap->image ? asset('storage/' . $roadmap->image) : asset('imagePH.png') }}"
                        alt="Display Image" class="w-100 h-[250px] object-fit-cover rounded" />
                    <button type="button" id="removeImage"
                        class="btn btn-sm btn-light border shadow-sm position-absolute top-0 end-0 rounded-circle">&times;</button>
                </div>

                <input type="file" accept="image/*" id="fileInput" name="image" class="d-none" />
                <label for="fileInput"
                    class="btn btn-outline-primary mt-3 w-100 rounded-pill flex items-center gap-2 justify-center">
                    Change Image
                </label>
                @error('image')
                <div class="text-danger small">{{ $message }}</div>
                @enderror
            </div>

            <!-- Form Fields -->
            <div class="col-md-9">
                <div class="row g-3">
                    <!-- Roadmap Title -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Roadmap Title</label>
                        <input type="text" name="title" id="titleInput" value="{{ old('title', $roadmap->title) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Enter roadmap title"
                            required />
                        @error('title') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- Slug -->
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Slug</label>
                        <input type="text" name="slug" id="slugInput" value="{{ old('slug', $roadmap->slug) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" placeholder="Slug" readonly required />
                        @error('slug') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- is_free need check box (yes or no) no need select tag -->
                    <div class="col-md-4">
                        <label class="form-label fw-semibold"></label>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="is_free" id="requiresCoinsCheckbox" value="1" {{ old('is_free', $roadmap->is_free) ? 'checked' : '' }}>
                            
                            <label class="form-check-label" for="requiresCoinsCheckbox">
                                Free Roadmap    
                            </label>
                        </div>
                        @error('is_free') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <!-- unlock_coins -->
                    <div class="col-md-4" id="unlockCoinsWrapper">
                        <label class="form-label fw-semibold">Unlock Coins</label>
                        <input type="number" name="unlock_coins" id="unlockCoinsInput"
                            value="{{ old('unlock_coins', $roadmap->unlock_coins) }}" class="form-control form-control-lg shadow-sm rounded-2"
                            />
                        @error('unlock_coins') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>
                    <!-- completed_bonus_coins -->
                    <div class="col-md-4" id="completedCoinsWrapper">
                        <label class="form-label fw-semibold">Bonus Coins Earned</label>
                        <input type="number" name="completed_bonus" id="completedCoinsInput"
                            value="{{ old('completed_bonus', $roadmap->completed_bonus) }}" class="form-control form-control-lg shadow-sm rounded-2"
                            />
                        @error('completed_bonus') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>  

            
                    <!-- Description -->
                    <div class="col-md-12">
                        <label class="form-label fw-semibold">Description</label>
                        <textarea name="description" rows="4" class="form-control shadow-sm rounded-2"
                            placeholder="Roadmap description">{{ old('description', $roadmap->description) }}</textarea>
                        @error('description') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                </div>
            </div>
        </div>
        @hasPermission('roadmaps.update')
        <div class="pt-4 flex justify-end">
            <button type="submit"
                class="w-full md:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition">
                Update Roadmap
            </button>
        </div>
        @endHasPermission
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
<script>
    const isFreeCheckbox = document.getElementById('requiresCoinsCheckbox');
    const unlockCoinsWrapper = document.getElementById('unlockCoinsWrapper');
    const unlockCoinsInput = document.getElementById('unlockCoinsInput');

    function toggleUnlockCoins() {
        if (isFreeCheckbox.checked) {
            unlockCoinsWrapper.style.display = 'none';
            unlockCoinsInput.value = 0;
            unlockCoinsInput.removeAttribute('required');
        } else {
            unlockCoinsWrapper.style.display = 'block';
            unlockCoinsInput.value = unlockCoinsInput.value > 0 ? unlockCoinsInput.value : 1;
            unlockCoinsInput.setAttribute('required', 'required');
        }
    }

    // Run on page load
    toggleUnlockCoins();

    // Run on change
    isFreeCheckbox.addEventListener('change', toggleUnlockCoins);
</script>



@endsection
