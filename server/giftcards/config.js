// Gift card settings — the ONE place to change amounts, offers and editions.
// Everything here is public business logic (no secrets). Secrets live in
// Cloudflare Pages environment variables, see GIFTCARDS.md.

export const GC = {
  currency: 'EUR',

  // Preset amounts shown as buttons on the shop page.
  amounts: [50, 100, 150, 200, 300],
  // Free amount the buyer can type in.
  customMin: 25,
  customMax: 2000,

  // Purchased value is valid 3 years, until 31 Dec of (year of purchase + 3)
  // (§§ 195, 199 BGB). Do not shorten without legal advice.
  validityYears: 3,

  // Physical card: printed card in an envelope, posted by the studio.
  shippingFee: 0,
  shipCountries: ['DE', 'AT', 'NL', 'BE', 'FR', 'DK', 'PL', 'CH', 'LU', 'CZ'],

  // Digital delivery date can be chosen up to this many days ahead
  // (email provider limit is 30 days).
  maxDeliveryDays: 29,

  // Current edition — printed on cards and shown on the shop page.
  // Swap the image when Yousef's design arrives.
  edition: {
    id: 'christmas-2026',
    name: { de: 'Christmas Edition', en: 'Christmas Edition' },
    image: '/images/giftcards/edition-christmas-2026.svg',
  },

  // "Gift for the giver" offer: buying at least `min` gives the BUYER a separate
  // bonus card of `bonus`. Highest matching rule wins. Bonus credit is free, so it
  // can expire earlier than paid credit. Bonus cards are personal to the buyer
  // (not transferable) so they cannot just be handed on with the gift.
  bonus: {
    activeFrom: '2026-11-24',
    activeUntil: '2026-12-31',
    expires: '2027-06-30',
    rules: [
      { min: 300, bonus: 50 },
      { min: 200, bonus: 25 },
    ],
  },

  // Staff that can sell and redeem at the studio (PINs are set in the admin page).
  staff: ['Josef', 'JVD', 'Cali'],

  // Where order notifications (physical cards to post) are sent.
  studioEmail: 'info@useetattoo.com',
  siteUrl: 'https://useetattoo.com',
};

export function bonusFor(amount, now = new Date()) {
  const b = GC.bonus;
  const day = now.toISOString().slice(0, 10);
  if (day < b.activeFrom || day > b.activeUntil) return 0;
  const rule = [...b.rules].sort((x, y) => y.min - x.min).find((r) => amount >= r.min);
  return rule ? rule.bonus : 0;
}

export function expiryFor(now = new Date()) {
  return `${now.getUTCFullYear() + GC.validityYears}-12-31`;
}

export function validAmount(n) {
  return Number.isInteger(n) && n >= GC.customMin && n <= GC.customMax;
}
