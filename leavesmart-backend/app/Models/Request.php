<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;

    protected $fillable = [
        'leave_title',
        'leave_type',
        'start_date',
        'end_date',
        'total_days',
        'manager_comments',
        'status',
        'staff_id',
        'company_id',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
