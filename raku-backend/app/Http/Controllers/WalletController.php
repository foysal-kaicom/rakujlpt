<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Illuminate\Http\Request;
use App\Models\WalletTransaction;

class WalletController extends Controller
{
    public function index()
    {
        $wallets = Wallet::with('candidate.user')
            ->latest()
            ->paginate(20);

        return view('admin.wallets.index', compact('wallets'));
    }
    public function transactions($candidateId)
    {
        $transactions = WalletTransaction::with('rule')
            ->where('candidate_id', $candidateId)
            ->latest()
            ->paginate(30);

        return view('admin.wallets.transactions', compact('transactions'));
    }
}
