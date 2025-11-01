<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function getAdmins(){
        return Admin::all();
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required',
        ]);

        $user = Admin::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->mot_de_passe, $user->mot_de_passe)) {
            return response()->json([
                'message' => 'Identifiants invalides',
            ], 401);
        }

        // Mettre à jour la dernière connexion
        $user->derniere_connexion = now();
        $user->save();

        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Authentification réussie',
            'token' => $token,
            'user' => $user,
            'status' => 200,
        ], 201); 
    }

    public function destroy($id)
    {
        try {
            $admin = Admin::findOrFail($id);
            
            // Supprimer la photo si elle existe
            if ($admin->photo && Storage::disk('public')->exists($admin->photo)) {
                Storage::disk('public')->delete($admin->photo);
            }
            
            $admin->delete();

            return response()->json([
                'success' => true,
                'message' => 'Admin supprimé avec succès'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Admin non trouvé',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function StoreAdmin(Request $request)
    {
        // Validate request
        $validation = $request->validate([
            "photo" => "required|image|mimes:jpeg,png,jpg,gif|max:5120", // 5MB max
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:admins',
            'mot_de_passe' => 'required|string|min:8',
            'telephone' => 'required|string|max:20',
            'role' => 'required|string|in:admin,super_admin,sous_administrateur,moderateur',
        ]);

        try {
            // Handle image upload
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                
                // Generate unique filename
                $filename = time() . '_' . uniqid() . '.' . $photo->getClientOriginalExtension();
                
                // Store image in storage/app/public/Admins
                $path = $photo->storeAs('Admins', $filename, 'public');
                
                // Store the relative path in database
                $validation['photo'] = $path;
            }

            // Hash password
            $validation['mot_de_passe'] = Hash::make($validation['mot_de_passe']);

            // Set default values
            $validation['actif'] = true;
            $validation['derniere_connexion'] = null;

            // Create admin
            $admin = Admin::create($validation);

            if ($admin) {
                return response()->json([
                    'success' => true,
                    'message' => 'Administrateur créé avec succès',
                    'data' => $admin
                ], 201);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur lors de la création de l\'administrateur'
                ], 400);
            }
        } catch (\Exception $e) {
            // Delete uploaded image if something goes wrong
            if (isset($path)) {
                Storage::disk('public')->delete($path);
            }

            return response()->json([
                'success' => false,
                'message' => 'Erreur serveur: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $admin = Admin::findOrFail($id);

            // Validate request
            $validation = $request->validate([
                'nom' => 'sometimes|required|string|max:255',
                'prenom' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|email|unique:admins,email,' . $id,
                'telephone' => 'sometimes|nullable|string|max:20',
                'role' => 'sometimes|required|string|in:admin,super_admin,sous_administrateur,moderateur',
                'actif' => 'sometimes|boolean',
                'photo' => 'sometimes|nullable|image|mimes:jpeg,jpg,png,gif|max:5120', // 5MB max
                'mot_de_passe' => 'sometimes|nullable|string|min:8',
            ]);

            // Gérer l'upload de la photo
            if ($request->hasFile('photo')) {
                // Supprimer l'ancienne photo si elle existe
                if ($admin->photo && Storage::disk('public')->exists($admin->photo)) {
                    Storage::disk('public')->delete($admin->photo);
                }

                // Upload nouvelle photo
                $photo = $request->file('photo');
                $filename = time() . '_' . uniqid() . '.' . $photo->getClientOriginalExtension();
                $path = $photo->storeAs('Admins', $filename, 'public');
                $validation['photo'] = $path;
            }

            // Hash le mot de passe s'il est fourni
            if (isset($validation['mot_de_passe']) && !empty($validation['mot_de_passe'])) {
                $validation['mot_de_passe'] = Hash::make($validation['mot_de_passe']);
            } else {
                // Ne pas mettre à jour le mot de passe s'il n'est pas fourni
                unset($validation['mot_de_passe']);
            }

            // Convertir 'actif' en boolean si présent
            if (isset($validation['actif'])) {
                $validation['actif'] = (bool) $validation['actif'];
            }

            // Mettre à jour l'admin
            $admin->update($validation);

            return response()->json([
                'success' => true,
                'message' => 'Admin mis à jour avec succès',
                'data' => $admin->fresh() // Récupérer les données mises à jour
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Admin non trouvé'
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            // Supprimer la photo uploadée en cas d'erreur
            if (isset($path) && Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $admin = Admin::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $admin
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Admin non trouvé'
            ], 404);
        }
    }

    public function toggleStatus($id)
    {
        try {
            $admin = Admin::findOrFail($id);
            $admin->actif = !$admin->actif;
            $admin->save();

            return response()->json([
                'success' => true,
                'message' => 'Statut mis à jour avec succès',
                'data' => $admin
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du statut',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}