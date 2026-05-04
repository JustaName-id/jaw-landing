import {
  Fingerprint,
  Coins,
  Brain,
  CalendarClock,
  Activity,
  Network,
  DraftingCompass,
} from "lucide-react";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHead } from "@/components/sectionHead";

const HandShield = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
    <path d="M14 11V9a2 2 0 1 0-4 0v2" />
    <path d="M10 10.5V5a2 2 0 1 0-4 0v9" />
    <path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5" />
  </svg>
);

const TagIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2 5 9.5v5L12 22l7-7.5v-5z" />
    <path d="m6 8.5 12 7" />
  </svg>
);

interface Feat {
  title: string;
  description: string;
  icon: ReactNode;
}

const feats: Feat[] = [
  {
    title: "One-Tap Onboarding",
    description:
      "Enable users to sign in with Face ID, fingerprint, or device PIN. No seed phrases or passwords required.",
    icon: <Fingerprint size={20} strokeWidth={1.6} />,
  },
  {
    title: "True Self-Custody",
    description:
      "No custodians or key servers. Just the users' device and biometrics standing between their account and assets.",
    icon: <HandShield />,
  },
  {
    title: "Gasless ENS Identity",
    description:
      "Provide users with human-readable names and onchain profiles that work cross-chain. ENS-powered, issued gaslessly at signup.",
    icon: <TagIcon />,
  },
  {
    title: "Pay Gas in Stablecoins",
    description:
      "Let users transact without holding ETH. Sponsor gas fees or enable payment in USDC, USDT, and other supported tokens.",
    icon: <Coins size={20} strokeWidth={1.6} />,
  },
  {
    title: "AI Agent Delegation",
    description:
      "Configure permissions and automations. Set limits on actions, spending amounts, and operational duration.",
    icon: <Brain size={20} strokeWidth={1.6} />,
  },
  {
    title: "Recurrent Payments",
    description:
      "Enable recurring charges without repeated approvals. Set spending limits while automating scheduled billing for users.",
    icon: <CalendarClock size={20} strokeWidth={1.6} />,
  },
  {
    title: "Atomic Batch Transactions",
    description:
      "Bundle multiple operations into single approvals. Improve UX with one confirmation for many executions.",
    icon: <Activity size={20} strokeWidth={1.6} />,
  },
  {
    title: "Multi-Chain EVM Support",
    description:
      "Enable users to operate across supported networks from one account. Automatic chain detection and routing included.",
    icon: <Network size={20} strokeWidth={1.6} />,
  },
  {
    title: "Portable or App-Native Accounts",
    description:
      "Choose between universal accounts that travel across apps or app-scoped accounts confined to your product.",
    icon: <DraftingCompass size={20} strokeWidth={1.6} />,
  },
];

export const BentoGrid = () => {
  return (
    <Section variant="plain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_70%)] [-webkit-mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_70%)]"
      />
      <div className="relative">
        <SectionHead
          align="split"
          title={
            <>
              A stack that adapts to{" "}
              <span className="serif text-[var(--acc)]">your product.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--bg-raise)] md:grid-cols-2 lg:grid-cols-3">
          {feats.map((f) => (
            <article
              key={f.title}
              className={
                // Mobile (1-col): bottom border on all but last
                "stackcell border-[var(--line)] p-6 transition-all duration-200 " +
                "max-md:border-b max-md:last:border-b-0 max-md:px-5 max-md:py-5 " +
                // Tablet (md, 2-col)
                "md:[&:not(:last-child)]:border-b " +
                "md:[&:nth-child(odd):not(:last-child)]:border-r " +
                // Desktop (lg, 3-col): rebuild row borders for 3 cols
                "lg:[&:nth-child(n+7)]:border-b-0 " +
                "lg:[&:nth-child(3n)]:border-r-0 " +
                "lg:[&:nth-child(3n+1):not(:last-child)]:border-r " +
                "lg:[&:nth-child(3n+2)]:border-r"
              }
            >
              <div className="mb-2 flex items-center justify-between gap-3 max-md:mb-2.5 max-md:justify-start">
                <h3 className="m-0 text-base font-semibold tracking-[-0.01em]">
                  {f.title}
                </h3>
                <div className="stack-icon order-none grid size-8 shrink-0 place-items-center rounded-lg border border-[var(--line-2)] bg-[var(--bg-raise-2)] text-[var(--ink)] transition-all duration-300 max-md:order-first max-md:size-7 max-md:rounded-md">
                  {f.icon}
                </div>
              </div>
              <p className="m-0 text-[13.5px] leading-[1.55] text-[var(--ink-2)]">
                {f.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://docs.jaw.id"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Start building in minutes <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </Section>
  );
};
