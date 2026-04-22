import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getArticles } from "@/lib/content";
import { getCurrentSite } from "@/lib/site-context";
import { buildArticleMetadata, articleJsonLd } from "@/lib/seo";
import { getRelatedArticles } from "@/lib/related";
import { RelatedPosts } from "@/components/RelatedPosts";
import { SiteHeader } from "@/components/SiteHeader";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const site = await getCurrentSite();
  const articles = await getArticles(site.key);
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await getCurrentSite();
  const article = await getArticleBySlug(site.key, slug);

  if (!article) {
    return {
      title: "Not found"
    };
  }

  return buildArticleMetadata(site, article);
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const site = await getCurrentSite();
  const article = await getArticleBySlug(site.key, slug);

  if (!article) notFound();

  const allArticles = await getArticles(site.key);
  const related = getRelatedArticles(article, allArticles, 4);

  return (
    <>
      <SiteHeader site={site} />

      <main className="shell">
        <article className="article-shell">
          <div className="meta-row">
            <span className="pill">{article.category}</span>
            <span className="muted">{article.readingMinutes} min read</span>
            <span className="muted">
              Published {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="article-heading">{article.title}</h1>
          <p className="article-description">{article.description}</p>

          <div className="ad-slot">Ad slot • put your display ad here</div>

          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          <div className="ad-slot">Ad slot • second ad goes here</div>

          <RelatedPosts items={related} />
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(site, article))
        }}
      />
    </>
  );
}