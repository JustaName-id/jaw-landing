import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import { ToastProvider } from "@/components/providers/toast-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "JAW.ID - Identity-Centric Infrastructure for Smart Accounts",
  description: "Access onchain capabilities without carrying its complexity. Built on true self-custody with passkey authentication, gasless ENS identity, and multi-chain support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <ToastProvider />
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-100 text-amber-900 py-2.5 text-xs sm:text-sm font-medium leading-tight overflow-hidden">
          {/* Desktop - Static centered text */}
          <div className="hidden sm:block text-center px-4">
            SDKs rollout on the way. Final audit with Nethermind Security is happening now.
          </div>

          {/* Mobile - Scrolling marquee */}
          <div className="sm:hidden relative">
            <div className="animate-marquee whitespace-nowrap inline-block">
              <span className="inline-block px-4">
                SDKs rollout on the way. Final audit with Nethermind Security is happening now.
              </span>
              <span className="inline-block px-4">
                SDKs rollout on the way. Final audit with Nethermind Security is happening now.
              </span>
            </div>
          </div>
        </div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
