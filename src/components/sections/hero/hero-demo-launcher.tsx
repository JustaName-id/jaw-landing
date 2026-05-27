"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Sparkles, X } from "lucide-react";
import { HeroDemo } from "./hero-demo";

// Desktop shows the demo inline in the hero. Mobile collapses it to a "Try JAW"
// CTA that opens the same flow in a bottom-sheet modal — a popup-based flow is
// awkward to surface inline on small screens. Mounted as a single instance
// (never both at once) so the demo's effects/funding only ever run once.
export const HeroDemoLauncher = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const isMobile =
    mounted && window.matchMedia("(max-width: 1023px)").matches;

  if (!isMobile) {
    return <HeroDemo />;
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="btn-primary w-full justify-center gap-2.5 px-7 py-4 text-[18px] font-medium"
        >
          <Sparkles size={18} /> Try JAW
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-3xl border-t border-[var(--line)] bg-[var(--bg)] px-5 pb-8 pt-3 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-[var(--line-2)]" />
          <Dialog.Title className="sr-only">Try JAW</Dialog.Title>
          <Dialog.Description className="sr-only">
            Create a passkey-backed smart account, get funded with testnet USDC,
            and send a batched transfer.
          </Dialog.Description>
          <Dialog.Close className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-[var(--ink-2)] transition hover:bg-[var(--acc-soft)]">
            <X size={16} />
          </Dialog.Close>
          <HeroDemo framed={false} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
