import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import { ToastProvider } from "@/components/providers/toast-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { WebMcp } from "@/components/agent/web-mcp";
import { JawProvider } from "@/components/providers/jaw-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteTitle = "JAW.ID - Identity-Centric Smart Account Infrastructure";
const siteDescription =
  "Access onchain capabilities without carrying its complexity. Built on true self-custody with passkey authentication, gasless ENS identity, and multi-chain support.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jaw.id"),
  applicationName: "JAW.ID",
  title: siteTitle,
  description: siteDescription,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jaw.id",
    siteName: "JAW.ID",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/assets/og-card.png",
        width: 1200,
        height: 630,
        alt: "JAW.ID",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_JAW_ID",
    title: siteTitle,
    description: siteDescription,
    images: ["/assets/og-card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <JsonLd />
        <WebMcp />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black"
        >
          Skip to main content
        </a>
        <ToastProvider />
        <JawProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </JawProvider>
        <Analytics />
      </body>
    </html>
  );
}
