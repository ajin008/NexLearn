import { useMemo } from "react";
import { useExamStore } from "@/src/store/examStore";

interface Props {
  onSelect: (index: number) => void;
}

type QuestionStatus =
  | "answered"
  | "not-answered"
  | "marked"
  | "answered-marked"
  | "default";

export default function QuestionNavigator({ onSelect }: Props) {
  const questions = useExamStore((s) => s.questions);
  const answers = useExamStore((s) => s.answers);
  const currentIndex = useExamStore((s) => s.currentIndex);
  const markedForReview = useExamStore((s) => s.markedForReview);
  const visitedQuestions = useExamStore((s) => s.visitedQuestions);

  const getStatus = useMemo(() => {
    return (questionId: number): QuestionStatus => {
      const answer = answers.find((a) => a.question_id === questionId);
      const isAnswered =
        answer?.selected_option_id !== null &&
        answer?.selected_option_id !== undefined;
      const isMarked = markedForReview.includes(questionId);
      const isVisited = visitedQuestions.includes(questionId);

      if (isAnswered && isMarked) return "answered-marked";
      if (isMarked) return "marked";
      if (isAnswered) return "answered";
      if (isVisited && !isAnswered) return "not-answered";
      return "default";
    };
  }, [answers, markedForReview, visitedQuestions]);

  const getStyle = (status: QuestionStatus, isCurrent: boolean) => {
    if (isCurrent)
      return {
        backgroundColor: "#1c3141",
        color: "white",
        border: "2px solid #1c3141",
      };

    switch (status) {
      case "answered":
        return { backgroundColor: "#16a34a", color: "white", border: "none" };
      case "not-answered":
        return { backgroundColor: "#ef4444", color: "white", border: "none" };
      case "marked":
        return { backgroundColor: "#7c3aed", color: "white", border: "none" };
      case "answered-marked":
        return {
          backgroundColor: "#7c3aed",
          color: "white",
          border: "2px solid #16a34a",
        };
      default:
        return {
          backgroundColor: "white",
          color: "#374151",
          border: "1px solid #d1d5db",
        };
    }
  };

  return (
    <div>
      {/* Grid */}
      <div className="grid grid-cols-10 gap-1.5">
        {questions.map((q, index) => {
          const status = getStatus(q.question_id);
          const isCurrent = index === currentIndex;

          return (
            <button
              key={`question-${index}`}
              onClick={() => onSelect(index)}
              className="w-8 h-8 rounded text-xs font-medium transition-all duration-150 hover:opacity-80 cursor-pointer"
              style={getStyle(status, isCurrent)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {[
          { color: "#16a34a", label: "Attended" },
          { color: "#ef4444", label: "Not Attended" },
          { color: "#7c3aed", label: "Marked For Review" },
          {
            color: "#7c3aed",
            label: "Answered and Marked For Review",
            border: "#16a34a",
          },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm shrink-0"
              style={{
                backgroundColor: item.color,
                border: item.border ? `2px solid ${item.border}` : "none",
              }}
            />
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
