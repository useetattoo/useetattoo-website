// Cloudflare Pages Function (middleware) — runs on EVERY request, before
// functions/index.js and before public/_redirects.
//
// ND-136 (root-cause fix for ~49k non-indexed URLs; approved by niloo,
// Hub decision 2026-09-28):
//
// The legacy Joomla site used ?p=<post-id> links (e.g. /?p=55474,
// /de/?p=55474, /de/index.php?p=55474). The repo has no route or feature
// that reads a `p` query parameter for anything legitimate. Today these URLs
// are kept alive by redirects that preserve the query string, so Google keeps
// re-crawling thousands of stub URLs that only differ by a dead post id.
//
// Fix: any request carrying a `p` query parameter gets 410 Gone.
//
// utm_* and gclid are never touched: the query string is only checked for the
// single key `p`; every other request flows to context.next() unchanged.
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.searchParams.has('p')) {
    return new Response('Gone', {
      status: 410,
      headers: { 'content-type': 'text/plain;charset=UTF-8' },
    });
  }
  return context.next();
}
