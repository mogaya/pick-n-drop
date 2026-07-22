<?php

namespace App\Models;

use App\OrderFulfillment;
use App\OrderStatus;
use Database\Factories\OrderFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

class Order extends Model
{
    /** @use HasFactory<OrderFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'client_id',
        'clientId',
        'client_name',
        'clientName',
        'business_id',
        'businessId',
        'total_price',
        'totalPrice',
        'status',
        'fulfillment',
        'placed_at',
        'placedAt',
        'fulfilled_at',
        'fulfilledAt',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => OrderStatus::class,
            'fulfillment' => OrderFulfillment::class,
            'total_price' => 'decimal:2',
        ];
    }

    public function getClientIdAttribute(): ?int
    {
        return isset($this->attributes['client_id']) ? (int) $this->attributes['client_id'] : null;
    }

    public function setClientIdAttribute(?int $value): void
    {
        $this->attributes['client_id'] = $value;
    }

    public function getClientNameAttribute(): ?string
    {
        return $this->attributes['client_name'] ?? null;
    }

    public function setClientNameAttribute(?string $value): void
    {
        $this->attributes['client_name'] = $value;
    }

    public function getBusinessIdAttribute(): ?int
    {
        return isset($this->attributes['business_id']) ? (int) $this->attributes['business_id'] : null;
    }

    public function setBusinessIdAttribute(?int $value): void
    {
        $this->attributes['business_id'] = $value;
    }

    public function getTotalPriceAttribute(): ?string
    {
        return $this->attributes['total_price'] ?? null;
    }

    public function setTotalPriceAttribute(string|float|int $value): void
    {
        $this->attributes['total_price'] = $value;
    }

    public function getPlacedAtAttribute(): ?Carbon
    {
        $value = $this->attributes['placed_at'] ?? null;

        return $value === null ? null : $this->asDateTime($value);
    }

    public function setPlacedAtAttribute($value): void
    {
        $this->attributes['placed_at'] = $value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i:s') : $value;
    }

    public function getFulfilledAtAttribute(): ?Carbon
    {
        $value = $this->attributes['fulfilled_at'] ?? null;

        return $value === null ? null : $this->asDateTime($value);
    }

    public function setFulfilledAtAttribute($value): void
    {
        $this->attributes['fulfilled_at'] = $value === null ? null : ($value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i:s') : $value);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class, 'business_id');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function delivery(): HasOne
    {
        return $this->hasOne(Delivery::class);
    }

    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
