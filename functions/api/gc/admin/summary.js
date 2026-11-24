// GET /api/gc/admin/summary — numbers + recent activity for the management dashboard.
import { GC } from '../../../../server/giftcards/config.js';
import { json, bad, handle, db, isAdmin, seedStaff, today } from '../../../../server/giftcards/util.js';

export const onRequestGet = handle(async ({ request, env }) => {
  if (!(await isAdmin(env, request))) return bad('login', 401);
  const DB = await db(env);
  await seedStaff(DB, GC.staff);
  const q = (sql, ...a) => DB.prepare(sql).bind(...a);
  const [tot, bySource, byEdition, byMonth, sold, redeemed, tx, orders, staff, batches, blanks, expiring] = await DB.batch([
    q(`SELECT
        COALESCE(SUM(CASE WHEN is_bonus=0 AND status!='inactive' AND status!='void' THEN initial_value END),0) AS sold_value,
        COALESCE(SUM(CASE WHEN is_bonus=0 AND status!='inactive' AND status!='void' THEN 1 END),0) AS sold_count,
        COALESCE(SUM(CASE WHEN is_bonus=1 AND status!='inactive' AND status!='void' THEN initial_value END),0) AS bonus_value,
        COALESCE(SUM(CASE WHEN status='active' AND expires_at >= ? THEN balance END),0) AS open_balance,
        COALESCE(SUM(CASE WHEN status='active' AND is_bonus=0 AND expires_at >= ? THEN balance END),0) AS open_paid_balance
      FROM gc_cards`, today(), today()),
    q(`SELECT source, COUNT(*) n, SUM(initial_value) v FROM gc_cards WHERE status NOT IN ('inactive','void') GROUP BY source ORDER BY v DESC`),
    q(`SELECT edition, COUNT(*) n, SUM(initial_value) v FROM gc_cards WHERE status NOT IN ('inactive','void') AND is_bonus=0 GROUP BY edition ORDER BY v DESC`),
    q(`SELECT substr(activated_at,1,7) m, COUNT(*) n, SUM(initial_value) v FROM gc_cards WHERE status NOT IN ('inactive','void') AND is_bonus=0 GROUP BY m ORDER BY m DESC LIMIT 12`),
    q(`SELECT t.staff, COUNT(*) n, SUM(t.amount) v FROM gc_tx t JOIN gc_cards c ON c.code=t.code WHERE t.kind='activate' AND t.staff IS NOT NULL AND c.is_bonus=0 GROUP BY t.staff`),
    q(`SELECT staff, COUNT(*) n, -SUM(amount) v FROM gc_tx WHERE kind='redeem' GROUP BY staff`),
    q(`SELECT t.*, c.is_bonus, c.source FROM gc_tx t LEFT JOIN gc_cards c ON c.code=t.code ORDER BY t.id DESC LIMIT 150`),
    q(`SELECT id, format, amount, bonus, buyer_name, buyer_email, recipient_name, ship_city, card_code, fulfilled_at, status, created_at, paid_at FROM gc_orders WHERE status='paid' ORDER BY paid_at DESC LIMIT 100`),
    q(`SELECT name, active, pin_hash IS NOT NULL AS pin FROM gc_staff ORDER BY name`),
    q(`SELECT b.*, (SELECT COUNT(*) FROM gc_cards c WHERE c.batch_id=b.id AND c.status='inactive') AS blank FROM gc_batches b ORDER BY created_at DESC`),
    q(`SELECT COUNT(*) n FROM gc_cards WHERE status='inactive'`),
    q(`SELECT code, balance, expires_at, recipient_name FROM gc_cards WHERE status='active' AND expires_at BETWEEN ? AND date(?, '+60 day') ORDER BY expires_at`, today(), today()),
  ]);
  return json({
    ok: true, totals: tot.results[0], bySource: bySource.results, byEdition: byEdition.results, byMonth: byMonth.results,
    sold: sold.results, redeemed: redeemed.results, tx: tx.results, orders: orders.results, staff: staff.results,
    batches: batches.results, blanks: blanks.results[0].n, expiring: expiring.results, edition: GC.edition,
  });
});
