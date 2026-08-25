<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //Register
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',

        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    //Login
    public function login(Request $request)
    {
        $request->validate([[
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]]);
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User logged in successfully',
             'user' => $user,
             'token' => $token,
             'permissions' => $user->getAllPermissions()->pluck('name'), // Get all permissions of the user
             'roles' => $user->getRoleNames(), // Get all roles of the user
        ], 200);
    }

    public function updateEmail(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'current_password' => 'required|string',
        ]);

        if (! Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'The provided password is incorrect.'], 422);
        }

        $user->update(['email' => $request->email]);

        return response()->json(['message' => 'Email updated successfully.', 'user' => $user]);
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if (! Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'The provided password is incorrect.'], 422);
        }

        $user->update(['password' => Hash::make($request->password)]);

        return response()->json(['message' => 'Password updated successfully.']);
    }
}
