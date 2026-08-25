<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Central\CentralController;

/*
|--------------------------------------------------------------------------
| Central (Superadmin) Routes
|--------------------------------------------------------------------------
|
| Prefixed with v1/central in routes/api.php, and only ever loaded for
| central domains. This is the owner's world: logging in, and managing
| tenants.
|
*/

// --- Auth ---
Route::post('/login', [CentralController::class, 'login']);
Route::post('/forgot-password', [CentralController::class, 'forgotPassword']);
Route::post('/reset-password', [CentralController::class, 'resetPassword']);

// --- Owner profile (protected — any authenticated admin can manage their own account) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/profile/email', [CentralController::class, 'updateEmail']);
    Route::put('/profile/password', [CentralController::class, 'updatePassword']);
});

// --- Tenant management (protected — only SuperAdmin passes the permission check) ---
Route::middleware(['auth:sanctum', 'permission:manage-tenants,sanctum'])->group(function () {
    Route::get('/tenants', [CentralController::class, 'index']);
    Route::get('/tenants/{id}', [CentralController::class, 'show']);
    Route::post('/tenants', [CentralController::class, 'store']);
    Route::put('/tenants/{id}', [CentralController::class, 'update']);
    Route::delete('/tenants/{id}', [CentralController::class, 'destroy']);
});
