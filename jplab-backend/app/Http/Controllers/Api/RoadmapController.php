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

        // Fetch roadmap by slug
        // $roadmap = Roadmap::with(['stages' => function($q) {
        //     $q->orderBy('order', 'asc');
        // }, 'stages.practices'])
        // ->where('slug', $slug)
        // ->first();
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
            
            $practice = $stage->practices->first();
            $questions = $practice ? json_decode($practice->questions, true) ?? [] : [];

            $status = 'locked';

            if ($candidate) {
                $progress = CandidateStageProgress::where('candidate_id', $candidate->id)
                    ->where('stage_id', $stage->id)
                    ->first();

                $status = $progress->candidate_status ?? 'locked';
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
