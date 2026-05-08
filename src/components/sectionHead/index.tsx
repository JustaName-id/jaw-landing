import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadProps {
  label?: ReactNode;
  num?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center" | "split";
  className?: string;
  /** Override default mb-14; set false for callers that handle spacing themselves. */
  spaced?: boolean;
}

const titleClass =
  "rs-section-title m-0 font-medium tracking-[-0.035em] leading-[1.02] text-[clamp(34px,4.3vw,58px)] [&_br]:max-md:hidden max-md:text-[clamp(28px,6.5vw,40px)] max-md:leading-[1.08]";

export const SectionHead = ({
  label,
  num,
  title,
  sub,
  align = "left",
  className,
  spaced = true,
}: SectionHeadProps) => {
  const showEyebrow = !!(label || num);

  if (align === "split") {
    return (
      <header
        className={cn(
          "grid grid-cols-1 gap-8",
          sub && "md:grid-cols-[1fr_1.3fr] md:items-center",
          spaced && "mb-14",
          className,
        )}
      >
        <div>
          {showEyebrow && <Eyebrow num={num} label={label} className="mb-4" />}
          <h2 className={titleClass}>{title}</h2>
        </div>
        {sub ? (
          <p className="m-0 text-[17px] leading-[1.6] text-[var(--ink-2)] md:self-center">
            {sub}
          </p>
        ) : null}
      </header>
    );
  }

  return (
    <header
      className={cn(
        "grid gap-[18px]",
        align === "center" && "mx-auto max-w-[780px] text-center",
        spaced && "mb-14",
        className,
      )}
    >
      {showEyebrow && (
        <Eyebrow
          num={num}
          label={label}
          className={align === "center" ? "justify-center" : "justify-start"}
        />
      )}
      <h2 className={titleClass}>{title}</h2>
      {sub ? (
        <p
          className={cn(
            "m-0 max-w-[640px] text-[17px] leading-[1.55] text-[var(--ink-2)]",
            align === "center" && "mx-auto",
          )}
        >
          {sub}
        </p>
      ) : null}
    </header>
  );
};

interface EyebrowProps {
  num?: string;
  label?: ReactNode;
  className?: string;
}

const Eyebrow = ({ num, label, className }: EyebrowProps) => (
  <div
    className={cn(
      "mono inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]",
      className,
    )}
  >
    {num && <span className="text-[var(--acc)]">[{num}]</span>}
    <span className="h-px w-5 bg-[var(--ink-4)]" aria-hidden />
    {label}
  </div>
);
