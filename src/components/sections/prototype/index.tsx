"use client";

import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import {
  BadgeDollarSign,
  MessageSquareWarning,
  Newspaper,
  WalletMinimal,
} from "lucide-react";

export const Prototype = () => {
  return (
    <div className="flex flex-col justify-center items-center py-28 md:py-2.5 px-5 md:px-10 bg-white min-h-[100vh]">
      <div className="md:max-w-[60%] w-full flex flex-col gap-7">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-5xl font-normal text-black leading-[100%]">
            Test out the prototype!
          </h2>
        </div>
        <div className="flex flex-col text-[#DC2626] gap-2.5">
          <div className="flex flex-row gap-2.5 items-center">
            <MessageSquareWarning color="red" />
            <h3 className="text-3xl font-medium leading-[120%]">
              Prototype Disclaimer
            </h3>
          </div>
          <p className="text-base font-normal leading-[150%]">
            Please note: JustanAccount.sol is currently unaudited. While we've
            deployed to mainnet to provide the complete experience, we strongly
            recommend:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <Card
            icon={<WalletMinimal color="#DC2626" />}
            className="p-5"
            descriptionClassName="!text-[#DC2626]"
            description="Using the wallet with caution"
          />
          <Card
            icon={<BadgeDollarSign color="#DC2626" />}
            className="p-5"
            descriptionClassName="!text-[#DC2626]"
            description="Testing with small amounts only"
          />
          <Card
            icon={<Newspaper color="#DC2626" />}
            className="p-5"
            descriptionClassName="!text-[#DC2626]"
            description="Understanding that contract addresses will change post-audit"
          />
        </div>
        <Button
          variant={"default"}
          className="max-md:mx-auto md:mr-auto"
          onClick={() => window.open("https://forms.gle/6kgszbfA3qF1exV16", "_blank")}
        >
          Request Access
        </Button>
      </div>
    </div>
  );
};
