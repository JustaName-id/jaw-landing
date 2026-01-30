"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="mt-[108px] pt-8 md:pt-20  pb-16 px-4 md:px-6 bg-white relative overflow-hidden md:min-h-[calc(100vh-108px+50px)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/hero-bg.png"
          alt="hero-bg"
          className="absolute w-full h-full object-cover opacity-[0.03]"
        />
      </div>

      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8 relative">
        {/* Left Content */}
        <div className="flex-1 md:mt-8 lg:mt-12">
          <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-[36px] md:leading-[44px] lg:leading-[52px] mb-6 font-['Space_Grotesk',sans-serif] text-[#0a0a0a]">
            Access Onchain Capabilities
            <br />
            Without Carrying Its{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #135bec 0%, #135bec 100%)",
              }}
            >
              Complexity
            </span>
          </h1>
          <p className="text-gray-500 text-lg leading-7 mb-8 max-w-xl">
            Identity-centric infrastructure for the smart account era, designed
            to absorb wallet and account overhead so products can focus on
            users, not systems.
          </p>

          {/* Checklist */}
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-gray-900" strokeWidth={2} />
              <span className="text-gray-900 font-medium">
                Invisible web3 infrastructure
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-gray-900" strokeWidth={2} />
              <span className="text-gray-900 font-medium">
                Onchain agent & automation
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-gray-900" strokeWidth={2} />
              <span className="text-gray-900 font-medium">
                Customizable solutions
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-gray-900" strokeWidth={2} />
              <span className="text-gray-900 font-medium">
                No onboarding friction
              </span>
            </li>
          </ul>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-[#171717] text-white hover:bg-gray-800 h-9"
            >
              <a href="https://dashboard.jaw.id">Get Started</a>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="text-gray-900 hover:text-gray-700 hover:bg-transparent"
            >
              <a href="#contact" className="flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Right Illustration - positioned to the right */}
      <div className="hidden lg:block absolute right-[10%] top-1/2 -translate-y-1/2 w-[516px] h-[516px]">
        <Image
          src="/assets/hero-illustration.png"
          alt="JAW.ID Platform Illustration"
          width={516}
          height={516}
          priority={true}
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
};
