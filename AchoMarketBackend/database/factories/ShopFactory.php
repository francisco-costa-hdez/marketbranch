<?php

namespace Database\Factories;

use App\Models\Shop;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShopFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Shop::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
           'name' => $this->faker->name(),
           'description' => $this->faker->paragraph(),
           'address' => $this->faker->sentence(),
           'tlf' => $this->faker->randomNumber(9),
           'email' => $this->faker->safeEmail,   
           'shop_user_id' => $this->faker->unique()->randomElement([1,2,3,4,5])
        ];
    }
}
