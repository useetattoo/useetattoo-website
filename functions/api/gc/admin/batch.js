// POST /api/gc/admin/batch {count, note} — create blank printed cards (inactive) for the print shop.
// GET  /api/gc/admin/batch?id= — list a batch's codes (for the print sheet).
import { GC } from '../../../../server/giftcards/config.js';
import { json, bad, body, handle, db, isAdmin, uuid, now, uniqueCode, str } from '../../../../server/giftcards/util.js';

export const onRequestPost = handle(async ({ request, env }) => {
  if (!(await isAdmin(env, request))) return bad('login', 401);
  const b = await body(request);
  const count = Number(b.count);
  if (!Number.isInteger(count) || count < 1 || count > 300) return bad('count');
  const DB = await db(env);
  const id = uuid();
  const last = await DB.prepare('SELECT COALESCE(MAX(serial),0) s FROM gc_cards WHERE edition = ?').bind(GC.edition.id).first();
  const t = now();
  const stmts = [DB.prepare('INSERT INTO gc_batches (id, edition, count, created_at, note) VALUES (?,?,?,?,?)').bind(id, GC.edition.id, count, t, str(b.note, 120))];
  const seen = new Set();
  for (let i = 1; i <= count; i++) {
    let code; do { code = await uniqueCode(DB); } while (seen.has(code));
    seen.add(code);
    stmts.push(DB.prepare(`INSERT INTO gc_cards (code, status, format, edition, initial_value, balance, batch_id, serial, created_at)
      VALUES (?, 'inactive', 'physical', ?, 0, 0, ?, ?, ?)`).bind(code, GC.edition.id, id, last.s + i, t));
  }
  await DB.batch(stmts);
  return json({ ok: true, id });
});

export const onRequestGet = handle(async ({ request, env }) => {
  if (!(await isAdmin(env, request))) return bad('login', 401);
  const id = new URL(request.url).searchParams.get('id');
  const DB = await db(env);
  const batch = await DB.prepare('SELECT * FROM gc_batches WHERE id = ?').bind(id).first();
  if (!batch) return bad('not_found', 404);
  const { results } = await DB.prepare('SELECT code, serial, status FROM gc_cards WHERE batch_id = ? ORDER BY serial').bind(id).all();
  return json({ ok: true, batch, cards: results, edition: GC.edition, site: env.GC_SITE_URL || GC.siteUrl });
});
