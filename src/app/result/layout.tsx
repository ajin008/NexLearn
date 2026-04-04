import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Result | NexLearn",
  description: "Your exam result",
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
