<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role1 = Role::create(['name' => 'Admin']);
        $role2 = Role::create(['name' => 'QLHT']);
        $permission1 = Permission::create(['name' => 'add user']);
        $permission2 = Permission::create(['name' => 'edit user']);
        $permission3 = Permission::create(['name' => 'delete user']);
        $permission4 = Permission::create(['name' => 'add student']);
        $permission5 = Permission::create(['name' => 'edit student']);
        $permission6 = Permission::create(['name' => 'delete student']);
        $role1->givePermissionTo([$permission1, $permission2, $permission3, $permission4, $permission5, $permission6]);
        $role2->givePermissionTo([$permission1, $permission2, $permission4, $permission5]);
    }
}