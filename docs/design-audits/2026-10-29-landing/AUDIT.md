# BerkahEmas UI/UX audit

Date: 29 October 2026 (Asia/Jakarta). Status: **all finding IDs approved by the developer and implemented within the proposal's frontend scope**.

## Scope and baseline

Target: `D:/Repos/astaenterprise`, revision `abfaf3236dfec8fbcd773ff8023752cc50bb0489`. Working tree was clean before inspection. Only this audit directory was added. No applicable AGENTS.md was found in the workspace or checked ancestors. Existing DESIGN.md is preserved.

The application serves a single landing page at `/` and `/en`; wildcard routes also render Home. Scope covers header/navigation, hero, gold reference, workflow/features, access information, gallery, onboarding explanation, trial/pricing, FAQ, final CTA, footer and floating WhatsApp. The IDE's ContactForm is reviewed separately because Contact.jsx is not mounted in App.js. Other dormant page files and the external ERP/trial application are not active surfaces of this audit.

## Product context

| Context | Evidence and status |
| --- | --- |
| Audience | **Inferred, high confidence:** prospective gold-store owners/operators evaluating software; DESIGN.md and bilingual Home copy. Actual user research and role distribution are **unknown**. |
| Main tasks | **Observed:** inspect inventory/POS/buyback/reporting examples, compare packages, start a three-day trial, or contact sales through WhatsApp. Home.jsx, GoldHero.jsx, conversionLinks.js. Conversion rates are **unknown**. |
| Content hierarchy | **Observed:** hero, gold reference, workflow features, store access, gallery, signup explanation, pricing/trial, FAQ, final invitation. App.js, Home.jsx and browser heading inventory. |
| Platform/input | **Observed:** React 19, React Router, CRACO, Tailwind, Framer Motion; browser links/buttons and external conversion destinations. package.json, App.js. Mouse/keyboard and narrow layouts are implemented; physical touch behavior is **unverified**. |
| Brand/localization | **Observed:** BerkahEmas, ivory/midnight-blue/gold, Marcellus headings and Inter body; Indonesian and English. DESIGN.md, index.css, local font files, brand-content.json. Current files supersede older forest-green notes. |
| Accessibility | **Observed:** main/nav landmarks, visible global focus rules, FAQ expanded states, gallery pressed states, reduced-motion styles, price live region. No full accessibility certification claimed. |
| Integrations | **Observed:** subscription API with cached/static fallback, optional normalized gold feed, external trial signup, WhatsApp links. Live availability and delivery are **unknown**; outbound browser traffic was blocked. |
| Assets/performance | **Observed:** local fonts, product screenshots labeled demo data, WebP support and deferred nonhero images. Production performance, real-device rendering and offline completeness are **unknown**. |

## Method

