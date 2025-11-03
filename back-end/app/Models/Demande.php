<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    protected $table = 'demandes';
    protected $fillable = [
        'nom_complet',
        'email',
        'telephone',
        'message',
        'immobilier_id'
    ];
}
