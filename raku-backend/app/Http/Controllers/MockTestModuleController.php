<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;
use App\Models\MockTestModule;

class MockTestModuleController extends Controller
{
    public function index(Request $request)
    {
        $orderBy = $request->order_by ?? 'id';
        $direction = $request->direction ?? 'asc';

        $query = MockTestModule::with('exam:id,title')
            ->select('id', 'exam_id', 'name', 'status');

        // Filter by module name
        if ($request->name) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        // Filter by exam
        if ($request->exam_id) {
            $query->where('exam_id', $request->exam_id);
        }

        $query->orderBy($orderBy, $direction);

        $modules = $query->paginate(10)->appends($request->all());

        // Exam list for dropdown
        $exams = Exam::select('id', 'title')->orderBy('title')->get();

        return view('mock-tests.modules.index', compact('modules', 'exams'));
    }

    public function create()
    {
        $exams = Exam::all();
        return view('mock-tests.modules.create', compact('exams'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'exam_id' => 'nullable|exists:exams,id',
            'slug' => 'required|string',
            'name' => 'required|string',
        ]);

        $finalSlug = ($request->exam_id ? $request->exam_id . '_' : '') . $request->slug;

        MockTestModule::create([
            'exam_id' => $request->exam_id,
            'slug' => $finalSlug,
            'name' => $request->name,
            'status' => 'active',
        ]);

        return redirect()->route('mock-test-modules.index')
            ->with('success', 'Module created successfully.');
    }




    public function edit(MockTestModule $mockTestModule)
    {
        $exams = Exam::all();
        return view('mock-tests.modules.edit', compact('mockTestModule', 'exams'));
    }

    public function update(Request $request, MockTestModule $mockTestModule)
    {
        $request->validate([
            'exam_id' => 'nullable|exists:exams,id',
            'slug'    => 'required|string',
            'name'    => 'required|string',
            'status'  => 'required|in:active,disabled',
        ]);

        // Build final slug
        $finalSlug = ($request->exam_id ? $request->exam_id . '_' : '') . $request->slug;

        // Validate final slug
        $request->validate([
            'slug' => [
                function ($attribute, $value, $fail) use ($finalSlug, $mockTestModule) {
                    $exists = MockTestModule::where('slug', $finalSlug)
                        ->where('id', '!=', $mockTestModule->id)
                        ->exists();

                    if ($exists) {
                        $fail('Slug already exists.');
                    }
                }
            ]
        ]);

        // Update module
        $mockTestModule->update([
            'exam_id' => $request->exam_id,
            'slug'    => $finalSlug,
            'name'    => $request->name,
            'status'  => $request->status,
        ]);

        return redirect()->route('mock-test-modules.index')
            ->with('success', 'Module updated successfully.');
    }

    public function destroy(MockTestModule $mockTestModule)
    {
        $mockTestModule->delete();
        return redirect()->route('mock-test-modules.index')->with('success', 'Module deleted successfully.');
    }

    public function toggleStatus($id)
    {
        $module = MockTestModule::findOrFail($id);

        // Toggle status
        $module->status = $module->status === 'active' ? 'disabled' : 'active';
        $module->save();

        return redirect()->back()->with('success', 'Module status updated successfully.');
    }

}
