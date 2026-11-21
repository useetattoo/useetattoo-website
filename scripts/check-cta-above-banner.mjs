// ND-418 / ND-384 (Assistant 18.11.2026): permanent check "booking button above the cookie banner".
// On phones the first booking button must end ABOVE the top edge of the open cookie banner.
//
// Usage:
//   npm run build && node scripts/check-cta-above-banner.mjs            (starts astro preview on dist/)
//   node scripts/check-cta-above-banner.mjs https://<preview>.pages.dev  (any deployed URL)
// Exit code 1 if any page/viewport fails. Not part of the Cloudflare build.
//
// "Booking button" = the topmost visible, non-fixed link in <main> that goes to the booking
// system (fresha.com, book.useetattoo.com, /booking/) or carries .booking-fresha-cta. Playwright is the copy pre-installed on the machine, not a
// project dependency, so the Cloudflare build stays unchanged.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

// ND-482: every artist page, every style page and /consultation/ (DE+EN) carry the Josef pattern.
const ARTISTS = ['josef', 'cali', 'jvd', 'nana'];
const STYLES = ['realistic', 'microrealism', 'fine-line', 'maori', 'ornamental', 'portraits', 'color', 'black-and-grey', 'conceptual', 'japanese', 'lettering'];
const PAGES = ['/de/', '/de/walk-in/', ...['de', 'en'].flatMap((l) => [`/${l}/consultation/`, ...ARTISTS.map((a) => `/${l}/artists/${a}/`), ...STYLES.map((s) => `/${l}/styles/${s}/`)])];
const VIEWPORTS = [[360, 640], [375, 667], [390, 844]];

let base = process.argv[2];
let server;
if (!base) {
  const port = 4329;
  server = spawn('npx', ['astro', 'preview', '--port', String(port)], { stdio: 'ignore' });
  base = `http://localhost:${port}`;
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(base + '/de/')).ok) break; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
}
base = base.replace(/\/$/, '');

const browser = await chromium.launch();
let failed = 0;
console.log('page'.padEnd(24), 'viewport'.padEnd(9), 'btnBottom', 'bannerTop', 'result');
try {
  for (const path of PAGES) {
    for (const [w, h] of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true });
      const page = await ctx.newPage();
      await page.goto(`${base}${path}?cb=${Date.now()}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800); // banner slide-in transition
      const r = await page.evaluate(() => {
        const banner = document.getElementById('cookieBanner');
        const bannerTop = banner && !banner.hidden ? banner.getBoundingClientRect().top : window.innerHeight;
        const links = [...document.querySelectorAll('main a[href*="fresha.com"], main a[href*="book.useetattoo.com"], main a[href*="/booking/"], main .booking-fresha-cta, main .dh-mbook')].filter((a) => {
          const cs = getComputedStyle(a);
          const b = a.getBoundingClientRect();
          let fixed = false;
          for (let el = a; el; el = el.parentElement) if (['fixed', 'sticky'].includes(getComputedStyle(el).position)) fixed = true;
          return !fixed && cs.display !== 'none' && cs.visibility !== 'hidden' && b.width > 0 && b.height > 0;
        });
        links.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        const first = links[0];
        return { bannerTop: Math.round(bannerTop), btnBottom: first ? Math.round(first.getBoundingClientRect().bottom) : null, text: first?.textContent.trim().slice(0, 30) };
      });
      const ok = r.btnBottom !== null && r.btnBottom <= r.bannerTop;
      if (!ok) failed++;
      console.log(path.padEnd(24), `${w}x${h}`.padEnd(9), String(r.btnBottom).padStart(9), String(r.bannerTop).padStart(9), ok ? 'PASS' : 'FAIL', r.text ? `"${r.text}"` : '(no booking link)');
      await ctx.close();
    }
  }
} finally {
  await browser.close();
  server?.kill();
}
console.log(failed ? `\n${failed} FAIL` : '\nall PASS');
process.exit(failed ? 1 : 0);
