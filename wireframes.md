# Fullsteam.com Wireframe Spec

> **Version:** 0.1 (initial — structure & IA only)
> **Status:** Working spec for the homepage + chrome wireframes
> **Owner:** Matt Stewart (Creative Director) · **Wireframe build:** Bionic
> **Related:** [`design.md`](./design.md) (UX spec / later design doc),
> [`PROJECT_KNOWLEDGE_BASE.md`](./PROJECT_KNOWLEDGE_BASE.md) §14 (sitemap/IA) & §20
> (discovery-interview synthesis)

---

## 0. Read this first — wireframes are a separate track from `design.md`

This file is the **single source of truth for the wireframes**. It documents what the
HTML wireframes currently do, section by section, and what is still open.

**Boundary rules for every agent working in this repo:**

1. **Wireframes ≠ the design document.** `design.md` is the UX spec and the future
   home of the visual/design direction. This file (`wireframes.md`) governs the
   **structure, IA, content order, and interaction scaffolding** only. Do not merge
   the two, and do not let edits to one silently rewrite the other.
2. **Do not treat wireframe styling as final.** The HTML uses real brand colors,
   fonts (Instrument Sans / Instrument Serif / Fragment Mono), and layout polish
   **for legibility during review only**. None of that is an approved visual
   direction. Fonts, color application, spacing, radii, and imagery are all
   placeholders until the design pass.
3. **Do not change a wireframe to match a design idea that hasn't been agreed.**
   If a design decision lands later, record it in `design.md` first, then reconcile
   the wireframe deliberately (and note it in the changelog below).
4. **Do not change `design.md` to match a wireframe experiment.** The wireframes are
   explorations; the spec is intentional. Changes flow: discovery/KB → design.md
   intent → wireframe execution, not the reverse.
5. **Content in wireframes is placeholder unless marked "locked."** Headlines,
   stats, labels, and examples are drafts for layout review. Confidential figures
   and named case studies remain subject to the KB confidentiality convention.

---

## 1. Wireframe inventory

| File | Role | Status |
|------|------|--------|
| [`prototypes/sitemap.html`](./prototypes/sitemap.html) | Full page tree (L1 = pages); chrome/overlay/footer as access layers | Active reference |
| [`prototypes/header-wireframe.html`](./prototypes/header-wireframe.html) | Stacked chrome options 0 / A / B / C, each with its drawn-open overlay | Comparison — pick pending |
| [`prototypes/sitemap-rationale.html`](./prototypes/sitemap-rationale.html) | Rationale for IA/nav terminology decisions (incl. "Offerings") | Reference |
| [`prototypes/meganav-rationale.html`](./prototypes/meganav-rationale.html) | Rationale for mega-menu / grouped verticals | Reference |
| [`prototypes/homepage-wireframe/v0.1-rough/homepage-bendingspoons-style.html`](./prototypes/homepage-wireframe/v0.1-rough/homepage-bendingspoons-style.html) | **Current homepage direction** — Ollama-style layout, Bending Spoons structure | Active |
| [`prototypes/homepage-wireframe/v0.1-rough/alternative-home-a.html`](./prototypes/homepage-wireframe/v0.1-rough/alternative-home-a.html) | Alternative A — storytelling-led, dual-axis (Solutions / Offerings) | Alternative |
| `prototypes/homepage-wireframe/v0.1-rough/sections/` | Reserved for per-section explorations | Empty |

Preview from the repo root:

```
python3 -m http.server 8000
# → http://localhost:8000/prototypes/homepage-wireframe/v0.1-rough/homepage-bendingspoons-style.html
```

---

## 2. Current direction — `homepage-bendingspoons-style.html`

**Layout concept:** Ollama-style split feature section + Bending Spoons-style
minimal chrome and portfolio-forward homepage. Full-width navy canvas, serif
accents, mosaic of verticals in the hero.

**Chrome (Option B revised):** `Logo · For Founders · Menu · Explore Solutions`.
The menu opens a full-width overlay containing the sitemap L1 (Solutions,
Offerings, Our Story, Careers, Contact). No header search; the "find your
vertical" finder lives in the overlay / Solutions hub.

