import { NextResponse } from "next/server";
import { discoverKeywords } from "@/lib/keyword-sources";
import { getSiteByKey } from "@/lib/sites";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteKey = searchParams.get("siteKey") || process.env.SITE_KEY;
  const site = getSiteByKey(siteKey || undefined);

  const keywords = await discoverKeywords({
    game: site.game
  });

  return NextResponse.json({
    site: site.key,
    game: site.game,
    count: keywords.length,
    keywords
  });
}