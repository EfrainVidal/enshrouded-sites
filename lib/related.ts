import type { Article } from "./content";

// Lightweight related-post logic that actually works well enough for a content site.
// It scores by category overlap and keyword overlap.
export function getRelatedArticles(current: Article, all: Article[], count = 4) {
  return all
    .filter((article) => article.slug !== current.slug)
    .map((article) => {
      const categoryScore = article.category === current.category ? 3 : 0;
      const keywordScore = article.keywords.filter((kw) =>
        current.keywords.includes(kw)
      ).length;

      return {
        article,
        score: categoryScore + keywordScore
      };
    })
    .sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title))
    .slice(0, count)
    .map((item) => item.article);
}