### Section-by-section

| # | Section | Intent | What's on screen | Status |
|---|---------|--------|------------------|--------|
| 1 | **Header** | Sparse chrome; audience path + primary CTA | Logo, "For Founders", "Menu" (overlay toggle), "Explore vertical solutions" pill | Built |
| 2 | **Hero** | State the model + scale, hand off one CTA | H1 "The operating system for vertical markets." + copy + primary CTA + 6-tile vertical mosaic (Hospitality, ERP, Specialty Retail, Transportation, Wine, Automotive) | Built |
| 3 | **Feature / story** | Give the two stories + AI + founders a compact tabbed home | Left tab rail: Acquire & grow · Offerings · AI at Fullsteam · For Founders; right panel with copy, visual placeholder, metric line | Built (JS tabs) |
| 4 | **Our businesses** | Portfolio proof; subset, not page-per-industry | 6 tiles ordered by revenue mix + "Browse all verticals" link | Built |
| 5 | **Offerings** | Growth-engine proof via concrete examples | 2×2 quad: Payments, Lending, Insurance, Hardware & integrations + "See all Offerings" link | Built |
| 6 | **Closing CTA** | Final action, no dead-end | "Get a feel for the portfolio in one pass." + primary CTA + quiet "For Founders" link | Built |
| 7 | **Footer** | Utility + full tree recovery | Company / Explore / Connect / Legal columns | Built |

### Deliberate choices in this wireframe

- **Primary CTA** appears in header, hero, and closing — always
  **"Explore our vertical solutions"** (full form); header uses the short form
  "Explore vertical solutions."
- **"Offerings"** is the axis label throughout (never "Platform").
- **Verticals are a flat list** in the Menu overlay (two columns, all 11) and as a
  revenue-ordered mosaic on the homepage — no macro-category labels, no 11-item chrome nav.
- **Menu overlay = the sitemap at L1**, with a note that the finder is here (not a
  header search field).
- **Metrics are embedded** in the feature panels with **[verify publishability]**
  placeholders rather than a separate stat band (confidential deck figures removed).

### Known gaps & issues (do not silently fix — see open items)

- ~~**G-1** "Browse all verticals →" linked to `#founders`.~~ **Resolved
  2026-09-10:** now targets `#solutions`.
- ~~**G-2** Footer lists **For Investors** but the chrome does not.~~ **Resolved
  2026-09-10:** For Investors deleted from the sitemap; footer link removed.
- **G-3** Feature-panel metrics use **[verify publishability]** placeholders until
  client confirms which scale/KPI signals can go on the site (OI-5).
- **G-4** **No social-proof band** (testimonials / video) despite `design.md` §4.6.
- **G-5** **No Our Story / Careers band** — employer/careers story (~15% of content
  per §20) is footer-only.
- **G-6** "For Founders" appears both as a chrome item and a feature tab; **investors
  have no band/tab at all**.
- **G-7** The feature section uses **JS tabs**; confirm this interaction is wanted on
  a validation/exploration homepage (vs. stacked sections).
- **G-8** Hero headline "The operating system for vertical markets." is the deck
  positioning line — confirm it is the approved hero message.
- **G-9** Hero mosaic and **Our businesses** section show the same six verticals —
  redundant scroll; pick teaser vs. expanded proof (client review, OI-3).

---

## 3. Alternative — `alternative-home-a.html`

A second homepage ordering for comparison: **storytelling-led, dual-axis**, and
deliberately low-fidelity (grayscale dashed boxes, palette only for legend
legibility).

Order: Hero → **Two stories (Acquire & Grow | Embedded Expansion)** → Scale stat
band → Explore by vertical (flat list) → Offerings in action → Why + social proof →
Audience bands (Founders / Investors) → Closing → Footer.

> **Note:** this alternative predates the 2026-09-10 lock that **deleted For
> Investors**. Its investor band is not part of the locked IA (KB §14). Treat the
> alternative as an ordering comparison, not the final audience structure.

Use this as the counterpoint to the current direction when deciding section order:
- **Current direction** leads with the positioning headline + vertical mosaic, and
  folds the two stories into a tabbed feature.
