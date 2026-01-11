"use client";

import React, { useState } from "react";
import { FaWallet, FaLockOpen, FaLock, FaCrown } from "react-icons/fa";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import { useAuthStore } from "@/stores/useAuthStore";

export default function WalletSystem() {
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "My Wallet", to: "/my_wallet" },
  ];

  // ----- MOCK USER STATE -----
  const [points, setPoints] = useState(120); // Example: user has 120 points
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([]);
  const [subscription, setSubscription] = useState<null | string>(null);
  const user = useAuthStore().user;

  // ----- FEATURE DATA -----
  const features = [
    { id: "reading_analysis", name: "Reading Analysis", requiredPoints: 50 },
    { id: "listening_boost", name: "Listening Booster", requiredPoints: 100 },
    {
      id: "ai_suggestions",
      name: "AI Answer Suggestions",
      requiredPoints: 150,
    },
  ];

  // ----- SUBSCRIPTION OPTIONS -----
  const subscriptions = [
    { id: "basic", name: "Basic Pass", cost: 100 },
    { id: "pro", name: "Pro Pass", cost: 200 },
    { id: "elite", name: "Elite VIP", cost: 350 },
  ];

  const milestones = [100, 250, 500, 1000, 2000, 5000];

  // Find next milestone above current points
  const nextMilestone = milestones.find((m) => m > points) || "MAX";

  const pointsNeeded =
    typeof nextMilestone === "number" ? nextMilestone - points : 0;

  const encouragementMessage =
    nextMilestone === "MAX"
      ? "🔥 You're at the top tier! Keep dominating!"
      : pointsNeeded <= 20
      ? "🔥 Almost there! Just a few points left!"
      : pointsNeeded <= 50
      ? "💪 Keep pushing, you're getting close!"
      : "🚀 Great job! Keep earning and level up!";

  // ----- Unlock Feature -----
  const unlockFeature = (feature: any) => {
    if (points < feature.requiredPoints) return alert("Not enough points!");
    if (unlockedFeatures.includes(feature.id))
      return alert("Already unlocked!");

    setPoints(points - feature.requiredPoints);
    setUnlockedFeatures([...unlockedFeatures, feature.id]);
  };

  // ----- Buy Subscription -----
  const buySubscription = (sub: any) => {
    if (points < sub.cost) return alert("Not enough points!");

    setPoints(points - sub.cost);
    setSubscription(sub.name);
  };

  return (
    <div className="">
      <div className="space-y-5">
        <BreadCrumb breadCrumbData={breadCrumbData} />
        <UserHeadline mainText="My Wallet" subText="" preText="" />
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
                    pts
                  </span>
                </h2>

                {/* Next Milestone */}
                <p className="text-sm text-gray-600 font-medium mb-2">
                  Next Goal:{" "}
                  <span className="text-purple-600 font-semibold">
                    {nextMilestone === "MAX"
                      ? "No more milestones"
                      : nextMilestone + " pts"}
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
                      width: `${(points / nextMilestone) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm md:text-base text-gray-700 mt-3">
                  {pointsNeeded} points to reach your next reward 🎉
                </p>
              </div>
            )}
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
                  RAKU Wallet
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
                  <p className="text-xs uppercase opacity-80">Member</p>
                  <p className="font-semibold tracking-wide">
                    User ID # {user?.first_name} {""} {user?.last_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase opacity-80">
                    Premium Balance
                  </p>
                  <p className="font-semibold">{points} Points</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- FEATURES ----------------- */}
        <div>
          <h2 className="text-xl font-bold mb-4">Unlock Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {features.map((f) => {
              const unlocked = unlockedFeatures.includes(f.id);

              return (
                <div
                  key={f.id}
                  className="p-5 rounded-xl shadow bg-white flex flex-col justify-between h-45"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{f.name}</h3>
                    <p className="text-gray-500">
                      Required: {f.requiredPoints} points
                    </p>
                  </div>

                  <button
                    disabled={unlocked || points < f.requiredPoints}
                    onClick={() => unlockFeature(f)}
                    className={`mt-4 flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition 
                    ${
                      unlocked
                        ? "bg-green-500 text-white"
                        : points < f.requiredPoints
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                    }`}
                  >
                    {unlocked ? <FaLockOpen /> : <FaLock />}
                    {unlocked ? "Unlocked" : "Unlock"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ----------------- SUBSCRIPTIONS ----------------- */}
        <div>
          <h2 className="text-xl font-bold mb-4">Buy Subscription</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {subscriptions.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-xl shadow bg-white flex flex-col justify-between text-center"
              >
                <FaCrown className="text-4xl text-yellow-500 mx-auto" />
                <h3 className="text-lg font-semibold mt-2">{s.name}</h3>
                <p className="text-gray-600 mb-3">{s.cost} points</p>

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
                  Buy
                </button>
              </div>
            ))}
          </div>

          {subscription && (
            <div className="mt-5 p-4 bg-green-100 rounded-lg text-green-800 font-medium">
              You purchased: {subscription}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
