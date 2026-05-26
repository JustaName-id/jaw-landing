# "Try it now" — JAW AppSpecific demo in Hero

**Date:** 2026-05-26
**Status:** Approved, ready for implementation plan
**Scope:** Add an in-page demo of the JAW SDK in **AppSpecific** mode, launched from a new CTA in the hero section of the marketing landing page.

## Goal

Let a visitor experience JAW end-to-end without leaving the landing page: create a passkey-backed smart account, fund it with testnet USDC, and send a transfer — all inside one modal. This proves the AppSpecific pitch (no redirect to `keys.jaw.id`, no third-party wallet, branded UI) on the same surface that markets it.

## User flow

1. Visitor lands on `/`. Hero shows a new primary CTA: **"Try it now →"**.
2. Click opens a Radix `Dialog` with a 3-step layout.
3. **Step 1 — Connect.** Button: *"Create your account"*. JAW's `ReactUIHandler` renders the passkey prompt inside the dialog. On success, the dialog advances and shows the user's smart account address (shortened, with copy button).
4. **Step 2 — Get USDC.** Dialog shows the user's address and a button: *"Open Circle Faucet"* → opens `https://faucet.circle.com/?address={addr}&network=base-sepolia` in a new tab. While the tab is open, the dialog polls the user's Base Sepolia USDC balance every 4s. When balance > 0, a *"Continue"* button activates.
5. **Step 3 — Send 0.1 USDC.** Dialog shows recipient + amount + "Send" button. Click triggers a single `useSendCalls` with an encoded ERC-20 `transfer` to `DEMO_RECIPIENT`. JAW's signing prompt renders inside the dialog. On success: tx hash + BaseScan link + *"Try again"* button (returns to step 3 with cleared send state — keeps the connected account).

## Architecture

### 1. Provider wrapper — `src/components/providers/jaw-provider.tsx` (new)

Client component (`"use client"`) wrapping `children` in `WagmiProvider` + `QueryClientProvider`. Mounted in `src/app/layout.tsx` so any section can use the JAW connector.

Wagmi config:
- Chains: `[baseSepolia]`
- Transport: `http()` for `baseSepolia`
- Connector: `jaw({ apiKey, appName: 'JAW', preference: { mode: Mode.AppSpecific, uiHandler: new ReactUIHandler() } })`
- `QueryClient` instance memoized at module scope (standard wagmi pattern)

