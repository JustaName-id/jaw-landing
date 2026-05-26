"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Check, Copy, ExternalLink, Loader2, X } from "lucide-react";
import {
  useAccount,
  useCallsStatus,
  useConfig,
  useReadContract,
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

  const [step, setStep] = useState<Step>("connect");
  const [copied, setCopied] = useState(false);

  const balance = useReadContract({
    abi: erc20Abi,
    address: USDC_ADDRESS,
    chainId: CHAIN_ID,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
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

  useEffect(() => {
    if (step === "connect" && isConnected && address) setStep("faucet");
  }, [step, isConnected, address]);

  useEffect(() => {
    if (step === "faucet" && balance.data && balance.data > 0n) {
      setStep("send");
    }
  }, [step, balance.data]);

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
