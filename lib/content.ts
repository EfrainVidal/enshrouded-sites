import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { slugify } from "./slug";

export type ArticleFrontmatter = {
  title: string;
  description: string;
  keywords: string[];
  category: string;
  publishedAt: string;
  updatedAt?: string;
  heroTitle?: string;
  heroSubtitle?: string;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  siteKey: string;
  markdown: string;
  html: string;
  readingMinutes: number;
};

export function getContentDir(siteKey: string) {
  return path.join(process.cwd(), "content", siteKey);
}

export function ensureContentDir(siteKey: string) {
  const dir = getContentDir(siteKey);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export async function markdownToHtml(markdown: string) {
  const processed = await remark().use(gfm).use(html).process(markdown);
  return processed.toString();
}

export function estimateReadingMinutes(markdown: string) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export async function getArticles(siteKey: string): Promise<Article[]> {
  const dir = getContentDir(siteKey);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
  const articles: Article[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as ArticleFrontmatter;
    const articleHtml = await markdownToHtml(content);

    articles.push({
      slug: file.replace(/\.md$/, ""),
      siteKey,
      title: fm.title,
      description: fm.description,
      keywords: fm.keywords ?? [],
      category: fm.category ?? "Guides",
      publishedAt: fm.publishedAt ?? new Date().toISOString(),
      updatedAt: fm.updatedAt,
      heroTitle: fm.heroTitle,
      heroSubtitle: fm.heroSubtitle,
      markdown: content,
      html: articleHtml,
      readingMinutes: estimateReadingMinutes(content)
    });
  }

  return articles.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export async function getArticleBySlug(siteKey: string, slug: string) {
  const filePath = path.join(getContentDir(siteKey), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as ArticleFrontmatter;

  return {
    slug,
    siteKey,
    title: fm.title,
    description: fm.description,
    keywords: fm.keywords ?? [],
    category: fm.category ?? "Guides",
    publishedAt: fm.publishedAt ?? new Date().toISOString(),
    updatedAt: fm.updatedAt,
    heroTitle: fm.heroTitle,
    heroSubtitle: fm.heroSubtitle,
    markdown: content,
    html: await markdownToHtml(content),
    readingMinutes: estimateReadingMinutes(content)
  } satisfies Article;
}

export function writeArticle(siteKey: string, article: {
  title: string;
  description: string;
  keywords: string[];
  category: string;
  body: string;
}) {
  const dir = ensureContentDir(siteKey);
  const slug = slugify(article.title);

  const frontmatter = [
    "---",
    `title: "${escapeYaml(article.title)}"`,
    `description: "${escapeYaml(article.description)}"`,
    `keywords: [${article.keywords.map((kw) => `"${escapeYaml(kw)}"`).join(", ")}]`,
    `category: "${escapeYaml(article.category)}"`,
    `publishedAt: "${new Date().toISOString()}"`,
    "---",
    "",
    article.body.trim(),
    ""
  ].join("\n");

  fs.writeFileSync(path.join(dir, `${slug}.md`), frontmatter, "utf8");
  return slug;
}

function escapeYaml(value: string) {
  return value.replace(/"/g, '\\"');
}