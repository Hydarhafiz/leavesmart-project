<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'registration_number',
        'contact_number',
        'email',
        'industry',
        'website',
        'package_type_id',
    ];

    public function packageType()
    {
        return $this->belongsTo(PackageType::class);
    }
}
