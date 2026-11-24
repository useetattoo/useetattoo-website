// GET /api/gc/qr/CODE.png | CODE.svg — QR image that opens the card page.
import { GC } from '../../../../server/giftcards/config.js';
import { cleanCode } from '../../../../server/giftcards/util.js';
import { qrPng, qrSvg, cardUrl } from '../../../../server/giftcards/qr.js';

export async function onRequestGet({ params, env }) {
  const m = String(params.file).match(/^([A-Za-z0-9-]+)\.(png|svg)$/);
  const code = m && cleanCode(m[1]);
  if (!code || code.length !== 10) return new Response('Not found', { status: 404 });
  const url = cardUrl(env.GC_SITE_URL || GC.siteUrl, code);
  const headers = { 'cache-control': 'public, max-age=31536000, immutable' };
  if (m[2] === 'svg') return new Response(qrSvg(url, { bg: '#ffffff' }), { headers: { ...headers, 'content-type': 'image/svg+xml' } });
  return new Response(await qrPng(url), { headers: { ...headers, 'content-type': 'image/png' } });
}
