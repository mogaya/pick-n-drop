<?php

uses(Tests\TestCase::class);

use App\Models\Order;
use App\OrderFulfillment;
use App\OrderStatus;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

test('order exposes the expected relationships', function () {
    $order = new Order;

    expect($order->orderItems())->toBeInstanceOf(HasMany::class)
        ->and($order->business())->toBeInstanceOf(BelongsTo::class)
        ->and($order->client())->toBeInstanceOf(BelongsTo::class)
        ->and($order->invoice())->toBeInstanceOf(HasOne::class)
        ->and($order->delivery())->toBeInstanceOf(HasOne::class)
        ->and($order->payment())->toBeInstanceOf(HasOne::class);
});

test('order exposes the expected attributes through the model', function () {
    $order = new Order([
        'clientId' => 5,
        'clientName' => 'Njeri Kamau',
        'businessId' => 2,
        'totalPrice' => '2450.00',
        'status' => OrderStatus::Packed,
        'fulfillment' => OrderFulfillment::Delivery,
        'placedAt' => '2026-07-17 10:00:00',
        'fulfilledAt' => null,
        'deliveryId' => 11,
        'invoiceId' => 8,
        'paymentId' => 3,
    ]);

    expect($order->clientId)->toBe(5)
        ->and($order->clientName)->toBe('Njeri Kamau')
        ->and($order->businessId)->toBe(2)
        ->and($order->totalPrice)->toBe('2450.00')
        ->and($order->status)->toBe(OrderStatus::Packed)
        ->and($order->fulfillment)->toBe(OrderFulfillment::Delivery)
        ->and($order->placedAt->format('Y-m-d H:i:s'))->toBe('2026-07-17 10:00:00')
        ->and($order->fulfilledAt)->toBeNull()
        ->and($order->deliveryId)->toBe(11)
        ->and($order->invoiceId)->toBe(8)
        ->and($order->paymentId)->toBe(3);
});

test('order supports guest clients without a registered user', function () {
    $order = new Order([
        'clientId' => null,
        'clientName' => 'Walk-in Customer',
        'businessId' => 1,
        'totalPrice' => '1800.00',
        'status' => OrderStatus::New,
        'fulfillment' => OrderFulfillment::Pickup,
        'placedAt' => '2026-07-17 12:00:00',
    ]);

    expect($order->clientId)->toBeNull()
        ->and($order->clientName)->toBe('Walk-in Customer');
});
