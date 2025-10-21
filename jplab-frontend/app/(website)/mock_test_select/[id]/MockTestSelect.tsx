"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import SuspenseLoader from "@/components/SuspenseLoader";
import QuestionCompositionComponent from "@/components/QuestionCompositionComponent";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import { useExamStore } from "@/stores/useExamStore";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useRouter } from 'next/navigation';

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
    <Suspense fallback={<SuspenseLoader />}>
      <QuestionCompositionComponent
        breadCrumbData={breadCrumbData}
        mainText="Question Composition"
        preText="Mock test"
        subText="Read the question composition before starting the exam"
      />
      <WebpageWrapper>
        <div className="mb-10 bg-white border-l-4 border-blue-400 p-5 rounded-xl drop-shadow-md">
          <div className="flex items-start gap-3">
            <svg
              className="w-8 h-8 text-blue-500"
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
            <div className="text-sm sm:text-base text-blue-700 leading-relaxed">
              <p className="font-semibold pt-1.5">Note:</p>
              <ul className="list-disc pt-3">
                <li>
                  Carefully read the entire question composition before clicking
                  Start.
                </li>
                <li>
                  The exam duration is{" "}
                  <span className="font-semibold">50 minutes.</span>
                </li>
                <li>
                  Once the exam starts do not leave the page or refresh the page if you do so a new exam will start and all your progress will we removed.
                </li>
                <li>
                  Once time runs out, your answers will be submitted
                  automatically.
                </li>
                <li>
                  If you finish early, you may submit your answers before time
                  ends.
                </li>
                <li>
                  ⚠️ Important: Once you select an answer, you cannot change it
                  afterward.
                </li>
              </ul>
              <div className="mt-3">
                <p>
                  Take a deep breath, stay focused, and give it your best
                  effort. Good luck! 🌟
                </p>
                <p className="font-semibold">
                  All rights are reserved by Hashira.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center mt-5">
            <p className="text-blue-500 font-semibold flex items-center text-sm">
              <AiOutlineArrowDown className="size-9 animate-bounce" /> Click Here
            </p>

            <button
              onClick={() => {
                startExam();
                router.push(`/mock_test/start/${id}`);
              }}
              className="cursor-pointer text-sm sm:text-base px-5 sm:px-10 lg:px-15 py-2 sm:py-4 rounded-md bg-yellow-300 text-blue-600 font-semibold hover:opacity-70 duration-500 text-center shadow-md border border-gray-200"
            >
              Start your mock test
            </button>
          </div>
        </div>
      </WebpageWrapper>
    </Suspense>
  );
}
