<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Roadmap;
use Illuminate\Http\Request;
use App\Models\RoadmapUnlock;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class RoadmapUnlockController extends Controller
{
    public function unlock(Request $request)
    {
        $request->validate([
            'roadmap_id' => 'required|exists:roadmaps,id',
        ]);

        $candidate = Auth::guard('candidate')->user();

        $roadmap = Roadmap::findOrFail($request->roadmap_id);

        // Free roadmap
        if ($roadmap->is_free) {
            RoadmapUnlock::firstOrCreate([
                'candidate_id' => $candidate->id,
                'roadmap_id'   => $roadmap->id,
            ]);

            return $this->responseWithSuccess(null, 'Roadmap unlocked successfully', 200); 
        }

        // Already unlocked
        // if (canAccessRoadmap($candidate, $roadmap)) {
        //     return response()->json([
        //         'message' => 'Already unlocked'
        //     ]);
        // }
        if (RoadmapUnlock::where('candidate_id', $candidate->id)
            ->where('roadmap_id', $roadmap->id)
            ->exists()) {
            return $this->responseWithSuccess(null, 'Already unlocked', 200);
        }

        try {
            walletDebit(
                $candidate,
                'unlock_roadmap',
                'roadmap_' . $roadmap->id,
                (float) $roadmap->unlock_coins
            );

            RoadmapUnlock::create([
                'candidate_id' => $candidate->id,
                'roadmap_id'   => $roadmap->id,
            ]);

            return $this->responseWithSuccess(null, 'Roadmap unlocked successfully', 200);

        } catch (Exception $e) {
            return $this->responseWithError('Failed to unlock roadmap: ' . $e->getMessage(), 422);
            // return response()->json(['message' => $e->getMessage()], 422);
        }

    }

}
