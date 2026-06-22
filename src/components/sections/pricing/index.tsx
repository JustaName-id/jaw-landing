import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHead } from "@/components/sectionHead";

interface Plan {
  title: string;
  features: string[];
  cta: string;
  href: string;
  external?: boolean;
  phCta: string;
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
    cta: "Get Started",
    href: "https://dashboard.jaw.id",
    external: true,
    phCta: "pricing_developers",
  },
  {
    title: "For Businesses",
    features: [
      "Talk to our team",
      "Custom integration support",
      "Early access to new features",
      "Audit and compliance documentation",
    ],
    cta: "Contact Us",
    href: "#contact",
    phCta: "pricing_businesses",
  },
];

export const Pricing = () => {
  return (
    <Section variant="plain">
      <SectionHead
        align="center"
        title={
          <>
            A unified layer for{" "}
            <span className="serif text-[var(--acc)]">
              accounts and identity.
            </span>
          </>
        }
      />

      <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-5">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className="ctac flex flex-col gap-5 rounded-[18px] border border-[var(--acc)] p-7 pb-7 transition-all duration-200 [background:linear-gradient(180deg,rgba(15,23,42,0.04),transparent_70%),var(--bg-raise)] max-md:px-6 max-md:py-7"
          >
            <h3 className="m-0 text-[22px] font-medium tracking-[-0.02em]">
              {plan.title}
            </h3>
            <ul className="m-0 grid list-none gap-2.5 p-0">
              {plan.features.map((l) => (
                <li
                  key={l}
                  className="flex items-center gap-3 text-[14.5px] text-[var(--ink-2)]"
                >
                  <span className="grid size-4 place-items-center rounded-full bg-[var(--acc-soft)] text-[var(--acc)]">
                    <Check size={10} strokeWidth={2.4} />
                  </span>
                  {l}
                </li>
              ))}
            </ul>
            <a
              href={plan.href}
              {...(plan.external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              data-ph-capture-attribute-cta={plan.phCta}
              className="btn-primary mt-1 self-start max-md:w-full max-md:justify-center"
            >
              {plan.cta} <ArrowRight size={13} />
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
};
