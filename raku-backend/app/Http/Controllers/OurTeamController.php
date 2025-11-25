<?php

namespace App\Http\Controllers;

use App\Http\Requests\OurTeamRequest;
use App\Models\OurTeam;
use App\Services\FileStorageService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;

class OurTeamController extends Controller
{
    protected $fileStorageService;

    public function __construct(FileStorageService $fileStorageService)
    {

        $this->fileStorageService = $fileStorageService;
    }

    public function list()
    {
        $teamList = OurTeam::latest()->paginate(10);
        return view('cms.team.list', compact('teamList'));
    }

    public function create()
    {
        return view('cms.team.create');
    }

    public function store(OurTeamRequest $request)
    {
        $validatedData = $request->validated();
    
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $awsImageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'our-team');
            $validatedData['photo'] = $awsImageUploadResponse['public_path'];
        }
    
        OurTeam::create($validatedData);
    
        Toastr::success("Team member created successfully!");
        return redirect()->route('our-team.list');
    }
    
    public function edit($id)
    {
        $member = OurTeam::findOrFail($id);

        return view('cms.team.edit', compact('member'));
    }

    public function update(OurTeamRequest $request, $id)
    {
        $member = OurTeam::findOrFail($id);
        $validatedData = $request->validated();
    
        if ($request->hasFile('photo')) {
    
            if ($member->photo) {
                $newFile = $request->file('photo');
                $fileToDelete = $member->photo;
                $imageUploadResponse = $this->fileStorageService->updateFileFromCloud($fileToDelete, $newFile);
                $validatedData['photo'] = $imageUploadResponse['public_path'];
    
            } else {
                $image = $request->file('photo');
                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'our-team');
                $validatedData['photo'] = $imageUploadResponse['public_path'];
            }
        }

        $member->update($validatedData);
    
        Toastr::success("Team member updated successfully!");
        return redirect()->route('our-team.list');
    }

    public function toggleStatus($id)
    {
        try {
            $teamMember = OurTeam::findOrFail($id);
    
            if ($teamMember->status) {
                $teamMember->status = false;
                $teamMember->save();
            } else {
                $teamMember->status = true;
                $teamMember->save();
            }
            Toastr::success('Status changed successfully.');
            return redirect()->route('our-team.list');
        } catch (\Exception $e) {
            Toastr::success('Status not changed');
            return redirect()->route('our-team.list');
        }
    }
}
