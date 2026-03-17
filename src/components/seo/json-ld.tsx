import { faqs } from "@/lib/data/faq";

const SITE_URL = "https://jaw.id";

const safeJsonLd = (data: Record<string, unknown>): string =>
  JSON.stringify(data).replace(/</g, "\\u003c");

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "JAW.ID",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/jaw-logo.png`,
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonLd(faqPageSchema as Record<string, unknown>),
      }}
    />
  </>
);
