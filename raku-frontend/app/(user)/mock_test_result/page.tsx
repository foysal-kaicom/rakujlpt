"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

import { toast } from "sonner";
import axiosInstance from "@/utils/axios";
import { useTranslation } from "react-i18next";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import Loader from "@/components/Loader";
import SuspenseLoader from "@/components/SuspenseLoader";
import PaginatedComponent from "@/components/PaginateComponent";
import ExamDetailsModal from "./ExamDetailsModal";
import MocktestResultEvaluation from "./MocktestResultEvaluationComponent";

interface ModuleScore {
  wrong: number;
  correct: number;
  answered: number;
}

interface ExamInfo {
  id: number;
  name: string;
  title: string;
  pass_point: number;
  total_point: number;
}

interface MockTestResult {
  id: number;
  candidate_id: number;
  question_set: number;
  per_question_mark: number;
  total_answered: number;
  total_correct: number;
  total_wrong: number;
  module_wise_score?: Record<string, ModuleScore>;
  created_at: string;
  updated_at: string;
  exam: ExamInfo;
}

export default function MockExamResult() {
  const { t } = useTranslation("common");

  const breadCrumbData = [
    { name: t("mock_exam_result.breadcrumbs.dashboard"), to: "/dashboard" },
    {
      name: t("mock_exam_result.breadcrumbs.result"),
      to: "/mock_test_result",
    },
  ];

  const [resultData, setResultData] = useState<MockTestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate pagination
  const totalExams = resultData.length;
  const totalPages = Math.ceil(totalExams / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResult = resultData.slice(startIndex, startIndex + itemsPerPage);

  const [selectedItem, setSelectedItem] = useState<MockTestResult | null>(null);

  const getStatus = (
    achieved: number,
    perQuestionMarks: number,
    passing: number
  ) => (achieved * perQuestionMarks >= passing ? "passed" : "failed");

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getMockTestResultData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/mock-test/results");
      const data: ExamResult[] = response?.data?.data || [];
      setResultData(data);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          t("mock_exam_result.status.fetch_error")
      );
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

      toast.success(t("mock_exam_result.status.download_complete"));
    } catch (error: any) {
      toast.error(t("mock_exam_result.status.download_failed"));
    }
  };

  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        {loading && <Loader />}
        <div className="min-h-[60vh]">
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="mt-5 lg:pb-10">
            <UserHeadline
              mainText={t("mock_exam_result.title")}
              preText=""
              subText=""
            />
            <div className="flex justify-end">
              <MocktestResultEvaluation resultData={resultData} />
            </div>
            {/* Result Table/Card */}
            <div className="w-full flex flex-col gap-5 mt-5">
              {currentResult.length > 0 ? (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-auto rounded-xl border border-violet-200 bg-white/50 backdrop-blur-lg">
                    <table className="w-full text-sm relative">
                      <thead>
                        <tr className="bg-linear-to-r from-purple-700 via-violet-700 to-blue-700 text-white">
                          <th className="p-3 text-left font-bold border-r border-gray-200">
                            {t("mock_exam_result.table.date")}
                          </th>
                          <th className="p-3 text-left font-bold border-r border-gray-200">
                            {t("mock_exam_result.table.exam")}
                          </th>
                          <th className="p-3 text-center font-bold border-r border-gray-200">
                            {t("mock_exam_result.table.score")}
                          </th>
                          <th className="p-3 text-center font-bold border-r border-gray-200">
                            {t("mock_exam_result.table.passing")}
                          </th>
                          <th className="p-3 text-center font-bold border-r border-gray-200">
                            {t("mock_exam_result.table.status")}
                          </th>
                          <th className="p-3 text-center font-bold border-r border-gray-200">
                            {t("mock_exam_result.table.certificate")}
                          </th>
                          <th className="p-3 text-center font-bold border-gray-200">
                            {t("mock_exam_result.table.action")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentResult.map((c, i) => {
                          const status = getStatus(
                            c.total_correct,
                            c.per_question_mark,
                            c.exam.pass_point
                          );
                          return (
                            <tr
                              key={i}
                              className="bg-white/40 backdrop-blur-md hover:shadow-lg transition-all"
                            >
                              <td className="p-3 text-gray-700 border-t border-r border-gray-200">
                                {c?.created_at}
                              </td>
                              <td className="p-3 text-purple-700 border-t border-r border-gray-200 font-semibold">
                                {c.exam.title} Exam
                              </td>
                              <td className="p-3 border-t border-r border-gray-200 font-medium text-center">
                                {Math.round(
                                  (c?.total_correct ?? 0) *
                                    (c?.per_question_mark ?? 0)
                                )}
                                /{c.exam.total_point ?? 0}
                              </td>
                              <td className="p-3 border-t border-r border-gray-200 font-medium text-center">
                                {c?.exam?.pass_point}/{c.exam.total_point ?? 0}
                              </td>
                              <td className="p-3 border-t border-r border-gray-200 capitalize font-bold text-purple-700 text-center">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${
                                      status === "passed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                                >
                                  {status.toUpperCase()}
                                </span>
                              </td>
                              <td className="p-3 border-t border-r border-gray-200 capitalize text-xs font-medium">
                                {status == "passed" ? (
                                  <div className="flex justify-center">
                                    <button
                                      onClick={() => handleDownload(c.id)}
                                      className="py-1.5 px-4 border-b border-b-purple-300 rounded-2xl bg-purple-700 text-white hover:opacity-80 duration-300 drop-shadow-sm drop-shadow-purple-500 w-22 mx-auto cursor-pointer"
                                    >
                                      {t("mock_exam_result.table.generate_btn")}
                                    </button>
                                  </div>
                                ) : (
                                  <p className="text-gray-700 text-center">
                                    --
                                  </p>
                                )}
                              </td>
                              <td className="p-3 border-t border-gray-200 capitalize text-xs font-medium">
                                <div className="flex">
                                  <button
                                    onClick={() => setSelectedItem(c)}
                                    className="px-4 py-1.5 rounded-2xl bg-violet-600 text-white font-medium text-xs hover:bg-violet-800 transition mx-auto w-22 cursor-pointer"
                                  >
                                    {t("mock_exam_result.table.details_btn")}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden flex flex-col gap-4">
                    {currentResult.map((c, i) => {
                      const status = getStatus(
                        c.total_correct,
                        c.per_question_mark,
                        c.exam.pass_point
                      );
                      return (
                        <div
                          key={i}
                          className="bg-white shadow-sm rounded-lg p-4 hover:shadow-xl transition"
                        >
                          <div className=" space-y-1 space-x-1 text-sm mb-2">
                            <span className="font-semibold text-violet-500">
                              JLPT Exam
                            </span>
                            <span className="text-gray-500">
                              ({c?.created_at})
                            </span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500 font-medium">
                                {t("mock_exam_result.table.score")}
                              </p>
                              <span className="text-blue-500 font-semibold text-xs">
                                {Math.round(
                                  (c?.total_correct ?? 0) *
                                    (c?.per_question_mark ?? 0)
                                )}
                                /{c.exam.total_point ?? 0}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500 font-medium">
                                {t("mock_exam_result.table.passing")}
                              </p>
                              <span className="text-blue-500 font-semibold text-xs">
                                {c?.exam?.pass_point}/{c.exam.total_point ?? 0}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500 font-medium">
                                {t("mock_exam_result.table.status")}
                              </p>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${
                                      status === "passed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                              >
                                {status.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          <div className="gap-2 mt-4 flex justify-between">
                            <button
                              onClick={() => setSelectedItem(c)}
                              className="px-4 py-1 rounded-2xl bg-violet-600 text-white font-medium text-xs hover:bg-violet-800 transition w-22 cursor-pointer"
                            >
                              {t("mock_exam_result.table.details_btn")}
                            </button>
                            {status == "passed" && (
                              <button
                                onClick={() => handleDownload(c.id)}
                                className="py-1 px-3 border-b border-b-purple-300 rounded-2xl bg-purple-700 text-white hover:opacity-80 duration-300 drop-shadow-sm drop-shadow-purple-500 text-xs cursor-pointer"
                              >
                                {t("mock_exam_result.table.download_btn")}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
                  {t("mock_exam_result.empty_state.message")}
                  <Link href="/mock_test_select">
                    <button className="relative overflow-hidden text-sm md:text-base inline-block px-10 py-2 font-semibold text-white rounded-full bg-linear-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300 ease-out cursor-pointer">
                      <span className="relative z-10">
                        {" "}
                        {t("mock_exam_result.empty_state.btn")}
                      </span>
                      <span className="absolute inset-0 bg-linear-to-r from-purple-400/30 via-pink-400/30 to-blue-400/30 blur-xl opacity-60 transition-opacity duration-300 group-hover:opacity-90"></span>
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {selectedItem && (
              <ExamDetailsModal
                data={selectedItem}
                onClose={() => setSelectedItem(null)}
              />
            )}
          </div>
        </div>
      </Suspense>
    </>
  );
}