API key is read from `process.env.NEXT_PUBLIC_JAW_API_KEY`. If absent, the provider still mounts but the connector is built with an empty string — downstream UI surfaces a "Demo not configured" state. The provider does not throw at module load (avoid breaking SSR for visitors who don't trigger the dialog).

### 2. Constants — `src/lib/jaw-demo.ts` (new)

```ts
export const CHAIN_ID = 84532; // Base Sepolia
export const USDC_ADDRESS = '0x036CbD53842c5426634e7929541eC2318f3dCF7e' as const;
export const DEMO_RECIPIENT = (process.env.NEXT_PUBLIC_DEMO_RECIPIENT ??
  '0x000000000000000000000000000000000000dEaD') as `0x${string}`;
export const SEND_AMOUNT_USDC = '0.1';
export const FAUCET_URL = (addr: string) =>
  `https://faucet.circle.com/?address=${addr}&network=base-sepolia`;
export const BASESCAN_TX = (hash: string) =>
  `https://sepolia.basescan.org/tx/${hash}`;
```

### 3. The dialog — `src/components/sections/hero/try-it-now-dialog.tsx` (new)

Client component. Single `Dialog` controlled by an `open` prop. Internal `step` state: `'connect' | 'faucet' | 'send' | 'done'`.

Hooks used:
- `useAccount()` from `wagmi` — read `address`, `isConnected`
- `useConnect()` from `@jaw.id/wagmi` — start passkey flow
- `useBalance({ address, token: USDC_ADDRESS, chainId: CHAIN_ID, query: { refetchInterval: step === 'faucet' ? 4000 : false } })` from `wagmi` — poll
- `useSendCalls()` from `wagmi` — send the transfer; also exposes `data.id` to feed into `useCallsStatus` (or we just show the tx hash from the receipt once available)

Send call payload:
```ts
sendCalls({
  calls: [{
    to: USDC_ADDRESS,
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: 'transfer',
      args: [DEMO_RECIPIENT, parseUnits(SEND_AMOUNT_USDC, 6)],
    }),
  }],
  // Pay gas in USDC via JAW paymaster so the user doesn't need testnet ETH
  capabilities: {
    paymasterService: {
      [`0x${CHAIN_ID.toString(16)}`]: {
        url: `${JAW_PAYMASTER_URL}?chainId=${CHAIN_ID}&api-key=${apiKey}`,
        context: { token: USDC_ADDRESS },
      },
    },
  },
});
```

If the `capabilities.paymasterService` shape proves incompatible with `useSendCalls`, the implementation plan will fall back to the Account API (`account.sendCalls`) per `rules/stablecoin-payments.md`. This is the only architectural fallback noted in the spec.

Step transitions:
- `connect` → `faucet`: triggered by `useAccount().isConnected` becoming `true`
- `faucet` → `send`: triggered by `useBalance().data.value > 0n`
- `send` → `done`: triggered by `useSendCalls` `isSuccess`
- `done` → `send` (try again): user clicks "Try again". Clears the previous tx state but keeps the connected account — no re-passkey, no re-faucet.

### 4. Hero modification — `src/components/sections/hero/index.tsx`

- Convert to a client component (`"use client"`) — needs `useState` for `dialogOpen`.
- Add **"Try it now →"** as a new primary CTA. New CTA order on desktop: `[Try it now] [Get Started] [Contact Us]`. Mobile: stacked, Try it now on top.
- "Try it now" uses the existing `.btn-primary` class. "Get Started" stays a primary-looking outline variant to avoid two filled buttons fighting visually — final styling is a small judgement call during implementation, not a spec decision.

## Failure & edge cases

| Case | Behavior |
|------|----------|
| `NEXT_PUBLIC_JAW_API_KEY` missing | Dialog shows "Demo not configured — set NEXT_PUBLIC_JAW_API_KEY" and disables the Connect button. No crash, no console spam. |
| User cancels passkey prompt | `useConnect.error` populated; step stays at `connect`, inline error message under the button. |
| User closes the dialog mid-flow | State persists in component memory while the page is alive. Reopening lands on the step matching current account/balance state. Refresh resets everything. |
| Faucet polling never returns funds | After 5 minutes (~75 polls) the dialog shows "Still no funds? Reopen the faucet" with the link re-surfaced. Polling continues. |
| `sendCalls` errors (e.g., paymaster down) | `useSendCalls.error` populated; step stays at `send`, inline error message. User can retry. |
| User on a network other than Base Sepolia | JAW connector is configured single-chain; the SDK handles chain switching during the call. No explicit chain-switch UI needed. |

## Files

**Add:**
- `docs/superpowers/specs/2026-05-26-jaw-try-it-now-design.md` (this file)
- `.env.local.example`
- `src/lib/jaw-demo.ts`
- `src/components/providers/jaw-provider.tsx`
- `src/components/sections/hero/try-it-now-dialog.tsx`

**Modify:**
- `src/app/layout.tsx` — wrap children with `<JawProvider>`
- `src/components/sections/hero/index.tsx` — add CTA, convert to client component
- `package.json` — declare currently-undeclared deps: `@jaw.id/wagmi`, `@jaw.id/core`, `@jaw.id/ui`, `wagmi`, `viem`, `@tanstack/react-query` (versions match what's already in `node_modules`)

## Out of scope

- Disconnect UI (the dialog flow is single-purpose; closing & reopening is enough)
- ENS subname issuance during connect
- Multi-chain support (Base Sepolia only)
- User-chosen send amount (fixed 0.1 USDC)
- Persistence across reloads (each session starts fresh)
- Analytics events on the demo flow
- Localization

## Environment

`.env.local.example`:
```
# Get an API key at https://dashboard.jaw.id and authorize this domain
NEXT_PUBLIC_JAW_API_KEY=
# Optional. Defaults to 0x000...dEaD if unset.
NEXT_PUBLIC_DEMO_RECIPIENT=
```

## Open assumptions (to verify during implementation)

1. `useSendCalls` accepts a per-call `capabilities.paymasterService` shape as documented for EIP-5792 wallets. If JAW's wagmi connector exposes it differently, fall back to the Account API path (still in-spec — same UX).
2. The JAW dashboard domain allowlist for the provided API key includes `localhost:3000` and the production landing page domain. This is operator config, outside this repo.
3. `ReactUIHandler` mounts its DOM correctly when the host page already has a Radix Dialog open. If z-index or focus-trap collisions appear, the fix is contained to `JawProvider` (e.g., portal target) and does not change the spec.
