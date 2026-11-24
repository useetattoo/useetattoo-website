// GET /api/gc/studio/orders — paid online orders for printed cards that still need to be posted.
import { json, bad, handle, db, isStudio } from '../../../../server/giftcards/util.js';

export const onRequestGet = handle(async ({ request, env }) => {
  if (!(await isStudio(env, request))) return bad('login', 401);
  const { results } = await (await db(env)).prepare(
    "SELECT id, amount, buyer_name, buyer_email, recipient_name, message, ship_name, ship_street, ship_zip, ship_city, ship_country, created_at FROM gc_orders WHERE status='paid' AND format='physical' AND card_code IS NULL ORDER BY created_at"
  ).all();
  return json({ ok: true, orders: results });
});
