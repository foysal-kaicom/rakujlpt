"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { LuComponent } from "react-icons/lu";
import { IoIosAlarm } from "react-icons/io";
import { PiNotebookFill } from "react-icons/pi";
import { GiStairsGoal } from "react-icons/gi";
import { MdTipsAndUpdates } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import { FileText, CheckCircle } from "lucide-react";
import { GrMoney } from "react-icons/gr";

import DashboardSkeleton from "./dashboardSkeleton";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import { useTranslation } from "react-i18next";

import type { DashboardResponse } from "@/types/Dashboard/Dashboard.type";
import { DashboardService } from "@/services/dashboard/dashboard.service";

export default function Dashboard() {
  const { t } = useTranslation("common");

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [value, setValue] = useState(1);

  const handleNext = () => {
    setValue((prev) => (prev % 3) + 1);
  };

  const getDashboard = async () => {
    setLoading(true);
    try {
      const data = await DashboardService.getDashboardData();
      setDashboard(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
                title={t("dashboard.sections.exam_solution.items.mock_test")}
                button="Start Test"
                icon={IoIosAlarm}
                action={"/mock_test_select"}
              />
              <ActionCard
                title={t("dashboard.sections.exam_solution.items.practice")}
                button="Start Practice"
                icon={GiStairsGoal}
                action={"/practice"}
              />

              <ActionCard
                title={t("dashboard.sections.exam_solution.items.exam_pattern")}
                button="View Materials"
                icon={LuComponent}
                action={"/question_composition"}
              />

              <ActionCard
                title={t("dashboard.sections.exam_solution.items.materials")}
                button="View Materials"
                icon={PiNotebookFill}
                action={"/dashboard"}
              />

              <ActionCard
                title={t("dashboard.sections.exam_solution.items.tips")}
                button="View Materials"
                icon={MdTipsAndUpdates}
                action={"/dashboard"}
              />
            </section>

            {/* Progress & Report */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">
                  📅 Daily Progress
                </h3>

                {dashboard?.practice_progress.map((item, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{item.module_name}</span>
                      <span>{item.complete}%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                        style={{ width: `${item.complete}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">
                  📊 Performance Report
                </h3>

                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    ✔ Tests Taken: <b>{dashboard?.report?.exam_taken}</b>
                  </li>
                  <li>
                    ✔ Avg Score: <b>{dashboard?.report?.avg_score}%</b>
                  </li>
                  <li>
                    ✔ Accuracy: <b>{dashboard?.report?.accuracy}</b>
                  </li>
                  <li>
                    ✔ Weak Area: <b>{dashboard?.report?.weak_area}</b>
                  </li>
                </ul>
              </div>

              <Milestones />
            </section>

            <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  🕒 Recent Activity
                </h3>
                <button
                  onClick={handleNext}
                  className="text-sm text-white bg-violet-600 p-1 rounded-md cursor-pointer hover:scale-110 duration-300 shadow-xl"
                >
                  <LuArrowUpDown className="size-5" />
                </button>
              </div>
              {value == 1 && (
                <ul className="space-y-4">
                  {dashboard?.last_three_mock_tests &&
                  dashboard.last_three_mock_tests.length > 0 ? (
                    dashboard.last_three_mock_tests.map((item) => {
                      const Icon = FileText;

                      return (
                        <li
                          key={item.id}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-600 text-white">
                            <Icon size={20} />
                          </div>

                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {item.exam_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Score:{" "}
                              {Math.round(
                                item.per_question_mark * item.total_correct,
                              )}
                            </p>
                          </div>

                          <span className="text-xs font-medium text-violet-600 hover:text-blue-600">
                            {item.created_at.slice(0, 10)}
                          </span>
                        </li>
                      );
                    })
                  ) : (
                    <li className="text-sm text-gray-500 text-center capitalize">
                      No Recent Mocktest found
                    </li>
                  )}
                </ul>
              )}

              {value == 2 && (
                <ul className="space-y-4">
                  {dashboard?.last_three_subscriptions &&
                  dashboard.last_three_subscriptions.length > 0 ? (
                    dashboard.last_three_subscriptions.map((item, i) => {
                      const Icon = GrMoney;

                      return (
                        <li
                          key={i}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-600 text-white">
                            <Icon size={20} />
                          </div>

                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {item.package_name}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              Price: {item.price}
                            </p>

                            <p className="text-xs text-gray-500 capitalize">
                              Payment: {item.payment_status}
                            </p>
                          </div>

                          <span className="text-xs font-medium text-violet-600 hover:text-blue-600">
                            {item.start_date}
                          </span>
                        </li>
                      );
                    })
                  ) : (
                    <li className="text-sm text-gray-500 text-center capitalize">
                     No Recent Subscriprion found
                    </li>
                  )}
                </ul>
              )}

              {value == 3 && (
                <ul className="space-y-4">
                  {dashboard?.last_three_wallet_transactions &&
                  dashboard.last_three_wallet_transactions.length > 0 ? (
                    dashboard.last_three_wallet_transactions.map((item, i) => {
                      const Icon = CheckCircle;

                      return (
                        <li
                          key={i}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-600 text-white">
                            <Icon size={20} />
                          </div>

                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {item.remarks}
                            </p>
                            <p className="text-xs text-gray-500">
                              Points: {item.points}
                            </p>

                            <p className="text-xs text-gray-500 capitalize flex items-center gap-1">
                              Type:
                              <span
                                className={
                                  item.type == "credit"
                                    ? "text-green-800"
                                    : "text-red-800"
                                }
                              >
                                {item.type}
                              </span>
                            </p>
                          </div>

                          <span className="text-xs font-medium text-violet-600 hover:text-blue-600">
                            {item.created_at.slice(0, 10)}
                          </span>
                        </li>
                      );
                    })
                  ) : (
                    <li className="text-sm text-gray-500 text-center capitalize">
                      No Recent Wallet activity found
                    </li>
                  )}
                </ul>
              )}
            </section>
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
