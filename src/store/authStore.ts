import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/auth.types";
import Cookies from "js-cookie";

interface AuthState {
  // ─── State ───────────────────────────────
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  // ─── Actions ─────────────────────────────
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // ─── Initial State ──────────────────
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // ─── Actions ───────────────────────
      setTokens: (accessToken, refreshToken) => {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        Cookies.set("access_token", accessToken, {
          expires: 1, // 1 day
          sameSite: "strict",
        });

        set({ accessToken, refreshToken, isAuthenticated: true });
      },

      setUser: (user) => set({ user }),

      logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        Cookies.remove("access_token");
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "nexlearn-auth", // key in localStorage
      partialize: (state) => ({
        // only persist these fields
        // never persist actions
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
