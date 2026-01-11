<?php

use App\Http\Controllers\Agent\AgentDashboardController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:agent'], function () {
    Route::get('/dashboard', [AgentDashboardController::class, 'showDashboard'])->name('dashboard');
});