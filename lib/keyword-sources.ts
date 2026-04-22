// Topic discovery engine.
//
// This is intentionally practical:
// - Google autosuggest
// - YouTube autosuggest
// - Reddit search result titles via JSON endpoint
//
// It is not fancy, but it is enough to keep feeding your sites new content ideas.

type DiscoverOptions = {
  game: string;
  region?: string;
  language?: string;
};

export async function discoverKeywords(opts: DiscoverOptions) {
  const language = opts.language || process.env.DISCOVERY_LANGUAGE || "en";
  const region = opts.region || process.env.DISCOVERY_REGION || "us";

  const seeds = [
    `${opts.game} how to`,
    `${opts.game} best`,
    `${opts.game} where to find`,
    `${opts.game} fix`,
    `${opts.game} build`,
    `${opts.game} beginner`
  ];

  const discovered = new Set<string>();

  for (const seed of seeds) {
    const [google, youtube, reddit] = await Promise.allSettled([
      fetchGoogleSuggest(seed, language, region),
      fetchYouTubeSuggest(seed),
      fetchRedditTitles(seed)
    ]);

    for (const result of [google, youtube, reddit]) {
      if (result.status === "fulfilled") {
        for (const keyword of result.value) discovered.add(cleanKeyword(keyword));
      }
    }
  }

  return Array.from(discovered)
    .filter(Boolean)
    .filter((kw) => kw.toLowerCase().includes(opts.game.toLowerCase().split(" ")[0]))
    .sort((a, b) => a.localeCompare(b));
}

async function fetchGoogleSuggest(query: string, language: string, region: string) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${encodeURIComponent(
    language
  )}&gl=${encodeURIComponent(region)}&q=${encodeURIComponent(query)}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const data = (await res.json()) as [string, string[]];
  return data[1] ?? [];
}

async function fetchYouTubeSuggest(query: string) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const data = (await res.json()) as [string, string[]];
  return data[1] ?? [];
}

async function fetchRedditTitles(query: string) {
  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&limit=12&sort=relevance&t=month`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "game-seo-network/1.0"
    },
    next: { revalidate: 3600 }
  });

  if (!res.ok) return [];

  const data = await res.json();
  const posts: string[] =
    data?.data?.children?.map((item: any) => item?.data?.title).filter(Boolean) ?? [];

  return posts;
}

function cleanKeyword(value: string) {
  return value.replace(/\s+/g, " ").trim();
}