<?php

namespace App\Models;

use App\AddressType;
use Database\Factories\AddressFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Address extends Model
{
    /** @use HasFactory<AddressFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'userId',
        'order_id',
        'orderId',
        'line1',
        'line2',
        'city',
        'postal_code',
        'postalCode',
        'country',
        'lat',
        'lng',
        'type',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'lat' => 'decimal:7',
            'lng' => 'decimal:7',
            'type' => AddressType::class,
        ];
    }

    public function getUserIdAttribute(): ?int
    {
        return isset($this->attributes['user_id']) ? (int) $this->attributes['user_id'] : null;
    }

    public function setUserIdAttribute(?int $value): void
    {
        $this->attributes['user_id'] = $value;
    }

    public function getOrderIdAttribute(): ?int
    {
        return isset($this->attributes['order_id']) ? (int) $this->attributes['order_id'] : null;
    }

    public function setOrderIdAttribute(?int $value): void
    {
        $this->attributes['order_id'] = $value;
    }

    public function getPostalCodeAttribute(): ?string
    {
        return $this->attributes['postal_code'] ?? null;
    }

    public function setPostalCodeAttribute(?string $value): void
    {
        $this->attributes['postal_code'] = $value;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function deliveries(): HasMany
    {
        return $this->hasMany(Delivery::class);
    }
}
