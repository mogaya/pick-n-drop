<?php

uses(Tests\TestCase::class);

use App\Models\Alert;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

test('alert exposes the expected relationships', function () {
    $alert = new Alert;

    expect($alert->targetUser())->toBeInstanceOf(BelongsTo::class)
        ->and($alert->targetBusiness())->toBeInstanceOf(BelongsTo::class);
});

test('alert exposes the expected attributes through the model', function () {
    $alert = new Alert([
        'targetUserId' => 7,
        'targetBusinessId' => null,
        'type' => 'low_stock',
        'message' => 'Organic Honey is below the restock threshold.',
        'meta' => ['productId' => 12, 'quantity' => 2],
        'read' => false,
    ]);

    expect($alert->targetUserId)->toBe(7)
        ->and($alert->targetBusinessId)->toBeNull()
        ->and($alert->type)->toBe('low_stock')
        ->and($alert->message)->toBe('Organic Honey is below the restock threshold.')
        ->and($alert->meta)->toBe(['productId' => 12, 'quantity' => 2])
        ->and($alert->read)->toBeFalse();
});

test('alert can target a business instead of a user', function () {
    $alert = new Alert([
        'targetUserId' => null,
        'targetBusinessId' => 3,
        'type' => 'subscription_overdue',
        'message' => 'Your Medium plan subscription is overdue.',
        'meta' => ['subscriptionId' => 9],
        'read' => true,
    ]);

    expect($alert->targetUserId)->toBeNull()
        ->and($alert->targetBusinessId)->toBe(3)
        ->and($alert->type)->toBe('subscription_overdue')
        ->and($alert->read)->toBeTrue();
});
