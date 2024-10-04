<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LeaveRequest;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Staff;
use App\Models\LeaveBalance;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;



class LeaveRequestController extends Controller
{
    public function store(Request $request)
    {
        try {
            if (!auth()->guard('user-api')->check()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Validate incoming request data
            $validatedData = $request->validate([
                'leave_title' => 'required|string',
                'start_date' => 'required|date',
                'end_date' => 'required|date',
                'reason' => 'required|string',
                'manager_comments' => 'nullable|string',
                'status' => 'required|string',
                'staff_id' => 'required|exists:staff,id',
                'company_id' => 'required|exists:companies,id',
                'leave_type_id' => 'required|exists:leave_types,id',
                'admin_id' => 'required|exists:admins,id',
            ]);

            // Calculate total days
            $startDate = Carbon::parse($validatedData['start_date']);
            $endDate = Carbon::parse($validatedData['end_date']);
            $totalDays = $endDate->diffInDays($startDate) + 1;

            // Add total days to the validated data
            $validatedData['total_days'] = $totalDays;

            // Check if the date range overlaps with existing leave requests
            $overlap = LeaveRequest::where('start_date', '<=', $validatedData['end_date'])
                ->where('end_date', '>=', $validatedData['start_date'])
                ->where('staff_id', $validatedData['staff_id']) // Check for the same staff member
                ->exists();

            if ($overlap) {
                return response()->json([
                    'status' => 'error',
                    'code' => 422,
                    'message' => 'Date range overlaps with existing leave request'
                ], 422);
            }

            // Check if staff has enough leave balance
            $leaveBalance = LeaveBalance::where('staff_id', $validatedData['staff_id'])
                ->where('leave_type_id', $validatedData['leave_type_id'])
                ->first();

            if (!$leaveBalance || $leaveBalance->days_left < $totalDays) {
                return response()->json([
                    'status' => 'error',
                    'code' => 422,
                    'message' => 'You do not have enough leave days available for the selected leave type.'
                ], 422);
            }

            // Handle file upload
            if ($request->hasFile('attachment')) {
                try {
                    $file = $request->file('attachment');
                    $path = $file->store('attachments', 'public');
                    $validatedData['attachment'] = $path;
                } catch (\Exception $e) {
                    Log::error('File upload error: ' . $e->getMessage());
                    return response()->json([
                        'status' => 'error',
                        'code' => 500,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }

            // Create a new leave request
            $leaveRequest = LeaveRequest::create($validatedData);

            // Return a response indicating success
            return response()->json(['message' => 'Leave request created successfully', 'data' => $leaveRequest], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'code' => 422,
                'message' => 'Validation Error',
                'errors' => $e->validator->getMessageBag()
            ], 422);
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


    public function indexUser()
    {
        try {
            // Authenticate user
            $user = auth()->guard('user-api')->user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $leaveRequests = LeaveRequest::with('LeaveType')
                ->where('staff_id', $user->id)
                ->get();

            // Return a response with leave requests
            return response()->json(['data' => $leaveRequests], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }


    public function getAttachment($filename)
    {
        $path = storage_path('app/public/attachments/' . $filename);

        if (!File::exists($path)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }

    public function indexAdmin()
    {
        try {
            // Authenticate admin
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve leave requests associated with the authenticated admin's company ID
            $leaveRequests = LeaveRequest::with(['staff', 'staff.jobPosition', 'LeaveType'])
                ->where('company_id', $admin->company_id)
                ->where('admin_id', $admin->id)
                ->get();


            // Return a response with leave requests data
            return response()->json(['data' => $leaveRequests], 200);
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


    public function getLeaveRequestById($id)
    {
        try {
            // Authenticate admin
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $leaveRequest = LeaveRequest::with('staff', 'staff.jobPosition', 'LeaveType')
                ->where('company_id', $admin->company_id)
                ->where('id', $id)
                ->first();

            if (!$leaveRequest) {
                return response()->json(['error' => 'Leave request not found'], 404);
            }

            // Return a response with the leave request data
            return response()->json(['data' => $leaveRequest], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function updateLeaveRequestById(Request $request, $id)
    {
        try {
            // Authenticate admin
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve the leave request associated with the provided ID and the authenticated admin's company ID
            $leaveRequest = LeaveRequest::where('company_id', $admin->company_id)
                ->where('id', $id)
                ->first();

            if (!$leaveRequest) {
                return response()->json(['error' => 'Leave request not found'], 404);
            }

            // Validate incoming request data
            $validatedData = $request->validate([
                'leave_title' => 'string',
                'start_date' => 'date',
                'end_date' => 'date',
                'total_days' => 'integer',
                'manager_comments' => 'nullable|string',
                'status' => 'string',
                'staff_id' => 'required',
                'leave_type_id' => 'required'
            ]);

            // Update the leave request with the validated data
            $leaveRequest->fill($validatedData);
            $leaveRequest->save();

            // If the status is Approved, update the leave balance
            if ($validatedData['status'] === 'Approved') {
                $staff = Staff::where('id', $validatedData['staff_id'])->first();
                if ($staff) {
                    $leaveBalance = LeaveBalance::where('staff_id', $staff->id)
                        ->where('leave_type_id', $validatedData['leave_type_id'])
                        ->first(); // Retrieve the first model instance
                    if ($leaveBalance) {
                        // Update the leave balance based on your requirements
                        // For example, you might want to decrease the available balance by the number of days approved
                        $leaveBalance->days_left -= $validatedData['total_days'];
                        $leaveBalance->save();
                    }
                }
            }


            // Return a response indicating success
            return response()->json(['message' => 'Leave request updated successfully', 'data' => $leaveRequest], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'exception' => $e->getMessage(), // Include the exception message
                'stack_trace' => $e->getTrace(), // Include the stack trace if needed
                // You can include more details from the exception object as needed
            ], 500);
        }
    }
}
