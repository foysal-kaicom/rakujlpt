"use client";

import axiosInstance from "@/utils/axios";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbCircleNumber9Filled } from "react-icons/tb";
import { MdOutlinePieChart } from "react-icons/md";
import Loader from "@/components/Loader";
import SuspenseLoader from "@/components/SuspenseLoader";

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
  const [loading, setLoading] = useState(false);
  const [allExam, setAllExam] = useState<ExamItem[]>([]);
  const [dashboard, setDashboard] = useState<DashboardItem>(
    {} as DashboardItem
  );

  const getExamData = async () => {
    setLoading(true);
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
    setLoading(true);
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
      <Suspense fallback={<SuspenseLoader />}>
        {loading && <Loader />}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </section>
        <div className="space-y-5 bg-white p-5 rounded-md lg:mx-10">
          <section className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                title: "Applied to Exam",
                value: dashboard?.total_bookings,
                icon: <MdOutlinePieChart className="size-6" />,
                iconBg: "bg-sky-600",
                cardBg: "bg-sky-50",
              },
              {
                title: "Completed Payment",
                value: dashboard?.total_success_payments,
                icon: <RiMoneyDollarCircleLine className="size-6" />,
                iconBg: "bg-green-600",
                cardBg: "bg-green-50",
              },
              {
                title: "Pending Payment",
                value: dashboard?.pending_booking,
                icon: <RiMoneyDollarCircleLine className="size-6" />,
                iconBg: "bg-yellow-500",
                cardBg: "bg-yellow-50",
              },
              {
                title: "Results Published",
                value: dashboard?.total_results_published,
                icon: <TbCircleNumber9Filled className="size-6" />,
                iconBg: "bg-purple-600",
                cardBg: "bg-purple-50",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.cardBg} p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-transparent hover:border-gray-200`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
                  <div
                    className={`${item.iconBg} text-white p-3 rounded-full flex items-center justify-center shadow-inner`}
                  >
                    {item.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-700">
                    {item.title}
                  </h2>
                </div>
                <p className="text-3xl font-bold mt-4 text-gray-800 text-right">
                  {item.value}
                </p>
              </div>
            ))}
          </section>

          <div className="mt-8 space-y-3">
            <h1 className="text-xl font-bold">All Available Exam Date</h1>
            <div className="rounded-xl border border-gray-200 hidden lg:block">
              <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden text-xs md:text-sm text-left shadow-md">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs md:text-sm">
                  <tr>
                    <th className="px-2 py-2 sm:px-6 sm:py-4 font-semibold border-r">
                      Title
                    </th>
                    <th className="px-2 py-2 sm:px-6 sm:py-4 font-semibold border-r">
                      Exam Date
                    </th>
                    <th className="px-2 py-2 sm:px-6 sm:py-4 font-semibold border-r">
                      Exam Time
                    </th>
                    <th className="px-2 py-2 sm:px-6 sm:py-4 font-semibold border-r">
                      Application Deadline
                    </th>
                    <th className="px-2 py-2 sm:px-6 sm:py-4 font-semibold">
                      Apply
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allExam.filter((exam) => exam.available_to_apply).length >
                  0 ? (
                    allExam
                      .filter((exam) => exam.available_to_apply)
                      .map((exam, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-2 py-2 sm:px-6 sm:py-4 text-gray-800 border-r border-gray-200">
                            {exam?.title}
                          </td>
                          <td className="px-2 py-2 sm:px-6 sm:py-4 text-gray-700 border-r border-gray-200">
                            {exam?.exam_date}
                          </td>
                          <td className="px-2 py-2 sm:px-6 sm:py-4 text-gray-700 border-r border-gray-200">
                            {exam?.start_time}{" "}
                            <span className="text-blue-500">to</span>{" "}
                            {exam?.end_time}
                          </td>
                          <td className="px-2 py-2 sm:px-6 sm:py-4 text-red-600 border-r border-gray-200">
                            {exam?.application_deadline}
                          </td>
                          <td className="px-2 py-2 sm:px-6 sm:py-4">
                            <Link
                              href={`/registration_terms/${exam.slug}`}
                              className="bg-blue-600 hover:bg-blue-800 text-white sm:font-semibold text-xs md:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded-md shadow-sm transition-all"
                            >
                              Apply Now
                            </Link>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center text-gray-500 py-4"
                      >
                        No available exams
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-5">
              {allExam.filter((exam) => exam.available_to_apply).length > 0 ? (
                allExam
                  .filter((exam) => exam.available_to_apply)
                  .map((exam, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl border border-gray-200 p-6 shadow-md transition-all duration-300 ${
                        i % 2 === 0
                          ? "bg-gradient-to-br from-white via-gray-50 to-white"
                          : "bg-white"
                      } hover:shadow-lg`}
                    >
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                        {exam?.title}
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm sm:text-base text-gray-700">
                        <p>
                          <span className="font-medium text-gray-900">
                            📅 Date:
                          </span>{" "}
                          {exam?.exam_date}
                        </p>
                        <p>
                          <span className="font-medium text-gray-900">
                            ⏰ Time:
                          </span>{" "}
                          {exam?.start_time} - {exam?.end_time}
                        </p>
                        <p>
                          <span className="font-medium text-gray-900">
                            🕒 Deadline:
                          </span>{" "}
                          {exam?.application_deadline}
                        </p>

                        <Link
                          href={`/registration_terms/${exam.slug}`}
                          className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs sm:text-sm font-semibold py-2 px-5 rounded-full shadow-sm transition-all sm:w-30 text-center"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center text-gray-500 py-6">
                  No available exams
                </div>
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
