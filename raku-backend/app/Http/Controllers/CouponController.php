<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponRequest;
use App\Models\Coupon;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function list()
    {
        $coupons = Coupon::orderByDesc('id')->paginate(15);
        return view('coupon.list', compact('coupons'));
    }

    public function create(){
        return view('coupon.create');
    }

    public function store(CouponRequest $request)
    {
        $data = $request->validated();
    
        $data['max_discount'] = $data['max_discount'] ?? 0;
        $data['usage_limit']  = $data['usage_limit'] ?? 0;
    
        Coupon::create($data);
    
        Toastr::success('Coupon created successfully.');
        return redirect()->route('coupon.list');
    }

    public function edit($id)
    {
        $coupon = Coupon::findOrFail($id);
        return view('coupon.edit', compact('coupon'));
    }

    public function update(CouponRequest $request, $id)
    {
        $coupon = Coupon::findOrFail($id);

        $data = $request->validated();
        $data['max_discount'] = $data['max_discount'] ?? 0;
        $data['usage_limit']  = $data['usage_limit'] ?? 0;

        $coupon->update($data);

        Toastr::success('Coupon updated successfully.');
        return redirect()->route('coupon.list');
    }

    public function toggleStatus($id)
    {
        try {
            $coupon = Coupon::findOrFail($id);
    
            if ($coupon->status == 'active') {
                $coupon->status = 'inactive';
                $coupon->save();
            } else {
                $coupon->status = 'active';
                $coupon->save();
            }

            Toastr::success('Status changed successfully.');
            return redirect()->route('coupon.list');
        } catch (\Exception $e) {
            Toastr::success('Status not changed');
            return redirect()->route('coupon.list');
        }
    }
}
