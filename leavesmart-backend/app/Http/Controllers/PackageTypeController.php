<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PackageType;

class PackageTypeController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'type_name' => 'required|string',
            'max_staff_count' => 'required|integer',
        ]);

        // Create a new package type record
        $packageType = PackageType::create($validatedData);

        // Return a response indicating success
        return response()->json(['message' => 'Package type created successfully', 'data' => $packageType], 201);
    }
}
