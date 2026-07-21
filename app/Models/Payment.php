<?php

namespace App\Models;

use App\PaymentStatus;
use App\TransactionMethod;
use Database\Factories\PaymentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Payment extends Model
{
    /** @use HasFactory<PaymentFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'userId',
        'business_id',
        'businessId',
        'order_id',
        'orderId',
        'invoice_id',
        'invoiceId',
        'amount_cents',
        'amountCents',
        'currency',
        'method',
        'provider_ref',
        'providerRef',
        'status',
        'processed_at',
        'processedAt',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'method' => TransactionMethod::class,
            'status' => PaymentStatus::class,
            'amount_cents' => 'integer',
        ];
    }

    public function getUserIdAttribute(): ?int
    {
        return isset($this->attributes['user_id']) ? (int) $this->attributes['user_id'] : null;
    }

    public function setUserIdAttribute(?int $value): void
    {
        $this->attributes['user_id'] = $value;
    }

    public function getBusinessIdAttribute(): ?int
    {
        return isset($this->attributes['business_id']) ? (int) $this->attributes['business_id'] : null;
    }

    public function setBusinessIdAttribute(?int $value): void
    {
        $this->attributes['business_id'] = $value;
    }

    public function getOrderIdAttribute(): ?int
    {
        return isset($this->attributes['order_id']) ? (int) $this->attributes['order_id'] : null;
    }

    public function setOrderIdAttribute(?int $value): void
    {
        $this->attributes['order_id'] = $value;
    }

    public function getInvoiceIdAttribute(): ?int
    {
        return isset($this->attributes['invoice_id']) ? (int) $this->attributes['invoice_id'] : null;
    }

    public function setInvoiceIdAttribute(?int $value): void
    {
        $this->attributes['invoice_id'] = $value;
    }

    public function getAmountCentsAttribute(): int
    {
        return isset($this->attributes['amount_cents']) ? (int) $this->attributes['amount_cents'] : 0;
    }

    public function setAmountCentsAttribute(int $value): void
    {
        $this->attributes['amount_cents'] = $value;
    }

    public function getProviderRefAttribute(): ?string
    {
        return $this->attributes['provider_ref'] ?? null;
    }

    public function setProviderRefAttribute(?string $value): void
    {
        $this->attributes['provider_ref'] = $value;
    }

    public function getProcessedAtAttribute(): ?Carbon
    {
        $value = $this->attributes['processed_at'] ?? null;

        return $value === null ? null : $this->asDateTime($value);
    }

    public function setProcessedAtAttribute($value): void
    {
        $this->attributes['processed_at'] = $value === null ? null : ($value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i:s') : $value);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }
}
