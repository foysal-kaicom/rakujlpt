<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CandidateStageProgress;
use App\Models\MockTestRecords;
use App\Models\Roadmap;
use App\Models\UserSubscription;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{   
    public function getDashboardData(Request $request)
    {
        $candidate = Auth::guard('candidate')->user();
    
        // ---------------- Daily progress ----------------
        $roadmaps = Roadmap::with('stages')->get();
        $roadmapProgress = [];
     
        foreach ($roadmaps as $roadmap) {
            $candidateProgress = CandidateStageProgress::where('candidate_id', $candidate->id)
                ->where('roadmap_id', $roadmap->id)
                ->get();
    
            if (!$candidateProgress->contains('candidate_status', 'completed')) {
                continue;
            }
    
            $totalStages = $roadmap->stages->count();
            $completedStages = $candidateProgress->where('candidate_status', 'completed')->count();
    
            $completePercentage = $totalStages > 0
                ? round(($completedStages / $totalStages) * 100, 2)
                : 0;
    
            $roadmapProgress[] = [
                'module_name' => $roadmap->title,
                'complete'    => $completePercentage,
            ];
        }
    
        // ---------------- Report ----------------
        $mockTests = MockTestRecords::where('candidate_id', $candidate->id)->get();
    
        $examTaken = $mockTests->count();
        $avgScore  = $this->calculateAvgScore($mockTests);
        $accuracy  = $this->calculateAccuracy($mockTests);
        $weakArea  = $this->calculateWeakAreaForCandidate($candidate->id);
    
        // ---------------- Last 3 mock test reports (with exam name) ----------------
        $lastThreeMockTests = MockTestRecords::with('exam')
            ->where('candidate_id', $candidate->id)
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($record) {
                return [
                    'id'               => $record->id,
                    'exam_id'          => $record->exam_id ?? null,
                    'exam_name'        => $record->exam->title ?? null,
                    'total_correct'    => $record->total_correct,
                    'total_wrong'      => $record->total_wrong,
                    'total_answered'   => $record->total_answered,
                    'score'            => (float)($record->total_correct ?? 0) * (float)($record->per_question_mark ?? 0),
                    'per_question_mark'=> $record->per_question_mark,
                    'created_at'       => $record->created_at,
                ];
            });
    
        // ---------------- Last 3 subscriptions ----------------
        $lastThreeSubscriptions = UserSubscription::with('package')
            ->where('candidate_id', $candidate->id)
            ->orderByDesc('id')
            ->take(3)
            ->get()
            ->map(function ($subscription) {
                return [
                    'package_name'   => $subscription->package->name ?? null,
                    'start_date'     => $subscription->created_at->format('Y-m-d') ?? null,
                    'price'          => (double) ($subscription->total_payable ?? 0),
                    'status'         => $subscription->status,
                    'payment_status' => $subscription->payment_status,
                ];
            })
            ->values();

        // ---------------- Last 3 wallet trans ----------------    
        $lastThreeWalletTransactions = WalletTransaction::where('candidate_id', $candidate->id)
            ->orderByDesc('id')
            ->take(3)
            ->get()
            ->map(function ($wt) {
                return [
                    'type'       => $wt->type,
                    'points'     => (double) $wt->points,
                    'reference'  => $wt->reference,
                    'remarks'    => $wt->remarks,
                    'created_at' => $wt->created_at,
                ];
            })
            ->values();    
    
        return response()->json([
            'practice_progress' => $roadmapProgress,
            'report' => [
                'exam_taken' => $examTaken,
                'avg_score'  => $avgScore,
                'accuracy'   => $accuracy,
                'weak_area'  => $weakArea,
            ],
            'last_three_mock_tests' => $lastThreeMockTests,
            'last_three_subscriptions' => $lastThreeSubscriptions,
            'last_three_wallet_transactions'=> $lastThreeWalletTransactions,
        ]);
    }
    
    /**
     * avg_score = (sum(total_correct * per_question_mark)) / exam_taken
     */
    private function calculateAvgScore($mockTests): float
    {
        $examTaken = $mockTests->count();
        if ($examTaken <= 0) return 0;
    
        $totalScoreSum = $mockTests->sum(function ($r) {
            $correct = (float) ($r->total_correct ?? 0);
            $mark    = (float) ($r->per_question_mark ?? 0);
            return $correct * $mark;
        });
    
        return round($totalScoreSum / $examTaken, 2);
    }
    
    /**
     * accuracy = (sum(total_correct) / sum(total_questions OR total_answered)) * 100
    */

    private function calculateAccuracy($mockTests): string
    {
        $totalCorrect = $mockTests->sum(fn($r) => (int)($r->total_correct ?? 0));
        $totalQuestions = $mockTests->sum(fn($r) => (int)($r->total_questions ?? 0));
    
        if ($totalQuestions <= 0) return '0%';
    
        $pct = round(($totalCorrect / $totalQuestions) * 100, 2);
        return $pct . '%';
    }
    
    
    /**
     * Weak area logic:
     * 1) Find candidate's MockTestRecord with highest total_wrong
     * 2) From that record's module_wise_score JSON, it picks the module with highest wrong ratio (wrong/answered). Returns module name
     */
    private function calculateWeakAreaForCandidate(int $candidateId): string
    {
        $worstRecord = MockTestRecords::where('candidate_id', $candidateId)
            ->orderByDesc('total_wrong')
            ->first();
    
        if (!$worstRecord) return 'N/A';
    
        $modules = $worstRecord->module_wise_score;
        if (is_string($modules)) {
            $modules = json_decode($modules, true);
        }
    
        if (!is_array($modules) || empty($modules)) return 'N/A';
    
        $weakModule = 'N/A';
        $highestWrongRatio = -1;
        $highestWrongCount = -1;
    
        foreach ($modules as $moduleName => $stats) {
            $wrong = (int) ($stats['wrong'] ?? 0);
            $answered = (int) ($stats['answered'] ?? 0);
    
            if ($answered <= 0) continue;
    
            $wrongRatio = $wrong / $answered;
    
            // tie-break: if same ratio, choose higher wrong count
            if ($wrongRatio > $highestWrongRatio || ($wrongRatio == $highestWrongRatio && $wrong > $highestWrongCount)) {
                $highestWrongRatio = $wrongRatio;
                $highestWrongCount = $wrong;
                $weakModule = $moduleName;
            }
        }
    
        return $weakModule;
    }
    
}