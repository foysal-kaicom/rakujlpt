<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamListFilterRequest;
use App\Http\Requests\ExamRequest;
use App\Models\CustomMockTest;
use App\Models\Exam;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ExamController extends Controller
{
    public function list(ExamListFilterRequest $request)
    {
        $orderBy = $request->order_by ?? 'id';
        $direction = $request->direction ?? 'asc';

        $query = Exam::with([
            'creator:id,name',
            'agent:id,name'
        ])
            ->select('id', 'title', 'name', 'slug', 'duration', 'type', 'total_point', 'answer_value', 'created_by', 'agent_id', 'status');

        if ($request->has('title') && $request->title != '') {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        $query->orderBy($orderBy, $direction);

        $exams = $query->paginate(10)->appends($request->all());

        return view('exam.list', compact('exams'));
    }


    public function showCreateExam()
    {
        $exams = Exam::where('status', 1)->where('type','general')->get();
        return view('exam.create', compact('exams'));
    }

    public function store(ExamRequest $request)
    {

        try {
            $data = $request->validated();


            if ($request->hasFile('image')) {
                $imageName = time() . '_' . $request->file('image')->getClientOriginalName();
                $request->file('image')->move(public_path('exam_images'), $imageName);
                $data['image'] = 'exam_images/' . $imageName;
            }

            $data['created_by'] = Auth::id();
            $data['slug'] = rand(1, 99999) . '-' . Str::of($data['title'])->slug('-');
            $data['type'] = $request->type;

            $exam = Exam::create($data);

            if ($request->type == 'custom') {

                // 1. Prepare a timestamp so all records have the same time
                $now = now();
                $insertData = [];

                // 2. Build the array in memory (PHP loops are extremely fast compared to DB queries)
                foreach ($request->input('module', []) as $moduleKey => $module) {
                    if (!empty($module['section_weights'])) {
                        foreach ($module['section_weights'] as $sectionKey => $questionQty) {
                            // Optional: Filter out empty values
                            if ($questionQty > 0) {
                                $insertData[] = [
                                    'exam_id'              => $exam->id,
                                    'mock_test_module_id'  => $moduleKey,
                                    'mock_test_section_id' => $sectionKey,
                                    'question_quantity'    => $questionQty,
                                    'created_at'           => $now, // 'insert' doesn't auto-fill timestamps
                                    'updated_at'           => $now,
                                ];
                            }
                        }
                    }
                }


                // 3. Perform a single Bulk Insert Query
                if (!empty($insertData)) {
                    CustomMockTest::insert($insertData);
                }
            }

            Toastr::success('Exam Registered Successfully.');
            return redirect()->route('mock-tests.exam.list');
        } catch (\Exception $e) {
            Toastr::error('Exam not created');
            dd($e->getMessage());
            return redirect()->route('mock-tests.exam.list');
        }
    }

    public function edit(Request $request, string $id)
    {
        $exam = Exam::findOrFail($id);
        $isCopy = $request->query('isCopy', false);
        return view('exam.edit', compact('exam', 'isCopy'));
    }

    public function update(ExamRequest $request, $id)
    {
        try {
            $exam = Exam::findOrFail($id);
            $data = $request->validated();

            if ($request->hasFile('image')) {
                if ($exam->photo && file_exists(public_path($exam->photo))) {
                    unlink(public_path($exam->photo));
                }
                $imageName = time() . '_' . $request->file('image')->getClientOriginalName();
                $request->file('image')->move(public_path('exam_images'), $imageName);
                $data['image'] = 'exam_images/' . $imageName;
            }

            $data['slug'] = rand(1, 99999) . '-' . Str::of($data['title'])->slug('-');

            $exam->update($data);

            Toastr::success('Exam Updated Successfully.');
            return redirect()->route('mock-tests.exam.list');
        } catch (\Exception $e) {
            Toastr::error('Exam not updated');
            return redirect()->route('mock-tests.exam.list');
        }
    }

    public function toggleStatus($id)
    {
        try {
            $exam = Exam::findOrFail($id);

            if ($exam->status) {
                $exam->status = false;
                $exam->save();
            } else {
                $exam->status = true;
                $exam->save();
            }
            Toastr::success('Status changed successfully.');
            return redirect()->route('mock-tests.exam.list');
        } catch (\Exception $e) {
            Toastr::success('Status not changed');
            return redirect()->route('mock-tests.exam.list');
        }
    }
}
