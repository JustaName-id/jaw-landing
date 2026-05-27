"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Copy,
  ExternalLink,
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
import { encodeFunctionData, erc20Abi, parseUnits } from "viem";
import { JustaName } from "@justaname.id/sdk";
import {
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
  const fundRequested = useRef(false);

  const balance = useReadContract({
    abi: erc20Abi,
    address: USDC_ADDRESS,
    chainId: CHAIN_ID,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address) && step === "fund",
      refetchInterval: step === "fund" ? 3000 : false,
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
    fundRequested.current = false;
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
    fundRequested.current = true;
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

  // On entering the fund step, fund once. Guarded so React's double-invoked
  // effects don't fund twice.
  useEffect(() => {
    if (step !== "fund" || !address || fundRequested.current) return;
    requestFunding();
  }, [step, address, requestFunding]);

  // fund -> send once the USDC lands
  useEffect(() => {
    if (step === "fund" && balance.data && balance.data > 0n) setStep("send");
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
            Try JAW
          </h2>
          {isConnected && address && ensName && (
            <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--ink-2)]">
              <BadgeCheck size={13} className="text-[var(--acc)]" />
              {ensName}
            </span>
          )}
        </div>
        {isConnected && (
          <button
            type="button"
            onClick={handleDisconnect}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--ink-3)] transition hover:text-[var(--ink)]"
          >
            <LogOut size={11} /> Disconnect
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
      No seed phrase. No extension. No download. Smart accounts with biometric
      signing.
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
  fundTxHash,
  error,
  onRetry,
}: {
  address: `0x${string}`;
  copied: boolean;
  onCopy: () => void;
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
        Your smart account is ready. We&rsquo;re dropping testnet USDC into it —
        no faucet, no waiting around.
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
      <p className="flex items-center gap-2 text-[13px] text-[var(--ink-2)]">
        <Loader2 size={12} className="animate-spin" /> Funding your account…
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
  );
};

const SendStep = ({
  onSend,
  isSending,
  error,
  r1Name,
  r2Name,
}: {
  onSend: () => void;
  isSending: boolean;
  error?: string;
  r1Name: string | null;
  r2Name: string | null;
}) => (
  <>
    <p className="mb-4 text-[15px] leading-[1.5] text-[var(--ink-2)]">
      Batch transfers in one settlement. One approval, both payments land onchain
      together, no repeated signing.
    </p>
    <div className="mb-5 space-y-2 rounded-xl border border-[var(--line)] bg-[var(--acc-soft)]/30 p-3 text-[13px]">
      <Row
        label={`To ${r1Name ?? shortenAddress(DEMO_RECIPIENT_1)}`}
        value={`${SEND_AMOUNT_1} USDC`}
      />
      <Row
        label={`To ${r2Name ?? shortenAddress(DEMO_RECIPIENT_2)}`}
        value={`${SEND_AMOUNT_2} USDC`}
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
          Send <ArrowRight size={14} />
        </>
      )}
    </button>
    {error && <p className="mt-3 text-[13px] text-red-500">{error}</p>}
  </>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-2">
    <span className="text-[var(--ink-2)]">{label}</span>
    <span className="font-mono text-[var(--ink)]">{value}</span>
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
      <span className="grid size-12 place-items-center rounded-full bg-[var(--acc)] text-white">
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
          View on BaseScan <ExternalLink size={12} />
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
