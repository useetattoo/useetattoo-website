// GET /api/gc/admin/export?what=cards|tx — CSV download (for the accountant).
import { bad, handle, db, isAdmin } from '../../../../server/giftcards/util.js';

const csv = (rows) => {
  if (!rows.length) return '';
  const cols = Object.keys(rows[0]);
  const cell = (v) => (v == null ? '' : /[",;\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
  return [cols.join(';'), ...rows.map((r) => cols.map((c) => cell(r[c])).join(';'))].join('\n');
};

export const onRequestGet = handle(async ({ request, env }) => {
  if (!(await isAdmin(env, request))) return bad('login', 401);
  const what = new URL(request.url).searchParams.get('what') === 'tx' ? 'tx' : 'cards';
  const DB = await db(env);
  const { results } = await DB.prepare(what === 'tx'
    ? 'SELECT * FROM gc_tx ORDER BY id'
    : "SELECT code, status, format, edition, source, initial_value, balance, is_bonus, bonus_of, expires_at, order_id, serial, buyer_name, buyer_email, recipient_name, sold_by, note, created_at, activated_at FROM gc_cards WHERE status!='inactive' ORDER BY activated_at").all();
  return new Response('﻿' + csv(results), {
    headers: { 'content-type': 'text/csv;charset=UTF-8', 'content-disposition': `attachment; filename="usee-gutscheine-${what}-${new Date().toISOString().slice(0, 10)}.csv"`, 'cache-control': 'no-store' },
  });
});
