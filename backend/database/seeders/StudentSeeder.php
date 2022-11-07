<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Nette\Utils\Random;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('students')->truncate();
        for ($i=0; $i < 30; $i++) { 
            DB::table('students')->insert(
                [
                'username' => Str::random(10),
                'firstname' => Str::random(10),
                'lastname' => Str::random(10),
                'phone' => '12345678',
                'email' => Str::random(10).'@gmail.com',
                'gender' => rand(0,1),
                'identification' => Str::random(10),
                'address' => Str::random(10),
                'school_id' => rand(0,9),
                'created_by' => 'admin',
                'deleted_by' => null,
                'updated_by' => 'admin',
                ],
            );
        }
    }
}
