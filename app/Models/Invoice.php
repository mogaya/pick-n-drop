<?php

namespace App\Models;

use App\InvoiceStatus;
use Database\Factories\InvoiceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Invoice extends Model
{
    /** @use HasFactory<InvoiceFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'business_id',
        'businessId',
        'order_id',
        'orderId',
        'amount',
        'tax',
        'status',
        'issued_at',
        'issuedAt',
        'paid_at',
        'paidAt',
        'line_items',
        'lineItems',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => InvoiceStatus::class,
            'amount' => 'decimal:2',
            'tax' => 'decimal:2',
            'line_items' => 'array',
        ];
    }

    public function getBusinessIdAttribute(): ?int
    {
        return isset($this->attributes['business_id']) ? (int) $this->attributes['business_id'] : null;
    }

    public function setBusinessIdAttribute(?int $value): void
    {
        $this->attributes['business_id'] = $value;
    }

    public function getOrderIdAttribute(): ?int
    {
        return isset($this->attributes['order_id']) ? (int) $this->attributes['order_id'] : null;
    }

    public function setOrderIdAttribute(?int $value): void
    {
        $this->attributes['order_id'] = $value;
    }

    public function getIssuedAtAttribute(): ?Carbon
    {
        $value = $this->attributes['issued_at'] ?? null;

        return $value === null ? null : $this->asDateTime($value);
    }

    public function setIssuedAtAttribute($value): void
    {
        $this->attributes['issued_at'] = $value === null ? null : ($value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i:s') : $value);
    }

    public function getPaidAtAttribute(): ?Carbon
    {
        $value = $this->attributes['paid_at'] ?? null;

        return $value === null ? null : $this->asDateTime($value);
    }

    public function setPaidAtAttribute($value): void
    {
        $this->attributes['paid_at'] = $value === null ? null : ($value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i:s') : $value);
    }

    public function getLineItemsAttribute(): ?array
    {
        return $this->line_items;
    }

    public function setLineItemsAttribute(?array $value): void
    {
        $this->line_items = $value;
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class, 'business_id');
    }
}
