<?php

// ============================================
// 1. Model: app/Models/Immobilier.php
// ============================================
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Immobilier extends Model
{
    use HasFactory, SoftDeletes;

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
        'statut',
        'en_vedette',
        'telephone_contact',
        'email_contact',
        'nom_contact',
        'image_principale',
        'images',
        'societe_id',
    ];

    protected $casts = [
        'prix' => 'decimal:2',
        'surface' => 'decimal:2',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'chambres' => 'integer',
        'salles_de_bain' => 'integer',
        'piscine' => 'boolean',
        'jardin' => 'boolean',
        'parking' => 'boolean',
        'ascenseur' => 'boolean',
        'climatisation' => 'boolean',
        'en_vedette' => 'boolean',
        'annee_construction' => 'integer',
        'etage' => 'integer',
        'nombre_etages' => 'integer',
        'images' => 'array', // Automatically cast JSON to array
    ];

    protected $appends = ['image_principale_url', 'images_urls'];

    // Accessor for main image URL
    public function getImagePrincipaleUrlAttribute()
    {
        return $this->buildStorageUrl($this->image_principale);
    }

    // Accessor for gallery images URLs
    public function getImagesUrlsAttribute()
    {
        return array_values(array_filter(array_map(function ($image) {
            return $this->buildStorageUrl($image);
        }, $this->normalizeImages($this->images))));
    }

    private function normalizeImages($images): array
    {
        if (!$images) {
            return [];
        }

        if (is_array($images)) {
            return array_values(array_filter($images));
        }

        if (is_string($images)) {
            $decoded = json_decode($images, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                return $this->normalizeImages($decoded);
            }

            return [$images];
        }

        return [];
    }

    private function buildStorageUrl($path): ?string
    {
        if (!$path || !is_string($path)) {
            return null;
        }

        if (preg_match('/^(https?:|data:|blob:)/i', $path)) {
            $storagePosition = strpos($path, '/storage/');

            if ($storagePosition === false) {
                return $path;
            }

            $path = substr($path, $storagePosition + strlen('/storage/'));
        }

        $path = ltrim($path, '/');

        if (str_starts_with($path, 'storage/')) {
            $path = substr($path, strlen('storage/'));
        }

        return asset('storage/' . $path);
    }

    // Scopes for filtering
    public function scopeDisponible($query)
    {
        return $query->where('statut', 'disponible');
    }

    public function scopeEnVedette($query)
    {
        return $query->where('en_vedette', true);
    }

    public function scopeVente($query)
    {
        return $query->where('transaction', 'vente');
    }

    public function scopeLocation($query)
    {
        return $query->where('transaction', 'location');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByVille($query, $ville)
    {
        return $query->where('ville', 'LIKE', '%' . $ville . '%');
    }

    public function scopePriceBetween($query, $min, $max)
    {
        return $query->whereBetween('prix', [$min, $max]);
    }
}
