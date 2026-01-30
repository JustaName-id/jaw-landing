"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { scrollFadeIn, cardHover } from "@/lib/animations";

interface Feature {
  title: string;
  description: string;
  graphic: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Deploy Quickly",
    description:
      "Two lines of code for production-ready smart accounts. Built on audited, standards-compliant infrastructure.",
    graphic: (
      <svg viewBox="0 0 120 140" className="w-[120px] h-[140px]" fill="none">
        {/* Rocket body */}
        <path
          d="M60 10C45 25 35 50 35 80C35 95 40 105 50 115L60 130L70 115C80 105 85 95 85 80C85 50 75 25 60 10Z"
          fill="white"
          stroke="#0a0a0a"
          strokeWidth="2"
        />
        {/* Rocket window */}
        <circle
          cx="60"
          cy="55"
          r="12"
          fill="white"
          stroke="#0a0a0a"
          strokeWidth="2"
        />
        <circle cx="60" cy="55" r="6" fill="#0a0a0a" />
        {/* Fins */}
        <path
          d="M35 85L20 100L35 95Z"
          fill="#135bec"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        <path
          d="M85 85L100 100L85 95Z"
          fill="#135bec"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        {/* Exhaust */}
        <path
          d="M50 115L55 135L60 125L65 135L70 115"
          fill="#135bec"
          stroke="#135bec"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    title: "Onboard Users Simply",
    description:
      "Passkeys, not seed phrases. Human-readable names, not addresses. Sign-up to transaction instantly.",
    graphic: (
      <svg viewBox="0 0 144 130" className="w-[144px] h-[130px]" fill="none">
        {/* Circle background */}
        <circle
          cx="72"
          cy="72"
          r="50"
          fill="white"
          stroke="#e5e5e5"
          strokeWidth="1"
        />
        {/* Blue arc */}
        <path
          d="M72 22A50 50 0 0 1 122 72"
          stroke="#135bec"
          strokeWidth="12"
          fill="none"
        />
        {/* Dark arc */}
        <path
          d="M122 72A50 50 0 0 1 72 122"
          stroke="#0a0a0a"
          strokeWidth="12"
          fill="none"
        />
        {/* Light arc */}
        <path
          d="M72 122A50 50 0 0 1 22 72"
          stroke="#a3d4f7"
          strokeWidth="12"
          fill="none"
        />
        {/* Person silhouette */}
        <ellipse cx="72" cy="95" rx="20" ry="25" fill="#0a0a0a" />
        <circle cx="72" cy="60" r="15" fill="#0a0a0a" />
        {/* Chat bubble top right */}
        <rect
          x="100"
          y="15"
          width="30"
          height="20"
          rx="4"
          fill="white"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        <line
          x1="105"
          y1="22"
          x2="125"
          y2="22"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        <line
          x1="105"
          y1="28"
          x2="118"
          y2="28"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        {/* Lightbulb icon */}
        <circle
          cx="115"
          cy="45"
          r="10"
          fill="white"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        <path
          d="M112 42L115 48L118 42"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Chat bubble left */}
        <circle
          cx="20"
          cy="55"
          r="12"
          fill="white"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        <circle cx="20" cy="55" r="5" fill="#0a0a0a" />
      </svg>
    ),
  },
  {
    title: "Operate Across Chains",
    description:
      "Extend your product across multiple networks while keeping a single source of truth for users and accounts.",
    graphic: (
      <svg
        viewBox="0 0 160 130"
        className="w-[175px] h-[142px] mt-6"
        fill="none"
      >
        {/* Top hexagon */}
        <path
          d="M80 5L100 18V44L80 57L60 44V18Z"
          fill="white"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        {/* Top left hexagon */}
        <path
          d="M40 30L60 43V69L40 82L20 69V43Z"
          fill="white"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        {/* Top right hexagon */}
        <path
          d="M120 30L140 43V69L120 82L100 69V43Z"
          fill="white"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        {/* Bottom center hexagon - blue filled */}
        <path
          d="M80 55L100 68V94L80 107L60 94V68Z"
          fill="#135bec"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        {/* Chain link icon in blue hexagon */}
        <circle
          cx="80"
          cy="81"
          r="8"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <path d="M76 77L84 85M84 77L76 85" stroke="white" strokeWidth="2" />
        {/* Connection dots */}
        <circle cx="70" cy="43" r="3" fill="#0a0a0a" />
        <circle cx="90" cy="43" r="3" fill="#0a0a0a" />
        <circle cx="50" cy="69" r="3" fill="#0a0a0a" />
        <circle cx="110" cy="69" r="3" fill="#0a0a0a" />
      </svg>
    ),
  },
];

export const Features = () => {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 max-w-[694px] mx-auto">
          <h2 className="text-[28px] md:text-[40px] font-extrabold mb-4 md:mb-5 font-['Space_Grotesk',sans-serif] leading-tight text-[#0a0a0a]">
            Identity-Centric Infrastructure That Just Works
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Designed to meet the operational, security, and reliability needs of
            real-world products.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <Card
                className={`bg-white border-gray-200 rounded-xl shadow-sm min-h-[300px] md:min-h-[360px] py-5 md:py-6 gap-0 ${cardHover}`}
              >
                <CardContent className="px-5 md:px-6 flex flex-col h-full">
                  {/* Graphic */}
                  <div className="h-[120px] md:h-[140px] flex items-center justify-center animate-in fade-in duration-600 delay-100">
                    {feature.graphic}
                  </div>

                  {/* Text content - centered */}
                  <div className="text-center mt-4 flex-1 flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold mb-2 font-['Space_Grotesk',sans-serif]">
                      {feature.title}
                    </h3>
                    <p className="text-gray-900 opacity-90 text-sm md:text-base leading-6">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
