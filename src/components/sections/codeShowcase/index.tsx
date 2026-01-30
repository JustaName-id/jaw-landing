"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { scrollFadeIn } from "@/lib/animations";

const codeContent = `import { jaw } from '@jaw-id/wagmi'
import { createConfig, http } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'

const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    jaw({
      apiKey: 'your-api-key',
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  }
})`;

export const CodeShowcase = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #f8f9ff 0%, #ffffff 40%, #f0f4ff 100%)",
        }}
      />
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="max-w-[900px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 font-['Space_Grotesk',sans-serif]">
            Production-Ready in Minutes
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Integrate JAW in just a few lines of code.
          </p>
        </div>

        {/* Code Editor */}
        <ScrollReveal className={scrollFadeIn}>
          <div className="bg-[#1e1e2e] rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#181825] border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
                <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
                <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
              </div>
              <span className="text-gray-400 text-sm">wagmi.config.ts</span>
              <button
                onClick={handleCopy}
                className={`flex items-center cursor-pointer gap-1.5 text-gray-400 text-sm hover:text-white transition-all duration-200 ${
                  copied ? "scale-110" : ""
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

          {/* Code Content */}
          <div className="p-3 md:p-4 overflow-x-auto">
            <pre className="text-[10px] md:text-xs leading-4 md:leading-5 font-mono">
              <code>
                <span className="text-[#cba6f7]">import</span>
                <span className="text-[#cdd6f4]"> {"{ "}</span>
                <span className="text-[#f9e2af]">jaw</span>
                <span className="text-[#cdd6f4]">{" }"} </span>
                <span className="text-[#cba6f7]">from</span>
                <span className="text-[#a6e3a1]"> '@jaw-id/wagmi'</span>
                {"\n"}
                <span className="text-[#cba6f7]">import</span>
                <span className="text-[#cdd6f4]"> {"{ "}</span>
                <span className="text-[#f9e2af]">createConfig</span>
                <span className="text-[#cdd6f4]">, </span>
                <span className="text-[#f9e2af]">http</span>
                <span className="text-[#cdd6f4]">{" }"} </span>
                <span className="text-[#cba6f7]">from</span>
                <span className="text-[#a6e3a1]"> 'wagmi'</span>
                {"\n"}
                <span className="text-[#cba6f7]">import</span>
                <span className="text-[#cdd6f4]"> {"{ "}</span>
                <span className="text-[#f9e2af]">mainnet</span>
                <span className="text-[#cdd6f4]">, </span>
                <span className="text-[#f9e2af]">base</span>
                <span className="text-[#cdd6f4]">{" }"} </span>
                <span className="text-[#cba6f7]">from</span>
                <span className="text-[#a6e3a1]"> 'wagmi/chains'</span>
                {"\n\n"}
                <span className="text-[#cba6f7]">const</span>
                <span className="text-[#cdd6f4]"> config = </span>
                <span className="text-[#89b4fa]">createConfig</span>
                <span className="text-[#cdd6f4]">{"({"}</span>
                {"\n"}
                <span className="text-[#cdd6f4]">{"  "}chains: [</span>
                <span className="text-[#f9e2af]">mainnet</span>
                <span className="text-[#cdd6f4]">, </span>
                <span className="text-[#f9e2af]">base</span>
                <span className="text-[#cdd6f4]">],</span>
                {"\n"}
                <span className="text-[#cdd6f4]">{"  "}connectors: [</span>
                {"\n"}
                <span className="text-[#cdd6f4]">{"    "}</span>
                <span className="text-[#89b4fa]">jaw</span>
                <span className="text-[#cdd6f4]">{"({"}</span>
                {"\n"}
                <span className="text-[#cdd6f4]">{"      "}apiKey: </span>
                <span className="text-[#a6e3a1]">'your-api-key'</span>
                <span className="text-[#cdd6f4]">,</span>
                {"\n"}
                <span className="text-[#cdd6f4]">{"    "}{"})"}</span>
                {"\n"}
                <span className="text-[#cdd6f4]">{"  "}],</span>
                {"\n"}
                <span className="text-[#cdd6f4]">{"  "}transports: {"{"}</span>
                {"\n"}
                <span className="text-[#cdd6f4]">{"    "}[</span>
                <span className="text-[#f9e2af]">mainnet</span>
                <span className="text-[#cdd6f4]">.id]: </span>
                <span className="text-[#89b4fa]">http</span>
                <span className="text-[#cdd6f4]">(),</span>
                {"\n"}
                <span className="text-[#cdd6f4]">{"    "}[</span>
                <span className="text-[#f9e2af]">base</span>
                <span className="text-[#cdd6f4]">.id]: </span>
                <span className="text-[#89b4fa]">http</span>
                <span className="text-[#cdd6f4]">(),</span>
                {"\n"}
                <span className="text-[#cdd6f4]">{"  "}{"}"}</span>
                {"\n"}
                <span className="text-[#cdd6f4]">{"})"}</span>
              </code>
            </pre>
          </div>
        </div>
        </ScrollReveal>

        {/* CTA Button */}
        <div className="text-center mt-6 md:mt-8">
          <Button
            asChild
            className="bg-[#171717] text-white hover:bg-gray-800 px-5 md:px-6 py-2.5 md:py-3 h-auto"
          >
            <a href="https://docs.jaw.id" className="inline-flex items-center gap-2">
              View Full Documentation
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
