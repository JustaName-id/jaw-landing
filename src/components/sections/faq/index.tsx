"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { faqs } from "@/lib/data/faq";
import { faqAnswerJsxMap } from "@/lib/data/faq-jsx";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  id: number;
  q: string;
  a: React.ReactNode;
  open: boolean;
  onClick: () => void;
}

const FAQItem = ({ id, q, a, open, onClick }: FAQItemProps) => {
  const triggerId = `faq-trigger-${id}`;
  const panelId = `faq-panel-${id}`;
  return (
    <div className="border-b border-white/10">
      <button
        id={triggerId}
        type="button"
        onClick={onClick}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-5 border-none bg-transparent py-6 text-left text-[#F5F5F4]"
      >
        <span className="text-[16.5px] font-medium">{q}</span>
        <span
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-full border border-white/[0.18] transition-all duration-300",
            open
              ? "rotate-45 bg-[#F5F5F4] text-[#0F172A]"
              : "bg-transparent text-[#CBD5E1]",
          )}
        >
          <Plus size={14} strokeWidth={2} aria-hidden="true" />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="m-0 pb-6 pr-10 text-[15px] leading-[1.6] text-[#94A3B8]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <Section id="faq" variant="dark">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div>
          <h2 className="rs-section-title m-0 mb-[18px] font-medium leading-[1.02] tracking-[-0.035em] text-[#F5F5F4] text-[clamp(34px,4.3vw,58px)] max-md:text-[clamp(28px,6.5vw,40px)] max-md:leading-[1.08]">
            Questions,
            <br />
            <span className="serif text-[#FAFAF9]">answered.</span>
          </h2>
          <p className="m-0 mb-5 max-w-[360px] text-[15px] leading-[1.6] text-[#94A3B8]">
            Everything you need to know about integrating JAW.ID into your
            product.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-[#F5F5F4]"
          >
            Talk to our team <ArrowRight size={13} />
          </a>
        </div>
        <div>
          <div className="border-t border-white/10">
            {faqs.map((it, i) => (
              <FAQItem
                key={it.question}
                id={i}
                q={it.question}
                a={faqAnswerJsxMap[i] ?? it.answer}
                open={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
