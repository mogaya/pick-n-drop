<?php

namespace App\Models;

use Database\Factories\ShelfFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shelf extends Model
{
    /** @use HasFactory<ShelfFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'zone',
        'index',
        'occupied_by_business_id',
        'occupiedByBusinessId',
        'occupied_by_product_id',
        'occupiedByProductId',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'index' => 'integer',
        ];
    }

    public function getOccupiedByBusinessIdAttribute(): ?int
    {
        return isset($this->attributes['occupied_by_business_id']) ? (int) $this->attributes['occupied_by_business_id'] : null;
    }

    public function setOccupiedByBusinessIdAttribute(?int $value): void
    {
        $this->attributes['occupied_by_business_id'] = $value;
    }

    public function getOccupiedByProductIdAttribute(): ?int
    {
        return isset($this->attributes['occupied_by_product_id']) ? (int) $this->attributes['occupied_by_product_id'] : null;
    }

    public function setOccupiedByProductIdAttribute(?int $value): void
    {
        $this->attributes['occupied_by_product_id'] = $value;
    }

    public function occupiedBusiness(): BelongsTo
    {
        return $this->belongsTo(Business::class, 'occupied_by_business_id');
    }

    public function occupiedProduct(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'occupied_by_product_id');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
