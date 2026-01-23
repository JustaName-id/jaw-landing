import { CoreComponents, Hero, Prototype, UnderTheHood, Vision } from "@/components";
import { TrustedPartnetIntegrations } from "@/components/";

export default function Home() {
  return (
    <div className="flex pt-[10vh] flex-col bg-background w-full h-full">
      <p className="sr-only">
        Justalab landing page. Learn about our vision, explore the technology under the hood, discover core components, view trusted partners and integrations, and see our prototype in action.
      </p>
      <Hero />
      <Vision />
      <UnderTheHood />
      <CoreComponents />
      <TrustedPartnetIntegrations />
      <Prototype />
    </div>
  );
}
