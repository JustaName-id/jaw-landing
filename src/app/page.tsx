import { CoreComponents, Hero, Prototype, UnderTheHood, Vision } from "@/components";
import { TrustedPartnetIntegrations } from "@/components/";

export default function Home() {
  return (
    <div className="flex pt-[10vh] flex-col bg-background w-full h-full">
      <Hero />
      <Vision />
      <UnderTheHood />
      <CoreComponents />
      <TrustedPartnetIntegrations />
      <Prototype />
    </div>
  );
}
