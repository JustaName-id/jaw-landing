const SITE = "https://jaw.id";

const linkset = {
  linkset: [
    {
      anchor: `${SITE}/api/contact`,
      "service-doc": [
        {
          href: `${SITE}/docs/api/contact`,
          type: "text/html",
          title: "Contact API documentation",
        },
      ],
      "service-meta": [
        {
          href: `${SITE}/.well-known/api-catalog`,
          type: "application/linkset+json",
        },
      ],
    },
  ],
};

export function GET() {
  return new Response(JSON.stringify(linkset, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
