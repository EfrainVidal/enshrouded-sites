import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const contentRoot = path.join(root, "content");

const siteSeeds = {
  "manor-lords-fast-guides": [
    {
      file: "best-early-game-build-order-in-manor-lords.md",
      title: "Best Early Game Build Order in Manor Lords",
      description: "A simple opening build order for faster growth and fewer early mistakes.",
      keywords: ["manor lords build order", "best early game build order manor lords"],
      category: "Strategy",
      body: `
## Quick answer

The best early build order in **Manor Lords** is one that stabilizes food, housing, and income before you overexpand.

## Core opening priorities

1. Secure food first.
2. Expand housing second.
3. Build only what supports your next resource bottleneck.

## Why most starts collapse

Players usually fail because they build too many nice-looking structures before they secure the basics.

## Common mistakes

- building too wide too early
- ignoring supply balance
- adding workers to the wrong chain

## FAQ

### Should I rush trade?
Only when your basic village loop is stable.

### Is housing more important than food?
Food comes first. Housing helps once survival is steady.

### What ruins an early build order?
Overbuilding before production is ready.
      `.trim()
    }
  ],
  "last-epoch-fast-guides": [
    {
      file: "best-way-to-level-fast-in-last-epoch.md",
      title: "Best Way to Level Fast in Last Epoch",
      description: "Fast leveling tips for smoother early progression in Last Epoch.",
      keywords: ["last epoch level fast", "best way to level fast in last epoch"],
      category: "Progression",
      body: `
## Quick answer

The fastest way to level in **Last Epoch** is to keep moving through efficient zones while upgrading only what improves clear speed.

## What actually speeds up leveling

- good area clear
- strong movement
- low menu time
- focused passive choices

## Common mistakes

- overthinking every loot drop
- respeccing too often
- slowing down for low-value fights

## FAQ

### Should I clear every corner?
No. Prioritize speed and density.

### Does gear matter a lot while leveling?
Only if it increases your kill speed or survival enough to keep momentum.

### What slows leveling most?
Too much downtime between packs.
      `.trim()
    }
  ]
};

for (const [siteKey, articles] of Object.entries(siteSeeds)) {
  const dir = path.join(contentRoot, siteKey);
  fs.mkdirSync(dir, { recursive: true });

  for (const article of articles) {
    const full = [
      "---",
      `title: "${article.title.replace(/"/g, '\\"')}"`,
      `description: "${article.description.replace(/"/g, '\\"')}"`,
      `keywords: [${article.keywords.map((kw) => `"${kw.replace(/"/g, '\\"')}"`).join(", ")}]`,
      `category: "${article.category}"`,
      `publishedAt: "${new Date().toISOString()}"`,
      "---",
      "",
      article.body,
      ""
    ].join("\n");

    fs.writeFileSync(path.join(dir, article.file), full, "utf8");
  }
}

console.log("Seeded starter articles.");