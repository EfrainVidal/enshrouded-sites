# Game SEO Network

One codebase for **10 game niche sites**.  
Each site gets:

- Premium UI
- Article pages
- Related posts
- Auto JSON-LD schema
- Sitemap + robots
- AI article writer
- Keyword discovery pipeline

## How this scales

You deploy the same codebase 10 times.  
Each deployment sets a different `SITE_KEY`.

Example:

- `SITE_KEY=enshrouded-fast-guides`
- `SITE_KEY=manor-lords-fast-guides`
- `SITE_KEY=last-epoch-fast-guides`

## Install

```bash
npm install
cp .env.example .env.local
npm run seed:articles
npm run dev
```

## Deploying 10 sites

Create 10 Vercel projects from this same repo.  
For each one, set:

- `SITE_KEY`
- `SITE_URL`
- `OPENAI_API_KEY`

## API routes

### Write a new article
POST `/api/ai/write`

```json
{
  "keyword": "how to get resin fast",
  "siteKey": "enshrouded-fast-guides"
}
```

### Discover new keywords
GET `/api/keywords/discover?siteKey=enshrouded-fast-guides`

## Notes

This starter writes generated articles into `/content/<siteKey>/`.
That makes it easy to review before you publish.