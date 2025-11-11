<?php

namespace App\Http\Controllers\Api;

use App\Models\Stage;
use App\Models\Roadmap;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\CandidateStageProgress;

class RoadmapController extends Controller
{
    public function getRoadmaps(Request $request)
    {
        $roadmaps = Roadmap::withCount([
                'stages as total_stages' => function ($query) {
                    $query->where('status', 1);
                }
            ])
            ->get(['id', 'title', 'slug', 'description', 'image'])
            ->makeHidden(['created_at', 'updated_at']);

        return $this->responseWithSuccess($roadmaps, 'Roadmaps fetched successfully', 200);
    }




    public function getStages($slug)
    {
        $candidate = Auth::guard('candidate')->user();

        $roadmap = Roadmap::with([
            'stages' => function($q) {
                $q->where('status', 1)
                ->orderBy('order', 'asc');
            },
            'stages.practices'
        ])
        ->where('slug', $slug)
        ->first();


        if (!$roadmap) {
            return $this->responseWithSuccess([], 'Roadmap not found', 404);
        }

        // Get stages only, flatten not needed since it's a single roadmap
        $data = $roadmap->stages->map(function($stage, $index) use ($candidate) {
            
            $questions = [];

            foreach ($stage->practices as $practice) {
                if (!$practice || !$practice->questions) {
                    continue;
                }

                $raw = $practice->questions;
                $decoded = json_decode($raw, true);

                // Handle double encoding
                if (is_string($decoded)) {
                    $decoded = json_decode($decoded, true);
                }

                if (is_array($decoded)) {
                    $questions = array_merge($questions, $decoded);
                }
            }

            $status = 'locked';

            if ($candidate) {
                $progress = CandidateStageProgress::where('candidate_id', $candidate->id)
                    ->where('stage_id', $stage->id)
                    ->first();

                $status = $progress->candidate_status ?? 'locked';
            }

            if ($index === 0) {
                if ($status !== 'completed') {
                    $status = 'current';
                }
            }

            $stageData = [
                'id' => $stage->id,
                'title' => $stage->title,
                'slug' => $stage->slug,
                // 'image' => $stage->image,
                'image' => $stage->image ? url('storage/' . $stage->image) : null, // full path
                'order' => $stage->order,
                'duration' => $stage->duration,
                'total_questions' => count($questions),
                'stage_status' => $status,
            ];

            // if ($candidate && $status !== 'locked') {
            //     $stageData['questions'] = $questions;
            // }

            return $stageData;
        });

        return $this->responseWithSuccess($data, 'Stages fetched successfully', 200);
    }



    // public function getStages($slug)
    // {
    //     $candidate = Auth::guard('candidate')->user();

    //     $roadmap = Roadmap::with([
    //         'stages' => function($q) {
    //             $q->where('status', 1)
    //                 ->orderBy('order', 'asc');
    //         },
    //         'stages.practices'
    //     ])
    //     ->where('slug', $slug)
    //     ->first();

    //     if (!$roadmap) {
    //         return $this->responseWithSuccess([], 'Roadmap not found', 404);
    //     }

    //     // Map stages with calculated data
    //     $data = $roadmap->stages->map(function ($stage, $index) use ($candidate) {

    //         // 🧩 Collect all questions from all practices
    //         $questions = [];

    //         foreach ($stage->practices as $practice) {
    //             if (!$practice || !$practice->questions) {
    //                 continue;
    //             }

    //             $raw = $practice->questions;
    //             $decoded = json_decode($raw, true);

    //             // Handle double encoding
    //             if (is_string($decoded)) {
    //                 $decoded = json_decode($decoded, true);
    //             }

    //             if (is_array($decoded)) {
    //                 $questions = array_merge($questions, $decoded);
    //             }
    //         }

    //         // 🧠 Determine stage status
    //         $status = 'locked';

    //         if ($candidate) {
    //             $progress = CandidateStageProgress::where('candidate_id', $candidate->id)
    //                 ->where('stage_id', $stage->id)
    //                 ->first();

    //             $status = $progress->candidate_status ?? 'locked';
    //         }

    //         if ($index === 0 && $status !== 'completed') {
    //             $status = 'current';
    //         }

    //         // 🧾 Prepare response data
    //         $stageData = [
    //             'id' => $stage->id,
    //             'title' => $stage->title,
    //             'slug' => $stage->slug,
    //             'image' => $stage->image ? url('storage/' . $stage->image) : null,
    //             'order' => $stage->order,
    //             'duration' => $stage->duration,
    //             'total_questions' => count($questions),
    //             'stage_status' => $status,
    //         ];

    //         // Uncomment below if you want to include questions when unlocked
    //         // if ($candidate && $status !== 'locked') {
    //         //     $stageData['questions'] = $questions;
    //         // }

    //         return $stageData;
    //     });

    //     return $this->responseWithSuccess($data, 'Stages fetched successfully', 200);
    // }


    // Do not delete this function, commented code might be useful later
    // public function index()
    // {
    //     $candidate = Auth::guard('candidate')->user();

    //     $roadmaps = Roadmap::with(['stages' => function($q) {
    //         $q->orderBy('order', 'asc');
    //     }, 'stages.practices'])->get();

    //     $data = $roadmaps->map(function($roadmap) use ($candidate) {

    //         $stages = $roadmap->stages->map(function($stage) use ($candidate, $roadmap) {

    //             $practice = $stage->practices->first();
    //             $questions = $practice ? json_decode($practice->questions, true) ?? [] : [];

    //             // Default locked
    //             $status = 'locked';

    //             if ($candidate) {
    //                 $progress = CandidateStageProgress::where('candidate_id', $candidate->id)
    //                     ->where('stage_id', $stage->id)
    //                     ->first();

    //                 $status = $progress->candidate_status ?? 'locked';
    //             }

    //             // Base data for all
    //             $stageData = [
    //                 'title' => $stage->title,
    //                 'slug' => $stage->slug,
    //                 'image' => $stage->image,
    //                 'order' => $stage->order,
    //                 'total_questions' => count($questions),
    //                 'stage_status' => $status,
    //             ];

    //             // Only include questions if visible
    //             if ($candidate && $status !== 'locked') {
    //                 $stageData['questions'] = $questions;
    //             }

    //             return $stageData;
    //         });

    //         return $stages;

    //     });

    //     return $this->responseWithSuccess($data, 'Stages fetched successfully', 200);
    // }



}
