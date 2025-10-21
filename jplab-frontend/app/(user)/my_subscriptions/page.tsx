"use client";

import { useState, useEffect, Suspense } from "react";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import Loader from "@/components/Loader";
import Link from "next/link";
import SuspenseLoader from "@/components/SuspenseLoader";
import axios from "@/utils/axios";

// Define the type for each exam item
interface SubscriptionItem {
  id: number;
  title: string;
  total_payable: number;
  package_name: string;
  payment_status: string;
  date: string;
  is_free: boolean;
}

export default function UserSubscriptions() {
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "My Subscriptions", to: "/my_subscriptions" },
  ];
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionItem[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  // Fetch exam history
  const getExamData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/mock-test/active-user-subscription"
      );
      setSubscriptionData(response?.data?.data || []);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to get subscription data");
    } finally {
      setLoading(false);
    }

    // setSubscriptionData([
    //     {
    //       title: "subscription",
    //       total_payable: 200,
    //       package_name: "Free",
    //       payment_status: "success",
    //       id: 1,
    //     }
    //   ]);
  };

  useEffect(() => {
    getExamData();
  }, []);

  const handleRenew = async (subscription_id: number) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/candidate/subscription-renew`,
        { user_subscription_id: subscription_id, confirm: 1 }
      );
      const url = response?.data?.url;
      if (
        response.status === 200 &&
        response?.data?.status === "success" &&
        typeof url === "string" &&
        /^https?:\/\/.+/.test(url)
      ) {
        window.location.href = url;
        toast.success(response?.data?.message || "Subscription successful");
      } else {
        toast.success(response?.data?.message || "Subscription successful");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message || "Subscription failed"
      );
    }
  };

  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        {loading && <Loader />}
        <div className="min-h-[60vh]">
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="mt-5 lg:px-10 lg:pb-10">
            <UserHeadline mainText="My Subscriptions" subText="" preText="" />

            {/* Desktop Table */}
            <div className="overflow-clip mt-6 rounded-2xl hidden md:block">
              <table className="w-full border-separate border-spacing-0 rounded-xl bg-white border border-gray-200 shadow text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs sm:text-sm">
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
                            className={`font-semibold text-green-700 capitalize ${
                              subscription.payment_status == "success"
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
                              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                              Renew
                            </button>
                            ) : 'N/A'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center text-gray-500 py-6 border-t"
                      >
                        No subscription found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
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
                          {subscription.title || "N/A"}
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
                <div className="text-center text-gray-500 py-6 border-t">
                  No subscriptions found.
                </div>
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
