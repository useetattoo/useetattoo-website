// POST /api/gc/order — validate the form, store the order, create the PayPal order.
import { GC, bonusFor, validAmount } from '../../../server/giftcards/config.js';
import { json, bad, body, handle, db, uuid, now, str, isEmail } from '../../../server/giftcards/util.js';
import { createOrder, isEnabled } from '../../../server/giftcards/paypal.js';

export const onRequestPost = handle(async ({ request, env }) => {
  if (!isEnabled(env)) return bad('disabled', 503);
  const b = await body(request);
  const lang = b.lang === 'en' ? 'en' : 'de';
  const format = b.format === 'physical' ? 'physical' : 'digital';
  const amount = Number(b.amount);
  if (!validAmount(amount)) return bad('amount');
  if (!b.terms) return bad('terms');

  const o = {
    id: uuid(), format, amount, lang,
    shipping: format === 'physical' ? GC.shippingFee : 0,
    bonus: bonusFor(amount),
    buyer_name: str(b.buyerName, 80), buyer_email: str(b.buyerEmail, 120).toLowerCase(),
    recipient_name: str(b.recipientName, 80), recipient_email: str(b.recipientEmail, 120).toLowerCase(),
    message: str(b.message, 300), deliver_at: null,
    ship_name: '', ship_street: '', ship_zip: '', ship_city: '', ship_country: '',
  };
  if (!o.buyer_name) return bad('buyerName');
  if (!isEmail(o.buyer_email)) return bad('buyerEmail');

  if (format === 'digital') {
    if (b.sendTo === 'recipient') {
      if (!isEmail(o.recipient_email)) return bad('recipientEmail');
      if (b.deliverAt) {
        const d = String(b.deliverAt).slice(0, 10);
        const max = new Date(Date.now() + GC.maxDeliveryDays * 86400e3).toISOString().slice(0, 10);
        const today = new Date().toISOString().slice(0, 10);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || d < today || d > max) return bad('deliverAt');
        if (d > today) o.deliver_at = `${d}T08:00:00+01:00`; // 8:00 Berlin time
      }
    } else {
      o.recipient_email = '';
    }
  } else {
    o.ship_name = str(b.shipName, 80); o.ship_street = str(b.shipStreet, 120);
    o.ship_zip = str(b.shipZip, 12); o.ship_city = str(b.shipCity, 60);
    o.ship_country = str(b.shipCountry, 2).toUpperCase();
    if (!o.ship_name || !o.ship_street || !o.ship_zip || !o.ship_city) return bad('shipping');
    if (!GC.shipCountries.includes(o.ship_country)) return bad('shipCountry');
  }

  const DB = await db(env);
  const paypalId = await createOrder(env, {
    orderId: o.id,
    total: o.amount + o.shipping,
    description: `Usee Tattoo Gutschein ${o.amount} EUR (${format === 'physical' ? 'Karte' : 'digital'})`,
  });
  await DB.prepare(`INSERT INTO gc_orders (id, paypal_id, status, format, amount, shipping, bonus, edition, lang, buyer_name, buyer_email,
      recipient_name, recipient_email, message, deliver_at, ship_name, ship_street, ship_zip, ship_city, ship_country, created_at)
      VALUES (?, ?, 'created', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(o.id, paypalId, format, o.amount, o.shipping, o.bonus, GC.edition.id, lang, o.buyer_name, o.buyer_email,
      o.recipient_name, o.recipient_email, o.message, o.deliver_at, o.ship_name, o.ship_street, o.ship_zip, o.ship_city, o.ship_country, now())
    .run();
  return json({ ok: true, orderId: o.id, paypalId });
});
