<?php

uses(Tests\TestCase::class);

use App\InventoryMovementReason;
use App\Models\InventoryMovement;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

test('inventory movement exposes the expected relationships', function () {
    $movement = new InventoryMovement;

    expect($movement->product())->toBeInstanceOf(BelongsTo::class)
        ->and($movement->business())->toBeInstanceOf(BelongsTo::class);
});

test('inventory movement exposes the expected attributes through the model', function () {
    $movement = new InventoryMovement([
        'productId' => 12,
        'businessId' => 3,
        'qtyChange' => -2,
        'reason' => InventoryMovementReason::Sale,
        'referenceId' => 45,
    ]);

    expect($movement->productId)->toBe(12)
        ->and($movement->businessId)->toBe(3)
        ->and($movement->qtyChange)->toBe(-2)
        ->and($movement->reason)->toBe(InventoryMovementReason::Sale)
        ->and($movement->referenceId)->toBe(45);
});

test('inventory movement supports restock and adjustment reasons', function () {
    $restock = new InventoryMovement([
        'productId' => 12,
        'businessId' => 3,
        'qtyChange' => 20,
        'reason' => InventoryMovementReason::Restock,
        'referenceId' => 8,
    ]);

    $adjustment = new InventoryMovement([
        'productId' => 12,
        'businessId' => 3,
        'qtyChange' => -1,
        'reason' => InventoryMovementReason::Adjustment,
        'referenceId' => null,
    ]);

    expect($restock->reason)->toBe(InventoryMovementReason::Restock)
        ->and($restock->referenceId)->toBe(8)
        ->and($adjustment->reason)->toBe(InventoryMovementReason::Adjustment)
        ->and($adjustment->referenceId)->toBeNull();
});
