import { Card } from "@/components/card";
import Image from "next/image";

export const TrustedPartnetIntegrations = () => {
  return (
    <div className="flex md:flex-row flex-col justify-center items-center gap-10 py-8 md:py-2.5 px-5 md:px-10 bg-white min-h-screen">
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
            title="Powered by Etherspot"
            upperTitle="4337 Infrastructure"
            description="For bundled User Operations, enabling gasless transactions and enhanced UX"
          />
          <Card
            title="Changelly"
            upperTitle="DeFi Gateway"
            description="Powers instant swap and bridge capabilities across chains"
          />
        </div>
      </div>
      <Image
        src="/sections/partner.webp"
        alt="Changelly Partner"
        width={900}
        height={880}
        className="md:max-w-[50%] w-full aspect-[1.1]"
      />
    </div>
  );
};
