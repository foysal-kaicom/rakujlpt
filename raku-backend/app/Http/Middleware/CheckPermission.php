<?php

namespace App\Http\Middleware;

use Brian2694\Toastr\Facades\Toastr;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ?string $explicitPermission = null): Response
    {
        $permission = $explicitPermission ?? $request->route()?->getName();

        if (!$permission) {
            abort(500, 'Route name missing; cannot infer permission.');
        }

        if (!checkAdminPermission($request->route()?->getName())) {
            Toastr::warning("You don't have permission");
            return redirect()->intended();
        }

        return $next($request);
    }
}
