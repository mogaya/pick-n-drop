<?php

namespace Database\Factories;

use App\Models\AuditLog;
use App\Models\Business;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AuditLog>
 */
class AuditLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'actor_id' => User::factory(),
            'action' => fake()->randomElement([
                'created',
                'updated',
                'deleted',
                'status_changed',
                'login',
            ]),
            'target_type' => null,
            'target_id' => null,
            'details' => null,
        ];
    }

    public function forActor(User $actor): static
    {
        return $this->state(function (array $attributes) use ($actor) {
            return [
                'actor_id' => $actor->id,
            ];
        });
    }

    public function forOrder(Order $order): static
    {
        return $this->state(function (array $attributes) use ($order) {
            return [
                'target_type' => Order::class,
                'target_id' => $order->id,
            ];
        });
    }

    public function forBusiness(Business $business): static
    {
        return $this->state(function (array $attributes) use ($business) {
            return [
                'target_type' => Business::class,
                'target_id' => $business->id,
            ];
        });
    }
}
