// Shared helpers for the gift card Pages Functions.

export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json;charset=UTF-8', 'cache-control': 'no-store', ...headers },
  });

export const bad = (error, status = 400) => json({ ok: false, error }, status);

export async function body(request) {
  try { return await request.json(); } catch { return {}; }
}

export const now = () => new Date().toISOString();

// Card codes: 10 chars, no look-alike characters (0/O, 1/I/L). ~10^15 combinations.
const ALPHA = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export function newCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  let s = '';
  for (const b of bytes) s += ALPHA[b % ALPHA.length];
  return s;
}
export const fmtCode = (c) => `${c.slice(0, 5)}-${c.slice(5)}`;
export const cleanCode = (c) => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

export const uuid = () => crypto.randomUUID();

export const str = (v, max = 200) => String(v ?? '').trim().slice(0, max);
export const isEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- PIN hashing (PBKDF2) ----------
const enc = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

export async function hashPin(pin, salt = hex(crypto.getRandomValues(new Uint8Array(16)))) {
  const key = await crypto.subtle.importKey('raw', enc.encode(String(pin)), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode(salt), iterations: 50000 }, key, 256);
  return `${salt}:${hex(bits)}`;
}
export async function checkPin(pin, stored) {
  if (!stored) return false;
  const [salt] = stored.split(':');
  return (await hashPin(pin, salt)) === stored;
}

// ---------- Signed session cookies ----------
async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, enc.encode(msg)));
}
export async function makeSession(env, role, hours) {
  const exp = Date.now() + hours * 3600e3;
  const payload = `${role}.${exp}`;
  return `${payload}.${await hmac(env.GC_SESSION_SECRET, payload)}`;
}
export async function readSession(env, request, role) {
  const cookie = request.headers.get('cookie') || '';
  const m = cookie.match(new RegExp(`(?:^|; )gc_${role}=([^;]+)`));
  if (!m || !env.GC_SESSION_SECRET) return false;
  const [r, exp, sig] = decodeURIComponent(m[1]).split('.');
  if (r !== role || Number(exp) < Date.now()) return false;
  return sig === (await hmac(env.GC_SESSION_SECRET, `${r}.${exp}`));
}
export const sessionCookie = (role, value, hours) =>
  `gc_${role}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${Math.round(hours * 3600)}`;

// Constant-time-ish string compare for passwords
export function same(a, b) {
  a = String(a || ''); b = String(b || '');
  if (!a || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

// ---------- Database schema (created automatically on first use) ----------
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS gc_cards (
    code TEXT PRIMARY KEY,
    status TEXT NOT NULL,              -- inactive | active | used | void
    format TEXT NOT NULL,              -- digital | physical
    edition TEXT,
    source TEXT,                       -- web | studio | event | bonus
    initial_value INTEGER NOT NULL DEFAULT 0,
    balance INTEGER NOT NULL DEFAULT 0,
    is_bonus INTEGER NOT NULL DEFAULT 0,
    expires_at TEXT,
    lang TEXT DEFAULT 'de',
    order_id TEXT,
    batch_id TEXT,
    bonus_of TEXT,
    serial INTEGER,
    buyer_name TEXT,
    buyer_email TEXT,
    recipient_name TEXT,
    message TEXT,
    sold_by TEXT,
    note TEXT,
    created_at TEXT NOT NULL,
    activated_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS gc_orders (
    id TEXT PRIMARY KEY,
    paypal_id TEXT,
    status TEXT NOT NULL,              -- created | paid | failed
    format TEXT NOT NULL,
    amount INTEGER NOT NULL,
    shipping INTEGER NOT NULL DEFAULT 0,
    bonus INTEGER NOT NULL DEFAULT 0,
    edition TEXT,
    lang TEXT,
    buyer_name TEXT, buyer_email TEXT,
    recipient_name TEXT, recipient_email TEXT, message TEXT, deliver_at TEXT,
    ship_name TEXT, ship_street TEXT, ship_zip TEXT, ship_city TEXT, ship_country TEXT,
    card_code TEXT, bonus_code TEXT,
    fulfilled_at TEXT, fulfilled_by TEXT,
    created_at TEXT NOT NULL, paid_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS gc_tx (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    kind TEXT NOT NULL,                -- issue | activate | redeem | void | adjust
    amount INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    staff TEXT,
    note TEXT,
    created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS gc_staff (
    name TEXT PRIMARY KEY,
    pin_hash TEXT,
    active INTEGER NOT NULL DEFAULT 1,
    failed INTEGER NOT NULL DEFAULT 0,
    locked_until TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS gc_batches (
    id TEXT PRIMARY KEY,
    edition TEXT, count INTEGER, created_at TEXT, note TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS gc_outbox (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    to_addr TEXT, subject TEXT, html TEXT, send_at TEXT, status TEXT, created_at TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS gc_tx_code ON gc_tx(code)`,
  `CREATE INDEX IF NOT EXISTS gc_cards_order ON gc_cards(order_id)`,
];

let ready = false;
export async function db(env) {
  if (!env.GC_DB) throw new Error('GC_DB binding missing');
  if (!ready) {
    await env.GC_DB.batch(SCHEMA.map((s) => env.GC_DB.prepare(s)));
    ready = true;
  }
  return env.GC_DB;
}

export async function seedStaff(DB, names) {
  await DB.batch(names.map((n) => DB.prepare('INSERT OR IGNORE INTO gc_staff (name) VALUES (?)').bind(n)));
}

// Verify a staff PIN with a simple lockout (5 wrong tries -> 10 minutes).
export async function verifyStaff(DB, name, pin) {
  const s = await DB.prepare('SELECT * FROM gc_staff WHERE name = ? AND active = 1').bind(name).first();
  if (!s) return 'unknown_staff';
  if (!s.pin_hash) return 'pin_not_set';
  if (s.locked_until && s.locked_until > now()) return 'locked';
  if (await checkPin(pin, s.pin_hash)) {
    await DB.prepare('UPDATE gc_staff SET failed = 0, locked_until = NULL WHERE name = ?').bind(name).run();
    return 'ok';
  }
  const failed = s.failed + 1;
  const lock = failed >= 5 ? new Date(Date.now() + 10 * 60e3).toISOString() : null;
  await DB.prepare('UPDATE gc_staff SET failed = ?, locked_until = ? WHERE name = ?').bind(lock ? 0 : failed, lock, name).run();
  return 'wrong_pin';
}

export async function uniqueCode(DB) {
  for (let i = 0; i < 8; i++) {
    const c = newCode();
    const hit = await DB.prepare('SELECT 1 FROM gc_cards WHERE code = ?').bind(c).first();
    if (!hit) return c;
  }
  throw new Error('code_generation_failed');
}

export const today = () => new Date().toISOString().slice(0, 10);
export const isExpired = (card) => card.expires_at && card.expires_at < today();

// Wrap a handler: JSON errors instead of crashes.
export const handle = (fn) => async (ctx) => {
  try { return await fn(ctx); }
  catch (e) { console.error('giftcards', e?.stack || e); return json({ ok: false, error: 'server_error' }, 500); }
};

export async function isStudio(env, request) {
  return (await readSession(env, request, 'studio')) || (await readSession(env, request, 'admin'));
}
export const isAdmin = (env, request) => readSession(env, request, 'admin');
