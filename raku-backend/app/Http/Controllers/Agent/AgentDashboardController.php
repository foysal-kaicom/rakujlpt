<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AgentDashboardController extends Controller
{
    public function showDashboard()
    {
        $exam_count = 0;
        return view('agent.dashboard.dashboard', compact('exam_count'));
    }

    public function logoutAgent(Request $request)
    {
        Auth::guard('agent')->logout();

        // 2. Invalidate the session (security best practice)
        $request->session()->invalidate();

        // 3. Regenerate the CSRF token (prevent reuse)
        $request->session()->regenerateToken();

        return redirect()->route('login')->with('success', 'Agent logged out successfully.');
    }
}
