"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cardHover } from "@/lib/animations";

interface Plan {
  title: string;
  features: string[];
  buttonText: string;
  href: string;
}

const plans: Plan[] = [
  {
    title: "For Developers",
    features: [
      "Full docs & SDK",
      "Production-ready in minutes",
      "Integrate using Wagmi or EIP-1193 provider",
      "Low level API integrations",
    ],
    buttonText: "Get Started",
    href: "https://dashboard.jaw.id",
  },
  {
    title: "For Businesses",
    features: [
      "Talk to our team",
      "Custom integration support",
      "Early access to new features",
      "Audit and compliance documentation",
    ],
    buttonText: "Contact Us",
    href: "#contact",
  },
];

export const Pricing = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="waves"
              width="100"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 10 Q25 0 50 10 T100 10"
                fill="none"
                stroke="gray"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-[#0a0a0a]">
          A Unified Layer for Accounts and Identity
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <Card
                className={`bg-white border-gray-200 rounded-xl md:rounded-2xl hover:shadow-lg transition-all duration-300 py-0 gap-0 ${cardHover}`}
              >
                <CardHeader className="p-6 md:p-8 pb-0">
                  <CardTitle className="text-xl md:text-2xl font-bold">
                    {plan.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 md:p-8 pt-2 md:pt-4">
                  <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`flex items-center gap-2 md:gap-3 animate-in fade-in duration-400 delay-${(i + 1) * 100}`}>
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-gray-800 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-black text-white hover:bg-gray-800 py-2.5 md:py-3 h-auto"
                  >
                    <a href={plan.href}>{plan.buttonText}</a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
