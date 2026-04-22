import { headers } from "next/headers";
import { getSiteByKey } from "./sites";

// Resolve active site.
// Priority:
// 1) SITE_KEY env var (best for production)
// 2) x-forwarded-host / host mapping (optional future extension)
// 3) fallback to first site config
export async function getCurrentSite() {
  const envSiteKey = process.env.SITE_KEY;
  if (envSiteKey) return getSiteByKey(envSiteKey);

  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "";

  // Optional host -> site mapping. Expand whenever you want.
  if (host.includes("enshrouded")) return getSiteByKey("enshrouded-fast-guides");
  if (host.includes("manorlords")) return getSiteByKey("manor-lords-fast-guides");
  if (host.includes("lastepoch")) return getSiteByKey("last-epoch-fast-guides");

  return getSiteByKey();
}