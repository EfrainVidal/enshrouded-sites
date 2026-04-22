import { headers } from "next/headers";
import { getSiteByKey } from "./sites";

export async function getCurrentSite() {
  // BEST FOR VERCEL:
  // each deployment should set SITE_KEY, so this resolves immediately
  if (process.env.SITE_KEY) {
    return getSiteByKey(process.env.SITE_KEY);
  }

  // Optional fallback for local testing only
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "";

  if (host.includes("enshrouded")) return getSiteByKey("enshrouded-fast-guides");
  if (host.includes("manorlords")) return getSiteByKey("manor-lords-fast-guides");
  if (host.includes("lastepoch")) return getSiteByKey("last-epoch-fast-guides");

  return getSiteByKey();
}