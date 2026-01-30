import { Card, CardContent } from "@/components/ui/card";
import { Brain, Fingerprint, BadgeDollarSign, Dna } from "lucide-react";

// Custom CalendarClock icon
const CalendarClock = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 7.5V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H8.5M16 2V6M8 2V6M3 10H8M17.5 17.5L16 16.3V14M22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16Z" />
  </svg>
);

// Custom DraftingCompass icon
const DraftingCompass = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21L11.02 6.73999M12.9902 6.73999L14.9202 10.18M19 12C15.13 16 8.87 16 5 12M20.9998 20.9999L18.8398 17.1599M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5Z" />
  </svg>
);

// Custom BicepsFlexed icon
const BicepsFlexed = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.4092 13.017C12.865 11.9604 13.6714 11.0934 14.6921 10.5622C15.7129 10.031 16.8857 9.86815 18.0126 10.1011C19.1395 10.3341 20.1515 10.9487 20.8779 11.8411C21.6044 12.7336 22.0008 13.8493 22.0002 15C22.0002 18.866 18.0002 22 13.0002 22C8.92321 22 4.84721 21.18 2.62921 19.538C2.20321 19.222 1.99821 18.706 2.00921 18.176C2.11821 12.723 2.62721 2 10.0002 2C10.7959 2 11.5589 2.31607 12.1215 2.87868C12.6841 3.44129 13.0002 4.20435 13.0002 5C13.0002 5.53043 12.7895 6.03914 12.4144 6.41421C12.0393 6.78929 11.5306 7 11.0002 7C9.89521 7 9.36021 6.556 9.00021 6M15.0003 14.0001C14.3967 13.5472 13.6986 13.2368 12.958 13.0921C12.2175 12.9474 11.4538 12.9722 10.7242 13.1646C9.99461 13.357 9.31802 13.712 8.74514 14.2031C8.17226 14.6941 7.71795 15.3085 7.41626 16.0001M9.96424 6.82495C8.01924 7.97695 9.50024 13 8.00024 15" />
  </svg>
);

// Custom Boxes icon
const Boxes = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19L8.03 21.38C7.71894 21.5669 7.36289 21.6656 7 21.6656C6.63711 21.6656 6.28106 21.5669 5.97 21.38L2.97 19.58C2.67476 19.4026 2.43033 19.152 2.26039 18.8524C2.09045 18.5528 2.00075 18.2144 2 17.87V14.63C2.00075 14.2856 2.09045 13.9472 2.26039 13.6476C2.43033 13.348 2.67476 13.0974 2.97 12.92L7 10.5M12 19V13.5M12 19L15.97 21.38C16.2811 21.5669 16.6371 21.6656 17 21.6656C17.3629 21.6656 17.7189 21.5669 18.03 21.38L21.03 19.58C21.3252 19.4026 21.5697 19.152 21.7396 18.8524C21.9096 18.5528 21.9992 18.2144 22 17.87V14.63C21.9992 14.2856 21.9096 13.9472 21.7396 13.6476C21.5697 13.348 21.3252 13.0974 21.03 12.92L17 10.5M12 13.5L7 10.5M12 13.5L7.00001 16.4999M12 13.5L17 10.5M12 13.5L17 16.5M12 13.5L11.9998 7.9999M7 10.5V6.13009C7.00075 5.78566 7.09045 5.44727 7.26039 5.14768C7.43033 4.84809 7.67476 4.59747 7.97 4.42009L10.97 2.62009C11.2811 2.43321 11.6371 2.33447 12 2.33447C12.3629 2.33447 12.7189 2.43321 13.03 2.62009L16.03 4.42009C16.3252 4.59747 16.5697 4.84809 16.7396 5.14768C16.9096 5.44727 16.9992 5.78566 17 6.13009V10.5M7.00001 16.4999L2.26001 13.6499M7.00001 16.4999L7 21.67M17 16.5L21.74 13.6499M17 16.5V21.67M11.9998 7.9999L7.25977 5.1499M11.9998 7.9999L16.74 5.1499" />
  </svg>
);

