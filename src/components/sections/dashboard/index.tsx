"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import dashboardImage from "@/../../public/sections/dashboard.png";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { scrollFadeIn, scrollSlideUp } from "@/lib/animations";

export const Dashboard = () => {
  const features: string[] = [
    "Real-time user analytics & engagement tracking",
    "Identity verification status & reputation scores",
    "Cross-chain activity monitoring",
  ];

  return (
    <section
      className="py-12 md:py-24 px-4 md:px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f4f8 100%)",
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="bg-[#171717] rounded-xl p-6 md:p-10 lg:p-16 relative overflow-hidden min-h-0 lg:min-h-[538px] flex flex-col lg:flex-row items-start lg:items-center">
          {/* Left Content */}
          <ScrollReveal className={scrollSlideUp}>
            <div className="text-white max-w-full lg:max-w-[512px] relative z-10">
              <div className="text-white/80 text-xs md:text-sm font-medium mb-3 md:mb-5">
                The Dashboard
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                Full Visibility Into Your Infrastructure
              </h2>

              {/* Feature List */}
              <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {features.map((feature, index) => (
                  <li key={index} className={`flex items-start gap-2 md:gap-3 animate-in fade-in duration-500 delay-${index * 100 + 200}`}>
                    <Check
                      className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0 text-white"
                      strokeWidth={2}
                    />
                    <span className="font-semibold text-sm md:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-white/80 text-sm md:text-lg mb-4 md:mb-6">
                Monitor users, track engagement, and optimize your wallet
                experience from one powerful dashboard.
              </p>

              <Button
                asChild
                className="bg-white text-[#171717] hover:bg-gray-100 h-9"
              >
                <a href="https://dashboard.jaw.id"                             target="_blank" rel="noopener noreferrer"
                >
                  Get started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </ScrollReveal>

          {/* Right - Dashboard Image */}
          <ScrollReveal delay={200} className={scrollFadeIn}>
            <div className="relative lg:absolute lg:right-0 lg:bottom-0 w-full lg:w-[612px] h-[200px] md:h-[300px] lg:h-[434px] rounded-lg shadow-lg overflow-hidden mt-6 lg:mt-0">
              <Image
                src={dashboardImage}
                alt="JAW.ID Dashboard"
                className="w-full h-full object-cover object-left-top lg:object-cover"
                width={612}
                height={434}
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
