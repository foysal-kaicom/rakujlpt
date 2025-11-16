@extends('master')

@section('contents')
<div class="">
    <div class="d-flex justify-content-between align-items-center mb-4 border-b pb-3">
        <h1 class="h3">News List</h1>
        @hasPermission('news.create')
        <a href="{{ route('news.create') }}" class="bg-indigo-500 text-white px-8 py-2 rounded-lg hover:bg-indigo-600 duration-300">
            <i class="fas fa-plus"></i> Create News
        </a>
        @endHasPermission
    </div>

    @if (session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="shadow-sm">
        <div class="p-0 min-w-[300px] overflow-x-auto">
            <table class="min-w-full border border-gray-300 text-sm stripe">
                <thead class="bg-indigo-300 border">
                    <tr>
                        <th class="px-4 py-3">#</th>
                        <th class="px-4 py-3">Image</th> {{-- new column --}}
                        <th class="px-4 py-3">Title</th>
                        <th class="px-4 py-3">Slug</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Is Featured</th>
                        <th class="px-4 py-3">Published At</th>
                        <th class="px-4 py-3">Author</th>
                        <th class="">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($newsList as $index => $news)
                    <tr class="border">
                        <td class="px-4 py-3">{{ $index + 1 }}</td>

                        {{-- small image preview --}}
                        <td class="px-4 py-3">
                            @if($news->featured_image)
                                <img src="{{ $news->featured_image }}"
                                     alt="thumbnail"
                                     class="rounded-md border"
                                     style="width: 40px; height: 40px; object-fit: cover;">
                            @else
                                <span class="text-gray-400 text-xs">N/A</span>
                            @endif
                        </td>

                        <td class="px-4 py-3">{{ $news->title }}</td>
                        <td class="px-4 py-3">{{ $news->slug }}</td>
                        <td class="px-4 py-3">
                            <span class="px-3 py-[3px] rounded-3xl text-white text-xs font-semibold {{ $news->status == 'published' ? 'bg-green-500' : 'bg-gray-400' }}">
                                {{ ucfirst($news->status) }}
                            </span>
                        </td>
                        <td class="px-4 py-3">{{ $news->is_featured ? 'Yes' : 'No' }}</td>
                        <td class="px-4 py-3">{{ $news->created_at ? $news->created_at->format('Y-m-d') : '-' }}</td>
                        <td class="px-4 py-3">{{ $news->user->name ?? 'N/A' }}</td>
                        <td class="px-4 py-3 flex">
                            @hasPermission('news.edit')
                            <a href="{{ route('news.edit', $news->id) }}"
                               class="px-3 py-2 rounded-lg text-xs font-medium bg-sky-500 text-white hover:bg-sky-600 shadow-md transition">
                                Edit
                            </a>
                            @endHasPermission

                            @hasPermission('news.delete')
                            <a href="{{ route('news.delete', $news->id) }}"
                               class="px-3 py-2 rounded-lg text-xs font-medium bg-red-400 text-white hover:bg-red-500 shadow-md transition ml-2"
                               onclick="return confirm('Are you sure you want to delete this News?')">
                                Delete
                            </a>
                            @endHasPermission
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="9" class="text-center p-3">No news found.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <div class="mt-3">
        {{ $newsList->links() }}
    </div>
</div>
@endsection
