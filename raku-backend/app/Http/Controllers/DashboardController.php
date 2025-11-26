<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Exam;
use App\Models\Package;
use App\Models\Roadmap;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function showDashboard()
    {

        $exam_count = Exam::count();
        $candidate_count = Candidate::count();
        $practice_count = Roadmap::count();
        $package_count = Package::where('status', 1)->count();

        $recent_mock_tests = Exam::orderBy('exam_date', 'desc')->select('title', 'name', 'exam_date')->take(3)->get();

        $recent_subscriptions = UserSubscription::with([
            'package:id,name',
            'candidate:id,first_name'
        ])->orderBy('created_at', 'desc')->take(4)->get();

        $exams = Exam::withCount('mockTestRecords')->get(['id', 'title']);

        $totalRecords = $exams->sum('mock_test_records_count');

        $exam_submission_count = $exams->map(function ($exam) use ($totalRecords) {
            $count = $exam->mock_test_records_count;
            $percentage = $totalRecords ? round(($count / $totalRecords) * 100, 2) : 0;
            return [
            'title' => $exam->title,
            'count' => $count,
            'percentage' => $percentage,
            ];
        })->sortByDesc('count')->values();

        return view('dashboard.dashboard', compact('exam_count', 'candidate_count', 'practice_count', 'package_count', 'recent_mock_tests', 'recent_subscriptions', 'exam_submission_count'));
    }
}
