"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PiExam } from "react-icons/pi";
import { TbAugmentedReality2 } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { BsFileText } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { GiStairsGoal } from "react-icons/gi";


interface CounterOptions {
  start: number;
  end: number;
  duration: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
}

export default function InsightSection() {
  const [learners, setLearners] = useState<number>(0);
  const [tests, setTests] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const animateValue = ({ start, end, duration, setter }: CounterOptions) => {
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = start + (end - start) * progress;
        setter(value);
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    animateValue({ start: 0, end: 10000, duration: 1500, setter: setLearners });
    animateValue({ start: 0, end: 200, duration: 1500, setter: setTests });
    animateValue({ start: 0, end: 4.9, duration: 1500, setter: setRating });
  }, []);

  return (
    <section className="py-16 min-h-[70vh] flex items-center">
      <div className="px-6 lg:px-8 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div className="">
            <p className="inline-flex items-center gap-2 text-sm font-semibold bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full mb-4 drop-shadow-sm drop-shadow-violet-600 border-b border-white/50">
              <FaRegStar/>
              Mock Test Pro
            </p>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Premium{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JPT & JLPT
              </span>{" "}
              Mock Test Experience
            </h2>

            <p className="text-gray-600 text-sm sm:text-base mb-8">
              Prepare for your Japanese language exams with interactive mock
              tests, real-time results, and AI-driven feedback — designed to
              boost your confidence and accuracy before the real exam.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/mock_test_select"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:opacity-85 transition drop-shadow-sm drop-shadow-violet-600 border-b border-white/50"
              >
                Start Mock Test
                <FaArrowRight/>
              </Link>

              <Link
                href="/practice"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border ring ring-indigo-400 font-semibold text-gray-800 bg-white hover:scale-105 duration-500 transition drop-shadow-sm drop-shadow-violet-400 border-b border-white/50"
              >
                
                <GiStairsGoal className="text-2xl text-purple-800"/>
                Start Practice
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 font-medium">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {Math.floor(learners).toLocaleString()}+
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  Active Learners
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl sm:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {Math.floor(tests)}+
                </span>
                <span className="text-sm text-gray-500 mt-1">Mock Tests</span>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl sm:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {rating.toFixed(1)}/5
                </span>
                <span className="text-sm text-gray-500 mt-1">Avg. Rating</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Feature 1 */}
              <article className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-200">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50">
                 <TbAugmentedReality2 className="size-6 text-gray-700"/>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Real Exam Environment
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Simulate actual{" "}
                    <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      JPT & JLPT
                    </span>{" "}
                    conditions with accurate timing and scoring.
                  </p>
                </div>
              </article>

              {/* Feature 2 */}
              <article className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-200">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-green-50">
                  <FaRegStar className="size-6 text-gray-700"/>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    AI Performance Feedback
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Get instant feedback on your weak areas and progress report.
                  </p>
                </div>
              </article>

              {/* Feature 3 */}
              <article className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-200">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-50">
                 <PiExam className="size-6 text-gray-700"/>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Exam Certificates
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Earn digital certificates and share your results online.
                  </p>
                </div>
              </article>

              {/* Feature 4 */}
              <article className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-200">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-50">
                 <BsFileText className="size-6 text-gray-700"/>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Study Anywhere
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Take mock tests anytime on desktop or mobile — your progress
                    stays synced.
                  </p>
                </div>
              </article>
            </div>

            <div className="rounded-2xl bg-white border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Level up your Japanese skills today
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    Join thousands preparing for JPT & JLPT with real-time mock
                    tests.
                  </p>
                </div>
                <img
                  src="/assets/home/h1.png"
                  alt="mock test promo"
                  className="w-[30%] object-cover rounded-md drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
