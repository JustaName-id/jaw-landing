"use client";

import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { TryItNowDialog } from "./try-it-now-dialog";

const checklist = [
  "Invisible web3 infrastructure",
  "Onchain agent & automation",
  "Customizable solutions",
  "No onboarding friction",
];

export const Hero = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="relative flex items-center overflow-hidden border-b border-[var(--line)] min-h-[92vh] max-md:min-h-0 max-md:py-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-no-repeat bg-[right_-4%_center] bg-[length:auto_95%] opacity-[0.14] max-lg:bg-[length:auto_100%] max-lg:bg-center max-lg:opacity-[0.11] max-md:bg-[center_70%] max-md:bg-[length:auto_95%] max-md:opacity-[0.09]"
        style={{ backgroundImage: "url(/assets/hero-bg.png)" }}
      />

      <div className="relative mx-auto w-full max-w-[1260px] px-5 pb-16 pt-32 md:px-6 md:py-30 lg:px-8 lg:py-[140px] max-md:flex max-md:flex-col max-md:items-center">
        <h1 className="m-0 mb-6 max-w-[24ch] font-medium tracking-[-0.04em] leading-[1.05] text-[clamp(40px,7vw,64px)] [text-wrap:balance] max-md:max-w-full max-md:text-center max-md:tracking-[-0.03em] max-md:text-[clamp(28px,8vw,44px)] max-[380px]:text-[26px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="md:whitespace-nowrap">
            Access Onchain <span className="serif">Capabilities</span>
          </span>{" "}
          <br className="max-md:hidden" />
          Without Carrying its <br className="max-md:hidden" />
          <span className="text-[var(--hero-electric)]">Complexity</span>
        </h1>

        <p className="m-0 mb-8 max-w-[560px] text-[20px] leading-[1.55] text-[var(--ink-2)] max-md:text-center max-md:text-base animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          Identity-centric infrastructure for the smart account era, designed to
          absorb wallet and account overhead so products can focus on users, not
          systems.
        </p>

        <ul className="m-0 mb-9 grid list-none p-0 grid-cols-[repeat(2,max-content)] gap-x-10 gap-y-3 max-md:grid-cols-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          {checklist.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2.5 text-[18px] font-medium text-[var(--ink)]"
            >
              <span className="grid place-items-center size-[18px] shrink-0 rounded-full bg-[var(--acc-soft)] text-[var(--acc)]">
                <Check size={10} strokeWidth={2.4} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 max-md:gap-3.5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            className="btn-primary px-[22px] py-[13px] text-[18px] max-md:text-base"
          >
            <Sparkles size={14} /> Try it now
          </button>
          <a
            href="https://dashboard.jaw.id"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-5 py-[13px] text-[18px] max-md:text-base"
          >
            Get Started <ArrowRight size={14} />
          </a>
          <a
            href="#contact"
            className="btn-ghost px-5 py-[13px] text-[18px] max-md:!border-0 max-md:!bg-transparent max-md:px-1.5 max-md:text-base"
          >
            Contact Us
          </a>
        </div>
      </div>

      <TryItNowDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </section>
  );
};
