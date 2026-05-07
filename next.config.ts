import type { NextConfig } from "next";

const discoveryLinks = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/skills-index"; type="application/json"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

const homeLinkHeader = `${discoveryLinks}, <https://jaw.id>; rel="canonical"`;
const privacyLinkHeader = `${discoveryLinks}, <https://jaw.id/privacy-policy>; rel="canonical"`;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          { key: "Link", value: homeLinkHeader },
          { key: "Vary", value: "Accept" },
        ],
      },
      {
        source: "/privacy-policy",
        headers: [
          { key: "Link", value: privacyLinkHeader },
          { key: "Vary", value: "Accept" },
        ],
      },
      {
        source: "/.well-known/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
