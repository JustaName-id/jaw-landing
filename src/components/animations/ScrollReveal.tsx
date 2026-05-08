"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  /** ms delay before the transition starts after entering the viewport */
  delay?: number;
  /** IntersectionObserver threshold 0..1 */
  threshold?: number;
  /** if true, fires once and stops observing */
  once?: boolean;
  /** transition duration in ms */
  duration?: number;
  /** vertical offset to slide in from, in px */
  offset?: number;
  className?: string;
  /** when true, render children with no animation wrapper styles
   *  (e.g. user prefers-reduced-motion or you want to disable inline) */
  disabled?: boolean;
}

export const ScrollReveal = ({
  children,
  delay = 0,
  threshold = 0.15,
  once = true,
  duration = 700,
  offset = 16,
  className,
  disabled = false,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShouldAnimate(false);
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, once]);

  if (disabled || !shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] ease-out will-change-[opacity,transform]",
        visible ? "opacity-100 translate-y-0" : "opacity-0",
        className,
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transform: visible ? undefined : `translateY(${offset}px)`,
      }}
    >
      {children}
    </div>
  );
};
