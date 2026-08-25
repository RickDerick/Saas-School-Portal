<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use App\Http\Controllers\Tenant\AuthController;
use App\Http\Controllers\Tenant\BrandingController;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    Route::get('/{any?}', function () {
        return view('app');
    })->where('any', '.*');
});



/*
|--------------------------------------------------------------------------
| Tenant API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('api/v1')
    ->middleware([
        'api',
        InitializeTenancyByDomain::class,
        PreventAccessFromCentralDomains::class,
    ])
    ->group(function () {

    //Public Routes
    Route::post ('/register', [AuthController::class, 'register']);
    Route::post ('/login', [AuthController::class, 'login']);
    Route::get('/branding', [BrandingController::class, 'show'] );

    //Protected Routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', function (Request $request) {
            return response()->json([
                'message' => 'Authenticated tenant user',
                'tenant_id' => tenant('id'),
                'user' => $request->user(),
            ]);
        });

        Route::put('/profile/email', [AuthController::class, 'updateEmail']);
        Route::put('/profile/password', [AuthController::class, 'updatePassword']);
    });

    });



