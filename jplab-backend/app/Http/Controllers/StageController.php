<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use App\Models\Roadmap;
use App\Models\Practice;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\Facades\DataTables;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Brian2694\Toastr\Facades\Toastr;

class StageController extends Controller
{
    public function index(Request $request)
    {
        $query = Stage::query();

        // Search Filter
        if ($request->filled('roadmap_id')) {
            $query->where('roadmap_id', $request->roadmap_id);
        }

        if ($request->filled('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        // Date Filter
        if ($request->filled('date_filter') && $request->filled('from_date') && $request->filled('to_date')) {
            $query->whereBetween($request->date_filter, [$request->from_date, $request->to_date]);
        }

        // Sorting
        $order_by = $request->order_by ?? 'id';
        $direction = $request->direction ?? 'desc';
        $query->orderBy($order_by, $direction);

        $stages = $query->paginate(10)->withQueryString();
        $roadmaps = Roadmap::all();

        foreach ($stages as $stage) {
            $totalQuestions = 0;
            foreach ($stage->practices as $practice) {
                $questions = json_decode($practice->questions, true) ?? [];
                $totalQuestions += count($questions);
            }
            $stage->question_count = $totalQuestions;
        }

        return view('stages.index', compact('stages', 'roadmaps'));
    }

    // Toggle Status
    public function toggleStatus(Stage $stage)
    {
        $stage->status = !$stage->status;
        $stage->save();

        return response()->json([
            'success' => true,
            'status' => $stage->status,
            'message' => $stage->status ? 'Stage enabled!' : 'Stage disabled!'
        ]);
    }


    public function create()
    {
        $roadmaps = Roadmap::all();
        return view('stages.create', compact('roadmaps'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'roadmap_id' => 'required|exists:roadmaps,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'order' => 'nullable|integer',
            'duration' => 'nullable|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Fetch roadmap slug
        $roadmap = Roadmap::findOrFail($request->roadmap_id);

        // Normalize and concatenate
        $stageSlug = Str::slug($validated['slug']);
        $validated['slug'] = "{$roadmap->slug}-{$stageSlug}";

        // Handle image
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('stages', 'public');
        }

        Stage::create($validated);

        return redirect()
            ->route('stages.index')
            ->with('success', 'Stage created successfully!');
    }


    public function edit(Stage $stage)
    {
        $stage->load(['roadmap', 'practices']);
        // Get all roadmaps for the dropdown
        $roadmaps = Roadmap::all();

        return view('stages.edit', compact('stage', 'roadmaps'));
    }

    public function update(Request $request, Stage $stage)
    {
        $validated = $request->validate([
            'roadmap_id' => 'required|exists:roadmaps,id',
            'title' => 'required|string|max:255|unique:stages,title,' . $stage->id,
            'slug' => 'required|string|max:255|unique:stages,slug,' . $stage->id,
            'order' => 'nullable|integer',
            'duration' => 'nullable|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($stage->image && Storage::disk('public')->exists($stage->image)) {
                Storage::disk('public')->delete($stage->image);
            }
            $validated['image'] = $request->file('image')->store('stages', 'public');
        }

        $stage->update($validated);

        return redirect()
            ->route('stages.index')
            ->with('success', 'Stage updated successfully!');
    }

    public function destroy(Stage $stage)
    {
        $stage->delete();
        return redirect()->route('stages.index')->with('success', 'Stage deleted successfully!');
    }
    

    public function show(Stage $stage)
    {
        // Eager load practices and roadmap, but only practices for this stage
        $stage->load(['roadmap', 'practices' => function($query) use ($stage) {
            $query->where('stage_id', $stage->id); // ensure correct stage
        }]);

        // Decode questions JSON
        foreach ($stage->practices as $practice) {
            $practice->questions_array = json_decode($practice->questions, true) ?? [];
        }

        return view('stages.show', compact('stage'));
    }




    public function createPractice($stageId)
    {
        return view('practices.create', compact('stageId'));
    }
}
