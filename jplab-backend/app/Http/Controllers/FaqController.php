<?php

namespace App\Http\Controllers;

use App\Http\Requests\FaqRequest;
use App\Models\Faq;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FaqController extends Controller
{
    public function list(Request $request)
    {
        $status = $request->get('status');
        $faqs = Faq::where('status', 1)->get();

        if ($status === '1') {
            $faqs = Faq::where('status', $status)->get();
        } 
        elseif ($status === '0') {
            $faqs = Faq::all();
        }
    
        return view('cms.faq.list', compact('faqs'));
    }
    

    public function showCreateFaq(){
        return view('cms.faq.create');
    }

    public function store(FaqRequest $request){
        $data = $request->validated();
        $data['answer'] = strip_tags($request->input('answer'));

        Faq::create($data);

        Toastr::success('FAQ Registered Successfully.');
        return redirect()->route('faq.list');
    }  

    public function showEditPage($id){
        $faq = Faq::findOrFail($id);
        return view('cms.faq.edit', compact('faq'));
    }

    public function update(FaqRequest $request, $id)
    {
        $faq = Faq::findOrFail($id);
        $data = $request->validated();

        $faq->update($data);

        Toastr::success('FAQ Updated Successfully.');
        return redirect()->route('faq.list');
    }
    
    public function toggleStatus($id)
    {
        try {
            $faq = Faq::findOrFail($id);
    
            if ($faq->status) {
                $faq->status = false;
                $faq->save();
            } else {
                $faq->status = true;
                $faq->save();
            }
            Toastr::success('Status changed successfully.');
            return redirect()->route('faq.list');
        } catch (\Exception $e) {
            Toastr::success('Status not changed');
            return redirect()->route('faq.list');
        }
    }

    public function destroy($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();
        Toastr::success('FAQ deleted successfully');
        return redirect()->route('faq.list');
    }

}
