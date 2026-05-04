"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface StaticMotionSvgProps {
  children: ReactNode;
}

export const StaticMotionSvg = ({ children }: StaticMotionSvgProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const root = wrapRef.current;
      if (!root) return;
      const svgs = root.querySelectorAll<SVGSVGElement>("svg");
      svgs.forEach((svg) => {
        if (mq.matches) svg.pauseAnimations?.();
        else svg.unpauseAnimations?.();
      });
    };
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
      {children}
    </div>
  );
};
