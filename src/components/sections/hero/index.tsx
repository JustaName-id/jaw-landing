import { ArrowRight, Check } from "lucide-react";

const checklist = [
  "Invisible web3 infrastructure",
  "Onchain agent & automation",
  "Customizable solutions",
  "No onboarding friction",
];

export const Hero = () => {
  return (
    <section className="relative flex items-center overflow-hidden border-b border-[var(--line)] min-h-[92vh] max-md:min-h-0 max-md:py-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-no-repeat bg-[right_-4%_center] bg-[length:auto_95%] opacity-[0.14] max-lg:bg-[length:auto_100%] max-lg:bg-center max-lg:opacity-[0.11] max-md:bg-[length:auto_110%] max-md:opacity-[0.09]"
        style={{ backgroundImage: "url(/assets/hero-bg.png)" }}
      />

      <div className="relative mx-auto w-full max-w-[1260px] px-5 py-16 md:px-6 md:py-30 lg:px-8 lg:py-[140px] max-md:flex max-md:flex-col max-md:items-center">
        <h1 className="m-0 mb-6 max-w-[24ch] font-medium tracking-[-0.04em] leading-[1.05] text-[clamp(40px,7vw,64px)] [text-wrap:balance] max-md:text-center max-md:tracking-[-0.03em] max-md:text-[clamp(34px,9vw,52px)] max-[380px]:text-[32px]">
          <span className="whitespace-nowrap">
            Access Onchain <span className="serif">Capabilities</span>
          </span>
          <br className="max-md:hidden" /> Without Carrying its
          <br className="max-md:hidden" />{" "}
          <span className="text-[var(--hero-electric)]">Complexity</span>
        </h1>

        <p className="m-0 mb-8 max-w-[560px] text-[20px] leading-[1.55] text-[var(--ink-2)] max-md:text-center max-md:text-base">
          Identity-centric infrastructure for the smart account era, designed to
          absorb wallet and account overhead so products can focus on users, not
          systems.
        </p>

        <ul className="m-0 mb-9 grid list-none p-0 grid-cols-[repeat(2,max-content)] gap-x-10 gap-y-3 max-md:grid-cols-1">
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

        <div className="flex gap-3 max-md:gap-3.5">
          <a
            href="https://dashboard.jaw.id"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-[22px] py-[13px] text-[18px] max-md:text-base"
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
    </section>
  );
};
