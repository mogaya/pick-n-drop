<?php

use App\Models\Staff;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

test('staff exposes the expected relationships', function () {
    $staff = new Staff;

    expect($staff->business())->toBeInstanceOf(BelongsTo::class)
        ->and($staff->role())->toBeInstanceOf(BelongsTo::class);
});

test('staff exposes the expected attributes through the model', function () {
    $staff = new Staff([
        'name' => 'Amina Yusuf',
        'email' => 'amina@pickndrop.test',
        'phone' => '254712345678',
        'roleId' => 2,
        'businessId' => 4,
    ]);

    expect($staff->name)->toBe('Amina Yusuf')
        ->and($staff->email)->toBe('amina@pickndrop.test')
        ->and($staff->phone)->toBe('254712345678')
        ->and($staff->roleId)->toBe(2)
        ->and($staff->businessId)->toBe(4);
});
