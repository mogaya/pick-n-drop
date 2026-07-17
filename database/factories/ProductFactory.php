<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
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
            'sku' => fake()->unique()->bothify('SKU-####'),
            'name' => fake()->words(3, true),
            'price' => fake()->randomFloat(2, 100, 10000),
            'category' => fake()->randomElement(['beauty', 'fashion', 'food', 'electronics']),
            'stock' => fake()->numberBetween(0, 100),
            'shelf_id' => fake()->regexify('[A-Z]-[0-9]{3}'),
            'image_url' => fake()->imageUrl(),
            'description' => fake()->sentence(),
            'metadata' => [
                'weight_grams' => fake()->numberBetween(50, 2000),
            ],
        ];
    }

    public function withoutSku(): static
    {
        return $this->state(fn (array $attributes) => [
            'sku' => null,
        ]);
    }
}
