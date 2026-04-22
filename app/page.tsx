import { SiteHeader } from "@/components/SiteHeader";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/lib/content";
import { getCurrentSite } from "@/lib/site-context";

export default async function HomePage() {
  const site = await getCurrentSite();
  const articles = await getArticles(site.key);

  return (
    <>
      <SiteHeader site={site} />

      <main className="shell home-grid">
        <section className="article-list">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </section>

        <aside className="stack">
          <section className="money-box" id="money-pages">
            <h2 className="box-title">Money page strategy</h2>
            <ol className="mini-list">
              <li>Publish problem-solving guides first.</li>
              <li>Link related articles aggressively.</li>
              <li>Put ads after the first answer block and near the FAQ.</li>
              <li>Update winners, do not just add more random pages.</li>
            </ol>

            <div className="code-box">
              GET /api/keywords/discover?siteKey={site.key}
            </div>
          </section>

          <section className="discovery-box" id="categories">
            <h2 className="box-title">Best article buckets</h2>
            <ul className="mini-list">
              <li>How to get [resource]</li>
              <li>Best build for [class]</li>
              <li>Fix [crash, FPS, launch, controller]</li>
              <li>Where to find [item / NPC / boss]</li>
              <li>Best early game route</li>
            </ul>
          </section>
        </aside>
      </main>

      <footer className="shell footer">
        {site.name} • Built for high-intent search traffic
      </footer>
    </>
  );
}