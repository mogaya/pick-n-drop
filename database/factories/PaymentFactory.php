<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use App\PaymentStatus;
use App\TransactionMethod;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
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
            'business_id' => null,
            'order_id' => Order::factory(),
            'invoice_id' => null,
            'amount_cents' => fake()->numberBetween(10000, 500000),
            'currency' => 'KES',
            'method' => fake()->randomElement(TransactionMethod::cases()),
            'provider_ref' => fake()->unique()->bothify('PAY-########'),
            'status' => PaymentStatus::Completed,
            'processed_at' => now(),
        ];
    }

    public function forMpesa(?string $providerRef = null): static
    {
        return $this->state(fn (array $attributes) => [
            'method' => TransactionMethod::Mpesa,
            'provider_ref' => $providerRef ?? fake()->bothify('MPESA-########'),
        ]);
    }
}
