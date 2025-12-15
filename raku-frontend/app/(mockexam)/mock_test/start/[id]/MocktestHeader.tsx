import React from "react";
import { FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface QuestionOption {
  id: number;
  values: string;
  mock_test_question_id: number;
  created_at: string;
  updated_at: string;
}

interface Question {
  id: number;
  proficiency_level: string;
  title: string;
  type: string;
  hints: string;
  options: QuestionOption;
}

interface Group {
  type: string;
  group_type: string;
  content: string;
  questions: Question[];
}

interface ExamSection {
  id: number;
  slug: string;
  title: string;
  module_name: string;
  sample_question: string;
  group: Group[];
}

interface MocktestHeaderProps {
  formatTime: (seconds: number) => string;
  examTitle: string;
  timeRemaining: number;
  sliderRef: React.RefObject<HTMLDivElement | null>;
  currentSectionIndex: number;
  scroll: (direction: "left" | "right") => void;
  setCurrentSectionIndex: (index: number) => void;
  answers: Record<number, string>; // Add this because you use `answers[q.id]`
  currentModule: string;
  handleModuleClick: (moduleName: string) => void;
  moduleList: string[];
  sectionList: ExamSection[];
}

export default function MocktestHeader({
  formatTime,
  examTitle,
  timeRemaining,
  sliderRef,
  currentSectionIndex,
  scroll,
  setCurrentSectionIndex,
  answers,
  currentModule,
  handleModuleClick,
  moduleList,
  sectionList,
}: MocktestHeaderProps) {
  return (
    <>
      <div className="sticky top-0 z-20 bg-linear-to-r from-purple-300 to-violet-300 pb-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row gap-5 justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold bg-linear-to-l from-violet-800 via-fuchsia-700 to-purple-800 bg-clip-text text-transparent text-center">
              {examTitle} Mocktest
            </h1>
          </div>

          <div className="flex items-center space-x-4 justify-center">
            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 shadow-lg shadow-red-500/30 w-[150px] shake-pause">
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl blur-xl bg-red-400/40 -z-10" />

              {/* Icon */}
              <div className="flex items-center justify-center size-8 rounded-full bg-white/20 backdrop-blur-md">
                <FaClock className="size-4 text-white" />
              </div>

              {/* Time */}
              <span className="text-white font-mono tracking-widest font-bold">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5 w-fit my-2 bg-white container mx-auto rounded-lg py-2 px-5 font-semibold">
          {moduleList.map((module) => (
            <button
              key={module}
              onClick={() => handleModuleClick(module)}
              className={`flex items-center gap-1 ${
                module === currentModule ? "text-purple-700" : "text-gray-400"
              }`}
            >
              {/* {module === currentModule && <p className="size-4 bg-purple-700 rounded-full"></p>} */}
              <p className={`size-2 rounded-full ${module === currentModule ? "bg-purple-700 animate-ping" : "bg-gray-200"}`}></p>
              {module}
            </button>
          ))}
        </div>
        {/* Steps */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto relative">
            {/* Left arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
            >
              <FaChevronLeft />
            </button>

            {/* Slider */}
            <div
              ref={sliderRef}
              className="flex flex-nowrap space-x-3 p-2 justify-start items-center font-medium bg-white rounded-xl overflow-x-auto scroll-smooth scrollbar-hide"
            >
              {sectionList.map((section, index) => {
                const sectionQuestions =
                  section.group?.reduce(
                    (sum, g) => sum + g.questions.length,
                    0
                  ) ?? 0;
                if (sectionQuestions === 0) return null;

                const answeredInSection =
                  section.group?.reduce(
                    (sum, g) =>
                      sum +
                      g.questions.filter((q) => answers[q.id] !== undefined)
                        .length,
                    0
                  ) ?? 0;

                let btnClass = "";
                if (currentSectionIndex === index) {
                  btnClass = "bg-purple-500 text-white";
                } else if (answeredInSection === sectionQuestions) {
                  btnClass = "bg-green-600 text-white hover:bg-green-700";
                } else if (answeredInSection > 0) {
                  btnClass = "bg-green-100 text-green-700 hover:bg-green-200";
                } else {
                  btnClass = "bg-purple-100 text-gray-700 hover:bg-purple-200";
                }

                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setCurrentSectionIndex(index),
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`flex shrink-0 justify-center items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${btnClass}`}
                  >
                    {section?.title}
                    <span className="">({sectionQuestions}Q)</span>
                  </button>
                );
              })}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
