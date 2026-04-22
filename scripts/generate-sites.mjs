import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputFile = path.join(root, "generated-site-checklist.txt");

// This is not required for runtime.
// It just gives you a ready list of 10 deploy targets and envs.

const checklist = `
Deploy checklist for 10 sites
============================

1) Create 10 Vercel projects from the same repo.
2) For each project, set:
   - OPENAI_API_KEY
   - OPENAI_MODEL
   - SITE_KEY
   - SITE_URL

Suggested SITE_KEY values:
- enshrouded-fast-guides
- manor-lords-fast-guides
- last-epoch-fast-guides
- palworld-fast-guides
- nightreign-fast-guides
- diablo4-fast-guides
- poe2-fast-guides
- kingdom-come-2-fast-guides
- monster-hunter-wilds-fast-guides
- windrose-fast-guides

Workflow:
- Run topic discovery route
- Pick 10 high-intent keywords
- Generate 10 articles
- Review the markdown
- Deploy
`.trim();

fs.writeFileSync(outputFile, checklist, "utf8");
console.log("Created generated-site-checklist.txt");