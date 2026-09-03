// sitemap.xml is GENERATED at build time — do not hand-edit a static copy.
//
// Why: a hand-maintained public/sitemap.xml drifted from reality repeatedly
// (wrong micro-realism slug, a dotwork URL that had no page, four new style
// pages missing for weeks). This route derives every URL from the SAME data
// files and the SAME `.filter(x => x.built)` rule that getStaticPaths uses,
// so the sitemap cannot list a page that is not built and cannot miss one
// that is. Adding a style/artist/journal entry to src/data/* is now the only
// step needed — the sitemap follows automatically on the next deploy.

import { langs } from '../data/i18n.js';
import { styles } from '../data/styles.js';
import { artists } from '../data/artists.js';
import { journal } from '../data/journal.js';

const SITE = 'https://useetattoo.com';

// Pages that are not data-driven. Legal pages (impressum, datenschutz) and 404
// are deliberately excluded, matching the previous sitemap.
const staticPaths = [
  '',
  'booking/',
  'about/',
  'contact/',
  'cover-up/',
  'faq/',
  'piercing/',
  'walk-in/',
  'events/guest-artists/',
  'events/past-events/',
  'consultation/',
  'erstes-tattoo/',
];

function allPaths() {
  return [
    ...staticPaths,
    ...artists.filter((a) => a.built).map((a) => `artists/${a.slug}/`),
    ...styles.filter((s) => s.built).map((s) => `styles/${s.slug}/`),
    ...journal.map((j) => `piercing/journal/${j.slug}/`),
  ];
}

const url = (lang, path) => `${SITE}/${lang}/${path}`;

export function GET() {
  const paths = allPaths();
  const body = [];

  body.push('<?xml version="1.0" encoding="UTF-8"?>');
  body.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  body.push('xmlns:xhtml="http://www.w3.org/1999/xhtml">');

  for (const path of paths) {
    for (const lang of langs) {
      body.push('<url>');
      body.push(`<loc>${url(lang, path)}</loc>`);
      for (const alt of langs) {
        body.push(`<xhtml:link rel="alternate" hreflang="${alt}" href="${url(alt, path)}"/>`);
      }
      // German is the default for a Berlin studio.
      body.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${url('de', path)}"/>`);
      body.push('</url>');
    }
  }

  body.push('</urlset>');

  return new Response(`${body.join('\n')}\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
