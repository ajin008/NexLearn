import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
  sendOtp,
  verifyOtp,
  createProfile,
  logout as logoutApi,
} from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/authStore";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  const handleSendOtp = useCallback(
    async (mobile: string, onSuccess: () => void) => {
      console.log("Sending OTP to", mobile);
      if (mobile.length < 10) {
        toast.error("Enter valid 10-digit number");
        return;
      }
      try {
        setLoading(true);
        const res = await sendOtp(`+91${mobile}`);
        if (res.success) {
          toast.success("OTP sent!");
          onSuccess(); // ← optimistic: move to next step immediately
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleVerifyOtp = useCallback(
    async (mobile: string, otp: string, onNewUser: () => void) => {
      if (otp.length !== 6) {
        toast.error("Enter 6-digit OTP");
        return;
      }
      try {
        setLoading(true);
        const res = await verifyOtp(`+91${mobile}`, otp);
        if (res.success && res.login) {
          setTokens(res.access_token!, res.refresh_token!);
          toast.success("Welcome back!");
          window.location.href = "/";
        } else if (res.success && !res.login) {
          onNewUser(); // ← go to profile step
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Invalid OTP");
      } finally {
        setLoading(false);
      }
    },
    [setTokens]
  );

  const handleCreateProfile = useCallback(
    async (payload: {
      mobile: string;
      name: string;
      email: string;
      qualification: string;
      image: File;
    }) => {
      try {
        setLoading(true);
        const res = await createProfile({
          ...payload,
          mobile: `+91${payload.mobile}`,
        });
        if (res.success) {
          setTokens(res.access_token, res.refresh_token);
          setUser(res.user);
          toast.success("Profile created!");
          window.location.href = "/";
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [setTokens, setUser]
  );

  const handleLogout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      // even if API fails, clear local state
    } finally {
      logout();
      window.location.href = "/login";
    }
  }, [logout]);

  return {
    loading,
    handleSendOtp,
    handleVerifyOtp,
    handleCreateProfile,
    handleLogout,
  };
}
