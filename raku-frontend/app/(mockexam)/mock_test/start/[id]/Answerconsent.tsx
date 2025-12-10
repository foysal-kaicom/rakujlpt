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

interface MocktestConsentProps {
  questions: ExamSection[];
  answers: Record<number, string>;
  questionRefs: React.RefObject<Record<number, HTMLElement | null>>;
  getGlobalQuestionNumber: (questionId: number) => number;
  setCurrentSectionIndex: (index: number) => void;
  handleSubmit: () => void;
  setShowConsent: (value: boolean) => void;
}

export default function AnswerConsent({
  questions,
  answers,
  questionRefs,
  getGlobalQuestionNumber,
  setCurrentSectionIndex,
  handleSubmit,
  setShowConsent,
}: MocktestConsentProps) {
  const handleQuestionClick = (questionId: number) => {
    const sectionIndex = questions.findIndex((section) =>
      section.group.some((group) =>
        group.questions.some((q) => q.id === questionId)
      )
    );

    if (sectionIndex === -1) return;
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
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
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
                    className={`size-10 rounded-full flex items-center justify-center text-sm font-semibold shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-200 hover:scale-110 
                  ${
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
            className="px-6 py-3 rounded-xl bg-red-500/90 text-white font-semibold shadow-lg hover:bg-red-600 hover:scale-105 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
