"use client";

import { useEffect } from "react";

interface Props {
  paragraph: string;
  onClose: () => void;
}

export default function ComprehensionModal({ paragraph, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-800">
              Comprehensive Paragraph
            </h2>
            {/* <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button> */}
          </div>

          {/* Content — scrollable */}
          <div className="px-6 py-5 overflow-y-auto text-sm text-gray-700 leading-relaxed">
            {paragraph}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-sm font-medium text-white transition"
              style={{ backgroundColor: "#1c3141" }}
            >
              Minimize
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
