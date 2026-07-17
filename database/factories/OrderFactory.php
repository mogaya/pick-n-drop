<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Order;
use App\Models\User;
use App\OrderFulfillment;
use App\OrderStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
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
            'client_id' => User::factory(),
            'client_name' => null,
            'total_price' => fake()->randomFloat(2, 500, 10000),
            'status' => fake()->randomElement(OrderStatus::cases()),
            'fulfillment' => fake()->randomElement(OrderFulfillment::cases()),
            'placed_at' => now(),
            'fulfilled_at' => null,
            'delivery_id' => null,
            'invoice_id' => null,
            'payment_id' => null,
        ];
    }

    public function forGuestClient(string $name): static
    {
        return $this->state(fn (array $attributes) => [
            'client_id' => null,
            'client_name' => $name,
        ]);
    }
}
