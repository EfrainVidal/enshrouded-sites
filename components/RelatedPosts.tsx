import Link from "next/link";
import type { Article } from "@/lib/content";

export function RelatedPosts({ items }: { items: Article[] }) {
  if (!items.length) return null;

  return (
    <section className="related-box">
      <h3>Related Guides</h3>
      <div className="related-grid">
        {items.map((item) => (
          <Link key={item.slug} href={`/${item.slug}`} className="related-item">
            <span className="pill">{item.category}</span>
            <strong>{item.title}</strong>
            <span className="muted">{item.readingMinutes} min read</span>
          </Link>
        ))}
      </div>
    </section>
  );
}