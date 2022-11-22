<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
class CheckRoles
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // if(Auth::user()->active == '1'){
        //     return response()->json(['error' => 'You have not Admin access'], 401);
        // }

        $route = Route::getRoutes()->match($request);
        $currentroute = $route->getName();
        $id = $request->route('id');

        if(Auth::user()->hasRole('QLHT')){
            if($currentroute == 'student.destroy' || $currentroute == 'user.destroy'){
                return response()->json(['error' => 'You have not Admin access. Not delete'], 401);
            }

            if($currentroute == 'user.update'){
                $user = User::find($id);
                if($user->hasRole('Admin') || $request->role == 'Admin'){
                    return response()->json(['error' => 'You have not Admin access. Not update'], 401);
                }
            }
            if($currentroute == 'user.store' && $request->role == 'Admin'){
                return response()->json(['error' => 'You have not Admin access. Not create'], 401);   
            }
        }
        return $next($request);
    }
}
