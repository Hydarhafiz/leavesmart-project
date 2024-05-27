<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobPosition extends Model
{
    use HasFactory;

    protected $fillable = [
        'position_name',
        'company_id',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
