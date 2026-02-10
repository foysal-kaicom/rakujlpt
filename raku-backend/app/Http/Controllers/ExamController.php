<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamListFilterRequest;
use App\Http\Requests\ExamRequest;
use App\Models\CustomMockTest;
use App\Models\Exam;
use App\Models\MockTestModule;
use App\Services\FileStorageService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ExamController extends Controller
{
    public $fileStorageService;
    public function __construct(FileStorageService $fileStorageService)
    {
        $this->fileStorageService = $fileStorageService;
    }

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
                $image = $request->file('image');

                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'exam');
                $data['image'] = $imageUploadResponse['public_path'];
            }

            $data['created_by'] = Auth::id();
            $data['slug'] = rand(1, 99999) . '-' . Str::of($data['title'])->slug('-');
            $data['type'] = $request->type;

            $exam = Exam::create($data);

            if ($request->type == 'custom') {
                $now = now();
                $insertData = [];

                foreach ($request->input('module', []) as $moduleKey => $module) {
                    if (!empty($module['section_weights'])) {
                        foreach ($module['section_weights'] as $sectionKey => $questionQty) {
                            if ($questionQty > 0) {
                                $insertData[] = [
                                    'exam_id'              => $exam->id,
                                    'mock_test_module_id'  => $moduleKey,
                                    'mock_test_section_id' => $sectionKey,
                                    'question_quantity'    => $questionQty,
                                    'created_at'           => $now,
                                    'updated_at'           => $now,
                                ];
                            }
                        }
                    }
                }

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
    
        $exams = Exam::where('type', 'general')->latest()->get();
        $isCustom = $exam->type === 'custom';
    
        $selectedExamId = null;
        $selectedModuleIds = [];
        $selectedSectionWeights = [];
    
        if ($isCustom) {
            $rows = CustomMockTest::where('exam_id', $exam->id)->get();
    
            $selectedModuleIds = $rows->pluck('mock_test_module_id')->unique()->values()->toArray();
    
            foreach ($rows as $r) {
                $selectedSectionWeights[$r->mock_test_module_id]['section_weights'][$r->mock_test_section_id]
                    = $r->question_quantity;
            }
    
            if (!empty($selectedModuleIds)) {
                $selectedExamId = MockTestModule::whereIn('id', $selectedModuleIds)->value('exam_id');
            }
        }
    
        return view('exam.edit', compact(
            'exam',
            'isCopy',
            'exams',
            'isCustom',
            'selectedExamId',
            'selectedModuleIds',
            'selectedSectionWeights'
        ));
    }

    public function update(ExamRequest $request, $id)
    {
        try {
            DB::transaction(function () use ($request, $id) {
    
                $exam = Exam::findOrFail($id);
                $data = $request->validated();
    
                if ($request->hasFile('image')) {
                    $newFile = $request->file('image');
    
                    if ($exam->image) {
                        $fileToDelete = $exam->image;
                        $imageUploadResponse = $this->fileStorageService->updateFileFromCloud($fileToDelete, $newFile);
                        $data['image'] = $imageUploadResponse['public_path'];
                    } else {
                        $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($newFile, 'exam');
                        $data['image'] = $imageUploadResponse['public_path'];
                    }
                }
    
                $data['slug'] = rand(1, 99999) . '-' . Str::of($data['title'])->slug('-');
    
                $exam->update($data);
    
                if ($exam->type === 'custom') {
    
                    CustomMockTest::where('exam_id', $exam->id)->delete();
    
                    $now = now();
                    $insertData = [];
    
                    foreach ($request->input('module', []) as $moduleId => $module) {
                        if (!empty($module['section_weights'])) {
                            foreach ($module['section_weights'] as $sectionId => $qty) {
                                $qty = (int) $qty;
                                if ($qty > 0) {
                                    $insertData[] = [
                                        'exam_id'              => $exam->id,
                                        'mock_test_module_id'  => (int) $moduleId,
                                        'mock_test_section_id' => (int) $sectionId,
                                        'question_quantity'    => $qty,
                                        'agent_id'             => $exam->agent_id,
                                        'created_at'           => $now,
                                        'updated_at'           => $now,
                                    ];
                                }
                            }
                        }
                    }
    
                    if (!empty($insertData)) {
                        CustomMockTest::insert($insertData);
                    }
                }
            });
    
            Toastr::success('Exam Updated Successfully.');
            return redirect()->route('mock-tests.exam.list');
    
        } catch (\Exception $e) {
            Toastr::error('Exam not updated');
            Log::info($e->getMessage());
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
