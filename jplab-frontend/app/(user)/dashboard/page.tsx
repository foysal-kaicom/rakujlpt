"use client";

import axiosInstance from "@/utils/axios";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { SiAudiobookshelf } from "react-icons/si";
import { LuLetterText, LuComponent } from "react-icons/lu";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { IoIosBookmarks, IoIosAlarm } from "react-icons/io";
import { PiNotebookFill } from "react-icons/pi";
import { GiStairsGoal, GiRingingAlarm } from "react-icons/gi";
import { BiSolidBookBookmark } from "react-icons/bi";
import { MdTipsAndUpdates } from "react-icons/md";

import { FaRocket, FaBook, FaBrain, FaTrophy } from "react-icons/fa";

import { FaBookOpen, FaClock } from "react-icons/fa";

import DashboardSkeleton from "./dashboardSkeleton";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";

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
  const [loading, setLoading] = useState(true);
  const [allExam, setAllExam] = useState<ExamItem[]>([]);
  const [dashboard, setDashboard] = useState<DashboardItem>(
    {} as DashboardItem
  );

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

  const modules = {
    current: {
      title: "Basics of JavaScript",
      description:
        "Learn the core concepts of JS — variables, loops, and functions.",
      progress: 64,
      color: "bg-purple-700",
    },
    next: {
      title: "Intermediate Logic & Functions",
      description:
        "Explore ES6+, arrow functions, and modular programming patterns.",
      color: "from-blue-500 to-yellow-400",
    },
  };

  return (
    <>
      {/* <Suspense fallback={<DashboardSkeleton />}> */}
      <div className="relative">
        {loading && <DashboardSkeleton />}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <UserHeadline mainText="Dashboard" subText="" preText="" />
        </section>

        <div className="relative bg-gradient-to-t from-purple-400 to-pink-400 text-white rounded-xl overflow-hidden px-8 py-4 lg:py-0 lg:px-16 flex justify-between items-center gap-8 shadow-md hover:shadow-lg transition-shadow duration-500 mb-5">
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
                  icon: <BiSolidBookBookmark className="size-8 sm:size-14" />,
                  iconBg: "bg-purple-600",
                  cardBg: "bg-purple-200",
                },
                {
                  title: "Learn",
                  value: dashboard?.total_success_payments,
                  icon: <GiStairsGoal className="size-8 sm:size-14" />,
                  iconBg: "bg-purple-600",
                  cardBg: "bg-purple-200",
                },
                {
                  title: "Metarials",
                  value: dashboard?.pending_booking,
                  icon: <PiNotebookFill className="size-8 sm:size-14" />,
                  iconBg: "bg-purple-600",
                  cardBg: "bg-purple-200",
                },
                {
                  title: "Tips",
                  value: dashboard?.total_results_published,
                  icon: <MdTipsAndUpdates className="size-8 sm:size-14" />,
                  iconBg: "bg-purple-600",
                  cardBg: "bg-purple-200",
                },
                {
                  title: "JPT Exam",
                  value: dashboard?.total_bookings,
                  icon: <IoIosAlarm className="size-8 sm:size-14" />,
                  iconBg: "bg-purple-600",
                  cardBg: "bg-purple-200",
                },
                {
                  title: "JLPT Exam",
                  value: dashboard?.total_success_payments,
                  icon: <IoIosAlarm className="size-8 sm:size-14" />,
                  iconBg: "bg-purple-600",
                  cardBg: "bg-purple-200",
                },
                {
                  title: "Mock Test",
                  value: dashboard?.pending_booking,
                  icon: <GiRingingAlarm className="size-8 sm:size-14" />,
                  iconBg: "bg-purple-600",
                  cardBg: "bg-purple-200",
                },
                {
                  title: "Exam Pattern",
                  value: dashboard?.total_results_published,
                  icon: <LuComponent className="size-8 sm:size-14" />,
                  iconBg: "bg-purple-600",
                  cardBg: "bg-purple-200",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-2 items-center p-2 lg:p-6 sm:bg-purple-300/50 rounded-xl hover:shadow-md shadow-purple-400 transition duration-300 border border-transparent hover:border-gray-200`}
                >
                  <div className={`${item.iconBg} p-1 rounded-md text-white`}>
                    {item.icon}
                  </div>
                  <h1 className="text-xs sm:text-sm lg:text-base font-medium text-center">
                    {item.title}
                  </h1>
                </div>
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
                  <div className={`${item.iconBg} p-3 rounded-full text-white`}>
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

        <section className="w-full overflow-x-auto mt-10">
          <h2 className="sm:text-xl font-bold mb-8 text-purple-600 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            🌈 Your Learning Roadmap
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Current Module */}
            <div className="relative p-8 rounded-2xl bg-purple-500 border border-purple-600 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold flex items-center gap-2 text-white">
                  <FaBookOpen className="text-yellow-300" /> Current Module
                </h3>
                <span className="text-sm text-white font-medium">
                  {modules.current.progress}% Complete
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">
                {modules.current.title}
              </h4>
              <p className="text-gray-100 mb-6">
                {modules.current.description}
              </p>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${modules.current.color}`}
                  style={{ width: `${modules.current.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Next Module */}
            <div className="relative p-8 rounded-2xl bg-violet-500 border border-violet-600 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(96,165,250,0.4)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold flex items-center gap-2 text-white">
                  <FaClock className="text-green-300" /> Next Module
                </h3>
                <span className="text-sm text-white font-medium">
                  Coming Up
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">
                {modules.next.title}
              </h4>
              <p className="text-gray-100">{modules.next.description}</p>
            </div>
          </div>
        </section>
      </div>

      {/* </Suspense> */}
    </>
  );
}
