<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExamRequest;
use App\Models\CustomMockTest;
use App\Models\Exam;
use App\Models\MockTestModule;
use App\Models\MockTestSection;
use App\Services\FileStorageService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ExamController extends Controller
{
    public $fileStorageService;
    public function __construct(FileStorageService $fileStorageService)
    {
        $this->fileStorageService = $fileStorageService;
    }

    public function list(Request $request)
    {
        $query = Exam::query()
            ->where('type', 'agent')
            ->where('agent_id', auth('agent')->id());
    
        if ($request->filled('status')) {
            $query->where('status', (int) $request->status);
        }
    
        $exams = $query->latest()->paginate(10)->withQueryString();
    
        return view('agent-panel.exam.list', compact('exams'));
    }
    

    public function showAgentCreateExam()
    {
        $exams = Exam::where('status', 1)->where('type', 'general')->get();
        return view('agent-panel.exam.create', compact('exams'));
    }

    public function store(ExamRequest $request)
    {
        try {
            $data = $request->validated();
    
            if ($request->hasFile('image')) {
                $newFile = $request->file('image');
                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($newFile, 'exams');
                $data['image'] = $imageUploadResponse['public_path'];
            }
    
            $data['slug'] = rand(1, 99999) . '-' . Str::of($data['title'])->slug('-');
            $data['type'] = 'agent';
            $data['agent_id'] = auth('agent')->id();
            $data['created_by'] = null;
    
            $exam = Exam::create($data);
    
            $now = now();
            $insertData = [];
    
            foreach ($request->input('module', []) as $moduleKey => $module) {
                if (!empty($module['section_weights'])) {
                    foreach ($module['section_weights'] as $sectionKey => $questionQty) {
                        $questionQty = (int) $questionQty;
                        if ($questionQty > 0) {
                            $insertData[] = [
                                'agent_id' => auth('agent')->id(),
                                'exam_id' => $exam->id,
                                'mock_test_module_id' => $moduleKey,
                                'mock_test_section_id' => $sectionKey,
                                'question_quantity' => $questionQty,
                                'created_at' => $now,
                                'updated_at' => $now,
                            ];
                        }
                    }
                }
            }
    
            if (!empty($insertData)) {
                CustomMockTest::insert($insertData);
            }
    
            Toastr::success('Exam Registered Successfully.');
            return redirect()->route('agent.exam.list');
        } catch (\Exception $e) {
            Toastr::error('Exam not created');
            dd($e->getMessage());
            return redirect()->back();
        }
    }

    public function edit($id)
    {
        $exam = Exam::query()
            ->where('type', 'agent')
            ->where('agent_id', auth('agent')->id())
            ->findOrFail($id);
    
        $exams = Exam::query()
            ->where('type', 'general')
            ->select('id', 'title')
            ->latest()
            ->get();
    
        $customRows = $exam->customMockTests()
            ->with([
                'mockTestModule:id,exam_id,name',
                'section:id,title,mock_test_module_id'
            ])
            ->get(['id', 'exam_id', 'mock_test_module_id', 'mock_test_section_id', 'question_quantity']);

        $selectedModuleIds = $customRows->pluck('mock_test_module_id')
            ->unique()
            ->map(fn ($v) => (int)$v)
            ->values()
            ->toArray();
    
        $selectedWeights = $customRows
            ->mapWithKeys(fn($r) => [(int)$r->mock_test_section_id => (int)$r->question_quantity])
            ->toArray();

        $selectedBaseExamId = optional($customRows->first()?->mockTestModule)->exam_id;

        $modules = collect();
        $sections = collect();
    
        if ($selectedBaseExamId) {
            $modules = MockTestModule::query()
                ->where('exam_id', $selectedBaseExamId)
                ->select('id', 'exam_id', 'name')
                ->get();
    
            $sections = MockTestSection::query()
                ->whereIn('mock_test_module_id', $modules->pluck('id')->toArray())
                ->select('id', 'title', 'mock_test_module_id')
                ->orderBy('mock_test_module_id')
                ->get();
        }
    
        return view('agent-panel.exam.edit', compact(
            'exam',
            'exams',
            'selectedBaseExamId',
            'selectedModuleIds',
            'selectedWeights',
            'modules',
            'sections'
        ));
    }

    public function update(ExamRequest $request, $id)
    {
        try {
            DB::transaction(function () use ($request, $id) {
    
                $exam = Exam::query()
                    ->where('type', 'agent')
                    ->where('agent_id', auth('agent')->id())
                    ->findOrFail($id);
    
                $data = $request->validated();
    
                if ($request->hasFile('image')) {
                    $newFile = $request->file('image');
    
                    if ($exam->image) {
                        $fileToDelete = $exam->image;
                        $imageUploadResponse = $this->fileStorageService->updateFileFromCloud($fileToDelete, $newFile);
                        $data['image'] = $imageUploadResponse['public_path'];
                    } else {
                        $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($newFile, 'exams');
                        $data['image'] = $imageUploadResponse['public_path'];
                    }
                }
    
                $exam->update($data);

                CustomMockTest::where('exam_id', $exam->id)->delete();
    
                $now = now();
                $insertData = [];
    
                foreach ($request->input('module', []) as $moduleId => $module) {
                    if (!empty($module['section_weights'])) {
                        foreach ($module['section_weights'] as $sectionId => $qty) {
                            $qty = (int) $qty;
    
                            if ($qty > 0) {
                                $insertData[] = [
                                    'agent_id'            => auth('agent')->id(),
                                    'exam_id'             => $exam->id, // this agent exam id
                                    'mock_test_module_id' => (int) $moduleId,
                                    'mock_test_section_id'=> (int) $sectionId,
                                    'question_quantity'   => $qty,
                                    'created_at'          => $now,
                                    'updated_at'          => $now,
                                ];
                            }
                        }
                    }
                }
    
                if (!empty($insertData)) {
                    CustomMockTest::insert($insertData);
                }
            });
    
            Toastr::success('Exam Updated Successfully.');
            return redirect()->route('agent.exam.list');
    
        } catch (\Exception $e) {
            Toastr::error('Exam not updated');
            dd($e->getMessage());
            return redirect()->back();
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
            return redirect()->route('agent.exam.list');
        } catch (\Exception $e) {
            Toastr::success('Status not changed');
            return redirect()->route('agent.exam.list');
        }
    }
}
