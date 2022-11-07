<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        for ($i=0; $i < 30; $i++) { 
            DB::table('users')->insert(
                [
                'username' => Str::random(10),
                'firstname' => Str::random(10),
                'lastname' => Str::random(10),
                'gender' => rand(0,1),
                'active' => rand(0,1),
                'phone' => '12345678',
                'email' => Str::random(10).'@gmail.com',
                'password' => Hash::make('password'),
                'created_by' => 'admin',
                'deleted_by' => null,
                'updated_by' => 'admin',
                ],
            );
        }
    }
}
