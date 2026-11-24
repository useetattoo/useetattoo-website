// POST /api/gc/studio/login {password} — log the studio iPad in (stays logged in 180 days).
// DELETE — log out.
import { json, bad, body, handle, makeSession, sessionCookie, same } from '../../../../server/giftcards/util.js';

const HOURS = 24 * 180;
export const onRequestPost = handle(async ({ request, env }) => {
  const { password } = await body(request);
  if (!env.GC_STUDIO_PASSWORD || !same(password, env.GC_STUDIO_PASSWORD)) return bad('wrong_password', 401);
  return json({ ok: true }, 200, { 'set-cookie': sessionCookie('studio', await makeSession(env, 'studio', HOURS), HOURS) });
});
export const onRequestDelete = () => json({ ok: true }, 200, { 'set-cookie': 'gc_studio=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax' });
