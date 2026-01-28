<?php

namespace App\Http\Controllers\Api;

use App\Models\Stage;
use App\Models\Wallet;
use App\Models\Roadmap;
use Illuminate\Http\Request;
use App\Models\WalletTransaction;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\CandidateStageProgress;

class CandidateProgressController extends Controller
{
    public function showStage(Request $request, $stageId)
    {
        $candidate = Auth::guard('candidate')->user();

        $stage = Stage::with(['practices', 'roadmap'])
            ->where('id', $stageId)
            ->where('status', 1)
            ->firstOrFail();

        $progress = CandidateStageProgress::where('candidate_id', $candidate->id)
            ->where('stage_id', $stage->id)
            ->first();

        // first visiting stage
        if (!$progress) {
            $firstStage = Stage::where('roadmap_id', $stage->roadmap_id)
                ->where('status', 1)
                ->orderBy('order', 'asc')
                ->first();

            if ($firstStage && $firstStage->id === $stage->id) {
                $progress = CandidateStageProgress::create([
                    'candidate_id' => $candidate->id,
                    'roadmap_id'   => $stage->roadmap_id,
                    'stage_id'     => $stage->id,
                    'candidate_status' => 'current',
                ]);
            }
        }

        $status = $progress->candidate_status ?? 'locked';

        $questions = [];

        if ($status !== 'locked' && $stage->practices->isNotEmpty()) {
            foreach ($stage->practices as $practice) {
                $practiceQuestions = json_decode($practice->questions, true) ?? [];

                // Prepend full URLs to question, audio_file, audio_image
                $practiceQuestions = array_map(function($q) {
                    if (!empty($q['question']) && in_array($q['question_type'], ['image', 'audio'])) {
                        $q['question'] = asset('storage/' . $q['question']);
                    }

                    if (!empty($q['audio_file'])) {
                        $q['audio_file'] = asset('storage/' . $q['audio_file']);
                    }

                    if (!empty($q['audio_image'])) {
                        $q['audio_image'] = asset('storage/' . $q['audio_image']);
                    }

                    return $q;
                }, $practiceQuestions);

                // Merge into main questions array
                $questions = array_merge($questions, $practiceQuestions);
            }
        }
        // dd($questions);
        $data = [
            'stage_id' => $stage->id,
            'title' => $stage->title,
            'slug' => $stage->slug,
            // 'image' => $stage->image,
            'image' => $stage->image ? url('storage/' . $stage->image) : null,
            'order' => $stage->order,
            'duration' => $stage->duration,
            'total_questions' => count($questions),
            'status' => $status,
            'questions' => $questions,
        ];
        return $this->responseWithSuccess($data, "Stage Data shows successfully", 201);

    }


    // public function completeStage(Request $request, $stageId)
    // {
    //     $candidate = Auth::guard('candidate')->user();

    //     $progress = CandidateStageProgress::where('candidate_id', $candidate->id)
    //         ->where('stage_id', $stageId)
    //         ->firstOrFail();
        
    //     $score = $request->input('total_score', null);

    //     // Mark current stage as completed
    //     // $progress->update(['candidate_status' => 'completed']);
    //     $progress->update([
    //         'candidate_status' => 'completed',
    //         'total_score' => $score ?? $progress->total_score, // update if provided
    //     ]);

    //     // Unlock next stage by creating a new record (current)
    //     $nextStage = Stage::where('roadmap_id', $progress->roadmap_id)
    //         ->where('order', '>', $progress->stage->order)
    //         ->where('status', 1)
    //         ->orderBy('order', 'asc')
    //         ->first();

    //     if ($nextStage) {
    //         $existingProgress = CandidateStageProgress::where('candidate_id', $candidate->id)
    //             ->where('roadmap_id', $progress->roadmap_id)
    //             ->where('stage_id', $nextStage->id)
    //             ->first();

    //         if ($existingProgress) {
    //             // If already completed, skip updating
    //             if ($existingProgress->candidate_status === 'completed') {
    //                 // Do nothing — already completed
    //             } else {
    //                 // Update to current if not completed
    //                 $existingProgress->update(['candidate_status' => 'current']);
    //             }
    //         } else {
    //             // Create a new record for the next stage
    //             CandidateStageProgress::create([
    //                 'candidate_id' => $candidate->id,
    //                 'roadmap_id' => $progress->roadmap_id,
    //                 'stage_id' => $nextStage->id,
    //                 'candidate_status' => 'current',
    //             ]);
    //         }
    //     }

    //     return response()->json(['message' => 'Stage completed!']);
    //     // return response()->json(['message' => 'Stage completed successfully!', 'score' => $score]);
    // }


    public function completeStage(Request $request, $stageId)
    {
        $candidate = Auth::guard('candidate')->user();

        $progress = CandidateStageProgress::with('stage')
            ->where('candidate_id', $candidate->id)
            ->where('stage_id', $stageId)
            ->firstOrFail();

        $score = $request->input('total_score');

        // ===============================
        // 1. Mark current stage completed
        // ===============================
        $progress->update([
            'candidate_status' => 'completed',
            'total_score' => $score ?? $progress->total_score,
        ]);

        // ===============================
        // 2. Unlock next stage
        // ===============================
        $nextStage = Stage::where('roadmap_id', $progress->roadmap_id)
            ->where('order', '>', $progress->stage->order)
            ->where('status', 1)
            ->orderBy('order', 'asc')
            ->first();

        if ($nextStage) {

            $nextProgress = CandidateStageProgress::where('candidate_id', $candidate->id)
                ->where('roadmap_id', $progress->roadmap_id)
                ->where('stage_id', $nextStage->id)
                ->first();

            if ($nextProgress) {
                if ($nextProgress->candidate_status !== 'completed') {
                    $nextProgress->update([
                        'candidate_status' => 'current'
                    ]);
                }
            } else {
                CandidateStageProgress::create([
                    'candidate_id' => $candidate->id,
                    'roadmap_id'   => $progress->roadmap_id,
                    'stage_id'     => $nextStage->id,
                    'candidate_status' => 'current',
                ]);
            }
        }

        // ===============================
        // 3. Roadmap completion bonus
        // ===============================
        $roadmap = Roadmap::find($progress->roadmap_id);

        if ($roadmap && (int) $roadmap->completed_bonus > 0) {

            $totalStages = Stage::where('roadmap_id', $roadmap->id)
                ->where('status', 1)
                ->count();

            $completedStages = CandidateStageProgress::where('candidate_id', $candidate->id)
                ->where('roadmap_id', $roadmap->id)
                ->where('candidate_status', 'completed')
                ->count();

            // All stages completed
            if ($totalStages > 0 && $totalStages === $completedStages) {

                $alreadyCredited = WalletTransaction::where('candidate_id', $candidate->id)
                    ->where('reference', 'roadmap_completed_' . $roadmap->id)
                    ->exists();

                if (!$alreadyCredited) {

                    DB::transaction(function () use ($candidate, $roadmap) {
                        walletTransaction(
                            $candidate,
                            null,
                            'roadmap_completed_'.$roadmap->id,
                            $roadmap->completed_bonus,
                            'credit',
                            'Roadmap completion bonus'
                        ); // manual credit (no CoinRule)

                    });
                }
            }
        }

        // ===============================
        // 4. Response
        // ===============================
        return response()->json([
            'message' => 'Stage completed successfully',
            'roadmap_completed' => isset($totalStages) && $totalStages === $completedStages,
            'bonus_points' => $roadmap->completed_bonus ?? 0
        ], 200);
    }


}
