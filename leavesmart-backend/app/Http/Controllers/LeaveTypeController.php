<?php

namespace App\Http\Controllers;

use App\Models\LeaveType;

use Illuminate\Http\Request;

use App\Models\Company;


class LeaveTypeController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Authenticate admin
            if (!auth()->guard('admin-api')->check()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Validate incoming request data
            $validatedData = $request->validate([
                'leave_name' => 'required|string',
                'desc' => 'nullable|string',
                'company_id' => 'required|exists:companies,id',
            ]);

            // Check if the job position already exists
            $existingLeaveTypes = LeaveType::where('leave_name', $validatedData['leave_name'])
                ->where('company_id', $validatedData['company_id'])
                ->first();

            if ($existingLeaveTypes) {
                return response()->json([
                    'status' => 'error',
                    'code' => 409,
                    'message' => 'Leave types already exists',
                ], 409);
            }

            // Create a new leave type
            $leaveType = LeaveType::create($validatedData);

            // Return a response indicating success
            return response()->json(['message' => 'Leave type created successfully', 'data' => $leaveType], 201);
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

    public function indexAdmin()
    {
        try {
            // Authenticate user
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve leave types
            $leaveTypes = LeaveType::where('company_id', $admin->company_id)->get();

            // Return a response with leave types
            return response()->json(['data' => $leaveTypes], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function getLeaveTypeById($id)
    {
        try {
            // Authenticate admin
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve the leave type associated with the provided ID and the authenticated admin's company ID
            $leaveType = LeaveType::where('company_id', $admin->company_id)
                ->where('id', $id)
                ->first();

            if (!$leaveType) {
                return response()->json(['error' => 'Leave type not found'], 404);
            }

            // Return a response with the leave type data
            return response()->json(['data' => $leaveType], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function editLeaveTypeById(Request $request, $id)
    {
        try {
            // Authenticate staff
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve the leave type associated with the provided ID and the authenticated admin's company ID
            $leaveType = LeaveType::where('company_id', $admin->company_id)
                ->where('id', $id)
                ->first();

            if (!$leaveType) {
                return response()->json(['error' => 'Leave type not found'], 404);
            }

            // Update leave type information based on request data
            $leaveType->update($request->all());

            // Return a response with updated staff data
            return response()->json(['data' => $leaveType], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function deleteLeaveTypeById($id)
{
    try {
        // Authenticate staff
        $admin = auth()->guard('admin-api')->user();
        if (!$admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Retrieve staff associated with the authenticated staff's company ID and the provided ID
        $leaveTypeToDelete = LeaveType::where('company_id', $admin->company_id)
            ->where('id', $id)
            ->first();

        // Check if staff with the provided ID exists
        if (!$leaveTypeToDelete) {
            return response()->json(['error' => 'Leave type not found'], 404);
        }

        // Retrieve the company record
        $company = Company::where('id', $leaveTypeToDelete->company_id)->first();

        // Check if company with the provided ID exists
        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        // Delete the staff member
        $leaveTypeToDelete->delete();


        // Return a response indicating successful deletion
        return response()->json(['message' => 'Leave type deleted successfully'], 200);
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
