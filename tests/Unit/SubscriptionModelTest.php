<?php

uses(Tests\TestCase::class);

use App\Models\Subscription;
use App\PlanName;
use App\SubscriptionPeriod;
use App\SubscriptionStatus;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

test('subscription exposes the expected relationships', function () {
    $subscription = new Subscription;

    expect($subscription->business())->toBeInstanceOf(BelongsTo::class);
});

test('subscription exposes the expected attributes through the model', function () {
    $subscription = new Subscription([
        'businessId' => 6,
        'planName' => PlanName::Medium,
        'price' => '7000.00',
        'period' => SubscriptionPeriod::Monthly,
        'status' => SubscriptionStatus::Active,
        'startedAt' => '2026-07-01 00:00:00',
        'expiresAt' => '2026-08-01 00:00:00',
    ]);

    expect($subscription->businessId)->toBe(6)
        ->and($subscription->planName)->toBe(PlanName::Medium)
        ->and($subscription->price)->toBe('7000.00')
        ->and($subscription->period)->toBe(SubscriptionPeriod::Monthly)
        ->and($subscription->status)->toBe(SubscriptionStatus::Active)
        ->and($subscription->startedAt->format('Y-m-d H:i:s'))->toBe('2026-07-01 00:00:00')
        ->and($subscription->expiresAt->format('Y-m-d H:i:s'))->toBe('2026-08-01 00:00:00');
});
