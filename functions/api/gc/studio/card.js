// GET /api/gc/studio/card?c=CODE — full card details + history for staff.
import { json, bad, handle, db, isStudio, cleanCode, isExpired } from '../../../../server/giftcards/util.js';
import { getCard } from '../../../../server/giftcards/cards.js';
import { bonusFor } from '../../../../server/giftcards/config.js';

export const onRequestGet = handle(async ({ request, env }) => {
  if (!(await isStudio(env, request))) return bad('login', 401);
  const code = cleanCode(new URL(request.url).searchParams.get('c'));
  const DB = await db(env);
  const card = await getCard(DB, code);
  if (!card) return bad('not_found', 404);
  const { results: tx } = await DB.prepare('SELECT * FROM gc_tx WHERE code = ? ORDER BY id DESC').bind(code).all();
  const { results: orders } = await DB.prepare(
    "SELECT id, amount, buyer_name, recipient_name, ship_name, ship_city, message, created_at FROM gc_orders WHERE status='paid' AND format='physical' AND card_code IS NULL ORDER BY created_at"
  ).all();
  const bonusChild = await DB.prepare('SELECT code FROM gc_cards WHERE bonus_of = ?').bind(code).first();
  return json({ ok: true, card, tx, expired: isExpired(card), openOrders: orders, bonusDue: !card.is_bonus && card.source !== 'web' && !bonusChild ? bonusFor(card.initial_value) : 0 });
});
