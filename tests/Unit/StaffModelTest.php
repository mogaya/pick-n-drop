<?php

uses(Tests\TestCase::class);

use App\Models\Staff;
use App\StaffRole;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

test('staff exposes the expected relationships', function () {
    $staff = new Staff;

    expect($staff->business())->toBeInstanceOf(BelongsTo::class);
});

test('staff exposes the expected attributes through the model', function () {
    $staff = new Staff([
        'name' => 'Amina Yusuf',
        'email' => 'amina@pickndrop.test',
        'phone' => '254712345678',
        'role' => StaffRole::Packer,
        'businessId' => 4,
        'permissions' => ['orders'],
    ]);

    expect($staff->name)->toBe('Amina Yusuf')
        ->and($staff->email)->toBe('amina@pickndrop.test')
        ->and($staff->phone)->toBe('254712345678')
        ->and($staff->role)->toBe(StaffRole::Packer)
        ->and($staff->businessId)->toBe(4)
        ->and($staff->permissions)->toBe(['orders']);
});

test('staff permissions can grant order and delivery access by role', function () {
    $manager = new Staff([
        'name' => 'Team Lead',
        'email' => 'lead@pickndrop.test',
        'role' => StaffRole::Manager,
        'businessId' => 1,
        'permissions' => ['orders', 'deliveries', 'inventory', 'staff'],
    ]);

    $driver = new Staff([
        'name' => 'Courier',
        'email' => 'courier@pickndrop.test',
        'role' => StaffRole::Driver,
        'businessId' => 1,
        'permissions' => ['deliveries'],
    ]);

    expect($manager->permissions)->toContain('orders', 'deliveries')
        ->and($driver->permissions)->toBe(['deliveries'])
        ->and($driver->permissions)->not->toContain('orders');
});
