import { create } from "zustand";

export interface Option {
  id: number;
  option: string;
  image?: string | null;
}

export interface Question {
  question_id: number;
  number: number;
  question: string;
  question_image?: string | null;
  comprehension_paragraph?: string | null;
  comprehension?: string | null;
  is_comprehension?: boolean;
  options: Option[];
}

export interface ExamMeta {
  questions_count: number;
  total_marks: number;
  total_time: number;
  time_for_each_question: number;
  mark_per_each_answer: number;
  instruction: string;
}

export interface Answer {
  question_id: number;
  selected_option_id: number | null;
}

export interface ExamResult {
  exam_history_id: string;
  score: number;
  correct: number;
  wrong: number;
  not_attended: number;
  submitted_at: string;
}

interface ExamState {
  meta: ExamMeta | null;
  questions: Question[];
  answers: Answer[];
  currentIndex: number;
  markedForReview: number[];
  visitedQuestions: number[];
  result: ExamResult | null;
  remainingSeconds: number;

  // Actions
  setExamData: (data: { meta: ExamMeta; questions: Question[] }) => void;
  setAnswer: (questionId: number, optionId: number | null) => void;
  setCurrentIndex: (index: number) => void;
  toggleMarkForReview: (questionId: number) => void;
  markVisited: (questionId: number) => void;
  setResult: (result: ExamResult) => void;
  resetExam: () => void;
  initTimer: (totalMinutes: number) => void;
  tickTimer: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  meta: null,
  questions: [],
  answers: [],
  currentIndex: 0,
  markedForReview: [],
  visitedQuestions: [],
  result: null,
  remainingSeconds: 0,

  setExamData: ({ meta, questions }) =>
    set({
      meta,
      questions,
      answers: questions.map((q) => ({
        question_id: q.question_id,
        selected_option_id: null,
      })),
      currentIndex: 0,
      markedForReview: [],
      visitedQuestions: [],
      result: null,
    }),

  setAnswer: (questionId, optionId) =>
    set((state) => ({
      answers: state.answers.map((a) =>
        a.question_id === questionId
          ? { ...a, selected_option_id: optionId }
          : a
      ),
    })),

  setCurrentIndex: (index) => set({ currentIndex: index }),

  toggleMarkForReview: (questionId) =>
    set((state) => ({
      markedForReview: state.markedForReview.includes(questionId)
        ? state.markedForReview.filter((id) => id !== questionId)
        : [...state.markedForReview, questionId],
    })),

  markVisited: (questionId) =>
    set((state) => ({
      visitedQuestions: state.visitedQuestions.includes(questionId)
        ? state.visitedQuestions
        : [...state.visitedQuestions, questionId],
    })),

  setResult: (result) => set({ result }),

  resetExam: () =>
    set({
      meta: null,
      questions: [],
      answers: [],
      currentIndex: 0,
      markedForReview: [],
      visitedQuestions: [],
      result: null,
      remainingSeconds: 0,
    }),

  initTimer: (totalMinutes) => set({ remainingSeconds: totalMinutes * 60 }),

  tickTimer: () =>
    set((state) => ({
      remainingSeconds: Math.max(0, state.remainingSeconds - 1),
    })),
}));
