import Link from "next/link";
import { useState } from "react";

import { FaPaperPlane } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import CircularProgress from "@/components/CircularProgress";

import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

interface ExamResult {
  readingAnswered: number;
  correctReadingAnswer: number;
  wrongReadingAnswer: number;
  listeningAnswered: number;
  correctListeningAnswer: number;
  wrongListeningAnswer: number;
  per_question_mark: number;
}

interface ModuleQuestionCounts {
  [key: string]: number;
}

// Props interface
interface MocktestResultModalProps {
  result: ExamResult | null; // can be null
  setIsSubmitted: (value: boolean) => void; // because you call setIsSubmitted
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

  const handleSubmit = async (e: any) => {
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
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-2xl w-full relative">
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
              ((result?.correctListeningAnswer ?? 0) +
                (result?.correctReadingAnswer ?? 0)) *
                (result?.per_question_mark ?? 0)
            )}
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {/* Listening Section */}
            <div className="bg-purple-50 rounded-lg p-6 flex flex-col items-center border border-purple-200">
              <h3 className="sm:text-lg font-semibold text-gray-800 mb-4">
                Listening Section
              </h3>
              <CircularProgress
                value={result?.correctListeningAnswer ?? 0}
                total={moduleQuestionCounts?.Listening ?? 0}
                color="text-purple-500"
              />
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>
                  Answered: {result?.listeningAnswered ?? 0} /{" "}
                  {moduleQuestionCounts?.Listening ?? 0}
                </p>
                <p className="text-green-600 font-medium">
                  Correct: {result?.correctListeningAnswer ?? 0}
                </p>
                <p className="text-red-600 font-medium">
                  Wrong: {result?.wrongListeningAnswer ?? 0}
                </p>
              </div>
            </div>

            {/* Reading Section */}
            <div className="bg-green-50 rounded-lg p-6 flex flex-col items-center border border-green-200">
              <h3 className="sm:text-lg font-semibold text-gray-800 mb-4">
                Reading Section
              </h3>
              <CircularProgress
                value={result?.correctReadingAnswer ?? 0}
                total={moduleQuestionCounts?.Reading ?? 0}
                color="text-green-500"
              />
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>
                  Answered: {result?.readingAnswered ?? 0} /{" "}
                  {moduleQuestionCounts?.Reading ?? 0}
                </p>
                <p className="text-green-600 font-medium">
                  Correct: {result?.correctReadingAnswer ?? 0}
                </p>
                <p className="text-red-600 font-medium">
                  Wrong: {result?.wrongReadingAnswer ?? 0}
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/mock_test_result"
            className="text-sm text-gray-500 hover:text-purple-500 hover:underline block mb-4"
          >
            Go to your profile to see details
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="text-white text-center px-3 py-1.5 rounded-md bg-purple-500 hover:opacity-80 duration-300 drop-shadow drop-shadow-amber-50"
          >
            Rate Us
          </button>

          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gray-400 hover:bg-red-600 duration-500 text-white size-7 rounded-full text-sm absolute z-10 top-2 right-2"
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
              className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-lg font-bold cursor-pointer duration-300 hover:rotate-180 duration-300"
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
              onClick={handleSubmit}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full cursor-pointer"
            >
              {loading ? "Submiting .." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
