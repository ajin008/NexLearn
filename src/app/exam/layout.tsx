import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCQ Exam | NexLearn",
  description: "Ancient Indian History MCQ Test",

  robots: {
    index: false,
    follow: false,
  },
};

export default function McqLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col">{children}</div>;
}
