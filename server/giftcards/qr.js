// QR codes as SVG (web/print) and PNG (email clients that block SVG).
import qrcode from 'qrcode-generator';

export const cardUrl = (site, code) => `${site}/g/${code}`;

function matrix(text) {
  const q = qrcode(0, 'M');
  q.addData(text);
  q.make();
  const n = q.getModuleCount();
  const m = [];
  for (let r = 0; r < n; r++) { m.push([]); for (let c = 0; c < n; c++) m[r].push(q.isDark(r, c)); }
  return m;
}

export function qrSvg(text, { color = '#111010', bg = 'transparent', margin = 2 } = {}) {
  const m = matrix(text);
  const n = m.length + margin * 2;
  let d = '';
  m.forEach((row, r) => row.forEach((on, c) => { if (on) d += `M${c + margin} ${r + margin}h1v1h-1z`; }));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges">` +
    (bg !== 'transparent' ? `<rect width="${n}" height="${n}" fill="${bg}"/>` : '') +
    `<path d="${d}" fill="${color}"/></svg>`;
}

// ---------- tiny PNG encoder (grayscale, 8-bit) ----------
const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
function crc32(bytes) { let c = 0xffffffff; for (const b of bytes) c = CRC[(c ^ b) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) {
  const out = new Uint8Array(12 + data.length);
  const dv = new DataView(out.buffer);
  dv.setUint32(0, data.length);
  for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
  out.set(data, 8);
  dv.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}
async function deflate(bytes) {
  const s = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate'));
  return new Uint8Array(await new Response(s).arrayBuffer());
}

export async function qrPng(text, scale = 8, margin = 3) {
  const m = matrix(text);
  const n = (m.length + margin * 2) * scale;
  const raw = new Uint8Array((n + 1) * n);
  for (let y = 0; y < n; y++) {
    raw[y * (n + 1)] = 0; // filter: none
    const r = Math.floor(y / scale) - margin;
    for (let x = 0; x < n; x++) {
      const c = Math.floor(x / scale) - margin;
      const dark = r >= 0 && c >= 0 && r < m.length && c < m.length && m[r][c];
      raw[y * (n + 1) + 1 + x] = dark ? 17 : 255;
    }
  }
  const ihdr = new Uint8Array(13);
  const dv = new DataView(ihdr.buffer);
  dv.setUint32(0, n); dv.setUint32(4, n); ihdr[8] = 8; ihdr[9] = 0; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const parts = [new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', await deflate(raw)), chunk('IEND', new Uint8Array())];
  const total = parts.reduce((a, p) => a + p.length, 0);
  const png = new Uint8Array(total);
  let o = 0; for (const p of parts) { png.set(p, o); o += p.length; }
  return png;
}
