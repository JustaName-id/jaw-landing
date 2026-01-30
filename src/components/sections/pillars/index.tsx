"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { scrollFadeIn, staggerDelays } from "@/lib/animations";

const pillars = [
  {
    number: "1",
    title: "Smart Auth",
    description: "Biometric login meets account abstraction.",
  },
  {
    number: "2",
    title: "Identity",
    description: "ENS-powered identity built in, not bolted on.",
  },
  {
    number: "3",
    title: "Neutral Stack",
    description: "We don't pick chains. The choice is all yours.",
  },
];

export function Pillars() {
  return (
    <section className="pt-6 md:pt-8 pb-12 md:pb-16 px-4 md:px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        {/* Header - Left aligned */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold mb-2 font-['Space_Grotesk',sans-serif] leading-tight text-[#0a0a0a]">
            Three Birds, One Stone
          </h2>
          <p className="text-[#737373] text-sm md:text-base">
            Most teams patch together separate solutions for auth, accounts, and
            identity. JAW.ID unifies all three. One SDK fits all.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 relative z-10">
          {pillars.map((pillar, index) => (
            <ScrollReveal
              key={index}
              delay={(index + 1) * 100}
              className={`${scrollFadeIn} hover:scale-[1.02] transition-all duration-300`}
            >
              <div
                className="border border-[#e5e5e5] rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div className="px-6 py-6 h-full flex flex-col">
                  {/* Title - centered */}
                  <div className="text-center mb-2">
                    <span className="text-[28px] font-semibold text-[#0a0a0a] font-['Space_Grotesk',sans-serif]">
                      {pillar.title}
                    </span>
                  </div>
                  {/* Description - centered */}
                  <p className="text-[#0a0a0a] opacity-90 text-base leading-6 text-center">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
