import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";

const watermark =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='130' viewBox='0 0 260 130'><text x='0' y='48' font-family='JetBrains Mono, monospace' font-size='40' font-weight='700' letter-spacing='10' fill='%230F172A'>CLI</text><text x='130' y='108' font-family='JetBrains Mono, monospace' font-size='40' font-weight='700' letter-spacing='10' fill='%230F172A'>CLI</text></svg>";

const chips = [
  "Transact and sign",
  "Automate workflows",
  "Delegate to AI agents",
];

export const CLI = () => {
  return (
    <Section variant="plain" padded={false} className="py-18">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-center scale-[1.4] rotate-[-12deg] bg-repeat opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"
        style={{ backgroundImage: `url("${watermark}")` }}
      />
      <div className="relative">
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-8 rounded-[18px] border border-[var(--line)] bg-[var(--bg-raise)] p-6 md:grid-cols-[1fr_auto] md:p-8 md:px-9">
          <div>
            <div className="mb-3.5 flex flex-wrap items-center gap-4">
              <span className="mono inline-flex items-center rounded-[10px] bg-[var(--acc)] px-4 py-2.5 text-[18px] font-semibold tracking-[0.16em] text-[var(--bg)]">
                CLI
              </span>
              <h3 className="m-0 text-[20px] font-semibold tracking-[-0.01em]">
                The Full SDK, From Your Terminal
              </h3>
            </div>

            <p className="m-0 mb-5 max-w-[780px] text-[15px] leading-[1.6] text-[var(--ink-2)]">
              One install gives you full account access from the terminal. Send
              transactions, sign messages, manage human-readable names, and
              configure permissions. Or start the built-in MCP server and let AI
              agents operate within the boundaries you set.
            </p>

            <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
              <code className="mono inline-flex items-center rounded-lg border border-[var(--line-2)] bg-[var(--bg)] px-3.5 py-2 text-[13px] text-[var(--ink)]">
                <span className="mr-2 text-[var(--ink-3)]">$</span>
                npm install -g @jaw.id/cli
              </code>
            </div>

            <div className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-lg border border-[var(--line-2)] bg-[var(--bg)] px-3 py-1.5 text-[12.5px] font-medium text-[var(--ink-2)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-center">
            <a
              href="https://docs.jaw.id"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-[22px] py-3.5 text-sm"
            >
              Explore the CLI <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};
