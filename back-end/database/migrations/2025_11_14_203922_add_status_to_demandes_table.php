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
        Schema::table('demandes', function (Blueprint $table) {
            //societe_id foreign key
            $table->integer('societe_id')->nullable();
            $table->foreign('societe_id')->references('id')->on('societes');
        });
    }


};
