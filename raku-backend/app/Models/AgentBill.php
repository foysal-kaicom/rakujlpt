<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class AgentBill extends Model
{
    protected $guarded=[];
    
    protected $casts = [
        'billing_month' => 'integer',
        'billing_year' => 'integer',
        'commission_amount' => 'integer',
        'billed_at' => 'datetime',
    ];

    /** Relationships */
    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    /** Scopes */
    public function scopeForAgent(Builder $query, int $agentId)
    {
        return $query->where('agent_id', $agentId);
    }

    public function scopeForPeriod(Builder $query, int $year, int $month)
    {
        return $query->where('billing_year', $year)
            ->where('billing_month', $month);
    }
}
