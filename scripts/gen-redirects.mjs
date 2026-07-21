// Generates public/_redirects — complete legacy Joomla → clean-URL 301 map.
import fs from 'node:fs';
import path from 'node:path';

const artists = ['josef', 'nilou', 'cali', 'jvd', 'nana'];
const styles = ['realistic', 'micro-realism', 'fine-line', 'maori', 'ornamental', 'portraits', 'color', 'dotwork'];
const simple = [['events', 'events'], ['about-usee', 'about'], ['faq', 'faq'], ['contact-us', 'contact']];
const eventsSub = ['past-events', 'flash-day', 'guest-artists', 'weekly-ink']; // → events (Weekly Ink dropped)
const L = ['de', 'en'];

const lines = [];
const seen = new Set();
const add = (src, dst, code = '301') => {
  if (src === dst) return;            // no self-referential loops
  if (seen.has(src)) return;          // first rule wins
  seen.add(src);
  lines.push(`${src.padEnd(44)} ${dst.padEnd(24)} ${code}`);
};
const comment = (c) => lines.push(c);

comment('# ===== Usee Tattoo — 301 redirect map (legacy Joomla → clean URLs) =====');
comment('# Root → German (default language)');
add('/', '/de/', '301!');
comment('');

for (const l of L) {
  comment(`# ---- ${l.toUpperCase()} ----`);
  add(`/${l}/index.php`, `/${l}/`);
  add(`/${l}/index.php/`, `/${l}/`);
  for (const a of artists) {
    add(`/${l}/index.php/tattoo-artists/${a}`, `/${l}/artists/${a}`);
    add(`/${l}/tattoo-artists/${a}`, `/${l}/artists/${a}`);
  }
  for (const s of styles) {
    add(`/${l}/index.php/tatto-styles/${s}`, `/${l}/styles/${s}`);
    add(`/${l}/tatto-styles/${s}`, `/${l}/styles/${s}`);
  }
  for (const [oldp, np] of simple) {
    add(`/${l}/index.php/${oldp}`, `/${l}/${np}`);
    add(`/${l}/${oldp}`, `/${l}/${np}`);
  }
  for (const e of eventsSub) {
    add(`/${l}/index.php/${e}`, `/${l}/events/${e}`);
    add(`/${l}/${e}`, `/${l}/events/${e}`);
  }
  comment('');
}

fs.writeFileSync(path.join(process.cwd(), 'public', '_redirects'), lines.join('\n') + '\n');
console.log('Wrote public/_redirects with', seen.size, 'redirect rules');
