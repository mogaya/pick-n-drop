<?php

namespace Database\Factories;

use App\InventoryMovementReason;
use App\Models\Business;
use App\Models\InventoryMovement;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<InventoryMovement>
 */
class InventoryMovementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'business_id' => Business::factory(),
            'qty_change' => fake()->numberBetween(-20, 50),
            'reason' => fake()->randomElement(InventoryMovementReason::cases()),
            'reference_id' => null,
        ];
    }

    public function sale(?int $orderId = null): static
    {
        return $this->state(fn (array $attributes) => [
            'qty_change' => -abs($attributes['qty_change'] ?? fake()->numberBetween(1, 10)),
            'reason' => InventoryMovementReason::Sale,
            'reference_id' => $orderId ?? fake()->numberBetween(1, 1000),
        ]);
    }

    public function restock(?int $invoiceId = null): static
    {
        return $this->state(fn (array $attributes) => [
            'qty_change' => abs($attributes['qty_change'] ?? fake()->numberBetween(1, 50)),
            'reason' => InventoryMovementReason::Restock,
            'reference_id' => $invoiceId,
        ]);
    }

    public function adjustment(): static
    {
        return $this->state(fn (array $attributes) => [
            'reason' => InventoryMovementReason::Adjustment,
            'reference_id' => null,
        ]);
    }

    public function transfer(): static
    {
        return $this->state(fn (array $attributes) => [
            'reason' => InventoryMovementReason::Transfer,
        ]);
    }
}
