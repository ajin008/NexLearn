import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getQuestions, submitAnswers } from "@/src/services/exam.service";
import { useExamStore } from "@/src/store/examStore";

export function useExam() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const setExamData = useExamStore((s) => s.setExamData);
  const meta = useExamStore((s) => s.meta);
  const questions = useExamStore((s) => s.questions);
  const answers = useExamStore((s) => s.answers);
  const currentIndex = useExamStore((s) => s.currentIndex);
  const markedForReview = useExamStore((s) => s.markedForReview);
  const setAnswer = useExamStore((s) => s.setAnswer);
  const setCurrentIndex = useExamStore((s) => s.setCurrentIndex);
  const toggleMarkForReview = useExamStore((s) => s.toggleMarkForReview);
  const setResult = useExamStore((s) => s.setResult);

  // ── Fetch questions on mount ──────────────────────────
  const loadQuestions = useCallback(async () => {
    if (questions.length > 0) return;

    try {
      setLoading(true);
      const res = await getQuestions();

      if (res.success) {
        setExamData({
          meta: {
            questions_count: res.questions_count,
            total_marks: res.total_marks,
            total_time: res.total_time,
            time_for_each_question: res.time_for_each_question,
            mark_per_each_answer: res.mark_per_each_answer,
            instruction: res.instruction,
          },
          questions: res.questions,
        });
      }
      console.log("fetched questions:", res.questions);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [setExamData, router, questions.length]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  // ── Navigation ────────────────────────────────────────
  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, questions.length, setCurrentIndex]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, setCurrentIndex]);

  const handleGoToQuestion = useCallback(
    (index: number) => {
      setCurrentIndex(index);
    },
    [setCurrentIndex]
  );

  // ── Answer selection ──────────────────────────────────
  const handleSelectOption = useCallback(
    (questionId: number, optionId: number) => {
      console.log("selecting option:", questionId, optionId);
      setAnswer(questionId, optionId);
    },
    [setAnswer]
  );

  // ── Mark for review ───────────────────────────────────
  const handleMarkForReview = useCallback(
    (questionId: number) => {
      toggleMarkForReview(questionId);
    },
    [toggleMarkForReview]
  );

  // ── Submit ────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      console.log("submitting answers:", answers);
      const res = await submitAnswers(answers);
      if (res.success) {
        setResult({
          exam_history_id: res.exam_history_id,
          score: res.score,
          correct: res.correct,
          wrong: res.wrong,
          not_attended: res.not_attended,
          submitted_at: res.submitted_at,
        });
        router.push("/result");
      } else {
        toast.error("Submission failed. Try again.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [answers, setResult, router]);

  // ── Start exam ────────────────────────────────────────
  const handleStart = useCallback(() => {
    router.push("/exam");
  }, [router]);

  return {
    // State
    meta,
    questions,
    answers,
    currentIndex,
    markedForReview,
    loading,

    // Actions
    loadQuestions,
    handleStart,
    handleNext,
    handlePrevious,
    handleGoToQuestion,
    handleSelectOption,
    handleMarkForReview,
    handleSubmit,
  };
}
