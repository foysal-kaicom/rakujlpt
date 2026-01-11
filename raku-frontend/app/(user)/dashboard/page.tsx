"use client";

import axiosInstance from "@/utils/axios";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { useBusinessSettingsStore } from "@/stores/useBusinessStore";
import { useAuthStore } from "@/stores/useAuthStore";

import { SiAudiobookshelf } from "react-icons/si";
import { LuLetterText, LuComponent } from "react-icons/lu";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { IoIosBookmarks, IoIosAlarm } from "react-icons/io";
import { PiNotebookFill } from "react-icons/pi";
import { GiStairsGoal, GiRingingAlarm } from "react-icons/gi";
import { BiSolidBookBookmark } from "react-icons/bi";
import { MdTipsAndUpdates } from "react-icons/md";
import { TbRosetteDiscountFilled } from "react-icons/tb";
import { FaRocket, FaBook, FaBrain, FaTrophy } from "react-icons/fa";

import DashboardSkeleton from "./dashboardSkeleton";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import ReferralModal from "./ReferralModal";

interface ExamItem {
  title: string;
  exam_date: string;
  start_time: string;
  end_time: string;
  application_deadline: string;
  slug: string;
  available_to_apply: boolean;
}

interface DashboardItem {
  total_bookings: number;
  total_success_payments: number;
  pending_booking: number;
  total_results_published: number;
}

