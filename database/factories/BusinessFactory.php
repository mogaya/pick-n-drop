<?php

namespace Database\Factories;

use App\Models\Business;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Business>
 */
class BusinessFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'category' => fake()->randomElement(['beauty', 'fashion', 'food', 'electronics']),
            'plan' => fake()->randomElement(['small', 'medium', 'Large']),
            'status' => 'active',
            'joined_at' => now(),
            'owner_id' => null,
            'shelves' => [fake()->regexify('[A-Z]-[0-9]{3}')],
        ];
    }
}
