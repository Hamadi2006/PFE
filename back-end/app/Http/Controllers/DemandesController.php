<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;

class DemandesController extends Controller
{
    public function store(Request $request){
       $validation =  $request->validate([
            'immobilier_id' => 'required',
            'nom_complet' => 'required|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'required|max:255',
            'message' => 'nullable',
        ]);
        $demande = Demande::create($validation);

        if($demande) {
            return response()->json([
                'success' => true,
                'message' => 'Demande envoyée avec succès',
                'data' => $demande
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'envoi de la demande'
            ], 500);
        }
    }
}
