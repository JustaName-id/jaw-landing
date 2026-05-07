export const SITE_OVERVIEW_MARKDOWN = `# JAW.ID — Site Overview

JAW.ID is identity-centric smart account infrastructure for Web3. The product
gives users access to onchain capabilities without exposing them to wallet
complexity. Core building blocks:

- **True self-custody** with passkey authentication (no seed phrases).
- **Gasless ENS identity** for human-readable accounts.
- **Multi-chain support** across major EVM networks.

## Sections on the homepage

- \`#hero\` — Product positioning and primary calls-to-action.
- \`#pillars\` — Core product pillars.
- \`#built-for\` — Target audiences (consumer apps, wallets, infra).
- \`#features\` — Feature highlights.
- \`#bento\` — Visual feature grid.
- \`#code\` — Code/SDK examples.
- \`#cli\` — CLI experience.
- \`#dashboard\` — Dashboard preview.
- \`#pricing\` — Pricing plans.
- \`#faq\` — Frequently asked questions.
- \`#contact\` — Contact form (POSTs to /api/contact).

## Public API

- \`POST /api/contact\` — Submits a contact-form lead. Required fields:
  \`name\`, \`email\`, \`company\`, \`role\` (one of \`developer\` | \`business\` |
  \`other\`), optional \`message\`. Returns \`{ success: boolean }\` JSON.

## Other pages

- \`/privacy-policy\` — Privacy Policy (also available as markdown via
  \`Accept: text/markdown\`).

## Discovery resources

- \`/sitemap.xml\` — Sitemap.
- \`/robots.txt\` — Crawl rules + Content Signals.
- \`/.well-known/api-catalog\` — RFC 9727 API catalog.
- \`/.well-known/agent-skills/index.json\` — Agent Skills index.

## Content usage

The robots.txt declares: \`Content-Signal: search=yes, ai-input=yes,
ai-train=no\`. Search indexing and per-request agent input are welcome;
training corpus inclusion is not.
`;

export const SITE_OVERVIEW_BYTES = new TextEncoder().encode(
  SITE_OVERVIEW_MARKDOWN,
);
