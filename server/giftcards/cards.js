// Card operations shared by the online shop, studio and admin routes.
import { GC, expiryFor } from './config.js';
import { now, uniqueCode } from './util.js';

export async function getCard(DB, code) {
  return DB.prepare('SELECT * FROM gc_cards WHERE code = ?').bind(code).first();
}

export async function logTx(DB, code, kind, amount, balanceAfter, staff = null, note = null) {
  await DB.prepare('INSERT INTO gc_tx (code, kind, amount, balance_after, staff, note, created_at) VALUES (?,?,?,?,?,?,?)')
    .bind(code, kind, amount, balanceAfter, staff, note, now()).run();
}

// Create a new, already active digital card (online purchase, studio digital sale, bonus).
export async function issueDigital(DB, f) {
  const code = await uniqueCode(DB);
  const t = now();
  const expires = f.isBonus ? GC.bonus.expires : expiryFor();
  await DB.prepare(`INSERT INTO gc_cards (code, status, format, edition, source, initial_value, balance, is_bonus, bonus_of, expires_at, lang,
      order_id, buyer_name, buyer_email, recipient_name, message, sold_by, note, created_at, activated_at)
      VALUES (?, 'active', 'digital', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(code, GC.edition.id, f.source, f.amount, f.amount, f.isBonus ? 1 : 0, f.bonusOf || null, expires, f.lang || 'de',
      f.orderId || null, f.buyerName || null, f.buyerEmail || null, f.recipientName || null, f.message || null,
      f.staff || null, f.note || null, t, t)
    .run();
  await logTx(DB, code, 'issue', f.amount, f.amount, f.staff || null, f.isBonus ? `Bonus${f.bonusOf ? ' zu ' + f.bonusOf : ''}` : f.note || null);
  return getCard(DB, code);
}

// Turn a blank printed card (status inactive) into an active one.
export async function activatePrinted(DB, code, f) {
  const t = now();
  const expires = f.isBonus ? GC.bonus.expires : expiryFor();
  const r = await DB.prepare(`UPDATE gc_cards SET status='active', source=?, initial_value=?, balance=?, is_bonus=?, bonus_of=?, expires_at=?,
      order_id=?, buyer_name=?, buyer_email=?, recipient_name=?, message=?, sold_by=?, note=?, activated_at=?, lang=COALESCE(?, lang)
      WHERE code=? AND status='inactive'`)
    .bind(f.source, f.amount, f.amount, f.isBonus ? 1 : 0, f.bonusOf || null, expires, f.orderId || null, f.buyerName || null,
      f.buyerEmail || null, f.recipientName || null, f.message || null, f.staff || null, f.note || null, t, f.lang || null, code)
    .run();
  if (!r.meta.changes) return null;
  await logTx(DB, code, 'activate', f.amount, f.amount, f.staff || null, f.isBonus ? `Bonus zu ${f.bonusOf}` : f.note || null);
  return getCard(DB, code);
}

// Atomic redeem: only succeeds if enough balance is left.
export async function redeem(DB, code, amount, staff, note) {
  const r = await DB.prepare(`UPDATE gc_cards SET balance = balance - ?, status = CASE WHEN balance - ? = 0 THEN 'used' ELSE status END
      WHERE code = ? AND status = 'active' AND balance >= ?`).bind(amount, amount, code, amount).run();
  if (!r.meta.changes) return null;
  const card = await getCard(DB, code);
  await logTx(DB, code, 'redeem', -amount, card.balance, staff, note);
  return card;
}

// What a printed card / public page may show.
export function publicView(card) {
  return {
    code: card.code,
    status: card.status,
    format: card.format,
    edition: card.edition,
    initial: card.initial_value,
    balance: card.balance,
    expires: card.expires_at,
    isBonus: !!card.is_bonus,
    recipient: card.recipient_name ? card.recipient_name.split(' ')[0] : null,
    lang: card.lang,
  };
}
