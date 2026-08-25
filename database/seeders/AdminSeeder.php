<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $super_admin = Admin::firstOrCreate(
            ['email' => env('ADMIN_EMAIL', 'owner@example.com')],
            [
                'name' => env('ADMIN_NAME', 'Owner'),
                'password' => Hash::make(env('ADMIN_PASSWORD', 'changeme123')),
            ]
        );

        $role = Role::findOrCreate('SuperAdmin', 'admin'); //'admin' is the guard name for the Admin model
        $super_admin->assignRole($role);
    }
}
