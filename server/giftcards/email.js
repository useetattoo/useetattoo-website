// Email sending (Resend) + the gift card email templates (DE/EN).
// GC_RESEND_API_KEY missing or GC_EMAIL_MODE=mock -> emails are only stored in gc_outbox.
import { GC } from './config.js';
import { esc, fmtCode, now } from './util.js';

export async function send(env, DB, { to, subject, html, sendAt = null, replyTo = GC.studioEmail }) {
  const mock = env.GC_EMAIL_MODE === 'mock' || !env.GC_RESEND_API_KEY;
  let status = mock ? 'mock' : 'sent';
  if (!mock) {
    const payload = { from: env.GC_FROM_EMAIL || 'Usee Tattoo <gutschein@useetattoo.com>', to: [to], subject, html, reply_to: replyTo };
    if (sendAt) payload.scheduled_at = sendAt;
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.GC_RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    status = r.ok ? (sendAt ? 'scheduled' : 'sent') : `failed:${r.status}`;
  }
  await DB.prepare('INSERT INTO gc_outbox (to_addr, subject, html, send_at, status, created_at) VALUES (?,?,?,?,?,?)')
    .bind(to, subject, html, sendAt, status, now()).run();
  return status;
}

const eur = (n, lang) => (lang === 'de' ? `${n} €` : `€${n}`);
const date = (iso, lang) => {
  const [y, m, d] = iso.slice(0, 10).split('-');
  return lang === 'de' ? `${d}.${m}.${y}` : `${d}/${m}/${y}`;
};

const T = {
  de: {
    hello: (n) => (n ? `Hallo ${esc(n)},` : 'Hallo,'),
    giftSubject: (from) => (from ? `${from} schenkt dir ein Tattoo-Erlebnis bei Usee Tattoo` : 'Dein Usee Tattoo Gutschein'),
    giftIntro: (from) => (from ? `<b>${esc(from)}</b> hat dir einen Gutschein von Usee Tattoo in Berlin geschenkt.` : 'hier ist dein Gutschein von Usee Tattoo in Berlin.'),
    value: 'Wert', code: 'Gutscheincode', valid: 'Gültig bis',
    open: 'Gutschein öffnen', book: 'Kostenlose Beratung buchen',
    howTitle: 'So löst du ihn ein',
    how: 'Buche eine kostenlose Beratung oder komm ins Studio und zeig den QR-Code. Der Betrag wird von deinem Guthaben abgezogen, ein Restbetrag bleibt auf dem Gutschein.',
    note: 'Bewahre den Code sicher auf, wer ihn vorzeigt, kann ihn einlösen. Keine Barauszahlung.',
    receiptSubject: 'Danke für deinen Gutschein-Kauf bei Usee Tattoo',
    receiptIntro: 'danke für deinen Kauf. Hier ist deine Bestätigung:',
    order: 'Bestellnummer', format: 'Format', digital: 'Digital (E-Mail)', physical: 'Gedruckte Karte (per Post)',
    deliverTo: (r, d) => `Wird an ${esc(r)} gesendet${d ? ` am ${d}` : ''}.`,
    deliverSelf: 'Der Gutschein ist in einer separaten E-Mail an dich unterwegs.',
    postNote: 'Wir drucken deine Karte und schicken sie in den nächsten 1–3 Werktagen los.',
    bonusTitle: 'Ein Geschenk für dich',
    bonusText: (b, exp) => `Weil du verschenkst, bekommst du einen eigenen Gutschein über <b>${b}</b>, gültig bis ${exp}. Er ist persönlich und nur für dich.`,
    total: 'Bezahlt',
    footer: 'Usee Tattoo · Neue Kantstraße 6 · 14057 Berlin',
  },
  en: {
    hello: (n) => (n ? `Hi ${esc(n)},` : 'Hi,'),
    giftSubject: (from) => (from ? `${from} sent you a tattoo experience at Usee Tattoo` : 'Your Usee Tattoo gift card'),
    giftIntro: (from) => (from ? `<b>${esc(from)}</b> has given you a gift card for Usee Tattoo in Berlin.` : 'here is your gift card for Usee Tattoo in Berlin.'),
    value: 'Value', code: 'Gift card code', valid: 'Valid until',
    open: 'Open your gift card', book: 'Book a free consultation',
    howTitle: 'How to use it',
    how: 'Book a free consultation or visit the studio and show the QR code. The amount is taken from your balance, and anything left stays on the card.',
    note: 'Keep the code safe, whoever shows it can use it. No cash payout.',
    receiptSubject: 'Thank you for your Usee Tattoo gift card',
    receiptIntro: 'thank you for your purchase. Here is your confirmation:',
    order: 'Order number', format: 'Format', digital: 'Digital (email)', physical: 'Printed card (by post)',
    deliverTo: (r, d) => `Will be sent to ${esc(r)}${d ? ` on ${d}` : ''}.`,
    deliverSelf: 'Your gift card is on its way in a separate email.',
    postNote: 'We print your card and post it within 1–3 working days.',
    bonusTitle: 'A gift for you',
    bonusText: (b, exp) => `Because you are giving, you get your own gift card of <b>${b}</b>, valid until ${exp}. It is personal and just for you.`,
    total: 'Paid',
    footer: 'Usee Tattoo · Neue Kantstraße 6 · 14057 Berlin, Germany',
  },
};

