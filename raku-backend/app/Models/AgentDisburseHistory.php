<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class AgentDisburseHistory extends Model
{
    protected $guarded=[];

    protected $casts = [
        'billing_month' => 'integer',
        'billing_year' => 'integer',
        'payout_amount' => 'integer',
        'paid_at' => 'datetime',
    ];

    /** Relationships */
    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /** Scopes */
    public function scopeForAgent(Builder $query, int $agentId): Builder
    {
        return $query->where('agent_id', $agentId);
    }

    public function scopeForPeriod(Builder $query, int $year, int $month): Builder
    {
        return $query->where('billing_year', $year)
            ->where('billing_month', $month);
    }

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'approved');
    }
}
