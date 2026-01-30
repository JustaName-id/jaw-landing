/**
 * Reusable animation utility classes for tw-animate-css
 * Following subtle, professional animation guidelines
 */

// Scroll-triggered animations (fade + minimal slide)
export const scrollFadeIn = "animate-in fade-in slide-in-from-bottom-4 duration-500";
export const scrollSlideUp = "animate-in fade-in slide-in-from-bottom-6 duration-600";
export const scrollFadeInFast = "animate-in fade-in duration-400";

// Hero section animations
export const heroHeading = "animate-in fade-in slide-in-from-bottom-4 duration-600";
export const heroSubtitle = "animate-in fade-in slide-in-from-bottom-4 duration-600 delay-100";
export const heroCTA = "animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500";

// Stagger delays for lists/grids (minimal spacing)
export const staggerDelays = {
  0: "delay-0",
  100: "delay-100",
  200: "delay-200",
  300: "delay-300",
  400: "delay-400",
  500: "delay-500",
} as const;

// Card hover effects (subtle scale + shadow)
export const cardHover = "hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-out";
export const cardHoverMinimal = "hover:scale-[1.01] hover:shadow-md transition-all duration-300 ease-out";

// Button animations (subtle scale)
export const buttonHover = "hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200";

// Form animations
export const inputFocus = "focus:ring-2 focus:ring-offset-0 transition-all duration-200";
export const formError = "animate-shake";

// Icon animations
export const iconPulse = "hover:scale-110 transition-transform duration-200";

// Helper function to generate stagger delay classes
export const getStaggerDelay = (index: number, baseDelay: number = 100): string => {
  const delay = index * baseDelay;
  return `delay-${delay}`;
};

// Helper to combine animation classes
export const combineAnimations = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};
