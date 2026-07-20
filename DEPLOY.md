# Usee Tattoo — Deploy & DNS

Astro static site, bilingual DE/EN. Deploys to Netlify. The live `useetattoo.com` is **not** touched until final cutover.

## What's in here
- `src/` — pages, layout, components, data (all copy lives in `src/data/*`)
- `public/images/` — all portfolios & style galleries (galleries auto-populate from these folders)
- `public/_redirects` — complete 301 map (legacy Joomla → clean URLs), 85 rules
- `netlify.toml` — build config (`npm run build` → `dist`)
- Netlify inquiry form on the Contact page (`name="inquiry"`, email notifications)

## Local preview
```bash
npm install
npm run dev      # http://localhost:4321/de/
npm run build    # outputs to dist/
```

## Deploy to staging (hossein.photography)

**Option A — GitHub + Netlify (recommended, auto-builds on push)**
1. Push this folder to the GitHub repo already linked to Netlify.
2. In Netlify: New site → import that repo. Build command `npm run build`, publish dir `dist` (already in `netlify.toml`).
3. Netlify builds and gives you a `*.netlify.app` URL — verify it there first.

**Option B — drag & drop**
Run `npm run build` locally, then drag the `dist/` folder into Netlify → Deploys.

## DNS at eukhost (point hossein.photography → Netlify)
After the Netlify site exists, add these at eukhost (exact CNAME target is shown in Netlify → Domain settings):
- Apex `@`  → **A**  `75.2.60.5`
- `www`     → **CNAME** `<your-site>.netlify.app`

(Or set eukhost nameservers to Netlify DNS if you prefer Netlify to manage the zone.)
Leave `book.useetattoo.com` (Fresha) untouched.

## Netlify Forms
The Contact form is auto-detected on build (`data-netlify="true"`). In Netlify → Forms, enable an email notification to the studio address. Submissions also appear in the Netlify dashboard. On success the visitor returns to `/<lang>/contact?success=1` and sees a confirmation.

## Final cutover (only on your approval)
Repoint `useetattoo.com` DNS to Netlify and set it as the production domain. The `_redirects` file preserves SEO by 301-ing every old URL to its clean equivalent.

## Still open
- **Nilou's bio** — page shows "coming soon" until you supply the text.
- **FAQ answers** — current answers are premium drafts for your review.
- German copy for style/About text is translated from the live English.
