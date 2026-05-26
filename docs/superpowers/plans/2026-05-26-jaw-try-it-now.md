# "Try it now" — JAW AppSpecific demo: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Try it now" CTA in the hero that launches a 3-step modal (Connect → Get USDC from Circle faucet → Send 0.1 USDC) using the JAW SDK in AppSpecific mode on Base Sepolia.

**Architecture:** A wagmi `WagmiProvider` + `QueryClientProvider` wraps the app at the layout level, configured with the JAW connector (`mode: AppSpecific`, `uiHandler: new ReactUIHandler()`). A new Radix `Dialog` component runs a 3-step state machine using wagmi hooks (`useConnect`, `useBalance` for faucet polling, `useSendCalls` for the USDC transfer). Gas is paid in USDC automatically — JAW's `ReactUIHandler` prompts the user to pick the gas token in-dialog, so no manual paymaster config is needed.

**Tech stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, `@jaw.id/wagmi`, `@jaw.id/core`, `@jaw.id/ui`, `wagmi`, `viem`, `@tanstack/react-query`, Radix `Dialog` (already installed via `@radix-ui/react-dialog`).

**Spec:** `docs/superpowers/specs/2026-05-26-jaw-try-it-now-design.md`

**Note on testing:** This repo has no test infrastructure (no Jest, Vitest, Playwright). The plan uses **browser verification** as the test step instead. If tests are wanted later, that's a separate workstream.

---

## Task 1: Declare deps in package.json

The packages exist in `node_modules` but are missing from `package.json`. Fix that so the build is reproducible.

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add dependencies via Bun**

Run from repo root:
```bash
bun add @jaw.id/wagmi@0.1.17 @jaw.id/core@0.4.0 @jaw.id/ui@0.4.2 wagmi@3.6.15 viem@2.51.0 @tanstack/react-query@5.100.14
```

Expected: command succeeds, `package.json` gains the six entries with those exact versions, `bun.lock` updates.

- [ ] **Step 2: Verify the dev server still starts**

Run: `bun dev`
Expected: server starts on http://localhost:3000 with no module-resolution errors. Stop with Ctrl-C.

- [ ] **Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "deps: declare @jaw.id, wagmi, viem, react-query"
```

---

## Task 2: Create demo constants module

A single source of truth for chain, USDC address, recipient, amount, and URL helpers.

**Files:**
- Create: `src/lib/jaw-demo.ts`

- [ ] **Step 1: Write the file**

`src/lib/jaw-demo.ts`:
```typescript
export const CHAIN_ID = 84532;

export const USDC_ADDRESS =
  "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`;

export const DEMO_RECIPIENT = (process.env.NEXT_PUBLIC_DEMO_RECIPIENT ??
  "0x000000000000000000000000000000000000dEaD") as `0x${string}`;

export const SEND_AMOUNT_USDC = "0.1";

export const JAW_API_KEY = process.env.NEXT_PUBLIC_JAW_API_KEY ?? "";

export const isDemoConfigured = (): boolean => JAW_API_KEY.length > 0;

export const faucetUrl = (address: `0x${string}`): string =>
  `https://faucet.circle.com/?address=${address}&network=base-sepolia`;

export const basescanTxUrl = (hash: string): string =>
  `https://sepolia.basescan.org/tx/${hash}`;

export const shortenAddress = (address: string): string =>
  `${address.slice(0, 6)}…${address.slice(-4)}`;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `bunx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/jaw-demo.ts
git commit -m "feat(demo): add jaw-demo constants and helpers"
```

---

## Task 3: Create `.env.local.example`

Documents the env vars an operator needs.

**Files:**
- Create: `.env.local.example`

- [ ] **Step 1: Write the file**

`.env.local.example`:
```
# JAW dashboard API key (https://dashboard.jaw.id).
# Authorize localhost:3000 (dev) and your production domain in the dashboard.
NEXT_PUBLIC_JAW_API_KEY=

# Recipient address for the hero "Try it now" demo send.
# Optional. Defaults to 0x000…dEaD when unset.
NEXT_PUBLIC_DEMO_RECIPIENT=
```

