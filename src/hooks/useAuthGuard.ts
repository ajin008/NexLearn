import { useEffect } from "react";

export function useAuthGuard() {
  useEffect(() => {
    const navEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    // If user arrived via back/forward button → force reload
    // This triggers proxy which checks cookie → redirects if not authenticated
    if (navEntry?.type === "back_forward") {
      window.location.reload();
    }
  }, []);
}
