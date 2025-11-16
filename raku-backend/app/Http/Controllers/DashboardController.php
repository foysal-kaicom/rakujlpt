<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function showDashboard()
    {

        $candidates=Candidate::where('currently_living_country','japan')->count();

        return view('dashboard.dashboard',compact('candidates'));
    }
}
