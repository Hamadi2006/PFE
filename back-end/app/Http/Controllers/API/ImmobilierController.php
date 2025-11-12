<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Immobilier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImmobilierController extends Controller
{
    /**
     * Store a new property listing
     */
    public function storeImmobilier(Request $request)
    {
        // Validation rules
        $validator = Validator::make($request->all(), [
            'societe_id' => 'required|exists:societes,id',
            // Required fields
            'titre' => 'required|string|min:5|max:200',
            'type' => 'required|in:appartement,maison,villa,studio,terrain,bureau,commerce',
            'transaction' => 'required|in:vente,location',
            'prix' => 'required|numeric|min:0|max:999999999',
            'surface' => 'required|numeric|min:0|max:100000',
            'ville' => 'required|string|min:2|max:100',
            
            // Optional text fields
            'description' => 'nullable|string|max:2000',
            'adresse' => 'nullable|string|max:255',
            
            // Optional numeric fields
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'chambres' => 'nullable|integer|min:0|max:50',
            'salles_de_bain' => 'nullable|integer|min:0|max:20',
            'annee_construction' => 'nullable|integer|min:1800|max:' . (date('Y') + 5),
            'etage' => 'nullable|integer|min:-5|max:200',
            'nombre_etages' => 'nullable|integer|min:1|max:200',
            
            // Status and features
            'statut' => 'nullable|in:disponible,reserve,vendu,loue',
            'piscine' => 'nullable|boolean',
            'jardin' => 'nullable|boolean',
            'parking' => 'nullable|boolean',
            'ascenseur' => 'nullable|boolean',
            'climatisation' => 'nullable|boolean',
            'en_vedette' => 'nullable|boolean',
            
            // Contact information
            'nom_contact' => 'nullable|string|max:100',
            'telephone_contact' => 'nullable|string|max:20',
            'email_contact' => 'nullable|email|max:100',
            
            // Images
            'image_principale' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120', // 5MB
            'images.*' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120', // 5MB each
        ], [
            // Custom error messages in French
            'titre.required' => 'Le titre est requis',
            'titre.min' => 'Le titre doit contenir au moins 5 caractères',
            'titre.max' => 'Le titre ne peut pas dépasser 200 caractères',
            'societe_id.required' => 'Le societe_id est requis',
            'type.required' => 'Le type de bien est requis',
            'type.in' => 'Le type de bien sélectionné n\'est pas valide',
            'transaction.required' => 'Le type de transaction est requis',
            'transaction.in' => 'Le type de transaction sélectionné n\'est pas valide',
            'prix.required' => 'Le prix est requis',
            'prix.numeric' => 'Le prix doit être un nombre',
            'prix.min' => 'Le prix doit être supérieur à 0',
            'surface.required' => 'La surface est requise',
            'surface.numeric' => 'La surface doit être un nombre',
            'ville.required' => 'La ville est requise',
            'latitude.between' => 'La latitude doit être entre -90 et 90',
            'longitude.between' => 'La longitude doit être entre -180 et 180',
            'email_contact.email' => 'L\'email n\'est pas valide',
            'image_principale.image' => 'Le fichier doit être une image',
            'image_principale.mimes' => 'L\'image doit être au format JPG, PNG ou WEBP',
            'image_principale.max' => 'L\'image ne doit pas dépasser 5MB',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Prepare data for insertion
            $data = [
                'titre' => $request->titre,
                'description' => $request->description,
                'type' => $request->type,
                'transaction' => $request->transaction,
                'prix' => $request->prix,
                'surface' => $request->surface,
                'ville' => $request->ville,
                'adresse' => $request->adresse,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                'chambres' => $request->chambres ?? 0,
                'salles_de_bain' => $request->salles_de_bain ?? 0,
                'piscine' => $request->boolean('piscine'),
                'jardin' => $request->boolean('jardin'),
                'parking' => $request->boolean('parking'),
                'ascenseur' => $request->boolean('ascenseur'),
                'climatisation' => $request->boolean('climatisation'),
                'annee_construction' => $request->annee_construction,
                'etage' => $request->etage,
                'nombre_etages' => $request->nombre_etages,
                'statut' => $request->statut ?? 'disponible',
                'en_vedette' => $request->boolean('en_vedette'),
                'telephone_contact' => $request->telephone_contact,
                'email_contact' => $request->email_contact,
                'nom_contact' => $request->nom_contact,
                'societe_id' => $request->societe_id,
            ];

            // Handle main image upload
            if ($request->hasFile('image_principale')) {
                $imagePrincipale = $request->file('image_principale');
                $imageName = 'immobilier_' . Str::random(20) . '.' . $imagePrincipale->getClientOriginalExtension();
                $imagePath = $imagePrincipale->storeAs('immobilier/principales', $imageName, 'public');
                $data['image_principale'] = $imagePath;
            }

            // Create the property listing
            $immobilier = Immobilier::create($data);

            // Handle additional images upload
            if ($request->hasFile('images')) {
                $images = [];
                foreach ($request->file('images') as $index => $image) {
                    $imageName = 'immobilier_' . $immobilier->id . '_' . $index . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
                    $imagePath = $image->storeAs('immobilier/galerie', $imageName, 'public');
                    $images[] = $imagePath;
                }
                
                // Store images as JSON in database
                $immobilier->images = json_encode($images);
                $immobilier->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'Immobilier ajouté avec succès',
                'data' => $immobilier
            ], 201);

        } catch (\Exception $e) {
            // Log error for debugging
            Log::error('Error creating immobilier: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'enregistrement',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all properties with filters
     */
    public function index(Request $request)
    {
        $immobiliers = Immobilier::all();

        

        return response()->json([
            'success' => true,
            'data' => $immobiliers
        ], 200);
    }

    /**
     * Get a single property
     */
    public function show($id)
    {
        $immobilier = Immobilier::find($id);

        if (!$immobilier) {
            return response()->json([
                'success' => false,
                'message' => 'Immobilier non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $immobilier
        ], 200);
    }

    /**
     * Update a property
     */
    public function update(Request $request, $id)
    {
    $immobilier = Immobilier::find($id);

    if (!$immobilier) {
        return response()->json([
            'success' => false,
            'message' => 'Immobilier non trouvé'
        ], 404);
    }

    // Validation rules (same as store)
    $validator = Validator::make($request->all(), [
        'titre' => 'sometimes|required|string|min:5|max:200',
        'type' => 'sometimes|required|in:appartement,maison,villa,studio,terrain,bureau,commerce',
        'transaction' => 'sometimes|required|in:vente,location',
        'prix' => 'sometimes|required|numeric|min:0',
        'surface' => 'sometimes|required|numeric|min:0',
        'ville' => 'sometimes|required|string|min:2|max:100',
        'description' => 'nullable|string|max:2000',
        'adresse' => 'nullable|string|max:255',
        'latitude' => 'nullable|numeric|between:-90,90',
        'longitude' => 'nullable|numeric|between:-180,180',
        'chambres' => 'nullable|integer|min:0|max:50',
        'salles_de_bain' => 'nullable|integer|min:0|max:20',
        'annee_construction' => 'nullable|integer|min:1800|max:' . (date('Y') + 5),
        'etage' => 'nullable|integer|min:-5|max:200',
        'nombre_etages' => 'nullable|integer|min:1|max:200',
        'statut' => 'nullable|in:disponible,reserve,vendu,loue',
        'piscine' => 'nullable|boolean',
        'jardin' => 'nullable|boolean',
        'parking' => 'nullable|boolean',
        'ascenseur' => 'nullable|boolean',
        'climatisation' => 'nullable|boolean',
        'en_vedette' => 'nullable|boolean',
        'nom_contact' => 'nullable|string|max:100',
        'telephone_contact' => 'nullable|string|max:20',
        'email_contact' => 'nullable|email|max:100',
        'image_principale' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
        'images.*' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur de validation',
            'errors' => $validator->errors()
        ], 422);
    }

    try {
        // Préparer les données à mettre à jour (exclure les fichiers)
        $dataToUpdate = $request->except(['image_principale', 'images']);
        
        // Mettre à jour les coordonnées si elles sont fournies
        if ($request->has('latitude') && $request->has('longitude')) {
            $dataToUpdate['latitude'] = $request->latitude;
            $dataToUpdate['longitude'] = $request->longitude;
        }
        
        $immobilier->update($dataToUpdate);

        // Handle image updates if needed
        if ($request->hasFile('image_principale')) {
            // Delete old image
            if ($immobilier->image_principale) {
                Storage::disk('public')->delete($immobilier->image_principale);
            }
            
            // Upload new image
            $imagePrincipale = $request->file('image_principale');
            $imageName = 'immobilier_' . Str::random(20) . '.' . $imagePrincipale->getClientOriginalExtension();
            $imagePath = $imagePrincipale->storeAs('immobilier/principales', $imageName, 'public');
            $immobilier->image_principale = $imagePath;
            $immobilier->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Immobilier mis à jour avec succès',
            'data' => $immobilier
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Une erreur est survenue lors de la mise à jour',
            'error' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Delete a property
     */
    public function destroy($id)
    {
        $immobilier = Immobilier::find($id);

        if (!$immobilier) {
            return response()->json([
                'success' => false,
                'message' => 'Immobilier non trouvé'
            ], 404);
        }

        try {
            // Delete main image
            if ($immobilier->image_principale) {
                Storage::disk('public')->delete($immobilier->image_principale);
            }

            // Delete gallery images
            if ($immobilier->images) {
                $images = json_decode($immobilier->images, true);
                foreach ($images as $image) {
                    Storage::disk('public')->delete($image);
                }
            }

            $immobilier->delete();

            return response()->json([
                'success' => true,
                'message' => 'Immobilier supprimé avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de la suppression',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}