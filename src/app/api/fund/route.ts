import { NextResponse } from "next/server";
import {
  createPublicClient,
  createWalletClient,
  erc20Abi,
  getAddress,
  http,
  isAddress,
  parseUnits,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import {
  ALREADY_FUNDED_USDC,
  FUND_AMOUNT_USDC,
  FUNDER_FLOOR_USDC,
  USDC_ADDRESS,
} from "@/lib/jaw-demo";

export const runtime = "nodejs";

const TREASURY_PRIVATE_KEY = process.env.TREASURY_PRIVATE_KEY as
  | `0x${string}`
  | undefined;

const rpcUrl = process.env.BASE_SEPOLIA_RPC_URL;

export async function POST(request: Request) {
  if (!TREASURY_PRIVATE_KEY) {
    return NextResponse.json(
      { error: "Funder not configured" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const address = (body as { address?: unknown })?.address;
  if (typeof address !== "string" || !isAddress(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }

  const account = privateKeyToAccount(TREASURY_PRIVATE_KEY);
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(rpcUrl),
  });

  // Skip funding if the account already holds enough to run the demo.
  const recipientBalance = await publicClient.readContract({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [getAddress(address)],
  });
  if (recipientBalance >= parseUnits(ALREADY_FUNDED_USDC, 6)) {
    return NextResponse.json({ skipped: true });
  }

  // Guardrail: refuse below a floor so the demo never half-funds an account.
  const funderBalance = await publicClient.readContract({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address],
  });
  if (funderBalance < parseUnits(FUNDER_FLOOR_USDC, 6)) {
    return NextResponse.json(
      { error: "Demo is out of testnet funds" },
      { status: 503 }
    );
  }

  try {
    const walletClient = createWalletClient({
      account,
      chain: baseSepolia,
      transport: http(rpcUrl),
    });
    const txHash = await walletClient.writeContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: "transfer",
      args: [getAddress(address), parseUnits(FUND_AMOUNT_USDC, 6)],
    });
    return NextResponse.json({ txHash });
  } catch (err) {
    console.error("[/api/fund] transfer failed:", err);
    const message =
      (err as { shortMessage?: string })?.shortMessage ??
      (err instanceof Error ? err.message : "Funding failed");
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
