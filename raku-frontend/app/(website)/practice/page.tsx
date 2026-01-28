"use client";

import { useEffect, useState, useRef } from "react";
import { Sparkles, Rocket } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";
import { Confetti } from "@neoconfetti/react";
import BreadCrumb from "@/components/BreadCrumb";
import PracticeSkeleton from "./PracticeSkeleton";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { FaRoad } from "react-icons/fa";
import { ConfirmUnlockModal } from "./ConfirmUnlockModal";
import ConfettiComponent from "@/components/ConfettiComponent";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

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

export default function Practice() {
  const { t } = useTranslation();

  const breadCrumbData = [
    { name: t("breadcrumb.home"), to: "/" },
    { name: t("breadcrumb.practice"), to: "/practice" },
  ];

  const isAuthenticated = useAuthStore().isAuthenticated;
  const user = useAuthStore().user;
  const token = useAuthStore().token;
  const router = useRouter();

  const practiceLevelRef = useRef<HTMLDivElement | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);

  const scrollToPractice = () => {
    practiceLevelRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const [loader, setLoader] = useState(true);
  const [practiceTestsData, setPracticeTestsData] = useState<Roadmap[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const fetchRoadmaps = async () => {
    try {
      const response = await axiosInstance.get(`/roadmaps`);
      if (response?.data?.success) {
        setPracticeTestsData(response.data.data);
      }
    } catch (error: any) {
      toast.error(t("errors.fetch_roadmaps"));
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchRoadmaps();
  }, [t]);

  const handleUnlock = async (roadmapId: number) => {
    if (!isAuthenticated && !user && !token) {
      router.push(`sign_in?callbackUrl=/practice`);
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/candidate/unlock-roadmaps/?roadmap_id=${roadmapId}`,
      );
      if (response?.data?.success) {
        setShowConfetti(true);
        setLoader(true);
        toast.success(t("practicePage.unlock_success"));
      } else {
        toast.error(t("errors.unlock_roadmap"));
      }
      setPracticeTestsData([]);
      fetchRoadmaps();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "");
    }
  };

  return (
    <>
      {loader && <PracticeSkeleton />}

      {/* MAIN SECTION */}
      <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 overflow-hidden">
        {/* Soft Blobs */}
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-yellow-200/30 rounded-full filter blur-3xl animate-bounce-slow"></div>
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-pink-200/30 rounded-full filter blur-3xl animate-pulse-slow"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-5 py-14">
          <BreadCrumb breadCrumbData={breadCrumbData} />

          {/* HERO SECTION */}
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 rounded-full text-pink-600 text-sm font-medium shadow">
              <Sparkles className="w-4 h-4" />
              {t("practicePage.badge")}
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 leading-tight">
              {t("practicePage.hero_title")}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500">
                {" "}
                {t("practicePage.hero_highlight")}
              </span>
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
              {t("practicePage.hero_description")}
            </p>

            <button
              onClick={scrollToPractice}
              className="mt-8 px-10 py-4 text-lg bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ring-2 ring-purple-300 border-b border-b-white"
            >
              {t("practicePage.cta")}
            </button>

            {/* Hero Illustration */}
            <div className="flex justify-center mt-10" ref={practiceLevelRef}>
              <div className="p-6 bg-white shadow-lg border border-gray-100 rounded-2xl">
                <Rocket className="w-20 h-20 text-blue-500 animate-bounce" />
              </div>
            </div>
          </div>

          {/* PRACTICE LEVEL SECTION */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("practicePage.choose_roadmap")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {practiceTestsData.map((test, index) => {
                const isFree = Number(test.is_unlocked) === 1;
                const unlockCoins = Number(test.unlock_coins);

                return (
                  <div
                    key={index}
                    className={`group relative bg-gradient-to-br ${
                      isFree
                        ? "from-blue-50 via-purple-50 to-pink-50"
                        : "from-gray-50 to-gray-100"
                    } rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-2 ${
                      isFree
                        ? "border-blue-200 hover:border-blue-300"
                        : "border-gray-300"
                    } overflow-hidden`}
                  >
                    {/* Decorative corner accent */}
                    {isFree && (
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 opacity-10 rounded-bl-full" />
                    )}

                    {/* Lock badge for locked tests */}
                    {!isFree && (
                      <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <span>🔒</span>
                        <span>Locked</span>
                      </div>
                    )}

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div
                        className={`relative p-6 rounded-2xl shadow-md transition-all duration-300 ${
                          isFree
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700"
                            : "bg-gray-300 group-hover:bg-gray-400"
                        }`}
                      >
                        {test.image ? (
                          <Image
                            src={test.image}
                            alt={test.title}
                            className="w-14 h-14"
                            loading="lazy"
                          />
                        ) : (
                          <FaRoad
                            className={`w-14 h-14 ${
                              isFree ? "text-white" : "text-gray-600"
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-2xl font-bold text-center mb-3 ${
                        isFree
                          ? "text-gray-900 group-hover:text-blue-600"
                          : "text-gray-700"
                      } transition-colors`}
                    >
                      {test.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-center mt-3 min-h-20 leading-relaxed ${
                        isFree ? "text-gray-700" : "text-gray-600"
                      }`}
                    >
                      {test.description}
                    </p>

                    {/* Stages badge */}
                    <div className="mt-6 flex justify-center">
                      {isFree ? (
                        <div
                          className={`px-4 py-2 rounded-full font-semibold text-sm ${
                            isFree
                              ? "bg-blue-100 text-blue-700 border border-blue-200"
                              : "bg-gray-200 text-gray-600 border border-gray-300"
                          }`}
                        >
                          📚 {test.total_stages} {t("practicePage.stages")}
                        </div>
                      ) : (
                        <div className="size-full flex justify-center items-center">
                          <span className="flex items-center gap-1.5 text-sm bg-gray-200 text-gray-900 px-3 py-2 rounded-full font-bold">
                            <span className="text-base">🪙</span>
                            <span>
                              Unlock with{" "}
                              <span className="text-amber-700">
                                {unlockCoins}
                              </span>{" "}
                              coins
                            </span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action */}
                    <div className="mt-8">
                      {isFree ? (
                        <Link href={`/practice/${test.slug}`}>
                          <button className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg cursor-pointer">
                            {t("practicePage.start_now")} →
                          </button>
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedRoadmap(test);
                            setShowUnlockModal(true);
                          }}
                          className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center gap-2 group cursor-pointer relative"
                        >
                          <span className="flex items-center gap-2 text-lg">
                            <span className="text-2xl group-hover:scale-110 transition-transform">
                              🔒
                            </span>
                            <span>{t("practicePage.unlock_now")}</span>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ConfirmUnlockModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        onConfirm={() => handleUnlock(selectedRoadmap?.id ?? 0)}
        selectedRoadmap={selectedRoadmap}
      />
      <ConfettiComponent show={showConfetti} setShow={setShowConfetti} />
    </>
  );
}
