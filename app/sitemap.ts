import type { MetadataRoute } from "next";
import { getCurrentSite } from "@/lib/site-context";
import { getArticles } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getCurrentSite();
  const siteUrl = process.env.SITE_URL || "https://example.com";
  const articles = await getArticles(site.key);

  return [
    {
      url: siteUrl,
      lastModified: new Date()
    },
    ...articles.map((article) => ({
      url: `${siteUrl}/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt)
    }))
  ];
}