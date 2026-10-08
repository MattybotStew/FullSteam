# Homepage Art Direction — v1

> **Version:** 1.0 (first visual direction — homepage only)
> **Status:** Draft for review. Not yet applied to any wireframe.
> **Owner:** Matt Stewart (Creative Director) · **Wireframe:** Bionic
> **Track:** This is the **visual design** pass. It is the companion to, not a rewrite
> of, the UX spec in [`design.md`](../../design.md). It does **not** change structure,
> IA, or copy intent — those are locked in `wireframes.md` §2, KB §23/§24, and
> `content-slots.md`.
> **Sources (authoritative):** KB §15 (locked palette) · §18 (client look & feel) ·
> §23/§24 (locked opening + page order) · §25 (Strategic Positioning 2026).

---

## 0. Read this first — what this document is and is not

This is the **art direction for the homepage**: how the locked structure is *felt* —
color, type, imagery, composition, motion, texture. It is the input that later becomes
the style guide / design tokens and, eventually, the applied design in `design.md`.

- **Locked by the client — do not change:** the brand palette (§15), the sitemap/IA,
  the section order, the two-axis opening (Axis A → grow morph → Axis B), the two
  headlines, and the primary CTA "Explore our vertical solutions."
- **Proposed here — needs sign-off:** typography faces, the Axis A visual treatment,
  photographic grade, and accent-color deployment. Everything "proposed" is flagged
  `[proposal]`.
- **Still open (not resolved here):** stat publishability (OI-5), marquee-backer logos,
  video production scope, the exact founder-CTA position. These are **flag-for-client**
  items listed in §9.

**Primary lens (KB §25.5):** investors — the page must *feel* like scale. Founders are
the secondary read. The art direction serves "way more impressive than you thought"
(KB §24.1) through **feeling**, never through a forbidden claim (no revenue, run-rate,
or profitability — KB §20.4/§20.7).

---

## 1. The single organizing idea

> **Quiet confidence at scale.**

The visual language must do one thing above all: make Fullsteam *feel* large, modern,
and inevitable without saying it in a claim. Institutional-capital credibility
(Aquiline / Sixth Street / ADIA) crossed with operating-company warmth (real people,
real software doing real work).

Four feelings the page must land, in order of importance:

1. **Scale** — full-bleed imagery, oversized type, big numerals. Scale is *seen*, not
   claimed.
2. **Modern / engineered** — precise mono accents, generous whitespace, tight grid.
   This is the "system of record + operational excellence" signal made visual (KB §24.1).
3. **Premium** — restraint. One accent color per moment, no decoration for its own sake.
   This is the Quilt / Bending Spoons register (KB §18), minus the dated typography.
4. **Human** — candid, real people and product-in-context imagery. The warmth that
   keeps a holding company from reading cold (KB §25.1 "humanize the holding company").

**The reference blend (what we borrow, from KB §18):**
- **Quilt** — premium restraint, stats given visual weight, video. *(borrow the feel, not their look)*
- **Bending Spoons** — sparse, editorial, long-form confidence.
- **Square** — confident, broad-vertical energy; type-over-image hero. *(aspirational feel only)*
- **Reject (client-disliked):** FrontierGrowth's dated typography; TogetherWork's stock
  photography; DaySmart's GTM/product-led portfolio framing.

**Anti-goals (never ship):** stock photography · dated/heavy corporate look · a SaaS
feature-grid as the story · "Platform" language · decorative clutter · more than one
accent color active at a time.

---

## 2. Color system

> **Palette is LOCKED** (KB §15). This section defines *deployment*, not new colors.

