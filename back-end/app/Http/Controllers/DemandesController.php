<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;

class DemandesController extends Controller
{
    public function store(Request $request)
    {
        $validation =  $request->validate([
            'societe_id' => 'required',
            'immobilier_id' => 'required',
            'nom_complet' => 'required|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'required|max:255',
            'message' => 'nullable',
        ]);
        $demande = Demande::create($validation);

        if ($demande) {
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
    public function getDemandes()
    {
        $demandes = Demande::join('immobilier', 'demandes.immobilier_id', '=', 'immobilier.id')
            ->select('demandes.*', 'immobilier.titre', 'immobilier.ville', 'immobilier.prix', 'immobilier.images', 'immobilier.image_principale')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $demandes
        ], 200);
    }
    public function getDemandeByCompanie($id)
    {
        $demandes = Demande::join('immobilier', 'demandes.immobilier_id', '=', 'immobilier.id')
            ->select('demandes.*', 'immobilier.titre', 'immobilier.ville', 'immobilier.prix', 'immobilier.images', 'immobilier.image_principale')
            ->where('demandes.societe_id', $id)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $demandes
        ], 200);
    }
    public function deleteDemande($id)
    {
        try {
            $demande = Demande::findOrFail($id);
            $demande->delete();
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la demande'
            ], 500);
        }
        return response()->json([
            'success' => true,
            'message' => 'Demande supprimée avec succès'
        ], 200);
        }

}