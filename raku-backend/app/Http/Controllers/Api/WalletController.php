<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Wallet;
use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Models\WalletTransaction;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class WalletController extends Controller
{
    public function summary()
    {
        // $candidate = auth()->user()->candidate;
        $candidate = Auth::guard('candidate')->user();

        $wallet = Wallet::firstOrCreate([
            'candidate_id' => $candidate->id
        ]);
        $walletTransactions = WalletTransaction::where('candidate_id', $candidate->id)->orderBy('created_at', 'desc')->get();

        return $this->responseWithSuccess([
            'balance' => $wallet->balance,
            'transactions' => $walletTransactions
        ], 'Wallet summary fetched successfully');
    }
    
    //     public function summary(Request $request)
    // {
    //     // $candidate = auth()->user()->candidate;
    //     $candidate = Auth::guard('candidate')->user();

    //     $wallet = Wallet::firstOrCreate([
    //         'candidate_id' => $candidate->id
    //     ]);

    //     $perPage = $request->get('per_page', 5);

    //     $walletTransactions = WalletTransaction::where('candidate_id', $candidate->id)->orderBy('created_at', 'desc')->paginate($perPage);

    //     return $this->responseWithSuccess([
    //         'balance' => $wallet->balance,
    //         'transactions' => $walletTransactions
    //     ], 'Wallet summary fetched successfully');
    // }

    // public function transferCoin(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'receiver_code' => 'required|string|exists:candidates,candidate_code',
    //         'amount'        => 'required|integer|min:1',
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->responseWithError(
    //             'Validation failed',
    //             $validator->getMessageBag()
    //         );
    //     }

    //     $sender = Auth::guard('candidate')->user();

    //     if ($sender->candidate_code === $request->receiver_code) {
    //         return $this->responseWithError('You cannot transfer coins to yourself.');
    //     }

    //     $receiver = Candidate::where('candidate_code', $request->receiver_code)->first();

    //     DB::beginTransaction();

    //     try {
            
    //         $senderWallet = Wallet::where('candidate_id', $sender->id)
    //             ->lockForUpdate()
    //             ->first();

    //         $receiverWallet = Wallet::where('candidate_id', $receiver->id)
    //             ->lockForUpdate()
    //             ->first();

    //         if ($senderWallet->balance < $request->amount) {
    //             DB::rollBack();
    //             return $this->responseWithError('Insufficient wallet balance.');
    //         }

    //         // Transfer
    //         $senderWallet->decrement('balance', $request->amount);
    //         $receiverWallet->increment('balance', $request->amount);

    //         $reference = 'transfer_from_' . $sender->candidate_code . '_to_' . $receiver->candidate_code;

    //         // For sender
    //         WalletTransaction::create([
    //             'candidate_id' => $sender->id,
    //             'coin_rule_id' => null, // transfer is not rule-based
    //             'type'         => 'debit',
    //             'points'       => $request->amount,
    //             'reference'    => $reference,
    //             'remarks'      => 'Coin transfer to ' . $receiver->candidate_code,
    //         ]);

    //         // For Receiver
    //         WalletTransaction::create([
    //             'candidate_id' => $receiver->id,
    //             'coin_rule_id' => null,
    //             'type'         => 'credit',
    //             'points'       => $request->amount,
    //             'reference'    => $reference,
    //             'remarks'      => 'Coin transfer from ' . $sender->candidate_code,
    //         ]);

    //         DB::commit();

    //         return $this->responseWithSuccess([
    //             'balance' => (int) $senderWallet->balance,
    //         ], 'Coin transferred successfully');

    //     } catch (Exception $e) {
    //         DB::rollBack();
    //         return $this->responseWithError('Coin transfer failed.', $e->getMessage());
    //     }
    // }

    public function transferCoin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'receiver_code' => 'required|string|exists:candidates,candidate_code',
            'amount'        => 'required|integer|min:1',
            'password'      => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->responseWithError(
                'Validation failed',
                $validator->getMessageBag()
            );
        }

        $sender = Auth::guard('candidate')->user();

        // ✅ Verify sender password
        if (!Hash::check($request->password, $sender->password)) {
            return $this->responseWithError('Invalid password. Transfer not authorized.');
        }

        if ($sender->candidate_code === $request->receiver_code) {
            return $this->responseWithError('You cannot transfer coins to yourself.');
        }

        $receiver = Candidate::where('candidate_code', $request->receiver_code)->first();

        DB::beginTransaction();

        try {
            $senderWallet = Wallet::where('candidate_id', $sender->id)
                ->lockForUpdate()
                ->first();

            $receiverWallet = Wallet::where('candidate_id', $receiver->id)
                ->lockForUpdate()
                ->first();

            if ($senderWallet->balance < $request->amount) {
                DB::rollBack();
                return $this->responseWithError('Insufficient wallet balance.');
            }

            // Transfer
            $senderWallet->decrement('balance', $request->amount);
            $receiverWallet->increment('balance', $request->amount);

            $reference = 'transfer_from_' . $sender->candidate_code . '_to_' . $receiver->candidate_code;

            WalletTransaction::create([
                'candidate_id' => $sender->id,
                'coin_rule_id' => null,
                'type'         => 'debit',
                'points'       => $request->amount,
                'reference'    => $reference,
                'remarks'      => 'Coin transfer to ' . $receiver->candidate_code,
            ]);

            WalletTransaction::create([
                'candidate_id' => $receiver->id,
                'coin_rule_id' => null,
                'type'         => 'credit',
                'points'       => $request->amount,
                'reference'    => $reference,
                'remarks'      => 'Coin transfer from ' . $sender->candidate_code,
            ]);

            DB::commit();

            return $this->responseWithSuccess([
                'balance' => (int) $senderWallet->balance,
            ], 'Coin transferred successfully');

        } catch (Exception $e) {
            DB::rollBack();
            return $this->responseWithError('Coin transfer failed.', $e->getMessage());
        }
    }
}
