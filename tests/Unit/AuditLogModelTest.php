<?php

use App\Models\AuditLog;
use App\Models\Business;
use App\Models\Order;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

test('audit log exposes the expected relationships', function () {
    $log = new AuditLog;

    expect($log->actor())->toBeInstanceOf(BelongsTo::class)
        ->and($log->target())->toBeInstanceOf(MorphTo::class);
});

test('audit log exposes the expected attributes through the model', function () {
    $log = new AuditLog([
        'actorId' => 5,
        'action' => 'status_changed',
        'targetType' => Order::class,
        'targetId' => 42,
        'details' => [
            'from' => 'new',
            'to' => 'packed',
        ],
    ]);

    expect($log->actorId)->toBe(5)
        ->and($log->action)->toBe('status_changed')
        ->and($log->targetType)->toBe(Order::class)
        ->and($log->targetId)->toBe(42)
        ->and($log->details)->toBe([
            'from' => 'new',
            'to' => 'packed',
        ]);
});

test('audit log can target a business for admin traceability', function () {
    $log = new AuditLog([
        'actorId' => 1,
        'action' => 'suspended',
        'targetType' => Business::class,
        'targetId' => 7,
        'details' => ['reason' => 'overdue subscription'],
    ]);

    expect($log->targetType)->toBe(Business::class)
        ->and($log->targetId)->toBe(7)
        ->and($log->action)->toBe('suspended');
});
