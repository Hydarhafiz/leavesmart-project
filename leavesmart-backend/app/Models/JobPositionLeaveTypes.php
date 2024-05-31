<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobPositionLeaveTypes extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_position_id',
        'leave_type_id',
        'max_allowed_days',
        'company_id',
    ];

    public function jobPosition()
    {
        return $this->belongsTo(jobPosition::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function leaveType()
    {
        return $this->belongsTo(leaveType::class);
    }


}
