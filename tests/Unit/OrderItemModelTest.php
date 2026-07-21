<?php

uses(Tests\TestCase::class);

use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

test('order item exposes the expected relationships', function () {
    $orderItem = new OrderItem;

    expect($orderItem->order())->toBeInstanceOf(BelongsTo::class)
        ->and($orderItem->product())->toBeInstanceOf(BelongsTo::class);
});

test('order item exposes the expected attributes through the model', function () {
    $orderItem = new OrderItem([
        'orderId' => 12,
        'productId' => 4,
        'qty' => 2,
        'unitPrice' => '1225.00',
        'lineTotal' => '2450.00',
    ]);

    expect($orderItem->orderId)->toBe(12)
        ->and($orderItem->productId)->toBe(4)
        ->and($orderItem->qty)->toBe(2)
        ->and($orderItem->unitPrice)->toBe('1225.00')
        ->and($orderItem->lineTotal)->toBe('2450.00');
});
