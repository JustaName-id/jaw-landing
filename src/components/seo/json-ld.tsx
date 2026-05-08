import { faqs } from "@/lib/data/faq";

const SITE_URL = "https://jaw.id";

const safeJsonLd = (data: Record<string, unknown>): string =>
  JSON.stringify(data).replace(/</g, "\\u003c");

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "JAW.ID",
  legalName: "Torquem Technologies Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/jaw-logo.png`,
  description:
    "Identity-centric smart account infrastructure for Web3, with passkey authentication, gasless ENS identity, and multi-chain support.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "71 Omega Drive, Suite 330",
    addressLocality: "Newark",
    addressRegion: "DE",
    postalCode: "19713-2063",
    addressCountry: "US",
  },
  sameAs: [
    "https://x.com/_JAW_ID",
    "https://github.com/JustaName-id/jaw-mono",
    "https://www.linkedin.com/company/just-a-lab/",
    "https://t.me/+RsFLPfky7-YxZjVk",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JAW.ID",
  url: SITE_URL,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const privacyBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Privacy Policy",
      item: `${SITE_URL}/privacy-policy`,
    },
  ],
};

export const JsonLd = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationSchema) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(webSiteSchema) }}
    />
  </>
);

export const HomeFAQJsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: safeJsonLd(faqPageSchema as Record<string, unknown>),
    }}
  />
);

export const PrivacyBreadcrumbJsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: safeJsonLd(privacyBreadcrumbSchema),
    }}
  />
);
