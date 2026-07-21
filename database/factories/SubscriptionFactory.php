<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Subscription;
use App\PlanName;
use App\SubscriptionPeriod;
use App\SubscriptionStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $planName = fake()->randomElement(PlanName::cases());
        $period = fake()->randomElement(SubscriptionPeriod::cases());
        $startedAt = now();

        return [
            'business_id' => Business::factory(),
            'plan_name' => $planName,
            'price' => self::priceFor($planName, $period),
            'period' => $period,
            'status' => SubscriptionStatus::Active,
            'started_at' => $startedAt,
            'expires_at' => $period === SubscriptionPeriod::Monthly
                ? $startedAt->copy()->addMonth()
                : $startedAt->copy()->addYear(),
        ];
    }

    private static function priceFor(PlanName $planName, SubscriptionPeriod $period): float
    {
        $monthly = match ($planName) {
            PlanName::Small => 3500,
            PlanName::Medium => 7000,
            PlanName::Large => 12000,
        };

        return $period === SubscriptionPeriod::Yearly ? $monthly * 10 : $monthly;
    }
}
