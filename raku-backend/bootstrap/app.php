<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('web') // Apply 'web' middleware group (sessions, csrf, etc.)
                ->prefix('agent')    // URL prefix (e.g., yoursite.com/agent/dashboard)
                ->name('agent.')     // Route name prefix (e.g., route('agent.dashboard'))
                ->group(base_path('routes/agent.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'checkPermission' => \App\Http\Middleware\CheckPermission::class,
            'checkSubscription' => \App\Http\Middleware\CheckSubscription::class,
        ]);
        $middleware->validateCsrfTokens(except: [
            '/success',
            '/cancel',
            '/fail',
            '/ipn',
            '/pay-via-ajax',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
