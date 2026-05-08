import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import dashboardImage from "@/../../public/sections/dashboard.png";
import { Section } from "@/components/section";

const features = [
  "Real-time user analytics & engagement tracking",
  "Identity verification status & reputation scores",
  "Cross-chain activity monitoring",
];

export const Dashboard = () => {
  return (
    <Section variant="raise">
      <div className="relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-7 md:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[200px] -right-[200px] size-[600px] rounded-full [background:radial-gradient(circle,rgba(15,23,42,.04),transparent_60%)]"
        />
        <div className="relative">
          <div className="mono mb-[18px] inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
            <span className="h-px w-5 bg-[var(--ink-4)]" aria-hidden />
            The Dashboard
          </div>
          <h2 className="m-0 mb-[18px] text-[clamp(30px,3.6vw,46px)] font-medium leading-[1.05] tracking-[-0.03em]">
            Full Visibility Into Your{" "}
            <span className="serif text-[var(--acc)]">Infrastructure.</span>
          </h2>
          <ul className="m-0 mb-5 grid list-none gap-2.5 p-0">
            {features.map((l) => (
              <li
                key={l}
                className="flex items-center gap-3 text-[15px] text-[var(--ink-2)]"
              >
                <span className="grid size-4 place-items-center rounded-full bg-[var(--acc-soft)] text-[var(--acc)]">
                  <Check size={9} strokeWidth={2.4} />
                </span>
                {l}
              </li>
            ))}
          </ul>
          <p className="m-0 mb-6 max-w-[460px] text-[15px] leading-[1.6] text-[var(--ink-2)]">
            Monitor users, track engagement, and optimize your wallet experience
            from one powerful dashboard.
          </p>
          <div className="max-md:flex max-md:justify-center">
            <a
              href="https://dashboard.jaw.id"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get started <ArrowRight size={14} />
            </a>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[14px] border border-[var(--line)] shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]">
          <Image
            src={dashboardImage}
            alt="JAW.ID analytics dashboard showing real-time user activity, identity verification, and cross-chain monitoring"
            className="block h-auto w-full"
            priority
          />
        </div>
      </div>
    </Section>
  );
};
