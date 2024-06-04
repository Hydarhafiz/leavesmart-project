<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Staff;
use Illuminate\Validation\ValidationException;
use App\Models\LeaveBalance;
use App\Models\JobPositionLeaveTypes;
use App\Models\LeaveType;




class StaffController extends Controller
{
    public function register(Request $request)
    {
        try {
            if (!Auth::guard('admin-api')->check()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Validate incoming request data for staff member
            $validatedStaffData = $request->validate([
                'FullName' => 'required|string',
                'gender' => 'required|string|in:Male,Female,Other',
                'contact_number' => 'required|string',
                'email' => 'required|email|unique:staff,email',
                'password' => 'required|string',
                'company_id' => 'required|exists:companies,id',
                'job_position_id' => 'required|exists:job_positions,id',
                'admin_id' => 'required|exists:admins,id',
            ]);

            // Create a new staff member
            $staff = new Staff();
            $staff->FullName = $validatedStaffData['FullName'];
            $staff->gender = $validatedStaffData['gender'];
            $staff->contact_number = $validatedStaffData['contact_number'];
            $staff->email = $validatedStaffData['email'];
            $staff->password = bcrypt($validatedStaffData['password']);
            $staff->company_id = $validatedStaffData['company_id'];
            $staff->job_position_id = $validatedStaffData['job_position_id'];
            $staff->admin_id = $validatedStaffData['admin_id'];
            $staff->save();

            // Fetch all job position leave types based on job_position_id
            $jobPositionLeaveTypes = JobPositionLeaveTypes::where('job_position_id', $staff->job_position_id)->get();

            // Check if any job position leave types exist
            if ($jobPositionLeaveTypes->isNotEmpty()) {
                // Loop through each job position leave type
                foreach ($jobPositionLeaveTypes as $jobPositionLeaveType) {
                    $leaveBalance = new LeaveBalance();
                    // Fetch leave type details from leave_types table
                    $leaveType = LeaveType::find($jobPositionLeaveType->leave_type_id);
                    if ($leaveType) {
                        // Set title and days_left from leave_types table
                        $leaveBalance->title = $leaveType->leave_name;
                        $leaveBalance->days_left = $jobPositionLeaveType->max_allowed_days;
                        $leaveBalance->staff_id = $staff->id;
                        $leaveBalance->company_id = $staff->company_id;
                        $leaveBalance->job_position_id = $staff->job_position_id;
                        $leaveBalance->leave_type_id = $leaveType->id;
                        $leaveBalance->save();
                    } else {
                        // Handle the case where leave type details are not found
                    }
                }
            } else {
                // Handle the case where no matching job_position_id is found in job_position_leave_types
                // For now, you can set default values for title and days_left or handle it based on your application logic
            }

            // Return a response indicating success
            return response()->json(['message' => 'Staff member and leave balances created successfully', 'data' => $staff], 201);
        } catch (ValidationException $e) {
            // Return an error response if validation fails
            return response()->json(['error' => $e->validator->errors()->first()], 422);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }



    public function login(Request $request)
    {
        try {
            $credentials = request(['email', 'password']);

            if (!$token = auth()->guard('user-api')->attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            return response()->json([
                'status' => 'success',
                'code' => 200,
                'message' => 'Login successful',
                'token' => $token
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'code' => 422,
                'message' => 'Validation Error',
                'errors' => $e->validator->getMessageBag()
            ], 422);
        } catch (\Illuminate\Auth\AuthenticationException $e) {
            return response()->json([
                'status' => 'error',
                'code' => 401,
                'message' => 'Unauthorized'
            ], 401);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function index()
    {
        try {
            // Authenticate user
            $user = auth()->guard('user-api')->user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve leave requests associated with the authenticated user's staff ID
            $staff = Staff::with('company', 'jobPosition', 'admin')
                ->where('id', $user->id)
                ->get();

            // Return a response with leave requests
            return response()->json(['data' => $staff], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }


    public function indexAdmin()
    {
        try {
            // Authenticate admin
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve staff associated with the authenticated admin's company ID
            $staff = Staff::with('company', 'jobPosition', 'admin')
                ->where('admin_id', $admin->id)
                ->get();

            // Return a response with staff data
            return response()->json(['data' => $staff], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function getStaffById($id)
    {
        try {
            // Authenticate admin
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve staff associated with the authenticated admin's company ID and the provided ID
            $staff = Staff::where('company_id', $admin->company_id)
                ->where('id', $id)
                ->first();

            // Check if staff with the provided ID exists
            if (!$staff) {
                return response()->json(['error' => 'Staff not found'], 404);
            }

            // Return a response with staff data
            return response()->json(['data' => $staff], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }


    public function logout()
    {
        Auth::guard('user-api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