- [ ] **Step 2: Commit**

```bash
git add .env.local.example
git commit -m "docs: env example for JAW demo"
```

---

## Task 4: Create the JAW provider wrapper

Wraps the app in `WagmiProvider` + `QueryClientProvider` with the JAW connector configured for AppSpecific mode. Mounted in `app/layout.tsx`.

**Files:**
- Create: `src/components/providers/jaw-provider.tsx`

- [ ] **Step 1: Write the provider**

`src/components/providers/jaw-provider.tsx`:
```tsx
"use client";

import { useMemo, type ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { jaw } from "@jaw.id/wagmi";
import { Mode } from "@jaw.id/core";
import { ReactUIHandler } from "@jaw.id/ui";
import { JAW_API_KEY } from "@/lib/jaw-demo";

const queryClient = new QueryClient();

const buildConfig = () =>
  createConfig({
    chains: [baseSepolia],
    connectors: [
      jaw({
        apiKey: JAW_API_KEY,
        appName: "JAW",
        preference: {
          mode: Mode.AppSpecific,
          uiHandler: new ReactUIHandler(),
        },
      }),
    ],
    transports: {
      [baseSepolia.id]: http(),
    },
  });

export const JawProvider = ({ children }: { children: ReactNode }) => {
  const config = useMemo(() => buildConfig(), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `bunx tsc --noEmit`
Expected: no errors. If `jaw`, `Mode`, or `ReactUIHandler` are missing types, re-check Task 1 versions.

- [ ] **Step 3: Commit**

```bash
git add src/components/providers/jaw-provider.tsx
git commit -m "feat(demo): JAW wagmi provider in AppSpecific mode"
```

---

## Task 5: Mount the provider in root layout

Wrap `main` (and the rest of the body chrome) in `JawProvider` so the hero dialog can use wagmi hooks.

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add the import and wrap children**

In `src/app/layout.tsx`:

Add to imports:
```tsx
import { JawProvider } from "@/components/providers/jaw-provider";
```

Replace the existing `<body>` content. The current body looks like:
```tsx
<body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
  <JsonLd />
  <WebMcp />
  <a href="#main-content" ...>Skip to main content</a>
  <ToastProvider />
  <Navbar />
  <main id="main-content">{children}</main>
  <Footer />
  <Analytics />
</body>
```

Change to:
```tsx
<body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
  <JsonLd />
  <WebMcp />
  <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black">
    Skip to main content
  </a>
  <ToastProvider />
  <JawProvider>
    <Navbar />
    <main id="main-content">{children}</main>
    <Footer />
  </JawProvider>
  <Analytics />
</body>
```

(`<JsonLd />`, `<WebMcp />`, the skip-link, `<ToastProvider />`, and `<Analytics />` stay outside the provider — they don't need wallet state.)

- [ ] **Step 2: Verify the dev server boots and renders the homepage**

Run: `bun dev`
Open http://localhost:3000. Expected: homepage renders unchanged, no hydration errors in the browser console. Stop with Ctrl-C.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(demo): mount JawProvider in root layout"
```

---

## Task 6: Build the 3-step dialog component

The core of the demo. Uses Radix `Dialog`, wagmi hooks, and the JAW connector.

**Files:**
- Create: `src/components/sections/hero/try-it-now-dialog.tsx`

- [ ] **Step 1: Write the component**

