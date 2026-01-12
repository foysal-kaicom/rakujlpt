<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalletTransfer extends Model
{
    protected $guarded = [];

    public function fromCandidate()
    {
        return $this->belongsTo(Candidate::class, 'from_candidate_id');
    }

    public function toCandidate()
    {
        return $this->belongsTo(Candidate::class, 'to_candidate_id');
    }
}
