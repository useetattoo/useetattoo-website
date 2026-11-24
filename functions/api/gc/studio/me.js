// GET /api/gc/studio/me — is this device logged in? + staff names for the picker.
import { GC } from '../../../../server/giftcards/config.js';
import { json, handle, db, isStudio, isAdmin, seedStaff } from '../../../../server/giftcards/util.js';

export const onRequestGet = handle(async ({ request, env }) => {
  const studio = await isStudio(env, request);
  if (!studio) return json({ ok: true, studio: false });
  const DB = await db(env);
  await seedStaff(DB, GC.staff);
  const { results } = await DB.prepare('SELECT name, pin_hash IS NOT NULL AS pin FROM gc_staff WHERE active = 1 ORDER BY name').all();
  return json({ ok: true, studio: true, admin: !!(await isAdmin(env, request)), staff: results, amounts: GC.amounts, bonus: GC.bonus });
});
