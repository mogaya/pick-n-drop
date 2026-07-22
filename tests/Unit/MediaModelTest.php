<?php

use App\MediaType;
use App\Models\Media;
use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\MorphTo;

test('media exposes the expected relationships', function () {
    $media = new Media;

    expect($media->owner())->toBeInstanceOf(MorphTo::class);
});

test('media exposes the expected attributes through the model', function () {
    $media = new Media([
        'url' => 'https://picsum.photos/seed/p1/600/600',
        'type' => MediaType::Image,
        'altText' => 'Rosehip Glow Serum',
        'ownerType' => Product::class,
        'ownerId' => 12,
    ]);

    expect($media->url)->toBe('https://picsum.photos/seed/p1/600/600')
        ->and($media->type)->toBe(MediaType::Image)
        ->and($media->altText)->toBe('Rosehip Glow Serum')
        ->and($media->ownerType)->toBe(Product::class)
        ->and($media->ownerId)->toBe(12);
});

test('media can exist without an owner', function () {
    $media = new Media([
        'url' => 'https://example.com/placeholder.jpg',
        'type' => MediaType::Image,
        'altText' => null,
        'ownerType' => null,
        'ownerId' => null,
    ]);

    expect($media->ownerType)->toBeNull()
        ->and($media->ownerId)->toBeNull()
        ->and($media->altText)->toBeNull();
});
