import { useEffect } from "react";

export function useAuthGuard() {
  useEffect(() => {
    const navEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    if (navEntry?.type === "back_forward") {
      window.location.reload();
    }
  }, []);
}
