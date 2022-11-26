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
        if(Auth::user()->active == '0'){
            return response()->json(['error' => 'You have not Admin access'], 401);
        }

        $route = Route::getRoutes()->match($request);
        $currentroute = $route->getName();
        $id = $request->route('id');

        if(Auth::user()->id == $id){
            if($currentroute == 'user.destroy' || $currentroute == 'user.update' || $currentroute == 'user.updateActive'){
                return response()->json(['error' => 'Error.'], 401);
            }
        }

        if(Auth::user()->hasRole('QLHT')){
            if($currentroute == 'student.destroy' || $currentroute == 'user.destroy' || $currentroute == 'user.updateActive'){
                return response()->json(['error' => 'You have not Admin access.'], 401);
            }

            if($currentroute == 'user.update'){
                $user = User::find($id);
                if($user->hasRole('Admin') || $request->role == 'Admin' || $user->active != $request->active){
                    return response()->json(['error' => 'You have not Admin access. Not update'], 401);
                }
            }
            if($currentroute == 'user.store' && $request->role == 'Admin'){
                return response()->json(['error' => 'You have not Admin access. Not create'], 401);   
            }
        }
        
        return $next($request);


        // $route = Route::getRoutes()->match($request);
        // $currentroute = $route->getName();
        // $user = auth()->user();
        // if($user->hasRole('QLHT')){
        //     $permissions = $user->getAllPermissions();
        //     foreach($permissions as $value){
        //         if($currentroute == 'user.'.$value->name || $currentroute == 'student.'.$value->name)
        //         {  
        //             return response()->json(['error' => 'You have not Admin access.'], 401); 
        //         }
        //     }
        // }
        // return $next($request);
    }
}
