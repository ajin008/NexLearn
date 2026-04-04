"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/src/hooks/useAuth";

interface Props {
  mobile: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function OtpStep({ mobile, onSuccess, onBack }: Props) {
  const [otp, setOtp] = useState("");
  const { loading, handleVerifyOtp } = useAuth();

  const handleSubmit = useCallback(() => {
    handleVerifyOtp(mobile, otp, onSuccess);
  }, [mobile, otp, handleVerifyOtp, onSuccess]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Enter the code we texted you
        </h2>
        <p className="text-sm text-gray-800 mt-1">
          We&apos;ve sent an SMS to +91 {mobile}
        </p>

        <div className="mt-6 relative">
          <div className="border border-gray-300 rounded-lg px-3 pt-3 pb-2">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium">
              SMS code
            </label>
            <input
              type="tel"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123 456"
              className="w-full outline-none text-sm tracking-widest text-gray-800"
            />
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-3">
          Your 6 digit code is on its way. This can sometimes take a few
          moments.
        </p>
        <button
          onClick={onBack}
          className="text-xs text-black font-bold mt-5 underline block"
        >
          Resend code
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full  bg-[#1c3141] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#243460] transition disabled:opacity-60"
      >
        {loading ? "Verifying..." : "Get Started"}
      </button>
    </div>
  );
}
