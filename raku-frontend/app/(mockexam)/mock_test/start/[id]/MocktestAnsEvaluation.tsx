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
  group_type: "audio" | "passage" | "image" | null;
  content?: string | null;
  questions: Question[];
}

interface Question {
  question_id: number;
  group_type: string;
  question: string;
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
  const [openSections, setOpenSections] = useState<Set<number>>(new Set()); // Track open sections

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

  const toggleSection = (id: number) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
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

  let globalQuestionIndex = 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="bg-white border border-purple-400 p-3 rounded-xl my-5 flex justify-between sticky top-0 z-10">
          <button
            onClick={() => setShowAnsEval(false)}
            className="bg-red-600 text-white px-3 py-1 rounded-md"
          >
            Close
          </button>
          <button
            onClick={() => router.back()}
            className="bg-purple-600 text-white px-3 py-1 rounded-md"
          >
            Back
          </button>
        </div>

        {/* SECTIONS */}
        {sections.map((section) => {
          const isOpen = openSections.has(section.section_id);
          return (
            <div
              key={section.section_id}
              className="bg-purple-50 rounded-xl outline outline-purple-200 mb-4"
            >
              {/* SECTION HEADER */}
              <div
                className={`p-4 md:p-6 flex justify-between items-center bg-purple-600  cursor-pointer ${isOpen ? "rounded-t-xl" : "rounded-xl"}`}
                onClick={() => toggleSection(section.section_id)}
              >
                <h2 className="text-xl font-bold text-white">
                  {section.section_name}{" "}
                  <span className="font-medium text-base">
                    ({section.questions.length})
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
                <div className=" space-y-1">
                  {section.questions.map((q) => (
                    <div key={q.question_id} className="bg-white p-4 md:p-8">
                      {/* AUDIO */}{" "}
                      {q.group_type === "audio" && q.question && (
                        <audio controls className="w-full mb-6">
                          {" "}
                          <source src={q.question} />{" "}
                        </audio>
                      )}{" "}
                      {/* PASSAGE */}{" "}
                      {q.group_type !== "audio" && q.question && (
                        <div
                          className="p-4 bg-purple-50 rounded-md mb-8 leading-8"
                          dangerouslySetInnerHTML={{ __html: q.question }}
                        />
                      )}
                      {/* QUESTION */}
                      <div className="flex gap-2 text-lg mb-3">
                        {q.proficiency_level === "N5" && (
                          <FaStar className="text-purple-700 mt-1" />
                        )}
                        <span className="font-semibold">
                          Q{++globalQuestionIndex}:
                        </span>
                        <div dangerouslySetInnerHTML={{ __html: q.question }} />
                      </div>
                      {/* OPTIONS */}
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
                                      : "border-transparent"
                                }`}
                              >
                                {/* ICON */}
                                <div className="size-6 flex items-center justify-center">
                                  {isCorrect && (
                                    <FaCheck className="text-green-600" />
                                  )}
                                  {isWrong && (
                                    <span className="text-red-600 font-bold">
                                      ✕
                                    </span>
                                  )}
                                </div>

                                {/* OPTION TEXT */}
                                <div
                                  className={`${
                                    isCorrect
                                      ? "text-green-800"
                                      : isWrong
                                        ? "text-red-800"
                                        : ""
                                  }`}
                                  dangerouslySetInnerHTML={{ __html: option }}
                                />
                              </div>
                            );
                          })}
                      </div>
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
