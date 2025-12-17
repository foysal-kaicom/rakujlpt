"use client";

import React, { useState, useEffect, useMemo, useRef, ReactNode } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import {
  FaFileAlt,
  FaBookOpen,
  FaRegCommentDots,
  FaRegImage,
  FaUsers,
} from "react-icons/fa";

import axiosInstance from "@/utils/axios";
import { useExamStore } from "@/stores/useExamStore";

import SkeletonMockExam from "./MocktestSkeleton";
import MocktestResultModal from "./MocktestResultModal";
import MocktestHeader from "./MocktestHeader";
import MocktestSidebar from "./MocktestSidebar";
import MocktestMainContent from "./MocktestMainContent";
import AnswerConsent from "./Answerconsent";

/* -------------------- Types -------------------- */
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
  per_question_mark: number;
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
  const [examTitle, setExamTitle] = useState<string>(
    "Japanese Language Proficiency Exam"
  );
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sidebarShow, setSidebarShow] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [consent, setConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  const [moduleList, setModuleList] = useState<string[]>([]);
  const [currentModule, setCurrentModule] = useState<string>("");
  const [sectionList, setSectionList] = useState<ExamSection[]>([]);
  const [ignoreModuleEffect, setIgnoreModuleEffect] = useState(false);

  /* -------------------- Exam Store -------------------- */
  const {
    answers,
    setAnswer,
    clearAnswers,
    timeRemaining,
    setTimeRemaining,
    decrementTime,
    resetTime,
    examStarted,
    stopExam,
  } = useExamStore();

  const currentSection = sectionList[currentSectionIndex] ?? null;

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
        const response = await axiosInstance.get(
          `/mock-test/get-questions?exam_id=${id}`
        );
        setQuestions(response.data.data.sections);
        setExamTitle(response.data.data.exam_title);
        setCurrentSectionIndex(0);

        const uniqueModules = [
          ...new Set(
            response.data.data.sections.map(
              (sec: ExamSection) => sec.module_name
            )
          ),
        ] as string[];

        setModuleList(uniqueModules);
        setCurrentModule(uniqueModules[0]);

        const duration = Number(response.data.data.exam_duration); // convert to number
        setTimeRemaining(duration * 60);

        toast.success(response?.data?.message || "Mock test questions loaded!");
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Cannot fetch mock questions right now"
        );
        router.push("/packages");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examStarted, isSubmitted]);

  /* -------------------- current section list -------------------- */
  useEffect(() => {
    if (!currentModule || questions.length === 0) return;

    const filtered = questions.filter(
      (sec) => sec.module_name === currentModule
    );

    setSectionList(filtered);
  }, [currentModule, questions]);

  /* -------------------- current module  change -------------------- */
  const handleModuleClick = (moduleName: string) => {
    setCurrentModule(moduleName);
  };

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
    while (prevIndex >= 0 && !hasQuestions(sectionList[prevIndex])) {
      prevIndex--;
    }

    if (prevIndex >= 0) {
      setCurrentSectionIndex(prevIndex);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const currentModuleIndex = moduleList.indexOf(currentModule);
    const prevModuleIndex = currentModuleIndex - 1;

    if (prevModuleIndex < 0) return;

    const prevModule = moduleList[prevModuleIndex];
    const prevModuleSections = questions.filter(
      (sec) => sec.module_name === prevModule
    );
    let lastValidIndex = -1;
    for (let i = prevModuleSections.length - 1; i >= 0; i--) {
      if (hasQuestions(prevModuleSections[i])) {
        lastValidIndex = i;
        break;
      }
    }

    if (lastValidIndex === -1) return;
    setCurrentModule(prevModule);
    setCurrentSectionIndex(lastValidIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    let nextIndex = currentSectionIndex + 1;
    while (
      nextIndex < sectionList.length &&
      !hasQuestions(sectionList[nextIndex])
    ) {
      nextIndex++;
    }

    if (nextIndex < sectionList.length) {
      setCurrentSectionIndex(nextIndex);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const currentModuleIndex = moduleList.indexOf(currentModule);
    const nextModuleIndex = currentModuleIndex + 1;

    if (nextModuleIndex >= moduleList.length) return;

    const nextModule = moduleList[nextModuleIndex];
    const nextModuleSections = questions.filter(
      (sec) => sec.module_name === nextModule
    );
    const firstValidIndex = nextModuleSections.findIndex(hasQuestions);

    if (firstValidIndex === -1) return;
    setCurrentModule(nextModule);
    setCurrentSectionIndex(firstValidIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (ignoreModuleEffect) {
      setIgnoreModuleEffect(false);
      return;
    }
    setCurrentSectionIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentModule]);

  const isFirstStep = () => {
    const firstModule = moduleList[0];
    if (currentModule !== firstModule) return false;

    const firstValidIndex = sectionList.findIndex(hasQuestions);
    return currentSectionIndex === firstValidIndex;
  };

  const isLastStep = () => {
    const lastModule = moduleList[moduleList.length - 1];
    if (currentModule !== lastModule) return false;

    const lastValidIndex =
      sectionList.length -
      1 -
      [...sectionList].reverse().findIndex(hasQuestions);

    return currentSectionIndex === lastValidIndex;
  };

  const handleSubmit = async () => {
    if (consent && showConsent) {
      console.log("true");
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
          `/mock-test/submit-answer?exam_id=${id}&total_questions=${totalQuestions}`,
          payload
        );

        setResult({
          readingAnswered: response?.data?.data?.reading_answered ?? 0,
          correctReadingAnswer:
            response?.data?.data?.correct_reading_answer ?? 0,
          wrongReadingAnswer: response?.data?.data?.wrong_reading_answer ?? 0,
          listeningAnswered: response?.data?.data?.listening_answered ?? 0,
          correctListeningAnswer:
            response?.data?.data?.correct_listening_answer ?? 0,
          wrongListeningAnswer:
            response?.data?.data?.wrong_listening_answer ?? 0,
          per_question_mark: response?.data?.data?.per_question_mark ?? 0,
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
        setShowConsent(false);
      }
    } else {
      setShowConsent(true);
      setConsent(true);
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
      <MocktestResultModal
        result={result}
        setIsSubmitted={setIsSubmitted}
        moduleQuestionCounts={moduleQuestionCounts}
        id={id}
      />
    );
  }

  /* -------------------- Exam Screen -------------------- */
  return (
    <>
      {!showConsent ? (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-slate-100">
          {/* Header */}
          <MocktestHeader
            formatTime={formatTime}
            examTitle={examTitle}
            timeRemaining={timeRemaining}
            sliderRef={sliderRef}
            currentSectionIndex={currentSectionIndex}
            scroll={scroll}
            setCurrentSectionIndex={setCurrentSectionIndex}
            answers={answers}
            currentModule={currentModule}
            handleModuleClick={handleModuleClick}
            moduleList={moduleList}
            sectionList={sectionList}
          />

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <MocktestSidebar
              currentSection={currentSection}
              sidebarShow={sidebarShow}
              setSidebarShow={setSidebarShow}
              answeredQuestions={answeredQuestions}
              totalQuestions={totalQuestions}
              answers={answers}
              questionRefs={questionRefs}
              getGlobalQuestionNumber={getGlobalQuestionNumber}
            />

            {/* Main Content */}
            <MocktestMainContent
              currentSection={currentSection}
              stepHeadingIcons={stepHeadingIcons}
              questionRefs={questionRefs}
              getGlobalQuestionNumber={getGlobalQuestionNumber}
              handleAnswerChange={handleAnswerChange}
              answers={answers}
              handlePrevious={handlePrevious}
              isFirstStep={isFirstStep()}
              isLastStep={isLastStep()}
              handleSubmit={handleSubmit}
              handleNext={handleNext}
            />
          </div>
        </div>
      ) : (
        <AnswerConsent
          questions={questions}
          getGlobalQuestionNumber={getGlobalQuestionNumber}
          answers={answers}
          setCurrentSectionIndex={setCurrentSectionIndex}
          questionRefs={questionRefs}
          handleSubmit={handleSubmit}
          setShowConsent={setShowConsent}
          setCurrentModule={setCurrentModule}
          setIgnoreModuleEffect={setIgnoreModuleEffect}
        />
      )}
    </>
  );
}
