<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExamResource;
use App\Models\Exam;
use App\Models\MockTestModule;
use App\Models\MockTestSection;
use App\Models\Module;
use Illuminate\Http\Request;
class ExamController extends Controller
{
    public function list()
    {
        $exams=Exam::where('status',1)->whereNotIn('type', ['agent'])->get();

        return $this->responseWithSuccess(ExamResource::collection($exams),'Exam List.');
    }

    public function view($slug)
    {
        $exam=Exam::where('slug', $slug)->first();
        if (!$exam) {
            return $this->responseWithError('Exam not found.');
        }

        $response = $exam->makeHidden('name')->toArray();
        $response['short_name'] = $exam->name;

        return $this->responseWithSuccess($response,'Single Exam View.');
    }

    public function examModulesWithSections($examId)
    {
        $examDetails = Exam::query()
            ->select('id','title','name','type','pass_point','total_point','duration','description')
            ->withSum('sections as total_exam_question_quantity', 'question_limit')
            ->with([
                'mockTestModules' => function ($query) {
                    $query->select('id','exam_id','name')
                      ->withSum('sections as total_module_question_quantity', 'question_limit')
                      ->with([
                          'sections:id,mock_test_module_id,title,status,question_limit'
                      ]);
                },
                'reviews:id,exam_id,reviewer_name,reviewer_designation,rating,body'
            ])
            ->findOrFail($examId);
    
        return $this->responseWithSuccess($examDetails, 'Exam details fetched.');
    }
    

    public function getModulesByExam($examId)
    {
        // Example: Fetch modules
        $modules = MockTestModule::where('exam_id', $examId)
                         ->select('id', 'name') // Select only necessary fields
                         ->get();

        return response()->json($modules);
    }


    public function getSectionsByModules(Request $request)
    {
        // Get the array of module IDs from the AJAX request
        $moduleIds = $request->input('module_ids');

        if (empty($moduleIds)) {
            return response()->json([]);
        }

        // Example: Fetch sections
        $sections = MockTestSection::whereIn('mock_test_module_id', $moduleIds)
                           ->select('id', 'title','mock_test_module_id') // Select only necessary fields
                           ->distinct() // Ensure no duplicates if a section is accidentally linked multiple times
                           ->get();

        return response()->json($sections);
    }
}
