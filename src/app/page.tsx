import {
  Hero,
  Pillars,
  BuiltFor,
  Features,
  BentoGrid,
  CodeShowcase,
  Dashboard,
  Pricing,
  FAQ,
  Contact
} from '@/components/sections';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Pillars />
      <BuiltFor />
      <Features />
      <BentoGrid />
      <CodeShowcase />
      <Dashboard />
      <Pricing />
      <FAQ />
      <Contact />
    </div>
  );
}
