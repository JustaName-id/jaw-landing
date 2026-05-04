"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHead } from "@/components/sectionHead";

type Token = string | { t: string; c?: "k" | "s" | "f" | "p" };

const code: Token[] = [
  { t: "import", c: "k" },
  { t: " { jaw } " },
  { t: "from", c: "k" },
  { t: " '@jaw-id/wagmi'", c: "s" },
  { t: ";" },
  "\n",
  { t: "import", c: "k" },
  { t: " { createConfig, http } " },
  { t: "from", c: "k" },
  { t: " 'wagmi'", c: "s" },
  { t: ";" },
  "\n",
  { t: "import", c: "k" },
  { t: " { mainnet, base } " },
  { t: "from", c: "k" },
  { t: " 'wagmi/chains'", c: "s" },
  { t: ";" },
  "\n\n",
  { t: "const", c: "k" },
  { t: " config " },
  { t: "= " },
  { t: "createConfig", c: "f" },
  { t: "({" },
  "\n  ",
  { t: "chains", c: "p" },
  { t: ": [mainnet, base]," },
  "\n  ",
  { t: "connectors", c: "p" },
  { t: ": [" },
  "\n    ",
  { t: "jaw", c: "f" },
  { t: "({ " },
  { t: "apiKey", c: "p" },
  { t: ": " },
  { t: "'your-api-key'", c: "s" },
  { t: " })," },
  "\n  ],",
  "\n  ",
  { t: "transports", c: "p" },
  { t: ": {" },
  "\n    [mainnet.",
  { t: "id", c: "p" },
  { t: "]: " },
  { t: "http", c: "f" },
  { t: "()," },
  "\n    [base.",
  { t: "id", c: "p" },
  { t: "]: " },
  { t: "http", c: "f" },
  { t: "()," },
  "\n  },",
  "\n});",
];

const palette = {
  k: "#C792EA",
  s: "#C3E88D",
  f: "#82AAFF",
  p: "#F07178",
  default: "#E5E7EB",
};

const fullText = code
  .map((x) => (typeof x === "string" ? x : x.t))
  .join("");

const CodeBlock = () => {
  const [typed, setTyped] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let raf: number;
    let start: number | undefined;
    const total = fullText.length;
    const step = (t: number) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / 2000);
      setTyped(Math.floor(k * total));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  let remaining = typed;
  const out: ReactNode[] = [];
  for (const part of code) {
    if (remaining <= 0) break;
    if (typeof part === "string") {
      const take = part.slice(0, remaining);
      remaining -= take.length;
      out.push(take);
    } else {
      const take = part.t.slice(0, remaining);
      remaining -= take.length;
      out.push(
        <span
          key={out.length}
          style={{ color: palette[part.c ?? "default"] }}
        >
          {take}
        </span>,
      );
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#1E2340] bg-[#0B1020] shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)]">
      <div className="flex items-center border-b border-[#1E2340] px-3.5 py-2.5">
        <div className="flex gap-1.5">
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span
              key={c}
              className="size-2.5 rounded-full"
              style={{ background: c }}
            />
          ))}
        </div>
        <span className="mono flex-1 text-center text-[11px] text-[#94A3B8]">
          wagmi.config.ts
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="mono cursor-pointer rounded-md border border-[#1E2340] bg-transparent px-2 py-1 text-[10px] text-[#CBD5E1]"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre
        className="mono m-0 min-h-[280px] overflow-auto whitespace-pre bg-[#0B1020] px-6 py-5 text-[13px] leading-[1.7] text-[#E5E7EB] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.04)_1px,transparent_0)] [background-size:14px_14px] max-md:px-4 max-md:py-4 max-md:text-[11.5px]"
      >
        {out}
        <span
          className="caret ml-px inline-block h-3.5 w-[7px] align-[-2px]"
          style={{ background: "#C792EA" }}
        />
      </pre>
    </div>
  );
};

export const CodeShowcase = () => {
  return (
    <Section variant="dots">
      <SectionHead
        align="center"
        title={<>Production-Ready in Minutes</>}
        sub="Integrate JAW in just a few lines of code."
      />
      <div className="mx-auto max-w-[720px]">
        <CodeBlock />
      </div>
      <div className="mt-7 flex justify-center gap-3">
        <a
          href="https://docs.jaw.id"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          View Full Documentation <ArrowRight size={14} />
        </a>
      </div>
    </Section>
  );
};
