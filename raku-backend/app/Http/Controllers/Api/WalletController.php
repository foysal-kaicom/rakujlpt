<?php

namespace App\Http\Controllers\Api;

use App\Models\Wallet;
use Illuminate\Http\Request;
use App\Models\WalletTransaction;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    public function summary()
    {
        // $candidate = auth()->user()->candidate;
        $candidate = Auth::guard('candidate')->user();

        $wallet = Wallet::firstOrCreate([
            'candidate_id' => $candidate->id
        ]);
        $walletTransactions = WalletTransaction::where('candidate_id', $candidate->id)->get();

        // return response()->json([
        //     'balance' => $wallet->balance,
        // ]);
        return $this->responseWithSuccess('Wallet summary fetched successfully', [
            'balance' => $wallet->balance,
            'transactions' => $walletTransactions
        ]);
    }

    // public function transactions()
    // {
    //     // $candidate = auth()->user()->candidate;
    //     $candidate = Auth::guard('candidate')->user();

    //     $transactions = WalletTransaction::with('rule:id,title,action')
    //         ->where('candidate_id', $candidate->id)
    //         ->latest()
    //         ->paginate(20);

    //     // return response()->json($transactions);
    //     return $this->responseWithSuccess('Wallet transactions fetched successfully', $transactions);
    // }
}
