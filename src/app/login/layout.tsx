import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | NexLearn",
  description: "Sign in to NexLearn - Futuristic Learning Platform",
  robots: {
    index: false,
    follow: false,
  },
};
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
