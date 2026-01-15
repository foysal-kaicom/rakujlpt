"use client";

import React, { useEffect, useState } from "react";
import { FaWallet, FaLockOpen, FaLock, FaCrown } from "react-icons/fa";

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
  const [transactionData, setTransactionData] = useState<any[]>([]);
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
        `/candidate/unlock-roadmaps/?roadmap_id=${roadmapId}`
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
          t("errors.unlock_roadmap")
      );
    }
  };

  const handleTransferCoins = async (receiverCode: string, amount: number) => {
    try {
      const response = await axiosInstance.post(`/candidate/wallet-coin-transfer`, {
        receiver_code: receiverCode,
        amount: amount,
      });
      if (response?.data?.success) {
        toast.success(t("wallet.referral.transfer_success"));
        // Refresh wallet data
        fetchWalletData();
      } else {
        toast.error(t("errors.transfer_coins"));
      }
    } catch (error: any) {
      toast.error(t("errors.transfer_coins"));
    }
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
              <div className="flex justify-between">
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
                  src="/assets/img/smiling_smile.gif"
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
               <button onClick={() => setIsRefTransferOpen(true)} className="bg-amber-400">
                Refer or Transfer Coins
              </button>
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
                <p className="mt-3 tracking-widest text-sm opacity-80">
                  **** &nbsp; **** &nbsp; **** &nbsp;{" "}
                  {String(points).slice(-4).padStart(4, "0")}
                </p>

                {/* Footer */}
                <div className="mt-6 flex justify-between items-center opacity-90">
                  <div>
                    <p className="text-xs uppercase opacity-80">
                      {t("wallet.card.member")}
                    </p>
                    <p className="font-semibold tracking-wide">
                      {t("wallet.card.user_id")} # {user?.first_name}{" "}
                      {user?.last_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase opacity-80">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {practiceTestsData.map((f) => {
                const unlocked = Number(f.is_unlocked) === 1;

                return (
                  <div
                    key={f.id}
                    className="p-5 rounded-xl shadow bg-white flex flex-col justify-between h-45"
                  >
                    <div>
                      {unlocked ? (
                        <Link
                          href={`/practice/${f.slug}`}
                          className="text-blue-500"
                        >
                          <h3 className="text-lg font-semibold">
                            {t(f.title)}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className="text-lg font-semibold">{t(f.title)}</h3>
                      )}

                      <p className="text-gray-500">
                        {t("wallet.ui.required")}: {f.unlock_coins}{" "}
                        {t("wallet.ui.points_full")}
                      </p>
                    </div>

                    <button
                      disabled={unlocked || points < f.unlock_coins}
                      onClick={() => {
                        setSelectedRoadmap(f);
                        setShowUnlockModal(true);
                      }}
                      className={`mt-4 flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition 
                    ${
                      unlocked
                        ? "bg-green-500 text-white"
                        : points < f.unlock_coins
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                    }`}
                    >
                      {unlocked ? <FaLockOpen /> : <FaLock />}
                      {unlocked
                        ? t("wallet.ui.unlocked")
                        : t("wallet.ui.unlock")}
                    </button>
                  </div>
                );
              })}
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
                    {transactionData.map((transaction: any) => (
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
                            transaction.created_at
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
        userReferralCode="ABC123XYZ"
        currentCoins={points}
        onTransferCoins={handleTransferCoins}
      />
    </>
  );
}
