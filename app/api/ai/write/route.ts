import { NextResponse } from "next/server";
import { generateArticleWithAI } from "@/lib/ai";
import { getSiteByKey } from "@/lib/sites";
import { writeArticle } from "@/lib/content";

type Payload = {
  siteKey?: string;
  keyword?: string;
  category?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;

    if (!body.keyword) {
      return NextResponse.json(
        { error: "Missing keyword" },
        { status: 400 }
      );
    }

    const site = getSiteByKey(body.siteKey || process.env.SITE_KEY);

    const article = await generateArticleWithAI({
      siteName: site.name,
      game: site.game,
      keyword: body.keyword,
      category: body.category || "Guides"
    });

    const slug = writeArticle(site.key, article);

    return NextResponse.json({
      ok: true,
      slug,
      article
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}