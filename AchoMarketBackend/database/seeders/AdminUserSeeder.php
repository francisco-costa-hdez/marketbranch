<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AdminUser::create([
            'name' => 'ismaelcg',
            'password' => encrypt('1234'),
        ]);
        AdminUser::create([
            'name' => 'bienveca',
            'password' => encrypt('1234'),
        ]);
        AdminUser::create([
            'name' => 'pacoch',
            'password' => encrypt('1234'),
        ]);
    }
}
