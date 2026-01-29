"use client";
import { useState, useEffect, useRef } from "react";
import {
  X,
  Clock,
  Lightbulb,
  Check,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";
import AIHint from "./AiHint";

// Types

interface Option {
  [key: string]: string;
}
interface Question {
  proficiency_level: string; // e.g. "N4"
  question_type: string; // e.g. "text" (extend union as needed)
  question: string;
  options: Option[]; // e.g. { "1": "Aurnob", "2": "Asif", ... }
  answer: string; // stores the selected option key like "1"
  hints?: string;
  explanation?: string;
  audio_file?: string;
}

type Lang = "en" | "bn";

export default function PracticeQuestion() {
  const params = useParams();
  const id = params.id;
  const slug = params.slug;
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [stageCompleted, setStageCompleted] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  // const [textAnswer, setTextAnswer] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [stageName, setStageName] = useState("");

  const [aiHint, setAiHint] = useState("");
  const [loadingHint, setLoadingHint] = useState(false);

  const currentQuestion = questionsData[currentQuestionIndex];
  const totalQuestions = questionsData.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);
  const stageCompleteSoundRef = useRef<HTMLAudioElement | null>(null);
  const [language, setLanguage] = useState<Lang>("en");

  useEffect(() => {
    const lang = localStorage.getItem("lang") as Lang | null;
    if (lang === "bn" || lang === "en") {
      setLanguage(lang);
    }
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoader(true);
        const response = await axiosInstance.get(`/stages/${id}/start`);
        if (response?.data?.success) {
          // console.log(response.data);
          if (response?.data?.data?.questions.length === 0) {
            toast.error("No questions available for this stage.");
            router.push(`/practice/${slug}`);
          }
          setTotalDuration(response?.data?.data?.duration * 60);
          setQuestionsData(response?.data?.data?.questions || []);
          setStageName(response?.data?.data?.title);
        }
        // toast.success(response?.data?.message || "Stages loaded!");
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Cannot fetch Questions right now",
        );
      } finally {
        setLoader(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer
  useEffect(() => {
    if (totalDuration <= 0) return;

    setTimeElapsed(totalDuration); // Start from total seconds

    const timer = setInterval(() => {
      setTimeElapsed((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.info("Time’s up!");
          // 👉 You can trigger auto-submit or redirect here
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalDuration]);

  useEffect(() => {
    clickSoundRef.current = new Audio("/assets/audio/click_sound.mp3");
    correctSoundRef.current = new Audio("/assets/audio/correct.mp3");
    wrongSoundRef.current = new Audio("/assets/audio/wrong.mp3");
    stageCompleteSoundRef.current = new Audio(
      "/assets/audio/stage_complete.mp3",
    );

    [clickSoundRef, correctSoundRef, wrongSoundRef].forEach((ref) => {
      if (ref.current) {
        ref.current.volume = 0.9;
        ref.current.preload = "auto";
        ref.current.load();
      }
    });
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswered) {
      const audio = clickSoundRef.current;
      if (audio) {
        audio.currentTime = 0; // instant replay
        void audio.play();
      }
      setSelectedAnswer(answer);
    }
  };

  const handleMultipleAnswerSelect = (index: number) => {
    if (isAnswered) return;
    if (selectedAnswers.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter((i) => i !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
  };

  const checkAnswer = () => {
    if (isAnswered) return;

    const correct = selectedAnswer === currentQuestion.answer;

    if (correct) {
      setCorrectAnswerCount((prev) => prev + 1);
      const audio = correctSoundRef.current;
      if (audio) {
        audio.currentTime = 0;
        void audio.play();
      }
    } else {
      const audio = wrongSoundRef.current;
      if (audio) {
        audio.currentTime = 0;
        void audio.play();
      }
    }

    setIsCorrect(correct);
    setShowExplanation(true);
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetQuestion();
    } else {
      const audio = stageCompleteSoundRef.current;
      if (audio) {
        audio.currentTime = 0;
        void audio.play();
      }
      const completeStage = async () => {
        try {
          const response = await axiosInstance.post(`/stages/${id}/complete`);
          if (response?.data?.success) {
            toast.success(response?.data?.message || "Stage Completed!");
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
          setLoader(false);
        }
      };

      completeStage();

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setStageCompleted(true);
    }
  };

  const getHint = async (question: {
    questionText?: string;
    audioUrl?: string;
    imageUrl?: string;
    language?: string;
  }) => {
    if (aiHint) return;
    setLoadingHint(true);
    try {
      const res = await fetch("/api/hint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...question,
          lang: language,
        }),
      });

      // if (!res.ok) {
      //   throw new Error(`Server error: ${res.status}`);
      // }

      const data = await res.json();
      setAiHint(data.hint || currentQuestion.hints || "No hints available.");
      return data.hint;
    } catch (err: any) {
      setAiHint("Failed to get hint. Please try again.");
      return null;
    } finally {
      setLoadingHint(false);
    }
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    // setTextAnswer("");
    setShowHint(false);
    setShowExplanation(false);
    setIsCorrect(null);
    setIsAnswered(false);
    setAiHint("");
    // setTimeElapsed(0);
  };

  const canSubmit = (): boolean => {
    switch (currentQuestion?.question_type) {
      case "text":
        return selectedAnswer !== null;
      case "audio":
        return selectedAnswer !== null;
      case "image":
        return selectedAnswer !== null;
      default:
        return false;
    }
  };

  return (
    <>
      {loader && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 pt-5">
        {/* Header */}
        <div className="bg-white shadow-md border-b border-pink-200 rounded-3xl max-w-4xl mx-auto sticky top-0 z-20">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-xl md:text-4xl font-extrabold text-pink-600 text-center mb-4">
              🎉 You are practicing: {stageName} 🎈
            </h1>
            <div className="flex items-center justify-between">
              <Link
                href={`/practice/${slug}`}
                className="p-2 hover:bg-pink-100 rounded-full transition-transform transform hover:scale-125"
              >
                <X className="w-6 h-6 text-pink-500" />
              </Link>

              <div className="flex-1 mx-6">
                <div className="relative">
                  <div className="h-4 bg-pink-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-pink-700 mt-1 text-center font-bold">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-pink-700 font-bold">
                <Clock className="w-5 h-5" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {stageCompleted ? (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-xl max-w-md mx-auto">
              <div className="w-24 h-24 bg-green-400 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>

              <h2 className="text-xl md:text-3xl text-center font-extrabold text-green-700 mb-2">
                🎉 Stage Completed!
              </h2>
              <p className="text-green-800 font-medium mb-6">
                Your answers have been recorded ✅
              </p>

              <div className="w-full bg-green-50 rounded-lg p-6 space-y-3 border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-green-700">
                    Correct Answers:
                  </span>
                  <span className="text-green-900 font-extrabold text-lg">
                    {correctAnswerCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-700">Wrong Answers:</span>
                  <span className="text-red-900 font-extrabold text-lg">
                    {totalQuestions - correctAnswerCount}
                  </span>
                </div>
                <div className="border-t border-green-200 pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-700">
                      Total Score:
                    </span>
                    <span className="text-blue-900 font-extrabold text-xl">
                      {correctAnswerCount}/{totalQuestions}
                    </span>
                  </div>
                </div>

                <div className="w-full flex justify-center mt-4">
                  <Link
                    href={`/practice/${slug}`}
                    className="px-4 lg:px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 hover:shadow-xl transition-transform transform hover:scale-105 flex items-center gap-2"
                  >
                    Continue Practice 🎈
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              {/* Question */}
              <div className="text-center mb-12">
                {currentQuestion?.question_type === "text" && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentQuestion?.question,
                    }}
                    className="sm:text-2xl md:text-3xl font-extrabold text-pink-700 mb-8"
                  />
                )}

                {currentQuestion?.question_type === "image" && (
                  <div className="w-full max-h-[500px] overflow-hidden rounded-xl bg-yellow-50 border-2 border-yellow-200 flex items-center justify-center shadow-md">
                    <Image
                      src={currentQuestion?.question || ""}
                      alt="Question image"
                      width={1600}
                      height={900}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                {currentQuestion?.question_type === "audio" && (
                  <div className="flex flex-col items-center gap-4 mb-6">
                    {currentQuestion?.audio_file && (
                      <audio
                        controls
                        className="w-full max-w-2xl rounded-xl p-2 border-2 border-pink-200 shadow-lg"
                        aria-label="Question audio"
                      >
                        <source
                          src={currentQuestion.audio_file}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                )}
              </div>

              {/* Answer Options */}
              {currentQuestion && (
                <div className="mb-8 space-y-4">
                  {Array.from({ length: 4 }).map((_, index) => {
                    const optObj = currentQuestion?.options || {};
                    const optionText = String(
                      optObj[index + 1] || `Option ${index + 1}`,
                    );
                    const selectedKey = String(index + 1);

                    // States
                    const isCorrectOption =
                      isAnswered && selectedKey === currentQuestion.answer;
                    const isWrongSelected =
                      isAnswered &&
                      selectedAnswer === selectedKey &&
                      !isCorrectOption;
                    const isSelectedBeforeSubmit =
                      !isAnswered && selectedAnswer === selectedKey;

                    // Base styles
                    let buttonClasses =
                      "w-full p-5 rounded-3xl border-2 text-left transition-all transform hover:scale-105 duration-300";

                    // Cursor
                    buttonClasses += isAnswered
                      ? " cursor-not-allowed"
                      : " cursor-pointer";

                    // Color logic
                    if (isCorrectOption) {
                      buttonClasses +=
                        " bg-green-200 border-green-500 shadow-lg";
                    } else if (isWrongSelected) {
                      buttonClasses += " bg-red-200 border-red-500 shadow-md";
                    } else if (isSelectedBeforeSubmit) {
                      buttonClasses += " bg-blue-100 border-blue-300 shadow-md";
                    } else {
                      buttonClasses +=
                        " bg-yellow-50 border-yellow-200 hover:border-pink-300";
                    }

                    // Circle classes
                    let circleClasses =
                      "w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0";
                    if (isCorrectOption)
                      circleClasses += " bg-green-500 border-green-600";
                    else if (isWrongSelected)
                      circleClasses += " bg-red-500 border-red-600";
                    else if (isSelectedBeforeSubmit)
                      circleClasses += " bg-blue-500 border-blue-600";
                    else circleClasses += " bg-yellow-100 border-yellow-300";

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(selectedKey)}
                        disabled={isAnswered}
                        className={buttonClasses}
                      >
                        <div className="flex items-center gap-4">
                          <div className={circleClasses}>
                            {isCorrectOption && (
                              <Check className="w-6 h-6 text-white" />
                            )}
                            {isWrongSelected && (
                              <X className="text-white text-2xl animate-shake" />
                            )}
                            {!isAnswered && isSelectedBeforeSubmit && (
                              <Check className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div
                            dangerouslySetInnerHTML={{ __html: optionText }}
                            className={`lg:text-xl font-extrabold ${
                              isCorrectOption
                                ? "text-green-800"
                                : isWrongSelected
                                  ? "text-red-800"
                                  : isSelectedBeforeSubmit
                                    ? "text-blue-800"
                                    : "text-yellow-900"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Hint Section */}
              {!showExplanation && (
                <div className="mb-6 text-center">
                  <button
                    onClick={() => {
                      setShowHint(!showHint);
                      if (currentQuestion?.question_type !== "audio") {
                        const payload: any = {};
                        if (currentQuestion?.question_type === "text")
                          payload.questionText = currentQuestion?.question;
                        else if (currentQuestion?.question_type === "audio") {
                          payload.audioUrl = currentQuestion?.audio_file;
                          payload.imageUrl = currentQuestion?.question;
                        }
                        getHint(payload);
                      }
                    }}
                    className="flex items-center justify-center gap-2 text-yellow-600 hover:text-pink-600 font-bold text-lg transition-transform transform hover:scale-110 mx-auto cursor-pointer"
                  >
                    <Lightbulb className="w-6 h-6 animate-pulse" />
                    {showHint
                      ? "Hide AI Hints 💡"
                      : "Get Hints from AI Assistant ✨"}
                  </button>

                  {showHint && (
                    <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl shadow-inner animate-fade-in">
                      <div className="flex gap-3">
                        <Lightbulb className="w-6 h-6 text-yellow-500 mt-1 animate-bounce" />
                        {loadingHint ? (
                          <p className="text-pink-700 font-bold">
                            Thinking
                            <span className="animate-dots ml-1">...</span>
                          </p>
                        ) : (
                          <AIHint
                            hint={
                              aiHint ||
                              currentQuestion?.hints ||
                              "No hints available."
                            }
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Explanation Section */}
              {showExplanation && currentQuestion && (
                <div
                  className={`relative mb-8 p-6 rounded-3xl border-4 transition-all ${isCorrect ? "bg-green-100 border-green-400 shadow-lg" : "bg-red-100 border-red-400 shadow-md"}`}
                >
                  <div>
                    <div className="flex items-start gap-4">
                      {/* Emoji or Image */}
                      <div className="flex-shrink-0 relative -translate-y-5">
                        {isCorrect ? (
                          <>
                            {/* <span className="text-4xl animate-bounce">🎉✅</span> */}
                            <Image
                              src="/assets/img/smiling_smile.gif"
                              alt="Correct"
                              width={80}
                              height={60}
                              className=""
                              loading="lazy"
                            />
                          </>
                        ) : (
                          <>
                            <Image
                              src="/assets/img/raku_sad.gif"
                              alt="Incorrect"
                              width={89}
                              height={60}
                              className=""
                              loading="lazy"
                            />
                          </>
                        )}
                      </div>

                      {/* Text Content */}
                      <h3
                        className={`font-extrabold text-2xl mb-2 ${isCorrect ? "text-green-800" : "text-red-800"}`}
                      >
                        {isCorrect
                          ? "Correct! 🎉 Great job!"
                          : "Oops! ❌ Try again!"}
                      </h3>
                    </div>
                    <p className="text-gray-800 md:text-lg text-center">
                      {currentQuestion.explanation ??
                        "No explanation available."}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center mt-4">
                {!isAnswered ? (
                  <button
                    onClick={checkAnswer}
                    disabled={!canSubmit()}
                    className={`px-8 py-4 rounded-2xl font-bold text-white transition-transform transform hover:scale-105 ${
                      canSubmit()
                        ? "bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 hover:shadow-lg cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Check Answer ✅
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 hover:shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 cursor-pointer"
                  >
                    {currentQuestionIndex < totalQuestions - 1
                      ? "Next Question →"
                      : "Finish 🎉"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
