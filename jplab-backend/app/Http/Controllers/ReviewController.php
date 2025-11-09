<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Services\FileStorageService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReviewController extends Controller
{
    public $fileStorageService;
    public function __construct(FileStorageService $fileStorageService)
    {
        $this->fileStorageService = $fileStorageService;
    }

    public function list()
    {
        $reviews = Review::paginate(10);
        return view('cms.reviews.list', compact('reviews'));
    }

    public function create(){
        return view('cms.reviews.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'body' => 'required|string',
            'reviewer_name' => 'required|string|max:255',
            'reviewer_designation' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            
            $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'reviewer');
            $validated['image'] = $imageUploadResponse['public_path'];
        }

        Review::create($validated);

        Toastr::success('Review stored successfully.');
        return redirect()->route('review.list');
    }

    public function edit($id)
    {
        $review = Review::findOrFail($id);
        return view('cms.reviews.edit', compact('review'));
    }
    

    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        $validated = $request->validate([
            'body' => 'required|string',
            'reviewer_name' => 'required|string|max:255',
            'reviewer_designation' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($review->image && Storage::disk('public')->exists($review->image)) {
                Storage::disk('public')->delete($review->image);
            }
            $validated['image'] = $request->file('image')->store('reviews', 'public');
        }

        $review->update($validated);

        Toastr::success('Review updated successfully.');
        return redirect()->route('review.list');
    }

    public function toggleStatus($id)
    {
        try {
            $review = Review::findOrFail($id);
    
            if ($review->status) {
                $review->status = false;
                $review->save();
            } else {
                $review->status = true;
                $review->save();
            }
            Toastr::success('Status changed successfully.');
            return redirect()->route('review.list');
        } catch (\Exception $e) {
            Toastr::success('Status not changed');
            return redirect()->route('review.list');
        }
    }
}
