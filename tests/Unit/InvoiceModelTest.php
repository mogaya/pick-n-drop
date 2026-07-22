<?php

use App\InvoiceStatus;
use App\Models\Invoice;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

test('invoice exposes the expected relationships', function () {
    $invoice = new Invoice;

    expect($invoice->order())->toBeInstanceOf(BelongsTo::class)
        ->and($invoice->business())->toBeInstanceOf(BelongsTo::class);
});

test('invoice exposes the expected attributes through the model', function () {
    $invoice = new Invoice([
        'businessId' => 3,
        'orderId' => 15,
        'amount' => '3500.00',
        'tax' => '560.00',
        'status' => InvoiceStatus::Issued,
        'issuedAt' => '2026-07-21 09:00:00',
        'paidAt' => null,
        'lineItems' => [
            ['description' => 'Medium plan subscription', 'amount' => 3500],
        ],
    ]);

    expect($invoice->businessId)->toBe(3)
        ->and($invoice->orderId)->toBe(15)
        ->and($invoice->amount)->toBe('3500.00')
        ->and($invoice->tax)->toBe('560.00')
        ->and($invoice->status)->toBe(InvoiceStatus::Issued)
        ->and($invoice->issuedAt->format('Y-m-d H:i:s'))->toBe('2026-07-21 09:00:00')
        ->and($invoice->paidAt)->toBeNull()
        ->and($invoice->lineItems)->toBe([
            ['description' => 'Medium plan subscription', 'amount' => 3500],
        ]);
});

test('invoice can exist independently of an order', function () {
    $invoice = new Invoice([
        'businessId' => 1,
        'orderId' => null,
        'amount' => '7000.00',
        'tax' => '1120.00',
        'status' => InvoiceStatus::Draft,
        'lineItems' => [
            ['description' => 'Shelf rental — July', 'amount' => 7000],
        ],
    ]);

    expect($invoice->orderId)->toBeNull()
        ->and($invoice->status)->toBe(InvoiceStatus::Draft);
});
