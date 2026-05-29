"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Fingerprint,
  Loader2,
  LogOut,
  RefreshCw,
} from "lucide-react";
import {
  useAccount,
  useCallsStatus,
  useConfig,
  useDisconnect,
  useReadContract,
  useSendCalls,
} from "wagmi";
import { useConnect } from "@jaw.id/wagmi";
import { encodeFunctionData, erc20Abi, formatUnits, parseUnits } from "viem";
import { JustaName } from "@justaname.id/sdk";
import {
  ALREADY_FUNDED_USDC,
  CHAIN_ID,
  DEMO_RECIPIENT_1,
  DEMO_RECIPIENT_2,
  ENS_CHAIN_ID,
  ENS_RPC_URL,
  JAW_ENS,
  SEND_AMOUNT_1,
  SEND_AMOUNT_2,
  USDC_ADDRESS,
  basescanTxUrl,
  isDemoConfigured,
  shortenAddress,
} from "@/lib/jaw-demo";

type Step = "connect" | "fund" | "send" | "done";

const DASHBOARD_URL = "https://dashboard.jaw.id";
const DOCS_URL = "https://docs.jaw.id";

// Singleton JustaName client for reverse-resolving the connected account's
// subname (address → e.g. "alice.justan.id").
const justaName = JustaName.init({
  // The L1 the ENS domain/resolver lives on (mainnet or Sepolia).
  defaultChainId: ENS_CHAIN_ID,
  ...(JAW_ENS
    ? { ensDomains: [{ chainId: ENS_CHAIN_ID, ensDomain: JAW_ENS }] }
    : {}),
  ...(ENS_RPC_URL
    ? { networks: [{ chainId: ENS_CHAIN_ID, providerUrl: ENS_RPC_URL }] }
    : {}),
});

