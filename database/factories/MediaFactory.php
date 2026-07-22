<?php

namespace Database\Factories;

use App\MediaType;
use App\Models\Business;
use App\Models\Media;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Media>
 */
class MediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'url' => fake()->imageUrl(),
            'type' => MediaType::Image,
            'alt_text' => fake()->optional()->sentence(3),
            'owner_type' => null,
            'owner_id' => null,
        ];
    }

    public function forProduct(Product $product): static
    {
        return $this->state(function (array $attributes) use ($product) {
            return [
                'owner_type' => Product::class,
                'owner_id' => $product->id,
            ];
        });
    }

    public function forBusiness(Business $business): static
    {
        return $this->state(function (array $attributes) use ($business) {
            return [
                'owner_type' => Business::class,
                'owner_id' => $business->id,
            ];
        });
    }

    public function image(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => MediaType::Image,
            ];
        });
    }

    public function video(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => MediaType::Video,
                'url' => fake()->url(),
            ];
        });
    }
}
