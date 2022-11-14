<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::apiResource('student', 'App\Http\Controllers\StudentController');
// Route::get('/student', [StudentController::class, 'index']);
// Route::get('student/{id}', [StudentController::class, 'show']);
// Route::post('student', [StudentController::class, 'store']);
// Route::put('student/{id}', [StudentController::class, 'update']);
// Route::delete('student/{id}', [StudentController::class, 'destroy']);

// Route::apiResource('user', 'App\Http\Controllers\UserController');

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);

});
Route::middleware(['isAdminOrQLHT'])->group(function () {
    Route::get('/student', [StudentController::class, 'index']);
    Route::get('student/{id}', [StudentController::class, 'show']);
    Route::post('student', [StudentController::class, 'store']);
    Route::put('student/{id}', [StudentController::class, 'update']);
    Route::get('/user', [UserController::class, 'index']);
    Route::get('user/{id}', [UserController::class, 'show']);
});

Route::middleware(['isAdmin'])->group(function () {
    Route::delete('user/{id}', [UserController::class, 'destroy']);
    Route::delete('student/{id}', [StudentController::class, 'destroy']);
});

Route::middleware(['isQLHT'])->group(function () {
    Route::post('user', [UserController::class, 'store']);
    Route::put('user/{id}', [UserController::class, 'update']);
});