Primary reference: [Impeccable](https://github.com/pbakaus/impeccable), cached revision `5adaee704634e9031ec8943721c4ffa1a3c22221`, located using the design-audit source-status helper. Read its SKILL.md, audit reference and relevant critique guidance. It fits refinement of an existing public site: examine hierarchy, task clarity, responsive behavior, accessible controls and truthful state feedback while retaining the current brand.

Applied under the [design-audit workflow](D:/Repos/design-guidance-library/skills/design-audit/SKILL.md). Upstream launchers, detectors, hooks, installers and critique orchestration were not run; upstream references were advisory, not separately invoked workflows. No score is assigned from incomplete accessibility/performance coverage. No external design research or paid service was needed.

## Verification and evidence inventory

Fresh local development server compiled successfully at `127.0.0.1:3100`. Headless Microsoft Edge was driven through an already-installed Playwright package in the sibling workspace; no dependencies were installed or changed. Initial bundled-browser launch failed because its executable was missing; installed Edge was used successfully after a sandbox escalation.

| Evidence | Coverage |
| --- | --- |
| [observations.json](evidence/observations.json), [inspect.cjs](evidence/inspect.cjs) | `/` at 1440×1000 and 390×844; `/en` at 390×844 and 768×1024. Heading/CTA inventories, document width, pricing fallback text, FAQ and gallery activation, first keyboard focus, mobile/tablet Escape behavior, page errors. |
| `evidence/*-hero.png`, `*-pricing.png`, `*-menu.png` | Actual viewport screenshots from those cases. Early menu images can include animation settling; use the settled capture for final tablet assessment. |
| [navigation.json](evidence/navigation.json), [navigation.cjs](evidence/navigation.cjs) | Pricing anchor → English switch; settled tablet menu and mobile section captures. |
| [desktop hero](evidence/id-1440-hero.png), [mobile hero](evidence/id-390-hero.png), [mobile pricing](evidence/id-390-pricing.png) | Visually reviewed composition, CTA placement and pricing readability. |
| [settled tablet menu](evidence/en-768-menu-settled.png), [mobile gallery](evidence/en-390-gallery.png), `evidence/en-390-gold.png` | Menu recovery and product-preview/empty-state captures. Gallery element screenshot includes the sticky header overlay from capture scroll positioning; this is not evidence of an anchor-offset defect. |
| Source | App.js, Home.jsx, shared components, plan services, brand-content.json, index.css, DESIGN.md and manifest/config. Dormant ContactForm inspected without submission. |

No page-level horizontal overflow at the four tested route/size combinations. No uncaught page errors in those runs. FAQ expanded and gallery selection changed as expected. First Tab reached the logo with a visible 2px outline. These are focused checks, not complete keyboard, contrast or WCAG verification. Nonhero lazy images were not all checked for successful load.

All browser runs used reduced motion and blocked external requests, including plan/price services. Thus the screenshots show the local build and fallback/unavailable content, not verified production data. Gold loading/fresh/stale states were reviewed in source only; no configured feed or transaction submission was exercised. Native mobile devices, screen readers, zoom, normal-motion performance, full footer interactions and end-to-end signup remain unverified. No forms were rendered on the active routes. No production build or test suite was run for this artifact-only audit.

## Findings

Priorities: P1 = significant trust/access problem; P2 = usability friction; P3 = maintainability/polish. No P0 blocker was demonstrated. Effort: small = localized change; medium = coordinated UI/state work; large = external contract/service work.

### DA-001 — P1: Pricing fallback has no visible freshness distinction

**Observed, high confidence; active pricing.** `Home.jsx:42–64` retains only returned plan data; `planService.js:43–67` can return cached/null data on failure; `planPresentation.js:8` uses static tiers when no paid records exist. The blocked-network browser run displayed Rp 499.000 and Rp 1.199.000 without identifying them as fallback values. This does not prove those amounts are wrong; it proves the UI cannot distinguish a verified current price from a fallback.

**Impact:** visitors may treat an unconfirmed amount as a current offer. **Proposal:** carry source/freshness/error metadata to pricing; label static/stale values as reference prices pending sales confirmation, retain usable package links and show a retry control when appropriate. Resolve the exact approved fallback wording before release; do not change commercial amounts as part of this audit.

**Acceptance:** fresh API, static fallback, stale cache and failed refresh each have intentional localized feedback; trial remains distinct from paid sales. **Effort:** medium. Files: Home.jsx, planService.js, planPresentation.js, brand-content.json and focused state tests.

### DA-002 — P2: Language change loses the visitor's section

**Observed, high confidence; shared navigation.** In navigation.json, clicking Pricing positioned the page at y=6344 with `#pricing`; switching to English produced `/en#pricing` but y=0. LanguageSwitcher.jsx preserves the hash, while PageShell.jsx:11–13 unconditionally scrolls to the top on pathname changes.

**Impact:** visitors must find the same comparison or answer again. **Proposal:** after the translated content renders, restore a valid hash target with sticky-header clearance; retain top reset for navigation without an anchor.

**Acceptance:** ID ↔ EN at pricing, gallery and FAQ keeps the selected section visible, with valid browser back/forward behavior and reduced-motion support. **Effort:** small. Files: PageShell.jsx, LanguageSwitcher.jsx; focused navigation check.

### DA-003 — P2: Expanded menu lacks Escape recovery

**Observed, high confidence; mobile/tablet navigation.** Escape left `aria-expanded=true` at 390 and 768 widths. Navbar.jsx has no Escape handler. The settled tablet capture shows a large expanded navigation area plus duplicate language/trial controls from the header and menu.

**Impact:** keyboard users have to find the toggle again; tablet controls repeat unnecessarily. **Proposal:** Escape closes the disclosure and restores focus to its toggle; closing by anchor should preserve a useful destination focus. Show language/trial controls only once at tablet widths. Keep this an ordinary disclosure, not a focus-trapped modal.

**Acceptance:** keyboard opening/closing, anchor selection and resizing work at 390/768/1280 widths; menu state stays announced. **Effort:** small. File: Navbar.jsx. Escape absence is a usability finding, not by itself a claimed WCAG violation. A fleeting blank selected language pill in an early capture resolved after settling and is not filed as a persistent defect.

### DA-004 — P2: No direct keyboard bypass to main content

**Observed, high confidence; shared shell.** PageShell.jsx supplies a main landmark but no skip link or main target; first keyboard focus is the logo, followed by header controls.

**Impact:** sighted keyboard users repeat header navigation to reach content. **Proposal:** add a localized, focus-visible “Skip to content” link targeting a focusable main container. Preserve the existing visible focus system.

**Acceptance:** first Tab exposes the link; Enter places focus at main, below the sticky header; test both languages and mobile menu states. **Effort:** small. Files: PageShell.jsx, index.css, brand-content.json. This is a concrete accessibility improvement; no full conformance verdict is asserted.

### DA-005 — P2: Mobile product screenshots cannot be inspected closely

**Observed visual limitation, high confidence; hero/features/gallery.** The 390px gallery capture scales a full desktop inventory screen into a narrow card. BrowserMockup.jsx presents a noninteractive image, without enlargement. Its proportions are preserved correctly, but interface labels become difficult to inspect.

**Impact:** visitors can see the product's overall appearance but struggle to evaluate its working screens. **Proposal:** add an explicitly labeled “View larger screenshot” link to the existing full-resolution asset, with translated context that it contains demo data. Keep the inline image and adjacent workflow summary. No new image assets or modal dependency are needed.

**Acceptance:** every relevant screenshot can be opened at its original size by keyboard and touch; asset labels and original proportions remain intact. **Effort:** small. Files: BrowserMockup.jsx and localized copy/callers.

### DA-006 — P2: Long mobile evaluation path gives unavailable market data early prominence

**Observed composition; inferred impact, medium confidence.** Current page height is about 13,600 CSS pixels at 390px, versus 9,640 at desktop, under the captured font/data state. Gold reference precedes workflow proof; with no feed it repeats unavailable messages and retains a detailed empty disclosure. Features and the gallery both present product proof before pricing.

**Impact hypothesis:** prospective buyers may spend too much time traversing secondary or repetitive material. Length alone is not a failure and no conversion loss was measured. **Proposal:** retain a compact unavailable gold-source notice and move the expanded market reference below core product proof; add an understated “View plans” hero link to the existing pricing anchor. Reduce mobile section spacing selectively from 80px to 48–64px, keeping desktop editorial space. Preserve factual feature content; do not remove modules without evidence.

**Acceptance:** trial and paid plan paths are easy to locate at 390px; unavailable data appears once clearly with the official link; populated reference still exposes source/time/basis and denomination details. Compare before/after screenshots and keyboard reading order. **Effort:** medium. Files: Home.jsx, GoldHero.jsx, GoldPriceReference.jsx, index.css, brand-content.json. Tradeoff: reduced early emphasis on market information in favor of software evaluation.

### DA-007 — P3: Active design contract describes an outdated primary CTA

**Observed, high confidence.** DESIGN.md:16 says the main CTA is “Minta Demo BerkahEmas”; current hero/nav copy and conversionLinks.js implement free trial signup, with paid purchases through WhatsApp.

**Impact:** future edits could undo the intended conversion distinction. **Proposal:** after approval, update this paragraph to describe trial-first behavior and separate sales/demo contact. Preserve the current blue/ivory/gold tokens and gold-feed contract.

**Acceptance:** DESIGN.md, both language variants and destination helpers agree on trial versus paid/contact paths. **Effort:** small. File: DESIGN.md only, plus review of conversion destinations. No active contract changes were made during the audit.

### DA-008 — P1 before reactivation only: Dormant contact form overstates delivery success

**Source-observed, high confidence; not an active-route defect.** ContactForm.jsx:44–59 posts with `mode: "no-cors"`, then reports success whenever fetch resolves. An opaque response cannot confirm application acceptance. Its loading text is only an ellipsis, status/error content lacks live announcements, and English success text says “within ASAP.” Burgundy hardcoded accents also differ from the current brand.

**Impact if reintroduced:** an inquiry could appear accepted without confirmed delivery, and status changes would be unclear. **Proposal:** keep the form dormant unless needed. Before reactivation, use a readable acknowledged response contract, or an explicit unconfirmed-submission state with a contact fallback; provide descriptive localized loading/status/error text, `type="tel"`/autocomplete hints, and current color tokens. Do not invent an SLA or recipient guarantee.

**Acceptance:** mock accepted/rejected/network/opaque cases, preserve entered values on failure, announce state changes and test keyboard/mobile layout before adding a route. **Effort:** medium frontend; potentially large if a server endpoint is required. Files: ContactForm.jsx and its eventual copy source; backend location/contract is unknown. No routing activation, backend provisioning or form submission is included in approval of frontend fixes. NewsletterForm and other dormant screens remain outside implementation scope.

## What to retain

- Distinctive, coherent midnight-blue/ivory/gold identity, restrained editorial headings and actual demo screenshots.
- Clear three-day trial terms and separate paid-package WhatsApp links; no invented social proof.
- Gold reference does not fabricate a price when unavailable; source/time/basis handling is already explicit.
- Working FAQ/gallery state semantics, local fonts, image proportions, and visible focus styling.
- No horizontal page overflow in the tested viewports. No need for a framework, animation-library or identity replacement.

## Proposed implementation packages

| Package | IDs / files | Effort and verification |
| --- | --- | --- |
| Trust and navigation | DA-001–004; Home, plan services, shell, navigation, copy/CSS | Medium combined; focused fallback/navigation tests and keyboard checks. |
| Mobile evaluation | DA-005–006; BrowserMockup, hero, Home, gold reference, CSS/copy | Medium; compare 390/768/1440 captures, inspect image destinations and populated/unavailable reference. |
| Contract alignment | DA-007; DESIGN.md | Small; merge approved proposal without replacing existing feed/brand guidance. |
| Dormant-form hardening | DA-008; ContactForm only until endpoint needs are resolved | Optional medium frontend; acknowledgement integration dependent on a real service contract. Do not activate the route. |

No new dependency, paid asset, hosting change, production write or deployment is proposed for DA-001–007. DA-008 may require separately scoped service work. Preserve existing API shapes, both routes/languages, factual copy, local assets, no-feed safeguards and external destination helpers. A new PRODUCT.md is not necessary for this scope.

## Developer decision

The developer chose **implement all** in the conversation after reviewing this report. “All” includes frontend hardening of DA-008 but does not authorize its route activation or an unspecified backend integration.

This design-audit workflow requires your approval before applying design changes. The skill states: **“Implementing the findings requires the developer's explicit approval of the concrete proposal.”** See [the invoked SKILL.md](D:/Repos/design-guidance-library/skills/design-audit/SKILL.md) and [DESIGN.proposed.md](DESIGN.proposed.md).

## Implementation record

Approved IDs: DA-001 through DA-008. Completed frontend IDs: DA-001 through DA-008. The revision remained `abfaf3236dfec8fbcd773ff8023752cc50bb0489` before changes; only the audit directory was untracked at implementation start.

- DA-001: `src/services/planService.js` now returns live/cached/stale/static status; `src/pages/Home.jsx` displays localized source/freshness text and retry alongside packages. Static price amounts and trial/purchase destinations were preserved.
- DA-002: `src/components/PageShell.jsx` restores valid hash anchors after route/language changes with sticky-header clearance. The final-build browser check switched from Indonesian pricing to English pricing and measured `#pricing` at 90.7px from the viewport top instead of returning to the hero.
- DA-003: `src/components/Navbar.jsx` closes the expanded menu on Escape and returns focus to the toggle. Duplicate language/trial controls are hidden inside the expanded tablet menu.
- DA-004: `PageShell.jsx` adds a localized first-focus skip link and focusable main target.
- DA-005: `src/components/BrowserMockup.jsx` adds a translated full-image link for each product preview.
- DA-006: `src/components/GoldHero.jsx` adds a plans link, `Home.jsx` moves the gold reference below software evaluation and reduces narrow-layout section spacing, and `src/components/GoldPriceReference.jsx` compresses the unavailable state while retaining full quote details when data exists.
- DA-007: root `DESIGN.md` now reflects trial-first conversion, distinct paid sales contact, price-state communication and the approved navigation/image behaviors. Existing brand and gold-feed contract were retained.
- DA-008: `src/components/ContactForm.jsx` now treats opaque responses as unconfirmed, keeps the form and entered data for recovery, offers WhatsApp contact, describes loading/errors, adds input hints, and uses current brand tokens. The form remains dormant; no backend acknowledgement service or route was added.

Modified source: `DESIGN.md`, `src/pages/Home.jsx`, `src/services/planService.js`, `src/data/brand-content.json`, `src/components/{GoldHero,GoldPriceReference,BrowserMockup,Navbar,PageShell,ContactForm}.jsx`, and focused tests. `DESIGN.proposed.md` remains a historical proposal; the approved rules were merged into root `DESIGN.md`.

Verification: `npm test -- --watchAll=false --runInBand` passed **37 tests in 4 suites**; `npm run build` and prerender for `/` and `/en` passed; `git diff --check` found no whitespace errors. The browser used the local production build in headless Microsoft Edge with outbound requests blocked and reduced motion. [after.json](evidence/after.json) records successful skip-link focus, pricing fallback notice, screenshot links, Escape/focus recovery, no page overflow or uncaught page errors at 390/768/1440 widths, and anchor restoration. `evidence/after-*.png` contains captured pricing/menu views. No external trial, WhatsApp, price API, contact delivery, physical touch, screen reader or production deployment was verified. The cross-origin legacy contact endpoint can still yield only an unconfirmed result until it supplies readable acknowledgement; this is intentionally disclosed to the visitor. No commit, publish or deployment occurred.
