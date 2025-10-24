<?php

// routes/api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Api\ImmobilierController; 

// Route de login admin
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login');

// Routes Immobilier (CRUD)
Route::prefix('immobilier')->group(function () {
    
    // GET /api/immobilier - Liste toutes les annonces
    Route::get('/', [ImmobilierController::class, 'index']);
    
    // POST /api/immobilier - Créer une nouvelle annonce
    Route::post('/', [ImmobilierController::class, 'storeImmobilier']);
    
    // GET /api/immobilier/{id} - Afficher une annonce
    Route::get('/{id}', [ImmobilierController::class, 'show']);
    
    // PUT /api/immobilier/{id} - Mettre à jour une annonce
    Route::put('/{id}', [ImmobilierController::class, 'update']);
    
    // DELETE /api/immobilier/{id} - Supprimer une annonce
    Route::delete('/{id}', [ImmobilierController::class, 'destroy']);
});


// ============================================
// IMPORTANT: Déplacer le contrôleur
// ============================================
/*
Votre contrôleur est dans: 
app/Http/Controllers/Api/ImmobilierController.php

Il faut le déplacer vers:
app/Http/Controllers/ImmobilierController.php

OU changer le namespace dans le contrôleur:

De:   namespace App\Http\Controllers\Api;
Vers: namespace App\Http\Controllers;

*/