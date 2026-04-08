import QuestionNavigator from "./QuestionNavigator";
import ExamTimer from "./ExamTimer";

interface Props {
  title: string;
  onSelect: (index: number) => void;
  formattedTime: string;
  isWarning: boolean;
  isDanger: boolean;
}

export default function ExamRightPanel({
  onSelect,
  formattedTime,
  isWarning,
  isDanger,
}: Props) {
  return (
    <div
      className="flex flex-col gap-4 h-full overflow-y-auto"
      style={{
        width: "380px",
        minWidth: "380px",
      }}
    >
      {/* Top row — title + timer */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Question No. Sheet:
        </span>

        <ExamTimer
          formattedTime={formattedTime}
          isWarning={isWarning}
          isDanger={isDanger}
        />
      </div>

      {/* Question number grid */}
      <QuestionNavigator onSelect={onSelect} />
    </div>
  );
}
