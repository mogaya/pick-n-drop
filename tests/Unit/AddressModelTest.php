<?php

use App\AddressType;
use App\Models\Address;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

test('address exposes the expected relationships', function () {
    $address = new Address;

    expect($address->user())->toBeInstanceOf(BelongsTo::class)
        ->and($address->order())->toBeInstanceOf(BelongsTo::class)
        ->and($address->deliveries())->toBeInstanceOf(HasMany::class);
});

test('address exposes the expected attributes through the model', function () {
    $address = new Address([
        'userId' => 4,
        'orderId' => null,
        'line1' => '12 Kimathi Street',
        'line2' => 'Suite 3',
        'city' => 'Nairobi',
        'postalCode' => '00100',
        'country' => 'Kenya',
        'lat' => '-1.286389',
        'lng' => '36.817223',
        'type' => AddressType::Shipping,
    ]);

    expect($address->userId)->toBe(4)
        ->and($address->orderId)->toBeNull()
        ->and($address->line1)->toBe('12 Kimathi Street')
        ->and($address->line2)->toBe('Suite 3')
        ->and($address->city)->toBe('Nairobi')
        ->and($address->postalCode)->toBe('00100')
        ->and($address->country)->toBe('Kenya')
        ->and($address->lat)->toBe('-1.2863890')
        ->and($address->lng)->toBe('36.8172230')
        ->and($address->type)->toBe(AddressType::Shipping);
});

test('address can belong to an order instead of a user', function () {
    $address = new Address([
        'userId' => null,
        'orderId' => 18,
        'line1' => 'CBD Pickup Desk',
        'city' => 'Nairobi',
        'country' => 'Kenya',
        'type' => AddressType::Pickup,
    ]);

    expect($address->userId)->toBeNull()
        ->and($address->orderId)->toBe(18)
        ->and($address->type)->toBe(AddressType::Pickup);
});
