import { Clock } from "lucide-react";

interface Props {
  formattedTime: string;
  isWarning: boolean;
  isDanger: boolean;
}

export default function ExamTimer({
  formattedTime,
  isWarning,
  isDanger,
}: Props) {
  const getBgColor = () => {
    if (isDanger) return "#dc2626"; 
    if (isWarning) return "#d97706"; 
    return "#1c3141";
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-sm text-gray-600 font-medium">Remaining Time:</span>

      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-sm font-semibold transition-colors duration-300"
        style={{ backgroundColor: getBgColor() }}
      >
        <Clock className="w-3.5 h-3.5" />
        <span>{formattedTime}</span>
      </div>
    </div>
  );
}
