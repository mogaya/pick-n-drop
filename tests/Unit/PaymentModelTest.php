<?php

uses(Tests\TestCase::class);

use App\Models\Payment;
use App\PaymentStatus;
use App\TransactionMethod;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

test('payment exposes the expected relationships', function () {
    $payment = new Payment;

    expect($payment->user())->toBeInstanceOf(BelongsTo::class)
        ->and($payment->business())->toBeInstanceOf(BelongsTo::class)
        ->and($payment->order())->toBeInstanceOf(BelongsTo::class)
        ->and($payment->invoice())->toBeInstanceOf(BelongsTo::class);
});

test('payment exposes the expected attributes through the model', function () {
    $payment = new Payment([
        'userId' => 2,
        'businessId' => 5,
        'orderId' => 18,
        'invoiceId' => null,
        'amountCents' => 245000,
        'currency' => 'KES',
        'method' => TransactionMethod::Mpesa,
        'providerRef' => 'MPESA-ABC123',
        'status' => PaymentStatus::Completed,
        'processedAt' => '2026-07-21 15:30:00',
    ]);

    expect($payment->userId)->toBe(2)
        ->and($payment->businessId)->toBe(5)
        ->and($payment->orderId)->toBe(18)
        ->and($payment->invoiceId)->toBeNull()
        ->and($payment->amountCents)->toBe(245000)
        ->and($payment->currency)->toBe('KES')
        ->and($payment->method)->toBe(TransactionMethod::Mpesa)
        ->and($payment->providerRef)->toBe('MPESA-ABC123')
        ->and($payment->status)->toBe(PaymentStatus::Completed)
        ->and($payment->processedAt->format('Y-m-d H:i:s'))->toBe('2026-07-21 15:30:00');
});

test('payment can settle an invoice without an order', function () {
    $payment = new Payment([
        'userId' => null,
        'businessId' => 1,
        'orderId' => null,
        'invoiceId' => 9,
        'amountCents' => 700000,
        'currency' => 'KES',
        'method' => TransactionMethod::Stripe,
        'status' => PaymentStatus::Pending,
    ]);

    expect($payment->orderId)->toBeNull()
        ->and($payment->invoiceId)->toBe(9)
        ->and($payment->status)->toBe(PaymentStatus::Pending);
});
