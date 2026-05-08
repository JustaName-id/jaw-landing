const ROBOTS_TXT = `# JAW.ID robots.txt
# Content Signals (https://contentsignals.org/) declare the site's preferences
# regarding automated use of its content. These signals do not grant or revoke
# any legal rights; they express the operator's intent.
Content-Signal: search=yes, ai-input=yes, ai-train=no

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://jaw.id/sitemap.xml
`;

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
