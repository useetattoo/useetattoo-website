// POST /api/gc/studio/activate — sell a blank printed card in the studio (or assign it to an online order).
// body: { code, staff, pin, amount?, orderId?, source?, buyerName?, recipientName?, note?, bonusOf? }
import { GC, validAmount, bonusFor } from '../../../../server/giftcards/config.js';
import { json, bad, body, handle, db, isStudio, verifyStaff, cleanCode, str, now } from '../../../../server/giftcards/util.js';
import { getCard, activatePrinted } from '../../../../server/giftcards/cards.js';

export const onRequestPost = handle(async ({ request, env }) => {
  if (!(await isStudio(env, request))) return bad('login', 401);
  const b = await body(request);
  const DB = await db(env);
  const staff = str(b.staff, 40);
  const pinCheck = await verifyStaff(DB, staff, b.pin);
  if (pinCheck !== 'ok') return bad(pinCheck, 403);

  const code = cleanCode(b.code);
  const card = await getCard(DB, code);
  if (!card) return bad('not_found', 404);
  if (card.status !== 'inactive') return bad('already_active', 409);

  let f = { source: b.source === 'event' ? 'event' : 'studio', staff, buyerName: str(b.buyerName, 80), recipientName: str(b.recipientName, 80), note: str(b.note, 200) };

  if (b.orderId) {
    // Online physical order -> this printed card.
    const o = await DB.prepare("SELECT * FROM gc_orders WHERE id = ? AND status='paid' AND format='physical' AND card_code IS NULL").bind(String(b.orderId)).first();
    if (!o) return bad('order_not_open', 409);
    f = { ...f, source: 'web', amount: o.amount, orderId: o.id, buyerName: o.buyer_name, buyerEmail: o.buyer_email, recipientName: o.recipient_name, message: o.message, lang: o.lang, note: 'Online-Bestellung, per Post' };
    const done = await activatePrinted(DB, code, f);
    if (!done) return bad('already_active', 409);
    await DB.prepare('UPDATE gc_orders SET card_code=?, fulfilled_at=?, fulfilled_by=? WHERE id=?').bind(code, now(), staff, o.id).run();
    return json({ ok: true, card: done, bonusDue: 0 });
  }

  if (b.bonusOf) {
    // Second blank card handed out as the buyer's bonus.
    const parent = await getCard(DB, cleanCode(b.bonusOf));
    if (!parent || parent.is_bonus) return bad('bonus_parent', 409);
    const already = await DB.prepare('SELECT 1 FROM gc_cards WHERE bonus_of = ?').bind(parent.code).first();
    if (already) return bad('bonus_already_given', 409);
    const amount = bonusFor(parent.initial_value, new Date(parent.activated_at || Date.now()));
    if (!amount) return bad('no_bonus', 409);
    const owner = str(b.buyerName, 80) || parent.buyer_name;
    if (!owner) return bad('buyer_name_needed');
    const done = await activatePrinted(DB, code, { ...f, source: 'bonus', isBonus: true, bonusOf: parent.code, amount, buyerName: owner, recipientName: owner, note: 'Persönlich, nur für ' + owner });
    return json({ ok: true, card: done, bonusDue: 0 });
  }

  const amount = Number(b.amount);
  if (!validAmount(amount)) return bad('amount');
  const done = await activatePrinted(DB, code, { ...f, amount });
  if (!done) return bad('already_active', 409);
  return json({ ok: true, card: done, bonusDue: bonusFor(amount) });
});
