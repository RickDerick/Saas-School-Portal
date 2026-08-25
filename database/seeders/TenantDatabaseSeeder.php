<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Stancl\Tenancy\Database\Models\Tenant;
use Stancl\Tenancy\Database\Models\Domain;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class TenantDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'view-dashboard',
            'manage-students',
            'manage-classes',
            'manage-terms',
            'manage-fee-structures',
            'manage-invoices',
            'manage-payments',
            'manage-staff',
        ];

        foreach($permissions as $permission){
            Permission::findOrCreate($permission, 'web');
        }

        $adminRole = Role::findOrCreate('admin', 'web');
        $adminRole->givePermissionTo($permissions);

        $teacherRole = Role::findOrCreate('teacher', 'web');
        $teacherRole->givePermissionTo([
            'view-dashboard',
            'manage-students',
            'manage-classes',
            'manage-terms',
        ]);
        $AccountantRole = Role::findOrCreate('accountant', 'web');
        $AccountantRole->givePermissionTo([
            'view-dashboard',
            'manage-fee-structures',
            'manage-invoices',
            'manage-payments',
        ]);
    }
}
