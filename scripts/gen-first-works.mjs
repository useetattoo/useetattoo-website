// ND-482 (niloo 19.11.2026): mobile "first works" strip, the Josef pattern, on every
// artist page, every style page and /consultation/. This script picks the first 6
// images of each gallery in the order the page already shows them (new AAA_ work
// first, cover/hero excluded), writes 400x500 thumbnails to public/images/first/<key>/
// and the list to src/data/firstWorks.json. Run by hand after adding photos:
//   node scripts/gen-first-works.mjs
// Not part of the Cloudflare build. Josef keeps his hand-picked list in artists.js.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { artists } from '../src/data/artists.js';
import { styles } from '../src/data/styles.js';
import { gallery } from '../src/lib/gallery.js';

const N = 6;
const order = (list) => [...list.filter((s) => /AAA_/.test(s)), ...list.filter((s) => !/AAA_/.test(s))];
const out = {};
const sets = [];
for (const a of artists.filter((x) => x.built && !x.firstWorks)) {
  sets.push([`artist-${a.slug}`, order(gallery(`/images/portfolio/${a.folder}`, { exclude: ['Profile', 'Highlight'] }))]);
}
for (const s of styles.filter((x) => x.built)) {
  const imgs = gallery(`/images/TattooStyle/${s.folder}`, { exclude: ['Highlight'] });
  const hero = s.hero ? `/images/TattooStyle/${s.folder}/${s.hero}` : imgs[0];
  sets.push([`style-${s.slug}`, order(imgs.filter((x) => x !== hero))]);
}
sets.push(['consultation', gallery('/images/home/selected')]);

for (const [key, list] of sets) {
  const dir = path.join('public/images/first', key);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  out[key] = [];
  for (const [i, full] of list.slice(0, N).entries()) {
    const name = `${key}-${i + 1}.webp`;
    await sharp(path.join('public', full)).rotate().resize(400, 500, { fit: 'cover', position: 'attention' }).webp({ quality: 72 }).toFile(path.join(dir, name));
    out[key].push({ src: `/images/first/${key}/${name}`, full });
  }
  console.log(key, out[key].length);
}
fs.writeFileSync('src/data/firstWorks.json', JSON.stringify(out, null, 1) + '\n');
