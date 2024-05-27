<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveBalance extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'days_left',
        'staff_id',
        'leave_type_id',
        'company_id',
        'job_position_id',
    ];

    // Define the relationship with the Staff model
    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    // Define the relationship with the LeaveType model
    public function leaveType()
    {
        return $this->belongsTo(LeaveType::class);
    }

    // Define the relationship with the Company model
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    // Define the relationship with the JobPosition model
    public function jobPosition()
    {
        return $this->belongsTo(JobPosition::class);
    }
}

