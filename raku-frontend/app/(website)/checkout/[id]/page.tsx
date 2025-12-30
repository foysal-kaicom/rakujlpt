"use client";
import { useState } from "react";

import { IoIosRemoveCircle } from "react-icons/io";

export default function CheckoutPage() {
  const BASE_AMOUNT = 53;

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const finalAmount = BASE_AMOUNT - discount;

  const applyCoupon = () => {
    setError("");

    // UI-only validation (backend MUST re-check)
    if (coupon.trim().toUpperCase() === "JPT10") {
      setDiscount(10);
    } else {
      setDiscount(0);
      setError("Invalid coupon code");
    }
  };

  const removeCoupon = () =>{
    setCoupon("")
    setDiscount(0)
  }

  const handlePayNow = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/payment/sslcommerz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupon: coupon || null }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment initialization failed");
      }

      // Redirect to SSLCommerz
      window.location.href = data.gateway_url;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-indigo-100 flex items-center justify-center p-4">
      {/* Gradient Border Wrapper */}
      <div className="relative w-full max-w-3xl rounded-[28px] p-[1px] bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 shadow-2xl">
        {/* Glass Card */}
        <div className="rounded-[27px] bg-white/80 backdrop-blur-xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Secure Checkout
            </h1>
            <p className="text-sm text-gray-700">
              🚀 Fast · 🔒 Secure · 💳 Trusted
            </p>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl border-2 border-fuchsia-100 bg-gradient-to-br from-gray-50/30 to-white/30 p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Exam Fee</span>
              <span>$49.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>$4.00</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm font-medium text-violet-600">
                <span>Coupon Applied</span>
                <span>- ${discount}.00</span>
              </div>
            )}

            <div className="border-t border-fuchsia-400 pt-3 flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold text-fuchsia-600">
                ${finalAmount}.00
              </span>
            </div>
          </div>

          {/* Coupon */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="🎁 Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 rounded-xl px-4 py-2 focus:outline-none outline outline-fuchsia-300/50 focus:ring-2 focus:ring-indigo-500 bg-white/50"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="rounded-xl border px-5 py-3 text-sm font-semibold text-white bg-gradient-to-br from-fuchsia-600 to-violet-600 hover:scale-105 duration-300 cursor-pointer"
              >
                Apply
              </button>
            </div>
            {discount != 0 && (
              <div className="font-medium text-violet-600 mt-3">
                <span className="font-semibold">Applied Coupon</span>
                <div className="text-sm flex items-center justify-between mt-1 bg-white/40 py-2 px-4 rounded-md">
                  <span>{coupon}</span>
                  <div className="flex items-center gap-1">
                    <span>- ${discount}.00</span>
                    <IoIosRemoveCircle onClick={removeCoupon} className="size-6 text-red-600 hover:scale-105 duration-300 cursor-pointer" />
                  </div>
                </div>
              </div>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          {/* Agreement */}
          <label className="flex gap-2 text-sm text-gray-700">
            <input type="checkbox" className="mt-1 accent-indigo-600" />I agree
            to the terms and conditions
          </label>

          {/* CTA */}
          <button
            onClick={handlePayNow}
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 py-4 text-white text-lg font-semibold shadow-lg shadow-indigo-300/40 hover:shadow-xl hover:scale-[1.01] transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Redirecting…" : "Pay Now"}
          </button>

          {/* Trust */}
          <p className="text-center text-xs text-gray-700">
            🔐 SSLCommerz secure payment · No card data stored
          </p>
        </div>
      </div>
    </div>
  );
}
