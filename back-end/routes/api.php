<?php

// routes/api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Api\ImmobilierController;
use App\Http\Controllers\DemandesController;

// Route de login admin
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login');

Route::get('/admin/getAdmins', [AdminController::class, 'getAdmins']);

Route::delete('/admin/{id}', [AdminController::class, 'destroy']);

Route::post('/admin/storeAdmin', [AdminController::class, 'StoreAdmin']);

Route::post("/admin/store", [AdminController::class, "StoreAdmin"]);

Route::post("/admin/{id}", [AdminController::class, "update"]);

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


}
);
Route::post('/demande', [DemandesController::class, 'store']);

Route::get('/demande', [DemandesController::class, 'getDemandes']);
