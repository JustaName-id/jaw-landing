"use client";

import { useMemo, type ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { jaw } from "@jaw.id/wagmi";
import { Mode } from "@jaw.id/core";
import { ReactUIHandler } from "@jaw.id/ui";
import { JAW_API_KEY } from "@/lib/jaw-demo";

const queryClient = new QueryClient();

const buildConfig = () =>
  createConfig({
    chains: [baseSepolia],
    connectors: [
      jaw({
        apiKey: JAW_API_KEY,
        appName: "JAW",
        preference: {
          mode: Mode.AppSpecific,
          uiHandler: new ReactUIHandler(),
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
