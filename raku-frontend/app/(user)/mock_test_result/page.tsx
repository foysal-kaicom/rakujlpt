"use client";

import { useState, useEffect, Suspense } from "react";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";
import SuspenseLoader from "@/components/SuspenseLoader";
import PaginatedComponent from "@/components/PaginateComponent";

import Link from "next/link";

interface Exam {
  title: string;
  pass_point: number;
}

interface Exam {
  id: number;
  reading_answered: number;
  correct_reading_answer: number;
  wrong_reading_answer: number;
  listening_answered: number;
  correct_listening_answer: number;
  wrong_listening_answer: number;
  module_scores: { [key: string]: number };
  created_at?: string;
  total_marks?: string;
  total_questions: number;
  per_question_mark: number;
  exam_id: number;
  exam: Exam;
}

export default function MockExamResult() {
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Mock Exam Result", to: "/mock_test_result" },
  ];

  const [resultData, setResultData] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalExams = resultData.length;
  const totalPages = Math.ceil(totalExams / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResult = resultData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const formatDate = (timestamp?: string | null): string => {
    if (!timestamp) return "N/A";

    const cleanedDate = timestamp.split(".")[0] + "Z";
    const date = new Date(cleanedDate);

    if (isNaN(date.getTime())) return "N/A";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  const getMockTestResultData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/mock-test/results");
      const data: Exam[] = response?.data?.data || [];
      setResultData(data);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to get exam data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMockTestResultData();
  }, []);

  const handleDownload = async (id: any) => {
    try {
      const response = await axiosInstance.get("/certificate-download", {
        params: { mockTest_id: id },
        responseType: "blob",
      });
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", `certificate-${id}.pdf`);
      document.body.appendChild(link);

      link.click();
      link.remove();

      toast.success("Download Complete");
    } catch (error: any) {
      toast.error("Download Failed");
    }
  };

  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        {loading && <Loader />}
        <div className="min-h-[60vh] py-6">
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="mt-5 lg:pb-10">
            <UserHeadline mainText="Mock Exam Result" preText="" subText="" />

            {/* Result Table/Card */}
            <div className="w-full flex flex-col gap-5 mt-6">
              {currentResult.length > 0 ? (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-auto rounded-xl shadow-lg border border-gray-200 bg-white/50 backdrop-blur-lg">
                    <table className="w-full text-sm relative">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-700 via-violet-700 to-blue-700 text-white">
                          <th className="p-3 text-left font-bold border-r border-gray-200">
                            Date
                          </th>
                          <th className="p-3 text-left font-bold border-r border-gray-200">
                            Exam
                          </th>
                          <th className="p-3 text-left font-bold border-r border-gray-200">
                            Listening
                          </th>
                          <th className="p-3 text-left font-bold border-r border-gray-200">
                            Reading
                          </th>
                          <th className="p-3 text-left font-bold border-gray-200">
                            Total Score
                          </th>
                          <th className="p-3 text-left font-bold border-gray-200">
                            Certificate
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentResult.map((c, i) => (
                          <tr
                            key={i}
                            className="bg-white/40 backdrop-blur-md hover:shadow-lg transition-all"
                          >
                            <td className="p-3 text-gray-700 border-t border-r border-gray-200">
                              {formatDate(c?.created_at)}
                            </td>
                            <td className="p-3 text-purple-700 border-t border-r border-gray-200 font-semibold">
                              {c.exam.title} Exam
                            </td>
                            <td className="p-3 border-t border-r border-gray-200 font-medium">
                              <div className="grid grid-cols-1 gap-1 text-xs ">
                                <span className="text-blue-600">
                                  Answered: {c?.listening_answered ?? 0}
                                </span>
                                <span className="text-green-600">
                                  Correct: {c?.correct_listening_answer ?? 0}
                                </span>
                                <span className="text-red-600">
                                  Wrong: {c?.wrong_listening_answer ?? 0}
                                </span>
                                <span className="text-purple-600 font-semibold">
                                  Score:{" "}
                                  {(c?.correct_listening_answer ?? 0) *
                                    c?.per_question_mark}
                                </span>
                              </div>
                            </td>
                            <td className="p-3 border-t border-r border-gray-200 font-medium">
                              <div className="grid grid-cols-1 gap-1 text-xs">
                                <span className="text-blue-600">
                                  Answered: {c?.reading_answered ?? 0}
                                </span>
                                <span className="text-green-600">
                                  Correct: {c?.correct_reading_answer ?? 0}
                                </span>
                                <span className="text-red-600">
                                  Wrong: {c?.wrong_reading_answer ?? 0}
                                </span>
                                <span className="text-purple-600 font-semibold">
                                  Score:{" "}
                                  {(c?.correct_reading_answer ?? 0) *
                                    c?.per_question_mark}
                                </span>
                              </div>
                            </td>
                            <td className="p-3 border-t border-gray-200 capitalize font-bold text-purple-700 text-lg">
                              {Math.round(
                                (c?.correct_listening_answer ?? 0) +
                                  (c?.correct_reading_answer ?? 0)
                              ) * c?.per_question_mark}
                            </td>
                            <td className="p-3 border-t border-gray-200 capitalize text-xs font-medium">
                              {((c?.correct_listening_answer ?? 0) +
                                (c?.correct_reading_answer ?? 0)) *
                                (c?.per_question_mark ?? 0) >
                              (c.exam.pass_point ?? 0) ? (
                                <button
                                  onClick={() => handleDownload(c.id)}
                                  className="py-1.5 px-4 border-b border-b-purple-300 rounded-2xl bg-purple-700 text-white hover:opacity-80 duration-300 drop-shadow-sm drop-shadow-purple-500"
                                >
                                  Generate
                                </button>
                              ) : (
                                <span className="text-gray-400">
                                  Not Passed
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden flex flex-col gap-4">
                    {currentResult.map((c, i) => (
                      <div
                        key={i}
                        className="bg-white shadow-sm rounded-lg p-4 hover:shadow-xl transition"
                      >
                        <div className="mb-4 text-xs flex justify-between gap-4 items-center">
                          <div className=" space-y-1    space-x-1">
                            <span className="font-semibold text-violet-500">
                              JLPT Exam
                            </span>
                            <span className="text-gray-500">
                              ({formatDate(c?.created_at)})
                            </span>
                          </div>
                          {((c?.correct_listening_answer ?? 0) +
                            (c?.correct_reading_answer ?? 0)) *
                            (c?.per_question_mark ?? 0) >
                          (c.exam.pass_point ?? 0) ? (
                            <button
                              onClick={() => handleDownload(c.id)}
                              className="py-1 px-3 border-b border-b-purple-300 rounded-2xl bg-purple-700 text-white hover:opacity-80 duration-300 drop-shadow-sm drop-shadow-purple-500"
                            >
                              Download
                            </button>
                          ) : (
                            <p className="text-gray-500">Not Passed</p>
                          )}
                        </div>
                        <div className="flex justify-between gap-4">
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 font-medium">
                              Listening
                            </p>
                            <div className="grid grid-cols-1 gap-2 items-center text-xs">
                              <span className="text-blue-500 font-semibold">
                                Answered: {c?.listening_answered ?? "N/A"}
                              </span>
                              <span className="text-green-500 font-semibold">
                                Correct: {c?.correct_listening_answer ?? "N/A"}
                              </span>
                              <span className="text-red-500 font-semibold">
                                Wrong: {c?.wrong_listening_answer ?? "N/A"}
                              </span>
                              <span className="text-purple-500 font-semibold">
                                Score:{" "}
                                {(c?.correct_listening_answer ?? "N/A") *
                                  c.per_question_mark}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 font-medium">
                              Reading
                            </p>
                            <div className="grid grid-cols-1 gap-2 items-center text-xs">
                              <span className="text-blue-500 font-semibold">
                                Answered: {c?.reading_answered ?? "N/A"}
                              </span>
                              <span className="text-green-500 font-semibold">
                                Correct: {c?.correct_reading_answer ?? "N/A"}
                              </span>
                              <span className="text-red-500 font-semibold">
                                Wrong: {c?.wrong_reading_answer ?? "N/A"}
                              </span>
                              <span className="text-purple-500 font-semibold">
                                Score:{" "}
                                {(c?.correct_reading_answer ?? "N/A") *
                                  c.per_question_mark}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 font-medium">
                              Total
                            </p>
                            <p className="text-purple-500 font-semibold text-xs">
                              {Math.round(
                                (c?.correct_listening_answer ?? 0) +
                                  (c?.correct_reading_answer ?? 0)
                              ) * c?.per_question_mark}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* pagination  */}
                  <PaginatedComponent
                    handlePageChange={handlePageChange}
                    totalPages={totalPages}
                    currentPage={currentPage}
                  />
                </>
              ) : (
                <div className="text-center text-gray-500 py-6 flex flex-col gap-3 justify-center items-center">
                  You have not participated in any mock test !!
                  <Link href="/mock_test_select">
                    <button className="relative overflow-hidden text-sm md:text-base inline-block px-10 py-2 font-semibold text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300 ease-out">
                      <span className="relative z-10"> Start Now</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-blue-400/30 blur-xl opacity-60 transition-opacity duration-300 group-hover:opacity-90"></span>
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
