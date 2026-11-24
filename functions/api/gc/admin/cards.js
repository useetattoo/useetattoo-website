// GET /api/gc/admin/cards?q= — search cards by code, name, email or order.
import { json, bad, handle, db, isAdmin, cleanCode } from '../../../../server/giftcards/util.js';

export const onRequestGet = handle(async ({ request, env }) => {
  if (!(await isAdmin(env, request))) return bad('login', 401);
  const raw = (new URL(request.url).searchParams.get('q') || '').trim();
  const DB = await db(env);
  const like = `%${raw.toLowerCase()}%`;
  const code = cleanCode(raw);
  const { results } = await DB.prepare(
    `SELECT * FROM gc_cards WHERE status!='inactive' AND (? = '' OR code LIKE ? OR lower(buyer_name) LIKE ? OR lower(recipient_name) LIKE ? OR lower(buyer_email) LIKE ? OR order_id LIKE ?)
     ORDER BY COALESCE(activated_at, created_at) DESC LIMIT 200`
  ).bind(raw, `%${code || '#'}%`, like, like, like, like).all();
  return json({ ok: true, cards: results });
});
