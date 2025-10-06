import { Card } from "@/components/card";
import Image from "next/image";
import Link from "next/link";

export const TrustedPartnetIntegrations = () => {
  return (
    <div className="flex md:flex-row flex-col justify-center items-center gap-10 py-8 md:py-2.5 px-5 md:px-10 bg-white min-h-[100vh]">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-5xl font-normal text-black leading-[100%]">
            Trusted Partner Integrations
          </h2>
          <p className="text-base font-normal text-black leading-[150%]">
            JAW provides the essential wallet core while integrating
            best-in-class external modules from trusted partners:
          </p>
        </div>
        <div className="w-full flex flex-col gap-2.5">
          <Card
            title={
              <>
                Powered by{" "}
                <Link
                  href="https://etherspot.io/"
                  target="_blank"
                  className="text-black hover:text-gray-700 underline"
                >
                  Etherspot
                </Link>
              </>
            }
            upperTitle="4337 Bundler and Paymaster Infrastructure"
            description="For bundled User Operations, enabling gasless transactions and enhanced UX"
          />
          <Card
            title={
              <>
                <Link
                  href="https://across.to/"
                  target="_blank"
                  className="text-black hover:text-gray-700 underline"
                >
                  Across Protocol
                </Link>
              </>
            }
            upperTitle="Interoperability Powered By Intents"
            description="Powers instant swap and bridge capabilities across chains"
          />
          <Card
            title={
              <>
                <Link
                  href="https://relay.link/"
                  target="_blank"
                  className="text-black hover:text-gray-700 underline"
                >
                  Relay
                </Link>
              </>
            }
            upperTitle="Liquidity Aggregation and Smart Routing"
            description="Optimized token swaps through intelligent routing and deep liquidity aggregation"
          />
        </div>
      </div>
      <Image
        src="/sections/partner.webp"
        alt="Across Partner"
        width={900}
        height={880}
        className="md:max-w-[50%] w-full aspect-[1.1]"
      />
    </div>
  );
};
