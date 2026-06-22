"use client";

import { useState, type ReactNode } from "react";
import {
  CreditCard,
  Building2,
  Bot,
  CalendarCheck,
  Blocks,
  Check,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/section";
import { SectionHead } from "@/components/sectionHead";
import {
  IllNeobank,
  IllTradfi,
  IllAgents,
  IllSubs,
  IllDapps,
} from "./illustrations";
import { StaticMotionSvg } from "@/components/animations/StaticMotionSvg";
import { getAnalyticsClient } from "@/lib/analytics";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  useCases: string[];
  Ill: () => ReactNode;
}

const tabs: Tab[] = [
  {
    id: "neobanks",
    label: "Neobanks",
    icon: CreditCard,
    title: "Neobanks",
    description:
      "Give customers self-custody wallets inside your app. Enable stablecoin payments, instant remittances, and onchain yield under your brand.",
    useCases: [
      "SWIFT-free remittances",
      "FX-free stablecoin payments",
      "Branded crypto exposure",
      "DeFi-backed savings",
    ],
    Ill: IllNeobank,
  },
  {
    id: "tradfi",
    label: "TradFi Enterprise",
    icon: Building2,
    title: "TradFi Enterprise",
    description:
      "Enable programmable payments with 24/7 settlement and direct DeFi access. Move money without stack overhauls, correspondent banks, or delays.",
    useCases: [
      "Instant cross-border settlement",
      "Tokenized assets on global rails",
      "Institutional DeFi access",
      "Yield without custodians",
    ],
    Ill: IllTradfi,
  },
  {
    id: "ai-agents",
    label: "AI Agents",
    icon: Bot,
    title: "AI Agents",
    description:
      "Let agents act on users' behalf within hard limits. Define accessible assets, spending caps, and permission expiration for controlled automation.",
    useCases: [
      "Automated DCA",
      "Trading copilots",
      "Portfolio managers",
      "DeFi strategists",
    ],
    Ill: IllAgents,
  },
  {
    id: "subscriptions",
    label: "Subscriptions",
    icon: CalendarCheck,
    title: "Subscription Services",
    description:
      "Enable users to approve once while you charge on schedule. Set spending limits, define billing cycles, and collect payments without repeated wallet prompts.",
    useCases: [
      "SaaS billing",
      "Content subscriptions",
      "Gaming passes",
      "DeFi vaults",
    ],
    Ill: IllSubs,
  },
  {
    id: "dapps",
    label: "dApps",
    icon: Blocks,
    title: "dApps",
    description:
      "Ship smart accounts without changing your stack. Standard Wagmi hooks and provider interface with enhanced wallet functionality.",
    useCases: [
      "DeFi protocols",
      "Onchain games",
      "Social apps",
      "Creator platforms",
    ],
    Ill: IllDapps,
  },
];

export const BuiltFor = () => {
  const [active, setActive] = useState("neobanks");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const Illust = current.Ill;

  const selectTab = (id: string, device: "desktop" | "mobile") => {
    if (id !== active) {
      getAnalyticsClient().track("BUILTFOR_TAB_SWITCHED", { tab: id, device });
    }
    setActive(id);
  };

  return (
    <Section variant="diag">
      <SectionHead
        align="center"
        title={
          <>
            Built <span className="serif text-[var(--acc)]">for.</span>
          </>
        }
        sub="From consumer apps to enterprise solutions, JAW adapts to your needs."
      />

      {/* Desktop / tablet pill tabs */}
      <div className="mx-auto mb-8 hidden w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-[var(--line)] bg-[var(--bg-raise)] p-1 md:flex">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => selectTab(t.id, "desktop")}
            className={cn(
              "cursor-pointer whitespace-nowrap rounded-full border-none px-5 py-2.5 text-[13.5px] font-medium transition-all duration-200",
              active === t.id
                ? "bg-[var(--ink)] text-[var(--bg)]"
                : "bg-transparent text-[var(--ink-2)] hover:text-[var(--ink)]",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Mobile icon grid selector */}
      <div className="mx-auto mb-6 max-w-full md:hidden">
        <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-[var(--line)] bg-[var(--bg-raise)] p-1.5">
          {tabs.map((t) => {
            const isActive = active === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTab(t.id, "mobile")}
                className={cn(
                  "flex min-h-[56px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[8px] border-none px-1 py-2 transition-all duration-200",
                  isActive
                    ? "bg-[var(--ink)] text-[var(--bg)]"
                    : "bg-transparent text-[var(--ink-2)]",
                )}
              >
                <span
                  className={cn(
                    "inline-flex",
                    isActive ? "opacity-100" : "opacity-75",
                  )}
                >
                  <Icon size={16} strokeWidth={1.6} />
                </span>
                <span className="text-center text-[10.5px] font-medium leading-tight tracking-[-0.005em]">
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={active}
        className="panel-anim grid grid-cols-1 overflow-hidden rounded-[20px] border border-[var(--line)] bg-[#FEFEFE] lg:grid-cols-[1.3fr_1fr]"
      >
        <div className="border-b border-[var(--line)] p-6 md:p-11 lg:border-b-0 lg:border-r">
          <h3 className="m-0 mb-4 text-[26px] font-medium tracking-[-0.02em]">
            {current.title}
          </h3>
          <p className="m-0 mb-7 max-w-[520px] text-base leading-[1.6] text-[var(--ink-2)]">
            {current.description}
          </p>
          <div className="mono mb-3.5 text-[11px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
            Example use cases
          </div>
          <ul className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 md:grid-cols-2">
            {current.useCases.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2.5 text-sm text-[var(--ink)]"
              >
                <span className="grid size-3.5 place-items-center rounded-full bg-[var(--acc-soft)] text-[var(--acc)]">
                  <Check size={9} strokeWidth={2.4} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5 bg-[#FEFEFE] p-6 md:p-11">
          <div className="grid flex-1 min-h-[340px] place-items-center">
            <StaticMotionSvg>
              <Illust />
            </StaticMotionSvg>
          </div>
        </div>
      </div>
    </Section>
  );
};
