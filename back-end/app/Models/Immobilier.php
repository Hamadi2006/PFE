<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Immobilier extends Model
{
    protected $table = 'immobilier';
    protected $fillable = [
        'titre',
        'description',
        'type',
        'transaction',
        'prix',
        'surface',
        'ville',
        'adresse',
        'latitude',
        'longitude',
        'chambres',
        'salles_de_bain',
        'piscine',
        'jardin',
        'parking',
        'ascenseur',
        'climatisation',
        'annee_construction',
        'etage',
        'nombre_etages',
        'image_principale',
        'images',
        'statut',
        'en_vedette',
        'telephone_contact',
        'email_contact',
        'nom_contact',
    ];
}
