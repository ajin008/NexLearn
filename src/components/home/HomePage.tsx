"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useExam } from "@/src/hooks/useExam";
import Navbar from "@/src/components/ui/Navbar";
import ExamCard from "@/src/components/exam/ExamCard";

export default function HomePage() {
  const { handleLogout } = useAuth();
  const { meta, loading, handleStart } = useExam();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onLogout={handleLogout} />
      <ExamCard meta={meta} loading={loading} onStart={handleStart} />
    </div>
  );
}
