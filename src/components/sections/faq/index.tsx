import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does JAW.ID handle user custody and security?",
    answer:
      "JAW is built on true self-custody: keys live on the user's device, secured by their biometrics, never on our servers. Passkey authentication eliminates seed phrases without sacrificing security. Users retain full control of their assets at all times. All smart account infrastructure is built on audited, standards-compliant contracts.",
  },
  {
    question: "What chains and networks does JAW.ID support?",
    answer:
      "JAW supports all major EVM-compatible chains including Ethereum, Base, Arbitrum, Optimism, Linea, and more... with ongoing rollout to any EVM chain that supports the account abstraction stack (ERC-4337 and EIP-7702). Users maintain a single ENS-based identity across all supported networks, with automatic chain detection and routing built in.",
  },
  {
    question: "How long does integration take for existing products?",
    answer:
      "Most teams are production-ready within minutes. JAW.ID integrates directly with Wagmi or any EIP-1193 provider with just a few lines of code. For more complex enterprise deployments with custom requirements, our team provides dedicated integration support.",
  },
  {
    question: "What are the costs associated with gasless transactions?",
    answer:
      "Users can pay gas in stablecoins natively, no ETH required. If you want to sponsor transactions, bring any EIP-7677 compliant paymaster (like Pimlico or Etherspot) and configure it to sponsor all transactions, specific chains, or specific calls. JAW handles the integration; you control the policies.",
  },
  {
    question:
      "How do programmable permissions work for AI agents and subscriptions?",
    answer:
      "JAW's smart accounts let users delegate specific capabilities with granular controls: spending limits, time windows, and allowed contracts paired with specific function calls. This enables recurring subscriptions, AI agents with spending caps, and automated DeFi strategies. Users stay in control and can revoke permissions at any time.",
  },
  {
    question: "Can users take their account to other apps?",
    answer:
      "That's your choice. You can issue app-specific accounts that exist only within your product, or portable accounts that users carry across any JAW-integrated app. App-specific accounts keep users contained in your ecosystem. Portable accounts let them bring their identity and assets wherever they go. Pick the model that fits your product.",
  },
  {
    question: "What kind of analytics and monitoring do you provide?",
    answer:
      "The JAW Dashboard gives you real-time visibility into user activity, identity verification status, and cross-chain transactions. Track engagement patterns and monitor account creation across your integration.",
  },
];

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
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-white/10"
            >
              <AccordionTrigger className="text-left cursor-pointer font-medium text-base md:text-lg py-4 md:py-5 hover:no-underline text-white hover:text-gray-300 [&[data-state=open]]:text-[#135bec]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-sm md:text-base leading-relaxed pb-4 md:pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
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
