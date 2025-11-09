@extends('master')

@section('contents')
<div class="p-6 bg-white rounded-2xl shadow-md">
    <div class="text-2xl font-bold text-gray-800 border-b pb-3 mb-5 flex items-center gap-2">
        <p class="p-2 rounded-full bg-indigo-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 20V4H4V19C4 19.5523 4.44772 20 5 20H16Z"></path>
            </svg>
        </p>
        Edit Feature
    </div>

    <form action="{{ route('features.update', $feature->id) }}" method="POST" enctype="multipart/form-data" class="space-y-6">
        @csrf
        @method('PUT')

        {{-- Validation Errors --}}
        @if ($errors->any())
            <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                <ul class="list-disc list-inside">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        {{-- Title --}}
        <div>
            <label class="block text-sm font-semibold text-gray-700">Title</label>
            <input type="text" name="title"
                   class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                   value="{{ old('title', $feature->title) }}" required>
            @error('title') <p class="text-xs text-red-500 mt-1">{{ $message }}</p> @enderror
        </div>

        {{-- Description --}}
        <div>
            <label class="block text-sm font-semibold text-gray-700">Description</label>
            <textarea name="description" rows="3"
                      class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">{{ old('description', $feature->description) }}</textarea>
            @error('description') <p class="text-xs text-red-500 mt-1">{{ $message }}</p> @enderror
        </div>

        {{-- Current Icon --}}
        @if ($feature->icon)
            <div>
                <label class="block text-sm font-semibold text-gray-700">Current Icon</label>
                <div class="mt-2">
                    <img src="{{ $feature->icon }}" alt="icon" class="h-12 w-12 object-contain rounded">
                </div>
            </div>
        @endif

        {{-- Replace Icon --}}
        <div>
            <label class="block text-sm font-semibold text-gray-700">Replace Icon (image)</label>
            <input type="file" name="icon"
                   class="w-full mt-1 block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0 file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
            <p class="text-xs text-gray-500 mt-1">Uploading a file will replace the existing icon.</p>
            @error('icon') <p class="text-xs text-red-500 mt-1">{{ $message }}</p> @enderror
        </div>

        {{-- Order + Status --}}
        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700">Order</label>
                <input type="number" name="order" min="0"
                       class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                       value="{{ old('order', $feature->order) }}">
                @error('order') <p class="text-xs text-red-500 mt-1">{{ $message }}</p> @enderror
            </div>
            <div class="flex items-center mt-7">
                <input type="checkbox" name="status" value="1"
                       class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                       {{ old('status', $feature->status) ? 'checked' : '' }}>
                <label class="ml-2 text-sm text-gray-700">Active</label>
            </div>
        </div>

        @hasPermission('features.update')
        <div class="pt-4">
            <button type="submit"
                    class="w-full md:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 21V13H6V21H4V4H17L21 8V21H18Z"></path>
                </svg>
                Update Feature
            </button>
        </div>
        @endHasPermission
    </form>
</div>
@endsection