// Custom ENS Mark icon
const EnsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 28" fill="currentColor">
    <path d="M11.6861 0.339758L4.1387 13.0093C4.07951 13.1087 3.942 13.1197 3.86857 13.0309C3.20413 12.2259 0.728741 8.80177 3.79178 5.68084C6.58682 2.833 10.1469 0.802536 11.4663 0.100768C11.616 0.0211492 11.7737 0.192691 11.6861 0.339758Z" />
    <path d="M11.2685 27.9254C11.4191 28.033 11.6047 27.8495 11.5038 27.6929C9.818 25.077 4.2141 16.3734 3.44 15.0668C2.67646 13.7781 1.17471 11.6364 1.04943 9.80405C1.03693 9.62112 0.788996 9.58398 0.726627 9.75601C0.62604 10.0334 0.518952 10.3646 0.419146 10.7428C-0.840817 15.5178 0.989035 20.5849 4.96309 23.4227L11.2685 27.9255V27.9254Z" />
    <path d="M12.3054 27.7001L19.8528 15.0306C19.912 14.9312 20.0496 14.9202 20.123 15.0091C20.7874 15.8139 23.2628 19.2382 20.1997 22.3591C17.4047 25.2069 13.8446 27.2374 12.5252 27.9391C12.3755 28.0188 12.2178 27.8472 12.3054 27.7001Z" />
    <path d="M12.7308 0.112775C12.5802 0.00521563 12.3946 0.188646 12.4956 0.345291C14.1814 2.96118 19.7853 11.6649 20.5593 12.9713C21.3229 14.2601 22.8246 16.4018 22.95 18.2341C22.9624 18.417 23.2104 18.4541 23.2728 18.2821C23.3733 18.0047 23.4804 17.6737 23.5802 17.2953C24.8401 12.5203 23.0103 7.45335 19.0363 4.61547L12.7308 0.112775Z" />
  </svg>
);

interface Feature {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Fingerprint,
    title: "One-Tap Onboarding",
    description:
      "Enable users to sign in with Face ID, fingerprint, or device PIN. No seed phrases or passwords required.",
  },
  {
    icon: BicepsFlexed,
    title: "True Self-Custody",
    description:
      "No custodians or key servers. Just the users' device and biometrics standing between their account and assets.",
  },
  {
    icon: EnsIcon,
    title: "Gasless ENS Identity",
    description:
      "Provide users with human-readable names and onchain profiles that work cross-chain. ENS-powered, issued gaslessly at signup.",
  },
  {
    icon: BadgeDollarSign,
    title: "Pay Gas in Stablecoins",
    description:
      "Let users transact without holding ETH. Sponsor gas fees or enable payment in USDC, USDT, and other supported tokens.",
  },
  {
    icon: Brain,
    title: "AI Agent Delegation",
    description:
      "Configure permissions and automations. Set limits on actions, spending amounts, and operational duration.",
  },
  {
    icon: CalendarClock,
    title: "Recurrent Payments",
    description:
      "Enable recurring charges without repeated approvals. Set spending limits while automating scheduled billing for users.",
  },
  {
    icon: Dna,
    title: "Atomic Batch Transactions",
    description:
      "Bundle multiple operations into single approvals. Improve UX with one confirmation for many executions.",
  },
  {
    icon: Boxes,
    title: "Multi-Chain EVM Support",
    description:
      "Enable users to operate across supported networks from one account. Automatic chain detection and routing included.",
  },
  {
    icon: DraftingCompass,
    title: "Portable or App-Native Accounts",
    description:
      "Choose between universal accounts that travel across apps or app-scoped accounts confined to your product.",
  },
];

export const BentoGrid = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-6 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-md text-[#0a0a0a]">
            A Stack That Adapts to Your Product
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-white border-gray-200 rounded-xl hover:shadow-md transition-shadow py-0 gap-0"
              >
                <CardContent className="p-4 md:p-5">
                  <div className="flex gap-3 md:gap-4">
                    <div className="text-gray-700 shrink-0">
                      <Icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm md:text-base">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
