import Link from "next/link";
import type { SiteConfig } from "@/lib/sites";

export function SiteHeader({ site }: { site: SiteConfig }) {
  return (
    <header className="site-header">
      <div className="shell">
        <div className="brand-row">
          <Link href="/" className="brand-link">
            <span className="brand-kicker">{site.game}</span>
            <span className="brand-name">{site.name}</span>
          </Link>

          <nav className="top-nav">
            <Link href="/">Latest Guides</Link>
            <Link href="/#categories">Categories</Link>
            <Link href="/#money-pages">Money Pages</Link>
          </nav>
        </div>

        <div className="hero-card">
          <p className="eyebrow">{site.genre}</p>
          <h1>{site.tagline}</h1>
          <p className="hero-copy">{site.description}</p>
        </div>
      </div>
    </header>
  );
}