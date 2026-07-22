<?php

use App\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;

test('category enum matches the storefront mock data values', function () {
    expect(array_column(Category::cases(), 'value'))->toBe([
        'skincare',
        'haircare',
        'fashion',
        'food',
        'electronics',
        'home',
    ]);
});

test('category exposes a products query scoped to itself', function () {
    expect(Category::Skincare->products())->toBeInstanceOf(Builder::class)
        ->and(Category::Skincare->products()->getModel())->toBeInstanceOf(Product::class);
});
