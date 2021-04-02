<?php

namespace Database\Seeders;

use App\Models\ClientUser;
use Illuminate\Database\Seeder;

class ClientUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ClientUser::factory(3)->create();
    }
}
