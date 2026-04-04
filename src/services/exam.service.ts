import api from "@/src/lib/axios";
import type { ExamMeta, Question, ExamResult } from "@/src/store/examStore";

interface ListQuestionsResponse {
  success: boolean;
  questions_count: number;
  total_marks: number;
  total_time: number;
  time_for_each_question: number;
  mark_per_each_answer: number;
  instruction: string;
  questions: Question[];
}

interface SubmitAnswersResponse {
  success: boolean;
  exam_history_id: string;
  score: number;
  correct: number;
  wrong: number;
  not_attended: number;
  submitted_at: string;
  details: unknown[];
}

interface SubmitPayload {
  question_id: number;
  selected_option_id: number | null;
}

export const getQuestions = async (): Promise<ListQuestionsResponse> => {
  const res = await api.get<ListQuestionsResponse>("/question/list");
  return res.data;
};

export const submitAnswers = async (
  answers: SubmitPayload[]
): Promise<SubmitAnswersResponse> => {
  const formData = new FormData();

  formData.append("answers", JSON.stringify(answers));

  const res = await api.post<SubmitAnswersResponse>(
    "/answers/submit",
    formData
  );
  return res.data;
};
