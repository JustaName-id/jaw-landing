export const CHAIN_ID = 84532;

export const USDC_ADDRESS =
  "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`;

// The hero demo's final step batches two transfers, one to each recipient.
export const DEMO_RECIPIENT_1 = (process.env.NEXT_PUBLIC_DEMO_RECIPIENT_1 ??
  "0x000000000000000000000000000000000000dEaD") as `0x${string}`;

export const DEMO_RECIPIENT_2 = (process.env.NEXT_PUBLIC_DEMO_RECIPIENT_2 ??
  "0x000000000000000000000000000000000000bEEF") as `0x${string}`;

// Amounts sent to each recipient in the batched send step (0.1 + 0.02 total).
export const SEND_AMOUNT_1 = "0.1";
export const SEND_AMOUNT_2 = "0.02";

// Amount the server funder drops into a freshly created account. Covers the
// 0.2 USDC batched send plus headroom for gas.
export const FUND_AMOUNT_USDC = "0.5";

// The funder refuses to send once its USDC balance drops below this floor, so
// the demo fails gracefully ("out of testnet funds") instead of half-funding.
export const FUNDER_FLOOR_USDC = "1";

// Skip funding an account that already holds at least this much USDC — it has
// enough to run the demo, so there's no need to spend more treasury funds.
export const ALREADY_FUNDED_USDC = "1";

export const JAW_API_KEY = process.env.NEXT_PUBLIC_JAW_API_KEY ?? "";

// ENS domain under which JAW issues a subname for each connected account
// (e.g. "justan.id" → "alice.justan.id").
export const JAW_ENS = process.env.NEXT_PUBLIC_JAW_ENS ?? "";

// JustaName resolves subnames on Ethereum L1 only (mainnet=1 or Sepolia=11155111).
// JAW issues + reverse-resolves these subnames on mainnet.
export const ENS_CHAIN_ID = 1;

// RPC endpoint the JustaName SDK uses for ENS_CHAIN_ID. Browser-visible
// (NEXT_PUBLIC_), so use a public or domain-restricted read endpoint. Falls
// back to the SDK default (https://cloudflare-eth.com) when unset.
export const ENS_RPC_URL = process.env.NEXT_PUBLIC_ENS_RPC_URL ?? "";

export const isDemoConfigured = (): boolean => JAW_API_KEY.length > 0;

export const basescanTxUrl = (hash: string): string =>
  `https://sepolia.basescan.org/tx/${hash}`;

export const shortenAddress = (address: string): string =>
  `${address.slice(0, 6)}…${address.slice(-4)}`;
