<?php

namespace App\Http\Controllers\Central;

use App\Exceptions\BusinessException;
use App\Http\Controllers\Controller;
use App\Services\AuthService;
use App\Models\Admin;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CentralController extends Controller
{
    // --- Owner auth ---

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            $superAdmin = Admin::where('email', $request->email)->first();
            if (! $superAdmin || ! Hash::check($request->password, $superAdmin->password)) {
                return response()->json(['message' => 'The email or password is incorrect.'], 401);
            }

            $token = $superAdmin->createToken('saas-app-token')->plainTextToken;

            return response()->json([
                'token' => $token,
                'superAdmin' => $superAdmin,
                'roles' => $superAdmin->getRoleNames(),
                'permissions' => $superAdmin->getAllPermissions()->pluck('name'),
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'An error occurred while processing your request.'], 500);
        }
    }

    public function forgotPassword(Request $request, AuthService $authService)
    {
        try {
            $request->validate([
                'email' => 'required|email',
            ]);

            $authService->sendPasswordResetLink($request->email);

            return response()->json(['message' => 'We have emailed your password reset link.']);
        } catch (BusinessException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'An error occurred while processing your request.'], 500);
        }
    }

    public function resetPassword(Request $request, AuthService $authService)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'token' => 'required|string',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $authService->resetPassword($request->email, $request->token, $request->password);

            return response()->json(['message' => 'Your password has been reset.']);
        } catch (BusinessException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'An error occurred while processing your request.'], 500);
        }
    }

    // --- Owner profile ---

    public function updateEmail(Request $request)
    {
        $admin = $request->user();

        $request->validate([
            'email' => 'required|email|max:255|unique:admins,email,' . $admin->id,
            'current_password' => 'required|string',
        ]);

        if (! Hash::check($request->current_password, $admin->password)) {
            return response()->json(['message' => 'The provided password is incorrect.'], 422);
        }

        $admin->update(['email' => $request->email]);

        return response()->json(['message' => 'Email updated successfully.', 'user' => $admin]);
    }

    public function updatePassword(Request $request)
    {
        $admin = $request->user();

        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if (! Hash::check($request->current_password, $admin->password)) {
            return response()->json(['message' => 'The provided password is incorrect.'], 422);
        }

        $admin->update(['password' => Hash::make($request->password)]);

        return response()->json(['message' => 'Password updated successfully.']);
    }

    // --- Tenant management ---

    public function index()
    {
        return response()->json([
            'tenants' => Tenant::with('domains')->get(),
        ]);
    }

    public function show(string $id)
    {
        return response()->json([
            'tenant' => Tenant::with('domains')->findOrFail($id),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|alpha_dash|unique:tenants,id',
            'company_name' => 'nullable|string|max:255',
            'admin_name' => 'required|string|max:255',
            'admin_email' => 'required|email|max:255',
            'admin_password' => 'required|string|min:8',
           'primary_color' => 'nullable|regex:/^#[0-9A-Fa-f]{6}$/',
            'secondary_color' => 'nullable|regex:/^#[0-9A-Fa-f]{6}$/',
            'accent_color' => 'nullable|regex:/^#[0-9A-Fa-f]{6}$/',
            'logo' => 'nullable|image|mimes:png,jpg,jpeg,webp|max:2048',
        ]);

        $subdomain = $request->name;
        $logoUrl = null;

        if ($request->hasFile('logo')) {
        $path = $request->file('logo')->store('tenant-logos', 'public');
        $logoUrl = Storage::disk('public')->url($path);
}

        $tenant = Tenant::create([
            'id' => $subdomain,
            'company_name' => $request->company_name ?? $subdomain,
            'email' => $request->admin_email,
            'primary_color' => $request->primary_color,
            'secondary_color' => $request->secondary_color,
            'accent_color' => $request->accent_color,
            'logo_url' => $logoUrl,
        ]);

        $domain = $tenant->domains()->create(['domain' => $subdomain . '.localhost']);

        // create the school's first admin user inside its own database
        tenancy()->initialize($tenant);

        $owner = User::create([
            'name' => $request->admin_name,
            'email' => $request->admin_email,
            'password' => Hash::make($request->admin_password),
        ]);
        $owner->assignRole('admin');

        tenancy()->end();

        return response()->json([
            'message' => 'Tenant created successfully',
            'tenant' => $tenant,
            'domain' => $domain->domain,
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $tenant = Tenant::findOrFail($id);

        $request->validate([
            'company_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'primary_color' => 'nullable|regex:/^#[0-9A-Fa-f]{6}$/',
            'secondary_color' => 'nullable|regex:/^#[0-9A-Fa-f]{6}$/',
            'accent_color' => 'nullable|regex:/^#[0-9A-Fa-f]{6}$/',
            'logo' => 'nullable|image|mimes:png,jpg,jpeg,webp|max:2048',
        ]);

        $data = $request->only(['company_name', 'email', 'primary_color', 'secondary_color', 'accent_color']);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('tenant-logos', 'public');
            $data['logo_url'] = Storage::disk('public')->url($path);
        }

        $tenant->update($data);

        return response()->json([
            'message' => 'Tenant updated successfully',
            'tenant' => $tenant,
        ]);
    }

    public function destroy(string $id)
    {
        $tenant = Tenant::findOrFail($id);
        $tenant->delete();

        return response()->json(['message' => 'Tenant deleted successfully']);
    }
}
