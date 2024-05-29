<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'company_name' => 'required|string',
            'registration_number' => 'required|string',
            'contact_number' => 'required|string',
            'email' => 'required|email',
            'industry' => 'required|string',
            'website' => 'nullable|url',
            'package_type_id' => '',
        ]);

        // Create a new company
        $company = Company::create($validatedData);

        // Return a response indicating success
        return response()->json(['message' => 'Company created successfully', 'data' => $company], 201);
    }
}
