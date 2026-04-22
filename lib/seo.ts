import type { Metadata } from "next";
import type { Article } from "./content";
import type { SiteConfig } from "./sites";

export function buildSiteMetadata(site: SiteConfig): Metadata {
  const siteUrl = process.env.SITE_URL || "https://example.com";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: site.name,
      template: `%s | ${site.name}`
    },
    description: site.description,
    alternates: {
      canonical: siteUrl
    },
    openGraph: {
      title: site.name,
      description: site.description,
      type: "website",
      url: siteUrl,
      siteName: site.name
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: site.description
    }
  };
}

export function buildArticleMetadata(site: SiteConfig, article: Article): Metadata {
  const siteUrl = process.env.SITE_URL || "https://example.com";
  const url = `${siteUrl}/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url,
      siteName: site.name,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description
    }
  };
}

export function articleJsonLd(site: SiteConfig, article: Article) {
  const siteUrl = process.env.SITE_URL || "https://example.com";
  const url = `${siteUrl}/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Organization",
      name: site.name
    },
    publisher: {
      "@type": "Organization",
      name: site.name
    },
    mainEntityOfPage: url,
    keywords: article.keywords.join(", ")
  };
}

export function websiteJsonLd(site: SiteConfig) {
  const siteUrl = process.env.SITE_URL || "https://example.com";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    description: site.description,
    inLanguage: "en"
  };
}