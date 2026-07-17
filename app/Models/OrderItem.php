<?php

namespace App\Models;

use Database\Factories\OrderItemFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    /** @use HasFactory<OrderItemFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'order_id',
        'orderId',
        'product_id',
        'productId',
        'qty',
        'unit_price',
        'unitPrice',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'qty' => 'integer',
            'unit_price' => 'decimal:2',
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

    public function getProductIdAttribute(): ?int
    {
        return isset($this->attributes['product_id']) ? (int) $this->attributes['product_id'] : null;
    }

    public function setProductIdAttribute(?int $value): void
    {
        $this->attributes['product_id'] = $value;
    }

    public function getUnitPriceAttribute(): ?string
    {
        return $this->attributes['unit_price'] ?? null;
    }

    public function setUnitPriceAttribute(string|float|int $value): void
    {
        $this->attributes['unit_price'] = $value;
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
