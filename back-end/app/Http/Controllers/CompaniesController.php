<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Companie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class CompaniesController extends Controller
{
    public function getCompanies(){
        $companies = Companie::all();
        return response()->json($companies);
    }

    public function storeCompany(Request $request)
{
    $validation = $request->validate([
        'nom' => 'required',
        'email' => 'required|email|unique:societes,email',
        'telephone' => 'required',
        'password' => 'required|min:6',
        'adresse' => 'required',
        'ville' => 'required',
        'logo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'site_web' => 'required|url',
        'statut' => 'required',
    ]);

    // Upload du logo
    if($request->hasFile('logo')){
        try {
            $path = $request->file('logo')->store('logos', 'public');
            $validation['logo'] = $path;
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Logo not uploaded',
            ]);
        }
    }

    // Hasher le mot de passe
    $validation['password'] = bcrypt($validation['password']);

    $company = Companie::create($validation);

    if($company){
        return response()->json([
            'status' => 'success',
            'message' => 'Company created successfully',
            'data' => $company
        ]);
    }else{
        return response()->json([
            'status' => 'error',
            'message' => 'Company not created',
        ]);
    }
}


    public function authCompany(Request $request){
        $validation = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $company = Companie::where('email', $validation['email'])->first();
        if($company){
            if(Hash::check($validation['password'], $company->password)){
                $token = $company->createToken('token')->plainTextToken;
                return response()->json([
                    'status' => 'success',
                    'message' => 'Company authenticated successfully',
                    'data' => $company,
                    'token' => $token
                ],200);
            }else{
                return response()->json([
                    'status' => 'error',
                    'message' => 'Company not authenticated',
                ],401);
            }
        }else{
            return response()->json([
                'status' => 'error',
                'message' => 'Company not authenticated',
            ]);
        }
    }
    
    public function deleteCompany($id)
{
    $company = Companie::find($id);

    if (!$company) {
        return response()->json([
            'status' => 'error',
            'message' => 'Company not found',
        ], 404);
    }

    // Supprimer le logo si présent
    if ($company->logo) {
        Storage::disk('public')->delete($company->logo);
    }

    $company->delete();

    return response()->json([
        'status' => 'success',
        'message' => 'Company deleted successfully',
    ]);
}

    public function updateCompanie(Request $request, $id)
{
    // Récupérer la société
    $company = Companie::find($id);
    if (!$company) {
        return response()->json([
            'status' => 'error',
            'message' => 'Société non trouvée',
        ], 404);
    }

    // Validation
    $request->validate([
        'nom' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'telephone' => 'nullable|string|max:20',
        'adresse' => 'nullable|string|max:255',
        'ville' => 'nullable|string|max:255',
        'site_web' => 'nullable|url|max:255',
        'logo' => 'nullable|image|max:10240', // max 5MB
    ]);

    // Mettre à jour les champs
    $company->nom = $request->nom;
    $company->email = $request->email;
    $company->telephone = $request->telephone;
    $company->adresse = $request->adresse;
    $company->ville = $request->ville;
    $company->site_web = $request->site_web;

    // Upload du logo dans storage/logos si fourni
    if ($request->hasFile('logo')) {
        try {
            $path = $request->file('logo')->store('logos', 'public');
            $company->logo = $path; // stocke le chemin relatif pour la DB
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Logo non uploadé',
            ], 500);
        }
    }

    $company->save();

    return response()->json([
        'status' => 'success',
        'message' => 'Société mise à jour avec succès',
        'data' => $company
    ]);
}


}
