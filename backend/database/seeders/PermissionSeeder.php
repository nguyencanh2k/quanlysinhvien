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
        $permission1 = Permission::create(['name' => 'user.index']);
        $permission2 = Permission::create(['name' => 'user.show']);
        $permission3 = Permission::create(['name' => 'user.store']);
        $permission4 = Permission::create(['name' => 'user.update']);
        $permission5 = Permission::create(['name' => 'user.updateActive']);
        $permission6 = Permission::create(['name' => 'user.destroy']);
        $permission7 = Permission::create(['name' => 'student.index']);
        $permission8 = Permission::create(['name' => 'student.show']);
        $permission9 = Permission::create(['name' => 'student.store']);
        $permission10 = Permission::create(['name' => 'student.update']);
        $permission11 = Permission::create(['name' => 'student.destroy']);
        $role1->givePermissionTo([$permission1, $permission2, $permission3, $permission4, $permission5, $permission6, $permission7, $permission8, $permission9, $permission10, $permission11]);
        $role2->givePermissionTo([$permission1, $permission2, $permission3, $permission4, $permission7, $permission8, $permission9, $permission10]);
    }
}
