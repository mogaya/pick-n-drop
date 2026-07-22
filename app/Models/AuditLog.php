<?php

namespace App\Models;

use Database\Factories\AuditLogFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class AuditLog extends Model
{
    /** @use HasFactory<AuditLogFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'actor_id',
        'actorId',
        'action',
        'target_type',
        'targetType',
        'target_id',
        'targetId',
        'details',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'details' => 'array',
        ];
    }

    public function getActorIdAttribute(): ?int
    {
        return isset($this->attributes['actor_id']) ? (int) $this->attributes['actor_id'] : null;
    }

    public function setActorIdAttribute(?int $value): void
    {
        $this->attributes['actor_id'] = $value;
    }

    public function getTargetTypeAttribute(): ?string
    {
        return $this->attributes['target_type'] ?? null;
    }

    public function setTargetTypeAttribute(?string $value): void
    {
        $this->attributes['target_type'] = $value;
    }

    public function getTargetIdAttribute(): ?int
    {
        return isset($this->attributes['target_id']) ? (int) $this->attributes['target_id'] : null;
    }

    public function setTargetIdAttribute(?int $value): void
    {
        $this->attributes['target_id'] = $value;
    }

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    public function target(): MorphTo
    {
        return $this->morphTo();
    }
}
