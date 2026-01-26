"use client";

import axiosInstance from "@/utils/axios";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { useBusinessSettingsStore } from "@/stores/useBusinessStore";
import { useAuthStore } from "@/stores/useAuthStore";

import { LuComponent } from "react-icons/lu";
import { IoIosAlarm } from "react-icons/io";
import { PiNotebookFill } from "react-icons/pi";
import { GiStairsGoal } from "react-icons/gi";
import { MdTipsAndUpdates } from "react-icons/md";
import { FaCoins, FaWallet } from "react-icons/fa";
import { Clock, Target, TrendingUp, Flame } from "lucide-react";
import { PlayCircle, FileText, CheckCircle } from "lucide-react";

import DashboardSkeleton from "./dashboardSkeleton";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");

  const [loading, setLoading] = useState(true);
  const [allExam, setAllExam] = useState<ExamItem[]>([]);
  const [dashboard, setDashboard] = useState<DashboardItem>(
    {} as DashboardItem,
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
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <div className="">
            {/* Header */}
            <UserHeadline
              mainText={t("dashboard.title")}
              subText=""
              preText=""
            />

            {/* Quick Actions */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-6 mt-8">
              <ActionCard
                title="Mock Test"
                button="Start Test"
                icon={IoIosAlarm}
                action={"/mock_test_select"}
              />
              <ActionCard
                title="Practice Roadmap"
                button="View Materials"
                icon={GiStairsGoal}
                action={"/practice"}
              />

              <ActionCard
                title="Exam Pattern"
                button="View Materials"
                icon={LuComponent}
                action={"/question_composition"}
              />

              <ActionCard
                title="Course Materials"
                button="View Materials"
                icon={PiNotebookFill}
                action={"/dashboard"}
              />

              <ActionCard
                title="Tips"
                button="View Materials"
                icon={MdTipsAndUpdates}
                action={"/dashboard"}
              />
            </section>

            {/* Progress & Report */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <DailyProgress />
              <PerformanceReport />
              <Milestones />
            </section>
            <RecentActivity />
          </div>
        </>
      )}
    </>
  );
}

function ActionCard({ title, action, button, icon: Icon }: any) {
  return (
    <Link href={action}>
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center  text-white  ">
          <Icon size={34} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <button className="ml-auto text-sm font-semibold text-violet-600 hover:text-blue-600 transition cursor-pointer">
            {button}
          </button>
        </div>
      </div>
    </Link>
  );
}

function DailyProgress() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">📅 Daily Progress</h3>

      {["Reading", "Listening", "Grammar"].map((item, i) => (
        <div key={i} className="mb-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{item}</span>
            <span>70%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-violet-500 to-blue-500 h-2 rounded-full w-[70%]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function PerformanceReport() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">
        📊 Performance Report
      </h3>

      <ul className="space-y-2 text-sm text-gray-700">
        <li>
          ✔ Tests Taken: <b>18</b>
        </li>
        <li>
          ✔ Avg Score: <b>72%</b>
        </li>
        <li>
          ✔ Accuracy: <b>68%</b>
        </li>
        <li>
          ✔ Weak Area: <b>Grammar</b>
        </li>
      </ul>
    </div>
  );
}

function Milestones() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">🏆 Milestones</h3>

      <ul className="space-y-2 text-sm text-gray-700">
        <li>🎉 Completed 10 Mock Tests</li>
        <li>🔥 7 Days Study Streak</li>
        <li>🚀 Reached 70% Accuracy</li>
      </ul>
    </div>
  );
}

function RecentActivity() {
  const activities = [
    {
      title: "Mock Test – Reading Section",
      meta: "Score: 68% • 2 hours ago",
      icon: PlayCircle,
      color: "text-violet-600",
      bg: "bg-violet-50",
      action: "Resume",
    },
    {
      title: "Grammar Notes – N4",
      meta: "Completed yesterday",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
      action: "View",
    },
    {
      title: "Listening Practice",
      meta: "Completed • Score 75%",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      action: "Review",
    },
  ];

  return (
    <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">🕒 Recent Activity</h3>
        <button className="text-sm text-violet-600 hover:underline">
          View All
        </button>
      </div>

      <ul className="space-y-4">
        {activities.map((item, i) => {
          const Icon = item.icon;
          return (
            <li
              key={i}
              className="
                flex items-center gap-4
                p-3 rounded-xl
                hover:bg-gray-50
                transition
              "
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bg} ${item.color}`}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{item.meta}</p>
              </div>

              <button className="text-sm font-semibold text-violet-600 hover:text-blue-600">
                {item.action}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
