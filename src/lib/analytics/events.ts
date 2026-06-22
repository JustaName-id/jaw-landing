// Central registry of every custom analytics event the landing page fires.
// Names use SCREAMING_SNAKE_CASE (matching the jan-mono convention) so they
// read cleanly in PostHog. Autocapture handles generic clicks/inputs; these
// are the explicit, named conversion events we want clean funnels on.

export const EVENTS = {
  // Primary conversions
  GET_STARTED_CLICKED: "GET_STARTED_CLICKED",
  CONTACT_CLICKED: "CONTACT_CLICKED",
  DOCS_CLICKED: "DOCS_CLICKED",
  PLAYGROUND_CLICKED: "PLAYGROUND_CLICKED",

  // In-page interactions
  FAQ_TOGGLED: "FAQ_TOGGLED",
  BUILTFOR_TAB_SWITCHED: "BUILTFOR_TAB_SWITCHED",
  CODE_COPIED: "CODE_COPIED",

  // Contact section
  CONTACT_SUBMITTED: "CONTACT_SUBMITTED",
  CONTACT_CHANNEL_CLICKED: "CONTACT_CHANNEL_CLICKED",

  // Hero interactive demo funnel
  HERO_DEMO_STEP_REACHED: "HERO_DEMO_STEP_REACHED",
} as const;

// Footer links and socials are tracked via PostHog autocapture using
// `data-ph-capture-attribute-*` (the footer is a Server Component and cannot
// call track()), so they intentionally have no explicit event here.

export type EventKey = keyof typeof EVENTS;
export type EventName = (typeof EVENTS)[EventKey];

// Where a click originated. Reused across several CTA events.
export type ClickLocation =
  | "navbar"
  | "navbar_mobile"
  | "hero"
  | "pricing"
  | "dashboard"
  | "faq"
  | "code_showcase"
  | "cli"
  | "bento";

// Typed payloads, keyed by event key. track() enforces the right shape.
export interface EventPayloads {
  GET_STARTED_CLICKED: { location: ClickLocation };
  CONTACT_CLICKED: { location: ClickLocation };
  DOCS_CLICKED: { location: ClickLocation };
  PLAYGROUND_CLICKED: { location: ClickLocation };

  FAQ_TOGGLED: { question: string; expanded: boolean };
  BUILTFOR_TAB_SWITCHED: { tab: string; device: "desktop" | "mobile" };
  CODE_COPIED: { snippet: string };

  CONTACT_SUBMITTED: { role: string };
  CONTACT_CHANNEL_CLICKED: { channel: "telegram" | "email" };

  HERO_DEMO_STEP_REACHED: {
    step: "connect" | "fund" | "send" | "done";
    surface: "inline" | "modal";
  };
}

// Compile-time guarantee that every key in EVENTS has a payload defined above.
// If they ever drift, this errors at build time.
type _EnsureAllEventsCovered = {
  [K in EventKey]: EventPayloads[K];
};
