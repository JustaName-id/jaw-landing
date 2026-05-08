import type { ReactNode } from "react";
import { Section } from "@/components/section";
import { SectionHead } from "@/components/sectionHead";
import { DeployIll, OnboardIll, ChainsIll } from "./illustrations";
import { StaticMotionSvg } from "@/components/animations/StaticMotionSvg";

interface FeatureCard {
  title: string;
  description: string;
  tag: string;
  Illust: () => ReactNode;
}

const cards: FeatureCard[] = [
  {
    title: "Deploy Quickly",
    description:
      "Two lines of code for production-ready smart accounts. Built on audited, standards-compliant infrastructure.",
    tag: "ERC-4337",
    Illust: DeployIll,
  },
  {
    title: "Onboard Users Simply",
    description:
      "Passkeys, not seed phrases. Human-readable names, not addresses. Sign-up to transaction instantly.",
    tag: "Face ID / Passkey",
    Illust: OnboardIll,
  },
  {
    title: "Operate Across Chains",
    description:
      "Extend your product across multiple networks while keeping a single source of truth for users and accounts.",
    tag: "Omnichain",
    Illust: ChainsIll,
  },
];

export const Features = () => {
  return (
    <Section variant="raise">
      <SectionHead
        align="center"
        title={
          <>
            Identity-Centric Infrastructure{" "}
            <span className="serif text-[var(--acc)]">that just works.</span>
          </>
        }
        sub="Designed to meet the operational, security, and reliability needs of real-world products."
      />

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {cards.map((c) => {
          const Illust = c.Illust;
          return (
            <article
              key={c.title}
              className="infracard flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-raise)] transition-all duration-300"
            >
              <div className="aspect-[200/140] border-b border-[var(--line)] bg-[var(--bg-raise-2)]">
                <StaticMotionSvg>
                  <Illust />
                </StaticMotionSvg>
              </div>
              <div className="px-7 pb-8 pt-7">
                <span className="mono mb-3.5 inline-block text-[10px] uppercase tracking-[0.12em] text-[var(--acc)]">
                  {c.tag}
                </span>
                <h3 className="m-0 mb-2.5 text-[22px] font-medium tracking-[-0.02em]">
                  {c.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.55] text-[var(--ink-2)]">
                  {c.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
};
