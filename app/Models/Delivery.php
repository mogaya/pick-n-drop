<?php

namespace App\Models;

use App\DeliveryStatus;
use Database\Factories\DeliveryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Delivery extends Model
{
    /** @use HasFactory<DeliveryFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'order_id',
        'orderId',
        'courier_id',
        'courierId',
        'status',
        'tracking_number',
        'trackingNumber',
        'pickup_time',
        'pickupTime',
        'expected_delivery_at',
        'expectedDeliveryAt',
        'delivered_at',
        'deliveredAt',
        'address_id',
        'addressId',
        'fee_cents',
        'feeCents',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => DeliveryStatus::class,
            'fee_cents' => 'integer',
        ];
    }

    public function getOrderIdAttribute(): ?int
    {
        return isset($this->attributes['order_id']) ? (int) $this->attributes['order_id'] : null;
    }

    public function setOrderIdAttribute(?int $value): void
    {
        $this->attributes['order_id'] = $value;
    }

    public function getCourierIdAttribute(): ?int
    {
        return isset($this->attributes['courier_id']) ? (int) $this->attributes['courier_id'] : null;
    }

    public function setCourierIdAttribute(?int $value): void
    {
        $this->attributes['courier_id'] = $value;
    }

    public function getTrackingNumberAttribute(): ?string
    {
        return $this->attributes['tracking_number'] ?? null;
    }

    public function setTrackingNumberAttribute(?string $value): void
    {
        $this->attributes['tracking_number'] = $value;
    }

    public function getPickupTimeAttribute(): ?Carbon
    {
        $value = $this->attributes['pickup_time'] ?? null;

        return $value === null ? null : $this->asDateTime($value);
    }

    public function setPickupTimeAttribute($value): void
    {
        $this->attributes['pickup_time'] = $value === null ? null : ($value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i:s') : $value);
    }

    public function getExpectedDeliveryAtAttribute(): ?Carbon
    {
        $value = $this->attributes['expected_delivery_at'] ?? null;

        return $value === null ? null : $this->asDateTime($value);
    }

    public function setExpectedDeliveryAtAttribute($value): void
    {
        $this->attributes['expected_delivery_at'] = $value === null ? null : ($value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i:s') : $value);
    }

    public function getDeliveredAtAttribute(): ?Carbon
    {
        $value = $this->attributes['delivered_at'] ?? null;

        return $value === null ? null : $this->asDateTime($value);
    }

    public function setDeliveredAtAttribute($value): void
    {
        $this->attributes['delivered_at'] = $value === null ? null : ($value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i:s') : $value);
    }

    public function getAddressIdAttribute(): ?int
    {
        return isset($this->attributes['address_id']) ? (int) $this->attributes['address_id'] : null;
    }

    public function setAddressIdAttribute(?int $value): void
    {
        $this->attributes['address_id'] = $value;
    }

    public function getFeeCentsAttribute(): int
    {
        return isset($this->attributes['fee_cents']) ? (int) $this->attributes['fee_cents'] : 0;
    }

    public function setFeeCentsAttribute(int $value): void
    {
        $this->attributes['fee_cents'] = $value;
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

    public function courier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'courier_id');
    }
}
