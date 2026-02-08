"use client";
import { useState } from "react";

import { BsStars } from "react-icons/bs";

interface ModuleScore {
  wrong: number;
  correct: number;
  answered: number;
}

interface ExamInfo {
  id: number;
  name: string;
  title: string;
  pass_point: number;
  total_point: number;
}

interface MockTestResult {
  id: number;
  candidate_id: number;
  question_set: number;
  per_question_mark: number;
  total_answered: number;
  total_correct: number;
  total_wrong: number;
  module_wise_score?: Record<string, ModuleScore>;
  created_at: string;
  updated_at: string;
  exam: ExamInfo;
}

interface MockTestEvaluationProps {
  resultData: MockTestResult[];
  language: string;
}
interface AiSuggestions {
  [examTitle: string]: {
    [moduleName: string]: string[];
  };
}

export default function MocktestResultEvaluation({
  resultData,
  language,
}: MockTestEvaluationProps) {
  const [report, setReport] = useState<any[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestions>({});
  const [loadingAI, setLoadingAI] = useState(true);
  const [openReportModal, setOpenReportModal] = useState(false);

  const getOverallProgress = (total_correct: number, total_answered: number) =>
    ((total_correct / total_answered) * 100).toFixed(1);

  const buildModuleWisePayload = (reports: any[]) =>
    reports.flatMap((exam) =>
      Object.entries(exam.moduleScores).map(([module, score]: any) => ({
        exam_title: exam.title,
        module,
        correct: score.correct,
        wrong: score.wrong,
        answered: score.answered,
        accuracy: Number(((score.correct / score.answered) * 100).toFixed(1)),
        error_rate: Number(((score.wrong / score.answered) * 100).toFixed(1)),
      })),
    );

  const handleEvaluation = async () => {
    setOpenReportModal(true);
    // Group exams by title
    const grouped: Record<string, MockTestResult[]> = {};
    resultData.forEach((exam) => {
      const key = exam.exam.title;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(exam);
    });

    // Merge grouped exams
    const mergedReports = Object.entries(grouped).map(([examTitle, exams]) => {
      let total_correct = 0;
      let total_answered = 0;
      let total_wrong = 0;
      let moduleScores: Record<string, ModuleScore> = {};

      exams.forEach((exam) => {
        total_correct += exam.total_correct;
        total_answered += exam.total_answered;
        total_wrong += exam.total_wrong;

        Object.entries(exam.module_wise_score ?? {}).forEach(
          ([moduleName, score]) => {
            if (!moduleScores[moduleName]) {
              moduleScores[moduleName] = { correct: 0, wrong: 0, answered: 0 };
            }
            moduleScores[moduleName].correct += score.correct;
            moduleScores[moduleName].wrong += score.wrong;
            moduleScores[moduleName].answered += score.answered;
          },
        );
      });

      // Determine strong and weak modules
      const strongModules = Object.entries(moduleScores)
        .filter(([_, score]) => score.correct >= score.wrong)
        .map(([name, score]) => ({
          name,
          correct: score.correct,
          wrong: score.wrong,
          answered: score.answered,
          percentage: ((score.correct / score.answered) * 100).toFixed(1),
        }));

      const weakModules = Object.entries(moduleScores)
        .filter(([_, score]) => score.correct < score.wrong)
        .map(([name, score]) => ({
          name,
          correct: score.correct,
          wrong: score.wrong,
          answered: score.answered,
          percentage: ((score.correct / score.answered) * 100).toFixed(1),
        }));

      return {
        title: examTitle,
        total_correct,
        total_answered,
        total_wrong,
        moduleScores,
        strongModules,
        weakModules,
      };
    });

    setReport(mergedReports);

    /* -------- AI PART -------- */
    const payload = buildModuleWisePayload(mergedReports);
    try {
      const res = await fetch("/api/aiMockTestReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload, lang: language }),
      });

      const data = await res.json();
      setAiSuggestions(data.suggestions || {});
    } finally {
      setLoadingAI(false);
    }
  };

  // Suggestion based on module percentage
  const getModuleSuggestion = (percentage: number) => {
    const p = percentage;
    if (p >= 80) return "Excellent! Keep practicing to maintain your strength.";
    if (p >= 50) return "Good! Focus on small improvements to get even better.";
    return "Needs improvement. Focus on this module and revise key topics.";
  };

  return (
    <div className="relative">
      <button
        onClick={handleEvaluation}
        className="flex text-sm items-center justify-center gap-1 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-200 cursor-pointer"
      >
        <BsStars className="size-5" />
        Start AI Evaluation
      </button>

      {openReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5">
          {loadingAI ? (
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-2 bg-white w-md h-[30vh] rounded-3xl fade-slide-in-bottom">
              {/* Animated dots */}
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-0"></span>
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              <span className="ml-2 font-semibold capitalize">
                Generating your report
              </span>
              <style jsx>{`
                .animate-bounce {
                  animation: bounce 0.6s infinite alternate;
                }
                .delay-0 {
                  animation-delay: 0s;
                }
                .delay-150 {
                  animation-delay: 0.15s;
                }
                .delay-300 {
                  animation-delay: 0.3s;
                }
                @keyframes bounce {
                  0% {
                    transform: translateY(0);
                  }
                  100% {
                    transform: translateY(-4px);
                  }
                }
              `}</style>
            </div>
          ) : (
            <div className="relative w-full max-w-5xl bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl border border-white/30 fade-slide-in-bottom">
              {/* Close Button */}
              <button
                onClick={() => setOpenReportModal(false)}
                className="absolute top-4 right-4 bg-red-600 text-white hover:scale-110 transition font-bold p-2 border rounded-full size-8 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              <div className="p-6 space-y-8 h-[80vh] overflow-y-auto scrollbar-thin">
                {report.map((exam) => (
                  <div
                    key={exam.title}
                    className="p-4 bg-white rounded-xl shadow"
                  >
                    <h2 className="text-2xl font-bold">{exam.title}</h2>
                    <p className="text-gray-600 mt-1 mb-2">
                      Overall Progress:{" "}
                      <span className="font-semibold">
                        {getOverallProgress(
                          exam.total_correct,
                          exam.total_answered,
                        )}
                        %
                      </span>
                    </p>

                    {/* cast moduleScores here */}
                    {exam.moduleScores &&
                      (() => {
                        const moduleScores = exam.moduleScores as Record<
                          string,
                          ModuleScore
                        >;

                        return (
                          <div className="grid md:grid-cols-2 gap-6">
                            {Object.entries(moduleScores).map(
                              ([moduleName, score]) => {
                                const answered = Number(score?.answered);
                                const correct = Number(score?.correct);

                                const percentage =
                                  answered > 0
                                    ? ((correct / answered) * 100).toFixed(2)
                                    : "0.00";

                                const colorClass =
                                  parseFloat(percentage) >= 50
                                    ? "bg-green-600"
                                    : "bg-red-600";

                                // Get AI suggestions safely
                                const moduleSuggestions: string[] =
                                  aiSuggestions[exam.title]?.[moduleName] ?? [];

                                return (
                                  <div
                                    key={moduleName}
                                    className="p-4 bg-gray-50 rounded-xl shadow-inner flex flex-col gap-2"
                                  >
                                    {/* Module header */}
                                    <div className="flex justify-between items-center">
                                      <p className="font-medium text-gray-700">
                                        {moduleName}
                                      </p>
                                      <span
                                        className={`px-2 py-1 rounded-full text-white text-sm font-bold ${colorClass}`}
                                      >
                                        {percentage}%
                                      </span>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                      <div
                                        className={`h-3 rounded-full ${colorClass} transition-all`}
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>

                                    {/* AI Suggestions / Fallback */}
                                    {loadingAI ? (
                                      <p className="text-xs text-gray-400 mt-2 font-medium">
                                        AI analyzing…
                                      </p>
                                    ) : moduleSuggestions.length > 0 ? (
                                      <ul className="list-disc pl-5 mt-2 text-xs text-gray-700 font-medium">
                                        {moduleSuggestions.map((s, i) => (
                                          <li key={i}>{s}</li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="list-disc text-gray-700 text-xs font-medium mt-2">
                                        {getModuleSuggestion(
                                          parseFloat(percentage),
                                        )}
                                      </p>
                                    )}
                                  </div>
                                );
                              },
                            )}
                          </div>
                        );
                      })()}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
