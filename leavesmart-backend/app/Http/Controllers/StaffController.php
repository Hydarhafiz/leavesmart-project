<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Staff;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class StaffController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Validate incoming request data
            $validatedData = $request->validate([
                'FullName' => 'required|string',
                'gender' => 'required|string|in:Male,Female,Other',
                'contact_number' => 'required|string',
                'email' => 'required|email|unique:staff,email',
                'password' => 'required|string',
                'company_id' => 'required|exists:companies,id',
                'job_position_id' => 'required|exists:job_positions,id',
            ]);

            // Create a new staff member
            $staff = new Staff();
            $staff->FullName = $validatedData['FullName'];
            $staff->gender = $validatedData['gender'];
            $staff->contact_number = $validatedData['contact_number'];
            $staff->email = $validatedData['email'];
            $staff->password = bcrypt($validatedData['password']);
            $staff->company_id = $validatedData['company_id'];
            $staff->job_position_id = $validatedData['job_position_id'];
            $staff->save();

            // Return a response indicating success
            return response()->json(['message' => 'Staff member created successfully', 'data' => $staff], 201);
        } catch (ValidationException $e) {
            // Return an error response if validation fails
            return response()->json(['error' => $e->validator->errors()->first()], 422);
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



    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function me()
    {
        return response()->json(auth()->guard('user-api')->user());
    }


    public function logout()
    {
        Auth::guard('user-api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
