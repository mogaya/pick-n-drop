<?php

namespace Database\Factories;

use App\AddressType;
use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'order_id' => null,
            'line1' => fake()->streetAddress(),
            'line2' => fake()->optional()->secondaryAddress(),
            'city' => fake()->city(),
            'postal_code' => fake()->postcode(),
            'country' => 'Kenya',
            'lat' => fake()->latitude(-1.5, 1.5),
            'lng' => fake()->longitude(36.5, 37.5),
            'type' => AddressType::Shipping,
        ];
    }

    public function forOrder(int $orderId): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => null,
            'order_id' => $orderId,
        ]);
    }

    public function billing(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => AddressType::Billing,
        ]);
    }

    public function pickup(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => AddressType::Pickup,
        ]);
    }
}
