<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalletTransaction extends Model
{
    protected $guarded = [];

    protected $casts = [
        'points' => 'decimal:2',
    ];

    public function getPointsAttribute($value)
    {
        return (int) $value; // 10.00 → 10
    }

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    public function rule()
    {
        return $this->belongsTo(CoinRule::class, 'coin_rule_id');
    }
}
