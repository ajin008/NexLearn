import { useCallback } from "react";
import QuestionCard from "./QuestionCard";
import type { Question } from "@/src/store/examStore";

interface Props {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId: number | null;
  isMarked: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelectOption: (questionId: number, optionId: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onMarkForReview: (questionId: number) => void;
  onSubmit: () => void;
}

export default function ExamLeftPanel({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  isMarked,
  isFirst,
  isLast,
  onSelectOption,
  onNext,
  onPrevious,
  onMarkForReview,
  onSubmit,
}: Props) {
  const handleMark = useCallback(() => {
    onMarkForReview(question.question_id);
  }, [question.question_id, onMarkForReview]);

  return (
    <div className="flex flex-col h-full   rounded-2xl p-6">
      {/* Question card — grows to fill space */}
      <div className="flex-1 overflow-y-auto pr-2">
        <QuestionCard
          question={question}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          selectedOptionId={selectedOptionId}
          onSelectOption={onSelectOption}
        />
      </div>

      {/* Bottom action buttons — always visible */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
        {/* Mark for Review */}
        <button
          onClick={handleMark}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium transition"
          style={{
            backgroundColor: isMarked ? "#7c3aed" : "#f3e8ff",
            color: isMarked ? "white" : "#7c3aed",
          }}
        >
          {isMarked ? "Marked ✓" : "Mark for review"}
        </button>

        {/* Previous */}
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Next or Submit */}
        {isLast ? (
          <button
            onClick={onSubmit}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white transition"
            style={{ backgroundColor: "#1c3141" }}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white transition"
            style={{ backgroundColor: "#1c3141" }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
