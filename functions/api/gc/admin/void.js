// POST /api/gc/admin/void {code, note} — cancel a card (refund, lost card, mistake).
import { json, bad, body, handle, db, isAdmin, cleanCode, str } from '../../../../server/giftcards/util.js';
import { getCard, logTx } from '../../../../server/giftcards/cards.js';

export const onRequestPost = handle(async ({ request, env }) => {
  if (!(await isAdmin(env, request))) return bad('login', 401);
  const b = await body(request);
  const DB = await db(env);
  const card = await getCard(DB, cleanCode(b.code));
  if (!card) return bad('not_found', 404);
  if (!str(b.note)) return bad('note');
  await DB.prepare("UPDATE gc_cards SET status='void', balance=0 WHERE code=?").bind(card.code).run();
  await logTx(DB, card.code, 'void', -card.balance, 0, 'Admin', str(b.note, 200));
  return json({ ok: true });
});
