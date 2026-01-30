import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/layout/navbar";
import { Footer } from "@/layout/footer";

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
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-100 text-amber-900 text-center py-2.5 px-4 text-xs sm:text-sm font-medium leading-tight">
          <span className="hidden sm:inline">SDKs rollout on the way. Final audit with Nethermind Security is happening now.</span>
          <span className="sm:hidden">Final audit with Nethermind Security in progress.</span>
        </div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
