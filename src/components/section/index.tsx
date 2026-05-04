import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type SectionVariant = "plain" | "raise" | "dots" | "diag" | "dark";

interface SectionProps {
  id?: string;
  variant?: SectionVariant;
  bordered?: boolean;
  padded?: boolean;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const variantClass: Record<SectionVariant, string> = {
  plain: "bg-[var(--bg)]",
  raise: "bg-[var(--bg-raise)]",
  dots: "bg-[var(--bg)] [background-image:radial-gradient(circle_at_1px_1px,rgba(15,23,42,.06)_1px,transparent_0)] [background-size:22px_22px]",
  diag: "bg-[var(--bg-raise)] [background-image:repeating-linear-gradient(-45deg,transparent_0,transparent_13px,rgba(15,23,42,.025)_13px,rgba(15,23,42,.025)_14px)]",
  dark: "bg-[#0F172A] text-[#F5F5F4]",
};

export const Section = ({
  id,
  variant = "plain",
  bordered = true,
  padded = true,
  className,
  contentClassName,
  style,
  children,
}: SectionProps) => {
  return (
    <section
      id={id}
      style={style}
      className={cn(
        "relative overflow-hidden",
        variantClass[variant],
        bordered &&
          (variant === "dark"
            ? "border-b border-[#020617]"
            : "border-b border-[var(--line)]"),
        padded && "py-16 md:py-22 lg:py-30",
        className,
      )}
    >
      <div
        className={cn(
          "relative mx-auto max-w-[1260px] px-5 md:px-6 lg:px-8",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
};
