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
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Types
type QuestionType =
  | "yes-no"
  | "multiple-choice"
  | "multiple-answer"
  | "text-input";

interface BaseQuestion {
  id: number;
  type: QuestionType;
  question: string;
  explanation: string;
  hint: string;
}

interface YesNoQuestion extends BaseQuestion {
  type: "yes-no";
  word: string;
  correctAnswer: "yes" | "no";
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: string[];
  correctAnswer: number;
}

interface MultipleAnswerQuestion extends BaseQuestion {
  type: "multiple-answer";
  options: string[];
  correctAnswers: number[];
}

interface TextInputQuestion extends BaseQuestion {
  type: "text-input";
  correctAnswer: string;
  acceptableAnswers: string[];
}

type Question =
  | YesNoQuestion
  | MultipleChoiceQuestion
  | MultipleAnswerQuestion
  | TextInputQuestion;

// Sample questions data
const questionsData: Question[] = [
  {
    id: 1,
    type: "yes-no",
    question: "Is this a real English word?",
    word: "tuces",
    correctAnswer: "no",
    explanation:
      "'Tuces' is not a valid English word. You might be thinking of 'twice' or 'truces'.",
    hint: "Think about common English word patterns and spelling rules.",
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "What is the correct meaning of 'benevolent'?",
    options: [
      "Angry and hostile",
      "Kind and generous",
      "Sad and depressed",
      "Confused and lost",
    ],
    correctAnswer: 1,
    explanation:
      "Benevolent means showing kindness and goodwill. It comes from Latin 'bene' (well) and 'volent' (wishing).",
    hint: "The prefix 'bene-' means 'good' or 'well', like in 'benefit' or 'beneficial'.",
  },
  {
    id: 3,
    type: "multiple-answer",
    question:
      "Which of the following are synonyms for 'happy'? (Select all that apply)",
    options: ["Joyful", "Melancholy", "Cheerful", "Sorrowful", "Delighted"],
    correctAnswers: [0, 2, 4],
    explanation:
      "Joyful, cheerful, and delighted are all synonyms for happy. Melancholy and sorrowful mean sad.",
    hint: "Think about words that describe positive emotions.",
  },
  {
    id: 4,
    type: "text-input",
    question: "Fill in the blank: The cat ____ on the mat.",
    correctAnswer: "sat",
    acceptableAnswers: ["sat", "sits", "was sitting"],
    explanation:
      "The most common answer is 'sat' (past tense). Other acceptable answers include 'sits' (present tense) or 'was sitting' (past continuous).",
    hint: "Think of a simple verb that describes what a cat does when it rests.",
  },
];

export default function PracticeQuestion() {
  const params = useParams();
  const slug = params.slug;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(
    null
  );
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [textAnswer, setTextAnswer] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

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

  const handleAnswerSelect = (answer: number | string) => {
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

    switch (currentQuestion.type) {
      case "yes-no":
        correct = selectedAnswer === currentQuestion.correctAnswer;
        break;
      case "multiple-choice":
        correct = selectedAnswer === currentQuestion.correctAnswer;
        break;
      case "multiple-answer":
        const sortedSelected = [...selectedAnswers].sort();
        const sortedCorrect = [...currentQuestion.correctAnswers].sort();
        correct =
          JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);
        break;
      case "text-input":
        correct = currentQuestion.acceptableAnswers.some(
          (answer) => answer.toLowerCase() === textAnswer.trim().toLowerCase()
        );
        break;
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
      // Quiz complete
      alert("Practice complete!");
    }
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setTextAnswer("");
    setShowHint(false);
    setShowExplanation(false);
    setIsCorrect(null);
    setIsAnswered(false);
    setTimeElapsed(0);
  };

  const canSubmit = (): boolean => {
    switch (currentQuestion.type) {
      case "yes-no":
      case "multiple-choice":
        return selectedAnswer !== null;
      case "multiple-answer":
        return selectedAnswers.length > 0;
      case "text-input":
        return textAnswer.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={"/practice"} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Question */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === "yes-no" && (
              <div className="text-5xl md:text-6xl font-bold text-gray-700 my-12">
                {currentQuestion.word}
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="mb-8">
            {/* Yes/No Options */}
            {currentQuestion.type === "yes-no" && (
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
            )}

            {/* Multiple Choice Options */}
            {currentQuestion.type === "multiple-choice" && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all transform hover:scale-[1.02] ${
                      selectedAnswer === index
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-300 bg-white hover:border-blue-300"
                    } ${
                      isAnswered && index === currentQuestion.correctAnswer
                        ? "border-green-500 bg-green-50"
                        : ""
                    } ${
                      isAnswered &&
                      selectedAnswer === index &&
                      index !== currentQuestion.correctAnswer
                        ? "border-red-500 bg-red-50"
                        : ""
                    } ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedAnswer === index
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                        }`}
                      >
                        {selectedAnswer === index && (
                          <Check className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <span className="text-lg text-gray-800">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Multiple Answer Options */}
            {currentQuestion.type === "multiple-answer" && (
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
            )}

            {/* Text Input */}
            {currentQuestion.type === "text-input" && (
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
            )}
          </div>

          {/* Hint Section */}
          {!showExplanation && (
            <div className="mb-6">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mx-auto"
              >
                <Lightbulb className="w-5 h-5" />
                <span className="font-semibold">
                  {showHint ? "Hide Hint" : "Show Hint"}
                </span>
              </button>

              {showHint && (
                <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                  <div className="flex gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{currentQuestion.hint}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Explanation Section */}
          {showExplanation && (
            <div
              className={`mb-6 p-6 rounded-xl border-2 ${
                isCorrect
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                {isCorrect ? (
                  <>
                  {/* <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" /> */}
                  <Image src="/assets/img/smiling_smile.gif" alt="Correct" width={60} height={60} className="flex-shrink-0 mt-0.5" /></>
                ) : (
                  <>
                  {/* <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" /> */}
                  <Image src="/assets/img/smiling_smile.gif" alt="Incorrect" width={60} height={60} className="flex-shrink-0 mt-0.5" />
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
                  <p className="text-gray-700">{currentQuestion.explanation}</p>
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
                className={`px-8 py-4 rounded-xl font-semibold text-white transition-all transform hover:scale-105 ${
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
                className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
              >
                {currentQuestionIndex < totalQuestions - 1
                  ? "Next Question"
                  : "Finish"}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
