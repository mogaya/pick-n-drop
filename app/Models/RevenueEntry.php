<?php

namespace App\Models;

use Database\Factories\RevenueEntryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RevenueEntry extends Model
{
    /** @use HasFactory<RevenueEntryFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'month',
        'value_cents',
        'valueCents',
        'business_id',
        'businessId',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'value_cents' => 'integer',
        ];
    }

    public function getValueCentsAttribute(): int
    {
        return isset($this->attributes['value_cents']) ? (int) $this->attributes['value_cents'] : 0;
    }

    public function setValueCentsAttribute(int $value): void
    {
        $this->attributes['value_cents'] = $value;
    }

    public function getBusinessIdAttribute(): ?int
    {
        return isset($this->attributes['business_id']) ? (int) $this->attributes['business_id'] : null;
    }

    public function setBusinessIdAttribute(?int $value): void
    {
        $this->attributes['business_id'] = $value;
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class, 'business_id');
    }
}
