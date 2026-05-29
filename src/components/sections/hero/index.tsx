import { HeroPrimaryCta } from "./hero-primary-cta";
import { HeroDemoSlot } from "./hero-demo-slot";

export const Hero = () => {
  return (
    <section className="relative flex items-center overflow-hidden border-b border-[var(--line)] min-h-[92vh] max-md:min-h-0 max-md:py-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-no-repeat bg-[right_-4%_center] bg-[length:auto_95%] opacity-[0.14] max-lg:bg-[length:auto_100%] max-lg:bg-center max-lg:opacity-[0.11] max-md:bg-[center_70%] max-md:bg-[length:auto_95%] max-md:opacity-[0.06]"
        style={{ backgroundImage: "url(/assets/hero-bg.png)" }}
      />

      <div className="relative mx-auto grid w-full max-w-[1260px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-32 md:px-6 md:py-30 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16 lg:px-8 lg:py-[140px] max-md:gap-10">
        <div className="max-md:flex max-md:flex-col max-md:items-center max-md:text-center">
          <h1 className="m-0 mb-6 max-w-[18ch] font-medium tracking-[-0.04em] leading-[1.05] text-[clamp(40px,6vw,60px)] [text-wrap:balance] max-md:max-w-full max-md:tracking-[-0.03em] max-md:text-[clamp(28px,8vw,44px)] max-[380px]:text-[26px] animate-in fade-in slide-in-from-bottom-4 duration-700">
            Access Onchain <span className="serif">Capabilities</span>,{" "}
            <br className="max-md:hidden" />
            minus the{" "}
            <span className="text-[var(--hero-electric)]">Complexity</span>
          </h1>

          <p className="m-0 mb-8 max-w-[44ch] text-[20px] leading-[1.55] text-[var(--ink-2)] max-md:text-base animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
            Identity-first infrastructure for the smart-account era: biometric
            login, ENS identity, and programmable permissions.
          </p>

          <div className="flex flex-wrap items-center gap-5 max-md:justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
            <HeroPrimaryCta />
            <a
              href="#contact"
              className="text-[16px] font-medium text-[var(--ink-2)] underline-offset-4 transition hover:text-[var(--ink)] hover:underline"
            >
              Contact us
            </a>
          </div>
        </div>

        <HeroDemoSlot />
      </div>
    </section>
  );
};
