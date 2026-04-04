// useTimer.ts
import { useEffect, useRef } from "react";
import { useExamStore } from "@/src/store/examStore";

interface UseTimerProps {
  onTimeUp: () => void;
}

export function useTimer({ onTimeUp }: UseTimerProps) {
  const remainingSeconds = useExamStore((s) => s.remainingSeconds);
  const initTimer = useExamStore((s) => s.initTimer);
  const meta = useExamStore((s) => s.meta);
  const onTimeUpRef = useRef(onTimeUp);
  // eslint-disable-next-line react-hooks/refs
  onTimeUpRef.current = onTimeUp;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!meta?.total_time) return;

    // Always restart timer when this mounts
    initTimer(meta.total_time);

    intervalRef.current = setInterval(() => {
      const current = useExamStore.getState().remainingSeconds;

      if (current <= 1) {
        clearInterval(intervalRef.current!);
        useExamStore.getState().tickTimer();
        onTimeUpRef.current();
        return;
      }
      useExamStore.getState().tickTimer();
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return {
    remainingSeconds,
    formattedTime: formatTime(remainingSeconds),
    isWarning: remainingSeconds <= 300,
    isDanger: remainingSeconds <= 60,
  };
}
