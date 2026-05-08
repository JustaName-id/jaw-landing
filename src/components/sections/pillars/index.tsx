import type { ReactNode } from "react";
import { Section } from "@/components/section";
import { SectionHead } from "@/components/sectionHead";
import {
  FingerprintIcon,
  JawMarkIcon,
  NetworkCubesIcon,
} from "@/components/icons/landing";

interface Pillar {
  n: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const pillars: Pillar[] = [
  {
    n: "01",
    title: "Smart Auth",
    description: "Biometric login meets account abstraction.",
    icon: <FingerprintIcon size={20} />,
  },
  {
    n: "02",
    title: "Identity",
    description: "ENS-powered identity built in, not bolted on.",
    icon: <JawMarkIcon size={18} />,
  },
  {
    n: "03",
    title: "Neutral Stack",
    description: "We don't pick chains. The choice is all yours.",
    icon: <NetworkCubesIcon size={20} />,
  },
];

export function Pillars() {
  return (
    <Section variant="plain">
      <SectionHead
        align="split"
        title={
          <>
            Three Birds,
            <br />
            <span className="serif text-[var(--acc)]">One Stone.</span>
          </>
        }
        sub="Most teams patch together separate solutions for auth, accounts, and identity. JAW.ID unifies all three. One SDK fits all."
      />

      <div className="grid grid-cols-1 overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--bg-raise)] lg:grid-cols-3">
        {pillars.map((p, i) => (
          <article
            key={p.n}
            className="pillar relative px-7 py-9 transition-colors duration-300 max-lg:border-b max-lg:border-[var(--line)] max-lg:last:border-b-0 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-[var(--line)] max-md:px-7 max-md:py-9 max-md:text-center max-md:bg-[var(--bg-raise)]"
          >
            <div className="mb-2.5 flex items-center justify-between gap-4 max-md:flex-col max-md:gap-2 max-md:justify-center">
              <h3 className="m-0 text-[24px] font-medium tracking-[-0.02em] max-md:text-[30px] max-md:font-bold">
                {p.title}
              </h3>
              <div className="pillar-icon grid size-11 shrink-0 place-items-center rounded-[10px] border border-[var(--line-2)] bg-[var(--bg-raise-2)] text-[var(--ink)] transition-all duration-300 max-md:hidden">
                {p.icon}
              </div>
            </div>
            <p className="m-0 text-[15px] leading-[1.55] text-[var(--ink-2)]">
              {p.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
