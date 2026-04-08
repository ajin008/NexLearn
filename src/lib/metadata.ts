// src/lib/metadata.ts

import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL(""),

  title: {
    default: "MCQ Quiz App | Practice & Test Your Knowledge",
    template: "%s | MCQ Quiz App",
  },

  description:
    "Practice multiple choice questions (MCQs), test your knowledge, and improve your skills with our interactive quiz platform.",

  keywords: [
    "MCQ quiz",
    "online test",
    "quiz app",
    "practice questions",
    "exam preparation",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "MCQ Quiz App",
    description:
      "Take MCQ tests and improve your knowledge with instant results.",
    url: "",
    siteName: "MCQ Quiz App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MCQ Quiz App",
    description: "Practice MCQs and track your performance easily.",
    images: ["/og-image.png"],
  },
};
