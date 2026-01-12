<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoinRule extends Model
{
    protected $guarded = [];

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
}
