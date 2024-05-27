<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveType extends Model
{
    use HasFactory;

    protected $fillable = [
        'leave_name',
        'desc',
        'company_id',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
