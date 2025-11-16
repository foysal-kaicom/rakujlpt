@extends('master')

@section('contents')

<div class="p-6 bg-white rounded-2xl shadow-md">
    <div class="text-2xl font-bold text-gray-800 border-b pb-3 mb-5 flex items-center gap-2">
        <p class="p-2 rounded-full bg-indigo-500 text-white"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6" fill="currentColor">
                <path d="M16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V10H22V19C22 20.6569 20.6569 22 19 22ZM18 12V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V12H18ZM6 6H12V12H6V6ZM8 8V10H10V8H8ZM6 13H14V15H6V13ZM6 16H14V18H6V16Z"></path>
            </svg></p>
        Create News
    </div>

    <form action="{{ route('news.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
        @csrf

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
            <input type="text" name="title" placeholder="Enter Title"
                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value="{{ old('title') }}" required>
            @error('title') <p class="text-xs text-red-500 mt-1">{{ $message }}</p> @enderror
        </div>

        {{-- Author Info --}}
        <div class="grid md:grid-cols-3 gap-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700">Author Name</label>
                <input type="text" name="author_name" placeholder="Enter Author Name"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value="{{ old('author_name') }}" required>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700">Author Designation</label>
                <input type="text" name="author_designation" placeholder="Enter Designation"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value="{{ old('author_designation') }}" required>
            </div>
            {{-- Category --}}
            <div>
                <label class="block text-sm font-semibold text-gray-700">Category Name</label>
                <input type="text" name="category_name" placeholder="Enter Category"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value="{{ old('category_name') }}" required>
            </div>
        </div>



        {{-- Content --}}

        <div class="mb-3">
            <label class="text-sm font-semibold text-gray-700">Content</label>
            <textarea name="content" id="content" class="form-control" rows="5">{{ old('content') }}</textarea>
            @error('content') <small class="text-danger">{{ $message }}</small> @enderror
        </div>

       {{-- Featured Image + Status + Featured --}}
        <div class="grid md:grid-cols-4 gap-4 items-center">
            <div>
                <label class="block text-sm font-semibold text-gray-700">Featured Image</label>
                <input type="file" name="featured_image"
                    class="w-full mt-1 block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0 file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700">Status</label>
                <select name="status"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="draft" {{ old('status') == 'draft' ? 'selected' : '' }}>Draft</option>
                    <option value="published" {{ old('status') == 'published' ? 'selected' : '' }}>Published</option>
                </select>
            </div>
            {{-- Published At --}}
            <div>
                <label class="block text-sm font-semibold text-gray-700">Published At</label>
                <input type="datetime-local" name="published_at"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value="{{ old('published_at') }}">
            </div>
            <div class="flex items-center mt-6">
                <input type="checkbox" name="is_featured" value="1"
                    class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {{ old('is_featured') ? 'checked' : '' }}>
                <label class="ml-2 text-sm text-gray-700">Is Featured?</label>
            </div>
        </div>


        {{-- SEO Meta --}}
        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700">Meta Title</label>
                <input type="text" name="meta_title" placeholder="Enter Meta Title"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value="{{ old('meta_title') }}">
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700">Meta Keywords</label>
                <input type="text" name="meta_keywords" placeholder="keyword1, keyword2"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value="{{ old('meta_keywords') }}">
            </div>
        </div>
        <div>
            <label class="block text-sm font-semibold text-gray-700">Meta Description</label>
            <textarea name="meta_description" rows="2" placeholder="Enter Meta Description"
                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">{{ old('meta_description') }}</textarea>
        </div>

        

        {{-- Submit --}}
        @hasPermission('news.store')
        <div class="pt-4">
            <button type="submit"
                class="w-full md:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4" fill="currentColor">
                    <path d="M18 21V13H6V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H18ZM16 21H8V15H16V21Z"></path>
                </svg> Save News
            </button>
        </div>
        @endHasPermission
    </form>
</div>

@endsection