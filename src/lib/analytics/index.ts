import posthog from "posthog-js";
import { clientEnv } from "./clientEnv";
import { EVENTS, type EventKey, type EventPayloads } from "./events";

// Singleton PostHog wrapper. Mirrors the jan-mono analytics client: a single
// instance is created lazily in the browser, every method is a no-op when
// analytics is disabled, and event names are looked up from the typed registry.

const analyticsEnabled = clientEnv.analyticsEnabled;

class Analytics {
  constructor() {
    if (typeof window === "undefined" || !analyticsEnabled) return;

    const key = clientEnv.posthogKey;
    if (!key) {
      // Should be unreachable: clientEnv validation disables analytics when the
      // key is missing. Degrade gracefully instead of throwing — this runs at
      // module load in the browser, outside any React error boundary.
      if (clientEnv.nodeEnv !== "production") {
        console.warn(
          "[analytics] PostHog key missing despite analytics enabled — skipping init",
        );
      }
      return;
    }

    posthog.init(key, {
      api_host: clientEnv.posthogHost,
      // Toolbar / session-replay links resolve to the real EU app behind the
      // reverse proxy.
      ui_host: "https://eu.posthog.com",
      // Pageviews are sent manually from AnalyticsProvider so SPA navigations
      // are tracked correctly.
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: true,
      // Defence-in-depth for PII: autocapture never reads input values, but if
      // session replay is ever enabled on the project, mask all typed content
      // (e.g. the contact form's name/email/message) by default.
      session_recording: {
        maskAllInputs: true,
      },
      loaded: (ph) => {
        if (clientEnv.nodeEnv === "development") ph.debug();
      },
    });
  }

  // Fire a typed, named event. props are validated against EventPayloads.
  track<K extends EventKey>(event: K, props: EventPayloads[K]) {
    if (!analyticsEnabled) return;
    posthog.capture(EVENTS[event], props);
  }

  // Escape hatch for PostHog-reserved events like "$pageview".
  track_unsafe(
    event: string,
    props?: Record<string, string | number | boolean>,
  ) {
    if (!analyticsEnabled) return;
    posthog.capture(event, props);
  }

  identify(id: string, props?: Record<string, string>) {
    if (!analyticsEnabled) return;
    posthog.identify(id, props);
  }

  reset() {
    if (!analyticsEnabled) return;
    posthog.reset();
  }
}

let analyticsInstance: Analytics | null = null;

export const getAnalyticsClient = (): Analytics => {
  if (!analyticsInstance) {
    analyticsInstance = new Analytics();
  }
  return analyticsInstance;
};
