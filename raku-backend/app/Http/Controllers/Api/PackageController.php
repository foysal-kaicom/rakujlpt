<?php

namespace App\Http\Controllers\Api;

use App\Models\Package;
use Illuminate\Http\Request;
use App\Models\UserSubscription;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\UserSubscriptionDetails;
use App\Notifications\CandidateNotification;
use App\Http\Resources\PackageDetailResource;
use Illuminate\Support\Facades\DB;

class PackageController extends Controller
{
    public function show(Request $request)
    {
        // Start the query
        $query = Package::with(['package_details.exam'])
            ->where('status', 1)
            ->orderByRaw('ISNULL(`order`), `order` ASC');
        // ->orderBy('order', 'asc');

        // Apply filter dynamically
        if ($request->has('is_home') && $request->is_home == true) {
            $query->where('is_home', true);
        }

        // Add ordering
        $packages = $query->orderBy('order', 'asc')
            ->get()
            ->map(function ($package) {
                return [
                    'id' => $package->id,
                    'name' => $package->name,
                    'price' => $package->is_free ? 'FREE' : 'BDT ' . (int)$package->price,
                    'short_description' => $package->short_description,
                    'description' => $package->description,
                    'status' => $package->status,
                    'is_popular' => $package->is_popular,
                    'is_home' => $package->is_home,
                    'is_free' => $package->is_free,
                    'is_active' => $package->is_active,
                    'sequence' => $package->order,
                    'package_details' => PackageDetailResource::collection($package->package_details),
                ];
            });

        return $this->responseWithSuccess($packages, 'Packages retrieved successfully');
    }

    public function subscribe(Request $request, SslCommerzPaymentController $sslController)
    {
        $request->validate([
            'package_id' => 'required|exists:packages,id',
        ]);

        $candidate = Auth::guard('candidate')->user();

        $package = Package::with('package_details.exam')->findOrFail($request->package_id);

        // Find previous successful subscription (if any)
        $existingSubscription = UserSubscription::where('id', $candidate->user_subscriptions_id)
            ->where('package_id', $package->id)
            ->exists();

        // ============================
        // FREE PACKAGE (Only once)
        // ============================
        if ($package->is_free) {

            if ($existingSubscription) {
                return $this->responseWithError(
                    'Already Subscribed',
                    'You already activated this free package.',
                    400
                );
            }

            DB::beginTransaction();

            try {
                $tranId = strtoupper(substr($package->name, 0, 3)) .
                    $package->id .
                    str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);

                $userSubscription = UserSubscription::create([
                    'candidate_id'   => $candidate->id,
                    'package_id'     => $package->id,
                    'tran_id'        => $tranId,
                    'status'         => 'confirmed',
                    'payment_status' => 'success',
                    'total_payable'  => 0,
                    'title'          => 'free_subscription',
                ]);

                // Update Candidate
                $candidate->update([
                    'user_subscriptions_id' => $userSubscription->id,
                    'is_subscribed'         => true,
                    'is_free'               => true,
                    'current_package_id'    => $package->id,
                    'current_package_name'  => $package->name,
                ]);

                // Add package details
                foreach ($package->package_details as $detail) {
                    UserSubscriptionDetails::create([
                        'package_details_id'   => $detail->id,
                        'user_subscription_id' => $userSubscription->id,
                        'exam_id'              => $detail->exam_id,
                        'max_exam_attempt'     => $detail->max_exam_attempt,
                        'used_exam_attempt'    => 0,
                    ]);
                }

                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                return $this->responseWithError('Error', $e->getMessage(), 500);
            }

            // Notify candidate
            $successPath = config('app.frontend.payment_success')
                . '?subscription_id=' . $userSubscription->id
                . '&amount=0&tran_id=' . $tranId;

            $userSubscription->candidate->notify(new CandidateNotification([
                'title'   => "Free Subscription Activated!",
                'message' => "Your free package '{$package->name}' has been successfully activated.",
                'url'     => $successPath,
            ]));

            return response()->json([
                'status'          => 'success',
                'subscription_id' => $userSubscription->id,
                'package_id'      => $package->id,
                'package'         => $package->name,
                'url'             => $successPath,
            ]);
        }


        // ============================
        // PAID PACKAGE (Rebuy always allowed)
        // ============================

        // 👉 REMOVE BLOCKING PENDING PAYMENT
        // User can purchase again even if pending payment exists.

