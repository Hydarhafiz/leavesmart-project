<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LeaveRequest;
use Illuminate\Support\Facades\Auth;


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
                'total_days' => 'required|integer',
                'reason' => 'required|string',
                'manager_comments' => 'nullable|string',
                'status' => 'required|string',
                'staff_id' => 'required|exists:staff,id',
                'company_id' => 'required|exists:companies,id',
                'leave_type_id' => 'required|exists:leave_types,id',
            ]);

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

            $leaveRequests = LeaveRequest::with('leaveType')
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

    public function indexAdmin()
    {
        try {
            // Authenticate admin
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve leaveRequest associated with the authenticated admin's company ID
            $leaveRequest = LeaveRequest::where('company_id', $admin->company_id)->get();

            // Return a response with leaveRequest data
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

    public function getLeaveRequestById($id)
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
        ]);

        // Update the leave request with the validated data
        $leaveRequest->fill($validatedData);
        $leaveRequest->save();

        // Return a response indicating success
        return response()->json(['message' => 'Leave request updated successfully', 'data' => $leaveRequest], 200);
    } catch (\Exception $e) {
        // Log the exception
        return response()->json([
            'status' => 'error',
            'code' => 500,
            'message' => 'Internal Server Error'
        ], 500);
    }
}

}
