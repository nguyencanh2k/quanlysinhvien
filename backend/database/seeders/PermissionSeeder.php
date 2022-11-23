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
        $permission1 = Permission::create(['name' => 'index']);
        $permission2 = Permission::create(['name' => 'show']);
        $permission3 = Permission::create(['name' => 'store']);
        $permission4 = Permission::create(['name' => 'update']);
        $permission5 = Permission::create(['name' => 'destroy']);
        $role1->givePermissionTo([$permission1, $permission2, $permission3, $permission4, $permission5]);
        $role2->givePermissionTo([$permission1, $permission2, $permission3, $permission4]);
    }
}
