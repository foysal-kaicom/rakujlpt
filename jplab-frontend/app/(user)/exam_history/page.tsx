"use client";

import { useState, useEffect, Suspense } from "react";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import Loader from "@/components/Loader";
import Link from "next/link";
import SuspenseLoader from "@/components/SuspenseLoader";

// Define the type for each exam item
interface ExamItem {
  id: number;
  exam_title: string;
  center: string;
  exam_date: string;
  exam_time: string;
  exam_end_time: string;
  booking_status: string;
  payment_status: string;
  paid_amount: number;
  is_admit: string;
  admit_card_file: string;
}

export default function UserExamHistory() {
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Exam Booking", to: "/exam_history" },
  ];
  const [examData, setExamData] = useState<ExamItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch exam history
  const getExamData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/booking/list");
      setExamData(response?.data?.data || []);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to get exam data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExamData();
  }, []);

  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        {loading && <Loader />}
        <div className="min-h-[60vh]">
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="mt-5 lg:px-10 lg:pb-10">
            <UserHeadline
              mainText="Exam Booking"
              subText=""
              preText=""
            />

            {/* Desktop Table */}
            <div className="overflow-clip mt-6 rounded-2xl hidden md:block">
              <table className="w-full border-separate border-spacing-0 rounded-xl bg-white border border-gray-200 shadow text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs sm:text-sm">
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                      Title
                    </th>
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200 hidden sm:table-cell">
                      Location
                    </th>
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                      Exam Date
                    </th>
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                      Exam Time
                    </th>
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                      Total
                    </th>
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                      Payment
                    </th>
                    <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                      Admit
                    </th>
                    <th className="p-2 sm:p-3 text-left font-bold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {examData.length > 0 ? (
                    examData.map((exam, index) => (
                      <tr
                        key={index}
                        className="bg-white hover:bg-blue-50 text-xs sm:text-sm transition"
                      >
                        <td className="p-2 sm:p-3 font-semibold text-blue-700 border-t border-r border-gray-200 capitalize">
                          {exam.exam_title || "N/A"}
                        </td>
                        <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200 hidden sm:table-cell capitalize">
                          {exam.center || "N/A"}
                        </td>
                        <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200 capitalize">
                          {exam.exam_date || "N/A"}
                        </td>
                        <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200 capitalize">
                          {exam.exam_time || "N/A"} -{" "}
                          {exam?.exam_end_time || "N/A"}
                        </td>
                        <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200">
                          <span className="font-semibold text-emerald-700 uppercase">
                            {exam.paid_amount}
                          </span>
                        </td>
                        <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200">
                          <span
                            className={`font-semibold text-blue-700 capitalize ${
                              exam.payment_status == "success"
                                ? "text-blue-700"
                                : "text-red-600"
                            }`}
                          >
                            {exam.payment_status}
                          </span>
                        </td>
                        <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200">
                          {exam.admit_card_file ? (
                            <a
                              href={exam.admit_card_file}
                              target="_blank"
                              download={exam.admit_card_file}
                              className="px-3 py-1 rounded text-white text-xs bg-blue-500 cursor-pointer w-fit"
                            >
                              Download
                            </a>
                          ) : (
                            <p className="px-3 py-1 rounded text-white text-xs bg-gray-500 cursor-not-allowed text-center w-fit">
                              Download
                            </p>
                          )}
                        </td>
                        <td className="p-2 sm:p-3 text-gray-700 border-t border-gray-200">
                          <Link
                            href={`exam_history/${exam.id}`}
                            className="px-3 py-1 rounded text-white text-xs bg-blue-500 cursor-pointer"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center text-gray-500 py-6 border-t"
                      >
                        No exam history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden mt-6 space-y-4">
              {examData.length > 0 ? (
                examData.map((exam, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow border border-gray-200 p-4 space-y-2"
                  >
                    <div className="text-sm font-semibold text-blue-700 capitalize">
                      {exam.exam_title || "N/A"}
                    </div>
                    <div className="text-xs text-gray-700 capitalize">
                      <strong>Location:</strong> {exam.center || "N/A"}
                    </div>
                    <div className="text-xs text-gray-700 capitalize">
                      <strong>Exam Date:</strong> {exam.exam_date || "N/A"}
                    </div>
                    <div className="text-xs text-gray-700 capitalize">
                      <strong>Exam Time:</strong> {exam.exam_time || "N/A"} -{" "}
                      {exam?.exam_end_time || "N/A"}
                    </div>
                    <div className="text-xs text-gray-700">
                      <strong>Total:</strong>{" "}
                      <span className="font-semibold text-emerald-700 uppercase">
                        {exam.paid_amount}
                      </span>
                    </div>
                    <div className="text-xs text-gray-700">
                      <strong>Payment:</strong>{" "}
                      <span
                        className={`font-semibold capitalize ${
                          exam.payment_status == "success"
                            ? "text-blue-700"
                            : "text-red-600"
                        }`}
                      >
                        {exam.payment_status}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2 mt-3">
                      <Link
                        href={`/exam_history/${exam.id}`}
                        className="px-3 py-1 rounded text-white text-xs bg-blue-500 cursor-pointer"
                      >
                        View
                      </Link>
                      {exam.admit_card_file ? (
                        <a
                          href={exam.admit_card_file}
                          target="_blank"
                          download={exam.admit_card_file}
                          className="px-3 py-1 rounded text-white text-xs bg-blue-500 cursor-pointer w-fit"
                        >
                          Download Admit
                        </a>
                      ) : (
                        <p className="px-3 py-1 rounded text-white text-xs bg-gray-500 cursor-not-allowed w-fit">
                          Download Admit
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-6 border-t">
                  No exam history found.
                </div>
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
