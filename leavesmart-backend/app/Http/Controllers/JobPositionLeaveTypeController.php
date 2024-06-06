<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\JobPosition;
use App\Models\LeaveType;
use App\Models\JobPositionLeaveTypes;

class JobPositionLeaveTypeController extends Controller
{
    public function store(Request $request)
    {
        try {
            if (!auth()->guard('admin-api')->check()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            // Validate incoming request data
            $validatedData = $request->validate([
                'job_position_id' => '',
                'leave_type_id' => '',
                'max_allowed_days' => 'required|integer',
                'company_id' => '',
            ]);

            // Check if the association already exists
            $existingAssociation = JobPositionLeaveTypes::where('job_position_id', $validatedData['job_position_id'])
                ->where('leave_type_id', $validatedData['leave_type_id'])
                ->where('company_id', $validatedData['company_id'])
                ->exists();

            if ($existingAssociation) {
                return response()->json(['error' => 'Leave type for this position already exists'], 409);
            }

            // Create a new association between job position and leave type
            $association = JobPositionLeaveTypes::create($validatedData);

            // Return a response indicating success
            return response()->json(['message' => 'Leave type for this position created successfully', 'data' => $association], 201);
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

    public function indexAdmin($jobPositionId)
    {
        try {
            // Authenticate admin
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve JobPositionLeaveTypes associated with the authenticated admin's company ID
            $JobPositionLeaveTypes = JobPositionLeaveTypes::with('leaveType')
                                ->where('company_id', $admin->company_id)
                                ->where('job_position_id', $jobPositionId)
                                ->get();

            // Return a response with JobPositionLeaveTypes data
            return response()->json(['data' => $JobPositionLeaveTypes], 200);
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
