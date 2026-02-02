"use client";

import React, { useEffect, useState } from "react";
import { FaWallet, FaLockOpen, FaLock, FaArrowRight } from "react-icons/fa";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import { useAuthStore } from "@/stores/useAuthStore";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";
import Link from "next/link";
import { ConfirmUnlockModal } from "@/app/(website)/practice/ConfirmUnlockModal";
import Loader from "@/components/Loader";
import ReferralTransferModal from "./ReferralTransferModal";
import PaginatedComponent from "@/components/PaginateComponent";

interface Roadmap {
  id: number;
  slug: string;
  title: string;
  image: string;
  description: string;
  total_stages: string;
  is_free: number;
  unlock_coins: number;
  is_unlocked: number;
}
export default function WalletSystem() {
  const { t } = useTranslation("common");
  const user = useAuthStore().user;

  const breadCrumbData = [
    { name: t("wallet.breadcrumbs.dashboard"), to: "/dashboard" },
    { name: t("wallet.breadcrumbs.my_wallet"), to: "/my_wallet" },
  ];

  // ----- MOCK USER STATE -----
  const [points, setPoints] = useState(0);
  const [subscription, setSubscription] = useState<null | string>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);

  // ----- SUBSCRIPTION OPTIONS -----
  const subscriptions = [
    { id: "basic", name: "wallet.subscriptions.basic", cost: 100 },
    { id: "pro", name: "wallet.subscriptions.pro", cost: 200 },
    { id: "elite", name: "wallet.subscriptions.elite", cost: 350 },
  ];

  const milestones = [100, 250, 500, 1000, 2000, 5000];

  // Find next milestone above current points
  const nextMilestone = milestones.find((m) => m > points) || "MAX";

  const pointsNeeded =
    typeof nextMilestone === "number" ? nextMilestone - points : 0;

  const encouragementMessage =
    nextMilestone === "MAX"
      ? t("wallet.milestones.top_tier")
      : pointsNeeded <= 20
        ? t("wallet.milestones.almost_there")
        : pointsNeeded <= 50
          ? t("wallet.milestones.keep_pushing")
          : t("wallet.milestones.great_job");

  const [loading, setLoading] = useState(true);
  const [practiceTestsData, setPracticeTestsData] = useState<Roadmap[]>([]);
  const [isRefTransferOpen, setIsRefTransferOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalExams = transactionData.length;
  const totalPages = Math.ceil(totalExams / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransectionData = transactionData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const fetchRoadmaps = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/roadmaps`);
      if (response?.data?.success) {
        setPracticeTestsData(response.data.data);
      }
    } catch (error: any) {
      toast.error(t("errors.fetch_roadmaps"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRoadmaps();
  }, [t]);

  const fetchWalletData = async () => {
    try {
      const response = await axiosInstance.get(`/candidate/wallet`);
      if (response?.data?.success) {
        setTransactionData(response?.data?.data?.transactions);
        setPoints(response?.data?.data?.balance);
      }
    } catch (error: any) {
      toast.error(t("errors.fetch_wallet"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, [t]);

  // ----- Buy Subscription -----
  const buySubscription = (sub: any) => {
    if (points < sub.cost) return alert(t("wallet.alerts.not_enough"));

    setPoints(points - sub.cost);
    setSubscription(t(sub.name)); // Translate name for state
  };

  const handleUnlock = async (roadmapId: number) => {
    try {
      const response = await axiosInstance.post(
        `/candidate/unlock-roadmaps/?roadmap_id=${roadmapId}`,
      );
      if (response?.data?.success) {
        toast.success(t("practicePage.unlock_success"));
      } else {
        toast.error(t("errors.unlock_roadmap"));
      }
      fetchWalletData();
      fetchRoadmaps();
    } catch (error: any) {
      toast.error(
        (error?.response?.data?.message || "") +
          ". " +
          t("errors.unlock_roadmap"),
      );
    }
  };

  const handleTransferCoins = async (receiverCode: string, amount: number, password: string) => {
    try {
      const response = await axiosInstance.post(
        `/candidate/wallet-coin-transfer`,
        {
          receiver_code: receiverCode,
          amount: amount,
          password: password,
        },
      );
      if (response?.data?.success) {
        toast.success(t("wallet.transfer_success"));
        // Refresh wallet data
        fetchWalletData();
        setIsRefTransferOpen(false);
      } else {
        toast.error(t("wallet.transfer_failed"));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? t("wallet.transfer_failed"));
    }
  };

  const getReceiverInfo = async (receiverCode: string) => {
    try {
      const response = await axiosInstance.get(
        `/candidate/get-candidate/${receiverCode}`,
      );
      if (response?.data?.success) {
        return response?.data?.data?.candidate;
      } else {
        toast.error(t("wallet.candidate_not_found"));
      }
    } catch (error: any) {
      toast.error(t("wallet.candidate_not_found"));
    }
    return null;
  };

  return (
    <>
      {loading && <Loader />}
      <div className="">
        <div className="space-y-5">
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <UserHeadline mainText={t("wallet.title")} subText="" preText="" />
        </div>
        {/* ----------------- WALLET ----------------- */}
        <div className="space-y-10 mt-5">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 lg:col-span-2 bg-white p-6 rounded-2xl">
              <div className="flex justify-between items-start">
                <div>
                  {/* Total Points */}
                  <h2 className="text-5xl font-extrabold mb-2 text-purple-700">
                    {points}{" "}
                    <span className="text-2xl font-medium text-purple-500">
                      {t("wallet.ui.pts")}
                    </span>
                  </h2>

                  {/* Next Milestone */}
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    {t("wallet.ui.next_goal")}:{" "}
                    <span className="text-purple-600 font-semibold">
                      {nextMilestone === "MAX"
                        ? t("wallet.ui.no_milestones")
                        : nextMilestone + " " + t("wallet.ui.pts")}
                    </span>
                  </p>
                </div>
                <img
                  src="/assets/img/coin-rotate.gif"
                  alt=""
                  className="h-20"
                />
              </div>

              {/* Encouragement */}
              <p className="mt-1 text-gray-700 text-2xl font-semibold mb-4">
                {encouragementMessage}
              </p>

              {/* Progress bar to next milestone */}
              {nextMilestone !== "MAX" && (
                <div className="mt-3">
                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all"
                      style={{
                        width: `${(points / Number(nextMilestone)) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm md:text-base text-gray-700 mt-3">
                    {pointsNeeded} {t("wallet.ui.points_to_reward")}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="sm:w-1/2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsRefTransferOpen(true)}
                    className="flex-1 group relative overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Refer or Transfer Coins
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </button>

                  {/* <button className="sm:w-auto bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="hidden sm:inline">How to Earn</span>
                    <span className="sm:hidden">Info</span>
                  </button> */}
                </div>
              </div>
            </div>

            <div className="relative w-full col-span-3 lg:col-span-1">
              {/* Bank Card */}
              <div className="relative p-6 rounded-2xl shadow-xl bg-linear-to-br from-purple-600 via-purple-700 to-indigo-800 text-white overflow-hidden">
                {/* Gloss Effect */}
                <div
                  className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none"
                  style={{
                    maskImage:
                      "linear-linear(120deg, transparent 0%, white 60%, transparent 100%)",
                  }}
                ></div>

                {/* Top Branding */}
                <div className="flex justify-between items-center">
                  <h1 className="text-lg tracking-wide opacity-90 font-semibold">
                    {t("wallet.card.title")}
                  </h1>
                  <FaWallet className="text-4xl opacity-90" />
                </div>

                {/* Chip */}
                <div className="mt-6 mb-4">
                  <div className="w-12 h-9 bg-yellow-300 rounded-md shadow-inner border border-yellow-600"></div>
                </div>

                {/* Card Number (fake formatting) */}
                <p className="mt-3 tracking-widest text-sm opacity-80 font-medium">
                  **** &nbsp; **** &nbsp; **** &nbsp;{" "}
                  {String(points).slice(-4).padStart(4, "0")}
                </p>

                {/* Footer */}
                <div className="mt-6 flex justify-between items-center opacity-90">
                  <div>
                    <p className="text-xs uppercase opacity-80 font-medium">
                      {t("wallet.card.member")}
                    </p>
                    <p className="font-semibold tracking-wide">
                      {t("wallet.card.user_id")} # {user?.first_name}{" "}
                      {user?.last_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase opacity-80 font-medium">
                      {t("wallet.card.premium_balance")}
                    </p>
                    <p className="font-semibold">
                      {points} {t("wallet.ui.points_full")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------- FEATURES ----------------- */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              {t("wallet.sections.unlock_features")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {practiceTestsData.slice(0, 3).map((f) => {
                const unlocked = Boolean(f.is_unlocked);

                return (
                  <div
                    key={f.id}
                    className="group relative rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {unlocked ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1">
                          <FaLockOpen />
                          Unlocked
                        </span>
                      ) : f.is_free ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                          Free
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium flex items-center gap-1">
                          <FaLock />
                          Locked
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {unlocked ? (
                        <Link href={`/practice/${f.slug}`}>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition">
                            {t(f.title)}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className="text-lg font-semibold text-gray-900">
                          {t(f.title)}
                        </h3>
                      )}

                      <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                        {t(f.description)}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-5">
                      <p className="mb-2 text-xs text-violet-600 font-semibold text-center bg-violet-50 px-5 py-1 rounded-4xl w-fit mx-auto">
                        {f.total_stages} Stages
                      </p>
                      {/* {unlocked && ( */}
                      <p className="mb-3 text-sm text-gray-500 font-medium">
                        {t("wallet.ui.required")}:{" "}
                        <span className="font-semibold text-gray-700">
                          {f.unlock_coins} {t("wallet.ui.points_full")}
                        </span>
                      </p>
                      {/* )} */}

                      <button
                        disabled={unlocked || points < f.unlock_coins}
                        onClick={() => {
                          setSelectedRoadmap(f);
                          setShowUnlockModal(true);
                        }}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-all ${
                          unlocked
                            ? "bg-green-500 text-white cursor-pointer"
                            : points < f.unlock_coins
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg cursor-pointer"
                        }`}
                      >
                        {unlocked ? <FaLockOpen /> : <FaLock />}
                        {unlocked
                          ? t("wallet.ui.unlocked")
                          : t("wallet.ui.unlock")}
                      </button>
                    </div>
                  </div>
                );
              })}
              <Link
                href={"/practice"}
                className="bg-slate-200/50 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center min-h-50 cursor-pointer"
              >
                <span className="bg-purple-500 p-2 rounded-full text-white">
                  <FaArrowRight className="size-5" />
                </span>
                <span className="text-purple-600 font-medium capitalize">
                  View all
                </span>
              </Link>
            </div>
          </div>

          {/* ----------------- SUBSCRIPTIONS ----------------- */}
          {/* <div>
          <h2 className="text-xl font-bold mb-4">
            {t("wallet.sections.buy_subscription")}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {subscriptions.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-xl shadow bg-white flex flex-col justify-between text-center"
              >
                <FaCrown className="text-4xl text-yellow-500 mx-auto" />
                <h3 className="text-lg font-semibold mt-2">{t(s.name)}</h3>
                <p className="text-gray-600 mb-3">
                  {s.cost} {t("wallet.ui.points_full")}
                </p>

                <button
                  disabled={points < s.cost}
                  onClick={() => buySubscription(s)}
                  className={`py-2 rounded-lg font-medium transition 
                    ${
                      points < s.cost
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                    }`}
                >
                  {t("wallet.ui.buy")}
                </button>
              </div>
            ))}
          </div>

          {subscription && (
            <div className="mt-5 p-4 bg-green-100 rounded-lg text-green-800 font-medium">
              {t("wallet.ui.purchased")}: {subscription}
            </div>
          )}
          </div> */}

          {/* ----------------- TRANSACTION HISTORY ----------------- */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              {t("wallet.transaction_history")}
            </h2>
            {transactionData.length > 0 ? (
              <>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-700 to-purple-600">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                            {t("wallet.table.id")}
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                            {t("wallet.table.type")}
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                            {t("wallet.table.points")}
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                            {t("wallet.table.remarks")}
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                            {t("wallet.table.date")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-purple-50">
                        {currentTransectionData.map((transaction: any) => (
                          <tr
                            key={transaction.id}
                            className="border-b border-purple-100 hover:bg-purple-100 transition-colors"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              #{transaction.id}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  transaction.type === "credit"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {transaction.type.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                              {transaction.points}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {transaction.remarks}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {new Date(
                                transaction.created_at,
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <PaginatedComponent
                  handlePageChange={handlePageChange}
                  totalPages={totalPages}
                  currentPage={currentPage}
                />
              </>
            ) : (
              <div className="text-center text-gray-600">
                No transaction history found
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmUnlockModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        onConfirm={() => handleUnlock(selectedRoadmap?.id ?? 0)}
        selectedRoadmap={selectedRoadmap ?? null}
      />
      <ReferralTransferModal
        isOpen={isRefTransferOpen}
        onClose={() => setIsRefTransferOpen(false)}
        userReferralCode={user?.candidate_code ?? ""}
        currentCoins={points}
        onTransferCoins={handleTransferCoins}
        onVerifyReceiver={getReceiverInfo}
      />
    </>
  );
}
