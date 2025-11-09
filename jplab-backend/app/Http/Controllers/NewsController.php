<?php

namespace App\Http\Controllers;

use App\Models\c;
use App\Models\News;
use App\Services\FileStorageService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{

    protected $fileStorageService;

    public function __construct(FileStorageService $fileStorageService)
    {

        $this->fileStorageService = $fileStorageService;
    }

    public function list(Request $request)
    {
        $orderBy = $request->order_by ?? 'id';
        $direction = $request->direction ?? 'asc';

        $query = News::query();

        if ($request->has('title') && $request->title != '') {
            $query->where('title', 'like', $request->title . '%');
        }

        $query->orderBy($orderBy, $direction);

        if ($request->has('date_filter') && $request->date_filter != '' && $request->has('from_date') && $request->from_date != '' && $request->has('to_date') && $request->to_date) {
            $query->whereBetween($request->date_filter, [$request->from_date, $request->to_date]);
        }

        $newsList = $query->paginate(10)->appends($request->all());

        return view('cms.news.list', compact('newsList'));
    }


    public function create()
    {
        return view('cms.news.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title'                 => 'required|string|max:255',
            'author_name'           => 'required|string|max:255',
            'author_designation'    => 'required|string|max:255',
            'category_name'         => 'required|string|max:255',
            'content'               => 'nullable|string',
            'featured_image'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'meta_title'            => 'nullable|string|max:255',
            'meta_description'      => 'nullable|string|max:500',
            'meta_keywords'         => 'nullable|string|max:255',
            'status'                => 'required|in:draft,published',
            'is_featured'           => 'boolean',
            'published_at'          => 'nullable|date',
        ]);

        if ($request->hasFile('featured_image')) {
            $image = $request->file('featured_image');
            $awsImageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'news');
            $validatedData['featured_image'] = $awsImageUploadResponse['public_path'];
        }

        $validatedData['slug'] = Str::slug($request->title);
        $validatedData['created_by'] = auth()->id();


        if ($request->is_featured == 1) {
            News::where('is_featured', 1)->update(['is_featured' => 0]);
        }

        News::create($validatedData);

        return redirect()->route('news.list')->with('success', 'News created successfully.');
    }


    public function edit(int $id)
    {
        $news = News::findOrFail($id);
        return view('cms.news.edit', compact('news'));
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author_name'           => 'required|string|max:255',
            'author_designation'    => 'required|string|max:255',
            'category_name'         => 'required|string|max:255',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                Toastr::error($error);
            }
            return redirect()->back()->withInput();
        }

        $news->title = $request->title;
        $news->author_name = $request->author_name;
        $news->author_designation = $request->author_designation;
        $news->category_name = $request->category_name;
        $news->content = $request->content;
        $news->meta_title = $request->meta_title;
        $news->meta_description = $request->meta_description;
        $news->meta_keywords = $request->meta_keywords;
        $news->status = $request->status;
        $news->is_featured = $request->has('is_featured');
        $news->published_at = $request->published_at;

        if ($request->hasFile('featured_image')) {
            if ($news->featured_image) {
                $newFile = $request->file('featured_image');
                $fileToDelete = $news->featured_image;
                $imageUploadResponse = $this->fileStorageService->updateFileFromCloud($fileToDelete, $newFile);

                $news->featured_image = $imageUploadResponse['public_path'];
            } else {
                $image = $request->file('featured_image');
                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'news');
                $news->featured_image = $imageUploadResponse['public_path'];
            }
        }

        if ($request->is_featured == 1) {
            News::where('is_featured', 1)->update(['is_featured' => 0]);
        }

        $news->save();

        Toastr::success('News updated successfully!');
        return redirect()->route('news.list');
    }


    public function toggleStatus($id)
    {
        try {
            $news = News::findOrFail($id);

            if ($news->status) {
                $news->status = false;
                $news->save();
            } else {
                $news->status = true;
                $news->save();
            }
            Toastr::success('Status changed successfully.');
            return redirect()->route('news.list');
        } catch (\Exception $e) {
            Toastr::success('Status not changed');
            return redirect()->route('news.list');
        }
    }


    /**
     * Remove the specified testimonial from storage.
     */
    public function delete($id)
    {
        $news = News::findOrFail($id);

        if($news->featured_image){
         $this->fileStorageService->deleteFileFromCloud($news->featured_image);
        }
        
        $news->delete();

        Toastr::success('news deleted successfully!');
        return redirect()->route('news.list');
    }
}
