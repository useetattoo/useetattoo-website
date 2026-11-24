// GET /api/gc/config — public settings for the shop page.
import { GC } from '../../../server/giftcards/config.js';
import { json, handle } from '../../../server/giftcards/util.js';
import { isMock, isEnabled } from '../../../server/giftcards/paypal.js';

export const onRequestGet = handle(async ({ env }) => {
  const day = new Date().toISOString().slice(0, 10);
  const bonusActive = day >= GC.bonus.activeFrom && day <= GC.bonus.activeUntil;
  return json({
    ok: true,
    enabled: isEnabled(env),
    mock: isMock(env),
    paypalClientId: isEnabled(env) && !isMock(env) ? env.GC_PAYPAL_CLIENT_ID : null,
    amounts: GC.amounts,
    customMin: GC.customMin,
    customMax: GC.customMax,
    shippingFee: GC.shippingFee,
    shipCountries: GC.shipCountries,
    maxDeliveryDays: GC.maxDeliveryDays,
    edition: GC.edition,
    bonus: bonusActive ? { rules: GC.bonus.rules, until: GC.bonus.activeUntil, expires: GC.bonus.expires } : null,
  });
});
