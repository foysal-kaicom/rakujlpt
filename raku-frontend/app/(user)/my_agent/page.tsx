"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Calendar, Gift, Info } from "lucide-react";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";
import Loader from "@/components/Loader";

type Exam = {
  id: number;
  title: string;
  total_questions: number;
  created_at: string;
};

type Notice = {
  id: number;
  title: string;
  message: string;
  type: "promotional" | "reminder" | "exam_schedule" | "general";
  agent_id: number;
  created_at: string;
};

// Notice Row Component with expandable message
function NoticeRow({
  notice,
  style,
  Icon,
  getNoticeTypeLabel,
  formatNoticeDate,
}: {
  notice: Notice;
  style: any;
  Icon: any;
  getNoticeTypeLabel: (type: Notice["type"]) => string;
  formatNoticeDate: (date: string) => string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full ${style.bg} px-3 py-1.5 text-xs font-medium ${style.text}`}
        >
          <Icon className="h-3.5 w-3.5" />
          {getNoticeTypeLabel(notice.type)}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-semibold text-gray-900">
          {notice.title}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-600">
          <div className={isExpanded ? "" : "line-clamp-1"}>
            {notice.message}
          </div>
          {notice.message.length > 60 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`mt-1 text-xs font-semibold ${style.text} hover:underline cursor-pointer`}
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {formatNoticeDate(notice.created_at)}
        </div>
        <div className="text-xs text-gray-400">
          {new Date(notice.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </td>
    </tr>
  );
}

export default function MyAgent() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const breadCrumbData = [
    { name: t("my_agent.breadcrumbs.dashboard"), to: "/dashboard" },
    { name: t("my_agent.breadcrumbs.my_agent"), to: "/my_agent" },
  ];

  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [open, setOpen] = useState(false);
  const [agentData, setAgentData] = useState<any>([]);

  const fetchAgentData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/candidate/agent`);
      if (response?.data?.success) {
        setAgentData(response.data.data);
      }
    } catch (error: any) {
      toast.error(t("contact.error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentData();
  }, [t]);

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

  // Helper functions for notices
  const getNoticeStyle = (type: Notice["type"]) => {
    const styles = {
      promotional: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-200",
        icon: Gift,
      },
      reminder: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-200",
        icon: Bell,
      },
      exam_schedule: {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
        icon: Calendar,
      },
      general: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        icon: Info,
      },
    };
    return styles[type] || styles.general;
  };

  const formatNoticeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const getNoticeTypeLabel = (type: Notice["type"]) => {
    const labels = {
      promotional: "Promotional",
      reminder: "Reminder",
      exam_schedule: "Exam Schedule",
      general: "General",
    };
    return labels[type] || type;
  };

  return (
    <>
      {loading && <Loader />}
      <div className="min-h-[60vh]">
        <div className="space-y-5">
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <UserHeadline mainText={t("my_agent.title")} subText="" preText="" />
        </div>

        <div className="rounded-2xl border border-violet-200 bg-white mt-5">
          {/* Header (Clickable) */}
          <div
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between text-left pt-6 px-6 cursor-pointer"
          >
            <div className="flex items-center gap-4 w-[calc(100%-40px)] justify-between">
              <div className="flex size-14 items-center justify-center rounded-full bg-violet-100 text-xl font-semibold text-violet-700">
                {agentData?.agent?.name?.charAt(0) || "A"}
              </div>

              <div className="w-[calc(100%-72px)]">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {agentData?.agent?.name || "Agent Name"}
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
                  <span>{agentData?.agent?.email || ""}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                    📞
                  </span>
                  <span>{agentData?.agent?.phone || ""}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                    📍
                  </span>
                  <span>
                    {agentData?.agent?.location || "Dhaka, Bangladesh"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exam List */}
        {/* {loading ? (
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
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {exam.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    {t("my_agent.exam_card.exam_id")}: #{exam.id}
                  </p>
                </div>

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

                <div className="mb-4 h-px w-full bg-gray-100" />

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
        )} */}

        <div className="mt-8">
          {!loading && agentData?.notice && agentData.notice.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xl font-bold text-gray-900">
                Agent Notices
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Important updates and announcements from your agent
              </p>
            </div>
          )}

          {!loading && agentData?.notice && agentData.notice.length === 0 && (
            <div className="rounded-2xl border border-violet-200 bg-white p-8 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Info className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No notices yet
              </h3>
              <p className="text-sm text-gray-500">
                Your agent hasn't posted any notices at this time
              </p>
            </div>
          )}

          {!loading && agentData?.notice && agentData.notice.length > 0 && (
            <div className="rounded-2xl border border-violet-200 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-violet-50 border-b border-violet-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {agentData.notice.map((notice: Notice) => {
                      const style = getNoticeStyle(notice.type);
                      const Icon = style.icon;

                      return (
                        <NoticeRow
                          key={notice.id}
                          notice={notice}
                          style={style}
                          Icon={Icon}
                          getNoticeTypeLabel={getNoticeTypeLabel}
                          formatNoticeDate={formatNoticeDate}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}