# BerkahEmas — Software Toko Emas

Version 1.2.0. Website assets: `public/brand/berkahemas/v1/` (the directory is retained for existing links).
The sibling video-brand assets have not been changed by this website refresh.

Use Inter for body text, navigation, controls and prices; Marcellus for editorial headings.
Preserve the geometric B and gold-bar cue. Full logos display Software Toko Emas.
Use ivory #F8F5ED, porcelain #FFFDF8, midnight blue #102D50, and #0A1E36 hover states.
Gold #C6A15B is a limited decorative accent; gold text on light surfaces uses #80601F.
Main text is #172C44, supporting text #56667A, and borders #E4DDCE.
Primary buttons use porcelain on blue; blue sections use ivory text and warm gold details.
Aim for 70% light surfaces, 25% blue, and 5% gold. Use 8–12px corners, fine rules and quiet shadows.
Preserve screenshot proportions and use fictional demo data. Never recolor the product screenshots.

The website sells ready-to-use gold-store software. Lead with inventory, POS, buyback and reports;
the main CTA starts a free three-day trial on the platform. Paid-package actions open WhatsApp sales,
while assisted product demo/contact remains a separate path. Existing technical domains and contacts remain in use.
Use no unsupported customer counts, ratings, certifications, speed promises or testimonials.
Client metadata and prerendering share `src/data/brand.js` and the bilingual content JSON.

Use upright Marcellus at weight 400; Inter uses the requested 300-700 range. Small labels, controls, numbers and code-style labels use Inter.

## Landing-page navigation and states

Keep the blue, ivory, and gold identity while making trial and paid paths distinct in both languages.
Pricing must identify whether values came from the subscription service, a saved response, or static reference copy;
if the service cannot confirm an update, advise visitors to confirm prices with sales and offer a retry.
Switching language should preserve a valid section anchor. The expanded small-screen menu closes with Escape,
and keyboard users can skip directly to the main content.
Mobile product previews retain their original proportions and offer an accessible link to the full image.
When no gold feed is configured or usable, show a compact unavailable notice and the official source link;
never manufacture a market price. Keep source, publication time, basis, and denomination detail when real records exist.
The dormant contact form must not claim delivery success from an opaque response. Activating it requires a readable
acknowledgement contract or an honest unconfirmed state and a contact fallback.
The geometric B mark stays intact. The SVG wordmarks embed Inter, and their PNG exports and social preview match; see `public/brand/berkahemas/v1/Inter-OFL.txt` for the embedded font license.
The gold cursor ring tracks the mouse across the page with eased movement and expands over controls.
It hides for touch, keyboard navigation, text entry, window exit and reduced motion. Retain the native cursor.
The hero pointer light is also decorative and disabled for touch/reduced motion.
Content remains visible without entrance animations. Respect reduced motion for every shared component.

## Gold-price activation

The default release has no feed and shows an unavailable state plus an official source link.
Set the build-time public `REACT_APP_GOLD_PRICE_URL` only after verifying a normalized endpoint.
GitHub builds read the same-named repository variable; local builds can use `.env.local`.
The endpoint must permit the site's origin (or be on the same origin). Never put provider secrets in React environment variables.
Responses are an array or `{ "data": [...] }`, with records shaped as follows:

```json
{
  "product": "ANTAM",
  "priceType": "retail",
  "amountIdr": 2000000,
  "weightGrams": 1,
  "basis": "Harga dasar, belum termasuk pajak",
  "sourceName": "ANTAM Logam Mulia",
  "sourceUrl": "https://logammulia.com/harga-emas",
  "publishedAt": "2026-10-26T08:30:00+07:00"
}
```

This is a contract example, not a current market quote. Supply separate `retail` and `buyback` records.
Retail amounts are published totals per bar for each positive `weightGrams`; buyback records must use one gram.
The summary selects only 1g records. The expandable table shows every supplied retail denomination.
Optional `branchName` keeps boutiques distinct. Supply one standard gold-bar product family; do not mix
jewelry or commemorative premiums into this reference. Preserve the provider's exact tax/basis explanation.
Optional `amountWithTaxIdr` and `taxBasis` must be supplied together. The frontend never calculates tax.
De-duplicate by price type, weight and branch, selecting the newest valid quote for each.
Prices must be positive JSON numbers. Publication times require an explicit timezone, cannot be in the future,
and are displayed in WIB. Source links require HTTPS.
Quotes from a previous Jakarta calendar date are stale, including on weekends. Failed refreshes retain the original
timestamp and show an unconfirmed-update label. Missing or malformed prices never become zero.
Polling runs every 15 minutes while visible and revalidates on tab return. Local storage is optional and scoped to the endpoint.
Provider procurement, backend integration and deployment are separate from this visual refresh.

Validation: `npm test -- --watch=false --runInBand`, `node scripts/brand-metadata.test.cjs`, and `npm run build`.

## ANTAM integration findings (26 October 2026)

The public `/harga-emas` Nuxt bundle calls `POST https://api.logammulia.com/api/miscservice/PriceByBranch/list/v2`
with `branchCode` and `userType`, and uses `result.priceDate` and `result.groupedProducts`.
Its public API client enables encryption and sends signature/device headers. This is an observed website endpoint,
not a documented third-party API contract. Requests and CORS preflight from `https://berkahemas.web.id` returned
HTTP 403 with `Invalid CORS request`. Browser navigation was also denied by its edge service in this environment.
Do not point `REACT_APP_GOLD_PRICE_URL` at this protected endpoint. Direct browser integration is not verified.
A permitted server-side integration or approved provider must expose the normalized contract above; no signing
material, authentication/session credentials or encryption implementation from ANTAM is copied into this app.
The official page link works independently of feed configuration. No sample prices ship as current market data.
