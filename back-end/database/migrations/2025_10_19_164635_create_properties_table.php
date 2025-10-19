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
        Schema::create('immobilier', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->enum('type', ['appartement', 'maison', 'villa', 'studio', 'terrain', 'bureau', 'commerce']);
            $table->enum('transaction', ['vente', 'location']);
            $table->decimal('prix', 15, 2);
            $table->decimal('surface', 10, 2);
            $table->string('ville', 100);
            $table->string('adresse')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->integer('chambres')->default(0);
            $table->integer('salles_de_bain')->default(0);
            $table->boolean('piscine')->default(false);
            $table->boolean('jardin')->default(false);
            $table->boolean('parking')->default(false);
            $table->boolean('ascenseur')->default(false);
            $table->boolean('climatisation')->default(false);
            $table->integer('annee_construction')->nullable();
            $table->integer('etage')->nullable();
            $table->integer('nombre_etages')->nullable();
            $table->string('image_principale', 500)->nullable();
            $table->json('images')->nullable();
            $table->enum('statut', ['disponible', 'reserve', 'vendu', 'loue'])->default('disponible');
            $table->boolean('en_vedette')->default(false);
            $table->string('telephone_contact', 20)->nullable();
            $table->string('email_contact')->nullable();
            $table->string('nom_contact')->nullable();
            $table->timestamps();
            
            $table->index('type');
            $table->index('transaction');
            $table->index('ville');
            $table->index('prix');
            $table->index('surface');
            $table->index('chambres');
            $table->index('salles_de_bain');
            $table->index('statut');
            $table->index(['type', 'transaction']);
            $table->index(['ville', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('immobilier');
    }
};