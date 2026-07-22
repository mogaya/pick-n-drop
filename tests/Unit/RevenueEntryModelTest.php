<?php

use App\Models\RevenueEntry;
use Database\Factories\RevenueEntryFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

test('revenue entry exposes the expected relationships', function () {
    $entry = new RevenueEntry;

    expect($entry->business())->toBeInstanceOf(BelongsTo::class);
});

test('revenue entry exposes the expected attributes through the model', function () {
    $entry = new RevenueEntry([
        'month' => 'Nov',
        'valueCents' => 14200000,
        'businessId' => null,
    ]);

    expect($entry->month)->toBe('Nov')
        ->and($entry->valueCents)->toBe(14200000)
        ->and($entry->businessId)->toBeNull();
});

test('revenue entry can be scoped to a business for dashboards', function () {
    $entry = new RevenueEntry([
        'month' => 'Apr',
        'valueCents' => 28700000,
        'businessId' => 3,
    ]);

    expect($entry->businessId)->toBe(3)
        ->and($entry->month)->toBe('Apr')
        ->and($entry->valueCents)->toBe(28700000);
});

test('revenue entry mock series matches dashboard revenueByMonth', function () {
    $series = RevenueEntryFactory::mockSeries();

    expect($series)->toHaveCount(6)
        ->and($series[0]->month)->toBe('Nov')
        ->and($series[0]->valueCents)->toBe(14200000)
        ->and($series[5]->month)->toBe('Apr')
        ->and($series[5]->valueCents)->toBe(28700000);
});
