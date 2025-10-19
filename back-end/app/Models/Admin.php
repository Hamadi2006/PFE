<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admins';
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
        'telephone',
        'photo',
        'actif',
        'derniere_connexion',
    ];
}
