<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\RevenueEntry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RevenueEntry>
 */
class RevenueEntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'month' => fake()->randomElement(['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']),
            'value_cents' => fake()->numberBetween(10000000, 30000000),
            'business_id' => null,
        ];
    }

    public function forBusiness(Business $business): static
    {
        return $this->state(function (array $attributes) use ($business) {
            return [
                'business_id' => $business->id,
            ];
        });
    }

    /**
     * Platform-wide series matching mock-data `revenueByMonth`.
     *
     * @return list<RevenueEntry>
     */
    public static function mockSeries(): array
    {
        $months = [
            ['month' => 'Nov', 'value' => 142000],
            ['month' => 'Dec', 'value' => 168000],
            ['month' => 'Jan', 'value' => 195000],
            ['month' => 'Feb', 'value' => 210000],
            ['month' => 'Mar', 'value' => 248000],
            ['month' => 'Apr', 'value' => 287000],
        ];

        $series = [];

        foreach ($months as $entry) {
            $series[] = new RevenueEntry([
                'month' => $entry['month'],
                'valueCents' => $entry['value'] * 100,
                'businessId' => null,
            ]);
        }

        return $series;
    }
}
