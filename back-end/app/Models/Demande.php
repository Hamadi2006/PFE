<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    protected $table = 'demandes';
    protected $fillable = [
        'societe_id',
        'nom_complet',
        'email',
        'telephone',
        'message',
        'immobilier_id'
    ];
}
