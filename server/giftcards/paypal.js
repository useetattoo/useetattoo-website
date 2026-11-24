// Minimal PayPal Orders v2 client (create + capture).
// GC_PAYPAL_ENV: "live" | "sandbox" | "mock" (mock = local testing, no real payment).

const base = (env) => (env.GC_PAYPAL_ENV === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com');
// Not set = online sales switched off (the shop page shows a notice instead of a pay button).
export const isMock = (env) => env.GC_PAYPAL_ENV === 'mock';
export const isEnabled = (env) => isMock(env) || (['live', 'sandbox'].includes(env.GC_PAYPAL_ENV) && !!env.GC_PAYPAL_CLIENT_ID && !!env.GC_PAYPAL_SECRET);

async function token(env) {
  const r = await fetch(`${base(env)}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      authorization: 'Basic ' + btoa(`${env.GC_PAYPAL_CLIENT_ID}:${env.GC_PAYPAL_SECRET}`),
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!r.ok) throw new Error('paypal_auth_failed');
  return (await r.json()).access_token;
}

export async function createOrder(env, { orderId, total, description }) {
  if (isMock(env)) return `MOCK-${orderId.slice(0, 8)}`;
  const r = await fetch(`${base(env)}/v2/checkout/orders`, {
    method: 'POST',
    headers: { authorization: `Bearer ${await token(env)}`, 'content-type': 'application/json', 'PayPal-Request-Id': orderId },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: orderId,
        custom_id: orderId,
        description: description.slice(0, 120),
        amount: { currency_code: 'EUR', value: total.toFixed(2) },
      }],
      payment_source: undefined,
      application_context: { brand_name: 'Usee Tattoo', shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW' },
    }),
  });
  const d = await r.json();
  if (!r.ok || !d.id) throw new Error('paypal_create_failed');
  return d.id;
}

// Returns { ok, amount, captureId } — amount is what PayPal actually captured.
export async function captureOrder(env, paypalId, expectedTotal) {
  if (isMock(env)) return { ok: true, amount: expectedTotal, captureId: `MOCKCAP-${paypalId}` };
  const r = await fetch(`${base(env)}/v2/checkout/orders/${encodeURIComponent(paypalId)}/capture`, {
    method: 'POST',
    headers: { authorization: `Bearer ${await token(env)}`, 'content-type': 'application/json', 'PayPal-Request-Id': `cap-${paypalId}` },
  });
  const d = await r.json();
  const cap = d?.purchase_units?.[0]?.payments?.captures?.[0];
  if (!r.ok || d.status !== 'COMPLETED' || !cap || cap.status !== 'COMPLETED') return { ok: false };
  if (cap.amount?.currency_code !== 'EUR') return { ok: false };
  return { ok: true, amount: Number(cap.amount.value), captureId: cap.id };
}
