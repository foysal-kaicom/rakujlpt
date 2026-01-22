import type { ExamSection } from "@/types/Mocktest/MockExam.type";

interface MocktestConsentProps {
  questions: ExamSection[];
  answers: Record<string, string>;
  questionRefs: React.RefObject<Record<number, HTMLDivElement | null>>;
  handleSubmit: () => void | Promise<void>;
  getGlobalQuestionNumber: (questionId: number) => number;
  setShowConsent: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentModule: React.Dispatch<React.SetStateAction<string>>;
  setCurrentSectionIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function AnswerConsent({
  questions,
  answers,
  questionRefs,
  getGlobalQuestionNumber,
  setCurrentSectionIndex,
  handleSubmit,
  setShowConsent,
  setCurrentModule,
  // setIgnoreModuleEffect,
}: MocktestConsentProps) {
  const handleQuestionClick = (questionId: number) => {
    const targetSection = questions.find((section) =>
      section.group.some((group) =>
        group.questions.some((q) => q.id === questionId)
      )
    );
    if (!targetSection) return;

    const sectionIndex = questions
      .filter((section) => section.module_name === targetSection.module_name)
      .findIndex((section) =>
        section.group.some((group) =>
          group.questions.some((q) => q.id === questionId)
        )
      );
    if (sectionIndex === -1) return;

    // setIgnoreModuleEffect(true);
    setCurrentModule(targetSection.module_name);
    setCurrentSectionIndex(sectionIndex);
    setShowConsent(false);

    setTimeout(() => {
      const el = questionRefs.current[questionId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-purple-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="backdrop-blur-xl bg-purple-100 rounded-3xl p-5 lg:p-8 w-full max-w-3xl shadow-2xl border border-purple-400 animate-fadeIn">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-600 text-center tracking-wide">
          Confirm Submission
        </h1>

        {/* Question bubbles */}
        <div className="mt-8 bg-white backdrop-blur-lg border border-gray-100 rounded-2xl p-4 lg:p-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {questions
              .flatMap((section) => section.group)
              .flatMap((g) => g.questions)
              .map((q) => {
                const isAnswered = answers[q.id] !== undefined;

                return (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionClick(q.id)}
                    className={`size-10 rounded-full flex items-center justify-center text-sm font-semibold shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-200 hover:scale-110 cursor-pointer ${
                      isAnswered
                        ? "bg-purple-800 text-white shadow-purple-500/40"
                        : "border border-purple-500 text-purple-800"
                    }`}
                  >
                    {getGlobalQuestionNumber(q.id)}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-5 mt-8">
          <button
            onClick={() => setShowConsent(false)}
            className="px-6 py-3 rounded-xl bg-red-500/90 text-white font-semibold shadow-lg hover:bg-red-600 hover:scale-105 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-linear-to-br from-purple-400 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