        $tranId = strtoupper(substr($package->name, 0, 3)) .
            $package->id .
            str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);

        $userSubscription = UserSubscription::create([
            'candidate_id'   => $candidate->id,
            'package_id'     => $package->id,
            'tran_id'        => $tranId,
            'status'         => 'pending',
            'payment_status' => 'pending',
            'total_payable'  => $package->price,
            'title'          => $existingSubscription ? 'renewal' : 'subscription',
        ]);

        // Redirect to SSL
        $paymentResponse = $sslController->payNow($userSubscription);

        return response()->json($paymentResponse);
    }

    public function subscriptionDetails(Request $request)
    {
        try {

            $request->validate([
                'user_subscription_id' => 'required|exists:user_subscriptions,id'
            ]);

            $candidate = Auth::guard('candidate')->user();

            // Fetch subscription with exam details
            $subscription = UserSubscription::with('subscriptionDetails.exam')
                ->where('candidate_id', $candidate->id)
                ->where('id', $request->user_subscription_id)
                ->first();

            if (!$subscription) {
                return $this->responseWithError('Not Found', 'Subscription not found.', 404);
            }

            // Format the details
            $details = $subscription->subscriptionDetails->map(function ($detail) {

                $remaining = (int) max(
                    (int)$detail->max_exam_attempt - (int)$detail->used_exam_attempt,
                    0
                );

                return [
                    'exam_title'         => $detail->exam->title ?? 'Unknown',
                    'max_attempts'       => (int) $detail->max_exam_attempt,
                    'used_attempts'      => (int) $detail->used_exam_attempt,
                    'remaining_attempts' => $remaining,
                ];
            });

            return response()->json([
                'status' => 'success',
                'subscription_id' => (int) $subscription->id,
                'details' => $details,
            ]);

        } catch (\Exception $e) {

            // Catch any unexpected exception
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }



    public function renewSubscription(Request $request, SslCommerzPaymentController $sslController)
    {
        $request->validate([
            'user_subscription_id' => 'required|exists:user_subscriptions,id',
            'confirm'             => 'nullable|boolean', // optional confirm flag
        ]);

        $candidate = Auth::guard('candidate')->user();
        if (!$candidate) {
            return $this->responseWithError('Unauthorized', 'Please log in to renew your package', 401);
        }

        // Get the existing subscription along with its package and details
        $existingSubscription = UserSubscription::with('subscriptionDetails.exam', 'package')
            ->where('candidate_id', $candidate->id)
            ->where('id', $request->user_subscription_id)
            ->where('payment_status', 'success')
            ->first();

        if (!$existingSubscription) {
            return $this->responseWithError('No Active Subscription', 'You don’t have any active subscription to renew.', 400);
        }

        $package = $existingSubscription->package;

        if (!$package) {
            return $this->responseWithError('Package Not Found', 'The linked package does not exist.', 404);
        }

        // Check remaining exam attempts
        $details = $existingSubscription->subscriptionDetails->map(function ($detail) {
            $remaining = max($detail->max_exam_attempt - $detail->used_exam_attempt, 0);
            return [
                'exam_title' => $detail->exam->title ?? 'Unknown',
                'max_attempts' => $detail->max_exam_attempt,
                'used_attempts' => $detail->used_exam_attempt,
                'remaining_attempts' => $remaining,
            ];
        });

        $remainingTotal = $details->sum('remaining_attempts');

        // If user has remaining attempts and did not confirm yet, return awareness message
        if ($remainingTotal > 0 && !$request->confirm) {
            return response()->json([
                'status' => 'awareness',
                'message' => "You still have {$remainingTotal} remaining exam attempt(s). Renewing will reset your attempts.",
                'exam_summary' => $details,
            ]);
        }

        // Generate new transaction ID for renewal
        $tranId = strtoupper(substr($package->name, 0, 3)) . $package->id . str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);

        // $tranId = strtoupper(substr($package->name, 0, 3)) . $package->id . str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);

        // Create a new pending subscription for renewal
        $userSubscription = UserSubscription::create([
            'candidate_id'   => $candidate->id,
            'package_id'     => $package->id,
            'tran_id'        => $tranId,
            'status'         => 'pending',
            'payment_status' => 'pending',
            'total_payable'  => $package->price,
            'title'          => 'renewal',
        ]);

        // Trigger SSL payment
        $paymentResponse = $sslController->payNow($userSubscription);
        return response()->json($paymentResponse);

        // return response()->json($sslController->payNow($userSubscription));
    }
}
