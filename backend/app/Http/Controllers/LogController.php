<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;
class LogController extends Controller
{
    public function index(){
        $log = Activity::all();
        return response()->json($log);
    }
}
