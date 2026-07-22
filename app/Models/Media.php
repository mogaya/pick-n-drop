<?php

namespace App\Models;

use App\MediaType;
use Database\Factories\MediaFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Media extends Model
{
    /** @use HasFactory<MediaFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'url',
        'type',
        'alt_text',
        'altText',
        'owner_type',
        'ownerType',
        'owner_id',
        'ownerId',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'type' => MediaType::class,
        ];
    }

    public function getAltTextAttribute(): ?string
    {
        return $this->attributes['alt_text'] ?? null;
    }

    public function setAltTextAttribute(?string $value): void
    {
        $this->attributes['alt_text'] = $value;
    }

    public function getOwnerTypeAttribute(): ?string
    {
        return $this->attributes['owner_type'] ?? null;
    }

    public function setOwnerTypeAttribute(?string $value): void
    {
        $this->attributes['owner_type'] = $value;
    }

    public function getOwnerIdAttribute(): ?int
    {
        return isset($this->attributes['owner_id']) ? (int) $this->attributes['owner_id'] : null;
    }

    public function setOwnerIdAttribute(?int $value): void
    {
        $this->attributes['owner_id'] = $value;
    }

    public function owner(): MorphTo
    {
        return $this->morphTo();
    }
}
