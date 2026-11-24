// POST /api/gc/admin/login {password} — management login (12 hours). DELETE — log out.
import { json, bad, body, handle, makeSession, sessionCookie, same } from '../../../../server/giftcards/util.js';

export const onRequestPost = handle(async ({ request, env }) => {
  const { password } = await body(request);
  if (!env.GC_ADMIN_PASSWORD || !same(password, env.GC_ADMIN_PASSWORD)) return bad('wrong_password', 401);
  return json({ ok: true }, 200, { 'set-cookie': sessionCookie('admin', await makeSession(env, 'admin', 12), 12) });
});
export const onRequestDelete = () => json({ ok: true }, 200, { 'set-cookie': 'gc_admin=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax' });
