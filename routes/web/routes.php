<?php

use Illuminate\Support\Facades\Route;

// routes/web.php, api.php or any other central route files you have

foreach (config('tenancy.central_domains') as $domain) {
    Route::domain($domain)->group(function (): void {
        Route::get('/{any?}', function () {
            return view('app');
        })->where('any', '.*');
    });
}


