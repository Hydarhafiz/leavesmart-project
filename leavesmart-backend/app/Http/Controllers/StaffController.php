<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Staff;
use Illuminate\Validation\ValidationException;
use App\Models\LeaveBalance;
use App\Models\JobPositionLeaveTypes;
use App\Models\LeaveType;
use App\Models\PackageType;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

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
                'gender' => 'required|string|in:Male,Female',
                'contact_number' => 'required|string',
                'email' => 'required|email|unique:staff,email',
                'password' => 'required|string',
                'company_id' => 'required|exists:companies,id',
                'job_position_id' => 'required|exists:job_positions,id',
                'admin_id' => 'required|exists:admins,id',
            ]);

            $company = Company::find($validatedStaffData['company_id']);
            if (!$company) {
                return response()->json(['error' => 'Company not found'], 404);
            }

            // Fetch the package type data
            $packageType = PackageType::find($company->package_type_id);
            if (!$packageType) {
                return response()->json(['error' => 'Package type not found'], 404);
            }

            // Check if adding the new staff member would exceed the max staff count
            $currentTotalStaffsAndAdmin = $company->total_staffs + $company->total_admins;
            if ($currentTotalStaffsAndAdmin >= $packageType->max_staff_count) {
                return response()->json(['error' => 'Max staff exceed'], 400);
            }


            if ($request->hasFile('photo_staff')) {
                try {
                    $file = $request->file('photo_staff');
                    $path = $file->store('photo_staffs', 'public');
                    $validatedStaffData['photo_staff'] = $path;
                } catch (\Exception $e) {
                    Log::error('File upload error: ' . $e->getMessage());
                    return response()->json([
                        'status' => 'error',
                        'code' => 500,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }

            $validatedStaffData['password'] = bcrypt($validatedStaffData['password']);



            $staff = Staff::create($validatedStaffData);

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

            if ($company) {
                // Increment the total_staffs field
                $company->total_staffs += 1;
                $company->save();
            } else {
                // Handle the case where the company is not found (if necessary)
            }

            // Return a response indicating success
            return response()->json(['message' => 'Staff member and leave balances created successfully', 'data' => $staff], 201);
        } catch (ValidationException $e) {
            // Return an error response if validation fails
            return response()->json(['error' => $e->validator->errors()->first()], 422);
        } catch (\Exception $e) {
            // Log the exception
            Log::error('Internal Server Error: ' . $e->getMessage());
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


    public function getStaffPhoto($filename)
    {
        $path = storage_path('app/public/photo_staffs/' . $filename);

        if (!File::exists($path)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);

        return response()->make($file, 200, [
            'Content-Type' => $type,
            'Content-Disposition' => 'inline; filename="' . $filename . '"'
        ]);
    }

    public function updateStaff(Request $request)
    {
        try {
            // Authenticate user
            $user = auth()->guard('user-api')->user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Validate incoming request data for staff
            $validatedStaffData = $request->validate([
                'FullName' => 'required|string',
                'gender' => 'required|string',
                'contact_number' => 'required|string',
                'email' => 'required|email|unique:staff,email',
                'password' => 'nullable|string',
            ]);



            // Update staff data
            $staff = Staff::find($user->id); // Retrieve the staff record from the database
            $staff->username = $validatedStaffData['FullName'];
            $staff->gender = $validatedStaffData['gender'];
            $staff->contact_number = $validatedStaffData['contact_number'];
            $staff->email = $validatedStaffData['email'];
            if (isset($validatedStaffData['password'])) {
                $staff->password = Hash::make($validatedStaffData['password']);
            }
            $staff->save();



            // Return a success response
            return response()->json(['message' => 'staff updated successfully', 'staff' => $staff], 200);
        } catch (\Exception $e) {
            Log::error('Internal Server Error: ' . $e->getMessage());
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
            // Authenticate staff
            $staff = auth()->guard('admin-api')->user();
            if (!$staff) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve staff associated with the authenticated staff's company ID
            $staff = Staff::with('company', 'jobPosition', 'admin')
                ->where('admin_id', $staff->id)
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


    public function listStaffPhotos()
    {
        $attachmentsDirectory = storage_path('app/public/photo_staffs');
        $files = File::files($attachmentsDirectory);

        $fileList = [];
        foreach ($files as $file) {
            $filePath = $file->getPathname();  // Get the full path to the file
            $fileList[] = [
                'filename' => $file->getFilename(),
                'path' => $filePath,
            ];
        }

        return response()->json(['files' => $fileList]);
    }



    public function getStaffById($id)
    {
        try {
            // Authenticate staff
            $staff = auth()->guard('admin-api')->user();
            if (!$staff) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve staff associated with the authenticated staff's company ID and the provided ID
            $staff = Staff::where('company_id', $staff->company_id)
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

    public function editStaffById(Request $request, $id)
    {
        try {
            // Authenticate staff
            $staff = auth()->guard('admin-api')->user();
            if (!$staff) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve staff associated with the authenticated staff's company ID and the provided ID
            $staff = Staff::where('company_id', $staff->company_id)
                ->where('id', $id)
                ->first();

            // Check if staff with the provided ID exists
            if (!$staff) {
                return response()->json(['error' => 'Staff not found'], 404);
            }

            // Update staff information based on request data
            $staff->update($request->all());

            // Return a response with updated staff data
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

    public function deleteStaffById($id)
{
    try {
        // Authenticate staff
        $admin = auth()->guard('admin-api')->user();
        if (!$admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Retrieve staff associated with the authenticated staff's company ID and the provided ID
        $staffToDelete = Staff::where('company_id', $admin->company_id)
            ->where('id', $id)
            ->first();

        // Check if staff with the provided ID exists
        if (!$staffToDelete) {
            return response()->json(['error' => 'Staff not found'], 404);
        }

        // Retrieve the company record
        $company = Company::where('id', $staffToDelete->company_id)->first();

        // Check if company with the provided ID exists
        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        // Delete the staff member
        $staffToDelete->delete();

        // Decrement the total_staffs column
        $company->total_staffs = $company->total_staffs - 1;
        $company->save();

        // Return a response indicating successful deletion
        return response()->json(['message' => 'Staff member deleted successfully'], 200);
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
