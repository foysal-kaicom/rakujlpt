"use client";

import axiosInstance from "@/utils/axios";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { SiAudiobookshelf } from "react-icons/si";
import { LuLetterText } from "react-icons/lu";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { IoIosBookmarks } from "react-icons/io";
import { PiNotebookFill } from "react-icons/pi";
import { GiStairsGoal } from "react-icons/gi";
import { BiSolidBookBookmark } from "react-icons/bi";
import { MdTipsAndUpdates } from "react-icons/md";
import { IoIosAlarm } from "react-icons/io";
import { GiRingingAlarm } from "react-icons/gi";
import { LuComponent } from "react-icons/lu";

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

  return (
    <>
      {/* <Suspense fallback={<DashboardSkeleton />}> */}
      <div className="relative">
        {loading && <DashboardSkeleton />}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <UserHeadline mainText="Dashboard" subText="" preText="" />
        </section>

        <div className="relative bg-gradient-to-t from-purple-400 to-pink-400 text-white rounded-xl overflow-hidden px-8 py-4 lg:px-16 flex flex-col lg:flex-row justify-between items-center gap-8 shadow-md hover:shadow-lg transition-shadow duration-500">
          {/* Animated Floating Orbs */}
          <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-purple-500 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-pink-400 blur-3xl"></div>

          <div className="relative z-10 lg:max-w-1/2 text-center lg:text-left mt-10 lg:mt-0">
            <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4">
              📝 Boost Your Japanese Skills!
            </h1>
            <p className="text-sm sm:text-base mb-6 text-white font-medium">
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

          <div className="w-full sm:w-[300px] 2xl:w-[400px]">
            <Image
              src="/assets/img/mocktest/t13.png"
              alt="Mock Test Illustration"
              height={400}
              width={400}
              className="w-full"
            />
          </div>
        </div>

        <section className="space-y-4">
          <div className="space-y-2 sm:bg-white sm:p-5 rounded-md lg:mx-10 sm:border border-gray-200">
            <h1 className="font-bold sm:text-xl">Daily Practice</h1>
            <section className="grid grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                {
                  title: "Vocabulary",
                  value: dashboard?.total_bookings,
                  icon: (
                    <RxLetterCaseCapitalize className="size-8 sm:size-14" />
                  ),
                  iconBg: "bg-sky-600",
                  cardBg: "bg-sky-200",
                },
                {
                  title: "Grammer",
                  value: dashboard?.total_success_payments,
                  icon: <LuLetterText className="size-8 sm:size-14" />,
                  iconBg: "bg-green-600",
                  cardBg: "bg-green-200",
                },
                {
                  title: "Listening",
                  value: dashboard?.pending_booking,
                  icon: <SiAudiobookshelf className="size-8 sm:size-14" />,
                  iconBg: "bg-yellow-500",
                  cardBg: "bg-amber-100",
                },
                {
                  title: "Reading",
                  value: dashboard?.total_results_published,
                  icon: <IoIosBookmarks className="size-8 sm:size-14" />,
                  iconBg: "bg-cyan-600",
                  cardBg: "bg-cyan-200",
                },
              ].map((item, index) => (
                <div
                  className={`${item.cardBg} flex gap-2 items-center p-2 rounded-md shadow-md hover:shadow-xl transition duration-300 border border-transparent hover:border-gray-200`}
                >
                  <div className={`${item.iconBg} p-1 rounded-md text-white`}>
                    {item.icon}
                  </div>
                  <div className="space-y-2 w-[calc(100%-74px)]">
                    <h1 className="text-sm sm:text-lg font-semibold">
                      {item.title}
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

          <div className=" lg:mx-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section className="space-y-2 sm:bg-white sm:p-5 rounded-md sm:border border-gray-200 mt-3 sm:mt-0">
              <h1 className="font-bold sm:text-xl">Learn & Practice</h1>
              <section className="grid grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-6">
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
                ].map((item, index) => (
                  <div
                    className={`sm:bg-purple-200 flex flex-col sm:flex-row gap-2 items-center p-2 rounded-md sm:shadow-md hover:shadow-xl transition duration-300 border border-transparent hover:border-gray-200`}
                  >
                    <div className={`${item.iconBg} p-1 rounded-md text-white`}>
                      {item.icon}
                    </div>
                    <div className="space-y-2 sm:w-[calc(100%-74px)] text-center">
                      <h1 className="text-xs sm:text-lg font-medium sm:font-semibold overflow-hidden">
                        {item.title}
                      </h1>
                      {/* <p></p> */}
                    </div>
                  </div>
                ))}
              </section>
            </section>

            <section className="space-y-2 sm:bg-white sm:p-5 rounded-md sm:border border-gray-200">
              <h1 className="font-bold sm:text-xl">Exam Solution</h1>
              <section className="grid grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-6">
                {[
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
                    className={`sm:bg-purple-200 flex flex-col sm:flex-row gap-2 items-center p-2 rounded-md sm:shadow-md hover:shadow-xl transition duration-300 border border-transparent hover:border-gray-200`}
                  >
                    <div className={`${item.iconBg} p-1 rounded-md text-white`}>
                      {item.icon}
                    </div>
                    <div className="space-y-2 sm:w-[calc(100%-74px)] text-center">
                      <h1 className="text-xs sm:text-lg font-medium sm:font-semibold overflow-hidden">
                        {item.title}
                      </h1>
                      {/* <p></p> */}
                    </div>
                  </div>
                ))}
              </section>
            </section>
          </div>
        </section>
        
      </div>

      {/* </Suspense> */}
    </>
  );
}
