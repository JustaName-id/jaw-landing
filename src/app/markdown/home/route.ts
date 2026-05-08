import { SITE_OVERVIEW_MARKDOWN } from "@/content/site-overview";

const HOMEPAGE_MARKDOWN = `# JAW.ID — Identity-Centric Smart Account Infrastructure

Access onchain capabilities without carrying its complexity. JAW.ID is built on
true self-custody with passkey authentication, gasless ENS identity, and
multi-chain support.

${SITE_OVERVIEW_MARKDOWN.split("\n").slice(2).join("\n")}
`;

const HOMEPAGE_BYTES = new TextEncoder().encode(HOMEPAGE_MARKDOWN);

// Approximate token count (GPT-family heuristic: ~4 chars/token).
const tokenCount = Math.ceil(HOMEPAGE_MARKDOWN.length / 4);

export function GET() {
  return new Response(HOMEPAGE_BYTES, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokenCount),
      "Cache-Control": "public, max-age=3600, no-transform",
      "Content-Length": String(HOMEPAGE_BYTES.byteLength),
      Vary: "Accept",
    },
  });
}
