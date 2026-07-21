<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Staff;
use App\StaffRole;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Staff>
 */
class StaffFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $role = fake()->randomElement(StaffRole::cases());

        return [
            'business_id' => Business::factory(),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'role' => $role,
            'permissions' => self::defaultPermissionsFor($role),
        ];
    }

    public function manager(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => StaffRole::Manager,
            'permissions' => ['orders', 'deliveries', 'inventory', 'staff'],
        ]);
    }

    public function driver(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => StaffRole::Driver,
            'permissions' => ['deliveries'],
        ]);
    }

    /**
     * @return list<string>
     */
    private static function defaultPermissionsFor(StaffRole $role): array
    {
        return match ($role) {
            StaffRole::Manager => ['orders', 'deliveries', 'inventory', 'staff'],
            StaffRole::Picker => ['orders', 'inventory'],
            StaffRole::Packer => ['orders'],
            StaffRole::Driver => ['deliveries'],
        };
    }
}
