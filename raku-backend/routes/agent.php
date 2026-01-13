<?php

use App\Http\Controllers\Agent\AgentDashboardController;
use App\Http\Controllers\Agent\CandidateController;
use App\Http\Controllers\Agent\ExamController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:agent'], function () {
    Route::get('/dashboard', [AgentDashboardController::class, 'showDashboard'])->name('dashboard');

    Route::group(['prefix' => 'exam', 'as' => 'exam.'], function () {    
        Route::get('/', [ExamController::class, 'list'])->name('list');
        Route::get('/create', [ExamController::class, 'showAgentCreateExam'])->name('create');
        Route::post('/store', [ExamController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [ExamController::class, 'edit'])->name('edit');
        Route::post('/update/{id}', [ExamController::class, 'update'])->name('update');
        Route::post('{id}/toggle-status', [ExamController::class, 'toggleStatus'])->name('toggleStatus');
    });

    Route::group(['prefix' => 'candidate', 'as' => 'candidate.'], function () {    
        Route::get('/import', [CandidateController::class, 'showImportCandidatesPage'])->name('import-page');
        Route::post('/import', [CandidateController::class, 'importCandidatesCSV'])->name('import');
        Route::get('/sample-csv', [CandidateController::class, 'downloadSampleCandidateCSV'])->name('sample.csv');

        Route::get('/', [CandidateController::class, 'list'])->name('list');
        Route::get('/create', [CandidateController::class, 'showRegistration'])->name('create');
        Route::post('/store', [CandidateController::class, 'register'])->name('store');
        Route::get('/edit/{id}', [CandidateController::class, 'edit'])->name('edit');
        Route::put('/update/{id}', [CandidateController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [CandidateController::class, 'destroy'])->name('delete');
        Route::post('{id}/toggle-status', [CandidateController::class, 'toggleStatus'])->name('toggleStatus');
        Route::get('/{candidate_id}/applications', [CandidateController::class, 'candidateApplications'])->name('applications');
    });

});
Route::get('/logout', [AgentDashboardController::class, 'logoutAgent'])->name('logout');