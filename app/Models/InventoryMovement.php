<?php

namespace App\Models;

use App\InventoryMovementReason;
use Database\Factories\InventoryMovementFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InventoryMovement extends Model
{
    /** @use HasFactory<InventoryMovementFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'product_id',
        'productId',
        'business_id',
        'businessId',
        'qty_change',
        'qtyChange',
        'reason',
        'reference_id',
        'referenceId',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'qty_change' => 'integer',
            'reason' => InventoryMovementReason::class,
        ];
    }

    public function getProductIdAttribute(): ?int
    {
        return isset($this->attributes['product_id']) ? (int) $this->attributes['product_id'] : null;
    }

    public function setProductIdAttribute(?int $value): void
    {
        $this->attributes['product_id'] = $value;
    }

    public function getBusinessIdAttribute(): ?int
    {
        return isset($this->attributes['business_id']) ? (int) $this->attributes['business_id'] : null;
    }

    public function setBusinessIdAttribute(?int $value): void
    {
        $this->attributes['business_id'] = $value;
    }

    public function getQtyChangeAttribute(): ?int
    {
        return isset($this->attributes['qty_change']) ? (int) $this->attributes['qty_change'] : null;
    }

    public function setQtyChangeAttribute(int $value): void
    {
        $this->attributes['qty_change'] = $value;
    }

    public function getReferenceIdAttribute(): ?int
    {
        return isset($this->attributes['reference_id']) ? (int) $this->attributes['reference_id'] : null;
    }

    public function setReferenceIdAttribute(?int $value): void
    {
        $this->attributes['reference_id'] = $value;
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class, 'business_id');
    }
}
