<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        $admin = User::create(
            [
            'username' => 'Admin',
            'firstname' => 'Nguyen',
            'lastname' => 'Canh',
            'gender' => '0',
            'active' => '1',
            'is_confirm' => '1',
            'phone' => '098999999',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'created_by' => 'admin',
            'deleted_by' => null,
            'updated_by' => 'admin',
            ],
        );
        $admin->assignRole('Admin');
        $qlht = User::create(
            [
            'username' => 'QLHT',
            'firstname' => 'Nguyen',
            'lastname' => 'Canh',
            'gender' => '0',
            'active' => '1',
            'is_confirm' => '1',
            'phone' => '098999999',
            'email' => 'qlht@gmail.com',
            'password' => Hash::make('password'),
            'created_by' => 'admin',
            'deleted_by' => null,
            'updated_by' => 'admin',
            ],
        );
        $qlht->assignRole('QLHT');
        for ($i=0; $i < 30; $i++) { 
            $qlht2 = User::create(
                [
                'username' => Str::random(10),
                'firstname' => Str::random(10),
                'lastname' => Str::random(10),
                'gender' => rand(0,1),
                'active' => rand(0,1),
                'is_confirm' => rand(0,1),
                'phone' => '12345678',
                'email' => Str::random(10).'@gmail.com',
                'password' => Hash::make('password'),
                'created_by' => 'admin',
                'deleted_by' => null,
                'updated_by' => 'admin',
                ],
            );
            $qlht2->assignRole('QLHT');
        }
    }
}