const shell = (inner) => `<!doctype html><html><body style="margin:0;background:#f4f1ea;font-family:Helvetica,Arial,sans-serif;color:#111010">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff">
<tr><td style="background:#0e0d0d;padding:26px 32px;text-align:center;font-family:Georgia,serif;font-size:22px;letter-spacing:6px;color:#f4f1ea;text-transform:uppercase">Usee<span style="color:#8a7355">·</span>Tattoo</td></tr>
${inner}
</table></td></tr></table></body></html>`;

const row = (k, v) => `<tr><td style="padding:8px 0;border-bottom:1px solid #e6e0d4;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#6f5c43;width:42%">${k}</td><td style="padding:8px 0;border-bottom:1px solid #e6e0d4;font-size:15px">${v}</td></tr>`;
const btn = (href, label, dark = true) => `<a href="${href}" style="display:inline-block;margin:6px 4px;padding:14px 24px;font-size:12px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;${dark ? 'background:#111010;color:#f4f1ea' : 'border:1px solid #111010;color:#111010'}">${label}</a>`;

export function giftEmail({ lang, card, fromName, toName, message, editionName, imageUrl, site }) {
  const t = T[lang] || T.de;
  const link = `${site}/g/${card.code}`;
  const bookUrl = `${site}/${lang}/consultation/`;
  return {
    subject: t.giftSubject(fromName),
    html: shell(`
<tr><td style="padding:0"><img src="${imageUrl}" width="560" alt="${esc(editionName)}" style="display:block;width:100%;height:auto"></td></tr>
<tr><td style="padding:32px 32px 8px;font-size:16px;line-height:1.6">
<p style="margin:0 0 12px">${t.hello(toName)}</p>
<p style="margin:0 0 18px">${t.giftIntro(fromName)}</p>
${message ? `<p style="margin:0 0 18px;padding:18px 20px;background:#f4f1ea;font-family:Georgia,serif;font-style:italic;font-size:18px;line-height:1.5">“${esc(message)}”</p>` : ''}
</td></tr>
<tr><td style="padding:0 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row(t.value, `<b style="font-size:20px">${eur(card.initial_value, lang)}</b>`)}
${row(t.code, `<span style="font-family:Menlo,monospace;letter-spacing:2px">${fmtCode(card.code)}</span>`)}
${row(t.valid, date(card.expires_at, lang))}
</table></td></tr>
<tr><td style="padding:24px 32px 8px;text-align:center"><img src="${site}/api/gc/qr/${card.code}.png" width="170" height="170" alt="QR" style="display:inline-block"></td></tr>
<tr><td style="padding:8px 32px 24px;text-align:center">${btn(link, t.open)}${btn(bookUrl, t.book, false)}</td></tr>
<tr><td style="padding:0 32px 28px;font-size:14px;line-height:1.6;color:#3a3735">
<p style="margin:0 0 6px;font-family:Georgia,serif;font-size:19px;color:#111010">${t.howTitle}</p><p style="margin:0 0 12px">${t.how}</p>
<p style="margin:0;font-size:12px;color:#8f887c">${t.note}</p></td></tr>
<tr><td style="background:#0e0d0d;padding:18px;text-align:center;font-size:11px;color:#8f887c">${t.footer}</td></tr>`),
  };
}

