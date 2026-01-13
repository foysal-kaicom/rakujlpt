<?php

use App\Http\Controllers\Agent\AgentDashboardController;
use App\Http\Controllers\Agent\CandidateNoticeController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:agent'], function () {
    Route::get('/dashboard', [AgentDashboardController::class, 'showDashboard'])->name('dashboard');
    Route::group(['prefix' => 'candidate-notices', 'as' => 'candidate-notices.'], function () {
        Route::get('/', [CandidateNoticeController::class, 'list'])->name('list');
        Route::get('/create', [CandidateNoticeController::class, 'createCandidateNotice'])->name('create');
        Route::post('/store', [CandidateNoticeController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [CandidateNoticeController::class, 'showEditPage'])->name('edit');
        Route::post('/update/{id}', [CandidateNoticeController::class, 'update'])->name('update');
        Route::post('{id}/toggle-status', [CandidateNoticeController::class, 'toggleStatus'])->name('toggleStatus');
        Route::delete('/delete/{id}', [CandidateNoticeController::class, 'destroy'])->name('delete');
    });
});
Route::get('/logout', [AgentDashboardController::class, 'logoutAgent'])->name('logout');