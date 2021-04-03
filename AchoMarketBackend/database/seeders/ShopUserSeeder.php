<?php

namespace Database\Seeders;

use App\Models\ShopUser;
use Database\Factories\ShopUserFactory;
use Illuminate\Database\Seeder;

class ShopUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ShopUser::factory(5)->create();
    }
}
