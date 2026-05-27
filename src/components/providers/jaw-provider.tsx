"use client";

import { useMemo, type ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { jaw } from "@jaw.id/wagmi";
import { Mode } from "@jaw.id/core";
import { CHAIN_ID, JAW_API_KEY, JAW_ENS } from "@/lib/jaw-demo";

const queryClient = new QueryClient();

const buildConfig = () =>
  createConfig({
    chains: [baseSepolia],
    connectors: [
      jaw({
        apiKey: JAW_API_KEY,
        appName: "JAW",
        // Report Base Sepolia as the active chain so wagmi/viem can resolve it
        // from the configured chains (otherwise it defaults to mainnet = 1).
        defaultChainId: CHAIN_ID,
        preference: {
          mode: Mode.CrossPlatform,
          // Base Sepolia is a testnet; without this the provider only
          // registers mainnet chains and rejects 84532 ("Chain not supported").
          showTestnets: true,
          // Issue a subname under this domain for each connected account.
          ...(JAW_ENS ? { ens: JAW_ENS } : {}),
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
