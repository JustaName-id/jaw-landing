"use client";

import { HeroDemo } from "./hero-demo";
import { useIsMobile } from "./use-is-mobile";

// The right-column slot for the inline demo. Desktop only — and it renders
// nothing until the breakpoint is actually known (isMobile === null) so the
// live demo never momentarily flashes into the hero on phones before collapsing
// into the "Try JAW" CTA. The card's own fade-in animation covers the desktop
// mount.
export const HeroDemoSlot = () => {
  const isMobile = useIsMobile();

  if (isMobile !== false) return null;

  return (
    <div className="flex justify-center lg:justify-end animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500 fill-mode-both">
      <HeroDemo />
    </div>
  );
};
