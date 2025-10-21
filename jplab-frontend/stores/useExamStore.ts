// stores/useExamStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExamState {

  // Answers
  answers: Record<string, string>;
  setAnswer: (questionId: number, value: string) => void;
  clearAnswers: () => void;

  // Timer
  timeRemaining: number;
  setTimeRemaining: (time: number) => void;
  decrementTime: () => void;
  resetTime: (initial: number) => void;

  // Exam control
  examStarted: boolean;
  startExam: () => void;
  stopExam: () => void;

  // Reset everything after submission
  resetExam: () => void;
}

export const useExamStore = create<ExamState>()(
  // persist(
    (set) => ({

      // Answers
      answers: {},
      setAnswer: (questionId, value) =>
        set((state) => ({
          answers: { ...state.answers, [questionId.toString()]: value },
        })),
      clearAnswers: () => set({ answers: {} }),

      // Timer
      timeRemaining: 50 * 60,
      setTimeRemaining: (time) => set({ timeRemaining: time }),
      decrementTime: () =>
        set((state) => ({
          timeRemaining: state.timeRemaining > 0 ? state.timeRemaining - 1 : 0,
        })),
      resetTime: (initial) => set({ timeRemaining: initial }),

      // Exam control
      examStarted: false,
      startExam: () => set({ examStarted: true }),
      stopExam: () => set({ examStarted: false }),

      // Full reset (for submission or finishing exam)
      resetExam: () =>
        set({
          answers: {},
          timeRemaining: 50 * 60,
          examStarted: false,
        }),
    }),
  //   {
  //     name: "exam-storage",
  //     partialize: (state) => ({
  //       answers: state.answers,
  //       timeRemaining: state.timeRemaining,
  //       examStarted: state.examStarted,
  //     }),
  //   }
  // )
);
