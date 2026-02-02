import Link from "next/link";
import { useState } from "react";

import { FaPaperPlane } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import CircularProgress from "@/components/CircularProgress";
import MocktestAnsEvaluation from "./MocktestAnsEvaluation";

import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

import type { ExamResult , ModuleStats , ModuleWiseScore } from "@/types/Mocktest/MockExam.type";

interface ModuleQuestionCounts {
  [key: string]: number;
}
interface MocktestResultModalProps {
  result: ExamResult | null;
  setIsSubmitted: (value: boolean) => void;
  moduleQuestionCounts: ModuleQuestionCounts;
  id: number | string;
}

export default function MocktestResultModal({
  result,
  setIsSubmitted,
  moduleQuestionCounts,
  id,
}: MocktestResultModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAnsEval, setShowAnsEval] = useState(false);

  const getColors = (stats: ModuleStats) => {
    if (stats.correct === stats.wrong) {
      return {
        circleColor: "text-violet-500",
      };
    } else if (stats.correct > stats.wrong) {
      return {
        circleColor: "text-green-500",
      };
    } else {
      return {
        circleColor: "text-red-500",
      };
    }
  };

  const handleReviewSubmit = async (e: any) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please add a rating");
      return;
    }

    if (comment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/review/submit`, {
        body: comment,
        rating: rating,
        exam_id: id,
      });
      toast.success(res.data.message || "Review sent successfully");
      setRating(0);
      setComment("");
      setIsOpen(false);
    } catch (err: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setIsSubmitted(false)
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
          <div className="size-10 sm:size-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaPaperPlane className="sm:size-8 text-white" />
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">
            Exam Submitted!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-2">
            Your answers have been recorded successfully.
          </p>
          <p className="text-base sm:text-xl font-semibold text-green-500 mb-6">
            Total Score:{" "}
            {Math.round(
              (result?.per_question_mark ?? 0) * (result?.total_correct ?? 0)
            )}
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {Object.entries(
              (result?.module_wise_score as ModuleWiseScore) ?? {}
            ).map(([moduleName, stats]) => {
              const total =
                moduleQuestionCounts?.[moduleName] ?? stats.answered;
              const { circleColor } = getColors(stats);

              return (
                <div
                  key={moduleName}
                  className={`rounded-lg p-4 border bg-violet-50/50 border-violet-200`}
                >
                  <h3 className="sm:text-lg font-semibold text-gray-800 text-center">
                    {moduleName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <CircularProgress
                      value={stats.correct}
                      total={total}
                      color={circleColor}
                    />
                    <div className="text-sm text-gray-600 space-y-1 text-left">
                      <p className="font-medium">
                        Answered: {stats.answered} / {total}
                      </p>
                      <p className="text-green-600 font-medium">
                        Correct: {stats.correct}
                      </p>
                      <p className="text-red-600 font-medium">
                        Wrong: {stats.wrong}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <button
            onClick={() => setShowAnsEval(true)}
            className="text-lg text-violet-500 hover:text-purple-500 hover:underline mb-2 flex justify-center items-center gap-1 cursor-pointer mx-auto"
          >
            <RiBarChartBoxAiFill /> Evaluate you
            result with AI
          </button> */}

          <Link
            href="/mock_test_result"
            className="text-sm text-gray-500 hover:text-purple-500 hover:underline block mb-4"
          >
            Go to your profile to see details
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="text-white text-center px-3 py-1.5 rounded-md bg-purple-500 hover:opacity-80 duration-300 drop-shadow drop-shadow-amber-50 cursor-pointer relative"
          >
            Rate Us
            <FaArrowRight className="absolute top-0 translate-y-1/2 -left-5 text-purple-500 fade-slide-in-left"/>
          </button>

          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gray-400 hover:bg-red-600 duration-500 text-white size-7 rounded-full text-sm absolute z-10 top-2 right-2 cursor-pointer"
          >
            X
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="min-h-screen bg-linear-to-br from-purple-50/80 to-indigo-100/80 flex items-center justify-center p-4 inset-0 fixed z-20">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative fade-slide-in-bottom">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-lg font-bold cursor-pointer hover:rotate-180 duration-300"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Submit a Review
            </h2>

            {/* Star Rating */}
            <div className="flex mb-4 justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`size-10 cursor-pointer ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>

            {/* Comment Input */}
            <textarea
              value={comment}
              maxLength={150}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 resize-none"
            />

            <button
              onClick={handleReviewSubmit}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full cursor-pointer"
            >
              {loading ? "Submiting .." : "Submit"}
            </button>
          </div>
        </div>
      )}
      {showAnsEval && <MocktestAnsEvaluation setShowAnsEval={setShowAnsEval} />}
    </>
  );
}
