import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Result | NexLearn",
  description: "Your exam result",
  robots: {
    index: false,
    follow: false,
  },
};
export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