| Token | HEX | Job on the homepage |
|---|---|---|
| Bio Blue | `#00587C` | **Anchor.** Primary CTA, links, logo accent, the identity color. The "trust + ownership" color (Axis A's world). |
| Gold | `#FFC600` | **Accent — growth.** The "then we grow it" / AI / innovation highlight. Used sparingly, one moment at a time. |
| Green | `#84BD00` | **Accent — confirmation.** Positive proof (a single growth arrow, a resolved stat). Rarer than gold. |
| Black | `#000000` | **Premium neutral.** The dark bands (stats, verticals filmstrip, close). The "impressive" canvas. |
| White | `#FFFFFF` | **Premium neutral.** The light bands (what we do, AI, people). The "clarity" canvas. |
| Tints (10–90%) | — | Backgrounds, hairline dividers, hover/active states. Never a wash of a core color. |

**Deployment rules:**

1. **Canvas alternation carries the narrative.** The page rhythm is light → dark → light
   → dark: *Opening (light identity → dark growth) · What we do (light/tan tint) · Stats
   (black) · Verticals filmstrip (black) · AI (light) · Great place to work (warm tint) ·
   Close (black or blue).* The dark bands are where scale and proof live.
2. **Blue anchors, never fills.** Bio Blue is for CTAs, links, and small identity marks —
   not full-bleed blue sections (keeps it from reading as a corporate SaaS template).
3. **One accent per moment.** Gold *or* green, never both in the same viewport. Reserve
   gold for "growth/AI" beats and green for "proof/resolved" beats.
4. **The opening is color-coded to the axes.** Axis A (identity/ownership) sits on the
   light canvas with **blue** identity marks; the grow morph opens into Axis B (growth)
   on the **black** canvas with **gold** as the growth accent. The transition literally
   moves from "blue = owned" to "gold = growing." *(This is a proposal — see §3.3.)*
5. **Contrast is non-negotiable.** Text on black/blue must clear WCAG AA (4.5:1);
   `#FFC600` and `#84BD00` are accent-only — never body text on white.

---

## 3. Typography `[proposal — faces need sign-off]`

The wireframes currently run Helvetica + a system mono for **legibility only** (AGENTS.md).
This section defines the *character* the type system must have; the named faces are a
recommendation to confirm with the client before applying.

### 3.1 Three voices, one system

| Voice | Character required | Recommended face | Used for |
|---|---|---|---|
| **Display** | Humanist/geometric sans, tight tracking (−0.03em), large optical sizes, confident | Instrument Sans (or similar) | H1/H2/H3, hero, band headlines |
| **Body** | Same family, comfortable reading size, generous line-height (1.5) | Instrument Sans | Paragraphs, ledes, links |
| **Mono** | Precise, engineered; the "operational excellence" signal | Fragment Mono (or similar) | Beat numbers, kickers, stat labels, data, meta |

**The mono voice is the art-direction hook.** Fullsteam's story is "system of record +
operational excellence" (KB §24.1). A restrained mono for **beat markers** (`01`, `02`…),
**kickers** (`FOR FOUNDERS OF INDUSTRY SOFTWARE`), and **stat labels** (`70,000+
BUSINESS CUSTOMERS`) gives the page a precise, data-credible, engineered texture — the
visual equivalent of "we run the operations engine." It must be *small, spaced, and
rare* — a seasoning, not the body.

### 3.2 Scale & hierarchy rules

- **Headlines are the primary "impressive" device.** Band H2s at `clamp(32px, 5vw, 56px)`;
  the hero H2 larger; the H1 largest. No headline below −0.02em tracking.
- **Numerals in stats are type, not text.** They are the largest element in their band
  and may break the sans/mono split (use the display face, tabular figures).
- **Uppercase is reserved for kickers/labels** (12px mono, +0.12em), never for body.
- **8th-grade reading level** (KB §20.3) is a copy rule — but the type must *support* it:
  short measure (≤ 62ch), clear hierarchy, no dense walls. Type size ≠ intelligence.

---

## 4. Imagery & media direction

### 4.1 The photographic register

> **Real people, real software doing real work. Never stock.** (KB §20.8, §24.7)

- **Documentary, candid** — people at work, in context, not posing. "Real Fullsteam
  people" (KB §24.1 Message 5) means sourced from the actual operating companies, not a
  bank.
- **Product-in-context** — the software *is* the system of record; show screens doing
  the work (a winery taking a payment, a storage facility on a device) rather than a
  hero mockup. KB §20.8 / §25.2 ("invisible, embedded").
- **Consistent grade.** One warm-neutral, slightly desaturated treatment across all
  imagery. Two tonal keys, tied to the narrative:
  - **Identity / portfolio** (Axis A, verticals): a cool, slightly blue-shifted grade —
    the "system" register.
  - **People / growth** (Great place to work, AI-in-action): a warmer, human register.
- **Leadership only** in portraits (KB §20.7) — real portraits, not stock headshots.

### 4.2 Video (in scope — KB §18)

- **Hero / mission video** — full-bleed, audio + visual, not talking-head-only (KB §20.8).
- **Customer/testimonial video** — real voice + real context.
- **Production is a content-planning item** (KB §18 cross-cutting theme 1); the art
  direction assumes it, the SOW (§21) schedules it. Flag sourcing in §9.

### 4.3 What imagery must *not* be

- No stock photography (client-disliked — KB §18). No dated look. No full-staff group
  shots. No invented metrics rendered as if real. No named acquisitions as imagery until
  cleared (KB §20.7).

---

## 5. Grid, spacing & composition

- **Containers:** `1120px` (content) / `1280px` (wide: filmstrip, footer) — inherited
  from the wireframe. Do not change.
- **Vertical rhythm:** full bands at `96px` padding; the page breathes. Whitespace *is*
  the premium signal (Bending Spoons register).
- **Editorial asymmetry over symmetry.** Where the wireframe is symmetric (centered
  band-heads), keep it — but let imagery bleed to the frame and let type sit off-axis in
  the dark bands. Premium ≠ centered-everything.
- **The stats band is the composition set-piece.** Oversized numerals, mono labels,
  generous spacing between figures, one gold accent on the lead figure. This is the
  single "impressive" moment (KB §24.3) — it must feel *larger* than everything around it.
- **Responsive:** the filmstrip, stats, and opening degrade to single-column on mobile;
  type scales via `clamp()`; no interaction is desktop-only (KB §5).

---

## 6. Motion principles

> **The grow morph is LOCKED** (KB §23.6) — interpolated, per-frame, no CSS transition.
> Everything below is *new* motion direction for the rest of the page.

1. **The grow morph is the hero motion.** Axis A's visual grows to fill the frame into
   Axis B (KB §23.3). It is the only "big" motion. Nothing else competes with it.
2. **Scroll reveals are quiet.** Fade-up + slight translate on band entrance, eased, fast
   (~400ms). No bounces, no elastic, no decorative parallax.
3. **Count-up numerals** on the stats band (already scaffolded in the wireframe) — the
   numbers *tick* as they enter. This is motion *in service of the scale feeling*.
4. **The verticals filmstrip** expand/shrink (client-liked — KB §24.1) is kept; treat its
   easing as smooth and heavy, not springy.
5. **Reduced motion collapses everything to in-flow.** The pin is skipped, states render
   A above B, numerals render final value, no reveals. (KB §23.3 / `prefers-reduced-motion`.)
6. **No motion without intent.** Every animation must map to a meaning (scale, growth,
   proof) — never "because it can."

---

## 7. Section-by-section art direction

> Order and content are LOCKED (`wireframes.md` §2). This is the *treatment* per section.

### 7.1 Opening — Axis A → grow morph → Axis B (KB §23/§24)

- **Axis A (identity/ownership).** Light canvas. Mosaic H1 over a **single identity/scale
  visual** (§3.3 below). Blue identity marks. Kicker in mono. The H1 is the largest type
  on the page.
- **The grow morph.** The Axis A visual grows to fill the frame (interpolated clip-path +
  opacity). No CSS transition. During the grow, the light canvas yields to black.
- **Axis B (growth model).** Black canvas. Hero H2 + kicker + Offerings sub-line in white;
  the primary CTA in **gold** (the growth accent). Copy fades in over the settled visual.
- **Feel target:** "we own this world" (A) opening into "and this is how it compounds"
  (B). The *impressive* feeling (KB §24.5) comes from the scale of the A visual and the
  weight of the B canvas — not from more content.

### 7.2 What we do — Acquire / Grow / Lead (KB §24.2)

- Light band (white or a 10% Bio Blue tint). Three columns, each led by a **mono index**
  (`01 Acquire`), a confident H3, and a short paragraph. Hairline top rule (already in the
  wireframe) — keep, it reads as "engineered."
- **Founder CTA band** — a contained card (Bio Blue or white with a blue rule), set apart
  from the triad. "A home for the business you built" framing (KB §20.4). Position TBD (§9).
- The founder **voice quote** below it: large, light, editorial.

### 7.3 Impressive stats — `#investors` (KB §24.3)

- **Black band.** The composition set-piece (§5). Oversized tabular numerals that count up;
  mono labels beneath; one **gold** accent on the lead figure. This band *is* the investor
  proof (KB §25.5 primary lens).
- **Optional (flag §9):** a "Backed by leading institutional capital" lockup — Aquiline /
  Sixth Street / ADIA wordmarks in a quiet mono strip. Do **not** ship until cleared (KB §25.2).

### 7.4 Verticals filmstrip (KB §24.1 — client-liked, keep)

- **Black band** (already in the wireframe). Keep the featured-panel expand treatment the
  client likes. Real vertical imagery in the cards (identity grade, §4.1). Vertical names
  in the display face; KPI in tabular numerals. All 11 text links beneath in mono/small.

### 7.5 AI at Fullsteam (KB §24.4)

- **Light band.** Three use-case cards (forecasting / back office / support) with
  diagram-or-UI imagery. **Gold** is the AI/innovation accent here (matches §2.4). Use
  cases first — never a headcount story (KB §20.5).

### 7.6 Great place to work (KB §24.1 Message 5)

- **Warm band** (tan tint or warm-neutral photo treatment). The **human** register (§4.1):
  a real-photography gallery (candid team/office, no stock). Captions in mono. This is the
  warmth that counterbalances the black "impressive" bands above.

### 7.7 Closing CTA

- **Black or Bio Blue band.** Oversized headline re-offering the journey; the primary CTA
  in gold (or white on blue). One sentence of company context. No new content — momentum
  only (KB §4.8).

### 7.8 Chrome & footer

- **Header:** sparse, sticky (Option B revised — KB §14). White when at rest; the existing
  tan/rule state on scroll is a wireframe convenience — replace with white → subtle
  black-hairline + slight elevation. **Do not** add a competing CTA in chrome (KB §5).
- **Menu overlay:** dark or white sheet, full L1 + all 11 verticals (KB §14). Mono labels.
- **Footer:** quiet utility (tan is a wireframe convenience; use white or black), legal
  links, no Newsroom (removed — KB §14).

---

## 8. The opening's "impressive" delivery — resolves KB §24.5 `[proposal]`

The client asked for a landing that feels *bigger*, and Axis A is "one identity/scale
visual" whose form was left as a **design/animation decision**. Recommendation:

**Axis A = a full-bleed, graded film of the portfolio at work** — a slow pull-through of
real vertical software in use (a POS ringing up, a marina booking, a winery taking a
payment), cut with a single human moment. Not 11 tiles, not a literal list — **one
living proof-of-scale** that *shows* "whatever the industry, we own the software it runs
on" without enumerating it.

- The grow morph then opens this film's frame to full-screen as it settles into Axis B's
  black hero — the same visual, now the *growth* stage.
- **Fallback if video is not produced in time for v1:** a full-bleed image montage with
  the same grade, treated with the same slow-motion scroll. The direction is identical;
  only the medium degrades.
- **Why not a "scale graphic" / data-viz:** a chart reads as *explanation*, not *scale*,
  and risks the dated look we're avoiding. Real software at work is both warmer and more
  credible for a validation site (KB §20.2).

*This is the single most consequential open art decision — it needs the client's call
before production. Flag it first (§9).*

---

## 9. Open items / flag for client

| # | Item | Status |
|---|---|---|
| 1 | **Axis A visual = film (recommended) vs. image montage vs. scale graphic** (KB §24.5) | **Needs client decision — first** |
| 2 | **Typefaces** (Instrument Sans + Fragment Mono proposal, §3) | Sign-off |
| 3 | **Stat set publishability** — 11 · 70,000+ · $75B+ · 480M+ · 2,000+ (KB §22.5 / OI-5) | Publishability |
| 4 | **Marquee backers** — Aquiline · Sixth Street · ADIA (KB §25.2) | Publishability |
| 5 | **Video production scope** (hero/mission + testimonials) (KB §18) | Planning / SOW §21 |
| 6 | **Founder-CTA position** (after triad vs. between Acquire and Grow — KB §24.5) | Confirm |
| 7 | **Real imagery sourcing** from operating companies (KB §24.7) | Assets |
| 8 | **Accent deployment** — gold=growth / green=proof (this doc §2.4) | Sign-off |

---

## 10. Hand-off & track boundary

- This document is the **visual direction**. It changes nothing in the wireframes or
  `design.md` until the client signs it off.
- Once signed: tokens land in `03_Design/style-guide/`; applied design lands in `design.md`
  (its "future home"); the wireframe skin is then replaced deliberately, with a changelog
  entry in `wireframes.md` §8.
- **Do not** restyle a wireframe from this document before sign-off (AGENTS.md track rule).

*Visual direction grounded in KB §15 (palette), §18 (references), §20 (discovery), §23/§24
(opening + order), §25 (strategic positioning). Locked items are marked; proposals are
flagged `[proposal]` and surfaced in §9.*
