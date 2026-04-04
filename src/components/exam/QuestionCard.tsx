"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, ChevronRight } from "lucide-react";
import type { Question, Option } from "@/src/store/examStore";
import ComprehensionModal from "./ComprehensionModal";
import { ImageUp } from "lucide-react";

interface Props {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId: number | null;
  onSelectOption: (questionId: number, optionId: number) => void;
}

export default function QuestionCard({
  question,
  currentIndex,
  selectedOptionId,
  onSelectOption,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const optionLabels = ["A", "B", "C", "D"];

  console.log("Rendering questionCard:", question.comprehension_paragraph);
  const comprehension =
    question.comprehension || question.comprehension_paragraph;

  console.log("Rendering questionCard (comprehension):", comprehension);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#ffffff] shadow-sm rounded-2xl p-6 flex flex-col gap-4">
        {comprehension && (
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: "#2f6f8a" }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Read Comprehensive Paragraph
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Comprehension Modal */}
        {showModal && comprehension && (
          <ComprehensionModal
            paragraph={comprehension}
            onClose={() => setShowModal(false)}
          />
        )}

        {/* Question text */}
        <p className="text-sm font-medium text-gray-800 leading-relaxed">
          {currentIndex + 1}. {question.question}
        </p>

        {/* Question image */}
        {question.question_image ? (
          <div className="rounded-lg overflow-hidden w-fit">
            <Image
              src={question.question_image}
              alt="Question"
              width={200}
              height={150}
              className="object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        ) : (
          <div className="w-50 h-37.5 rounded-lg bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400">
            <ImageUp className="w-10 h-10" />
            <p className="text-xs">No image</p>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="mt-2">
        <p className="text-xs text-gray-400 mb-2">Choose the answer:</p>
        <div className="flex flex-col gap-2">
          {question.options.map((option: Option, i: number) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                onClick={() => onSelectOption(question.question_id, option.id)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg border text-sm text-left transition-all"
                style={{
                  borderColor: isSelected ? "#2f6f8a" : "#e5e7eb",
                  backgroundColor: isSelected ? "#f0f7fa" : "white",
                  color: "#374151",
                }}
              >
                <span>
                  <span className="font-medium mr-2">{optionLabels[i]}.</span>
                  {option.option}
                </span>

                <div
                  className="w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center"
                  style={{
                    borderColor: isSelected ? "#2f6f8a" : "#d1d5db",
                  }}
                >
                  {isSelected && (
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#2f6f8a" }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
