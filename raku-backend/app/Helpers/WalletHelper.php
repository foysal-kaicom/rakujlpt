<?php

use App\Models\Wallet;
use App\Models\Roadmap;
use App\Models\CoinRule;
use App\Models\Candidate;
use App\Models\RoadmapUnlock;
use App\Models\WalletTransaction;
use Illuminate\Support\Facades\DB;


if (!function_exists('walletCredit')) {

    function walletCredit(
        Candidate $candidate,
        string $action,
        $reference = null
    ): bool {

        $rule = CoinRule::where('action', $action)
            ->where('type', 'earn')
            ->where('status', true)
            ->first();

        if (!$rule) {
            return false;
        }

        if (!walletCanApply($candidate, $rule, $reference)) {
            return false;
        }

        // ✅ Dynamic points from DB
        $points = $rule->points_min;

        if ($points <= 0) {
            return false;
        }

        $wallet = Wallet::firstOrCreate([
            'candidate_id' => $candidate->id
        ]);

        DB::transaction(function () use ($wallet, $candidate, $rule, $points, $reference) {

            $wallet->increment('balance', $points);

            WalletTransaction::create([
                'candidate_id' => $candidate->id,
                'coin_rule_id' => $rule->id,
                'type' => 'credit',
                'points' => $points,
                'reference' => $reference,
                'remarks' => $rule->title,
            ]);
        });

        return true;
    }
}

if (!function_exists('walletDebit')) {

    /**
     * Debit wallet dynamically.
     *
     * @param Candidate $candidate
     * @param string $action
     * @param string|null $reference
     * @param float|null $overridePoints Optional: override coin_rule points
     */
    function walletDebit(
        Candidate $candidate,
        string $action,
        $reference = null,
        ?float $overridePoints = null
    ): void {

        $rule = CoinRule::where('action', $action)
            ->where('type', 'spend')
            ->where('status', true)
            ->firstOrFail();

        // Check frequency
        if (!walletCanApply($candidate, $rule, $reference)) {
            throw new Exception('This action has already been applied');
        }

        // Determine points
        $points = $overridePoints ?? $rule->points_min;

        if ($points <= 0) {
            throw new Exception('Invalid debit points');
        }

        $wallet = Wallet::where('candidate_id', $candidate->id)->first();

        if (!$wallet || $wallet->balance < $points) {
            throw new Exception('Insufficient wallet balance');
        }

        DB::transaction(function () use ($wallet, $candidate, $rule, $points, $reference) {

            $wallet->decrement('balance', $points);

            WalletTransaction::create([
                'candidate_id' => $candidate->id,
                'coin_rule_id' => $rule->id,
                'type' => 'debit',
                'points' => $points,
                'reference' => $reference,
                'remarks' => $rule->title,
            ]);
        });
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

        if ($rule->frequency === 'once') {
            return !$query->exists();
        }

        if ($rule->frequency === 'daily') {
            return !$query->whereDate('created_at', today())->exists();
        }

        if ($rule->frequency === 'per_action') {
            return !$query->where('reference', $reference)->exists();
        }

        return true; // unlimited
    }
}


