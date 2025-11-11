<?php

namespace App\Http\Controllers\Api;

use App\Models\Stage;
use App\Models\Roadmap;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\CandidateStageProgress;

class CandidateProgressController extends Controller
{
    // public function startRoadmap(Request $request, $roadmapId)
    // {
    //     $candidate = Auth::guard('candidate')->user(); // Candidate logged in
    //     $roadmap = Roadmap::with(['stages' => function($q){
    //         $q->orderBy('order', 'asc');
    //     }, 'stages.practices'])->findOrFail($roadmapId);

    //     // Only mark first stage as current in DB if not exists
    //     $firstStage = $roadmap->stages->first();
    //     if ($firstStage) {
    //         CandidateStageProgress::updateOrCreate(
    //             [
    //                 'candidate_id' => $candidate->id,
    //                 'roadmap_id' => $roadmap->id,
    //                 'stage_id' => $firstStage->id,
    //             ],
    //             ['candidate_status' => 'current']
    //         );
    //     }

    //     // Find current stage progress
    //     $currentStageProgress = CandidateStageProgress::where('candidate_id', $candidate->id)
    //         ->where('roadmap_id', $roadmap->id)
    //         ->where('candidate_status', 'current')
    //         ->first();

    //     $stages = collect();

    //     if ($currentStageProgress) {
    //         $stage = $roadmap->stages->where('id', $currentStageProgress->stage_id)->first();
    //         if ($stage) {
    //             $practice = $stage->practices->first();
    //             $questions = ($currentStageProgress->candidate_status !== 'locked' && $practice)
    //                 ? json_decode($practice->questions, true) ?? []
    //                 : [];

    //             $stages->push([
    //                 'title' => $stage->title,
    //                 'slug'  => $stage->slug,
    //                 'image' => $stage->image,
    //                 'order' => $stage->order,
    //                 'total_questions' => count($questions),
    //                 'status' => $currentStageProgress->candidate_status,
    //                 'questions' => $questions,
    //             ]);
    //         }
    //     }

    //     $data = [
    //         'title' => $roadmap->title,
    //         'slug'  => $roadmap->slug,
    //         'stages'=> $stages,
    //     ];

    //     // return response()->json([$data]);
    //     return $this->responseWithSuccess($data, "Stage Data shows successfully", 201);
    // }

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


    public function completeStage(Request $request, $stageId)
    {
        $candidate = Auth::guard('candidate')->user();

        $progress = CandidateStageProgress::where('candidate_id', $candidate->id)
            ->where('stage_id', $stageId)
            ->firstOrFail();

        // Mark current stage as completed
        $progress->update(['candidate_status' => 'completed']);

        // Unlock next stage by creating a new record (current)
        $nextStage = Stage::where('roadmap_id', $progress->roadmap_id)
            ->where('order', '>', $progress->stage->order)
            ->where('status', 1)
            ->orderBy('order', 'asc')
            ->first();

        if ($nextStage) {
            CandidateStageProgress::updateOrCreate(
                [
                    'candidate_id' => $candidate->id,
                    'roadmap_id' => $progress->roadmap_id,
                    'stage_id' => $nextStage->id,
                ],
                ['candidate_status' => 'current']
            );
        }

        return response()->json(['message' => 'Stage completed!']);
    }































    /**
     * Candidate completes a stage
     */
    // public function completeStage(Request $request, $stageId)
    // {
    //     $candidate = auth()->user();

    //     $progress = CandidateStageProgress::where('candidate_id', $candidate->id)
    //         ->where('stage_id', $stageId)
    //         ->firstOrFail();

    //     $progress->update(['candidate_status' => 'completed']);

    //     // Unlock next stage
    //     $nextStage = Stage::where('roadmap_id', $progress->roadmap_id)
    //         ->where('order', '>', $progress->stage->order)
    //         ->orderBy('order', 'asc')
    //         ->first();

    //     if ($nextStage) {
    //         CandidateStageProgress::updateOrCreate(
    //             [
    //                 'candidate_id' => $candidate->id,
    //                 'roadmap_id' => $progress->roadmap_id,
    //                 'stage_id' => $nextStage->id,
    //             ],
    //             ['candidate_status' => 'current']
    //         );
    //     }

    //     return response()->json(['message' => 'Stage completed!']);
    // }
}
