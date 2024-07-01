<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\Company;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;


class AdminController extends Controller
{
    public function registerAdminAndCompany(Request $request)
    {
        try {
            // Validate incoming request data for admin
            $validatedAdminData = $request->validate([
                'username' => 'required|string|unique:admins',
                'email' => 'required|email|unique:admins',
                'password' => 'required|string',
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
            $company->total_staffs = 0;
            $company->total_admins = 1;
            $company->save();

            
            $validatedAdminData['password'] = bcrypt($validatedAdminData['password']);
            if ($request->hasFile('photo_admin')) {
                try {
                    $file = $request->file('photo_admin');
                    $path = $file->store('photo_admins', 'public');
                    $validatedAdminData['photo_admin'] = $path;
                } catch (\Exception $e) {
                    Log::error('File upload error: ' . $e->getMessage());
                    return response()->json([
                        'status' => 'error',
                        'code' => 500,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }


            $admin = Admin::create($validatedAdminData);

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

    public function registerAdmin(Request $request)
    {
        try {
            // Validate incoming request data for admin
            $validatedAdminData = $request->validate([
                'username' => 'required|string|unique:admins',
                'email' => 'required|email|unique:admins',
                'password' => 'required|string',
                'gender' => 'required',
                'contact_number' => 'required|string',
                'company_id' => 'required|exists:companies,id',
            ]);


            $validatedAdminData['password'] = bcrypt($validatedAdminData['password']);
            if ($request->hasFile('photo_admin')) {
                try {
                    $file = $request->file('photo_admin');
                    $path = $file->store('photo_admins', 'public');
                    $validatedAdminData['photo_admin'] = $path;
                } catch (\Exception $e) {
                    Log::error('File upload error: ' . $e->getMessage());
                    return response()->json([
                        'status' => 'error',
                        'code' => 500,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }


            $admin = Admin::create($validatedAdminData);

            $company = Company::find($admin->company_id);
            if ($company) {
                // Increment the total_admins field
                $company->total_admins += 1;
                $company->save();
            } else {
                // Handle the case where the company is not found (if necessary)
            }

            // Return a response indicating success
            return response()->json(['message' => 'Admin account created successfully', 'admin' => $admin], 201);
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
            $token = auth()->guard('admin-api')->attempt($credentials);
            if (!$token) {
                return response()->json([
                    'error' => 'Unauthorized',
                    'message' => 'Incorrect email/password. Please check and try again',
                    'code' => 401,
                ], 401);
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

    public function indexUser()
    {
        try {
            // Authenticate admin
            $user = auth()->guard('user-api')->user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve admin and company data associated with the authenticated admin's company ID
            $adminData = Admin::where('company_id', $user->company_id)->get();

            // Return a response with admin and company data
            return response()->json(['data' => $adminData], 200);
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

            // Retrieve admin and company data associated with the authenticated admin's company ID
            $adminData = Admin::with('company', 'company.packageType')
                ->where('company_id', $admin->company_id)
                ->where('id', $admin->id) // Filter by the authenticated admin's ID
                ->get();

            // Return a response with admin and company data
            return response()->json(['data' => $adminData], 200);
        } catch (\Exception $e) {
            // Log the exception
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function getPhotoAdmin($filename)
{
    // Construct the correct path to the photo
    $path = public_path('storage/photo_admins/' . $filename);

    // Log the path to debug
    Log::info('Photo path: ' . $path);

    if (!File::exists($path)) {
        return response()->json(['error' => 'File not found at path: ' . $path], 404);
    }

    $type = File::mimeType($path);

    // Check if the file is an image
    $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];

    if (!in_array($type, $allowedMimeTypes)) {
        return response()->json(['error' => 'File is not a supported image type'], 404);
    }

    $file = File::get($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
}

    

    public function updateAdmin(Request $request)
    {
        try {
            // Authenticate admin
            $admin = auth()->guard('admin-api')->user();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Validate incoming request data for admin
            $validatedAdminData = $request->validate([
                'username' => 'required|string',
                'gender' => 'required|string',
                'contact_number' => 'required|string',
                'email' => 'required|email|unique:admins,email,' . $admin->id,
                'password' => 'nullable|string',
            ]);

            // Validate incoming request data for company
            $validatedCompanyData = $request->validate([
                'company_name' => 'required|string|unique:companies,company_name,' . $admin->company_id,
                'registration_number' => 'required|string|unique:companies,registration_number,' . $admin->company_id,
                'company_contact_number' => 'required|string',
                'company_email' => 'required|email|unique:companies,email,' . $admin->company_id,
                'industry' => 'required|string',
                'website' => 'nullable|string',
                'package_type_id' => 'required|exists:package_types,id',
            ]);

            // Update admin data
            $admin = Admin::find($admin->id); // Retrieve the admin record from the database
            $admin->username = $validatedAdminData['username'];
            $admin->gender = $validatedAdminData['gender'];
            $admin->contact_number = $validatedAdminData['contact_number'];
            $admin->email = $validatedAdminData['email'];
            if (isset($validatedAdminData['password'])) {
                $admin->password = Hash::make($validatedAdminData['password']);
            }
            $admin->save();

            // Update company data
            $company = Company::find($admin->company_id);
            $company->company_name = $validatedCompanyData['company_name'];
            $company->registration_number = $validatedCompanyData['registration_number'];
            $company->contact_number = $validatedCompanyData['company_contact_number'];
            $company->email = $validatedCompanyData['company_email'];
            $company->industry = $validatedCompanyData['industry'];
            $company->website = $validatedCompanyData['website'];
            $company->package_type_id = $validatedCompanyData['package_type_id'];
            $company->save();

            // Return a success response
            return response()->json(['message' => 'Admin and company data updated successfully', 'admin' => $admin, 'company' => $company], 200);
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
