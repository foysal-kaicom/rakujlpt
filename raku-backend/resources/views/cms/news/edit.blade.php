@extends('master')

@section('contents')
<div class="p-6 bg-white rounded-2xl shadow-md">
    <!-- Header -->
    <div class="text-2xl font-bold text-gray-800 border-b pb-3 mb-5 flex items-center gap-2">
        <p class="p-2 rounded-full bg-indigo-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6" fill="currentColor">
                <path d="M9.24264 18.9967H21V20.9967H3V16.754L12.8995 6.85453L17.1421 11.0972L9.24264 18.9967ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path>
            </svg>
        </p>
        Edit News
    </div>

    <form action="{{ route('news.update', $news->id) }}" method="POST" enctype="multipart/form-data" class="space-y-6">
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
            <input type="text" name="title" value="{{ old('title', $news->title) }}"
                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
        </div>

        {{-- Author Info --}}
        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700">Author Name</label>
                <input type="text" name="author_name" value="{{ old('author_name', $news->author_name) }}"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700">Author Designation</label>
                <input type="text" name="author_designation" value="{{ old('author_designation', $news->author_designation) }}"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
            </div>
        </div>

        {{-- Category --}}
        <div>
            <label class="block text-sm font-semibold text-gray-700">Category Name</label>
            <input type="text" name="category_name" value="{{ old('category_name', $news->category_name) }}"
                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
        </div>

        {{-- Content --}}
        <div>
            <label class="block text-sm font-semibold text-gray-700">Content</label>
            <textarea name="content" rows="6" id="content"
                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">{{ old('content', $news->content) }}</textarea>
        </div>

        {{-- Current Image --}}
        @if($news->featured_image)
        <div id="currentImageWrapper" class="mb-3">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Current Image</label>
            <img src="{{ $news->featured_image }}" alt="Current Image"
                class="rounded-lg border w-40 h-28 object-cover shadow" id="currentImage">
        </div>
        @endif

        {{-- New Preview (hidden initially) --}}
        <div id="newPreviewWrapper" class="hidden mb-3">
            <label class="block text-sm font-semibold text-gray-700 mb-2">New Preview</label>
            <img src="" id="newPreview" class="rounded-lg border w-40 h-28 object-cover shadow" alt="New Preview">
        </div>

        {{-- Featured Image Input + Meta --}}
        <div class="grid md:grid-cols-4 gap-4 items-center">
            <div>
                <label class="block text-sm font-semibold text-gray-700">Featured Image</label>
                <input type="file" name="featured_image" id="featured_image" accept="image/*"
                    class="w-full mt-1 block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0 file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-white border rounded-lg">
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700">Status</label>
                <select name="status"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="draft" {{ old('status', $news->status) == 'draft' ? 'selected' : '' }}>Draft</option>
                    <option value="published" {{ old('status', $news->status) == 'published' ? 'selected' : '' }}>Published</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700">Published At</label>
                <input type="datetime-local" name="published_at"
                    value="{{ old('published_at', $news->published_at ? $news->published_at->format('Y-m-d\TH:i') : '') }}"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="flex items-center mt-6">
                <input type="checkbox" name="is_featured" value="1"
                    class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {{ old('is_featured', $news->is_featured) ? 'checked' : '' }}>
                <label class="ml-2 text-sm text-gray-700">Is Featured?</label>
            </div>
        </div>

        {{-- SEO Meta --}}
        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700">Meta Title</label>
                <input type="text" name="meta_title" value="{{ old('meta_title', $news->meta_title) }}"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700">Meta Keywords</label>
                <input type="text" name="meta_keywords" placeholder="keyword1, keyword2"
                    value="{{ old('meta_keywords', $news->meta_keywords) }}"
                    class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
        </div>

        <div>
            <label class="block text-sm font-semibold text-gray-700">Meta Description</label>
            <textarea name="meta_description" rows="2"
                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">{{ old('meta_description', $news->meta_description) }}</textarea>
        </div>

        {{-- Submit --}}
        @hasPermission('news.update')
        <div class="pt-2">
            <button type="submit"
                class="w-full md:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4" fill="currentColor">
                    <path d="M18 21V13H6V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H18ZM16 21H8V15H16V21Z"></path>
                </svg>
                Update News
            </button>
        </div>
        @endHasPermission
    </form>
</div>

{{-- Live image preview script --}}
<script>
(function () {
    const input = document.getElementById('featured_image');
    const currentWrapper = document.getElementById('currentImageWrapper');
    const newWrapper = document.getElementById('newPreviewWrapper');
    const newPreview = document.getElementById('newPreview');

    if (!input) return;

    input.addEventListener('change', function () {
        const file = this.files && this.files[0] ? this.files[0] : null;

        if (!file) {
            // revert if cleared
            newWrapper && newWrapper.classList.add('hidden');
            currentWrapper && currentWrapper.classList.remove('hidden');
            newPreview && (newPreview.src = '');
            return;
        }

        const maxBytes = 2 * 1024 * 1024; // 2MB
        if (file.size > maxBytes) {
            alert('Selected image is larger than 2MB.');
            this.value = '';
            return;
        }

        const url = URL.createObjectURL(file);
        if (newPreview) {
            newPreview.src = url;
            newWrapper && newWrapper.classList.remove('hidden');
        }
        currentWrapper && currentWrapper.classList.add('hidden');

        newPreview && newPreview.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
    });
})();
</script>
@endsection
