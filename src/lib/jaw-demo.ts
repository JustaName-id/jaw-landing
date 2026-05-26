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
