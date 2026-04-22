<?php

// routes/api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Api\ImmobilierController;
use App\Http\Controllers\DemandesController;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ClientAuthController;

// Route de login admin
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login');

Route::get('/admin/getAdmins', [AdminController::class, 'getAdmins']);

Route::delete('/admin/{id}', [AdminController::class, 'destroy']);

Route::post('/admin/storeAdmin', [AdminController::class, 'StoreAdmin']);

Route::post("/admin/store", [AdminController::class, "StoreAdmin"]);

Route::post("/admin/{id}", [AdminController::class, "update"]);

Route::get("/admin/mail", [MailController::class, "sendMail"]);

// Routes client authentication
Route::prefix('client')->group(function () {
    Route::post('/register', [ClientAuthController::class, 'register']);
    Route::post('/login', [ClientAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [ClientAuthController::class, 'me']);
        Route::post('/logout', [ClientAuthController::class, 'logout']);
    });
});

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

    // GET /api/immobilier/Bysociete/{societe_id} - Liste toutes les annonces d'une societe
    Route::get('/Bysociete/{societe_id}', [ImmobilierController::class, 'getImobilierBySociete']);

}
);
// Routes of demandes (CRD)
Route::post('/demande', [DemandesController::class, 'store'])
    ->middleware('auth:sanctum');

Route::get('/demande', [DemandesController::class, 'getDemandes']);

Route::delete('/demande/{id}', [DemandesController::class, 'deleteDemande']);

Route::get('/demande/Bysociete/{societe_id}', [DemandesController::class, 'getDemandeByCompanie']);

// Routes of companies (CRUD)
Route::post('/company/store', [CompaniesController::class, 'storeCompany']);

Route::get('/company', [CompaniesController::class, 'getCompanies']);

Route::post('/company/auth', [CompaniesController::class, 'authCompany']);

Route::delete('/company/{id}', [CompaniesController::class, 'deleteCompany']);

Route::post('/company/{id}', [CompaniesController::class, 'updateCompanie']);
