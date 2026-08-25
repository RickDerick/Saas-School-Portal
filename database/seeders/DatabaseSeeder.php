<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Tenant;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(AdminSeeder::class);

        $tenant1 = Tenant::create(['id' => 'company1']);
        $tenant1->domains()->create(['domain' => 'company1.localhost']);

        $tenant2 = Tenant::create(['id' => 'company2']);
        $tenant2->domains()->create(['domain' => 'company2.localhost']);
    }
}
