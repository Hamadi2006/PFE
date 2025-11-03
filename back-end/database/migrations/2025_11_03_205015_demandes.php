<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('demandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('immobilier_id')
                  ->constrained('immobilier')
                  ->onDelete('cascade'); // supprime les demandes si le bien est supprimé
            $table->string('nom_complet')->default('')->nullable();
            $table->string('email');
            $table->string('telephone');
            $table->text('message')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demandes');
    }
};
