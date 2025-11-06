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
    
    public function deleteCompany($id){
        $company = Companie::find($id);
        if($company){
            $company->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Company deleted successfully',
            ]);
        }else{
            return response()->json([
                'status' => 'error',
                'message' => 'Company not deleted',
            ]);
        }
    }
}
