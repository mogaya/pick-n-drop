<?php

namespace Database\Factories;

use App\Models\Role;
use App\Permission;
use App\StaffRole;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Role>
 */
class RoleFactory extends Factory
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
            'name' => $role->value.'-'.fake()->unique()->numerify('###'),
            'permissions' => self::defaultPermissionsFor($role),
        ];
    }

    public function manager(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => StaffRole::Manager->value,
            'permissions' => [
                Permission::Orders->value,
                Permission::Deliveries->value,
                Permission::Inventory->value,
                Permission::Staff->value,
            ],
        ]);
    }

    public function picker(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => StaffRole::Picker->value,
            'permissions' => [
                Permission::Orders->value,
                Permission::Inventory->value,
            ],
        ]);
    }

    public function packer(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => StaffRole::Packer->value,
            'permissions' => [
                Permission::Orders->value,
            ],
        ]);
    }

    public function driver(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => StaffRole::Driver->value,
            'permissions' => [
                Permission::Deliveries->value,
            ],
        ]);
    }

    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'admin',
            'permissions' => [
                Permission::Orders->value,
                Permission::Deliveries->value,
                Permission::Inventory->value,
                Permission::Staff->value,
                Permission::Businesses->value,
                Permission::Shelves->value,
                Permission::Billing->value,
            ],
        ]);
    }

    /**
     * @return list<string>
     */
    private static function defaultPermissionsFor(StaffRole $role): array
    {
        return match ($role) {
            StaffRole::Manager => [
                Permission::Orders->value,
                Permission::Deliveries->value,
                Permission::Inventory->value,
                Permission::Staff->value,
            ],
            StaffRole::Picker => [
                Permission::Orders->value,
                Permission::Inventory->value,
            ],
            StaffRole::Packer => [
                Permission::Orders->value,
            ],
            StaffRole::Driver => [
                Permission::Deliveries->value,
            ],
        };
    }
}
