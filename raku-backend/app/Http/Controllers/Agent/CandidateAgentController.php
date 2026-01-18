<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Models\CandidateNotice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CandidateAgentController extends Controller
{
    public function getCandidateAgentData()
    {
        try {
            $agentId = optional(auth()->guard('candidate')->user())->agent_id;
            $data['agent'] = auth()->guard('candidate')->user()->agent->only(['id', 'name', 'business_name', 'email', 'phone', 'location', 'address', 'photo']);
            $data['notice'] = CandidateNotice::where('status', 1)
                ->where('agent_id', $agentId)
                ->orderBy('created_at', 'desc')
                ->get(['id', 'title', 'message', 'type', 'agent_id', 'created_at']);
                
            return $this->responseWithSuccess($data, 'Candidate Agent data loaded.', 200);
        } catch (\Exception $e) {
            Log::error('Error in getCandidateAgentData: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => request()->all(),
            ]);
            return $this->responseWithError(null, 'Error loading Candidate Agent data: ', 500);
        }
    }
}
