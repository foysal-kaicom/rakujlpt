@extends('master')

@section('contents')

<div class="flex gap-3 text-xs sm:text-sm font-semibold text-gray-500 items-center w-full mb-[20px]">
    <div class="flex gap-3 items-center">
        <a href="">
            <p class="cursor-pointer line-clamp-1">Team Members</p>
        </a>

        <p class="text-xl font-thin">/</p>

        <a href="">
            <p class="cursor-pointer line-clamp-1 text-blue-500">Create New</p>
        </a>
    </div>
</div>

<h3 class="text-xl font-semibold p-[12px] mb-[50px] rounded text-black bg-indigo-300">Create Team Member</h3>

<form action="{{ route('our-team.store') }}" method="POST" enctype="multipart/form-data" class="px-10">
    @csrf

    <div class="flex gap-8">

        <!-- Image Upload Section -->
        <div class="flex flex-col items-center text-center w-[260px] p-6 shadow-md border border-gray-100 rounded bg-white shrink-0">
            <div class="relative border rounded bg-gray-100 flex items-center justify-center size-[200px] overflow-hidden">
                <img id="imagePreview" src="{{ asset('imagePH.png') }}" 
                     class="size-[200px] object-cover rounded border" />

                <button type="button" id="removeImage"
                        class="absolute top-2 right-2 bg-red-600 hover:bg-red-800 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    ×
                </button>
            </div>

            <input type="file" accept="image/*" id="fileInput" name="photo" class="hidden" />
            <label for="fileInput" 
                   class="mt-3 w-full text-white py-2 px-3 rounded cursor-pointer bg-indigo-500 hover:bg-indigo-700 transition text-center">
                Choose Image
            </label>

            @error('photo')
            <div class="text-red-500 text-sm mt-1">{{ $message }}</div>
            @enderror
        </div>

        <!-- Details Section -->
        <div class="flex-1 p-10 shadow-md border border-gray-100 rounded bg-white">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <!-- Full Name (Long Field) -->
                <div class="col-span-2">
                    <label class="block text-sm font-medium mb-1">Full Name</label>
                    <input type="text" name="name" value="{{ old('name') }}"
                           class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                           placeholder="Enter full name..." required />
                    @error('name')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Email (Long Field) -->
                <div class="col-span-2">
                    <label class="block text-sm font-medium mb-1">Email</label>
                    <input type="email" name="email" value="{{ old('email') }}"
                           class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                           placeholder="example@team.com" />
                    @error('email')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Designation (Long Field) -->
                <div class="col-span-2">
                    <label class="block text-sm font-medium mb-1">Designation</label>
                    <input type="text" name="designation" value="{{ old('designation') }}"
                           class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                           placeholder="Ex: Developer, Marketing Lead..." />
                    @error('designation')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Description -->
                <div class="col-span-2">
                    <label class="block text-sm font-medium mb-1">Short Bio</label>
                    <textarea name="description" rows="3"
                              placeholder="Write a short description..."
                              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">{{ old('description') }}</textarea>
                    @error('description')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Social Links -->
                <div>
                    <label class="block text-sm font-medium mb-1">LinkedIn URL</label>
                    <input type="url" name="linkedin_url" value="{{ old('linkedin_url') }}"
                           class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                           placeholder="https://linkedin.com/..." />
                    @error('linkedin_url')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Facebook URL</label>
                    <input type="url" name="facebook_url" value="{{ old('facebook_url') }}"
                           class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                           placeholder="https://facebook.com/..." />
                    @error('facebook_url')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Github URL</label>
                    <input type="url" name="github_url" value="{{ old('github_url') }}"
                           class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                           placeholder="https://github.com/..." />
                    @error('github_url')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

            </div>

            <!-- Submit -->
            @hasPermission('team.store')
            <div class="flex justify-end mt-6">
                <button type="submit"
                        class="w-[250px] bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded transition">
                    Save Member
                </button>
            </div>
            @endHasPermission
        </div>

    </div>
</form>

<!-- Image Preview Script -->
<script>
    document.getElementById("fileInput").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => document.getElementById("imagePreview").src = e.target.result;
            reader.readAsDataURL(file);
        }
    });

    document.getElementById("removeImage").addEventListener("click", function() {
        document.getElementById("imagePreview").src = "{{ asset('imagePH.png') }}";
        document.getElementById("fileInput").value = "";
    });
</script>

@endsection
