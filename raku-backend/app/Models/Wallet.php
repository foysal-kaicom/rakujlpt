<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    protected $guarded = [];

    protected $casts = [
        'balance' => 'decimal:2',
    ];

    public function getBalanceAttribute($value)
    {
        return (int) $value; // 10.00 → 10
    }

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
}
