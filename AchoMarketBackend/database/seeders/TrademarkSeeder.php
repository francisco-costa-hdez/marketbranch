<?php

namespace Database\Seeders;

use App\Models\Trademark;
use Database\Factories\TrademarkFactory;
use Illuminate\Database\Seeder;

class TrademarkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Trademark::factory(10)->create();

    }
}
