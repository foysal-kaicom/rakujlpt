"use client";

import { useState, useEffect, Suspense } from "react";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";
import SuspenseLoader from "@/components/SuspenseLoader";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
}

interface ScoreData {
  test: string;
  listening: number;
  reading: number;
  total: number;
}

export default function MockExamResult() {
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Mock Exam Result", to: "/mock_test_result" },
  ];

  const [resultData, setResultData] = useState<Exam[]>([]);
  const [scoreData, setScoreData] = useState<ScoreData[]>([]);
  const [highestScores, setHighestScores] = useState({
    listening: 0,
    reading: 0,
    total: 0,
  });
  const [allTimeHighestScores, setAllTimeHighestScores] = useState({
    listening: 0,
    reading: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

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

  const getAllTimeHighest = (data: any[]) => {
    return data.reduce(
      (best, attempt) => {
        const listeningScore = attempt.correct_listening_answer * 2.5;
        const readingScore = attempt.correct_reading_answer * 2.5;
        const totalScore = listeningScore + readingScore;

        if (totalScore > best.total) {
          return {
            listening: listeningScore,
            reading: readingScore,
            total: totalScore,
          };
        }
        return best;
      },
      { listening: 0, reading: 0, total: 0 }
    );
  };

  const getMockTestResultData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/mock-test/results");
      const data: Exam[] = response?.data?.data || [];
      setResultData(data);

      // Transform API response -> chart-friendly data
      const formatted = data.map((exam, index) => {
        const listening = exam.correct_listening_answer * 2.5; // weighting
        const reading = exam.correct_reading_answer * 2.5;
        return {
          test: `${formatDate(exam.created_at)}-(T${index + 1})` || `Test ${index + 1}`,
          listening,
          reading,
          total: listening + reading,
        };
      });

      setScoreData(formatted);
      const maxListening = Math.max(...formatted.map((d) => d.listening), 0);
      const maxReading = Math.max(...formatted.map((d) => d.reading), 0);
      const maxTotal = Math.max(...formatted.map((d) => d.total), 0);

      setHighestScores({
        listening: maxListening,
        reading: maxReading,
        total: maxTotal,
      });
      const highest = getAllTimeHighest(data);
      setAllTimeHighestScores(highest);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to get exam data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMockTestResultData();
  }, []);

  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        {loading && <Loader />}
        <div className="min-h-[60vh] bg-gray-50/50 py-6">
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="mt-5 lg:px-10 lg:pb-10">
            <UserHeadline mainText="Mock Exam Result" preText="" subText="" />

            {/* <div className="mt-6 flex flex-col lg:flex-row justify-center items-start gap-10">
        
              <div className="rounded-xl bg-white drop-shadow-xl p-6 border border-gray-200 relative overflow-hidden w-full lg:w-2/3">
                <div className="flex justify-center 2xl:justify-between flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 relative z-10">
                    <span className="text-2xl animate-bounce">📈</span> Score
                    Progress
                  </h3>

                  <div className="flex flex-row w-fit justify-end gap-2 z-20">
                    {[
                      {
                        label: "Listening",
                        value: highestScores?.listening,
                        color: "bg-blue-500",
                      },
                      {
                        label: "Reading",
                        value: highestScores.reading,
                        color: "bg-green-500",
                      },
                      {
                        label: "Total",
                        value: highestScores.total,
                        color: "bg-purple-500",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`px-2.5 py-1 sm:px-4 rounded-full font-semibold text-white shadow-md ${item.color} flex items-center gap-2 justify-center transform hover:scale-105 transition-all duration-300`}
                      >
                        <span className="text-xs">{item.label}</span>
                        <span className="text-xs sm:text-sm">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

         
                <div className="h-90 relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scoreData}>
                      <CartesianGrid strokeDasharray="2 2" stroke="#e0e7ff" />
                      <XAxis
                        dataKey="test"
                        stroke="#4b5563"
                        tick={{
                          fill: "#4b5563",
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      />
                      <YAxis
                        stroke="#4b5563"
                        tick={{
                          fill: "#4b5563",
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "16px",
                          backgroundColor: "rgba(255,255,255,0.95)",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                          padding: "12px",
                          fontSize: "12px",
                        }}
                      />
                
                      <Line
                        type="monotone"
                        dataKey="listening"
                        stroke="url(#listeningGradient)"
                        strokeWidth={4}
                        dot={{
                          r: 6,
                          fill: "#3b82f6",
                          stroke: "#fff",
                          strokeWidth: 2,
                        }}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="reading"
                        stroke="url(#readingGradient)"
                        strokeWidth={4}
                        dot={{
                          r: 6,
                          fill: "#10b981",
                          stroke: "#fff",
                          strokeWidth: 2,
                        }}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="url(#totalGradient)"
                        strokeWidth={4}
                        dot={{
                          r: 6,
                          fill: "#8b5cf6",
                          stroke: "#fff",
                          strokeWidth: 2,
                        }}
                        activeDot={{ r: 8 }}
                      />

                      <defs>
                        <linearGradient
                          id="listeningGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                        <linearGradient
                          id="readingGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#10b981"
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="100%"
                            stopColor="#10b981"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                        <linearGradient
                          id="totalGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="100%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-center pt-3 gap-4 z-20">
                  {[
                    { label: "Listening", color: "#3b82f6" },
                    { label: "Reading", color: "#10b981" },
                    { label: "Total", color: "#8b5cf6" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 text-gray-800 font-medium text-sm"
                    >
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-1/3 grid grid-cols-2 gap-6">
           
                <div className="col-span-2 p-6 bg-white border border-gray-200 rounded-2xl text-center shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    All Time Highest Score
                  </h2>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full mb-3">
                    <span className="text-blue-500 text-xl">🎧</span>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Listening</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    {allTimeHighestScores.listening}
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-50 rounded-full mb-3">
                    <span className="text-green-500 text-xl">📖</span>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Reading</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    {allTimeHighestScores.reading}
                  </p>
                </div>

                <div className="col-span-2 p-8 bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300">
                  <div className="w-14 h-14 flex items-center justify-center bg-purple-50 rounded-full mb-3">
                    <span className="text-purple-500 text-xl">🏆</span>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Total</p>
                  <p className="text-3xl sm:text-4xl text-gray-900 font-bold">
                    {allTimeHighestScores.total}
                  </p>
                </div>
              </div>
            </div> */}

            {/* Result Table/Card */}
            <div className="w-full flex flex-col gap-5 mt-6">
              {/* Exam Summary */}
              {/* <div className="flex flex-wrap gap-5 font-semibold text-gray-700 text-sm md:text-base">
                <span className="bg-white backdrop-blur-lg px-4 py-2 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer">
                  Total Exam: 10
                </span>
                <span className="bg-white backdrop-blur-lg px-4 py-2 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer">
                  Taken Exam: 2
                </span>
                <span className="bg-white backdrop-blur-lg px-4 py-2 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer">
                  Remaining Exam: 8
                </span>
              </div> */}

              {/* Desktop Table */}
              <div className="hidden md:block overflow-auto rounded-xl shadow-lg border border-gray-200 bg-white/50 backdrop-blur-lg">
                <table className="w-full text-sm relative">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                      <th className="p-3 text-left font-bold border-r border-gray-200">
                        Date
                      </th>
                      <th className="p-3 text-left font-bold border-gray-200">
                        Details
                      </th>
                      <th className="p-3 text-left font-bold border-gray-200">
                        Total Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultData.length > 0 ? (
                      resultData.map((c, i) => (
                        <tr
                          key={i}
                          className="bg-white/40 backdrop-blur-md hover:shadow-lg rounded-xl transition-all"
                        >
                          <td className="p-3 text-gray-700 border-t border-r border-gray-200">
                            {formatDate(c?.created_at)}
                          </td>
                          <td className="p-3 border-t border-gray-200">
                            <div className="grid grid-cols-1 gap-2 items-center">
                              {c?.module_scores &&
                                Object.entries(c.module_scores).map(([key, value]) => (
                                  <span key={key} className="font-semibold text-xs">
                                    {key} Score: {value}
                                  </span>
                                ))
                              }
                            </div>
                          </td>
                          <td className="p-3 border-t border-gray-200 capitalize font-semibold">
                            {c?.total_marks}{" "}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-6 text-gray-500"
                        >
                          No results found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden flex flex-col gap-4">
                {resultData.length > 0 ? (
                  resultData.map((c, i) => (
                    <div
                      key={i}
                      className="bg-white shadow-sm rounded-lg p-4 hover:shadow-xl transition"
                    >
                      <div className="mb-2 space-y-1 text-xs  flex gap-x-1">
                        <p className="font-semibold text-blue-500">Date :</p>
                        <p className="text-gray-500">
                          {formatDate(c?.created_at)}
                        </p>
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
                              {(c?.correct_listening_answer ?? "N/A") * 2.5}
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
                              {(c?.correct_reading_answer ?? "N/A") * 2.5}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500 font-medium">
                            Total
                          </p>
                          <p className="text-purple-500 font-semibold text-xs">
                            {(c?.correct_listening_answer +
                              c?.correct_reading_answer) *
                              2.5}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-6">
                    No result history found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
