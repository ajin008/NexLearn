"use client";

import { useState, useEffect } from "react";
import PhoneStep from "./PhoneStep";
import OtpStep from "./OtpStep";
import ProfileStep from "./ProfileStep";
import AuthLeftPanel from "./AuthLeftPanel";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";

type Step = "phone" | "otp" | "profile";

export default function AuthPage() {
  useAuthGuard();
  const [step, setStep] = useState<Step>("phone");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/nexlearn-login-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="flex rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(to bottom, #1c3141 0%, #2b4b63 100%)",
          maxWidth: "882px",
          width: "100%",
        }}
      >
        <AuthLeftPanel />

        {/* RIGHT — no responsive Tailwind classes at all */}
        <div
          className="bg-white rounded-2xl flex flex-col justify-between"
          style={{
            flex: 1,
            margin: "12px",
            padding: "32px",
            minHeight: "469px",
          }}
        >
          <div className="flex-1">
            {step === "phone" && (
              <PhoneStep
                onSuccess={(mob) => {
                  setMobile(mob);
                  setStep("otp");
                }}
              />
            )}
            {step === "otp" && (
              <OtpStep
                mobile={mobile}
                onSuccess={() => setStep("profile")}
                onBack={() => setStep("phone")}
              />
            )}
            {step === "profile" && <ProfileStep mobile={mobile} />}
          </div>
        </div>
      </div>
    </div>
  );
}
