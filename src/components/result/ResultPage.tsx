"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useExamStore } from "@/src/store/examStore";
import { useAuth } from "@/src/hooks/useAuth";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";
import Navbar from "@/src/components/ui/Navbar";

export default function ResultPage() {
  const router = useRouter();
  useAuthGuard();

  const { handleLogout } = useAuth();
  const result = useExamStore((s) => s.result);
  const resetExam = useExamStore((s) => s.resetExam);

  useEffect(() => {
    if (!result) router.push("/");
  }, [result, router]);

  if (!result) return null;

  const handleDone = () => {
    resetExam();
    router.push("/");
  };

  const total = result.correct + result.wrong + result.not_attended;

  const stats = [
    {
      label: "Total Questions",
      value: String(total).padStart(3, "0"),
      iconBg: "#f59e0b",
      icon: "📋",
    },
    {
      label: "Correct Answers",
      value: String(result.correct).padStart(3, "0"),
      iconBg: "#16a34a",
      icon: "✓",
    },
    {
      label: "Incorrect Answers",
      value: String(result.wrong).padStart(3, "0"),
      iconBg: "#dc2626",
      icon: "✗",
    },
    {
      label: "Not Attended Questions",
      value: String(result.not_attended).padStart(3, "0"),
      iconBg: "#6b7280",
      icon: "○",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onLogout={handleLogout} />

      <main className="flex-1 flex items-center justify-center px-4">
        <div
          className="bg-white rounded-2xl shadow-md w-full p-8"
          style={{ maxWidth: "360px" }}
        >
          {/* Score card */}
          <div
            className="rounded-xl p-6 text-center text-white mb-6"
            style={{
              background: "linear-gradient(135deg, #1c3141 0%, #2b6f8a 100%)",
            }}
          >
            <p className="text-xs font-medium opacity-70 mb-2 tracking-wide uppercase">
              Marks Obtained:
            </p>
            <p className="text-5xl font-bold tracking-tight">
              {String(result.score).padStart(3, "0")} /{" "}
              {String(total).padStart(3, "0")}
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-3 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between"
              >
                {/* Left — icon + label */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: stat.iconBg }}
                  >
                    {stat.icon}
                  </div>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>

                {/* Right — value */}
                <span className="text-sm font-bold text-gray-800">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Done button */}
          <button
            onClick={handleDone}
            className="w-full py-3 rounded-xl text-white text-sm font-semibold transition hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #1c3141 0%, #2b4b63 100%)",
            }}
          >
            Done
          </button>
        </div>
      </main>
    </div>
  );
}
