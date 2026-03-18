import type { ReactNode } from "react";

const EipLink = ({
  href,
  children,
}: {
  readonly href: string;
  readonly children: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#135bec] hover:underline"
  >
    {children}
  </a>
);

export const faqAnswerJsxMap: Record<number, ReactNode> = {
  1: (
    <>
      JAW supports all major EVM-compatible chains including Ethereum, Base,
      Arbitrum, Optimism, Linea, and more... with ongoing rollout to any EVM
      chain that supports the account abstraction stack (
      <EipLink href="https://eips.ethereum.org/EIPS/eip-4337">ERC-4337</EipLink>{" "}
      and{" "}
      <EipLink href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</EipLink>
      ). Users maintain a single ENS-based identity across all supported
      networks, with automatic chain detection and routing built in.
    </>
  ),
  2: (
    <>
      Most teams are production-ready within minutes. JAW.ID integrates directly
      with Wagmi or any{" "}
      <EipLink href="https://eips.ethereum.org/EIPS/eip-1193">EIP-1193</EipLink>{" "}
      provider with just a few lines of code. For more complex enterprise
      deployments with custom requirements, our team provides dedicated
      integration support.
    </>
  ),
  3: (
    <>
      Users can pay gas in stablecoins natively, no ETH required. If you want to
      sponsor transactions, bring any{" "}
      <EipLink href="https://eips.ethereum.org/EIPS/eip-7677">EIP-7677</EipLink>{" "}
      compliant paymaster (like Pimlico or Etherspot) and configure it to
      sponsor all transactions, specific chains, or specific calls. JAW handles
      the integration; you control the policies.
    </>
  ),
};
