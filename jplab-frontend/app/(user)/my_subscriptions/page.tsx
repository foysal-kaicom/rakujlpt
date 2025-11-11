"use client";

import { useState } from "react";
import { Sparkles, ArrowUpCircle, CheckCircle } from "lucide-react";

import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

export default function SubscriptionPage() {
  const [subscriptionData] = useState([
    {
      id: 1,
      package_name: "Basic Plan",
      total_payable: "$10",
      payment_status: "success",
      date: "2025-11-01",
      is_free: false,
    },
    {
      id: 2,
      package_name: "Free Trial",
      total_payable: "$0",
      payment_status: "success",
      date: "2025-10-01",
      is_free: true,
    },
  ]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-10 items-center mt-10 max-w-5xl mx-auto relative">
        {/* 🌟 Current Plan Card */}
        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 text-center transition hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] flex-1 md:min-h-[380px] lg:min-h-[350px] flex items-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gradient-to-tr from-blue-500 to-indigo-500 p-4 rounded-2xl shadow-lg ring-2 ring-blue-100">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
              Current Plan: <span className="text-blue-600">Basic</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-sm">
              You are currently enjoying the{" "}
              <span className="font-medium text-blue-600">Basic plan</span> with
              limited access to premium feature.
            </p>
            {/* <button className="mt-5 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-md hover:shadow-lg">
        Manage Plan
      </button> */}
          </div>

          {/* subtle glowing ring */}
          <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-tr from-blue-400/10 to-transparent pointer-events-none"></div>
          <span className="absolute top-3 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Active
          </span>
        </div>

        {/* 🡆 Gradient Animated Arrow */}
        <div className="rotate-90 md:rotate-0 flex flex-col items-center ">
          <FiArrowRight className="size-12 text-blue-900 fade-slide-in-left" />
        </div>

        {/* 🚀 Upgrade Suggestion Card */}
        <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 text-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] p-8 text-center hover:shadow-[0_8px_40px_rgb(0,0,0,0.25)] transition flex-1 md:min-h-[380px] lg:min-h-[350px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white/20 p-4 rounded-2xl shadow-lg ring-2 ring-pink-300/30">
              <Sparkles className="w-10 h-10 text-yellow-300" />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              Upgrade to <span className="text-yellow-300">Premium 🚀</span>
            </h3>
            <p className="text-sm text-white/90 max-w-sm">
              Gain full access to all features, priority support, and advanced
              tools that elevate your experience.
            </p>
            <Link href="/packages">
              <button className="mt-5 inline-flex items-center gap-2 bg-white text-pink-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-pink-50 transition duration-300 shadow-md hover:shadow-lg">
                <ArrowUpCircle className="w-5 h-5" />
                Upgrade Now
              </button>
            </Link>
          </div>

          {/* glowing gradient ring */}
          <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-tr from-pink-300/30 via-purple-300/20 to-transparent pointer-events-none"></div>

          {/* decorative blur */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-400/40 blur-3xl rounded-full pointer-events-none"></div>
          <span className="absolute top-3 right-4 bg-yellow-400 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
            Recommended
          </span>
        </div>
      </div>

      {/* 📜 Subscription History */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Subscription History
        </h3>

        <div className="overflow-clip rounded-2xl hidden md:block">
          <table className="w-full border-separate border-spacing-0 rounded-xl bg-white border border-gray-200 shadow text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-purple-700 via-violet-700 to-blue-700 text-white text-xs sm:text-sm">
                <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                  Package
                </th>
                <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200 hidden sm:table-cell">
                  Price
                </th>
                <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                  Payment Status
                </th>
                <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                  Last Updated
                </th>
                <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriptionData.length > 0 ? (
                subscriptionData.map((subscription, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-blue-50 text-xs sm:text-sm transition"
                  >
                    <td className="p-2 sm:p-3 font-semibold border-t border-r border-gray-200 capitalize">
                      {subscription.package_name || "N/A"}
                    </td>
                    <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200 hidden sm:table-cell capitalize">
                      {subscription.total_payable || "N/A"}
                    </td>
                    <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200">
                      <span
                        className={`font-semibold ${
                          subscription.payment_status === "success"
                            ? "text-green-700"
                            : "text-red-600"
                        }`}
                      >
                        {subscription.payment_status}
                      </span>
                    </td>

                    <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200 capitalize">
                      {subscription.date || "N/A"}
                    </td>

                    <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200 capitalize">
                      {!subscription.is_free && index === 0 ? (
                        <button
                          onClick={() => handleRenew(subscription.id)}
                          className="inline-block px-4 py-2 bg-gradient-to-r from-purple-700 via-violet-700 to-blue-700 font-medium text-white rounded-lg hover:opacity-80 transition"
                        >
                          Renew
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-6">
                    No subscription found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden mt-6 space-y-4">
          {subscriptionData.length > 0 ? (
            subscriptionData.map((subscription, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                <div className="relative space-y-4">
                  {/* Title */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-900 capitalize">
                      {subscription?.title || "N/A"}
                    </h3>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        subscription.payment_status === "success"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                          : subscription.payment_status === "pending"
                          ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                          : "bg-red-100 text-red-700 border border-red-300"
                      }`}
                    >
                      {subscription.payment_status}
                    </div>
                  </div>

                  {/* Package name */}
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600 text-sm font-medium">
                      Package:
                    </span>
                    <span className="text-gray-900 font-semibold capitalize">
                      {subscription.package_name || "N/A"}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>

                  {/* Price and Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Price
                      </div>
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        {subscription.total_payable}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Date
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {subscription.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">
              No subscriptions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
