import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <div className="meta-row">
        <span className="pill">{article.category}</span>
        <span className="muted">{article.readingMinutes} min read</span>
      </div>

      <h2 className="article-title">
        <Link href={`/${article.slug}`}>{article.title}</Link>
      </h2>

      <p className="article-description">{article.description}</p>
    </article>
  );
}