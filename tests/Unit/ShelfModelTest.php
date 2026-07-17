<?php

uses(Tests\TestCase::class);

use App\Models\Shelf;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

test('shelf exposes the expected relationships', function () {
    $shelf = new Shelf;

    expect($shelf->occupiedBusiness())->toBeInstanceOf(BelongsTo::class)
        ->and($shelf->occupiedProduct())->toBeInstanceOf(BelongsTo::class)
        ->and($shelf->products())->toBeInstanceOf(HasMany::class);
});

test('shelf exposes the expected attributes through the model', function () {
    $shelf = new Shelf([
        'zone' => 'A',
        'index' => 104,
        'occupiedByBusinessId' => 2,
        'occupiedByProductId' => 9,
    ]);

    expect($shelf->zone)->toBe('A')
        ->and($shelf->index)->toBe(104)
        ->and($shelf->occupiedByBusinessId)->toBe(2)
        ->and($shelf->occupiedByProductId)->toBe(9);
});
