<?php

namespace Database\Factories;

use App\Models\ClientUser;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ClientUserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ClientUser::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail,
            'tlf' => $this->faker->randomNumber(9),
            'profile_img' => $this->faker->sentence(),
            'address'=> $this->faker->address,
            'password' => Str::random(15)
        ];
    }
}
