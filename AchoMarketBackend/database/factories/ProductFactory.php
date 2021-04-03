<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'price' => $this->faker->randomFloat(2,1,10000),
            'description' => $this->faker->paragraph(),
            'discount'=> 0,
            'stock' => 300,
            'availability' => 290,
            'shop_id' => $this->faker->randomElement([1,2,3,4,5]),
            'subcategory_id' => $this->faker->randomElement([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]),
            'trademark_id' => null,
        ];
    }
}
