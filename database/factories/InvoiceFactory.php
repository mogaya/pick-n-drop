<?php

namespace Database\Factories;

use App\InvoiceStatus;
use App\Models\Business;
use App\Models\Invoice;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amount = fake()->randomFloat(2, 1000, 50000);
        $tax = round($amount * 0.16, 2);

        return [
            'business_id' => Business::factory(),
            'order_id' => null,
            'amount' => $amount,
            'tax' => $tax,
            'status' => fake()->randomElement(InvoiceStatus::cases()),
            'issued_at' => now(),
            'paid_at' => null,
            'line_items' => [
                [
                    'description' => fake()->words(3, true),
                    'amount' => $amount,
                ],
            ],
        ];
    }

    public function forOrder(Order $order): static
    {
        return $this->state(fn (array $attributes) => [
            'business_id' => $order->business_id,
            'order_id' => $order->id,
        ]);
    }

    public function standalone(): static
    {
        return $this->state(fn (array $attributes) => [
            'order_id' => null,
        ]);
    }
}
