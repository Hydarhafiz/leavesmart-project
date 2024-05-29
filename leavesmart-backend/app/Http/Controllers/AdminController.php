<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\Company;


class AdminController extends Controller
{
    public function register(Request $request)
{
    try {
        // Validate incoming request data for admin
        $validatedAdminData = $request->validate([
            'username' => 'required|string|unique:admins',
            'email' => 'required|email|unique:admins',
            'password' => 'required|string',
            'FullName' => 'required|string',
            'gender' => 'required',
            'contact_number' => 'required|string',
        ]);

        // Validate incoming request data for company
        $validatedCompanyData = $request->validate([
            'company_name' => 'required|string|unique:companies',
            'registration_number' => 'required|string|unique:companies',
            'contact_number' => 'required|string',
            'email' => 'required|email|unique:companies',
            'industry' => 'required|string',
            'website' => 'nullable|string',
            'package_type_id' => 'required|exists:package_types,id',
        ]);

        // Create a new company
        $company = new Company();
        $company->company_name = $validatedCompanyData['company_name'];
        $company->registration_number = $validatedCompanyData['registration_number'];
        $company->contact_number = $validatedCompanyData['contact_number'];
        $company->email = $validatedCompanyData['email'];
        $company->industry = $validatedCompanyData['industry'];
        $company->website = $validatedCompanyData['website'];
        $company->package_type_id = $validatedCompanyData['package_type_id'];
        $company->save();

        // Create a new admin account associated with the company
        $admin = new Admin();
        $admin->username = $validatedAdminData['username'];
        $admin->email = $validatedAdminData['email'];
        $admin->password = bcrypt($validatedAdminData['password']);
        $admin->FullName = $validatedAdminData['FullName'];
        $admin->gender = $validatedAdminData['gender'];
        $admin->contact_number = $validatedAdminData['contact_number'];
        $admin->company_id = $company->id; // Associate the admin with the newly created company
        $admin->save();

        // Return a response indicating success
        return response()->json(['message' => 'Admin account and company created successfully', 'admin' => $admin, 'company' => $company], 201);
    } catch (ValidationException $e) {
        // Check if the error is due to duplicate username or email for admin or duplicate company data
        $errors = $e->validator->errors();
        $errorMessage = '';
        if ($errors->has('username')) {
            $errorMessage = 'The username is already taken.';
        } elseif ($errors->has('email')) {
            $errorMessage = 'The email is already taken.';
        } elseif ($errors->has('company_name')) {
            $errorMessage = 'The company name is already taken.';
        } elseif ($errors->has('registration_number')) {
            $errorMessage = 'The registration number is already taken.';
        } else {
            $errorMessage = $e->getMessage();
        }

        // Return the specific error message
        return response()->json(['error' => $errorMessage], 422);
    }
}

    public function adminLogin(Request $request)
    {
        try {
            $credentials = request(['email', 'password']);

            if (!$token = auth()->guard('admin-api')->attempt($credentials)) {
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
}
