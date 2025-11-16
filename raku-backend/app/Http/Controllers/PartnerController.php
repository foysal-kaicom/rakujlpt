<?php

namespace App\Http\Controllers;

use App\Http\Requests\PartnerRequest;
use App\Models\Partner;
use App\Services\FileStorageService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PartnerController extends Controller
{
    public $fileStorageService;

    public function __construct(FileStorageService $fileStorageService)
    {
        $this->fileStorageService = $fileStorageService;
    }

    public function list()
    {
        $partners = Partner::paginate(10);
        return view('cms.partners.index', compact('partners'));
    }

    public function store(PartnerRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            $image = $request->file('logo');
            $upload = $this->fileStorageService->uploadImageToCloud($image, 'partner');
            $data['logo'] = $upload['public_path'];
        }

        Partner::create($data);

        Toastr::success('Partner stored successfully.');
        return redirect()->route('partner.list');
    }

    public function edit($id)
    {
        $partner = Partner::findOrFail($id);
        return view('cms.partners.edit', compact('partner'));
    }

    public function update(PartnerRequest $request, $id)
    {
        $partner = Partner::findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            if (!empty($partner->logo)) {
                $this->fileStorageService->deleteFileFromCloud($partner->logo);
            }

            $image = $request->file('logo');
            $upload = $this->fileStorageService->uploadImageToCloud($image, 'partner');
            $data['logo'] = $upload['public_path'];
        }

        $partner->update($data);

        Toastr::success('Partner updated successfully.');
        return redirect()->route('partner.list');
    }

    public function destroy($id)
    {
        $partner = Partner::findOrFail($id);

        if ($partner->logo && Storage::disk('public')->exists($partner->logo)) {
            Storage::disk('public')->delete($partner->logo);
        }

        $partner->delete();

        Toastr::success('Partner deleted successfully.');
        return back()->with('success', 'Partner deleted.');
    }

    public function toggleStatus($id)
    {
        try {
            $partner = Partner::findOrFail($id);
    
            if ($partner->status) {
                $partner->status = false;
                $partner->save();
            } else {
                $partner->status = true;
                $partner->save();
            }
            Toastr::success('Status changed successfully.');
            return redirect()->route('partner.list');
        } catch (\Exception $e) {
            Toastr::success('Status not changed');
            return redirect()->route('partner.list');
        }
    }
}
