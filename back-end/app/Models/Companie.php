<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;


class Companie extends Model

{
    use HasApiTokens;
    

    protected $table = 'societes';

    protected $fillable = [
        'nom',
        'email',
        'telephone',
        'password',
        'adresse',
        'ville',
        'logo',
        'site_web',
        'status',
        'logo',
        'email_verified_at',
        'remember_token',
    ];
}
