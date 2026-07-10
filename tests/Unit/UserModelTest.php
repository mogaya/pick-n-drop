<?php

uses(TestCase::class);

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

test('user exposes the expected profile relationships', function () {
    $user = new User;

    expect($user->addresses())->toBeInstanceOf(HasMany::class)
        ->and($user->business())->toBeInstanceOf(BelongsTo::class)
        ->and($user->orders())->toBeInstanceOf(HasMany::class)
        ->and($user->paymentMethods())->toBeInstanceOf(HasMany::class);
});

test('user exposes the requested profile attributes through the model', function () {
    $user = new User([
        'name' => 'Ada Lovelace',
        'email' => 'ada@example.com',
        'password' => 'hashed-secret',
        'role' => 'business',
        'phone' => '254700000000',
        'businessId' => 7,
    ]);

    expect($user->getAttribute('password'))->toStartWith('$2y$')
        ->and($user->businessId)->toBe(7)
        ->and($user->role)->toBe('business')
        ->and($user->phone)->toBe('254700000000');
});
