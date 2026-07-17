<?php

namespace App\Models;

use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'sku',
        'name',
        'business_id',
        'businessId',
        'price',
        'category',
        'stock',
        'shelf_id',
        'shelfId',
        'image_url',
        'imageUrl',
        'description',
        'metadata',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:0',
            'stock' => 'integer',
            'metadata' => 'array',
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

    public function getShelfIdAttribute(): ?string
    {
        return $this->attributes['shelf_id'] ?? null;
    }

    public function setShelfIdAttribute(?string $value): void
    {
        $this->attributes['shelf_id'] = $value;
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->attributes['image_url'] ?? null;
    }

    public function setImageUrlAttribute(?string $value): void
    {
        $this->attributes['image_url'] = $value;
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class, 'business_id');
    }

    public function inventoryMovements(): HasMany
    {
        return $this->hasMany(InventoryMovement::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
}