export default function Dashboard() {
  const settings = useBusinessSettingsStore((state) => state.settings);
  const user = useAuthStore().user

  const [loading, setLoading] = useState(true);
  const [allExam, setAllExam] = useState<ExamItem[]>([]);
  const [dashboard, setDashboard] = useState<DashboardItem>(
    {} as DashboardItem
  );
  const [open, setOpen] = useState(false);

  const getExamData = async () => {
    // setLoading(true);
    try {
      const response = await axiosInstance.get(`/exam/list`);
      setAllExam(response?.data?.data);
    } catch (error) {
      console.error("Failed to fetch exam data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDashboard = async () => {
    // setLoading(true);
    try {
      const response = await axiosInstance.get(`/candidate/dashboard`);
      setDashboard(response?.data?.data);
    } catch (error) {
      console.error("Failed to fetch exam data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExamData();
    getDashboard();
  }, []);

  const steps = [
    {
      title: "Getting Started",
      icon: <FaRocket />,
      color: "from-purple-500 to-pink-500",
      status: "completed",
    },
    {
      title: "Basics",
      icon: <FaBook />,
      color: "from-blue-500 to-yellow-400",
      status: "current",
    },
    {
      title: "Intermediate",
      icon: <FaBrain />,
      color: "from-pink-500 to-blue-500",
      status: "upcoming",
    },
    {
      title: "Mastery",
      icon: <FaTrophy />,
      color: "from-yellow-400 to-purple-500",
      status: "upcoming",
    },
  ];

  return (
    <>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div className="">
          <section className="flex items-center justify-between gap-2 mb-3 flex-wrap">
            <UserHeadline mainText="Dashboard" subText="" preText="" />
            {/* <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1 font-semibold rounded-2xl bg-purple-100 hover:bg-purple-200 px-5 py-1.5 border border-purple-200 text-sm sm:text-base text-purple-700 cursor-pointer"
            >
              <TbRosetteDiscountFilled className="size-6 shake-pause" /> Refer &
              earn
            </button> */}
          </section>
          <div className="relative bg-linear-to-t from-purple-400 to-pink-400 text-white rounded-xl overflow-hidden px-8 py-4 lg:py-0 lg:px-16 flex justify-between items-center gap-8 shadow-md hover:shadow-lg transition-shadow duration-500 mb-5">
            {/* Animated Floating Orbs */}
            <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-purple-500 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-pink-400 blur-3xl"></div>

            <div className="relative z-10 w-2/3">
              <h1 className="text-lg sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4">
                📝 Boost Your Japanese Skills!
              </h1>
              <p className="text-sm sm:text-base mb-6 text-white font-medium hidden sm:block">
                Take interactive mock tests for JPT (N5 & N4). Track your
                progress, improve fast, and achieve your goals!
              </p>
              <Link
                href="/mock_test_select"
                className="px-5 sm:px-10 py-1.5 lg:py-2.5 rounded-lg text-white bg-purple-600 text-xs sm:text-sm md:text-base font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 animate-pulse"
              >
                Take Mock Test
              </Link>
            </div>

            <div className="w-1/3 drop-shadow-xl drop-shadow-amber-50/50 flex justify-end">
              <Image
                src="/assets/img/mocktest/t13.png"
                alt="Mock Test Illustration"
                height={400}
                width={400}
                className="w-full max-w-[300px]"
                loading="lazy"
              />
            </div>
          </div>
          <section className="space-y-4 md:space-y-10">
            <section className="space-y-2 mt-3 md:mt-10 ">
              <h1 className="font-bold sm:text-xl">Exam Solution</h1>
              <section className="grid grid-cols-4 sm:grid-cols-4 lg:flex flex-wrap gap-2 sm:gap-6">
                {[
                  {
                    title: "Practice",
                    value: dashboard?.total_bookings,
                    icon: <GiStairsGoal className="size-8 sm:size-14" />,
                    iconBg: "bg-purple-600",
                    link: "/my_practice",
                    extranal: false,
                  },
                  {
                    title: "Learn",
                    value: dashboard?.total_success_payments,
                    icon: <BiSolidBookBookmark className="size-8 sm:size-14" />,
                    iconBg: "bg-purple-600",
                    link: "",
                    extranal: false,
                  },
                  {
                    title: "Metarials",
                    value: dashboard?.pending_booking,
                    icon: <PiNotebookFill className="size-8 sm:size-14" />,
                    iconBg: "bg-purple-600",
                    link: "",
                    extranal: false,
                  },
                  {
                    title: "Tips",
                    value: dashboard?.total_results_published,
                    icon: <MdTipsAndUpdates className="size-8 sm:size-14" />,
                    iconBg: "bg-purple-600",
                    link: "",
                    extranal: false,
                  },
                  {
                    title: "JPT Exam",
                    value: dashboard?.total_bookings,
                    icon: <IoIosAlarm className="size-8 sm:size-14" />,
                    iconBg: "bg-purple-600",
                    link: "https://jptbd.com/",
                    extranal: true,
                  },
                  {
                    title: "JLPT Exam",
                    value: dashboard?.total_success_payments,
                    icon: <IoIosAlarm className="size-8 sm:size-14" />,
                    iconBg: "bg-purple-600",
                    link: "https://jlpt.juaab-bd.org/jlpt_test_level",
                    extranal: true,
                  },
                  {
                    title: "Mock Test",
                    value: dashboard?.pending_booking,
                    icon: <GiRingingAlarm className="size-8 sm:size-14" />,
                    iconBg: "bg-purple-600",
                    link: "/mock_test_select",
                    extranal: false,
                  },
                  {
                    title: "Exam Pattern",
                    value: dashboard?.total_results_published,
                    icon: <LuComponent className="size-8 sm:size-14" />,
                    iconBg: "bg-purple-600",
                    link: "/question_composition",
                    extranal: false,
                  },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    target={item.extranal ? "_blank" : "_self"}
                  >
                    <div
                      className={`flex flex-col gap-2 items-center p-2 lg:p-6 sm:bg-purple-300/50 rounded-xl hover:shadow-md shadow-purple-400 transition duration-300 border border-transparent hover:border-gray-200`}
                    >
                      <div
                        className={`${item.iconBg} p-1 rounded-md text-white`}
                      >
                        {item.icon}
                      </div>
                      <h1 className="text-xs sm:text-sm lg:text-base font-medium text-center">
                        {item.title}
                      </h1>
                    </div>
                  </Link>
                ))}
              </section>
            </section>
            <div className="space-y-2 sm:bg-white sm:p-5 rounded-xl sm:border border-gray-200">
              <h1 className="font-bold sm:text-xl">Daily Practice</h1>
              <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  {
                    title: "Vocabulary",
                    value: dashboard?.total_bookings,
                    icon: (
                      <RxLetterCaseCapitalize className="size-6 2xl:size-10" />
                    ),
                    iconBg: "bg-sky-600",
                    cardBg: "bg-sky-200",
                  },
                  {
                    title: "Grammer",
                    value: dashboard?.total_success_payments,
                    icon: <LuLetterText className="size-6 2xl:size-10" />,
                    iconBg: "bg-green-600",
                    cardBg: "bg-green-200",
                  },
                  {
                    title: "Listening",
                    value: dashboard?.pending_booking,
                    icon: <SiAudiobookshelf className="size-6 2xl:size-10" />,
                    iconBg: "bg-yellow-500",
                    cardBg: "bg-amber-100",
                  },
                  {
                    title: "Reading",
                    value: dashboard?.total_results_published,
                    icon: <IoIosBookmarks className="size-6 2xl:size-10" />,
                    iconBg: "bg-cyan-600",
                    cardBg: "bg-cyan-200",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`${item.cardBg} flex gap-2 items-center p-2 rounded-md shadow-md hover:shadow-xl transition duration-300 border border-transparent hover:border-gray-200`}
                  >
                    <div
                      className={`${item.iconBg} p-3 rounded-full text-white`}
                    >
                      {item.icon}
                    </div>
                    <div className="space-y-2 w-[calc(100%-74px)]">
                      <h1 className="text-sm md:text-base 2xl:text-lg font-semibold flex gap-1.5 justify-between items-center">
                        <span>{item.title}</span>{" "}
                        <span className="text-xs lg:text-sm font-medium">
                          {item.value}/10
                        </span>
                      </h1>
                      <div className="w-full bg-white rounded-full h-2">
                        <div
                          className={`bg-sky-400 h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `10%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </section>

          <ReferralModal
            isOpen={open}
            onClose={() => setOpen(false)}
            referralLink={`${settings?.website_url}/registration/?ref=${user?.candidate_code || ""}`}
          />
        </div>
      )}
    </>
  );
}
