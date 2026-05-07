import { SITE_OVERVIEW_BYTES } from "@/content/site-overview";

const tokenCount = Math.ceil(SITE_OVERVIEW_BYTES.byteLength / 4);

export function GET() {
  return new Response(SITE_OVERVIEW_BYTES, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokenCount),
      "Cache-Control": "public, max-age=3600, no-transform",
      "Content-Length": String(SITE_OVERVIEW_BYTES.byteLength),
    },
  });
}
