import { PRIVACY_POLICY_BYTES } from "@/content/privacy-policy";

const tokenCount = Math.ceil(PRIVACY_POLICY_BYTES.byteLength / 4);

export function GET() {
  return new Response(PRIVACY_POLICY_BYTES, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokenCount),
      "Cache-Control": "public, max-age=3600, no-transform",
      "Content-Length": String(PRIVACY_POLICY_BYTES.byteLength),
    },
  });
}
