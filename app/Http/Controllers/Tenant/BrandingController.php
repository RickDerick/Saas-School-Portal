<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BrandingController extends Controller
{
    public function show(){
        return response()->json([
            'branding' => [
                'primary_color' => tenant('primary_color') ?? '#FFFFFF',
                'secondary_color' => tenant('secondary_color') ?? '#C53777',
                'accent_color' => tenant('accent_color') ?? '#FE5940',
                'logo_url' => tenant('logo_url') ?? null,
            ],
        ]);
    }
}
