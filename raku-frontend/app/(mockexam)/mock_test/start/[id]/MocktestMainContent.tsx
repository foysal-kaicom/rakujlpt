import React from "react";
import {
  FaPaperPlane,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaCheck,
} from "react-icons/fa";

import type {
  ExamSection,
  ParsedOptions
} from "@/types/Mocktest/MockExam.type";

interface MocktestMainContentProps {
  currentSection: ExamSection | null;
  stepHeadingIcons: Record<string, React.ReactNode>;
  questionRefs: React.RefObject<Record<number, HTMLDivElement | null>>;
  getGlobalQuestionNumber: (id: number) => number;
  handleAnswerChange: (questionId: number, value: string) => void;
  answers: Record<number, string>;
  handlePrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  handleSubmit: () => void;
  handleNext: () => void;
}

export default function MocktestMainContent({
  currentSection,
  stepHeadingIcons,
  questionRefs,
  getGlobalQuestionNumber,
  handleAnswerChange,
  answers,
  handlePrevious,
  isFirstStep,
  isLastStep,
  handleSubmit,
  handleNext,
}: MocktestMainContentProps) {
  return (
    <>
      <div className="lg:col-span-3 space-y-3">
        {currentSection && (
          <>
            {/* header */}
            <div className="">
              {(() => {
                const totalQuestions =
                  currentSection.group?.reduce(
                    (sum, g) => sum + g.questions.length,
                    0,
                  ) ?? 0;

                return (
                  <div className="bg-linear-to-r from-violet-700 to-indigo-700 text-white font-medium p-6 rounded-xl">
                    <div className="flex flex-wrap items-center space-x-2 mb-1">
                      {stepHeadingIcons[currentSection.slug]}
                      <h2 className="text-xl font-bold">
                        {currentSection.title}
                      </h2>
                      <p className="text-purple-100 text-sm">
                        ( {totalQuestions} questions )
                      </p>
                    </div>

                    <div
                      className="mt-3 text-white"
                      dangerouslySetInnerHTML={{
                        __html: (currentSection.sample_question ?? "").replace(
                          /\\n/g,
                          "<br>",
                        ),
                      }}
                    />
                  </div>
                );
              })()}
            </div>

            {/* questions */}
            <div className="space-y-3">
              {currentSection?.group?.map((grp, groupIndex) => {
                if (grp.questions.length <= 0) return;
                return (
                  <div
                    key={`${groupIndex}-${grp.content ?? ""}`}
                    className="p-4 md:p-8 bg-white rounded-xl outline outline-purple-200"
                  >
                    {/* Group-level content */}
                    {grp.group_type === "audio" && grp.content && (
                      <div className="mb-8">
                        <audio
                          controls
                          className="w-full h-8 [&::-webkit-media-controls-panel]:bg-purple-50 [&::-webkit-media-controls-panel]:h-8 [&::-webkit-media-controls-enclosure]:rounded-md"
                        >
                          <source src={grp.content} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}

                    {grp.group_type === "passage" && grp.content && (
                      <div className="p-4 bg-purple-50/50 leading-10 tracking-widest rounded-md mb-8 text-lg">
                        <div
                          className="text-gray-800 whitespace-pre-line"
                          dangerouslySetInnerHTML={{
                            __html: grp.content ?? "",
                          }}
                        />
                      </div>
                    )}

                    {/* Group questions */}
                    <div className="space-y-8">
                      {grp.questions?.map((question, index) => {
                        const parsedOptions: ParsedOptions = question.options
                          ?.values
                          ? JSON.parse(question.options.values)
                          : {};

                        return (
                          <div
                            key={question.id}
                            ref={(el) => {
                              questionRefs.current[question.id] = el;
                            }}
                            className=""
                          >
                            {/* Question title */}
                            <div className="text-lg mb-2 flex gap-1">
                              {question?.proficiency_level == "N5" && (
                                <FaStar className="mt-1 text-purple-700" />
                              )}
                              <span className="font-semibold">
                                Q{getGlobalQuestionNumber(question.id)}:{" "}
                              </span>
                              {question.type === "image" ? (
                                <div className="flex flex-col w-full">
                                  <img
                                    draggable="false"
                                    src={question.title}
                                    alt={`Question ${question.id}`}
                                    className="max-w-[250px] sm:max-w-sm mx-auto"
                                  />
                                  <div
                                    className="text-gray-800 whitespace-pre-line mt-1.5 text-center"
                                    dangerouslySetInnerHTML={{
                                      __html: question.hints ?? "",
                                    }}
                                  />
                                </div>
                              ) : (
                                <div
                                  className=""
                                  dangerouslySetInnerHTML={{
                                    __html: question.title ?? "",
                                  }}
                                />
                              )}
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                              {Object.entries(parsedOptions)
                                .filter(
                                  ([_, option]) =>
                                    option && option.trim() !== "",
                                )
                                .map(([key, option], index) => (
                                  <label
                                    key={key}
                                    className="flex space-x-3 p-2 cursor-pointer font-medium items-center"
                                  >
                                    <div className="size-6 relative mt-1">
                                     
                                      <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={key}
                                        checked={answers[question.id] === key}
                                        onChange={(e) => {
                                          handleAnswerChange(
                                            question.id,
                                            e.target.value,
                                          );
                                        }}
                                        className="absolute inset-0 size-6 opacity-0 peer cursor-pointer z-30"
                                      />

                                      {/* Default Circle */}
                                      <span className="absolute inset-0 w-5 h-5 border-2 border-purple-500 rounded-full flex items-center justify-center transition-all duration-200 peer-checked:opacity-0"></span>

                                      {/* Star When Checked */}
                                      <FaCheck className="absolute inset-0 w-5 h-5 text-white bg-purple-500 rounded-full p-1 opacity-0 transition-all duration-200 peer-checked:opacity-100" />
                                    </div>

                                    <div
                                      className="leading-10 tracking-widest"
                                      dangerouslySetInnerHTML={{
                                        __html: option ?? "",
                                      }}
                                    />
                                  </label>
                                ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* navigation */}
            <div className="flex justify-between items-center text-sm bg-white rounded-xl px-8 py-4 outline outline-purple-200">
              <button
                onClick={handlePrevious}
                disabled={isFirstStep}
                className={`flex items-center sm:space-x-2 p-2 sm:p-0 sm:px-6 sm:py-2 rounded-lg font-medium transition-colors ${
                  isFirstStep
                    ? "bg-purple-200 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                }`}
              >
                <FaChevronLeft className="size-4" />
                <span className="hidden sm:flex">Previous</span>
              </button>

              <div className="flex space-x-4">
                {isLastStep ? (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white p-2 sm:p-0 sm:px-6 sm:py-2 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    <FaPaperPlane className="size-4" />
                    <span>Submit Exam</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white p-2 sm:p-0 sm:px-6 sm:py-2 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    <span className="hidden sm:flex">Next</span>
                    <FaChevronRight className="size-4" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
