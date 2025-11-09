<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeatureRequest;
use App\Models\Feature;
use App\Services\FileStorageService;

class FeatureController extends Controller
{
    public $fileStorageService;

    public function __construct(FileStorageService $fileStorageService)
    {
        $this->fileStorageService = $fileStorageService;
    }

    public function list()
    {
        $features = Feature::orderBy('order')->paginate(12);
        return view('cms.features.list', compact('features'));
    }

    public function create()
    {
        return view('cms.features.create');
    }

    public function store(FeatureRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('icon')) {
            $upload = $this->fileStorageService->uploadImageToCloud($request->file('icon'), 'feature');
            $data['icon'] = $upload['public_path'];
        }

        $data['status'] = (bool)($data['status'] ?? true);

        Feature::create($data);

        return redirect()->route('features.list')->with('success', 'Feature created.');
    }

    public function edit($id)
    {
        $feature = Feature::findOrFail($id);
        return view('cms.features.edit', compact('feature'));
    }

    public function update(FeatureRequest $request, $id)
    {
        $feature = Feature::findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('icon')) {
            if ($feature->icon) {
                $this->fileStorageService->deleteFileFromCloud($feature->icon);
            }

            $upload = $this->fileStorageService->uploadImageToCloud($request->file('icon'), 'feature');
            $data['icon'] = $upload['public_path'];
        }

        $data['status'] = (bool)($data['status'] ?? false);

        $feature->update($data);

        return redirect()->route('features.list')->with('success', 'Feature updated.');
    }

    public function destroy($id)
    {
        $feature = Feature::findOrFail($id);

        if ($feature->icon) {
            $this->fileStorageService->deleteFileFromCloud($feature->icon);
        }

        $feature->delete();

        return redirect()->route('features.list')->with('success', 'Feature deleted.');
    }
}
