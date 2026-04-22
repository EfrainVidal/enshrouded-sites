import "./globals.css";
import type { Metadata } from "next";
import { buildSiteMetadata, websiteJsonLd } from "@/lib/seo";
import { getCurrentSite } from "@/lib/site-context";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getCurrentSite();
  return buildSiteMetadata(site);
}

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const site = await getCurrentSite();

  return (
    <html lang="en">
      <body
        style={
          {
            ["--bg" as string]: site.theme.background,
            ["--panel" as string]: site.theme.panel,
            ["--text" as string]: site.theme.text,
            ["--muted" as string]: site.theme.muted,
            ["--accent" as string]: site.theme.accent,
            ["--accent-soft" as string]: site.theme.accentSoft,
            ["--border" as string]: site.theme.border
          } as React.CSSProperties
        }
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd(site))
          }}
        />
        {children}
      </body>
    </html>
  );
}