<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Shelf;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Shelf>
 */
class ShelfFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'zone' => fake()->randomElement(['A', 'B', 'C', 'D']),
            'index' => fake()->numberBetween(100, 999),
            'occupied_by_business_id' => null,
            'occupied_by_product_id' => null,
        ];
    }

    public function occupiedBy(Business $business): static
    {
        return $this->state(fn (array $attributes) => [
            'occupied_by_business_id' => $business->id,
        ]);
    }
}
