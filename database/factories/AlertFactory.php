<?php

namespace Database\Factories;

use App\Models\Alert;
use App\Models\Business;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Alert>
 */
class AlertFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'target_user_id' => null,
            'target_business_id' => null,
            'type' => fake()->randomElement(['low_stock', 'subscription_overdue', 'order', 'restock']),
            'message' => fake()->sentence(),
            'meta' => null,
            'read' => false,
        ];
    }

    public function forUser(?User $user = null): static
    {
        return $this->state(fn (array $attributes) => [
            'target_user_id' => $user?->id ?? User::factory(),
            'target_business_id' => null,
        ]);
    }

    public function forBusiness(?Business $business = null): static
    {
        return $this->state(fn (array $attributes) => [
            'target_user_id' => null,
            'target_business_id' => $business?->id ?? Business::factory(),
        ]);
    }

    public function read(): static
    {
        return $this->state(fn (array $attributes) => [
            'read' => true,
        ]);
    }
}
