<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClientAuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'message' => 'Client registered successfully',
            'token' => $user->createToken('client-token')->plainTextToken,
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Identifiants invalides.',
            ], 401);
        }

        return response()->json([
            'message' => 'Client authenticated successfully',
            'token' => $user->createToken('client-token')->plainTextToken,
            'user' => $user,
        ]);
    }

    public function me(Request $request)
    {
        $user = $this->clientUser($request);

        if (! $user) {
            return response()->json(['message' => 'Client non authentifie.'], 401);
        }

        return response()->json(['user' => $user]);
    }

    public function logout(Request $request)
    {
        $user = $this->clientUser($request);

        if (! $user) {
            return response()->json(['message' => 'Client non authentifie.'], 401);
        }

        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Client logged out successfully']);
    }

    private function clientUser(Request $request): ?User
    {
        $user = $request->user();

        return $user instanceof User ? $user : null;
    }
}
