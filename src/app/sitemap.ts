import type { MetadataRoute } from "next";
import { PRIVACY_POLICY_EFFECTIVE_DATE_ISO } from "@/content/privacy-policy";

const HOMEPAGE_LAST_MODIFIED = new Date("2026-05-07");
const PRIVACY_POLICY_LAST_MODIFIED = new Date(PRIVACY_POLICY_EFFECTIVE_DATE_ISO);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jaw.id",
      lastModified: HOMEPAGE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://jaw.id/privacy-policy",
      lastModified: PRIVACY_POLICY_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
