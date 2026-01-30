"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  Building2,
  Bot,
  CalendarCheck,
  Blocks,
  type LucideIcon,
} from "lucide-react"

interface Tab {
  id: string
  label: string
  icon: LucideIcon
  title: string
  description: string
  useCases: string[]
}

const tabs: Tab[] = [
  {
    id: "neobanks",
    label: "Neobanks",
    icon: CreditCard,
    title: "Neobanks",
    description:
      "Give customers self-custody wallets inside your app. Enable stablecoin payments, instant remittances, and onchain yield under your brand.",
    useCases: [
      "SWIFT-free remittances",
      "FX-free stablecoin payments",
      "Branded crypto exposure",
      "DeFi-backed savings",
    ],
  },
  {
    id: "tradfi enterprise",
    label: "TradFi Enterprise",
    icon: Building2,
    title: "TradFi Enterprise",
    description:
      "Enable programmable payments with 24/7 settlement and direct DeFi access. Move money without stack overhauls, correspondent banks, or delays.",
    useCases: [
      "Instant cross-border settlement",
      "Tokenized assets on global rails",
      "Institutional DeFi access",
      "Yield without custodians",
    ],
  },
  {
    id: "ai-agents",
    label: "AI Agents",
    icon: Bot,
    title: "AI Agent Platforms",
    description:
      "Let agents act on users' behalf within hard limits. Define accessible assets, spending caps, and permission expiration for controlled automation.",
    useCases: [
      "Automated DCA",
      "Trading copilots",
      "Portfolio managers",
      "DeFi strategists",
    ],
  },
  {
    id: "subscriptions",
    label: "Subscriptions",
    icon: CalendarCheck,
    title: "Subscription Services",
    description:
      "Enable users to approve once while you charge on schedule. Set spending limits, define billing cycles, and collect payments without repeated wallet prompts.",
    useCases: [
      "SaaS billing",
      "Content subscriptions",
      "Gaming passes",
      "DeFi vaults",
    ],
  },
  {
    id: "dapps",
    label: "dApps",
    icon: Blocks,
    title: "dApps",
    description:
      "Ship smart accounts without changing your stack. Standard Wagmi hooks and provider interface with enhanced wallet functionality.",
    useCases: [
      "DeFi protocols",
      "Onchain games",
      "Social apps",
      "Creator platforms",
    ],
  },
]

export const BuiltFor = () => {
  return (
    <section
      className="py-16 md:py-28 px-4 md:px-6"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4 font-['Space_Grotesk',sans-serif]">
            Built For
          </h2>
          <p className="text-gray-400 text-base">
            From consumer apps to enterprise solutions, JAW adapts to your
            needs.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="neobanks" className="w-full">
          <TabsList className="w-full h-auto bg-white/[0.05] md:overflow-hidden rounded-lg p-2 px-0 md:p-0 border border-white/10 mb-4 flex overflow-x-auto gap-2 [-webkit-overflow-scrolling:touch] scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex-shrink-0 cursor-pointer h-9 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/20 text-gray-500 hover:text-gray-300 px-4 rounded-md transition-all text-sm whitespace-nowrap flex items-center gap-2"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 md:p-8">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center text-black flex-shrink-0">
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold font-['Space_Grotesk',sans-serif] text-white">
                      {tab.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                    {tab.description}
                  </p>

                  <div>
                    <p className="font-semibold text-sm mb-3 md:mb-4 text-white">
                      Example Use Cases:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 md:gap-y-3">
                      {tab.useCases.map((useCase, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 text-gray-400 text-sm"
                        >
                          <span className="w-2 h-2 bg-white rounded-full flex-shrink-0 mt-1.5" />
                          {useCase}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
