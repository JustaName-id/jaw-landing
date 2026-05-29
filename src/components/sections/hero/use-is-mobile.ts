"use client";

import { useEffect, useState } from "react";

// Whether the viewport is below the demo's desktop breakpoint (1023px).
// Returns null until resolved on the client — callers must treat null as
// "not yet known" rather than defaulting to a guess, otherwise the first paint
// renders the wrong layout and visibly flips after hydration.
export const useIsMobile = (): boolean | null => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isMobile;
};
