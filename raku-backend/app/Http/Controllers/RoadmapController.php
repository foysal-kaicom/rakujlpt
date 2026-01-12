<?php

namespace App\Http\Controllers;

use App\Models\Roadmap;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class RoadmapController extends Controller
{
    public function index(Request $request)
    {
        $query = Roadmap::query();

        // --- Filters ---
        if ($request->filled('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->filled('date_filter') && in_array($request->date_filter, ['created_at', 'updated_at'])) {
            if ($request->filled('from_date')) {
                $query->whereDate($request->date_filter, '>=', $request->from_date);
            }
            if ($request->filled('to_date')) {
                $query->whereDate($request->date_filter, '<=', $request->to_date);
            }
        }

        // --- Sorting ---
        $orderBy = $request->get('order_by', 'id');
        $direction = $request->get('direction', 'desc');
        $query->orderBy($orderBy, $direction);

        // --- Pagination ---
        $roadmaps = $query->paginate(10)->appends($request->query());

        return view('roadmaps.index', compact('roadmaps'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('roadmaps.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:roadmaps,title',
            'slug' => 'required|string|max:255|unique:roadmaps,slug',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_free' => 'nullable|boolean',
            'unlock_coins' => 'nullable|numeric|min:0',
        ]);

        // Handle Image Upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('roadmaps', 'public');
        }

        Roadmap::create($validated);

        return redirect()
            ->route('roadmaps.index')
            ->with('success', 'Roadmap created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Roadmap $roadmap)
    {
        // $candidate = auth()->user()->candidate;
        $candidate = auth()->guard('candidate')->user();

        // if (!canAccessRoadmap($candidate, $roadmap)) {
        //     return redirect()
        //         ->route('roadmaps.index')
        //         ->with('error', 'Please unlock this roadmap to access it.');
        // }

        $roadmap = Roadmap::with('practices')->findOrFail($roadmap->id);

        // $roadmap = Roadmap::with('practices')->findOrFail($roadmap);

        // Decode stage pattern and group practices
        $pattern = $roadmap->stage_pattern ? json_decode($roadmap->stage_pattern, true) : [];
        $practices = $roadmap->practices;
        $groupedStages = [];

        $index = 0;
        foreach ($pattern as $stage) {
            $count = $stage['count'] ?? 0;
            $groupedStages[] = [
                'stage' => $stage['stage'],
                'practices' => $practices->slice($index, $count)->values(),
            ];
            $index += $count;
        }

        return view('roadmaps.show', compact('roadmap', 'groupedStages'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Roadmap $roadmap)
    {
        return view('roadmaps.edit', compact('roadmap'));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Roadmap $roadmap)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:roadmaps,title,' . $roadmap->id,
            'slug' => 'required|string|max:255|unique:roadmaps,slug,' . $roadmap->id,
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_free' => 'nullable|boolean',
            'unlock_coins' => 'nullable|numeric|min:0',
        ]);

        // Handle Image Update
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($roadmap->image && Storage::disk('public')->exists($roadmap->image)) {
                Storage::disk('public')->delete($roadmap->image);
            }
            $validated['image'] = $request->file('image')->store('roadmaps', 'public');
        }

        $roadmap->update($validated);

        return redirect()
            ->route('roadmaps.index')
            ->with('success', 'Roadmap updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($roadmap)
    {
        $roadmap = Roadmap::findOrFail($roadmap);
        $roadmap->delete();

        return redirect()->route('roadmaps.index')->with('success', 'Roadmap deleted successfully.');
    }
    
}
