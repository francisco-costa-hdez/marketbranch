<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);
        $this->call(ShopUserSeeder::class);
        $this->call(ClientUserSeeder::class);
        $this->call(AdminUserSeeder::class);
        $this->call(ShopSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(SubcategorySeeder::class);
        $this->call(TrademarkSeeder::class);
        $this->call(ProductSeeder::class);
    }
}
