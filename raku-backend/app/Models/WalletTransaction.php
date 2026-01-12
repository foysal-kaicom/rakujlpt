<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalletTransaction extends Model
{
    protected $guarded = [];

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    public function rule()
    {
        return $this->belongsTo(CoinRule::class, 'coin_rule_id');
    }
}
