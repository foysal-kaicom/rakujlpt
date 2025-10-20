"use client";

import React, { useState, useEffect, useMemo, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  FaClock,
  FaPaperPlane,
  FaVolumeUp,
  FaFileAlt,
  FaBookOpen,
  FaRegCommentDots,
  FaRegImage,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import axiosInstance from "@/utils/axios";
import { useExamStore } from "@/stores/useExamStore";

import SkeletonMockExam from "./MocktestSkeleton";
import CircularProgress from "@/components/CircularProgress";
import { useParams } from "next/navigation";
import Image from "next/image";

/* -------------------- Types -------------------- */
interface QuestionOption {
  id: number;
  values: string;
  mock_test_question_id: number;
  created_at: string;
  updated_at: string;
}

type ParsedOptions = Record<string, string>;

interface Question {
  id: number;
  proficiency_level: string;
  title: string;
  type: string;
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

interface ModuleQuestionCounts {
  [key: string]: number;
}

interface ExamResult {
  readingAnswered: number;
  correctReadingAnswer: number;
  wrongReadingAnswer: number;
  listeningAnswered: number;
  correctListeningAnswer: number;
  wrongListeningAnswer: number;
}

/* -------------------- Helpers -------------------- */
const formatTime = (seconds: number) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

/* -------------------- Main Component -------------------- */
export default function ExamPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  /* -------------------- State -------------------- */
  const [questions, setQuestions] = useState<ExamSection[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sidebarShow, setSidebarShow] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  /* -------------------- Exam Store -------------------- */
  const {
    answers,
    setAnswer,
    clearAnswers,
    timeRemaining,
    decrementTime,
    resetTime,
    examStarted,
    stopExam,
  } = useExamStore();

  const currentSection = questions[currentSectionIndex] ?? null;

  /* -------------------- Icons -------------------- */
  const stepIcons: Record<string, ReactNode> = {
    "photo-description": <FaRegImage className="size-4" />,
    "questions-and-answers": <FaRegCommentDots className="size-4" />,
    dialogue: <FaUsers className="size-4" />,
    "explanatory-text": <FaBookOpen className="size-4" />,
    "choose-correct-answer": <FaFileAlt className="size-4" />,
    "correct-wrong-sentences": <FaFileAlt className="size-4" />,
    "fill-in-the-blanks": <FaFileAlt className="size-4" />,
    "reading-comprehension": <FaFileAlt className="size-4" />,
  };

  const stepHeadingIcons: Record<string, ReactNode> = {
    "photo-description": <FaRegImage className="size-8" />,
    "questions-and-answers": <FaRegCommentDots className="size-8" />,
    dialogue: <FaUsers className="size-8" />,
    "explanatory-text": <FaBookOpen className="size-8" />,
    "choose-correct-answer": <FaFileAlt className="size-8" />,
    "correct-wrong-sentences": <FaFileAlt className="size-8" />,
    "fill-in-the-blanks": <FaFileAlt className="size-8" />,
    "reading-comprehension": <FaFileAlt className="size-8" />,
  };

  /* -------------------- Derived Values -------------------- */
  const totalQuestions = useMemo(
    () =>
      questions.reduce(
        (total, section) =>
          total + section.group.reduce((sum, g) => sum + g.questions.length, 0),
        0
      ),
    [questions]
  );

  const moduleQuestionCounts = questions.reduce(
    (acc: ModuleQuestionCounts, section) => {
      const module = section.module_name;
      const questionCount = section.group.reduce(
        (sum, g) => sum + g.questions.length,
        0
      );
      acc[module] = (acc[module] || 0) + questionCount;
      return acc;
    },
    {} as ModuleQuestionCounts
  );

  const answeredQuestions = useMemo(
    () => Object.keys(answers).length,
    [answers]
  );

  const getGlobalQuestionNumber = (questionId: number) => {
    let count = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let g of questions[i].group) {
        for (let q of g.questions) {
          count++;
          if (q.id === questionId) return count;
        }
      }
    }
    return 0;
  };

  const hasQuestions = (section: ExamSection) =>
    section?.group?.some((g) => g.questions && g.questions.length > 0);

  /* -------------------- Data Fetch -------------------- */
  useEffect(() => {
    if (!examStarted || isSubmitted) return;

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/mock-test/get-questions?exam_id=${id}`);
        setQuestions(response.data.data);
        setCurrentSectionIndex(0);

        resetTime(50 * 60);

        toast.success(response?.data?.message || "Mock test questions loaded!");
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Cannot fetch mock questions right now"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examStarted, isSubmitted]);

  /* -------------------- Route Guard -------------------- */
  useEffect(() => {
    if (!examStarted && !isSubmitted) router.back();
  }, [examStarted, isSubmitted, router]);

  /* -------------------- Timer -------------------- */
  useEffect(() => {
    if (!examStarted) return;

    const timer = setInterval(() => decrementTime(), 1000);
    return () => clearInterval(timer);
  }, [decrementTime, examStarted]);

  useEffect(() => {
    if (timeRemaining <= 0) handleSubmit();
  }, [timeRemaining]);

  /* -------------------- Reload Warning -------------------- */
  useEffect(() => {
    if (!examStarted || isSubmitted) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      (e as BeforeUnloadEvent & { returnValue: string }).returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [examStarted, isSubmitted]);

  /* -------------------- Handlers -------------------- */
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswer(questionId, value);
  };

  const scroll = (dir: "left" | "right") => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: dir === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    let prevIndex = currentSectionIndex - 1;
    while (prevIndex >= 0 && !hasQuestions(questions[prevIndex])) prevIndex--;
    if (prevIndex >= 0) {
      setCurrentSectionIndex(prevIndex);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    let nextIndex = currentSectionIndex + 1;
    while (nextIndex < questions.length && !hasQuestions(questions[nextIndex]))
      nextIndex++;
    if (nextIndex < questions.length) {
      setCurrentSectionIndex(nextIndex);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isFirstStep = () =>
    currentSectionIndex === questions.findIndex(hasQuestions);
  const isLastStep = () =>
    currentSectionIndex ===
    questions.length - 1 - [...questions].reverse().findIndex(hasQuestions);

  const handleSubmit = async () => {
    if (isSubmitted) return;

    try {
      setLoading(true);
      const payload = Object.entries(answers).map(
        ([questionId, selectedOption]) => ({
          id: Number(questionId),
          answer: Number(selectedOption),
        })
      );

      const response = await axiosInstance.post(
        `/mock-test/submit-answer?exam_id=${id}`,
        payload
      );

      setResult({
        readingAnswered: response?.data?.data?.reading_answered ?? 0,
        correctReadingAnswer: response?.data?.data?.correct_reading_answer ?? 0,
        wrongReadingAnswer: response?.data?.data?.wrong_reading_answer ?? 0,
        listeningAnswered: response?.data?.data?.listening_answered ?? 0,
        correctListeningAnswer:
          response?.data?.data?.correct_listening_answer ?? 0,
        wrongListeningAnswer: response?.data?.data?.wrong_listening_answer ?? 0,
      });

      setIsSubmitted(true);
      stopExam();
      clearAnswers();
      toast.success("Exam submitted successfully!");

      timeoutRef.current = setTimeout(() => {
        setIsSubmitted(false);
        router.back();
      }, 3 * 60 * 1000);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Cannot submit your answer"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  /* -------------------- Render -------------------- */
  if (loading) return <SkeletonMockExam />;

  if (isSubmitted) {
    /* -------------------- Result Screen -------------------- */
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
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
            {((result?.correctListeningAnswer ?? 0) +
              (result?.correctReadingAnswer ?? 0)) *
              2.5}
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {/* Listening Section */}
            <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center border border-blue-200">
              <h3 className="sm:text-lg font-semibold text-gray-800 mb-4">
                Listening Section
              </h3>
              <CircularProgress
                value={result?.correctListeningAnswer ?? 0}
                total={moduleQuestionCounts?.Listening ?? 0}
                color="text-blue-500"
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
            className="text-sm text-gray-500 hover:text-blue-500 hover:underline block mb-4"
          >
            Go to your profile to see details
          </Link>

          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gray-400 hover:bg-red-600 duration-500 text-white size-7 rounded-full text-sm absolute z-10 top-2 right-2"
          >
            X
          </button>
        </div>
      </div>
    );
  }

  /* -------------------- Exam Screen -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-blue-200 pb-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row gap-5 justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Japanese Language Proficiency Exam
            </h1>
            <p className="text-sm text-gray-600 mt-1 capitalize">
              {currentSection?.module_name} part - {currentSection?.title}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-lg">
              <FaClock className="w-5 h-5 text-red-600" />
              <span className="text-red-700 font-mono font-bold">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
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
              className="flex flex-nowrap space-x-3 p-2 justify-start items-center bg-white rounded-xl overflow-x-auto scroll-smooth scrollbar-hide"
            >
              {questions.map((section, index) => {
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
                  btnClass = "bg-blue-500 text-white";
                } else if (answeredInSection === sectionQuestions) {
                  btnClass = "bg-green-600 text-white hover:bg-green-700";
                } else if (answeredInSection > 0) {
                  btnClass = "bg-green-100 text-green-700 hover:bg-green-200";
                } else {
                  btnClass = "bg-blue-100 text-gray-700 hover:bg-blue-200";
                }

                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setCurrentSectionIndex(index),
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`flex flex-shrink-0 justify-center items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${btnClass}`}
                  >
                    {stepIcons[section.slug]}
                    {section?.title}
                    <span className="font-thin">({sectionQuestions}Q)</span>
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {currentSection && (
            <div className="bg-white rounded-xl outline outline-blue-200 p-6 sticky top-40">
              <div className="text-lg font-semibold text-gray-800 flex justify-between">
                Current Module
                <IoIosArrowDropdownCircle
                  className={`size-8 text-blue-600 lg:hidden duration-500 ${
                    sidebarShow ? "rotate-180" : ""
                  }`}
                  onClick={() => {
                    setSidebarShow(!sidebarShow);
                  }}
                />
              </div>
              <div className={`${sidebarShow ? "" : "hidden lg:block"}`}>
                <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white my-4">
                  <div className="flex items-center space-x-2 mb-2">
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
                  <p className="text-xs opacity-90">25 min • 100 points</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-1 text-blue-600">
                    {stepIcons[currentSection.slug]}
                    <span className="font-medium text-blue-800">
                      {currentSection.title}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    {currentSection.group?.reduce(
                      (sum, g) => sum + g.questions.length,
                      0
                    )}{" "}
                    questions
                  </p>
                </div>

                {/* Progress */}
                <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">
                    Overall Progress
                  </p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          (answeredQuestions / totalQuestions) * 100 || 0
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {answeredQuestions} / {totalQuestions} completed
                  </p>
                </div>

                {/* Question Status */}
                <div className="mt-6 bg-white rounded-xl outline outline-blue-200 p-4">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Questions
                  </h3>
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
                            className={`w-8 h-8 rounded-full text-xs flex items-center justify-center font-medium ${
                              isAnswered
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            } hover:ring-2 hover:ring-blue-500 transition`}
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

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-3">
          {currentSection && (
            <>
              {/* header */}
              <div className="">
                {(() => {
                  const totalQuestions =
                    currentSection.group?.reduce(
                      (sum, g) => sum + g.questions.length,
                      0
                    ) ?? 0;

                  return (
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl">
                      <div className="flex flex-wrap items-center space-x-2 mb-1">
                        {stepHeadingIcons[currentSection.slug]}
                        <h2 className="text-xl font-bold">
                          {currentSection.title}
                        </h2>
                        <p className="text-blue-100 text-sm">
                          ( {totalQuestions} questions )
                        </p>
                      </div>

                      <div
                        className="mt-3"
                        dangerouslySetInnerHTML={{
                          __html: currentSection.sample_question ?? "",
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
                      className="p-4 md:p-8 bg-white rounded-xl outline outline-blue-200"
                    >
                      {/* Group-level content */}
                      {grp.group_type === "audio" && grp.content && (
                        <div className="mb-8">
                          <audio
                            controls
                            className="w-full h-8 [&::-webkit-media-controls-panel]:bg-blue-50 [&::-webkit-media-controls-panel]:h-8 [&::-webkit-media-controls-enclosure]:rounded-md"
                          >
                            <source src={grp.content} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                          {/* <p className="text-sm mt-2 ml-4 text-red-500">
                          In exam the audio will be played only once
                        </p> */}
                        </div>
                      )}

                      {grp.group_type === "passage" && grp.content && (
                        <div className="p-4 bg-gray-100 rounded-md mb-8">
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
                              <div className="text-lg text-gray-800 mb-2 flex gap-1">
                                {question?.proficiency_level == "N5" && (
                                  <FaStar className="mt-1" />
                                )}
                                <span className="font-semibold">
                                  Q{getGlobalQuestionNumber(question.id)}:{" "}
                                </span>
                                {question.type === "image" ? (
                                  <img
                                    draggable="false"
                                    src={question.title}
                                    alt={`Question ${question.id}`}
                                    className="max-w-[250px] sm:max-w-sm mx-auto"
                                  />
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
                                {Object.entries(parsedOptions).map(
                                  ([key, option], index) => (
                                    <label
                                      key={key}
                                      className="text-sm flex space-x-3 p-2 cursor-pointer"
                                    >
                                      <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={key}
                                        checked={answers[question.id] === key}
                                        onChange={(e) => {
                                          handleAnswerChange(
                                            question.id,
                                            e.target.value
                                          );
                                          console.log(e.target);
                                        }}
                                        className="size-6 text-blue-600"
                                      />
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: option ?? "",
                                        }}
                                      />
                                    </label>
                                  )
                                )}
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
              <div className="flex justify-between items-center text-sm bg-white rounded-xl px-8 py-4 outline outline-blue-200">
                <button
                  onClick={handlePrevious}
                  disabled={isFirstStep()}
                  className={`flex items-center sm:space-x-2 p-2 sm:p-0 sm:px-6 sm:py-2 rounded-lg font-medium transition-colors ${
                    isFirstStep()
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-600 hover:bg-gray-700 text-white cursor-pointer"
                  }`}
                >
                  <FaChevronLeft className="size-4" />
                  <span className="hidden sm:flex">Previous</span>
                </button>

                <div className="flex space-x-4">
                  {isLastStep() ? (
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
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-0 sm:px-6 sm:py-2 rounded-lg font-medium transition-colors cursor-pointer"
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
      </div>
    </div>
  );
}
