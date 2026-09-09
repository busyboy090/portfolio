// Single source of truth for the site's absolute URL — read by
// robots.ts, sitemap.ts, and metadataBase in layout.tsx. Falls back
// to localhost so dev/preview builds don't crash without the env var set.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");
