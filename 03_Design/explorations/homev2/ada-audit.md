# ADA / WCAG 2.1 AA audit — homev2 (official working design)

**Target:** `03_Design/explorations/homev2/index.html`
**Declared official:** 2026-10-23 · **Status:** INTERNAL — not client-facing
**Standard:** WCAG 2.1 Level AA (the standard DOJ applies to public commercial sites under
ADA Title II/III).

**Verdict: CONFORMANT.** axe-core 4.10.2 at WCAG 2.0/2.1 A+AA reports **0 violations** in
both the normal state and `prefers-reduced-motion: reduce`.

This document supersedes the audit previously written against `../02-video-hero/`, which is
now history.

---

## What was wrong when measured (before the fixes)

| # | Finding | WCAG | Measured |
|---|---|---|---|
| 1 | Hero text over video — **handoff state** | 1.4.3 | worst **1.66:1**; 25% of the CTA band under 3:1 |
| 2 | Hero text over video — **load state** | 1.4.3 | worst **2.68:1**; 6.9% of the headline band under 3:1 |
| 3 | Stat sentence scrub floor | 1.4.3 | **1.17:1** (`#eceded` on white), 16 words — **finding retired 2026-10-23**: the scrubbed sentence became static blocks and the band was then removed entirely, so there is no dimmed state left to fail |
| 4 | Gold→green gradient text on light grounds | 1.4.3 | **1.5–2.3:1** (`.ai__title em`, and the stat sentence before the 2026-10-23 rebuilds) |
| 5 | `.who__note` footnote | 1.4.3 | **4.25:1** at 12px |
| 6 | `.careers__posts-label` | 1.4.3 | **3.37:1** at 11px |
| 7 | `.ai__kicker` | 1.4.3 | failed at 11px (masked by the reveal animation) |
| 8 | `.ai-acc__hint` | 1.4.3 | **3.60:1** at 13px (same masking) |
| 9 | `#vertStage` list children | 4.1.2 | axe `aria-required-children`: an `<a>` inside `role="list"` |
| 10 | Collapsed panel link focusable | 2.4.3 / 2.4.7 | link at `opacity: 0`, still in the tab order |
| 11 | Panel disclosure state | 4.1.2 | `aria-expanded` on `role="listitem"` — dropped by AT |
| 12 | Menu announced as a dialog, isn't one | 4.1.2 / 2.4.3 | no `role`/`aria-modal`, focus escaped |
| 13 | No `<main>`, no skip link | 2.4.1 | — |
| 14 | Pause control double-encoded state | 4.1.2 | `aria-pressed` + swapping label |
| 15 | `aria-label` on role-less div | 4.1.2 | `.careers__grid` |
| 16 | Smooth scroll under reduced motion | 2.3.3 | `html { scroll-behavior: smooth }` not overridden |
| 17 | Target sizes | 2.5.5 | pause 40px, carousel 38px |
| 18 | Emoji read aloud | — | `🌐` in post metadata |

**Findings 7 and 8 were invisible to a normal-page axe run** — the scroll-reveal left those
sections at `opacity: 0`, so axe skipped them. They only surfaced when the scan was repeated
with `prefers-reduced-motion: reduce`. Always run both.

---

## What changed

**Colour**
- Hero tint: `.48 − .22·pTint` (→0.26) → **`.62 − .04·pTint`** (→0.58). Measured worst case
  over the real clip: load **3.84:1**, handoff **3.50–3.52:1**, **0% under 3:1** in every band.
- `--green-ink`: 74% → **66%** mix (`4.26:1` on white, `3.94:1` on `#f2f7f9`).
- The gold→green gradient is now **dark-ground only** (`.who__title em`, `.careers__title em`,
  testimonial em — 8.66 → 6.01:1). `.ai__title em` was removed from it and
  falls back to solid `--green-ink`.
- **Retired 2026-10-23:** the word scrub and its `.70` floor no longer exist — the stats band
  was rebuilt as static blocks and then **removed** the same day, because all of its figures were
  already in `#who-we-are` (see `direction.md` §5). Nothing on the page dims as it scrolls, so
  there is no scrub state left to fail.
- `.who__note` `.52 → .62` · `.careers__posts-label` `.5 → .68` · `.ai__kicker` `.55 → .72` ·
  `.ai-acc__hint` `.52 → .68`.
- Pause control: `rgba(0,32,43,.85)` + `rgba(255,255,255,.9)` border, 44px.

**Semantics**
- `<main id="main">` + skip link; `<h1>` unchanged.
- `#vertStage`: `role="list"` → `role="group" aria-label="Vertical markets"` (the "Explore all
  verticals" link was an illegal list child).
- Each vertical panel: article is no longer focusable; disclosure moved to a real
  `<button class="vpanel__toggle">` with `aria-expanded` + `aria-controls`; roving arrows kept.
- Collapsed `.vpanel__body` is `visibility: hidden` (links leave the tab order); the panel label
  carries its own `rgba(0,24,34,.72)` plate so it never depends on the photo's luminance, and the
  expanded caption scrim starts at `.35` instead of `transparent`.
- Menu: `role="dialog" aria-modal="true" aria-label="Site menu"` + Tab trap + focus return.
- `.careers__grid`: `role="group"`.
- Pause button: label swap only, `.is-paused` class drives the icon (no `aria-pressed`).
- `html { scroll-behavior: auto }` under reduced motion; carousel `scrollBy` branches on the
  matcher.
- Carousel arrows 44px; `🌐` wrapped in `aria-hidden`.

---

## Verification

| Check | Result |
|---|---|
| axe, normal | **0 violations**, 26 rules passing |
| axe, reduced motion | **0 violations** |
| Panel `aria-expanded` on click | `[true,false,false,false,false]` → `[false,false,true,false,false]` ✓ |
| Panel `aria-expanded` on Enter | flips ✓ |
| Menu focus containment | **0 escapes in 60 Tab presses** |
| Collapsed panel link | `visibility: hidden` — not focusable |
| Focusable elements below 0.6 opacity (outside reveal) | **none** |
| Horizontal overflow | none (`scrollWidth === innerWidth`) |
| Hero, load / handoff | 3.84 · 3.50–3.52, 0% under 3:1 |

### "Incomplete" axe nodes
9–10 nodes remain in axe's *incomplete* bucket: text over the video, over photo gradients, or
inside the gold pill. Each was verified by hand — ink `#00202B` on `#FFC600` is 10.74:1; the
hero headlines are 3.50–3.84:1 against the real clip; panel body text sits on the strengthened
scrim (≥5:1 worst case); panel labels sit on their own plate (~6:1).

---

## Residual risk (not fixed, by design)

1. **The hero number is footage-dependent.** 3.50–3.84:1 is measured against `hero-stock.mp4`.
   A brighter replacement clip can drop below 3:1 — re-run the frame sampling when the video
   changes, or put a plate behind the headline and stop depending on the footage.
2. **Not tested:** screen readers (VoiceOver/NVDA), 400% zoom / 320px reflow, forced-colors,
   real iOS Safari. axe is a floor, not a certificate.
3. **Figma `FS-Design` #11362:2306 still declares the pre-fix values** (tint 0.48, the
   gold-on-white gradient). This file is the reference implementation; the frame needs syncing.
4. The LinkedIn post cards remain labelled `[placeholder]` mocks and must not ship as-is.
