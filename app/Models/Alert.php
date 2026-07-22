<?php

namespace App\Models;

use Database\Factories\AlertFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Alert extends Model
{
    /** @use HasFactory<AlertFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'target_user_id',
        'targetUserId',
        'target_business_id',
        'targetBusinessId',
        'type',
        'message',
        'meta',
        'read',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'meta' => 'array',
            'read' => 'boolean',
        ];
    }

    public function getTargetUserIdAttribute(): ?int
    {
        return isset($this->attributes['target_user_id']) ? (int) $this->attributes['target_user_id'] : null;
    }

    public function setTargetUserIdAttribute(?int $value): void
    {
        $this->attributes['target_user_id'] = $value;
    }

    public function getTargetBusinessIdAttribute(): ?int
    {
        return isset($this->attributes['target_business_id']) ? (int) $this->attributes['target_business_id'] : null;
    }

    public function setTargetBusinessIdAttribute(?int $value): void
    {
        $this->attributes['target_business_id'] = $value;
    }

    public function targetUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'target_user_id');
    }

    public function targetBusiness(): BelongsTo
    {
        return $this->belongsTo(Business::class, 'target_business_id');
    }
}
