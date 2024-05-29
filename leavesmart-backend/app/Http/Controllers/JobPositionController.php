<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobPosition;
use Illuminate\Support\Facades\Auth;



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
}
