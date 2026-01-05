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
            ->get(['id', 'title', 'coupon_code', 'description', 'type', 'discount_value', 'max_discount', 'end_date']);

        return $this->responseWithSuccess($coupons , "All coupons fetched");
    }

    public function checkCoupon(Request $request){
        $request->validate([
            'coupon_code' => ['required', 'string'],
        ]);

        $now = now();
        $coupon = Coupon::where('coupon_code', trim($request->coupon_code))->first();

        $message = 'Coupon is valid.';
        $data    = null;

        if (!$coupon) {
            $message = 'Coupon not found.';
        } elseif ($coupon->status !== 'active') {
            $message = 'This coupon is currently not active.';
        } elseif ($coupon->start_date > $now) {
            $message = 'This coupon is not started yet.';
        } elseif ($coupon->end_date < $now) {
            $message = 'This coupon has expired.';
        } else {
            $data = [
                'id'             => $coupon->id,
                'title'          => $coupon->title,
                'coupon_code'    => $coupon->coupon_code,
                'description'    => $coupon->description,
                'type'           => $coupon->type,
                'discount_value' => (float) $coupon->discount_value,
                'max_discount'   => (float) $coupon->max_discount,
                'end_date'       => $coupon->end_date,
            ];
        }

        return $this->responseWithSuccess($data, $message);    
    }
}
