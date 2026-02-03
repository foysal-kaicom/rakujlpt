import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaStar, FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axiosInstance from "@/utils/axios";

export interface AnswerPayload {
  id: number;
  answer: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Section[];
}

interface Section {
  section_id: number;
  section_name: string;
  groups: Group[];
}

interface Group {
  group_id: number;
  group_type: string;
  type: string;
  content: string | null;
  questions: Question[];
}

interface Question {
  question_id: number;
  group_type: "audio" | "passage" | "image" | null;
  content?: string | null;
  question: string;
  question_type: string;
  options: string | Record<string, string>;
  correct_answer: string;
  user_answer: number | null;
  proficiency_level?: string;
}

interface AnsEvalProps {
  setShowAnsEval: (value: boolean) => void;
  answerPayload: AnswerPayload[];
}

export default function MocktestAnsEvaluation({
  setShowAnsEval,
  answerPayload,
}: AnsEvalProps) {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const previewAnswer = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post<ApiResponse>(
        "/mock-test/preview-answers",
        { answers: answerPayload },
      );
      setSections(res.data.data);
      // Open first section by default
      if (res.data.data.length > 0) {
        setOpenSections(new Set([res.data.data[0].section_id]));
      }
    } catch (err) {
      console.error("Preview answer failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    previewAnswer();
  }, []);

  const parseOptions = (
    options: string | Record<string, string>,
  ): Record<string, string> => {
    if (typeof options === "string") {
      try {
        return JSON.parse(options);
      } catch {
        return {};
      }
    }
    return options;
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (sections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        You have not answered any question.
      </div>
    );
  }

  const questionIndexMap = new Map<number, number>();

  let counter = 0;

  sections.forEach((section) => {
    section.groups.forEach((group) => {
      group.questions.forEach((q) => {
        counter += 1;
        questionIndexMap.set(q.question_id, counter);
      });
    });
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="sticky top-0 z-20 backdrop-blur bg-white/80 border border-purple-200 rounded-2xl my-5 p-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* LEFT ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setOpenSections(new Set(sections.map((s) => s.section_id)))
                }
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 active:scale-95 transition cursor-pointer"
              >
                Expand All
              </button>

              <button
                onClick={() => setOpenSections(new Set())}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 active:scale-95 transition cursor-pointer"
              >
                Collapse All
              </button>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowAnsEval(false)}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700 active:scale-95 transition cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700 active:scale-95 transition cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* SECTIONS */}
        {sections.map((section) => {
          const isOpen = openSections.has(section.section_id);
          return (
            <div
              key={section.section_id}
              className="bg-purple-50 rounded-xl outline outline-purple-200 mb-4 shadow"
            >
              {/* SECTION HEADER */}
              <div
                className={`p-4 md:p-6 flex justify-between items-center bg-purple-600 cursor-pointer ${
                  isOpen ? "rounded-t-xl" : "rounded-xl"
                }`}
                onClick={() => setOpenSections(new Set([section.section_id]))} // Only one open
              >
                <h2 className="text-xl font-bold text-white">
                  {section.section_name}{" "}
                  <span className="font-medium text-base">
                    (
                    {section.groups.reduce(
                      (total, group) => total + group.questions.length,
                      0,
                    )}
                    )
                  </span>
                </h2>
                {isOpen ? (
                  <FaChevronUp className="text-white" />
                ) : (
                  <FaChevronDown className="text-white" />
                )}
              </div>

              {/* SECTION CONTENT */}
              {isOpen && (
                <div className="space-y-1">
                  {section.groups.map((group) => (
                    <div
                      key={group.group_id}
                      className="bg-purple-100 p-4 md:p-6 space-y-2"
                    >
                      {/* GROUP CONTENT */}
                      {group.group_type === "audio" && group.content && (
                        <audio
                          controls
                          className="w-full mb-4 bg-white p-2 rounded-full"
                        >
                          <source src={group.content} />
                        </audio>
                      )}
                      {group.group_type !== "audio" && group.content && (
                        <div
                          className="p-4 bg-white rounded-md mb-4 leading-7"
                          dangerouslySetInnerHTML={{ __html: group.content }}
                        />
                      )}

                      {/* QUESTIONS */}
                      {group.questions.map((q) => (
                        <div
                          key={q.question_id}
                          className="bg-white p-4 md:p-6 rounded-md"
                        >
                          <div className="flex gap-2 text-lg mb-3">
                            {q.proficiency_level === "N5" && (
                              <FaStar className="text-purple-700 mt-1" />
                            )}
                            <span className="font-semibold">
                              Q{questionIndexMap.get(q.question_id)}:
                            </span>

                            {q.question_type === "text" && (
                              <div
                                dangerouslySetInnerHTML={{ __html: q.question }}
                                className="mb-3"
                              />
                            )}
                            {q.question_type === "image" && (
                              <div className="w-full mb-3">
                                <img
                                  src={q.question}
                                  alt=""
                                  className="sm:max-w-[220px] md:max-w-[250px] mx-auto"
                                />
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {Object.entries(parseOptions(q.options))
                              .filter(
                                ([_, option]) => option && option.trim() !== "",
                              )
                              .map(([key, option]) => {
                                const isUserSelected =
                                  Number(key) === q.user_answer;
                                const isCorrect = key === q.correct_answer;
                                const isWrong = isUserSelected && !isCorrect;

                                return (
                                  <div
                                    key={key}
                                    className={`flex items-center gap-3 p-2 rounded-md font-medium border ${
                                      isCorrect
                                        ? "bg-green-100 border-green-400"
                                        : isWrong
                                          ? "bg-red-100 border-red-400"
                                          : "bg-purple-50 border-purple-300"
                                    }`}
                                  >
                                    <div className="size-6 flex items-center justify-center border rounded-full bg-white border-gray-500">
                                      {isCorrect && (
                                        <FaCheck className="text-green-600" />
                                      )}
                                      {isWrong && (
                                        <span className="text-red-600 font-bold">
                                          ✕
                                        </span>
                                      )}
                                    </div>
                                    <div
                                      className={`w-[calc(100%-36px)] ${isCorrect ? "text-green-800" : isWrong ? "text-red-800" : ""}`}
                                      dangerouslySetInnerHTML={{
                                        __html: option,
                                      }}
                                    />
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
