<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'company_name',
        'email',
        'primary_color',
        'secondary_color',
        'accent_color',
        'logo_url',
    ];
}