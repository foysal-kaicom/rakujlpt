"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { useRouter, useParams } from "next/navigation";

import {
  FaFileAlt,
  FaBookOpen,
  FaRegCommentDots,
  FaRegImage,
  FaUsers,
} from "react-icons/fa";

import { toast } from "sonner";
import axiosInstance from "@/utils/axios";
import { useExamStore } from "@/stores/useExamStore";

import SkeletonMockExam from "./MocktestSkeleton";
import MocktestResultModal from "./MocktestResultModal";
import MocktestHeader from "./MocktestHeader";
import MocktestSidebar from "./MocktestSidebar";
import MocktestMainContent from "./MocktestMainContent";
import AnswerConsent from "./Answerconsent";

import type {
  ExamSection,
  ModuleQuestionCounts,
} from "@/types/Mocktest/MockExam.type";

/* -------------------- Helpers -------------------- */
const formatTime = (seconds: number) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

/* -------------------- Component -------------------- */
export default function ExamPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  /* -------------------- Local State -------------------- */
  const [questions, setQuestions] = useState<ExamSection[]>([]);
  const [examTitle, setExamTitle] = useState("");
  const [currentModule, setCurrentModule] = useState("");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sidebarShow, setSidebarShow] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showConsent, setShowConsent] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  /* -------------------- Store -------------------- */
  const {
    answers,
    setAnswer,
    clearAnswers,
    timeRemaining,
    setTimeRemaining,
    decrementTime,
    examStarted,
    stopExam,
  } = useExamStore();

  /* -------------------- Static Map -------------------- */
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

  /* -------------------- Derived Data -------------------- */
  const moduleList = useMemo(
    () => [...new Set(questions.map((q) => q.module_name))],
    [questions],
  );

  const moduleQuestionCounts = useMemo(() => {
    return questions.reduce((acc, s) => {
      const count = s.group.reduce((g, q) => g + q.questions.length, 0);
      acc[s.module_name] = (acc[s.module_name] || 0) + count;
      return acc;
    }, {} as ModuleQuestionCounts);
  }, [questions]);

  const handleModuleClick = (moduleName: string) => {
    setCurrentModule(moduleName);

    const firstValidIndex = sectionList.findIndex(
      (s) => s.module_name === moduleName && hasQuestions(s),
    );

    setCurrentSectionIndex(firstValidIndex === -1 ? 0 : firstValidIndex);
  };

  const sectionList = useMemo(
    () => questions.filter((q) => q.module_name === currentModule),
    [questions, currentModule],
  );

  const currentSection = sectionList[currentSectionIndex] ?? null;

  const totalQuestions = useMemo(() => {
    return questions.reduce(
      (t, s) => t + s.group.reduce((g, q) => g + q.questions.length, 0),
      0,
    );
  }, [questions]);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswer(questionId, value);
  };

  const answeredQuestions = useMemo(
    () => Object.keys(answers).length,
    [answers],
  );

  const hasQuestions = useCallback(
    (s: ExamSection) => s.group.some((g) => g.questions.length > 0),
    [],
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

  /* -------------------- Fetch -------------------- */
  useEffect(() => {
    if (!examStarted || isSubmitted) return;

    const fetchExam = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(
          `/mock-test/get-questions?exam_id=${id}`,
        );

        setQuestions(data.data.sections);
        setExamTitle(data.data.exam_title);
        setCurrentModule(data.data.sections[0]?.module_name);
        setTimeRemaining(Number(data.data.exam_duration) * 60);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Cannot fetch mock questions right now",
        );
        router.push("/packages");
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examStarted, isSubmitted, id, router, setTimeRemaining]);

  /* -------------------- Guards -------------------- */
  useEffect(() => {
    if (!examStarted && !isSubmitted) router.back();
  }, [examStarted, isSubmitted, router]);

  useEffect(() => {
    if (!examStarted || isSubmitted) return;
    const id = setInterval(decrementTime, 1000);
    return () => clearInterval(id);
  }, [examStarted, isSubmitted, decrementTime]);

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

  /* -------------------- Submit -------------------- */
  const submitExam = useCallback(async () => {
    if (isSubmitted) return;

    try {
      setLoading(true);
      const payload = Object.entries(answers).map(([id, value]) => ({
        id: Number(id),
        answer: Number(value),
      }));

      const { data } = await axiosInstance.post(
        `/mock-test/submit-answer?exam_id=${id}&total_questions=${totalQuestions}`,
        payload,
      );

      setResult(data.data);
      setIsSubmitted(true);
      stopExam();
      clearAnswers();
    } finally {
      setLoading(false);
      setShowConsent(false);
    }
  }, [answers, id, totalQuestions, isSubmitted, stopExam, clearAnswers]);

  useEffect(() => {
    if (timeRemaining <= 0 && examStarted && !isSubmitted) {
      submitExam();
    }
  }, [timeRemaining, examStarted, isSubmitted, submitExam]);

  /* -------------------- Navigation -------------------- */
  const handleNext = useCallback(() => {
    for (let i = currentSectionIndex + 1; i < sectionList.length; i++) {
      if (hasQuestions(sectionList[i])) {
        setCurrentSectionIndex(i);
        return;
      }
    }

    const nextModule = moduleList[moduleList.indexOf(currentModule) + 1];
    if (!nextModule) return;

    setCurrentModule(nextModule);
    setCurrentSectionIndex(0);
  }, [
    currentSectionIndex,
    sectionList,
    moduleList,
    currentModule,
    hasQuestions,
  ]);

  const handlePrevious = useCallback(() => {
    // 1️⃣ Move inside current module first
    for (let i = currentSectionIndex - 1; i >= 0; i--) {
      if (hasQuestions(sectionList[i])) {
        setCurrentSectionIndex(i);
        return;
      }
    }

    // 2️⃣ Move to previous module
    const currentModuleIndex = moduleList.indexOf(currentModule);
    if (currentModuleIndex <= 0) return;

    const prevModule = moduleList[currentModuleIndex - 1];

    // 3️⃣ Find LAST valid section of previous module (IMPORTANT)
    const prevModuleSections = questions.filter(
      (s) => s.module_name === prevModule,
    );

    for (let i = prevModuleSections.length - 1; i >= 0; i--) {
      if (hasQuestions(prevModuleSections[i])) {
        setCurrentModule(prevModule);
        setCurrentSectionIndex(i);
        return;
      }
    }
  }, [currentSectionIndex, sectionList, moduleList, currentModule, questions]);

  const canGoNext = useMemo(() => {
    for (let i = currentSectionIndex + 1; i < sectionList.length; i++) {
      if (hasQuestions(sectionList[i])) return true;
    }

    const nextModule = moduleList[moduleList.indexOf(currentModule) + 1];

    if (!nextModule) return false;

    return questions.some(
      (s) => s.module_name === nextModule && hasQuestions(s),
    );
  }, [
    currentSectionIndex,
    sectionList,
    moduleList,
    currentModule,
    questions,
    hasQuestions,
  ]);

  const isFirstStep = useMemo(() => {
    // if not first module → not first step
    if (currentModule !== moduleList[0]) return false;

    // find first section WITH questions in this module
    const firstValidIndex = sectionList.findIndex(hasQuestions);

    // if no valid sections exist, treat as first (edge case)
    if (firstValidIndex === -1) return true;

    return currentSectionIndex === firstValidIndex;
  }, [
    currentModule,
    moduleList,
    sectionList,
    currentSectionIndex,
    hasQuestions,
  ]);

  const isLastStep = !canGoNext;

  /* -------------------- Render -------------------- */
  if (loading) return <SkeletonMockExam />;

  if (isSubmitted) {
    return (
      <MocktestResultModal
        result={result}
        setIsSubmitted={setIsSubmitted}
        moduleQuestionCounts={moduleQuestionCounts}
        id={id}
      />
    );
  }

  return (
    <>
      {!showConsent ? (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-slate-100">
          <MocktestHeader
            formatTime={formatTime}
            examTitle={examTitle}
            timeRemaining={timeRemaining}
            sliderRef={sliderRef}
            currentSectionIndex={currentSectionIndex}
            answers={answers}
            currentModule={currentModule}
            moduleList={moduleList}
            sectionList={sectionList}
            setCurrentSectionIndex={setCurrentSectionIndex}
            handleModuleClick={handleModuleClick}
            scroll={() => {}}
          />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
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

            <MocktestMainContent
              currentSection={currentSection}
              stepHeadingIcons={stepHeadingIcons}
              questionRefs={questionRefs}
              getGlobalQuestionNumber={getGlobalQuestionNumber}
              handleAnswerChange={handleAnswerChange}
              answers={answers}
              handlePrevious={handlePrevious}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              handleSubmit={() => setShowConsent(true)}
              handleNext={handleNext}
            />
          </div>
        </div>
      ) : (
        <AnswerConsent
          questions={questions}
          answers={answers}
          questionRefs={questionRefs}
          handleSubmit={submitExam}
          setShowConsent={setShowConsent}
          setCurrentModule={setCurrentModule}
          setCurrentSectionIndex={setCurrentSectionIndex}
          getGlobalQuestionNumber={getGlobalQuestionNumber}
        />
      )}
    </>
  );
}
