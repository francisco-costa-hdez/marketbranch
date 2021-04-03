<?php

namespace Database\Factories;

use App\Models\ShopUser;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ShopUserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ShopUser::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'NIF' => Str::random(9),
            'admin_name' => $this->faker->name(),
            'email'  => $this->faker->email,
            'profile_img' => $this->faker->sentence(),
            'password' => Str::random(15),
        ];
    }
}
