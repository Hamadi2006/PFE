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
            'role' => 'required|string|in:admin,super_admin',
        ]);

        try {
            // Handle image upload
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                
                // Generate unique filename
                $filename = time() . '_' . uniqid() . '.' . $photo->getClientOriginalExtension();
                
                // Store image in storage/app/public/Admins
                $path = $photo->storeAs('Admins', $filename, 'public');
                
                // Store the relative path in database (e.g., 'Admins/1761946820_69052cc41faa2.jpg')
                $validation['photo'] = $path;
            }

            // Hash password
            $validation['mot_de_passe'] = Hash::make($validation['mot_de_passe']);

            // Remove confirmation password from validation data before saving
            unset($validation['mot_de_passe_confirmation']);

            // Create admin
            $admin = Admin::create($validation);

            if ($admin) {
                return response()->json([
                    'message' => 'Administrateur créé avec succès',
                    'data' => $admin
                ], 201);
            } else {
                return response()->json([
                    'message' => 'Erreur lors de la création de l\'administrateur'
                ], 400);
            }
        } catch (\Exception $e) {
            // Delete uploaded image if something goes wrong
            if (isset($path)) {
                Storage::disk('public')->delete($path);
            }

            return response()->json([
                'message' => 'Erreur serveur: ' . $e->getMessage()
            ], 500);
        }
    }
}
