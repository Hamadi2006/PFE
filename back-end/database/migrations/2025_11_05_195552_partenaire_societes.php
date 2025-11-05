<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('societes', function (Blueprint $table) {
    $table->id();
    $table->string('nom');                        // Nom de la société
    $table->string('email')->unique();            // Email d’accès (login)
    $table->string('password');                   // Mot de passe hashé
    $table->string('telephone')->nullable();      // Numéro de contact
    $table->string('adresse')->nullable();        // Adresse complète
    $table->string('ville')->nullable();          // Ville
    $table->string('site_web')->nullable();       // Site internet
    $table->string('logo')->nullable();           // Logo uploadé
    $table->enum('statut', ['active', 'inactive'])->default('active'); // État du compte
    $table->timestamp('email_verified_at')->nullable(); // Vérification email
    $table->rememberToken();                      // Token pour "remember me"
    $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('societes');
    }
};
