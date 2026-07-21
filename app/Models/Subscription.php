<?php

namespace App\Models;

use App\PlanName;
use App\SubscriptionPeriod;
use App\SubscriptionStatus;
use Database\Factories\SubscriptionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Subscription extends Model
{
    /** @use HasFactory<SubscriptionFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'business_id',
        'businessId',
        'plan_name',
        'planName',
        'price',
        'period',
        'status',
        'started_at',
        'startedAt',
        'expires_at',
        'expiresAt',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'plan_name' => PlanName::class,
            'period' => SubscriptionPeriod::class,
            'status' => SubscriptionStatus::class,
            'price' => 'decimal:2',
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

    public function getPlanNameAttribute(): ?PlanName
    {
        $value = $this->attributes['plan_name'] ?? null;

        return $value === null ? null : $this->castAttribute('plan_name', $value);
    }

    public function setPlanNameAttribute(PlanName|string|null $value): void
    {
        $this->attributes['plan_name'] = $value instanceof PlanName ? $value->value : $value;
    }

    public function getStartedAtAttribute(): ?Carbon
    {
        $value = $this->attributes['started_at'] ?? null;

        return $value === null ? null : $this->asDateTime($value);
    }

    public function setStartedAtAttribute($value): void
    {
        $this->attributes['started_at'] = $value === null ? null : ($value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i:s') : $value);
    }

    public function getExpiresAtAttribute(): ?Carbon
    {
        $value = $this->attributes['expires_at'] ?? null;

        return $value === null ? null : $this->asDateTime($value);
    }

    public function setExpiresAtAttribute($value): void
    {
        $this->attributes['expires_at'] = $value === null ? null : ($value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i:s') : $value);
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class, 'business_id');
    }
}