`src/components/sections/hero/try-it-now-dialog.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Check, Copy, ExternalLink, Loader2, X } from "lucide-react";
import {
  useAccount,
  useBalance,
  useCallsStatus,
  useConfig,
  useSendCalls,
} from "wagmi";
import { useConnect } from "@jaw.id/wagmi";
import { encodeFunctionData, erc20Abi, parseUnits } from "viem";
import {
  CHAIN_ID,
  DEMO_RECIPIENT,
  SEND_AMOUNT_USDC,
  USDC_ADDRESS,
  basescanTxUrl,
  faucetUrl,
  isDemoConfigured,
  shortenAddress,
} from "@/lib/jaw-demo";

type Step = "connect" | "faucet" | "send" | "done";

interface TryItNowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TryItNowDialog = ({ open, onOpenChange }: TryItNowDialogProps) => {
  const config = useConfig();
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting, error: connectError } = useConnect();
  const {
    sendCalls,
    data: sendData,
    isPending: isSending,
    error: sendError,
    reset: resetSend,
  } = useSendCalls();

  const [step, setStep] = useState<Step>("connect");
  const [copied, setCopied] = useState(false);

  const balance = useBalance({
    address,
    token: USDC_ADDRESS,
    chainId: CHAIN_ID,
    query: {
      enabled: Boolean(address) && step === "faucet",
      refetchInterval: step === "faucet" ? 4000 : false,
    },
  });

  const callsStatus = useCallsStatus({
    id: sendData?.id ?? "",
    query: {
      enabled: Boolean(sendData?.id),
      refetchInterval: (q) =>
        q.state.data?.status === "success" ? false : 2000,
    },
  });

  const txHash = callsStatus.data?.receipts?.[0]?.transactionHash;

  // connect → faucet
  useEffect(() => {
    if (step === "connect" && isConnected && address) setStep("faucet");
  }, [step, isConnected, address]);

  // faucet → send (when USDC balance becomes positive)
  useEffect(() => {
    if (step === "faucet" && balance.data && balance.data.value > 0n) {
      setStep("send");
    }
  }, [step, balance.data]);

  // send → done (when sendCalls resolves)
  useEffect(() => {
    if (step === "send" && sendData) setStep("done");
  }, [step, sendData]);

  const handleConnect = () => {
    const connector = config.connectors.find((c) => c.id === "jaw");
    if (!connector) return;
    connect({ connector });
  };

  const handleSend = () => {
    sendCalls({
      calls: [
        {
          to: USDC_ADDRESS,
          data: encodeFunctionData({
            abi: erc20Abi,
            functionName: "transfer",
            args: [DEMO_RECIPIENT, parseUnits(SEND_AMOUNT_USDC, 6)],
          }),
        },
      ],
    });
  };

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleTryAgain = () => {
    resetSend();
    setStep("send");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-md:p-5">
          <div className="mb-6 flex items-center justify-between">
            <Dialog.Title className="text-[20px] font-medium tracking-[-0.02em] text-[var(--ink)]">
              Try JAW
            </Dialog.Title>
            <Dialog.Close className="grid size-8 place-items-center rounded-full text-[var(--ink-2)] transition hover:bg-[var(--acc-soft)]">
              <X size={16} />
            </Dialog.Close>
          </div>

          <Dialog.Description className="sr-only">
            Three-step demo: create a passkey account, fund it with testnet USDC, and send a transfer.
          </Dialog.Description>

          <StepIndicator step={step} />

          <div className="mt-6">
            {!isDemoConfigured() && <NotConfigured />}

            {isDemoConfigured() && step === "connect" && (
              <ConnectStep
                onConnect={handleConnect}
                isConnecting={isConnecting}
                error={connectError?.message}
              />
            )}

            {isDemoConfigured() && step === "faucet" && address && (
              <FaucetStep
                address={address}
                copied={copied}
                onCopy={handleCopy}
                isPolling={balance.isFetching}
              />
            )}

            {isDemoConfigured() && step === "send" && (
              <SendStep
                onSend={handleSend}
                isSending={isSending}
                error={sendError?.message}
              />
            )}

            {isDemoConfigured() && step === "done" && (
              <DoneStep txHash={txHash} onTryAgain={handleTryAgain} />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const StepIndicator = ({ step }: { step: Step }) => {
  const steps: { key: Step; label: string }[] = [
    { key: "connect", label: "Connect" },
    { key: "faucet", label: "Get USDC" },
    { key: "send", label: "Send" },
  ];
  const activeIndex =
    step === "done" ? 2 : steps.findIndex((s) => s.key === step);

  return (
    <ol className="flex items-center gap-2">
      {steps.map((s, i) => {
        const isDone = i < activeIndex || step === "done";
        const isActive = i === activeIndex && step !== "done";
        return (
          <li key={s.key} className="flex flex-1 items-center gap-2">
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-medium ${
                isDone
                  ? "bg-[var(--acc)] text-white"
                  : isActive
                  ? "bg-[var(--acc-soft)] text-[var(--acc)]"
                  : "bg-[var(--line)] text-[var(--ink-2)]"
              }`}
            >
              {isDone ? <Check size={12} strokeWidth={2.6} /> : i + 1}
            </span>
            <span
              className={`text-[13px] font-medium ${
                isActive ? "text-[var(--ink)]" : "text-[var(--ink-2)]"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span className="flex-1 border-t border-dashed border-[var(--line)]" />
            )}
          </li>
        );
      })}
    </ol>
  );
};

const NotConfigured = () => (
  <div className="rounded-xl border border-[var(--line)] bg-[var(--acc-soft)]/30 p-4 text-[14px] text-[var(--ink-2)]">
    Demo not configured. Set{" "}
    <code className="rounded bg-[var(--line)] px-1 py-0.5 text-[12px]">
      NEXT_PUBLIC_JAW_API_KEY
    </code>{" "}
    in <code className="rounded bg-[var(--line)] px-1 py-0.5 text-[12px]">.env.local</code> and restart the dev server.
  </div>
);

const ConnectStep = ({
  onConnect,
  isConnecting,
  error,
}: {
  onConnect: () => void;
  isConnecting: boolean;
  error?: string;
}) => (
  <>
    <p className="mb-5 text-[15px] leading-[1.5] text-[var(--ink-2)]">
      Create a passkey-backed smart account. No seed phrase, no extension, no redirect.
    </p>
    <button
      type="button"
      onClick={onConnect}
      disabled={isConnecting}
      className="btn-primary w-full justify-center px-4 py-3 text-[15px] disabled:opacity-60"
    >
      {isConnecting ? (
        <>
          <Loader2 size={14} className="animate-spin" /> Waiting for passkey…
        </>
      ) : (
        <>
          Create your account <ArrowRight size={14} />
        </>
      )}
    </button>
    {error && <p className="mt-3 text-[13px] text-red-500">{error}</p>}
  </>
);

const FaucetStep = ({
  address,
  copied,
  onCopy,
  isPolling,
}: {
  address: `0x${string}`;
  copied: boolean;
  onCopy: () => void;
  isPolling: boolean;
}) => (
  <>
    <p className="mb-4 text-[15px] leading-[1.5] text-[var(--ink-2)]">
      Your smart account is ready. Drop testnet USDC into it from Circle&rsquo;s faucet.
    </p>
    <div className="mb-4 flex items-center justify-between gap-2 rounded-xl border border-[var(--line)] bg-[var(--acc-soft)]/30 px-3 py-2.5">
      <code className="font-mono text-[13px] text-[var(--ink)]">
        {shortenAddress(address)}
      </code>
      <button
        type="button"
        onClick={onCopy}
        className="flex items-center gap-1 text-[12px] font-medium text-[var(--ink-2)] transition hover:text-[var(--ink)]"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
    <a
      href={faucetUrl(address)}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary w-full justify-center px-4 py-3 text-[15px]"
    >
      Open Circle faucet <ExternalLink size={14} />
    </a>
    <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-[var(--ink-2)]">
      {isPolling && <Loader2 size={12} className="animate-spin" />}
      Waiting for testnet USDC to arrive…
    </p>
  </>
);

const SendStep = ({
  onSend,
  isSending,
  error,
}: {
  onSend: () => void;
  isSending: boolean;
  error?: string;
}) => (
  <>
    <p className="mb-4 text-[15px] leading-[1.5] text-[var(--ink-2)]">
      Send {SEND_AMOUNT_USDC} USDC to the demo recipient. JAW will ask you to confirm in this same dialog.
    </p>
    <div className="mb-5 space-y-2 rounded-xl border border-[var(--line)] bg-[var(--acc-soft)]/30 p-3 text-[13px]">
      <div className="flex justify-between gap-2">
        <span className="text-[var(--ink-2)]">Amount</span>
        <span className="font-mono text-[var(--ink)]">
          {SEND_AMOUNT_USDC} USDC
        </span>
      </div>
      <div className="flex justify-between gap-2">
        <span className="text-[var(--ink-2)]">To</span>
        <span className="font-mono text-[var(--ink)]">
          {shortenAddress(DEMO_RECIPIENT)}
        </span>
      </div>
    </div>
    <button
      type="button"
      onClick={onSend}
      disabled={isSending}
      className="btn-primary w-full justify-center px-4 py-3 text-[15px] disabled:opacity-60"
    >
      {isSending ? (
        <>
          <Loader2 size={14} className="animate-spin" /> Confirming…
        </>
      ) : (
        <>
          Send {SEND_AMOUNT_USDC} USDC <ArrowRight size={14} />
        </>
      )}
    </button>
    {error && <p className="mt-3 text-[13px] text-red-500">{error}</p>}
  </>
);

const DoneStep = ({
  txHash,
  onTryAgain,
}: {
  txHash?: string;
  onTryAgain: () => void;
}) => (
  <>
    <div className="mb-5 flex flex-col items-center gap-3 py-4 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-[var(--acc)] text-white">
        <Check size={22} strokeWidth={2.6} />
      </span>
      <p className="text-[15px] font-medium text-[var(--ink)]">Sent.</p>
      {txHash ? (
        <a
          href={basescanTxUrl(txHash)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--acc)] underline-offset-4 hover:underline"
        >
          View on BaseScan <ExternalLink size={12} />
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[13px] text-[var(--ink-2)]">
          <Loader2 size={12} className="animate-spin" /> Waiting for confirmation…
        </span>
      )}
    </div>
    <button
      type="button"
      onClick={onTryAgain}
      className="btn-ghost w-full justify-center px-4 py-3 text-[15px]"
    >
      Try again
    </button>
  </>
);
```

**Notes for the implementer:**
- `useConnect` is imported from `@jaw.id/wagmi`, not from `wagmi` — this is required for JAW capabilities and matches `rules/connect-disconnect.md`.
- `useAccount`, `useBalance`, `useSendCalls`, `useCallsStatus`, `useConfig` are imported from `wagmi`.
- The balance hook is gated on `step === "faucet"` so polling only runs while the user is on that step.
- `sendCalls` returns a *batch* / user-op ID via `data.id`. That's NOT a transaction hash and won't resolve on `sepolia.basescan.org/tx/{id}`. We poll `useCallsStatus` after `sendCalls` resolves and read `data.receipts[0].transactionHash` — that's the real tx hash for the BaseScan link. While we wait, the done step shows a "Waiting for confirmation…" spinner.
- No paymaster config is passed to `sendCalls`. AppSpecific's `ReactUIHandler` shows the gas-token picker automatically per `rules/gas-sponsoring.md` ("ERC-20 Tokens (USDC, etc.) — Built-in — user selects token in dialog").
- All `var(--…)` color tokens are already defined in `globals.css`. `btn-primary` and `btn-ghost` classes are already used elsewhere in the hero.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `bunx tsc --noEmit`
Expected: no errors. If `useSendCalls`, `useBalance`, or `useConnect` types complain, double-check Task 1 versions.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/hero/try-it-now-dialog.tsx
git commit -m "feat(demo): 3-step Try-it-now dialog"
```

---

## Task 7: Wire the CTA into the hero

Convert the hero to a client component, add the "Try it now" button, and open the dialog.

**Files:**
- Modify: `src/components/sections/hero/index.tsx`

- [ ] **Step 1: Rewrite the hero**

Replace the entire contents of `src/components/sections/hero/index.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { TryItNowDialog } from "./try-it-now-dialog";

const checklist = [
  "Invisible web3 infrastructure",
  "Onchain agent & automation",
  "Customizable solutions",
  "No onboarding friction",
];

export const Hero = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="relative flex items-center overflow-hidden border-b border-[var(--line)] min-h-[92vh] max-md:min-h-0 max-md:py-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-no-repeat bg-[right_-4%_center] bg-[length:auto_95%] opacity-[0.14] max-lg:bg-[length:auto_100%] max-lg:bg-center max-lg:opacity-[0.11] max-md:bg-[center_70%] max-md:bg-[length:auto_95%] max-md:opacity-[0.09]"
        style={{ backgroundImage: "url(/assets/hero-bg.png)" }}
      />

      <div className="relative mx-auto w-full max-w-[1260px] px-5 pb-16 pt-32 md:px-6 md:py-30 lg:px-8 lg:py-[140px] max-md:flex max-md:flex-col max-md:items-center">
        <h1 className="m-0 mb-6 max-w-[24ch] font-medium tracking-[-0.04em] leading-[1.05] text-[clamp(40px,7vw,64px)] [text-wrap:balance] max-md:max-w-full max-md:text-center max-md:tracking-[-0.03em] max-md:text-[clamp(28px,8vw,44px)] max-[380px]:text-[26px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="md:whitespace-nowrap">
            Access Onchain <span className="serif">Capabilities</span>
          </span>{" "}
          <br className="max-md:hidden" />
          Without Carrying its <br className="max-md:hidden" />
          <span className="text-[var(--hero-electric)]">Complexity</span>
        </h1>

        <p className="m-0 mb-8 max-w-[560px] text-[20px] leading-[1.55] text-[var(--ink-2)] max-md:text-center max-md:text-base animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          Identity-centric infrastructure for the smart account era, designed to
          absorb wallet and account overhead so products can focus on users, not
          systems.
        </p>

        <ul className="m-0 mb-9 grid list-none p-0 grid-cols-[repeat(2,max-content)] gap-x-10 gap-y-3 max-md:grid-cols-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          {checklist.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2.5 text-[18px] font-medium text-[var(--ink)]"
            >
              <span className="grid place-items-center size-[18px] shrink-0 rounded-full bg-[var(--acc-soft)] text-[var(--acc)]">
                <Check size={10} strokeWidth={2.4} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 max-md:gap-3.5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            className="btn-primary px-[22px] py-[13px] text-[18px] max-md:text-base"
          >
            <Sparkles size={14} /> Try it now
          </button>
          <a
            href="https://dashboard.jaw.id"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-5 py-[13px] text-[18px] max-md:text-base"
          >
            Get Started <ArrowRight size={14} />
          </a>
          <a
            href="#contact"
            className="btn-ghost px-5 py-[13px] text-[18px] max-md:!border-0 max-md:!bg-transparent max-md:px-1.5 max-md:text-base"
          >
            Contact Us
          </a>
        </div>
      </div>

      <TryItNowDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </section>
  );
};
```

**Notes:**
- "Try it now" is the new primary (filled) CTA. "Get Started" is demoted to ghost-style with an arrow so it still reads as actionable but doesn't fight the primary.
- `flex-wrap` lets three buttons wrap gracefully on narrower screens.
- The dialog renders at the end of the section; it's portalled by Radix, so its position in the tree doesn't affect layout.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `bunx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Verify the homepage renders**