- **Alternative A** leads with the two stories as a visible dual-axis, then proves
  with stats, then portfolio, then offerings.

---

## 4. Header chrome options (from `header-wireframe.html`)

| Option | Chrome | Feel / risk |
|--------|--------|-------------|
| **0 — Traditional** | All L1 + hover mega-menus | Familiar, but reads as a corporate brochure bar |
| **A — Menu as the map** | Logo · Menu · CTA | Sparse, premium; audience paths one click deeper |
| **B — Founder path in chrome** | Logo · For Founders · Menu · CTA | Audience path without a six-item bar; portfolio moves to overlay (revised: For Investors removed) |
| **C — CTA-first** | Logo · one story link · Explore Solutions · Menu | One job in chrome; Offerings easy to bury |

**Current homepage implements B revised** (For Investors removed). **Provisional
pick: B revised** — pending client sign-off (OI-1). Option 0 is labeled legacy/rejected.

---

## 5. Sitemap reference

**Locked L1 (2026-09-10):** For Founders · Solutions · Offerings · Our Story ·
Careers. **For Investors was deleted.** AI at Fullsteam is a page nested under
Offerings. See `PROJECT_KNOWLEDGE_BASE.md` §14 for the full locked tree.

`prototypes/sitemap.html` is the inventory of pages (L1 = pages). The header does
**not** need to list every L1 node; chrome, the Menu overlay, and the footer are
access layers that must still reach every node. Labels in chrome/overlay/footer
must match the sitemap. Utility items (Contact, "Explore Solutions", legal) are
not L1 tree nodes.

---

## 6. Editing conventions

- Static HTML, no build step. Keep files self-contained (inline CSS/JS) so they
  preview by opening the file or via the static server.
- Low-fidelity language: dashed outlines = wireframe; solid/filled = higher
  fidelity. Alternative A follows this convention; the current direction is more
  polished (see boundary rule 2).
- Use the brand palette for **legibility only** — Bio Blue `#00587C` for
  links/CTA, Gold `#FFC600` for Offerings accent, Green `#84BD00` for AI.
- Keep copy short and obviously provisional; mark locked copy explicitly.
- Preserve the constraint words: **"Offerings"** (never Platform), hero CTA
  **"Explore our vertical solutions."**
- If you change structure or order, update the section table in §2 and the
  changelog in §8.

---

## 7. Open items (decisions needed)

- **OI-1 — Final chrome pattern.** **Provisional: B revised** (Logo · For Founders ·
  Menu · Explore Solutions). Confirm with client, then apply the chosen strip to all
  interior pages so chrome is a system, not a homepage trick.
- ~~**OI-2 — "For Investors" placement.**~~ **Resolved 2026-09-10: deleted.**
  No investor nav node or page; investors are served by homepage scale/proof +
  Contact. (KB §14 locked.)
- **OI-3 — Section order.** Current tabbed-feature direction vs. Alternative A's
  explicit two-story lanes. Which ordering best serves a validation/exploration
  homepage?
- **OI-4 — AI homepage treatment.** Dedicated page is **locked under Offerings**
  (KB §14). Still decide: keep the feature tab, give AI its own band, or fold into
  the Offerings story only.
- **OI-5 — Stat / proof strategy.** One stat band, embedded metrics, or both?
  Which figures are publishable (G-3)?
- **OI-6 — Social proof & video.** Where testimonials/mission video live (G-4).
- **OI-7 — Careers/company band.** How the ~15% employer story surfaces above the
  footer (G-5).
- **OI-8 — Feature interaction.** Keep JS tabs or stack sections (G-7).

---

## 8. Changelog

| Date | Change |
|------|--------|
| 2026-09-10 | Created wireframe spec; documented current direction, alternative A, chrome options, and open items. |
| 2026-09-10 | Post-lock audit: G-1 fixed; G-3 placeholders; sitemap Solutions hub label; doc drift; header palette aligned; OI-1 provisional B revised. |
| 2026-09-10 | Removed macro-category labels for verticals — flat 11-vertical list in overlay, sitemap, and docs. |
