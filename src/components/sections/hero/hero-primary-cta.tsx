import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { HeroDemo } from "./hero-demo";

// The hero's primary CTA. Both variants render and CSS picks one per breakpoint,
// so the correct button is shown on the very first paint with no post-hydration
// flip. The visibility toggle lives on plain wrapper spans rather than the
// buttons themselves — `.btn-primary` sets its own `display`, which would
// otherwise override Tailwind's `hidden`. The mobile "Try JAW" trigger is only
// interactable below lg, so its modal (and the HeroDemo inside it) never mounts
// on desktop — the inline desktop demo lives in HeroDemoSlot, keeping a single
// live demo at a time.
export const HeroPrimaryCta = () => {
  return (
    <>
      <span className="max-lg:hidden">
        <a
          href="https://dashboard.jaw.id"
          target="_blank"
          rel="noopener noreferrer"
          data-ph-capture-attribute-cta="hero_get_started"
          className="btn-primary px-[22px] py-[13px] text-[18px]"
        >
          Get Started <ArrowRight size={14} />
        </a>
      </span>

      <span className="lg:hidden">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              type="button"
              data-ph-capture-attribute-cta="hero_try_jaw"
              className="btn-primary gap-2.5 px-[22px] py-[13px] text-base font-medium"
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
                Create a passkey-backed smart account, get funded with testnet
                USDC, and send a batched transfer.
              </Dialog.Description>
              <Dialog.Close className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-[var(--ink-2)] transition hover:bg-[var(--acc-soft)]">
                <X size={16} />
              </Dialog.Close>
              <HeroDemo framed={false} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </span>
    </>
  );
};
