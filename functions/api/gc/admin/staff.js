// POST /api/gc/admin/staff {name, pin?, active?} — add staff, set/reset a 4-digit PIN, (de)activate.
import { json, bad, body, handle, db, isAdmin, hashPin, str } from '../../../../server/giftcards/util.js';

export const onRequestPost = handle(async ({ request, env }) => {
  if (!(await isAdmin(env, request))) return bad('login', 401);
  const b = await body(request);
  const name = str(b.name, 40);
  if (!name) return bad('name');
  const DB = await db(env);
  await DB.prepare('INSERT OR IGNORE INTO gc_staff (name) VALUES (?)').bind(name).run();
  if (b.pin !== undefined && b.pin !== '') {
    if (!/^\d{4}$/.test(String(b.pin))) return bad('pin_format');
    await DB.prepare('UPDATE gc_staff SET pin_hash = ?, failed = 0, locked_until = NULL WHERE name = ?').bind(await hashPin(String(b.pin)), name).run();
  }
  if (b.active !== undefined) await DB.prepare('UPDATE gc_staff SET active = ? WHERE name = ?').bind(b.active ? 1 : 0, name).run();
  return json({ ok: true });
});
