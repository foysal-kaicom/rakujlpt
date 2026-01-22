"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Sparkles, ArrowUpCircle, CheckCircle } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import Loader from "@/components/Loader";
import PaginatedComponent from "@/components/PaginateComponent";
import { useTranslation } from "react-i18next";

interface SubscriptionItem {
  id: number;
  title: string;
  total_payable: number;
  package_name: string;
  payment_status: string;
  date: string;
  is_free: boolean;
}

interface PlanItem {
  exam_title: string;
  max_attempts: number;
  used_attempts: number;
  remaining_attempts: number;
}

export default function SubscriptionPage() {
  const { t } = useTranslation("common");

  const breadCrumbData = [
    { name: t("subscription.breadcrumbs.dashboard"), to: "/dashboard" },
    {
      name: t("subscription.breadcrumbs.my_subscriptions"),
      to: "/my_subscriptions",
    },
  ];

  const [subscriptionData, setSubscriptionData] = useState<SubscriptionItem[]>(
    [],
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [planDetails, setPlanDetails] = useState<PlanItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalExams = subscriptionData.length;
  const totalPages = Math.ceil(totalExams / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSubcription = subscriptionData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getSubscriptionData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/mock-test/active-user-subscription",
      );

      setSubscriptionData(response?.data?.data || []);
    } catch (error: any) {
      console.error(error);
      toast.error(t("subscription.toasts.fetch_error"));
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetailsModal = async (subscription_id: number) => {
    try {
      const response = await axiosInstance.get(
        `/candidate/subscription-details?user_subscription_id=${subscription_id}`,
      );
      setPlanDetails(response?.data?.details || []);
      setShowDetailModal(true);
    } catch (error: any) {
      console.error(error);
      toast.error(t("subscription.toasts.details_error"));
    }
  };

  useEffect(() => {
    getSubscriptionData();
  }, []);

  const handleRenew = async (subscription_id: number) => {
    try {
      const response = await axiosInstance.post(
        `/candidate/subscription-renew`,
        { user_subscription_id: subscription_id, confirm: 1 },
      );
      const url = response?.data?.url;
      if (
        response.status === 200 &&
        response?.data?.status === "success" &&
        typeof url === "string" &&
        /^https?:\/\/.+/.test(url)
      ) {
        window.location.href = url;
        toast.success(
          response?.data?.message || t("subscription.toasts.success"),
        );
      } else {
        toast.success(
          response?.data?.message || t("subscription.toasts.success"),
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          t("subscription.toasts.failed"),
      );
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="space-y-10">
        <div className="space-y-5">
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <UserHeadline
            mainText={t("subscription.title")}
            subText=""
            preText=""
          />
        </div>
        {subscriptionData.length > 0 && (
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center mt-10 max-w-5xl mx-auto relative">
            {/* 🌟 Current Plan Card */}
            <div className="relative bg-linear-to-br from-white to-gray-50 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 text-center transition hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] flex-1 md:min-h-[380px] lg:min-h-[350px] flex items-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-linear-to-tr from-blue-500 to-indigo-500 p-4 rounded-2xl shadow-lg ring-2 ring-blue-100">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                  {t("subscription.current_plan.title")}:{" "}
                  <span className="text-blue-600">
                    {subscriptionData[0].package_name}
                  </span>
                </h2>
                <p className="text-sm text-gray-500 max-w-sm">
                  {t("subscription.current_plan.desc_start")}{" "}
                  <span className="font-medium text-blue-600">
                    {subscriptionData[0].package_name}{" "}
                    {t("subscription.current_plan.plan_text")}
                  </span>{" "}
                  {t("subscription.current_plan.desc_end")}
                </p>
              </div>

              {/* subtle glowing ring */}
              <div className="absolute inset-0 rounded-3xl border border-transparent bg-linear-to-tr from-blue-400/10 to-transparent pointer-events-none"></div>
              <span className="absolute top-3 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {t("subscription.badges.active")}
              </span>
            </div>

            {/* 🡆 linear Animated Arrow */}
            <div className="rotate-90 md:rotate-0 flex flex-col items-center ">
              <FiArrowRight className="size-12 text-blue-900 fade-slide-in-left" />
            </div>

            {/* 🚀 Upgrade Suggestion Card */}
            <div className="relative bg-linear-to-br from-purple-600 via-pink-500 to-rose-500 text-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] p-8 text-center hover:shadow-[0_8px_40px_rgb(0,0,0,0.25)] transition flex-1 md:min-h-[380px] lg:min-h-[350px] overflow-clip">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white/20 p-4 rounded-2xl shadow-lg ring-2 ring-pink-300/30">
                  <Sparkles className="w-10 h-10 text-yellow-300" />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight">
                  {t("subscription.upgrade_card.title_start")}{" "}
                  <span className="text-yellow-300">
                    {t("subscription.upgrade_card.title_highlight")} 🚀
                  </span>
                </h3>
                <p className="text-sm text-white/90 max-w-sm">
                  {t("subscription.upgrade_card.description")}
                </p>
                <Link href="/packages">
                  <button className="mt-5 inline-flex items-center gap-2 bg-white text-pink-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-pink-50 transition duration-300 shadow-md hover:shadow-lg cursor-pointer">
                    <ArrowUpCircle className="w-5 h-5" />
                    {t("subscription.upgrade_card.btn")}
                  </button>
                </Link>
              </div>

              {/* glowing linear ring */}
              <div className="absolute inset-0 rounded-3xl border border-transparent bg-linear-to-tr from-pink-300/30 via-purple-300/20 to-transparent pointer-events-none"></div>

              {/* decorative blur */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-400/40 blur-3xl rounded-full pointer-events-none"></div>
              <span className="absolute top-3 right-4 bg-yellow-400 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
                {t("subscription.badges.recommended")}
              </span>
            </div>
          </div>
        )}
        {/* 📜 Subscription History */}
        {subscriptionData.length > 0 ? (
          <>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {t("subscription.history.title")}
            </h3>
            <div className="overflow-clip rounded-2xl hidden md:block">
              <table className="w-full border-separate border-spacing-0 rounded-xl bg-white border border-gray-200 shadow text-sm">
                <thead>
                  <tr className="bg-linear-to-r from-purple-700 via-violet-700 to-blue-700 text-white text-xs sm:text-sm">
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                      {t("subscription.history.table.package")}
                    </th>
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200 hidden sm:table-cell">
                      {t("subscription.history.table.price")}
                    </th>
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                      {t("subscription.history.table.status")}
                    </th>
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                      {t("subscription.history.table.updated")}
                    </th>
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                      {t("subscription.history.table.action")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubcription.map((subscription, index) => (
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
                        {startIndex + index === 0 ? (
                          <div className="space-x-2">
                            {!subscription.is_free && (
                              <button
                                onClick={() => handleRenew(subscription.id)}
                                className="inline-block px-4 py-2 bg-linear-to-r from-purple-700 via-violet-700 to-blue-700 font-medium text-white rounded-lg hover:opacity-80 transition cursor-pointer"
                              >
                                {t("subscription.buttons.renew")}
                              </button>
                            )}

                            <button
                              onClick={() =>
                                handleShowDetailsModal(subscription.id)
                              }
                              className="inline-block px-4 py-2 bg-purple-600 font-medium text-white rounded-lg hover:opacity-80 transition cursor-pointer"
                            >
                              {t("subscription.buttons.details")}
                            </button>
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden mt-6 space-y-4">
              {currentSubcription.map((subscription, index) => (
                <div
                  key={index}
                  className="relative bg-linear-to-br from-blue-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
                >
                  {/* linear overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-purple-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

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
                        {t("subscription.history.mobile.package")}:
                      </span>
                      <span className="text-gray-900 font-semibold capitalize">
                        {subscription.package_name || "N/A"}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-linear-to-r from-transparent via-purple-300 to-transparent"></div>

                    {/* Price and Date */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                          {t("subscription.history.mobile.price")}
                        </div>
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                          {subscription.total_payable}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                          {t("subscription.history.mobile.date")}
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {subscription.date}
                        </div>
                      </div>
                    </div>
                    {!subscription.is_free && startIndex + index === 0 && (
                      <div className="flex justify-between text-xs">
                        <button
                          onClick={() =>
                            handleShowDetailsModal(subscription.id)
                          }
                          className="inline-block px-6 py-1.5 bg-purple-600 font-medium text-white rounded-full hover:opacity-80 transition cursor-pointer"
                        >
                          {t("subscription.buttons.details")}
                        </button>
                        <button
                          onClick={() => handleRenew(subscription.id)}
                          className="inline-block px-6 py-1.5 bg-linear-to-r from-purple-700 via-violet-700 to-blue-700 font-medium text-white rounded-full hover:opacity-80 transition cursor-pointer"
                        >
                          {t("subscription.buttons.renew")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <PaginatedComponent
              handlePageChange={handlePageChange}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </>
        ) : (
          <div className="text-center text-gray-500 py-6 flex flex-col gap-3 justify-center items-center">
            {t("subscription.empty_state.message")}
            <Link href="/packages">
              <button className="relative overflow-hidden text-sm md:text-base inline-block px-10 py-2 font-semibold text-white rounded-full bg-linear-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300 ease-out cursor-pointer">
                <span className="relative z-10">
                  {" "}
                  {t("subscription.empty_state.btn")}
                </span>
                <span className="absolute inset-0 bg-linear-to-r from-purple-400/30 via-pink-400/30 to-blue-400/30 blur-xl opacity-60 transition-opacity duration-300 group-hover:opacity-90"></span>
              </button>
            </Link>
          </div>
        )}
      </div>

      {showDetailModal && planDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
          <div className="max-w-lg relative bg-linear-to-br from-white to-gray-50 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-5 pl-5 text-center transition hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] flex items-center fade-slide-in-bottom">
            <RxCross2
              onClick={() => setShowDetailModal(false)}
              className="absolute top-3 right-3 bg-red-600 size-7 rounded-full p-1 text-white hover:rotate-180 duration-300 cursor-pointer"
            />
            <div className="max-h-[70vh] overflow-y-auto pr-5 scrollbar-thin">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-linear-to-tr from-blue-500 to-indigo-500 p-2 lg:p-4 rounded-2xl shadow-lg ring-2 ring-blue-100">
                  <CheckCircle className="size-6 lg:size-10 text-white" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                  {t("subscription.current_plan.title")}:{" "}
                  <span className="text-blue-600">
                    {subscriptionData[0].package_name}
                  </span>
                </h2>
                <p className="text-sm text-gray-500 max-w-sm">
                  {t("subscription.current_plan.desc_start")}{" "}
                  <span className="font-medium text-blue-600">
                    {subscriptionData[0].package_name}{" "}
                    {t("subscription.current_plan.plan_text")}
                  </span>{" "}
                  {t("subscription.current_plan.desc_end")}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 mt-5">
                {planDetails.map((exam, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-white shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {exam.exam_title}
                    </h3>

                    <div className="space-y-1 text-sm">
                      <p className="flex justify-between text-gray-700">
                        <span>{t("subscription.modal.total_exams")}:</span>{" "}
                        <span>{exam.max_attempts}</span>
                      </p>
                      <p className="flex justify-between text-gray-700">
                        <span>{t("subscription.modal.used")}:</span>{" "}
                        <span>{exam.used_attempts}</span>
                      </p>
                      <p className="flex justify-between font-medium text-blue-600">
                        <span>{t("subscription.modal.remaining")}:</span>{" "}
                        <span>{exam.remaining_attempts}</span>
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-blue-500 to-indigo-600"
                        style={{
                          width: `${
                            (exam.used_attempts / exam.max_attempts) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