export const HeroDemo = ({ framed = true }: { framed?: boolean } = {}) => {
  const config = useConfig();
  const { address, isConnected } = useAccount();
  const {
    mutate: connectMutate,
    isPending: isConnecting,
    error: connectError,
  } = useConnect();
  const {
    sendCalls,
    data: sendData,
    isPending: isSending,
    error: sendError,
    reset: resetSend,
  } = useSendCalls();
  const { disconnect } = useDisconnect();

  const [step, setStep] = useState<Step>("connect");
  const [copied, setCopied] = useState(false);
  const [fundTxHash, setFundTxHash] = useState<string>();
  const [fundError, setFundError] = useState<string>();
  const [ensName, setEnsName] = useState<string | null>(null);
  const [recipientNames, setRecipientNames] = useState<{
    r1: string | null;
    r2: string | null;
  }>({ r1: null, r2: null });
  const [fundingStarted, setFundingStarted] = useState(false);

  const balance = useReadContract({
    abi: erc20Abi,
    address: USDC_ADDRESS,
    chainId: CHAIN_ID,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address) && (step === "fund" || step === "send"),
      refetchInterval: step === "fund" ? 3000 : false,
    },
  });

  const balanceDisplay =
    balance.data !== undefined ? formatUnits(balance.data, 6) : null;

  const callsStatus = useCallsStatus({
    id: sendData?.id ?? "",
    query: {
      enabled: Boolean(sendData?.id),
      refetchInterval: (q) =>
        q.state.data?.status === "success" ? false : 2000,
    },
  });

  const txHash = callsStatus.data?.receipts?.[0]?.transactionHash;

  // connect -> fund once the smart account exists
  useEffect(() => {
    if (step === "connect" && isConnected && address) setStep("fund");
  }, [step, isConnected, address]);

  // When the account disconnects, reset the whole flow back to the start.
  // Driven off isConnected (not the click handler) to avoid racing the async
  // disconnect — otherwise the connect->fund effect bounces to a step whose
  // render is gated on `address`, leaving the card blank.
  useEffect(() => {
    if (isConnected) return;
    setStep("connect");
    setFundTxHash(undefined);
    setFundError(undefined);
    setFundingStarted(false);
    resetSend();
  }, [isConnected, resetSend]);

  // Reverse-resolve the connected account's JAW subname (address -> ENS name).
  useEffect(() => {
    if (!isConnected || !address) {
      setEnsName(null);
      return;
    }
    let cancelled = false;
    justaName.subnames
      .reverseResolve({ address, chainId: CHAIN_ID })
      .then((name) => {
        if (!cancelled) setEnsName(name);
      })
      .catch(() => {
        if (!cancelled) setEnsName(null);
      });
    return () => {
      cancelled = true;
    };
  }, [isConnected, address]);

  // Reverse-resolve the (static) demo recipients to their subnames once.
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      justaName.subnames
        .reverseResolve({ address: DEMO_RECIPIENT_1, chainId: CHAIN_ID })
        .catch(() => null),
      justaName.subnames
        .reverseResolve({ address: DEMO_RECIPIENT_2, chainId: CHAIN_ID })
        .catch(() => null),
    ]).then(([r1, r2]) => {
      if (!cancelled) setRecipientNames({ r1, r2 });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Ask the server to drop testnet USDC into the connected account.
  const requestFunding = useCallback(() => {
    if (!address) return;
    setFundingStarted(true);
    setFundError(undefined);
    setFundTxHash(undefined);
    fetch("/api/fund", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error ?? "Funding failed");
        setFundTxHash(data.txHash);
      })
      .catch((err: Error) => setFundError(err.message));
  }, [address]);

  // fund -> send only once the account holds enough USDC to actually run the
  // batched transfer. Anything under the threshold keeps the user on the fund
  // step so the server can top them up.
  useEffect(() => {
    if (
      step === "fund" &&
      balance.data !== undefined &&
      balance.data >= parseUnits(ALREADY_FUNDED_USDC, 6)
    ) {
      setStep("send");
    }
  }, [step, balance.data]);

  // send -> done once the batch is submitted
  useEffect(() => {
    if (step === "send" && sendData) setStep("done");
  }, [step, sendData]);

  const handleConnect = () => {
    const connector = config.connectors.find((c) => c.id === "jaw");
    if (!connector) return;
    connectMutate({ connector });
  };

  const handleSend = () => {
    sendCalls({
      calls: [
        { to: DEMO_RECIPIENT_1, amount: SEND_AMOUNT_1 },
        { to: DEMO_RECIPIENT_2, amount: SEND_AMOUNT_2 },
      ].map(({ to, amount }) => ({
        to: USDC_ADDRESS,
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: "transfer",
          args: [to, parseUnits(amount, 6)],
        }),
      })),
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

  const handleDisconnect = () => disconnect();

  return (
    <div
      className={
        framed
          ? "w-full max-w-[440px] rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-6 shadow-xl shadow-black/[0.04] md:p-7"
          : "w-full"
      }
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-medium tracking-[-0.02em] text-[var(--ink)]">
            Try <span className="text-[var(--hero-electric)]">JAW</span>
          </h2>
          <span className="mt-1 block font-mono text-[13px] text-[var(--ink-2)]">
            {isConnected && address
              ? ensName ?? shortenAddress(address)
              : "An interactive demo"}
          </span>
        </div>
        {isConnected && (
          <button
            type="button"
            onClick={handleDisconnect}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--ink-3)] transition hover:text-[var(--ink)]"
          >
            <LogOut size={14} /> Disconnect
          </button>
        )}
      </div>

      {!isDemoConfigured() ? (
        <Fallback message="The live demo isn't configured here yet." />
      ) : (
        <>
          <StepIndicator step={step} />
          <div className="mt-6">
            {step === "connect" && (
              <ConnectStep
                onConnect={handleConnect}
                isConnecting={isConnecting}
                error={connectError?.message}
              />
            )}
            {step === "fund" && address && (
              <FundStep
                address={address}
                copied={copied}
                onCopy={handleCopy}
                started={fundingStarted}
                onStart={requestFunding}
                fundTxHash={fundTxHash}
                error={fundError}
                onRetry={requestFunding}
              />
            )}
            {step === "send" && (
              <SendStep
                onSend={handleSend}
                isSending={isSending}
                error={sendError?.message}
                r1Name={recipientNames.r1}
                r2Name={recipientNames.r2}
                balance={balanceDisplay}
              />
            )}
            {step === "done" && (
              <DoneStep txHash={txHash} onTryAgain={handleTryAgain} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Fallback = ({ message }: { message: string }) => (
  <div className="flex flex-col gap-4 py-2">
    <p className="text-[15px] leading-[1.5] text-[var(--ink-2)]">{message}</p>
    <a
      href={DASHBOARD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary w-full justify-center px-4 py-3 text-[15px]"
    >
      Get Started <ArrowUpRight size={14} />
    </a>
  </div>
);

const StepIndicator = ({ step }: { step: Step }) => {
  const steps: { key: Step; label: string }[] = [
    { key: "connect", label: "Sign in" },
    { key: "fund", label: "Fund" },
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
          <li
            key={s.key}
            className={`flex items-center gap-2 ${
              i < steps.length - 1 ? "flex-1" : "flex-none"
            }`}
          >
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-medium ${
                isDone
                  ? "bg-[var(--hero-electric)] text-white"
                  : isActive
                  ? "border-2 border-[var(--hero-electric)] text-[var(--hero-electric)]"
                  : "border border-[var(--line-2)] text-[var(--ink-3)]"
              }`}
            >
              {isDone && step !== "done" ? (
                <Check size={12} strokeWidth={2.6} />
              ) : (
                i + 1
              )}
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
    <div className="flex flex-col items-center text-center">
      <div className="relative mx-auto my-4 grid size-[112px] place-items-center">
        <span className="scan-glow absolute inset-4 rounded-full bg-[var(--hero-electric)]/15 blur-md" />
        <span className="scan-ripple absolute inset-3 rounded-full border border-[var(--hero-electric)]/40" />
        <span className="scan-ripple absolute inset-3 rounded-full border border-[var(--hero-electric)]/40 [animation-delay:1.1s]" />
        <span className="absolute inset-5 rounded-full border border-[var(--hero-electric)]/25 bg-[var(--bg)]" />
        <Fingerprint
          size={44}
          strokeWidth={1.5}
          className="relative text-[var(--hero-electric)]"
        />
      </div>
      <h3 className="mt-2 text-[17px] font-medium text-[var(--ink)]">
        Sign in with biometrics
      </h3>
      <p className="mt-1.5 text-[14px] leading-[1.5] text-[var(--ink-2)]">
        Face ID · Touch ID · Passkey. Keys stay on your device.
      </p>
    </div>
    <button
      type="button"
      onClick={onConnect}
      disabled={isConnecting}
      className="btn-primary mt-6 w-full justify-center px-4 py-3 text-[15px] disabled:opacity-60"
    >
      {isConnecting ? (
        <>
          <Loader2 size={14} className="animate-spin" /> Waiting for passkey…
        </>
      ) : (
        <>
          Sign In <ArrowRight size={14} />
        </>
      )}
    </button>
    {error && <p className="mt-3 text-[13px] text-red-500">{error}</p>}
  </>
);

const FundStep = ({
  address,
  copied,
  onCopy,
  started,
  onStart,
  fundTxHash,
  error,
  onRetry,
}: {
  address: `0x${string}`;
  copied: boolean;
  onCopy: () => void;
  started: boolean;
  onStart: () => void;
  fundTxHash?: string;
  error?: string;
  onRetry: () => void;
}) => {
  if (error)
    return (
      <div className="flex flex-col gap-4 py-2">
        <p className="text-[15px] leading-[1.5] text-[var(--ink-2)]">
          Couldn&rsquo;t fund the account: {error}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="btn-primary w-full justify-center px-4 py-3 text-[15px]"
        >
          <RefreshCw size={14} /> Try again
        </button>
      </div>
    );

  return (
    <>
      <p className="mb-4 text-[15px] leading-[1.5] text-[var(--ink-2)]">
        Your smart account is live. We&rsquo;ll fund it with testnet
        USDC so you can try a transfer.
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
      {started ? (
        <>
          <p className="flex items-center gap-2 text-[13px] text-[var(--ink-2)]">
            <Loader2 size={12} className="animate-spin" /> Funding your
            account…
          </p>
          {fundTxHash && (
            <a
              href={basescanTxUrl(fundTxHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--acc)] underline-offset-4 hover:underline"
            >
              View funding tx <ExternalLink size={12} />
            </a>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={onStart}
          className="btn-primary w-full justify-center px-4 py-3 text-[15px]"
        >
          Get Test USDC <ArrowRight size={14} />
        </button>
      )}
    </>
  );
};

const SendStep = ({
  onSend,
  isSending,
  error,
  r1Name,
  r2Name,
  balance,
}: {
  onSend: () => void;
  isSending: boolean;
  error?: string;
  r1Name: string | null;
  r2Name: string | null;
  balance: string | null;
}) => (
  <>
    <div className="mb-3 flex items-center justify-between gap-2">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--ink-3)]">
        Batch transfer · 1 approval
      </p>
      {balance && (
        <p className="text-[11px] font-mono text-[var(--ink-3)]">
          Balance: {balance} USDC
        </p>
      )}
    </div>
    <div className="mb-5 overflow-hidden rounded-xl border border-[var(--line)]">
      <RecipientRow
        gradient="linear-gradient(135deg, #38BDF8, #3B82F6)"
        name={r1Name ?? shortenAddress(DEMO_RECIPIENT_1)}
        amount={SEND_AMOUNT_1}
      />
      <div className="h-px bg-[var(--line)]" />
      <RecipientRow
        gradient="linear-gradient(135deg, #A78BFA, #D946EF)"
        name={r2Name ?? shortenAddress(DEMO_RECIPIENT_2)}
        amount={SEND_AMOUNT_2}
      />
    </div>
    <button
      type="button"
      onClick={onSend}
      disabled={isSending}
      className="btn-primary w-full justify-center px-4 py-3 text-[15px] disabled:opacity-60"
    >
      {isSending ? (
        <>
          <Loader2 size={14} className="animate-spin" /> Sending…
        </>
      ) : (
        <>
          Confirm & Send <ArrowRight size={14} />
        </>
      )}
    </button>
    {error && <p className="mt-3 text-[13px] text-red-500">{error}</p>}
  </>
);

const RecipientRow = ({
  gradient,
  name,
  amount,
}: {
  gradient: string;
  name: string;
  amount: string;
}) => (
  <div className="flex items-center justify-between gap-3 px-3.5 py-3">
    <div className="flex min-w-0 items-center gap-3">
      <span
        className="size-9 shrink-0 rounded-full"
        style={{ background: gradient }}
      />
      <div className="flex min-w-0 flex-col">
        <span className="text-[12px] text-[var(--ink-3)]">To</span>
        <span className="truncate text-[14px] font-medium text-[var(--ink)]">
          {name}
        </span>
      </div>
    </div>
    <div className="flex shrink-0 flex-col items-end">
      <span className="font-mono text-[15px] font-medium text-[var(--ink)]">
        {amount}
      </span>
      <span className="text-[11px] text-[var(--ink-3)]">USDC</span>
    </div>
  </div>
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
      <span className="grid size-12 place-items-center rounded-full bg-[var(--hero-electric)] text-white">
        <Check size={22} strokeWidth={2.6} />
      </span>
      <p className="text-[15px] font-medium text-[var(--ink)]">
        Most teams stitch auth, accounts, and identity together. JAW handles all
        three.
      </p>
      {txHash ? (
        <a
          href={basescanTxUrl(txHash)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--acc)] underline-offset-4 hover:underline"
        >
          View on Basescan <ExternalLink size={12} />
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[13px] text-[var(--ink-2)]">
          <Loader2 size={12} className="animate-spin" /> Waiting for
          confirmation…
        </span>
      )}
    </div>
    <div className="flex flex-col gap-2.5">
      <a
        href={DOCS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full justify-center px-4 py-3 text-[15px]"
      >
        View Documentation <ArrowUpRight size={14} />
      </a>
      <button
        type="button"
        onClick={onTryAgain}
        className="btn-ghost w-full justify-center px-4 py-3 text-[15px]"
      >
        Send Again
      </button>
    </div>
  </>
);
