"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { faqs } from "@/lib/data/faq";
import { faqAnswerJsxMap } from "@/lib/data/faq-jsx";

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="py-12 md:py-20 px-4 md:px-6"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-['Space_Grotesk',sans-serif] text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Everything you need to know about integrating JAW.ID into your
            product.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 80} threshold={0.05}>
              <AccordionItem
                value={`item-${index}`}
                className="border-b border-white/10 transition-all duration-200"
              >
                <AccordionTrigger className="text-left cursor-pointer font-medium text-base md:text-lg py-4 md:py-5 hover:no-underline text-white hover:text-gray-300 [&[data-state=open]]:text-[#135bec] transition-colors duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-sm md:text-base leading-relaxed pb-4 md:pb-5">
                  {faqAnswerJsxMap[index] ?? faq.answer}
                </AccordionContent>
              </AccordionItem>
            </ScrollReveal>
          ))}
        </Accordion>

        {/* CTA */}
        <div className="text-center mt-4 md:mt-6">
          <p className="text-gray-400 text-sm md:text-base">
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-[#135bec] font-medium hover:underline"
            >
              Get in touch
            </a>{" "}
            with our team.
          </p>
        </div>
      </div>
    </section>
  );
};
