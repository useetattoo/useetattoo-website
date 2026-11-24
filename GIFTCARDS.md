# Gift cards (Gutscheine)

Online + printed gift cards with one shared ledger. Every card has its own code and QR code; the value lives only in the database, never on paper.

## Pages
| URL | Who | What |
|---|---|---|
| `/de/gift-cards/`, `/en/gift-cards/` | customers | shop: amount, digital or printed card, PayPal checkout, terms |
| `/g/CODE` | everyone | short link inside every QR code. Customers → card page, logged-in studio device → studio tools |
| `/de/gift-cards/card/?c=CODE` | customers | balance, validity, "book a free consultation" (noindex) |
| `/studio/` | studio iPad | sell blank printed cards, bonus cards, redeem, online orders to post (noindex) |
| `/studio/admin/` | management | numbers, activity log, search/block cards, staff PINs, print batches, CSV export (noindex) |
| `/studio/print/?id=BATCH` | management | A6 card backs with unique QR codes → "Save as PDF" → print shop |

Settings (amounts, bonus offer, edition, staff names, studio email): `server/giftcards/config.js`.
API: `functions/api/gc/*` (Cloudflare Pages Functions). Shared code: `server/giftcards/*`.

## One-time setup (Cloudflare dashboard)
1. **D1 database**: Workers & Pages → D1 → Create → name `useetattoo-giftcards`.
   Tables are created automatically on first use.
2. **Binding**: Pages project `useetattoo-website` → Settings → Bindings → Add → D1 database
   → variable name **`GC_DB`** → `useetattoo-giftcards`. Add it for **Production and Preview**.
3. **Environment variables** (Settings → Variables and Secrets; mark passwords/keys as *Secret*):

| Name | Value |
|---|---|
| `GC_SESSION_SECRET` | long random string (e.g. 40 characters) |
| `GC_STUDIO_PASSWORD` | password for the studio iPad |
| `GC_ADMIN_PASSWORD` | password for the management page (different from studio) |
| `GC_PAYPAL_ENV` | `sandbox` for testing, `live` when ready. **Not set = online sales off** (page shows a notice). `mock` = fake payments, never on production |
| `GC_PAYPAL_CLIENT_ID` / `GC_PAYPAL_SECRET` | from developer.paypal.com → Apps & Credentials (business account) |
| `GC_RESEND_API_KEY` | from resend.com (see below). Not set = emails are only logged, not sent |
| `GC_FROM_EMAIL` | `Usee Tattoo <gutschein@useetattoo.com>` |

4. **Email sending (Resend)**: create an account at resend.com → Domains → add `useetattoo.com`
   → add the shown DNS records in Cloudflare DNS → verify → API Keys → create key → `GC_RESEND_API_KEY`.
   Does not touch the Google Workspace mailboxes.
5. Redeploy (Deployments → Retry), then:
   - `/studio/admin/` → log in → **Team & PINs**: set a 4-digit PIN for Josef, JVD, Cali.
   - **Karten drucken**: create a batch (e.g. 50) → open the print sheet → save as PDF → print shop
     (front = edition artwork, back = this sheet, A6 landscape 148 × 105 mm).
   - On the iPad: open `/studio/`, log in once, add to home screen.

## Daily use
- **Sell in the studio**: take a blank card → scan the QR with the iPad camera → amount, name, PIN → Activate.
  If the sale qualifies for the bonus, scan a second blank card → Activate bonus.
- **Online printed order**: email arrives with name + address → scan a blank card → pick the order → Activate → post.
- **Redeem**: scan the customer's QR (card or phone) → amount → PIN → Redeem. Rest stays on the card.
- Every action is logged with person, time, amount and note.

## Before go-live (open)
- Privacy policy: add the section below (wording needs approval, `src/data/privacy.js` is approved text only).
- Tax advisor: confirm VAT treatment of the vouchers (likely single-purpose voucher: VAT at sale).
- Replace the placeholder edition artwork `public/images/giftcards/edition-christmas-2026.svg` (+ `.png` for email/social) with the final design.
- Confirm the bonus rules in `config.js` (currently: from €200 → €25, from €250 → €50, until 31.12.2026, bonus valid until 30.06.2027).

## Privacy policy draft (for approval)
**DE – Gutscheine.** Wenn du einen Gutschein online kaufst, verarbeiten wir deinen Namen, deine E-Mail-Adresse, bei einer gedruckten Karte die Lieferadresse sowie optional Name, E-Mail-Adresse und eine Nachricht für die beschenkte Person, um den Kauf abzuwickeln, den Gutschein zu versenden und ihn später einzulösen (Art. 6 Abs. 1 lit. b DSGVO). Die Zahlung wickelt PayPal (Europe) S.à r.l. et Cie, S.C.A., 22–24 Boulevard Royal, 2449 Luxemburg ab; dabei gelten die Datenschutzhinweise von PayPal. Gutschein-E-Mails versenden wir über den E-Mail-Dienst Resend (USA); Grundlage der Übermittlung: [vor Freigabe prüfen: EU-US Data Privacy Framework oder Standardvertragsklauseln, Anbieter und Adresse laut Resend-AVV]. Gutschein- und Kaufdaten bewahren wir wegen handels- und steuerrechtlicher Pflichten bis zu 10 Jahre auf (§ 147 AO, § 257 HGB).

**EN – Gift cards.** When you buy a gift card online, we process your name, your email address, for a printed card the delivery address, and optionally the name, email address and a message for the recipient, to complete the purchase, send the gift card and redeem it later (Art. 6(1)(b) GDPR). Payment is handled by PayPal (Europe) S.à r.l. et Cie, S.C.A., 22–24 Boulevard Royal, 2449 Luxembourg; PayPal's privacy notice applies. Gift card emails are sent via the email service Resend (USA); basis for the transfer: [check before approval: EU-US Data Privacy Framework or standard contractual clauses, provider name and address as per Resend's DPA]. Gift card and purchase data are kept for up to 10 years due to commercial and tax law obligations (§ 147 AO, § 257 HGB).

## Local testing
```bash
npm run build
cp .dev.vars.example .dev.vars   # GC_PAYPAL_ENV=mock, GC_EMAIL_MODE=mock
npx wrangler pages dev dist --d1 GC_DB=local-gc
```
