import { NextResponse, type NextRequest } from "next/server";

const MARKDOWN_ROUTES: Record<string, string> = {
  "/": "/markdown/home",
  "/privacy-policy": "/markdown/privacy",
};

function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  // Treat as markdown-preferred when the client explicitly asks for it.
  // We do not infer markdown from generic `*/*` so browsers stay on HTML.
  return accept
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .includes("text/markdown");
}

export function middleware(request: NextRequest) {
  const target = MARKDOWN_ROUTES[request.nextUrl.pathname];
  if (!target) return NextResponse.next();

  if (!prefersMarkdown(request.headers.get("accept"))) {
    const res = NextResponse.next();
    res.headers.set("Vary", "Accept");
    return res;
  }

  const url = request.nextUrl.clone();
  url.pathname = target;
  const res = NextResponse.rewrite(url);
  res.headers.set("Vary", "Accept");
  return res;
}

export const config = {
  matcher: ["/", "/privacy-policy"],
};
