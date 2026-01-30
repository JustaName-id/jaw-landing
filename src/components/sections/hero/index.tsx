"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { heroHeading, heroSubtitle, heroCTA, staggerDelays } from "@/lib/animations";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className=" pt-40 md:pt-20  pb-16 flex justify-center px-4 md:px-6 bg-white relative overflow-hidden min-h-[calc(100vh+50px)] md:min-h-[calc(100vh+50px)]">
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
        <div className="flex-1 md:mt-8 text-center lg:mt-12">
          <h1 className={`text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-[36px] md:leading-[44px] lg:leading-[52px] mb-6 font-['Space_Grotesk',sans-serif] text-[#0a0a0a] ${mounted ? heroHeading : 'opacity-0'}`}>
            Access Onchain Capabilities
            <br />
            Without Carrying its{" "}
            <br />
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
          <p className={`text-gray-500 text-lg leading-7 mb-8 max-w-[85%] mx-auto ${mounted ? heroSubtitle : 'opacity-0'}`}>
            Identity-centric infrastructure for the smart account era, designed
            to absorb wallet and account overhead so products can focus on
            users, not systems.
          </p>

          {/* Checklist */}
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8 max-w-[90%] mx-auto">
            <li className={`flex items-center gap-2 ${mounted ? `animate-in fade-in duration-500 ${staggerDelays[200]}` : 'opacity-0'}`}>
              <Check className="w-5 h-5  text-[#4f46e5] flex-shrink-0" strokeWidth={2} />
              <span className="text-gray-900 font-medium whitespace-nowrap">
                Invisible web3 infrastructure
              </span>
            </li>
            <li className={`flex items-center gap-2 ${mounted ? `animate-in fade-in duration-500 ${staggerDelays[300]}` : 'opacity-0'}`}>
              <Check className="w-5 h-5 text-[#4f46e5] flex-shrink-0" strokeWidth={2} />
              <span className="text-gray-900 font-medium whitespace-nowrap">
                Onchain agent & automation
              </span>
            </li>
            <li className={`flex items-center gap-2 ${mounted ? `animate-in fade-in duration-500 ${staggerDelays[400]}` : 'opacity-0'}`}>
              <Check className="w-5 h-5 text-[#4f46e5] flex-shrink-0" strokeWidth={2} />
              <span className="text-gray-900 font-medium whitespace-nowrap">
                Customizable solutions
              </span>
            </li>
            <li className={`flex items-center gap-2 ${mounted ? `animate-in fade-in duration-500 ${staggerDelays[500]}` : 'opacity-0'}`}>
              <Check className="w-5 h-5 text-[#4f46e5] flex-shrink-0" strokeWidth={2} />
              <span className="text-gray-900 font-medium whitespace-nowrap">
                No onboarding friction
              </span>
            </li>
          </ul>

          {/* CTAs */}
          <div className={`flex items-center mx-auto w-fit gap-3 ${mounted ? heroCTA : 'opacity-0'}`}>
            <Button
              asChild
              className="bg-[#171717] text-white hover:bg-gray-800 h-9"
            >
              <a href="https://dashboard.jaw.id"                             target="_blank" rel="noopener noreferrer"
              >Get Started</a>
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
      {/*<div className="hidden lg:block absolute right-[10%] top-1/2 -translate-y-1/2 w-[516px] h-[516px]">*/}
      {/*  <Image*/}
      {/*    src="/assets/hero-illustration.png"*/}
      {/*    alt="JAW.ID Platform Illustration"*/}
      {/*    width={516}*/}
      {/*    height={516}*/}
      {/*    priority={true}*/}
      {/*    className="w-full h-full object-contain"*/}
      {/*  />*/}
      {/*</div>*/}
    </section>
  );
};
