# Usee Tattoo — Deploy & DNS

Astro static site, bilingual DE/EN. Live at `useetattoo.com`, hosted on **Cloudflare Pages**. This repo is production — every push to `main` deploys straight to the live site (see Deploy section below).

## What's in here
- `src/` — pages, layout, components, data (all copy lives in `src/data/*`)
- `public/images/` — all portfolios & style galleries (galleries auto-populate from these folders)
- `public/_redirects` — 301 map for legacy URLs (explicit rules only — Cloudflare's `_redirects` format does not support query-string matching)
- `functions/index.js` — Cloudflare Pages Function. Handles the one redirect case `_redirects` can't: any request to `/` carrying a `?p=...` query string (stray crawled/linked legacy URLs) gets a real 301 to `/de/` with the query string preserved. Runs before `_redirects` on every request.

## Local preview
```bash
npm install
npm run dev      # http://localhost:4321/de/
npm run build    # outputs to dist/
```

## Deploy
Cloudflare Pages is connected directly to this GitHub repo (`useetattoo/useetattoo-website`, branch `main`). Every push to `main` triggers an automatic build (`npm run build` → publish `dist`) and deploys straight to production at `useetattoo.com`. There is no staging environment and no manual deploy step — treat every commit to `main` as live within minutes.

Build settings (framework preset, build command, output directory, environment variables) are configured in the Cloudflare dashboard directly, not in a config file in this repo.

## DNS
`useetattoo.com` DNS points to Cloudflare Pages. `book.useetattoo.com` (Fresha booking system) is a separate service and is not touched by this repo or its deploys.

## Contact form
The Contact page and the sitewide quick-contact form (`src/components/QuickForm.astro`) submit via [Web3Forms](https://web3forms.com) (`api.web3forms.com/submit`), not Netlify Forms — Netlify is not used anywhere in this project. On success the visitor sees an inline confirmation message; there is no `?success=1` redirect page.

## Booking
All actual appointment booking (consultations, walk-ins, piercing, cover-up) happens through Fresha, linked from this site but hosted separately — this repo has no booking logic of its own.

## Still open
- **FAQ answers** — current answers are premium drafts, review periodically as the studio's offering evolves.
- German/English copy parity — spot-check periodically; some pages were translated from the original language version.

## History note
This project briefly assumed Netlify hosting very early on. Any old references to Netlify, `netlify.toml`, `*.netlify.app`, or eukhost-to-Netlify DNS instructions (including in old commits or archived docs) are incorrect leftovers from that abandoned plan — ignore them. The site has been on Cloudflare Pages since before this file was last accurate.
