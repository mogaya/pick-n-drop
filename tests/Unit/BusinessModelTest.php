<?php

use App\Models\Business;
use Illuminate\Database\Eloquent\Relations\HasMany;

test('business exposes the expected relationships and business fields', function () {
    $business = new Business([
        'name' => 'PickNDrop',
        'category' => 'logistics',
        'plan' => 'small',
        'status' => 'active',
        'joinedAt' => '2026-07-10 10:00:00',
        'ownerId' => 42,
        'shelves' => ['A1', 'A2'],
    ]);

    expect($business->products())->toBeInstanceOf(HasMany::class)
        ->and($business->inventoryMovements())->toBeInstanceOf(HasMany::class)
        ->and($business->staff())->toBeInstanceOf(HasMany::class)
        ->and($business->invoices())->toBeInstanceOf(HasMany::class)
        ->and($business->orders())->toBeInstanceOf(HasMany::class)
        ->and($business->alerts())->toBeInstanceOf(HasMany::class)
        ->and($business->revenueEntries())->toBeInstanceOf(HasMany::class)
        ->and($business->ownerId)->toBe(42)
        ->and($business->getAttribute('shelves'))->toBe(['A1', 'A2'])
        ->and($business->plan)->toBe('small')
        ->and($business->status)->toBe('active');
});
