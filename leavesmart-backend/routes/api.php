<?php

use Illuminate\Http\Request;
use App\Http\Controllers\PackageTypeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\JobPositionController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\LeaveTypeController;
use App\Http\Controllers\JobPositionLeaveTypeController;
use App\Http\Controllers\LeaveBalanceController;
use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

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


//package type
Route::post('/package-types', [PackageTypeController::class, 'store']);
Route::get('/get-package-types', [PackageTypeController::class, 'index']);

//company
Route::get('/get-companies', [CompanyController::class, 'index']);



//ADMIN
//register/login
Route::post('/register-admin-company', [AdminController::class, 'registerAdminAndCompany']);
Route::post('/register-admin', [AdminController::class, 'registerAdmin']);
Route::post('admin/login', [AdminController::class, 'adminLogin']);

//profile-admin
Route::get('view-profile', [AdminController::class, 'indexAdmin']);
Route::put('update-profile', [AdminController::class, 'updateAdmin']);
Route::get('/photo_admins/{filename}', [AdminController::class, 'getPhotoAdmin']);


//staff
Route::post('staff/register', [StaffController::class, 'register'])->name('register');
Route::get('view-staff-manager', [StaffController::class, 'indexAdmin']);
Route::get('view-staff-manager/{id}', [StaffController::class, 'getStaffById']);
Route::put('edit-staff-manager/{id}', [StaffController::class, 'editStaffById']);
Route::get('/photo_staffs', [StaffController::class, 'listStaffPhotos']);
Route::get('/photo_staffs/{filename}', [StaffController::class, 'getStaffPhoto'])->name('photo_staffs.view');
Route::delete('/delete-staff/{id}', [StaffController::class, 'deleteStaffById']);




//request
Route::get('view-leave-request-manager', [LeaveRequestController::class, 'indexAdmin']);
Route::get('view-leave-request-manager/{id}', [LeaveRequestController::class, 'getLeaveRequestById']);
Route::put('edit-leave-request-manager/{id}', [LeaveRequestController::class, 'updateLeaveRequestById']);
Route::get('/attachments/{filename}', [LeaveRequestController::class, 'getAttachment']);


//leave-type
Route::post('/create-leave-types', [LeaveTypeController::class, 'store']);
Route::get('view-leave-types-manager', [LeaveTypeController::class, 'indexAdmin']);
Route::get('view-leave-types-manager/{id}', [LeaveTypeController::class, 'getLeaveTypeById']);
Route::put('edit-leave-types-manager/{id}', [LeaveTypeController::class, 'editLeaveTypeById']);
Route::delete('delete-leave-type/{id}', [LeaveTypeController::class, 'deleteLeaveTypeById']);


//job-position
Route::post('/create-job-positions', [JobPositionController::class, 'store']);
Route::get('view-job-positions-setting', [JobPositionController::class, 'indexAdmin']);
Route::get('view-job-positions-setting/{id}', [JobPositionController::class, 'getJobPositionById']);
Route::put('edit-job-positions-setting/{id}', [JobPositionController::class, 'editJobPositionById']);
Route::delete('delete-job-position/{id}', [JobPositionController::class, 'deleteJobPositionById']);

//job-position-leave-type
Route::post('/create-job-position-by-leave-type', [JobPositionLeaveTypeController::class, 'store']);
Route::get('view-leave-types-by-job-position/{id}', [JobPositionLeaveTypeController::class, 'indexAdmin']);
Route::put('edit-leave-types-by-job-position/{id}', [JobPositionLeaveTypeController::class, 'editJobPositionLeaveTypeById']);
Route::delete('delete-leave-types-by-job-position/{id}', [JobPositionLeaveTypeController::class, 'deleteJobPositionLeaveTypeById']);




//STAFF
//register/login
Route::post('staff/login', [StaffController::class, 'login'])->name('login');

//profile
Route::get('view-staff-profile', [StaffController::class, 'index']);
Route::put('update-staff-profile', [StaffController::class, 'updateStaff']);



//balance
Route::get('view-leave-balances', [LeaveBalanceController::class, 'indexUser']);


//request
Route::post('create-leave-request', [LeaveRequestController::class, 'store']);
Route::get('get-leave-requests', [LeaveRequestController::class, 'indexUser']);

//admin
Route::get('get-admins', [AdminController::class, 'indexUser']);










