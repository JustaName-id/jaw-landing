import { Card } from "@/components/card";
import { CoreCard } from "@/components/coreCard";
import Link from "next/link";
import {
  Blocks,
  Database,
  EarthLock,
  Fingerprint,
  MonitorSmartphone,
  NotebookPen,
  ShieldBan,
  UserCheck,
} from "lucide-react";

export const CoreComponents = () => {
  return (
    <div className="flex flex-col w-full gap-8 pt-1 pb-10 md:py-2.5 px-5 md:px-10 bg-white min-h-[100vh]">
      <h2 className="text-5xl font-normal text-black leading-[100%]">
        Core Components
      </h2>
      <div className="flex flex-col gap-2.5">
        <CoreCard
          title="Identity-First Design"
          description="Your identity is paramount. JAW places ENS at its core, powered by the JustaName infrastructure, ensuring your wallet is as unique and as recognizable as you are."
        />
        <div className="flex flex-col md:flex-row gap-2.5 w-full">
          <CoreCard
            title="Passkey-Powered Authentication"
            description="The signer is your passkey, delivering the optimal balance of exceptional user experience and true self-custody. This Setup provides:"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <Card
                className="col-span-1"
                title="Seamless authentication"
                icon={<Fingerprint color="black" />}
                description={
                  "Using your device’s biometric security (Face ID, Touch ID)"
                }
              />
              <Card
                className="col-span-1"
                title="True self-custody"
                icon={<MonitorSmartphone color="black" />}
                description={"Your private key never leaves your device"}
              />
              <Card
                className="md:col-span-2 col-span-1"
                title="Cross-platform accessibility"
                icon={<EarthLock color="black" />}
                description={"Access your wallet from any compatible device"}
              />
            </div>
          </CoreCard>
          <CoreCard
            title="Smart Account Foundation"
            description={
              <>
                The wallet's foundation is{" "}
                <Link
                  href="https://github.com/JustaName-id/justanaccount"
                  target="_blank"
                  className="text-black hover:text-gray-700 underline"
                >
                  JustanAccount.sol
                </Link>
                , seamlessly integrated with the toJustanAccount single-file extension. This powerful combination delivers:
              </>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <Card
                className="col-span-1"
                title="Cross-chain consistency"
                icon={<Blocks color="black" />}
                description={
                  "Through CREATE2 deployments for new accounts, using your passkey's public key as salt to generate the same pre-computed wallet address across all supported EVM chains"
                }
              />
              <Card
                className="col-span-1"
                title="Enhanced security options "
                icon={<ShieldBan color="black" />}
                description={
                  "With planned passcode module support for additional protection layers"
                }
              />
              <div className="flex flex-col gap-2.5 p-5 bg-secondary rounded-[6px] col-span-1 md:col-span-2">
                <p className="text-xl font-normal leading-[140%] text-black">
                  EIP-7702 compatibility
                </p>
                <p className="text-base font-normal leading-[150%] text-black">
                  Enabling existing EOAs to leverage advanced account features
                  through delegation
                </p>
              </div>
            </div>
          </CoreCard>
        </div>
        <CoreCard
          title="Advanced Security Architecture"
          description="JustanAccount.sol implements state-of-the-art security measures:"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <Card
              className="col-span-1"
              title="Sophisticated signature validation"
              icon={<Blocks color="black" />}
              description={
                "With ERC-7739 nested EIP-712 support, eliminating signature replay attacks across accounts"
              }
            />
            <Card
              className="col-span-1"
              title="Flexible authentication"
              icon={<UserCheck color="black" />}
              description={
                "Supporting both traditional ECDSA addresses (20 bytes) and WebAuthn public keys (64 bytes)"
              }
            />
            <Card
              className="col-span-1"
              title="User-friendly transaction signing"
              icon={<NotebookPen color="black" />}
              description={
                "Maintaining readable typed data in wallet interfaces"
              }
            />
            <Card
              className="col-span-1"
              title="Collision-resistant storage"
              icon={<Database color="black" />}
              description={
                "Using Namespaced Storage (ERC-7201) for safe delegation usage"
              }
            />
          </div>
        </CoreCard>
      </div>
    </div>
  );
};
