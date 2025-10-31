<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

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
    public function StoreAdmin(Request $request){
       $validation =  $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:admins',
            'mot_de_passe' => 'required|string|min:8',
            'telephone' => 'required|string',
            'role' => 'required|string',
        ]);
        $admin = Admin::create($validation) ; 
        if($admin){
            return response()->json(['message' => 'Admin created successfully'], 201);
        }else{
            return response()->json(['message' => 'Admin not created'], 400);
        }
    }
}
