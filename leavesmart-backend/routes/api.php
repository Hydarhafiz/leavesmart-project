<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PackageTypeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\JobPositionController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\LeaveTypeController;
use App\Http\Controllers\JobPositionLeaveTypeController;
use App\Http\Controllers\LeaveBalanceController;
use App\Models\LeaveRequest;

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
Route::get('view-profile', [AdminController::class, 'indexAdmin']);
Route::put('update-profile', [AdminController::class, 'updateAdmin']);


//staff
Route::post('staff/register', [StaffController::class, 'register'])->name('register');
Route::get('view-staff-manager', [StaffController::class, 'indexAdmin']);
Route::get('view-staff-manager/{id}', [StaffController::class, 'getStaffById']);



//request
Route::get('view-leave-request-manager', [LeaveRequestController::class, 'indexAdmin']);
Route::get('view-leave-request-manager/{id}', [LeaveRequestController::class, 'getLeaveRequestById']);
Route::put('edit-leave-request-manager/{id}', [LeaveRequestController::class, 'updateLeaveRequestById']);



//leave-type
Route::post('/create-leave-types', [LeaveTypeController::class, 'store']);
Route::get('view-leave-types-manager', [LeaveTypeController::class, 'indexAdmin']);
Route::get('view-leave-types-manager/{id}', [LeaveTypeController::class, 'getLeaveTypeById']);


//job-position
Route::post('/create-job-positions', [JobPositionController::class, 'store']);
Route::get('view-job-positions-setting', [JobPositionController::class, 'indexAdmin']);


//job-position-leave-type
Route::post('/create-job-position-by-leave-type', [JobPositionLeaveTypeController::class, 'store']);
Route::get('view-job-position-by-leave-types', [JobPositionLeaveTypeController::class, 'indexAdmin']);




//STAFF
//register/login
Route::post('staff/login', [StaffController::class, 'login'])->name('login');

//profile
Route::get('view-staff-profile', [StaffController::class, 'index']);


//balance
Route::get('view-leave-balances', [LeaveBalanceController::class, 'indexUser']);


//request
Route::post('create-leave-request', [LeaveRequestController::class, 'store']);
Route::get('get-leave-requests', [LeaveRequestController::class, 'indexUser']);

//admin
Route::get('get-admins', [AdminController::class, 'indexUser']);










