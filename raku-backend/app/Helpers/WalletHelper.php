<?php

use App\Models\Wallet;
use App\Models\Roadmap;
use App\Models\CoinRule;
use App\Models\Candidate;
use App\Models\RoadmapUnlock;
use App\Models\WalletTransaction;
use Illuminate\Support\Facades\DB;





if (!function_exists('walletTransaction')) {

    /**
     * Unified wallet transaction handler
     */
    function walletTransaction(
        Candidate $candidate,
        ?string $action = null,
        $reference = null,
        ?float $overridePoints = null,
        ?string $forceType = null, // credit | debit
        ?string $remarks = null
    ): bool {

        $rule = null;
        $type = $forceType;

        // Rule based transaction
        if ($action) {
            $rule = CoinRule::where('action', $action)
                ->where('status', true)
                ->first();

            if (!$rule) {
                throw new Exception('Coin rule not found');
            }

            $type = $rule->type;         // earn | spend
            $type = $type === 'earn' ? 'credit' : 'debit';

            if (!walletCanApply($candidate, $rule, $reference)) {
                throw new Exception('This action has already been applied');
            }
        }

        // Points resolve
  
        $points = $overridePoints ?? ($rule->points_min ?? 0);

        if ($points <= 0) {
            throw new Exception('Invalid wallet points');
        }

        $wallet = Wallet::firstOrCreate([
            'candidate_id' => $candidate->id
        ]);

        if ($type === 'debit' && $wallet->balance < $points) {
            throw new Exception('Insufficient wallet balance');
        }

  
        // Transaction
     
        DB::transaction(function () use (
            $wallet,
            $candidate,
            $rule,
            $type,
            $points,
            $reference,
            $remarks
        ) {

            if ($type === 'credit') {
                $wallet->increment('balance', $points);
            } else {
                $wallet->decrement('balance', $points);
            }

            WalletTransaction::create([
                'candidate_id' => $candidate->id,
                'coin_rule_id' => $rule?->id,
                'type'         => $type,
                'points'       => $points,
                'reference'    => $reference,
                'remarks'      => $remarks ?? $rule?->title,
            ]);
        });

        return true;
    }
}




if (!function_exists('walletCanApply')) {

    function walletCanApply(
        Candidate $candidate,
        CoinRule $rule,
        $reference = null
    ): bool {

        $query = WalletTransaction::where('candidate_id', $candidate->id)
            ->where('coin_rule_id', $rule->id);

        return match ($rule->frequency) {
            'once'       => !$query->exists(),
            'daily'      => !$query->whereDate('created_at', today())->exists(),
            'per_action' => !$query->where('reference', $reference)->exists(),
            default      => true,
        };
    }
}

