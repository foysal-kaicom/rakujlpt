<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Models\CandidateNotice;
use Illuminate\Http\Request;
use Brian2694\Toastr\Facades\Toastr;

class CandidateNoticeController extends Controller
{
    public function list(Request $request)
    {
        $status = $request->get('status') ?? '1';


        if ($status === '1') {
            $candidateNotices = CandidateNotice::where('status', 1)->where('agent_id', auth()->guard('agent')->id())->get();
        } else {
            $candidateNotices = CandidateNotice::where('agent_id', auth()->guard('agent')->id())->get();
        }

        return view('agent-panel.candidate-notices.list', compact('candidateNotices'));
    }


    public function createCandidateNotice()
    {
        return view('agent-panel.candidate-notices.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'message' => 'required|string',
            'type'    => 'required|in:exam_schedule,reminder,promotional,general',
            'status'  => 'required|boolean',
            'agent_id' => 'nullable|exists:agents,id',
        ]);

        CandidateNotice::create([
            'title'    => $validated['title'],
            'message'  => $validated['message'],
            'type'     => $validated['type'],
            'status'   => $validated['status'],
            'agent_id' => auth()->guard('agent')->id(), // force assign from auth
        ]);
        Toastr::success('Notification created successfully.');
        return redirect()
            ->route('agent.candidate-notices.list');
    }

    public function update(Request $request, $id)
    {
        $candidateNotice = CandidateNotice::findOrFail($id);

        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'message' => 'required|string',
            'type'    => 'required|in:exam_schedule,reminder,promotional,general',
            'status'  => 'required|boolean',
        ]);

        $candidateNotice->update([
            'title'   => $validated['title'],
            'message' => $validated['message'],
            'type'    => $validated['type'],
            'status'  => $validated['status'],
        ]);
        Toastr::success('Candidate notice updated successfully.');
        return redirect()
            ->route('agent.candidate-notices.list');
    }

    public function showEditPage($id)
    {
        $candidateNotice = CandidateNotice::findOrFail($id);
        return view('agent-panel.candidate-notices.edit', compact('candidateNotice'));
    }

    public function toggleStatus($id)
    {
        try {
            $candidateNotice = CandidateNotice::findOrFail($id);

            if ($candidateNotice->status) {
                $candidateNotice->status = false;
                $candidateNotice->save();
            } else {
                $candidateNotice->status = true;
                $candidateNotice->save();
            }
            Toastr::success('Status changed successfully.');
            return redirect()->route('agent.candidate-notices.list');
        } catch (\Exception $e) {
            Toastr::success('Status not changed');
            return redirect()->route('agent.candidate-notices.list');
        }
    }

    public function destroy($id)
    {
        $candidateNotice = CandidateNotice::findOrFail($id);
        $candidateNotice->delete();
        Toastr::success('Candidate Notice deleted successfully');
        return redirect()->route('agent.candidate-notices.list');
    }
}
