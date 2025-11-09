<?php

namespace App\Http\Controllers;

use App\Http\Requests\PartnerRequest;
use App\Models\Partner;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PartnerController extends Controller
{
    public function list()
    {
        $partners = Partner::paginate(10);
        return view('cms.partners.index', compact('partners'));
    }

    public function store(PartnerRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('partners', 'public');
        }

        Partner::create($data);

        return redirect()->route('partner.list')->with('success', 'Partner created.');
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
            if ($partner->logo && Storage::disk('public')->exists($partner->logo)) {
                Storage::disk('public')->delete($partner->logo);
            }
            $data['logo'] = $request->file('logo')->store('partners', 'public');
        }

        $partner->update($data);

        return redirect()->route('partner.list')->with('success', 'Partner updated.');
    }

    public function destroy($id)
    {
        $partner = Partner::findOrFail($id);

        if ($partner->logo && Storage::disk('public')->exists($partner->logo)) {
            Storage::disk('public')->delete($partner->logo);
        }

        $partner->delete();

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
