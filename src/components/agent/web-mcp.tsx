"use client";

import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type ToolExecuteResult = { content: { type: "text"; text: string }[] };

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: any) => Promise<ToolExecuteResult> | ToolExecuteResult;
};

type ModelContextNavigator = Navigator & {
  modelContext?: {
    provideContext: (ctx: { tools: WebMcpTool[] }) => unknown;
  };
};
/* eslint-enable @typescript-eslint/no-explicit-any */

function ok(text: string): ToolExecuteResult {
  return { content: [{ type: "text", text }] };
}

function scrollToSection(id: string): ToolExecuteResult {
  if (typeof document === "undefined") return ok(`scrolled to #${id}`);
  const el = document.getElementById(id);
  if (!el) return ok(`section #${id} not found on this page`);
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return ok(`scrolled to #${id}`);
}

const tools: WebMcpTool[] = [
  {
    name: "open_contact_form",
    description:
      "Scroll the JAW.ID landing page to the contact form so the user can fill it in.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: () => scrollToSection("contact"),
  },
  {
    name: "open_faq",
    description: "Scroll the JAW.ID landing page to the FAQ section.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: () => scrollToSection("faq"),
  },
  {
    name: "submit_contact_lead",
    description:
      "Submit a contact-form lead to JAW.ID. Use only with explicit, freshly-provided user consent and accurate user-supplied data — never invent contact details. Submit at most once per user interaction; do not retry on success or call in a loop.",
    inputSchema: {
      type: "object",
      required: ["name", "email", "company", "role"],
      properties: {
        name: { type: "string", minLength: 2, maxLength: 100 },
        email: { type: "string", format: "email" },
        company: { type: "string", minLength: 2, maxLength: 100 },
        role: { type: "string", enum: ["developer", "business", "other"] },
        message: { type: "string", maxLength: 1000 },
      },
      additionalProperties: false,
    },
    execute: async (input) => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.success) {
          return ok(
            `Contact submission failed (${res.status}): ${data?.error ?? "unknown error"}`,
          );
        }
        return ok("Contact submitted successfully.");
      } catch (err) {
        return ok(
          `Contact submission errored: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
    },
  },
  {
    name: "open_docs",
    description: "Open the JAW.ID developer documentation in a new tab.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: () => {
      if (typeof window !== "undefined") {
        window.open("https://docs.jaw.id", "_blank", "noopener,noreferrer");
      }
      return ok("opened https://docs.jaw.id");
    },
  },
  {
    name: "open_playground",
    description: "Open the JAW.ID playground in a new tab.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: () => {
      if (typeof window !== "undefined") {
        window.open("https://playground.jaw.id/", "_blank", "noopener,noreferrer");
      }
      return ok("opened https://playground.jaw.id/");
    },
  },
  {
    name: "open_privacy_policy",
    description:
      "Navigate the user to the JAW.ID privacy policy page (/privacy-policy).",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: () => {
      if (typeof window !== "undefined") {
        window.location.assign("/privacy-policy");
      }
      return ok("navigated to /privacy-policy");
    },
  },
  {
    name: "open_dashboard",
    description: "Open the JAW.ID dashboard in a new tab.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: () => {
      if (typeof window !== "undefined") {
        window.open("https://dashboard.jaw.id", "_blank", "noopener,noreferrer");
      }
      return ok("opened https://dashboard.jaw.id");
    },
  },
];

export const WebMcp = () => {
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const nav = navigator as ModelContextNavigator;
    if (!nav.modelContext?.provideContext) return;
    try {
      nav.modelContext.provideContext({ tools });
    } catch {
      // Browser may reject in private mode or if API surface changes.
    }
  }, []);

  return null;
};
