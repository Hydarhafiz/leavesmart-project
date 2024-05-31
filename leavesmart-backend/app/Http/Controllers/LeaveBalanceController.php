<?php

namespace App\Http\Controllers;

use App\Models\LeaveBalance;
use Illuminate\Http\Request;

class LeaveBalanceController extends Controller
{
    public function indexUser()
    {
        try {
            // Authenticate user
            $user = auth()->guard('user-api')->user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve leave requests associated with the authenticated user's staff ID
            $leaveBalances = LeaveBalance::where('staff_id', $user->id)->get();

            // Return a response with leave requests
            return response()->json(['data' => $leaveBalances], 200);
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
