<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    Public function activeCoupons(Request $request){
        $now = now();
        $coupons = Coupon::query()
            ->where('status', 'active')
            ->where('start_date', '<=', $now)
            ->where('end_date', '>=', $now)
            ->orderByDesc('id')
            ->get(['id', 'title', 'description', 'type', 'discount_value', 'max_discount', 'end_date']);

        return $this->responseWithSuccess([
            'success' => true,
            'count' => $coupons->count(),
            'data'    => $coupons ], "All coupons fetched");
    }

    public function checkCoupon(Request $request){
        $request->validate([
            'coupon' => ['required', 'string'],
        ]);

        $now = now();
        $coupon = Coupon::where('title', trim($request->coupon))->first();

        $success = true;
        $message = 'Coupon is valid.';
        $data    = null;

        $success = true;
        $message = 'Coupon is valid.';
        $data    = null;

        if (!$coupon) {
            $success = false;
            $message = 'Coupon not found.';
        } elseif ($coupon->status !== 'active') {
            $success = false;
            $message = 'This coupon is currently not active.';
        } elseif ($coupon->start_date > $now) {
            $success = false;
            $message = 'This coupon is not started yet.';
        } elseif ($coupon->end_date < $now) {
            $success = false;
            $message = 'This coupon has expired.';
        } else {
            $data = [
                'id'             => $coupon->id,
                'title'          => $coupon->title,
                'description'    => $coupon->description,
                'type'           => $coupon->type,
                'discount_value' => (float) $coupon->discount_value,
                'max_discount'   => (float) $coupon->max_discount,
                'end_date'       => $coupon->end_date,
            ];
        }

        return $this->responseWithSuccess([
            'success' => $success,
            'message' => $message,
            'data'    => $data,
        ], "Coupon data fetched");    
    }
}
