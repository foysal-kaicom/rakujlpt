"use client";
import { useState, useEffect } from "react";
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
interface Stage {
  stage_id: number;
  slug: string;
  title: string;
  image: string;
  order: number;
  total_questions: number;
  status: string;
  questions: Question[];
}

// Sample questions data
// const questionsData: Question[] = [
//   {
//     id: 1,
//     type: "yes-no",
//     question: "Is this a real English word?",
//     word: "tuces",
//     correctAnswer: "no",
//     explanation:
//       "'Tuces' is not a valid English word. You might be thinking of 'twice' or 'truces'.",
//     hint: "Think about common English word patterns and spelling rules.",
//   },
//   {
//     id: 2,
//     type: "multiple-choice",
//     question: "What is the correct meaning of 'benevolent'?",
//     options: [
//       "Angry and hostile",
//       "Kind and generous",
//       "Sad and depressed",
//       "Confused and lost",
//     ],
//     correctAnswer: 1,
//     explanation:
//       "Benevolent means showing kindness and goodwill. It comes from Latin 'bene' (well) and 'volent' (wishing).",
//     hint: "The prefix 'bene-' means 'good' or 'well', like in 'benefit' or 'beneficial'.",
//   },
//   {
//     id: 3,
//     type: "multiple-answer",
//     question:
//       "Which of the following are synonyms for 'happy'? (Select all that apply)",
//     options: ["Joyful", "Melancholy", "Cheerful", "Sorrowful", "Delighted"],
//     correctAnswers: [0, 2, 4],
//     explanation:
//       "Joyful, cheerful, and delighted are all synonyms for happy. Melancholy and sorrowful mean sad.",
//     hint: "Think about words that describe positive emotions.",
//   },
//   {
//     id: 4,
//     type: "text-input",
//     question: "Fill in the blank: The cat ____ on the mat.",
//     correctAnswer: "sat",
//     acceptableAnswers: ["sat", "sits", "was sitting"],
//     explanation:
//       "The most common answer is 'sat' (past tense). Other acceptable answers include 'sits' (present tense) or 'was sitting' (past continuous).",
//     hint: "Think of a simple verb that describes what a cat does when it rests.",
//   },
// ];
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
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const [questionsData, setQuestionsData] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoader(true);
        const response = await axiosInstance.get(`/stages/${id}/start`);
        if (response?.data?.success) {
          console.log(response.data);
          if (response?.data?.data?.questions.length === 0) {
            toast.error("No questions available for this stage.");
            router.push(`/practice/${slug}`);
          }
          setQuestionsData(response?.data?.data?.questions || []);
        }
        // toast.success(response?.data?.message || "Stages loaded!");
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Cannot fetch Questions right now"
        );
      } finally {
        setLoader(false);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questionsData[currentQuestionIndex];
  const totalQuestions = questionsData.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answer: string) => {
    try {
      const audio = new Audio("/assets/audio/click_sound.mp3");
      audio.volume = 0.9;
      void audio.play();
    } catch (e) {
      // ignore play errors
    }
    if (isAnswered) return;
    setSelectedAnswer(answer);
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
    let correct = false;
    if (selectedAnswer !== null) {
      correct = selectedAnswer === currentQuestion.answer;
    }
    if (correct) {
      setCorrectAnswerCount((prev) => prev + 1);
      try {
        const audio = new Audio("/assets/audio/correct.mp3");
        audio.volume = 0.9;
        void audio.play();
      } catch (e) {
        // ignore play errors
      }
    } else {
      try {
        const audio = new Audio("/assets/audio/wrong.mp3");
        audio.volume = 0.9;
        void audio.play();
      } catch (e) {
        // ignore play errors
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
      try {
        const audio = new Audio("/assets/audio/stage_complete.mp3");
        audio.volume = 0.9;
        void audio.play();
      } catch (e) {
        // ignore play errors
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

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    // setTextAnswer("");
    setShowHint(false);
    setShowExplanation(false);
    setIsCorrect(null);
    setIsAnswered(false);
    setTimeElapsed(0);
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href={`/practice/${slug}`}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </Link>

              <div className="flex-1 mx-6">
                <div className="relative">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 text-center">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="font-mono font-semibold">
                  {formatTime(timeElapsed)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {stageCompleted ? (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-lg max-w-md mx-auto">
              {/* Green checkmark circle */}
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
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

              {/* Success message */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Stage Completed!
              </h2>
              <p className="text-gray-600 mb-6">
                Your answers have been recorded
              </p>

              {/* Score display */}
              <div className="w-full bg-gray-50 rounded-lg p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">
                    Correct Answers:
                  </span>
                  <span className="text-green-600 font-bold text-lg">
                    {correctAnswerCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">
                    Wrong Answers:
                  </span>
                  <span className="text-red-600 font-bold text-lg">
                    {totalQuestions - correctAnswerCount}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-semibold">
                      Total Score:
                    </span>
                    <span className="text-blue-600 font-bold text-xl">
                      {correctAnswerCount}/{totalQuestions}
                    </span>
                  </div>
                </div>
                <div className="w-full flex justify-center mt-4">
                  <Link href={`/practice/${slug}`} className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 cursor-pointer">
                    Continue practice
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              {/* Question */}
              <div className="text-center mb-12">
                {currentQuestion?.question_type === "image" && (
                  <div className="w-full max-h-[500px] overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                    <Image
                      src={currentQuestion?.question || ""}
                      alt={currentQuestion?.question || "Question image"}
                      width={1600}
                      height={900}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                {currentQuestion?.question_type === "text" && (
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                    {currentQuestion?.question}
                  </h2>
                )}
                {currentQuestion?.question_type === "audio" && (
                  <div className="flex flex-col items-center gap-4 mb-6">
                    {currentQuestion?.question && (
                      <div className="w-full max-h-[500px] overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                        <Image
                          src={currentQuestion?.question || ""}
                          alt={currentQuestion?.question || "Question image"}
                          width={1600}
                          height={900}
                          className="w-full h-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {currentQuestion?.audio_file && (
                      <div className="w-full flex justify-center">
                        <audio
                          controls
                          className="w-full max-w-2xl rounded-md p-2"
                          aria-label="Question audio"
                        >
                          <source
                            src={currentQuestion.audio_file}
                            type="audio/mpeg"
                          />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                  </div>
                )}
                {/* {currentQuestion.question_type === "yes-no" && (
              <div className="text-5xl md:text-6xl font-bold text-gray-700 my-12">
                {currentQuestion.word}
              </div>
            )} */}
              </div>

              {/* Answer Options */}
              <div className="mb-8">
                {/* Yes/No Options */}
                {/* {currentQuestion.question_type === "yes-no" && (
              <div className="flex gap-4 justify-center">
                {(["yes", "no"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                    className={`flex flex-col items-center gap-3 p-8 rounded-2xl border-3 transition-all transform hover:scale-105 ${
                      selectedAnswer === option
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-300 bg-white hover:border-blue-300"
                    } ${
                      isAnswered
                        ? "cursor-not-allowed opacity-75"
                        : "cursor-pointer"
                    }`}
                  >
                    {option === "yes" ? (
                      <Check className="w-12 h-12 text-blue-500" />
                    ) : (
                      <X className="w-12 h-12 text-blue-500" />
                    )}
                    <span className="text-xl font-semibold capitalize text-gray-700">
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            )} */}

                {/* Multiple Choice Options */}
                {/* {currentQuestion?.question_type === "text" && ( */}
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => {
                    const optObj = currentQuestion?.options || {};
                    const optionText = String(
                      optObj[index + 1] || `Option ${index + 1}`
                    );
                    const selectedKey = String(index + 1);
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(selectedKey)}
                        disabled={isAnswered}
                        className={`w-full p-5 rounded-xl border-2 text-left transition-all transform hover:scale-[1.02] ${
                          selectedAnswer === String(index + 1)
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-300 bg-white hover:border-blue-300"
                        } ${
                          isAnswered && selectedKey === currentQuestion.answer
                            ? "border-green-500 bg-green-50"
                            : ""
                        } ${
                          isAnswered &&
                          selectedAnswer === selectedKey &&
                          selectedKey !== currentQuestion.answer
                            ? "border-red-500 bg-red-50"
                            : ""
                        } ${
                          isAnswered ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              selectedAnswer === String(index + 1)
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                            }`}
                          >
                            {selectedAnswer === String(index + 1) && (
                              <Check className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <span className="text-lg text-gray-800">
                            {optionText}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {/* )} */}

                {/* Multiple Answer Options */}
                {/* {currentQuestion.question_type === "multiple-answer" && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleMultipleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all transform hover:scale-[1.02] ${
                      selectedAnswers.includes(index)
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-300 bg-white hover:border-blue-300"
                    } ${
                      isAnswered &&
                      currentQuestion.correctAnswers.includes(index)
                        ? "border-green-500 bg-green-50"
                        : ""
                    } ${
                      isAnswered &&
                      selectedAnswers.includes(index) &&
                      !currentQuestion.correctAnswers.includes(index)
                        ? "border-red-500 bg-red-50"
                        : ""
                    } ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedAnswers.includes(index)
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                        }`}
                      >
                        {selectedAnswers.includes(index) && (
                          <Check className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <span className="text-lg text-gray-800">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )} */}

                {/* Text Input */}
                {/* {currentQuestion.question_type === "text-input" && (
              <div>
                <input
                  type="text"
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  disabled={isAnswered}
                  placeholder="Type your answer here..."
                  className={`w-full p-5 text-lg rounded-xl border-2 transition-all ${
                    isAnswered
                      ? isCorrect
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  } outline-none`}
                />
              </div>
            )} */}
              </div>

              {/* Hint Section */}
              {!showExplanation && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mx-auto cursor-pointer"
                  >
                    <Lightbulb className="w-5 h-5" />
                    <span className="font-semibold">
                      {showHint ? "Hide Hints" : "Show Hints"}
                    </span>
                  </button>

                  {showHint && (
                    <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                      <div className="flex gap-3">
                        <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">
                          {currentQuestion.hints ?? "No hints available."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Explanation Section */}
              {showExplanation && (
                <div
                  className={`mb-6 p-6 rounded-xl border-2 relative mt-[78px] ${
                    isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <>
                        <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <Image
                          src="/assets/img/smiling_smile.gif"
                          alt="Correct"
                          width={80}
                          height={60}
                          className="flex-shrink-0 mt-0.5 absolute top-[-78px]"
                        />
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                        <Image
                          src="/assets/img/raku_sad.gif"
                          alt="Incorrect"
                          width={89}
                          height={60}
                          className="flex-shrink-0 mt-0.5 absolute top-[-87px]"
                        />
                      </>
                    )}
                    <div>
                      <h3
                        className={`font-bold text-lg mb-2 ${
                          isCorrect ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </h3>
                      <p className="text-gray-700">
                        {currentQuestion.explanation ??
                          "No explanation available."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                {!isAnswered ? (
                  <button
                    onClick={checkAnswer}
                    disabled={!canSubmit()}
                    className={`px-8 py-4 rounded-xl font-semibold text-white transition-all transform hover:scale-105 cursor-pointer ${
                      canSubmit()
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 cursor-pointer"
                  >
                    {currentQuestionIndex < totalQuestions - 1
                      ? "Next Question"
                      : "Finish"}
                    <ChevronRight className="w-5 h-5" />
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
