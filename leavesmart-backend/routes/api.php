<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PackageTypeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobPositionController;
use App\Http\Controllers\StaffController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/package-types', [PackageTypeController::class, 'store']);

//ADMIN
//register/login
Route::post('/register', [AdminController::class, 'register']);
Route::post('admin/login', [AdminController::class, 'adminLogin']);



Route::post('/create-job-positions', [JobPositionController::class, 'store']);


Route::post('staff/register', [StaffController::class, 'register'])->name('register');
Route::post('staff/login', [StaffController::class, 'login'])->name('login');









