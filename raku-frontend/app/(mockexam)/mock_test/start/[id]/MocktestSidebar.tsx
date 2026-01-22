import React from "react";

import { FaVolumeUp, FaFileAlt } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import type { ExamSection } from "@/types/Mocktest/MockExam.type";

interface MocktestSidebarProps {
  currentSection: ExamSection | null;
  sidebarShow: boolean;
  setSidebarShow: (value: boolean) => void;
  answeredQuestions: number;
  totalQuestions: number;
  answers: Record<number, string>;
  questionRefs: React.RefObject<Record<number, HTMLElement | null>>;
  getGlobalQuestionNumber: (questionId: number) => number;
}

export default function MocktestSidebar({
  currentSection,
  sidebarShow,
  setSidebarShow,
  answeredQuestions,
  totalQuestions,
  answers,
  questionRefs,
  getGlobalQuestionNumber,
}: MocktestSidebarProps) {
  return (
    <>
      <div className="lg:col-span-1">
        {currentSection && (
          <div className="bg-white rounded-xl outline outline-purple-200 p-6 sticky top-44">
            <div className="text-lg font-semibold text-gray-800 flex justify-between">
              Current Module
              <IoIosArrowDropdownCircle
                className={`size-8 text-purple-600 lg:hidden duration-500 ${
                  sidebarShow ? "rotate-180" : ""
                }`}
                onClick={() => {
                  setSidebarShow(!sidebarShow);
                }}
              />
            </div>
            <div className={`${sidebarShow ? "" : "hidden lg:block"}`}>
              <div className="p-4 bg-linear-to-l from-purple-600 to-indigo-600 rounded-lg text-white my-4">
                <div className="flex items-center space-x-2">
                  {currentSection.module_name === "Listening" && (
                    <FaVolumeUp className="size-6" />
                  )}
                  {currentSection.module_name === "Reading" && (
                    <FaFileAlt className="size-6" />
                  )}
                  <span className="font-medium">
                    {currentSection.module_name}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-1 text-purple-600">
                  <span className="font-medium text-purple-800">
                    {currentSection.title}
                  </span>
                </div>
                <p className="text-xs text-purple-600 mt-1 font-medium">
                  {currentSection.group?.reduce(
                    (sum, g) => sum + g.questions.length,
                    0
                  )}{" "}
                  questions
                </p>
              </div>

              {/* Progress */}
              <div className="mt-6 p-3 bg-gray-50 rounded-lg font-medium border border-purple-200">
                <p className="text-sm font-medium text-gray-700">
                  Overall Progress
                </p>
                <div className="mt-2 bg-purple-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        (answeredQuestions / totalQuestions) * 100 || 0
                      }%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1 font-medium">
                  <span className="text-purple-700">
                    {answeredQuestions} / {totalQuestions}
                  </span>{" "}
                  completed
                </p>
              </div>

              {/* Question Status */}
              <div className="mt-6 bg-white rounded-xl outline outline-purple-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Questions</h3>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                  {currentSection.group
                    ?.flatMap((g) => g.questions)
                    .map((q) => {
                      const isAnswered = answers[q.id] !== undefined;

                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            const el = questionRefs.current[q.id];
                            if (el)
                              el.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              });
                          }}
                          className={`w-8 h-8 rounded-full text-xs flex items-center justify-center font-medium cursor-pointer ${
                            isAnswered
                              ? "bg-purple-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          } hover:ring-2 hover:ring-purple-500 transition`}
                        >
                          {getGlobalQuestionNumber(q.id)}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
