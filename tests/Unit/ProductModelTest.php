<?php

uses(Tests\TestCase::class);

use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

test('product exposes the expected relationships', function () {
    $product = new Product;

    expect($product->business())->toBeInstanceOf(BelongsTo::class)
        ->and($product->inventoryMovements())->toBeInstanceOf(HasMany::class)
        ->and($product->orderItems())->toBeInstanceOf(HasMany::class)
        ->and($product->cartItems())->toBeInstanceOf(HasMany::class);
});

test('product exposes the expected attributes through the model', function () {
    $product = new Product([
        'sku' => 'SKU-1001',
        'name' => 'Glow Serum',
        'businessId' => 3,
        'price' => '1299',
        'category' => 'beauty',
        'stock' => 12,
        'shelfId' => 'A-104',
        'imageUrl' => 'https://example.com/glow-serum.jpg',
        'description' => 'A lightweight daily serum.',
        'metadata' => ['size' => '30ml'],
    ]);

    expect($product->sku)->toBe('SKU-1001')
        ->and($product->name)->toBe('Glow Serum')
        ->and($product->businessId)->toBe(3)
        ->and($product->price)->toBe('1299')
        ->and($product->category)->toBe('beauty')
        ->and($product->stock)->toBe(12)
        ->and($product->shelfId)->toBe('A-104')
        ->and($product->imageUrl)->toBe('https://example.com/glow-serum.jpg')
        ->and($product->description)->toBe('A lightweight daily serum.')
        ->and($product->metadata)->toBe(['size' => '30ml']);
});
