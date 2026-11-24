// POST /api/gc/capture — after PayPal approval: capture payment, issue cards, send emails.
import { GC } from '../../../server/giftcards/config.js';
import { json, bad, body, handle, db, now } from '../../../server/giftcards/util.js';
import { captureOrder } from '../../../server/giftcards/paypal.js';
import { issueDigital, getCard } from '../../../server/giftcards/cards.js';
import { send, giftEmail, receiptEmail, studioEmail } from '../../../server/giftcards/email.js';

const result = async (DB, o) => {
  const card = o.card_code ? await getCard(DB, o.card_code) : null;
  return json({ ok: true, format: o.format, card: card && card.format === 'digital' ? card.code : null, bonus: o.bonus_code, deliverAt: o.deliver_at });
};

export const onRequestPost = handle(async ({ request, env }) => {
  const { orderId } = await body(request);
  const DB = await db(env);
  let o = await DB.prepare('SELECT * FROM gc_orders WHERE id = ?').bind(String(orderId || '')).first();
  if (!o) return bad('order_not_found', 404);
  if (o.status === 'paid') return result(DB, o);

  // Lock the order so a double click cannot issue two cards.
  const lock = await DB.prepare("UPDATE gc_orders SET status='capturing' WHERE id=? AND status='created'").bind(o.id).run();
  if (!lock.meta.changes) return bad('in_progress', 409);

  const total = o.amount + o.shipping;
  const cap = await captureOrder(env, o.paypal_id, total);
  if (!cap.ok || cap.amount + 0.001 < total) {
    await DB.prepare("UPDATE gc_orders SET status='created' WHERE id=?").bind(o.id).run();
    return bad('payment_failed', 402);
  }
  await DB.prepare("UPDATE gc_orders SET status='paid', paid_at=? WHERE id=?").bind(now(), o.id).run();

  const site = env.GC_SITE_URL || GC.siteUrl;
  const imageUrl = site + GC.edition.image.replace(/\.svg$/, '.png');
  const editionName = GC.edition.name[o.lang] || GC.edition.name.de;

  let card = null;
  if (o.format === 'digital') {
    card = await issueDigital(DB, {
      source: 'web', amount: o.amount, lang: o.lang, orderId: o.id, buyerName: o.buyer_name, buyerEmail: o.buyer_email,
      recipientName: o.recipient_name, message: o.message,
    });
    const toRecipient = !!o.recipient_email;
    const mail = giftEmail({
      lang: o.lang, card, site, imageUrl, editionName, message: o.message,
      fromName: toRecipient ? o.buyer_name : null,
      toName: toRecipient ? o.recipient_name : o.buyer_name,
    });
    await send(env, DB, { to: toRecipient ? o.recipient_email : o.buyer_email, ...mail, sendAt: toRecipient ? o.deliver_at : null });
  }

  let bonusCard = null;
  if (o.bonus > 0) {
    bonusCard = await issueDigital(DB, {
      source: 'bonus', isBonus: true, bonusOf: card?.code || `ORDER-${o.id.slice(0, 8)}`, amount: o.bonus, lang: o.lang,
      orderId: o.id, buyerName: o.buyer_name, buyerEmail: o.buyer_email, recipientName: o.buyer_name,
    });
  }
  await DB.prepare('UPDATE gc_orders SET card_code=?, bonus_code=? WHERE id=?').bind(card?.code || null, bonusCard?.code || null, o.id).run();
  o = await DB.prepare('SELECT * FROM gc_orders WHERE id = ?').bind(o.id).first();

  await send(env, DB, { to: o.buyer_email, ...receiptEmail({ lang: o.lang, order: o, bonusCard, deliverDate: o.deliver_at, site }) });
  await send(env, DB, { to: env.GC_STUDIO_EMAIL || GC.studioEmail, ...studioEmail({ order: o, site }), replyTo: o.buyer_email });

  return result(DB, o);
});
