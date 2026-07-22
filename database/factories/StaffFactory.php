<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Role;
use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Staff>
 */
class StaffFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'business_id' => Business::factory(),
            'role_id' => Role::factory(),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
        ];
    }

    public function manager(): static
    {
        return $this->state(fn (array $attributes) => [
            'role_id' => Role::factory()->manager(),
        ]);
    }

    public function driver(): static
    {
        return $this->state(fn (array $attributes) => [
            'role_id' => Role::factory()->driver(),
        ]);
    }
}
