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
}