Run: `bun dev`. Open http://localhost:3000.

Expected:
- Hero shows three buttons: "Try it now" (filled), "Get Started" (outline/ghost with arrow), "Contact Us" (ghost).
- Clicking "Try it now" opens the dialog.
- Without `NEXT_PUBLIC_JAW_API_KEY` set, the dialog opens to the step indicator and the "Demo not configured" message.
- No console errors.

Stop with Ctrl-C.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/hero/index.tsx
git commit -m "feat(hero): add 'Try it now' CTA + dialog wiring"
```

---

## Task 8: End-to-end browser verification

Walk through the full demo with a real API key.

**Prereqs:** You need a JAW dashboard API key with `localhost:3000` allowlisted. Get one at https://dashboard.jaw.id. Optionally claim Base Sepolia USDC at https://faucet.circle.com (network: Base Sepolia) — you'll redo this during the test, but it confirms the faucet still works.

- [ ] **Step 1: Set the API key**

Create `.env.local` (gitignored — already in `.gitignore` by Next.js default):
```
NEXT_PUBLIC_JAW_API_KEY=jaw_dashboard_key_here
# Leave NEXT_PUBLIC_DEMO_RECIPIENT unset to use the 0xdEaD default,
# or set it to a real testnet address you control.
```

- [ ] **Step 2: Boot the dev server**

Run: `bun dev`
Open http://localhost:3000.

- [ ] **Step 3: Walk the flow**

Confirm each step:

1. Click **Try it now**. Dialog opens, step indicator shows "1 Connect" active.
2. Click **Create your account**. JAW's passkey UI appears inside the dialog (NOT in a popup on `keys.jaw.id`). Complete passkey creation in your OS prompt.
3. Dialog advances to step 2. Your shortened smart-account address appears. Click **Copy** — clipboard now has the full address.
4. Click **Open Circle faucet**. New tab opens to `faucet.circle.com` with `?address=…&network=base-sepolia`. Claim USDC on Base Sepolia. Return to the demo tab.
5. Within ~4–20s, the dialog auto-advances to step 3 once `useBalance` sees the funds.
6. Click **Send 0.1 USDC**. JAW signing prompt appears inside the dialog. If a gas-token picker appears, choose USDC. Approve with your passkey.
7. Dialog advances to "Sent." showing a "Waiting for confirmation…" spinner. Within ~2–10s the spinner is replaced by a **View on BaseScan** link. Click it — `sepolia.basescan.org/tx/{hash}` opens and shows the USDC transfer.
8. Click **Try again** — returns to step 3 with the send button armed (no re-passkey, no re-faucet).
9. Close the dialog via the X. Reopen it — should land on step 3 again (account still connected, balance still positive).

- [ ] **Step 4: If any step fails, do NOT mark this task complete**

Common issues and fixes:
- "Demo not configured" persisting after setting the env var → restart `bun dev`. `NEXT_PUBLIC_*` vars are baked at server start.
- Passkey UI appears on `keys.jaw.id` instead of inside the dialog → `Mode.AppSpecific` or `uiHandler` not wired; recheck Task 4.
- "Domain not authorized" from JAW → add `localhost:3000` to your API key's allowed domains in the JAW dashboard.
- Balance never goes positive → confirm you claimed on **Base Sepolia** (not Sepolia, not Base mainnet), and that the address you funded matches the one in the dialog.
- `sendCalls` errors with "no paymaster" or gas-related → JAW's AppSpecific dialog should offer a gas-token picker. If it doesn't, fall back to the Account-API path described in `docs/superpowers/specs/2026-05-26-jaw-try-it-now-design.md` "Open assumptions" — that's a separate fix outside this plan's scope.

- [ ] **Step 5: Commit the env example (if you edited it during testing)**

If `.env.local.example` needs adjustment based on what you actually used, update it now:
```bash
git add .env.local.example
git commit -m "docs: refine env example after end-to-end test"
```

Otherwise skip this step.

---

## Task 9: Final cleanup pass

- [ ] **Step 1: Run a production build**

Run: `bun run build`
Expected: build succeeds with no type errors. Warnings about `NEXT_PUBLIC_JAW_API_KEY` being inlined are fine — that's by design.

- [ ] **Step 2: Verify no leftover scratch files**

Run: `git status`
Expected: clean. No untracked files in `src/`. `.env.local` is untracked (correct — it's gitignored).

- [ ] **Step 3: Final commit (only if anything stayed unstaged)**

If `git status` shows changes, decide whether they belong in this feature and either commit or revert.

---

## Out-of-scope reminders (do NOT implement in this plan)

These were explicitly excluded in the spec:
- Disconnect button
- ENS subname issuance
- Multi-chain support
- User-chosen send amount
- Session persistence across reloads
- Analytics events on the demo
- Localization
- Unit / integration tests (no test infra in this repo)

If any of these come up during implementation, stop and ask before adding them.
