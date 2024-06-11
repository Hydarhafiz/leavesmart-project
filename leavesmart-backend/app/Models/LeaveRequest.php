<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'leave_title',
        'start_date',
        'end_date',
        'total_days',
        'reason',
        'manager_comments',
        'status',
        'staff_id',
        'company_id',
        'leave_type_id',
        'admin_id'

    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function leaveType()
    {
        return $this->belongsTo(leaveType::class);
    }

    public function jobPosition()
{
    return $this->belongsTo(JobPosition::class, 'job_position_id');
}

}
