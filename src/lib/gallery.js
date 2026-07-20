import fs from 'node:fs';
import path from 'node:path';

const IMG = /\.(webp|jpe?g|png)$/i;
const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

// Reads every image in public<dir> at build time and returns web paths.
// Auto-populates galleries from whatever assets are present, drop files in, they appear.
export function gallery(dir, { exclude = [] } = {}) {
  const abs = path.join(process.cwd(), 'public', dir);
  let files = [];
  try {
    files = fs.readdirSync(abs).filter((f) => IMG.test(f) && !exclude.some((x) => f.includes(x)));
  } catch {
    return [];
  }
  return files.sort(natural).map((f) => `${dir}/${f}`);
}
