import { z } from "zod";

// Client-side analytics configuration, read from NEXT_PUBLIC_* env vars.
// These are inlined at build time and are safe to expose to the browser.
const RAW_CLIENT_ENV = {
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
  nodeEnv: process.env.NODE_ENV,
};

const clientEnvSchema = z
  .object({
    // Default to the Next.js reverse proxy (see next.config.ts rewrites).
    posthogHost: z.string().min(1).default("/analytics"),
    posthogKey: z.string().min(1).optional(),
    analyticsEnabled: z.boolean(),
    nodeEnv: z.enum(["development", "production", "test"]),
  })
  .superRefine((data, ctx) => {
    // Fail fast on a real misconfiguration: analytics turned on but no key.
    if (data.analyticsEnabled && !data.posthogKey) {
      ctx.addIssue({
        code: "custom",
        message:
          "NEXT_PUBLIC_POSTHOG_KEY is required when NEXT_PUBLIC_ANALYTICS_ENABLED is true",
        path: ["posthogKey"],
      });
    }
  });

export type ClientEnv = z.infer<typeof clientEnvSchema>;

// Validate at module load, but NEVER throw: this runs in the browser bundle
// where a thrown ZodError has no error boundary and would silently prevent the
// whole client app from booting. On invalid config we warn (dev only) and fall
// back to analytics disabled, so a forgotten/misspelled key degrades to "no
// analytics" rather than "blank page".
const parsed = clientEnvSchema.safeParse(RAW_CLIENT_ENV);

if (!parsed.success && process.env.NODE_ENV !== "production") {
  console.warn(
    "[analytics] Invalid configuration, analytics disabled:",
    parsed.error.issues,
  );
}

export const clientEnv: ClientEnv = parsed.success
  ? parsed.data
  : {
      posthogHost: "/analytics",
      posthogKey: undefined,
      analyticsEnabled: false,
      nodeEnv:
        (process.env.NODE_ENV as "development" | "production" | "test") ??
        "production",
    };
