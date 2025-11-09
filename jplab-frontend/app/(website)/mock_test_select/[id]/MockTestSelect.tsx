"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import QuestionCompositionComponent from "@/components/QuestionCompositionComponent";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import QuestionCompositionSkeleton from "../../question_composition/QusetionCompositionSkeleton";
import { useExamStore } from "@/stores/useExamStore";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function MockTestQuestionComposition() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const { examStarted, startExam } = useExamStore();

  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Select Mock test", to: "/mock_test_select" },
    {
      name: "Question Composition of Mock Test",
      to: `/mock_test_select/${id}`,
    },
  ];

  return (
    <Suspense fallback={<QuestionCompositionSkeleton />}>
      <QuestionCompositionComponent
        breadCrumbData={breadCrumbData}
        mainText="Question Composition"
        preText="Mock test"
        subText="Read the question composition before starting the exam"
      />
      <div className="relative pb-12 p-6 sm:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Floating background shapes */}
        <WebpageWrapper>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl animate-bounce-slow"></div>
          <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-pink-300/20 rounded-full blur-3xl animate-pulse-slow"></div>

          <div className="relative z-10 w-full max-w-5xl mx-auto">
            <div className="flex items-start gap-4 w-full">
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-md animate-pulse">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-.01-10a9 9 0 11-0.01 18 9 9 0 010-18z"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-sm sm:text-base text-gray-700 leading-relaxed w-full">
                <p className="font-bold text-blue-700 text-lg mb-2">
                  💡 Important Note
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    Carefully read the entire question composition before
                    clicking <b>Start</b>.
                  </li>
                  <li>
                    The exam duration is{" "}
                    <span className="font-semibold text-blue-600">
                      50 minutes
                    </span>
                    .
                  </li>
                  <li>
                    Do not leave or refresh the page — doing so will{" "}
                    <span className="font-semibold text-pink-600">
                      reset your progress
                    </span>
                    .
                  </li>
                  <li>
                    Your answers will auto-submit when the timer runs out.
                  </li>
                  <li>You can submit early if you finish before time ends.</li>
                  <li>
                    ⚠️ Once you select an answer, it{" "}
                    <span className="text-red-500 font-semibold">
                      cannot be changed
                    </span>
                    .
                  </li>
                </ul>

                <div className="mt-5 p-4 bg-white/70 rounded-xl border border-gray-200 shadow-sm text-center">
                  <p className="font-medium text-gray-700">
                    🌸 Take a deep breath, stay confident, and do your best —
                    you got this!
                  </p>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    All rights reserved by{" "}
                    <span className="font-semibold text-blue-600">Hashira</span>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Start Button Section */}
            <div className="flex flex-col gap-3 items-center justify-center mt-10">
              <p className="text-blue-600 font-semibold flex items-center text-sm sm:text-base">
                <AiOutlineArrowDown className="w-6 h-6 mr-1 animate-bounce" />{" "}
                Click below to begin!
              </p>

              <button
                onClick={() => {
                  startExam();
                  router.push(`/mock_test/start/${id}`);
                }}
                className="cursor-pointer text-sm sm:text-base px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold text-white bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 shadow-lg hover:scale-105 hover:shadow-xl hover:brightness-110 transition-all duration-500"
              >
                🚀 Start Your Mock Test
              </button>
            </div>
          </div>
        </WebpageWrapper>
      </div>
    </Suspense>
  );
}
