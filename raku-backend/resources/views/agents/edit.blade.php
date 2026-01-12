@extends('master')

@section('contents')

<div class="flex gap-3 text-xs sm:text-sm font-semibold text-gray-500 items-center w-full mb-[20px]">
    <div class="flex gap-3 items-center">
        <a href="{{ route('agents.list') }}">
            <p class="cursor-pointer line-clamp-1">
                Agents
            </p>
        </a>

        <p class="text-xl font-thin">/</p>
        <a href="{{ route('agents.edit', $agent->id) }}">
            <p class="cursor-pointer line-clamp-1 text-blue-500">
                Edit Agent
            </p>
        </a>
    </div>
</div>

<h3 class="text-xl font-semibold p-[12px] mb-[50px] rounded text-black bg-indigo-300">Update Agent</h3>

<form action="{{ route('agents.update', $agent->id) }}" method="POST" enctype="multipart/form-data" class="px-10">
    @csrf
    @method('PUT')

    <div class="flex flex-col lg:flex-row gap-10">

        <!-- Image Upload Section -->
        <div class="flex flex-col items-center text-center lg:w-1/3 p-10 shadow-md border border-gray-100 rounded bg-white">
            <div class="relative border rounded bg-gray-100 flex items-center justify-center size-[300px] overflow-hidden">
                <img id="imagePreview" src="{{ $agent->photo ?? asset('imagePH.png') }}" alt="Display Image" class="size-[300px] object-cover rounded border" />
                <button type="button" id="removeImage" class="absolute top-2 right-2 bg-red-600 hover:bg-red-800 text-white rounded-full w-7 h-7 flex items-center justify-center">
                    ×
                </button>
            </div>
            <input type="file" accept="image/*" id="fileInput" name="photo" class="hidden" />
            <label for="fileInput" class="mt-3 w-[300px] text-white py-2 px-3 rounded cursor-pointer bg-indigo-500 hover:bg-indigo-700 transition">
                Choose Image
            </label>
            @error('photo')
            <div class="text-red-500 text-sm mt-1">{{ $message }}</div>
            @enderror
        </div>

        <!-- Agent Details -->
        <div class="lg:w-2/3 p-10 shadow-md border border-gray-100 rounded bg-white">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                <!-- Name -->
                <div>
                    <label class="block text-sm font-medium mb-1">Agent Name</label>
                    <input type="text" name="name" value="{{ old('name', $agent->name) }}"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Agent Name" />
                    @error('name')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Business Name -->
                <div>
                    <label class="block text-sm font-medium mb-1">Business Name</label>
                    <input type="text" name="business_name" value="{{ old('business_name', $agent->business_name) }}"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Business Name" />
                    @error('business_name')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium mb-1">Email</label>
                    <input type="email" disabled name="email" value="{{ old('email', $agent->email) }}"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="example@xyz.com" />
                    @error('email')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Phone Number -->
                <div>
                    <label class="block text-sm font-medium mb-1">Phone Number</label>
                    <input type="text" name="phone" value="{{ old('phone', $agent->phone) }}"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="+8801XXXXXXXXX" />
                    @error('phone')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Commission Percentage -->
                <div>
                    <label class="block text-sm font-medium mb-1">Commission Percentage</label>
                    <input type="number" name="commission_amount" value="{{ old('commission_amount', $agent->commission_amount) }}"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter commission percentage" step="1"/>
                    @error('commission_amount')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-sm font-medium mb-1">New Password <span class="text-xs text-gray-500">(optional)</span></label>
                    <input type="password" name="password"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Leave blank to keep current password" />
                    @error('password')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Confirm Password -->
                <div>
                    <label class="block text-sm font-medium mb-1">Confirm Password</label>
                    <input type="password" name="password_confirmation"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Confirm new password" />
                    @error('password_confirmation')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Location -->
                <div class="col-span-3">
                    <label class="block text-sm font-medium mb-1">Location</label>
                    <textarea name="location" rows="4"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Location">{{ old('location', $agent->location) }}</textarea>
                    @error('location')
                    <div class="text-red-500 text-sm">{{ $message }}</div>
                    @enderror
                </div>

            </div>

            <!-- Submit -->
            @hasPermission('account.store')
            <div class="flex justify-end mt-6">
                <button type="submit" class="w-[250px] bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded transition">
                    Update
                </button>
            </div>
            @endHasPermission

        </div>
    </div>

</form>

<script>
    // Preview uploaded image
    document.getElementById("fileInput").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("imagePreview").src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Remove image (reset to default)
    document.getElementById("removeImage").addEventListener("click", function() {
        document.getElementById("imagePreview").src = "{{ asset('imagePH.png') }}";
        document.getElementById("fileInput").value = "";
        console.log("Image removed, reset to default.");
    });
</script>

@endsection
