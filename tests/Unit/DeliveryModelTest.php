<?php

uses(Tests\TestCase::class);

use App\DeliveryStatus;
use App\Models\Delivery;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

test('delivery exposes the expected relationships', function () {
    $delivery = new Delivery;

    expect($delivery->order())->toBeInstanceOf(BelongsTo::class)
        ->and($delivery->address())->toBeInstanceOf(BelongsTo::class)
        ->and($delivery->courier())->toBeInstanceOf(BelongsTo::class);
});

test('delivery exposes the expected attributes through the model', function () {
    $delivery = new Delivery([
        'orderId' => 42,
        'courierId' => 7,
        'status' => DeliveryStatus::OutForDelivery,
        'trackingNumber' => 'TRK-12345678',
        'pickupTime' => '2026-07-21 08:00:00',
        'expectedDeliveryAt' => '2026-07-21 14:00:00',
        'deliveredAt' => null,
        'addressId' => 3,
        'feeCents' => 35000,
    ]);

    expect($delivery->orderId)->toBe(42)
        ->and($delivery->courierId)->toBe(7)
        ->and($delivery->status)->toBe(DeliveryStatus::OutForDelivery)
        ->and($delivery->trackingNumber)->toBe('TRK-12345678')
        ->and($delivery->pickupTime->format('Y-m-d H:i:s'))->toBe('2026-07-21 08:00:00')
        ->and($delivery->expectedDeliveryAt->format('Y-m-d H:i:s'))->toBe('2026-07-21 14:00:00')
        ->and($delivery->deliveredAt)->toBeNull()
        ->and($delivery->addressId)->toBe(3)
        ->and($delivery->feeCents)->toBe(35000);
});
