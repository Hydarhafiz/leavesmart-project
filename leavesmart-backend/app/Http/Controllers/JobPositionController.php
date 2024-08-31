<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobPosition;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;



class JobPositionController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Authenticate admin
            if (!Auth::guard('admin-api')->check()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Validate incoming request data
            $validatedData = $request->validate([
                'position_name' => 'required|string',
                'company_id' => 'required|exists:companies,id',
            ]);

            // Check if the job position already exists
            $existingPosition = JobPosition::where('position_name', $validatedData['position_name'])
                ->where('company_id', $validatedData['company_id'])
                ->first();

            if ($existingPosition) {
                return response()->json([
                    'status' => 'error',
                    'code' => 409,
                    'message' => 'Job position already exists',
                ], 409);
            }

            // Create a new job position
            $position = JobPosition::create($validatedData);

            // Return a response indicating success
            return response()->json(['message' => 'Job position created successfully', 'data' => $position], 201);
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

            // Retrieve Job Positions
            $jobPosition = JobPosition::where('company_id', $admin->company_id)->get();

            // Return a response with Job Positions
            return response()->json(['data' => $jobPosition], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function getJobPositionById($id)
    {
        try {
            // Authenticate admin
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve the Job Position associated with the provided ID and the authenticated admin's company ID
            $jobPosition = JobPosition::where('company_id', $admin->company_id)
                ->where('id', $id)
                ->first();

            if (!$jobPosition) {
                return response()->json(['error' => 'Job Position not found'], 404);
            }

            // Return a response with the Job Position data
            return response()->json(['data' => $jobPosition], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function editJobPositionById(Request $request, $id)
    {
        try {
            // Authenticate staff
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve the Job Position associated with the provided ID and the authenticated admin's company ID
            $jobPosition = JobPosition::where('company_id', $admin->company_id)
                ->where('id', $id)
                ->first();

            if (!$jobPosition) {
                return response()->json(['error' => 'Job Position not found'], 404);
            }

            // Update Job Position information based on request data
            $jobPosition->update($request->all());

            // Return a response with updated staff data
            return response()->json(['data' => $jobPosition], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function deleteJobPositionById($id)
{
    try {
        // Authenticate staff
        $admin = auth()->guard('admin-api')->user();
        if (!$admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Retrieve staff associated with the authenticated staff's company ID and the provided ID
        $jobPositionToDelete = JobPosition::where('company_id', $admin->company_id)
            ->where('id', $id)
            ->first();

        // Check if staff with the provided ID exists
        if (!$jobPositionToDelete) {
            return response()->json(['error' => 'Job Position not found'], 404);
        }

        // Retrieve the company record
        $company = Company::where('id', $jobPositionToDelete->company_id)->first();

        // Check if company with the provided ID exists
        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        // Delete the staff member
        $jobPositionToDelete->delete();


        // Return a response indicating successful deletion
        return response()->json(['message' => 'Job Position deleted successfully'], 200);
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
