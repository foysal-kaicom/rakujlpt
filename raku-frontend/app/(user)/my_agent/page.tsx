"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import { useTranslation } from "react-i18next";

type Exam = {
  id: number;
  title: string;
  total_questions: number;
  created_at: string;
};

export default function MyAgent() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const breadCrumbData = [
    { name: t("my_agent.breadcrumbs.dashboard"), to: "/dashboard" },
    { name: t("my_agent.breadcrumbs.my_agent"), to: "/my_agent" },
  ];

  //   const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [open, setOpen] = useState(false);

  const exams = [
    {
      id: 101,
      title: "JLPT N5 Full Mock Test",
      total_questions: 80,
      exam_start_at: "2025-12-24T10:40:00+06:00",
      duration_minutes: 120,
    },
    {
      id: 102,
      title: "JLPT N4 Grammar Practice",
      total_questions: 60,
      exam_start_at: "2025-01-10T15:30:00+06:00",
      duration_minutes: 90,
    },
    {
      id: 103,
      title: "JLPT N3 Vocabulary Drill",
      total_questions: 50,
      exam_start_at: "2024-12-01T09:00:00+06:00",
      duration_minutes: 60,
    },
  ];

  function getExamEndTime(exam: any) {
    return new Date(
      new Date(exam.exam_start_at).getTime() + exam.duration_minutes * 60 * 1000
    );
  }

  function canJoinExam(exam: any) {
    const now = new Date();
    const start = new Date(exam.exam_start_at);
    const end = getExamEndTime(exam);

    return now >= start && now <= end;
  }

  return (
    <div className="min-h-[60vh]">
      <div className="space-y-5">
        <BreadCrumb breadCrumbData={breadCrumbData} />
        <UserHeadline
          mainText={t("my_agent.title")}
          subText=""
          preText=""
        />
      </div>

      <div className="rounded-2xl border border-violet-200 bg-white mt-5">
        {/* Header (Clickable) */}
        <div
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between text-left pt-6 px-6 cursor-pointer"
        >
          <div className="flex items-center gap-4 w-[calc(100%-40px)] justify-between">
            <div className="flex size-14 items-center justify-center rounded-full bg-violet-100 text-xl font-semibold text-violet-700">
              A
            </div>

            <div className="w-[calc(100%-72px)]">
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                Akib Rahman
              </h2>
              <p className="text-sm text-gray-500">
                {t("my_agent.agent_card.role")}
              </p>
            </div>
          </div>

          <button
            className={`text-gray-400 transition-transform border border-violet-100 rounded-full size-8 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </button>
        </div>

        {/* Collapsible Content */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            open
              ? "grid-rows-[1fr] opacity-100 mt-6"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden px-6 pb-6">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  📧
                </span>
                <span>akib.agent@example.com</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  📞
                </span>
                <span>+880 1712-345678</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  📍
                </span>
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  //   onClick={removeAgent}
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
                >
                  {t("my_agent.agent_card.leave_btn")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam List */}
      {loading ? (
        <p>{t("my_agent.status.loading")}</p>
      ) : exams.length === 0 ? (
        <p className="text-gray-500">{t("my_agent.status.empty")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="group relative rounded-2xl border border-violet-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {exam.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  {t("my_agent.exam_card.exam_id")}: #{exam.id}
                </p>
              </div>

              {/* Meta Info */}
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                  {exam.total_questions}{" "}
                  {t("my_agent.exam_card.questions_suffix")}
                </span>
              </div>

              <div className="text-sm text-gray-500 space-y-1 flex justify-between flex-wrap">
                <div>
                  📅 {new Date(exam.exam_start_at).toLocaleDateString()}
                </div>
                <div>
                  ⏰{" "}
                  {new Date(exam.exam_start_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div>
                  ⏳ {exam.duration_minutes}{" "}
                  {t("my_agent.exam_card.minutes_suffix")}
                </div>
              </div>

              {/* Divider */}
              <div className="mb-4 h-px w-full bg-gray-100" />

              {/* Action */}
              <button
                disabled={!canJoinExam(exam)}
                className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  canJoinExam(exam)
                    ? "bg-violet-600 text-white hover:bg-violet-700 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {canJoinExam(exam)
                  ? t("my_agent.exam_card.join_btn")
                  : t("my_agent.exam_card.not_available_btn")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}