export function receiptEmail({ lang, order, bonusCard, deliverDate, site }) {
  const t = T[lang] || T.de;
  const total = order.amount + order.shipping;
  let delivery;
  if (order.format === 'physical') delivery = t.postNote;
  else if (order.recipient_email && order.recipient_email !== order.buyer_email) delivery = t.deliverTo(order.recipient_name || order.recipient_email, deliverDate ? date(deliverDate, lang) : '');
  else delivery = t.deliverSelf;
  return {
    subject: t.receiptSubject,
    html: shell(`
<tr><td style="padding:32px 32px 8px;font-size:16px;line-height:1.6"><p style="margin:0 0 12px">${t.hello(order.buyer_name)}</p><p style="margin:0 0 18px">${t.receiptIntro}</p></td></tr>
<tr><td style="padding:0 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row(t.order, order.id.slice(0, 8).toUpperCase())}
${row(t.value, eur(order.amount, lang))}
${row(t.format, order.format === 'physical' ? t.physical : t.digital)}
${row(t.total, eur(total, lang))}
</table></td></tr>
<tr><td style="padding:20px 32px 8px;font-size:15px;line-height:1.6">${delivery}</td></tr>
${bonusCard ? `<tr><td style="padding:16px 32px 8px"><div style="padding:20px;background:#f4f1ea;border-left:3px solid #8a7355">
<p style="margin:0 0 6px;font-family:Georgia,serif;font-size:20px">${t.bonusTitle}</p>
<p style="margin:0 0 10px;font-size:15px;line-height:1.6">${t.bonusText(eur(bonusCard.initial_value, lang), date(bonusCard.expires_at, lang))}</p>
<p style="margin:0 0 12px;font-family:Menlo,monospace;letter-spacing:2px;font-size:16px">${fmtCode(bonusCard.code)}</p>
${btn(`${site}/g/${bonusCard.code}`, t.open)}</div></td></tr>` : ''}
<tr><td style="padding:24px 32px 28px;font-size:12px;color:#8f887c">${t.note}</td></tr>
<tr><td style="background:#0e0d0d;padding:18px;text-align:center;font-size:11px;color:#8f887c">${t.footer}</td></tr>`),
  };
}

// Internal email to the studio (always German, plain and scannable).
export function studioEmail({ order, site }) {
  const physical = order.format === 'physical';
  const subject = physical
    ? `Gutschein zum Versenden: ${order.amount} € an ${order.ship_name}`
    : `Neuer Online-Gutschein: ${order.amount} €`;
  const lines = [
    ['Bestellung', order.id.slice(0, 8).toUpperCase()],
    ['Wert', `${order.amount} €`],
    ['Format', physical ? 'Gedruckte Karte – bitte versenden' : 'Digital (automatisch per E-Mail)'],
    ['Käufer', `${order.buyer_name} (${order.buyer_email})`],
    ['Für', order.recipient_name || '–'],
    ['Nachricht', order.message || '–'],
    ...(physical ? [['Versand an', `${order.ship_name}<br>${order.ship_street}<br>${order.ship_zip} ${order.ship_city}<br>${order.ship_country}`]] : []),
    ...(order.bonus ? [['Bonus für Käufer', `${order.bonus} € (digital, schon verschickt)`]] : []),
  ];
  return {
    subject,
    html: shell(`
<tr><td style="padding:28px 32px 8px;font-size:16px">${physical ? '<b>Bitte eine leere Karte nehmen, im Studio-Bereich scannen und dieser Bestellung zuordnen, dann versenden.</b>' : 'Zur Info: ein Online-Gutschein wurde verkauft und automatisch verschickt.'}</td></tr>
<tr><td style="padding:8px 32px 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${lines.map(([k, v]) => row(k, v)).join('')}</table></td></tr>
<tr><td style="padding:0 32px 28px;text-align:center">${btn(`${site}/studio/`, 'Studio-Bereich öffnen')}</td></tr>`),
  };
}
