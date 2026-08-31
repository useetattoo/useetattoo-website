// Cloudflare Pages Function — handles GET / (with or without a query string)
// Runs BEFORE public/_redirects, so it is not affected by Cloudflare's documented
// lack of query-string support in _redirects rules.
// Ref: SEO ALERT 2026-08-29c, approved by niloo 2026-08-29 (SEO builds, DEV coordinated via Hub)
export async function onRequest(context) {
    const url = new URL(context.request.url);
    const dest = new URL('/de/', url.origin);
    dest.search = url.search; // preserve gclid/utm/etc. for ad conversion tracking
  return Response.redirect(dest.toString(), 301);
}
