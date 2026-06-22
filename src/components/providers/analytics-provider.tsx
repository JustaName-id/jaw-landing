"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getAnalyticsClient } from "@/lib/analytics";

// Initialize PostHog as soon as this module loads in the browser, so
// autocapture starts listening before the first interaction.
if (typeof window !== "undefined") {
  getAnalyticsClient();
}

// Minimal client component that tracks SPA pageviews on route + query changes.
// It renders nothing and is the ONLY thing that must sit inside a <Suspense>
// boundary (Next 15 requires it because it reads useSearchParams()). Keeping it
// childless means a future suspension here can never blank out the page layout.
export const PageviewTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    let url = window.location.origin + pathname;
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
    getAnalyticsClient().track_unsafe("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
};
