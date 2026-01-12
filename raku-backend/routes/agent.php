<?php

use App\Http\Controllers\Agent\AgentDashboardController;
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

});
Route::get('/logout', [AgentDashboardController::class, 'logoutAgent'])->name('logout');