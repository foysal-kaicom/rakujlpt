<?php

namespace App\Http\Controllers\Api;

use Throwable;
use Illuminate\Http\Request;
use App\Models\MockTestRecords;
use App\Models\MockTestSection;
use App\Models\MockTestQuestion;
use App\Models\UserSubscription;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\MockTestResultResource;
use Illuminate\Support\Facades\Auth;
use App\Models\UserSubscriptionDetails;
use App\Http\Resources\MockTestSectionResource;
use App\Http\Resources\UserSubscriptionResource;
use App\Models\Exam;

class MockTestController extends Controller
{
    public function getQuestions(Request $request)
    {
        try {
            $examId = $request->exam_id;

            if (!$examId) {
                return $this->responseWithError("exam_id is required.");
            }

            $candidate = auth('candidate')->user();

            // Get active subscriptions for this candidate
            $latestSubscription = UserSubscription::find($candidate->user_subscriptions_id);

            if (!$latestSubscription) {
                return $this->responseWithSuccess(
                    [],
                    'You do not have an active subscription for any exam.',
                    200
                );
            }

            // Get all exams for this subscription
            $subscriptionDetails = UserSubscriptionDetails::where('user_subscription_id', $latestSubscription->id)
                ->where('exam_id', $examId) // you can remove this line if you want all exams
                ->get();

            if ($subscriptionDetails->isEmpty()) {
                return $this->responseWithError("This exam is not included in your active subscription.");
            }

            // Check remaining attempts for the requested exam
            $hasRemaining = $subscriptionDetails->contains(function ($detail) {
                return $detail->used_exam_attempt < $detail->max_exam_attempt;
            });

            if (!$hasRemaining) {
                return $this->responseWithError("You have reached the maximum attempt limit for this exam.");
            }

            $allSections = MockTestSection::with([
                'mockTestQuestion',
                'mockTestQuestionGroup',
                'mockTestModule'
            ])
                ->whereHas('mockTestModule', function ($query) use ($examId) {
                    $query->where('exam_id', $examId);
                })
                ->get();


            $examTitle = $allSections->first()->mockTestModule->exam->title ?? null;
            $examDuration = $allSections->first()->mockTestModule->exam->duration ?? null;
            $examTotalPoint = $allSections->first()->mockTestModule->exam->total_point ?? null;
            $sectionWiseQuestions = [];

            foreach ($allSections as $section) {
                $data = MockTestSectionResource::make($section);

                if ($data) {
                    $sectionWiseQuestions[] = $data;
                }
            }
            // return $this->responseWithSuccess($sectionWiseQuestions, "Questions generated for Exam ID: {$examId}");
            return $this->responseWithSuccess([
                'exam_title' => $examTitle,
                'exam_duration' => $examDuration,
                'exam_total_point' => $examTotalPoint,
                'sections'   => $sectionWiseQuestions
            ], "Questions generated for Exam ID: {$examId}");
        } catch (Throwable $ex) {
            return $this->responseWithError("Something went wrong.", $ex->getMessage());
        }
    }

    public function evaluateAnswers(Request $request)
    {
        try {
            $data = $request->all();

            $request->validate([
                'exam_id' => 'required|integer|exists:exams,id',
            ]);

            $examId = $data['exam_id'];
            $candidateId = Auth::guard('candidate')->id();
            $exam = Exam::findOrFail($examId);

            $modulesScore = [
                'Reading' => ['answered' => 0, 'correct' => 0, 'wrong' => 0],
                'Listening' => ['answered' => 0, 'correct' => 0, 'wrong' => 0],
            ];

            foreach ($data as $key => $questionPayload) {
                if ($key === 'exam_id') continue;
                if (!isset($questionPayload['id']) || !isset($questionPayload['answer'])) continue;

                $question = MockTestQuestion::with(['section.mockTestModule', 'mockTestQuestionOption'])
                    ->find($questionPayload['id']);

                if (!$question) continue;

                $moduleName = $question->section->mockTestModule->name ?? null;
                if (!isset($modulesScore[$moduleName])) continue;

                $modulesScore[$moduleName]['answered']++;

                $correctAnswer = $question->mockTestQuestionOption->correct_answer_index;
                if ($questionPayload['answer'] == $correctAnswer) {
                    $modulesScore[$moduleName]['correct']++;
                } else {
                    $modulesScore[$moduleName]['wrong']++;
                }
            }

            $per_question_mark = $exam['total_point'] / $data['total_questions'];

            // Create mock test record
            $mockTestRecord = MockTestRecords::create([
                'candidate_id'              => $candidateId,
                'exam_id'                   => $examId,
                'question_set'              => 1,
                'reading_answered'          => $modulesScore['Reading']['answered'],
                'correct_reading_answer'    => $modulesScore['Reading']['correct'],
                'wrong_reading_answer'      => $modulesScore['Reading']['wrong'],
                'listening_answered'        => $modulesScore['Listening']['answered'],
                'correct_listening_answer'  => $modulesScore['Listening']['correct'],
                'wrong_listening_answer'    => $modulesScore['Listening']['wrong'],
                'total_questions'           => $data['total_questions'],
                'per_question_mark'         => $per_question_mark,
            ]);

            $mockTestRecord->per_question_mark = $per_question_mark;

            $subscriptionId = UserSubscription::where('candidate_id', $candidateId)
                ->where('status', 'confirmed')
                ->orderBy('id', 'desc')
                ->value('id');

            if ($subscriptionId) {
                $userSubscriptionDetail = UserSubscriptionDetails::where('user_subscription_id', $subscriptionId)
                    ->where('exam_id', $examId)
                    ->first();

                if ($userSubscriptionDetail) {
                    $userSubscriptionDetail->increment('used_exam_attempt');
                }
            }

            return $this->responseWithSuccess(new MockTestResultResource($mockTestRecord),"Mock test result recorded successfully.");
        } catch (Throwable $e) {
            Log::error('Mock test evaluation error', ['error' => $e->getMessage()]);
            return $this->responseWithError("Something went wrong.", $e->getMessage());
        }
    }

    public function getTestResult()
    {
        try {
            $id = Auth::guard('candidate')->id();
            $testResults = MockTestRecords::with('exam:id,name,title,pass_point,total_point')->where('candidate_id', $id)->get();
            if (!$testResults || $testResults->isEmpty()) {
                return $this->responseWithSuccess([], "No mock test records found.");
            }

            return $this->responseWithSuccess($testResults, "Mock test results fetched.");
        } catch (Throwable $ex) {
            return $this->responseWithError("Something went wrong", $ex->getMessage());
        }
    }

    public function activeUserSubscriptionDetails()
    {
        try {
            $candidateId = Auth::guard('candidate')->id();
            $activeSubscriptions = UserSubscription::where('candidate_id', $candidateId)
                ->where('status', 'confirmed')
                ->where('payment_status', 'success')
                ->with('package', 'subscriptionDetails.exam:id,title,name')
                ->orderBy('created_at', 'desc')
                ->get();

            if ($activeSubscriptions->isEmpty()) {
                return $this->responseWithSuccess([], "You do not have an active subscription.");
            }

            return $this->responseWithSuccess(
                UserSubscriptionResource::collection($activeSubscriptions),
                "Active subscription details fetched."
            );
        } catch (Throwable $ex) {
            return $this->responseWithError("Something went wrong", $ex->getMessage());
        }
    }
}
