"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useExamStore } from "@/src/store/examStore";
import { useExam } from "@/src/hooks/useExam";
import { useTimer } from "@/src/hooks/useTimer";
import { useAuth } from "@/src/hooks/useAuth";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";
import Navbar from "@/src/components/ui/Navbar";
import ExamLeftPanel from "./ExamLeftPanel";
import ExamRightPanel from "./ExamRightPanel";

export default function McqPage() {
  const router = useRouter();
  useAuthGuard();

  const { handleLogout } = useAuth();

  const {
    questions,
    currentIndex,
    markedForReview,
    handleNext,
    handlePrevious,
    handleGoToQuestion,
    handleSelectOption,
    handleMarkForReview,
    handleSubmit,
    loading,
  } = useExam();

  const meta = useExamStore((s) => s.meta);
  const answers = useExamStore((s) => s.answers);
  const markVisited = useExamStore((s) => s.markVisited);

  // ── Safety check ──────────────────────────────────────
  useEffect(() => {
    if (!loading && questions.length === 0) {
      router.push("/");
    }
  }, [questions.length, loading, router]);

  // ── Current question data ─────────────────────────────
  const currentQuestion = questions[currentIndex];

  // ── Mark current question as visited ─────────────────
  useEffect(() => {
    if (currentQuestion) {
      markVisited(currentQuestion.question_id);
    }
  }, [currentIndex, currentQuestion, markVisited]);

  // ── Auto submit when time is up ───────────────────────
  const handleTimeUp = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const { formattedTime, isWarning, isDanger } = useTimer({
    onTimeUp: handleTimeUp,
  });

  // ── Current answer  fresh from store ─────────────────
  const currentAnswer = answers.find(
    (a) => a.question_id === currentQuestion?.question_id
  );
  const isMarked = markedForReview.includes(currentQuestion?.question_id);

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-[#f4fcff] flex flex-col">
      {/* Navbar */}
      <Navbar onLogout={handleLogout} />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex m-4 rounded-2xl overflow-hidden">
          {/* LEFT PANEL */}
          <div className="flex flex-col flex-1 p-6">
            {/* Title row */}
            <div className="flex items-center justify-between mb-4 pb-3">
              <span className="text-sm font-semibold text-gray-700">
                {meta ? "Ancient Indian History MCQ" : "MCQ Exam"}
              </span>
              <span className="text-sm text-gray-600 bg-white border border-gray-300 px-2 py-1 rounded-md">
                {String(currentIndex + 1).padStart(2, "0")}/
                {String(questions.length).padStart(2, "0")}
              </span>
            </div>

            <ExamLeftPanel
              question={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              selectedOptionId={currentAnswer?.selected_option_id ?? null}
              isMarked={isMarked}
              isFirst={currentIndex === 0}
              isLast={currentIndex === questions.length - 1}
              onSelectOption={handleSelectOption}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onMarkForReview={handleMarkForReview}
              onSubmit={handleSubmit}
            />
          </div>

          {/* RIGHT PANEL */}
          <div className="p-6">
            <ExamRightPanel
              title="Ancient Indian History MCQ"
              onSelect={handleGoToQuestion}
              formattedTime={formattedTime}
              isWarning={isWarning}
              isDanger={isDanger}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
