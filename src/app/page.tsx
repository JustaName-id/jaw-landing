import {
  Hero,
  Pillars,
  BuiltFor,
  Features,
  BentoGrid,
  CodeShowcase,
  CLI,
  Dashboard,
  Pricing,
  FAQ,
  Contact,
} from "@/components/sections";
import { HomeFAQJsonLd } from "@/components/seo/json-ld";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HomeFAQJsonLd />
      <Hero />
      <Pillars />
      <BuiltFor />
      <Features />
      <BentoGrid />
      <CodeShowcase />
      <CLI />
      <Dashboard />
      <Pricing />
      <FAQ />
      <Contact />
    </div>
  );
}
