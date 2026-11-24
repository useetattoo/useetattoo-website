// /g/CODE — the short link inside every QR code.
// Customers land on the card page in the card's language; a logged-in studio
// device (the iPad) lands on the studio tools for that card instead.
import { cleanCode, isStudio } from '../../server/giftcards/util.js';

export async function onRequestGet({ params, request, env }) {
  const code = cleanCode(params.code);
  if (await isStudio(env, request)) {
    const s = new URL('/studio/', request.url);
    s.searchParams.set('c', code);
    return Response.redirect(s.toString(), 302);
  }
  let lang = (request.headers.get('accept-language') || '').toLowerCase().startsWith('de') ? 'de' : 'en';
  try {
    if (env.GC_DB) {
      const c = await env.GC_DB.prepare('SELECT lang, format FROM gc_cards WHERE code = ?').bind(code).first();
      if (c?.format === 'digital' && (c.lang === 'de' || c.lang === 'en')) lang = c.lang;
    }
  } catch {}
  const url = new URL(`/${lang}/gift-cards/card/`, request.url);
  url.searchParams.set('c', code);
  return Response.redirect(url.toString(), 302);
}
