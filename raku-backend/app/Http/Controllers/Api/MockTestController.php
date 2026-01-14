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
use App\Models\CustomMockTest;
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

            $exam = Exam::find($examId);

            $sectionWiseQuestions = [];

            if ($exam->type == 'custom') {
                $allSections = CustomMockTest::with([
                    'mockTestQuestion',
                    'mockTestQuestionGroup',
                    'mockTestModule'
                ])
                    ->where('exam_id', $examId)
                    ->get();

                foreach ($allSections as $section) {

                    $section->title = $section->section->title;
                    $section->slug = $section->section->slug;
                    $section->question_limit = $section->question_quantity;
                    $section->sample_question = $section->section->sample_question;
                    // dd($section);
                    $data = MockTestSectionResource::make($section);

                    if ($data) {
                        $sectionWiseQuestions[] = $data;
                    }
                }
            } else {
                $allSections = MockTestSection::with([
                    'mockTestQuestion',
                    'mockTestQuestionGroup',
                    'mockTestModule'
                ])
                    ->whereHas('mockTestModule', function ($query) use ($examId) {
                        $query->where('exam_id', $examId);
                    })
                    ->get();

                foreach ($allSections as $section) {
                    $data = MockTestSectionResource::make($section);

                    if ($data) {
                        $sectionWiseQuestions[] = $data;
                    }
                }
            }

            return $this->responseWithSuccess([
                'exam_title' => $exam->title ?? null,
                'exam_duration' => $exam->duration ?? null,
                'exam_total_point' => $exam->total_point ?? null,
                'sections'   => $sectionWiseQuestions
            ], "Questions generated for: {$exam->title}");
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

            $exam = Exam::with('mockTestModules')->findOrFail($examId);

            // INIT MODULE SCORES
            $modulesScore = [];
            foreach ($exam->mockTestModules as $module) {
                $modulesScore[$module->name] = [
                    'answered' => 0,
                    'correct'  => 0,
                    'wrong'    => 0,
                ];
            }

            // GLOBAL TOTALS
            $totalAnswered = 0;
            $totalCorrect  = 0;
            $totalWrong    = 0;

            // EXTRACT QUESTION IDS
            $questionIds = collect($data)
                ->filter(fn($v, $k) => $k !== 'exam_id' && isset($v['id']))
                ->pluck('id')
                ->unique()
                ->values();

            // FETCH QUESTIONS ONCE
            $questions = MockTestQuestion::with([
                'section.mockTestModule',
                'mockTestQuestionOption'
            ])->whereIn('id', $questionIds)->get()->keyBy('id');

            $userAnswers = [];

            foreach ($data as $key => $questionPayload) {
                if ($key === 'exam_id') continue;
                if (!isset($questionPayload['id'], $questionPayload['answer'])) continue;

                $question = $questions->get($questionPayload['id']);
                if (!$question) continue;

                $moduleName = $question->section->mockTestModule->name ?? 'Unknown';

                if (!isset($modulesScore[$moduleName])) {
                    // HARD FAIL > silent corruption
                    throw new \Exception("Invalid module detected: {$moduleName}");
                }

                $modulesScore[$moduleName]['answered']++;
                $totalAnswered++;

                $correctAnswer = $question->mockTestQuestionOption->correct_answer_index;
                $isCorrect = ($questionPayload['answer'] == $correctAnswer);

                if ($isCorrect) {
                    $modulesScore[$moduleName]['correct']++;
                    $totalCorrect++;
                } else {
                    $modulesScore[$moduleName]['wrong']++;
                    $totalWrong++;
                }

                $userAnswers[] = [
                    'question_id' => $question->id,
                    'question'    => $question->title,
                    'selected'    => $questionPayload['answer'],
                    'correct'     => $correctAnswer,
                    'is_correct'  => $isCorrect,
                    'options'     => $question->mockTestQuestionOption->values,
                    'module'      => $moduleName,
                ];
            }

            // dd($userAnswers);

            $per_question_mark = $exam['total_point'] / $data['total_questions'];

            // Create mock test record
            $mockTestRecord = MockTestRecords::create([
                'candidate_id'              => $candidateId,
                'exam_id'                   => $examId,
                'question_set'              => 1,
                // 'reading_answered'          => $modulesScore['Reading']['answered'],
                // 'correct_reading_answer'    => $modulesScore['Reading']['correct'],
                // 'wrong_reading_answer'      => $modulesScore['Reading']['wrong'],
                // 'listening_answered'        => $modulesScore['Listening']['answered'],
                // 'correct_listening_answer'  => $modulesScore['Listening']['correct'],
                // 'wrong_listening_answer'    => $modulesScore['Listening']['wrong'],
                'total_questions'           => $data['total_questions'],
                'per_question_mark'         => $per_question_mark,
                'answers'                   => json_encode($userAnswers),
                'module_wise_score'         => json_encode($modulesScore),
            ]);

            $mockTestRecord->per_question_mark = $per_question_mark;
            $mockTestRecord->answered = $totalAnswered;
            $mockTestRecord->correct = $totalCorrect;
            $mockTestRecord->wrong = $totalWrong;


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

            return $this->responseWithSuccess(new MockTestResultResource($mockTestRecord), "Mock test result recorded successfully.");
        } catch (Throwable $e) {
            Log::error('Mock test evaluation error', ['error' => $e->getMessage()]);
            return $this->responseWithError("Something went wrong.", $e->getMessage());
        }
    }

    public function getTestResult()
    {
        try {
            $candidateId = Auth::guard('candidate')->id();

            $testResults = MockTestRecords::with(
                'exam:id,name,title,pass_point,total_point'
            )
                ->where('candidate_id', $candidateId)
                ->orderByDesc('id')
                ->get();

            if ($testResults->isEmpty()) {
                return $this->responseWithSuccess([], 'No mock test records found.');
            }

            return $this->responseWithSuccess(
                MockTestResultResource::collection($testResults),
                'Mock test results fetched.'
            );
        } catch (\Throwable $ex) {
            return $this->responseWithError(
                'Something went wrong',
                $ex->getMessage()
            );
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
