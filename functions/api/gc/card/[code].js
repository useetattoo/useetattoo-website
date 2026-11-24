// GET /api/gc/card/:code — public balance check (what the QR page shows).
import { json, bad, handle, db, cleanCode } from '../../../../server/giftcards/util.js';
import { getCard, publicView } from '../../../../server/giftcards/cards.js';

export const onRequestGet = handle(async ({ params, env }) => {
  const code = cleanCode(params.code);
  if (code.length !== 10) return bad('not_found', 404);
  const card = await getCard(await db(env), code);
  if (!card || card.status === 'void') return bad('not_found', 404);
  return json({ ok: true, card: publicView(card) });
});
