import { createHash } from "node:crypto";
import { SITE_OVERVIEW_BYTES } from "@/content/site-overview";
import { PRIVACY_POLICY_BYTES } from "@/content/privacy-policy";

const SITE = "https://jaw.id";

const sha256 = (bytes: Uint8Array) =>
  createHash("sha256").update(bytes).digest("hex");

const index = {
  $schema:
    "https://raw.githubusercontent.com/cloudflare/agent-skills-discovery-rfc/main/schema/index.schema.json",
  version: "0.2.0",
  skills: [
    {
      name: "site-overview",
      type: "markdown",
      description:
        "High-level overview of JAW.ID: product pillars, homepage sections, public API, and discovery resources.",
      url: `${SITE}/.well-known/agent-skills/site-overview`,
      sha256: sha256(SITE_OVERVIEW_BYTES),
    },
    {
      name: "privacy-policy",
      type: "markdown",
      description:
        "JAW.ID privacy policy: what data JustaLab collects, how it is used and shared, retention, and user rights.",
      url: `${SITE}/.well-known/agent-skills/privacy-policy`,
      sha256: sha256(PRIVACY_POLICY_BYTES),
    },
  ],
};

export function GET() {
  return new Response(JSON.stringify(index, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
