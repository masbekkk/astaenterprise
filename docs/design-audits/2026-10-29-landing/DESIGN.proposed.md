# BerkahEmas — proposed targeted design revisions

**Historical proposal, approved 29 October 2026 for DA-001 through DA-008.** The implemented design rules are merged into root DESIGN.md; this file records the reviewed proposal and is not the active design contract. See [AUDIT.md](AUDIT.md) for verification and remaining integration limits.

## Preserve the observed system

- Brand: BerkahEmas / Software Toko Emas; geometric B and gold-bar cue.
- Colors: ivory `#F8F5ED`, porcelain `#FFFDF8`, primary midnight blue `#102D50`, hover `#0A1E36`, main text `#172C44`, secondary text `#56667A`, borders `#E4DDCE`. Gold `#C6A15B` is decorative; small gold text on light surfaces uses `#80601F`.
- Type: Marcellus regular 400 for editorial headings; Inter for body, controls, labels and amounts. Existing responsive hero scale 2.625–4.25rem; body approximately 1rem, support 0.875rem, small notes 0.75rem. Preserve current fonts and avoid introducing another typeface.
- Layout: maximum 80rem content shell, 24px mobile and 40px larger-screen horizontal padding; 80px sticky header. Desktop split hero; mobile stacked content. Current 8–12px corners, fine borders and quiet shadows remain.
- Product images: retain proportions, colors and demo labels. Keep high-priority hero loading and deferred downstream assets.
- Language: `/` Indonesian, `/en` English, factual parity and separate localized trial and paid-sale destinations.

## Proposed hierarchy and spacing — DA-005/006

Keep the hero and primary free-trial action. Add a tertiary text link to plans. Place core product proof ahead of the expanded market reference. For missing price data, use one compact explanatory notice and official-source link; retain fuller detail for actual supplied records. Do not use fabricated numbers or imply a live feed.

Use 48–64px vertical section padding on narrow layouts where current repeated 80px sections delay comparison; retain desktop 80–112px editorial pacing. Keep 16–24px local content gaps and readable copy widths. These are proposed choices, not claims that these values are already active everywhere.

Add a translated “View larger screenshot” action beside product previews linking to the original asset. Browser zoom/back provides a minimal enlargement path without adding a dialog system. Keep text summaries available independently of image text.

## Controls and navigation — DA-002/003/004

First keyboard control: localized skip link, visible only on focus, targeting main. Preserve clear focus rings and use an appropriate contrasting ring on dark surfaces.

Language changes retain the current valid section anchor after translated layout settles. Routes without a section start at the top. Navigation remains a nonmodal disclosure: Escape closes and returns focus to the toggle; links close it normally. Avoid duplicating language/trial controls between header and expanded tablet navigation.

Aim for 44px primary touch targets when adjusting controls; do not describe every smaller existing control as a standards violation. Check spacing, zoom and actual keyboard behavior.

## States and trust — DA-001/008

Pricing must distinguish current API data, cached data awaiting refresh, static reference prices and failed refresh. Preserve existing cards while loading where possible; use concise localized status text with a retry action and sales confirmation path. Do not claim a fallback is inaccurate, only unconfirmed. Confirm fallback wording before release without changing commercial amounts.

Gold feed: preserve the current normalization, source, tax/basis, publication time, stale and unavailable rules. No provider activation is part of this proposal.

Dormant contact form: only claim acceptance when acknowledged by a readable response; otherwise communicate an unconfirmed attempt. Describe loading, announce errors/status and retain entered values. Use existing primary/error tokens and improve English copy without a promised response time. Reactivating contact or newsletter routes is outside this proposal.

## Motion and runtime

Retain existing CSS/Framer Motion and reduced-motion behavior. No new motion package, animation sequence, paid imagery or service. Check normal-motion behavior separately during implementation verification; this audit's browser baseline used reduced motion.

## Difference from active DESIGN.md — DA-007

On approval, revise only the obsolete demo-first CTA paragraph: the main action starts the free three-day trial; paid packages lead to WhatsApp; assisted product demos/contact remain distinct. Preserve the established blue palette, logo, font guidance, screenshot rules and full gold-feed contract. Merge approved navigation/state rules from this proposal, not unapproved alternatives.

## Acceptance and limits

Review both languages at 390, 768 and 1440px, keyboard bypass/menu/anchor behavior, focused pricing state fixtures, screenshot links, and actual gold-state fixtures. Test zoom and normal/reduced motion. No physical-device, screen-reader, production performance or external signup/delivery result has yet been demonstrated. Consult AUDIT.md for file-level scope, dependencies and decision status.
