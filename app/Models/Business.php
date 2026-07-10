<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'category',
        'plan',
        'status',
        'joined_at',
        'joinedAt',
        'owner_id',
        'ownerId',
        'shelves',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'joined_at' => 'datetime',
            'shelves' => 'array',
            'plan' => 'string',
            'status' => 'string',
        ];
    }

    public function getOwnerIdAttribute(): ?int
    {
        return isset($this->attributes['owner_id']) ? (int) $this->attributes['owner_id'] : null;
    }

    public function setOwnerIdAttribute(?int $value): void
    {
        $this->attributes['owner_id'] = $value;
    }

    public function getJoinedAtAttribute($value)
    {
        return $value === null ? null : $this->asDateTime($value);
    }

    public function setJoinedAtAttribute($value): void
    {
        $this->attributes['joined_at'] = $value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i:s') : $value;
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function staff(): HasMany
    {
        return $this->hasMany(Staff::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
