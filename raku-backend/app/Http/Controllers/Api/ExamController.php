<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExamResource;
use App\Models\Exam;

class ExamController extends Controller
{
    public function list()
    {
        $exams=Exam::where('status',1)->get();

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

}
