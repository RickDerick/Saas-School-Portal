<?php

use Illuminate\Support\Facades\Route;

foreach (config('tenancy.central_domains') as $domain) {
    Route::domain($domain)->prefix('v1/central')->group(base_path('routes/modules/central/central.php'));
}
