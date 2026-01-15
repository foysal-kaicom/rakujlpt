import { useTranslation } from "react-i18next";

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

export interface MockTestResult {
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

interface ExamDetailsModalProps {
  data: MockTestResult;
  onClose: () => void;
}

export default function ExamDetailsModal({
  data,
  onClose,
}: ExamDetailsModalProps) {
  const { t } = useTranslation("common");
  const modules = data.module_wise_score ?? {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-5">
      <div className="relative w-full max-w-xl rounded-3xl p-7 bg-gradient-to-br from-purple-100/90 via-violet-100/90 to-pink-100/90 shadow-2xl border border-violet-300">
        {/* Top Glow */}
        <div className="absolute -top-10 -right-10 h-32 w-32 bg-pink-400/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-indigo-400/30 rounded-full blur-3xl" />
        <button
          onClick={onClose}
          className="absolute z-30 right-5 top-5 p-1 text-lg size-8 flex justify-center items-center rounded-full font-semibold text-white bg-red-600 shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          x
        </button>

        {/* Header */}
        <div className="mb-6 relative z-10">
          <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
            {data.exam.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            📅 Exam Date · {data.created_at}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-7 relative z-10">
          <div className="col-span-2">
            <p className="text-2xl font-bold">
              {t("mock_exam_result.table.score")} :{" "}
              {Math.round(data.total_correct * data.per_question_mark)}
            </p>
          </div>
          <div className="rounded-2xl p-4 bg-gradient-to-br from-green-100 to-green-50 border border-green-200">
            <p className="text-xs text-green-700">Total Correct</p>
            <p className="text-2xl font-bold text-green-700">
              {data.total_correct}
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-gradient-to-br from-red-100 to-red-50 border border-red-200">
            <p className="text-xs text-red-700">Total Wrong</p>
            <p className="text-2xl font-bold text-red-600">
              {data.total_wrong}
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-200">
            <p className="text-xs text-yellow-700">Pass Point</p>
            <p className="text-lg font-semibold text-yellow-800">
              {data.exam.pass_point}
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-gradient-to-br from-sky-100 to-sky-50 border border-sky-200">
            <p className="text-xs text-sky-700">Total Point</p>
            <p className="text-lg font-semibold text-sky-800">
              {Math.round(data.total_correct * data.per_question_mark)}/
              {data.exam.total_point}
            </p>
          </div>
        </div>

        {/* Module-wise */}
        <div className="space-y-3 relative z-10">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
            📊 Module Breakdown
          </h3>

          {Object.keys(modules).length === 0 ? (
            <p className="text-sm text-gray-400 italic">
              Module-wise score not available.
            </p>
          ) : (
            <div className="space-y-2">
              {Object.entries(modules).map(([moduleName, stats]) => (
                <div
                  key={moduleName}
                  className="flex justify-between items-center rounded-2xl px-4 py-3 bg-white/80 border border-white/60 shadow-sm hover:shadow-md transition"
                >
                  <span className="font-semibold text-gray-800">
                    {moduleName}
                  </span>

                  <div className="flex gap-3 text-xs font-semibold">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">
                      ✔ {stats.correct}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-600">
                      ✖ {stats.wrong}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {stats.answered}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
