"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/src/hooks/useAuth";

interface Props {
  onSuccess: (mobile: string) => void;
}

export default function PhoneStep({ onSuccess }: Props) {
  const [mobile, setMobile] = useState("");
  const { loading, handleSendOtp } = useAuth();

  const handleSubmit = useCallback(() => {
    handleSendOtp(mobile, () => onSuccess(mobile));
  }, [mobile, handleSendOtp, onSuccess]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Enter your phone number
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          We use your mobile number to identify your account
        </p>

        <div className="mt-6 relative">
          <div className="border border-gray-300 rounded-lg px-3 pt-3 pb-2">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium">
              Phone number
            </label>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">🇮🇳 +91</span>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                placeholder="1234 567891"
                className="flex-1 outline-none text-sm text-gray-800"
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-5">
          By tapping Get started, you agree to the{" "}
          <span className="text-gray-800 font-medium cursor-pointer ">
            Terms & Conditions
          </span>
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full  bg-[#1c3141] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#243460] transition disabled:opacity-60"
      >
        {loading ? "Sending..." : "Get Started"}
      </button>
    </div>
  );
}
