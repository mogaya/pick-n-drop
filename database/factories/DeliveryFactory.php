<?php

namespace Database\Factories;

use App\DeliveryStatus;
use App\Models\Address;
use App\Models\Delivery;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Delivery>
 */
class DeliveryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'courier_id' => null,
            'status' => fake()->randomElement(DeliveryStatus::cases()),
            'tracking_number' => fake()->unique()->bothify('TRK-########'),
            'pickup_time' => now(),
            'expected_delivery_at' => now()->addHours(4),
            'delivered_at' => null,
            'address_id' => Address::factory(),
            'fee_cents' => fake()->numberBetween(20000, 80000),
        ];
    }

    public function withCourier(?User $courier = null): static
    {
        return $this->state(fn (array $attributes) => [
            'courier_id' => $courier?->id ?? User::factory(),
        ]);
    }
}
