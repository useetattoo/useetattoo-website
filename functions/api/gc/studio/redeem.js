// POST /api/gc/studio/redeem {code, amount, staff, pin, note} — take an amount off a card.
import { json, bad, body, handle, db, isStudio, verifyStaff, cleanCode, str, isExpired } from '../../../../server/giftcards/util.js';
import { getCard, redeem } from '../../../../server/giftcards/cards.js';

export const onRequestPost = handle(async ({ request, env }) => {
  if (!(await isStudio(env, request))) return bad('login', 401);
  const b = await body(request);
  const DB = await db(env);
  const staff = str(b.staff, 40);
  const pinCheck = await verifyStaff(DB, staff, b.pin);
  if (pinCheck !== 'ok') return bad(pinCheck, 403);

  const code = cleanCode(b.code);
  const amount = Math.round(Number(b.amount) * 100) / 100;
  if (!(amount > 0) || !Number.isInteger(amount)) return bad('amount');
  const card = await getCard(DB, code);
  if (!card) return bad('not_found', 404);
  if (card.status !== 'active') return bad(`status_${card.status}`, 409);
  if (isExpired(card)) return bad('expired', 409);
  if (amount > card.balance) return bad('not_enough', 409);
  const done = await redeem(DB, code, amount, staff, str(b.note, 200));
  if (!done) return bad('not_enough', 409);
  return json({ ok: true, card: done });
});
