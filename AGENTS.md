# FullSteam — Agent Orientation

Welcome. This is the project workspace for the **Fullsteam.com website redesign**.
This file is the canonical agent entry point (works with Cursor, which reads
`AGENTS.md` at the repo root).

## Start here

- **Project knowledge base:** read [`PROJECT_KNOWLEDGE_BASE.md`](./PROJECT_KNOWLEDGE_BASE.md)
  before doing any work. It distills the client brief into goals, audiences,
  scope, constraints, and next steps. **§20 is the discovery-interview synthesis**
  (four internal stakeholder sessions, Sept 2026) — the most current source of
  client intent; read it before making positioning/messaging decisions.
- **Sitemap lock:** read [`plans/sitemap-lock.md`](./plans/sitemap-lock.md) before
  changing L1 nav, page inventory, or chrome. Locked 2026-09-10.
- **Wireframe spec:** read [`wireframes.md`](./wireframes.md) before editing any
  wireframe. It is the source of truth for the wireframe track — inventory,
  section-by-section structure, known gaps, and open items.
- **Content slots:** [`content-slots.md`](./content-slots.md) is the slot-by-slot
  inventory of every place copy goes, in document order, with a locked / draft /
  placeholder status and the constraint each slot must respect. It is the handoff to
  the team writing the copy — the wireframes themselves show structure only.
- **Homepage UX spec / design doc:** read [`design.md`](./design.md) before working
  on the homepage. It is the UX-only spec (audiences, flow, section intent,
  constraints, open questions) and the future home of the visual design direction.
- **Homepage opening strategy (LOCKED 2026-09-24 · Axis A amended 2026-10-01):** read **KB
  §23** (and **§24**) before touching the homepage's first viewport. The client's two-axis model
  is delivered **in sequence** — **Axis A (Portfolio) → transition → Axis B (Growth engine)**.
  The transition is the **grow morph** (interpolated clip-path traced from the Axis A visual's
  rect + opacity ramps); it must open one state into the other, and the two headlines must never
  be merged into one claim. Spec: `design.md` §3.1; build: `wireframes.md`; rules: KB §23.6.
  **Amended 2026-09-24 (same day):** the opening was first locked as a **binary snap**
  (discrete cut, no interpolation); at the **client's request** the interpolated **grow morph
  was restored** (the cut read as "just snapping in place"). The **two-state model, the two
  headlines, and the Axis A→B order are unchanged**.
  **Amended 2026-10-01 (client review):** Axis A is **no longer the 11 scattered vertical tiles**
  ("do not want 11 floating vertical bubbles") — it is **one identity/scale visual**, and the 11
  verticals live in the **filmstrip**. The grow morph's source is that visual (was the Retail tile
  `t3`). The model, the two headlines, the A→B order, and both-states-are-content are **unchanged**.
  The page after the opening was reordered — see KB **§24** and `wireframes.md` §2 (the canonical,
  up-to-date order).
- **Inspiration / layout patterns:** read [`inspiration.md`](./inspiration.md) before
  borrowing a layout idea from any reference site. It records what we take from each
  reference and what we explicitly reject, with the guardrails inline so a pattern is
  never separated from its constraint. **Cursor and any other agent: consult this file
  before proposing homepage structure changes.** Layout/structure only — it is not a
  visual direction.
- **Source assets:** the original client brief lives at
  `clientDocs/Fullsteam Web Brief (1).docx`; the internal discovery interviews live
  at `clientDocs/Fullsteam User Interview Template.xlsx`; the **content-writing
  SOW** lives at `clientDocs/Fullsteam Website Content Project Brief.docx`
  (distilled in KB **§21**); the Cloudmellow **Strategic Positioning 2026** deck
  (SWOT, interview themes, pillars, personas, authority signals) is distilled in KB
  **§25**. Treat them as source of truth; the knowledge base is
  a distillation that should stay in sync.
  **⚠ `clientDocs/` is gitignored (2026-09-24) and must never be tracked, force-added, or
  published** — the repo is **public** and GitHub Pages deploys `path: "."`, so anything
  committed there is world-readable. Five client files are already exposed in git history; the
  verified evidence and the still-open owner decision are in KB **§22.7**. If you need a client
  doc, read it locally — never `git add -f`.

## Current state (active phase)

- **Discovery is complete** — four internal stakeholder interviews were run
  (Sept 2026) and synthesized in `PROJECT_KNOWLEDGE_BASE.md` §20. Use §20 as the
  current source of client intent; use **§21** for the content track (10 pages,
  voice, copy pillars, dates through 2026-11-11).
- **Sitemap locked (2026-09-10, finalized 2026-09-14):** L1 = For Founders ·
  **Vertical Software** · **Embedded Offerings** · Our Story · Careers. **For
  Investors removed** (no nav node, no page). Under Our Story: **Leadership**.
  **Newsroom removed** (2026-09-23). For Founders is a single-page leaf; no
  category landing pages. See `plans/sitemap-lock.md` and KB §14.
- We are in the **Sitemap/Wireframe** milestone; the **homepage** is the active
  design surface and is still being iterated.
- **Header chrome (provisional):** Option **B revised** — Logo · Menu · Explore
  vertical solutions. **For Founders is not in the header strip** as of 2026-09-23; it
  lives in the Menu overlay, footer, and the closing CTA. Full L1 in the Menu overlay
  - footer. Compare options in `02_Wireframes/active/header-wireframe.html`.
- **Homepage opening = Axis A → grow morph → Axis B (locked 2026-09-24 · Axis A amended
  2026-10-01).** The first viewport is a **two-state pinned sequence**, not one hero: the
  identity/scale visual (**Axis A** — what Fullsteam owns) **grows into** the hero (**Axis B** —
  the growth model) as that visual expands to fill the frame. The transition is the grow morph,
  not a cut. **Axis A is one visual, not the 11 tiles** (client 2026-10-01); the 11 verticals
  are in the filmstrip. Canonical record: KB **§23** (guardrails §23.6) + **§24** (the review).
- **Homepage reordered from client review (2026-10-01).** Order is now Opening → **What we do**
  (Acquire/Grow/Lead + founder CTA + impressive stats) → **Verticals** filmstrip → **AI** →
  **Great place to work** → Close. The old persona door, two-up "who we are," **Software** scene,
  and homepage **Offerings** scene were removed; the **Embedded Offerings page + nav node stay**.
  Full record: KB **§24**; canonical section table: `wireframes.md` §2. **The same messaging was
  applied across all 8 interior pages (2026-10-01, KB §24.6)** — a messaging/UX pass, not a
  sitemap change.
- **Homepage opening — pins cut and mosaic fixed (2026-09-28).** *(Historical: the 11-tile
  mosaic described here was replaced by a single Axis A visual on 2026-10-01 — `fitMosaicStage`
  and the `.t1`–`.t11` tiles are gone. The pin-cut math and the morph-ramp fix still stand;
  read the tile specifics as history, not the current build.)* The two-state
  sequence and the two headlines are **unchanged**; only the cost of getting there
  was reduced. Measured at 1440×900, before → after:
  - **Sticky travel before real content: 4,500px → 962px** (46% → 12.8% of the
    scrollable page). `#top` pin 280vh → **200vh**; `#story` demoted from a 220vh
    **pin to an in-flow band** (it was 20% of the page for two cards' parallax;
    §23.6 rule 6 scopes the pin to the opening only). Proof band now reached at
    **29%** of the page, was 43%.
  - **Tile labels were being cut at every viewport 320→1920.** Fixed with a
    fixed-aspect `.mosaic-stage` (1376×525 desktop / 366×520 mobile) scaled to fit
    by `fitMosaicStage()`; `--fit` defaults to `1` so **no-JS clips rather than
    spills**, and the handler only ever scales *down*. Labels hug their word and
    anchor to the tile's inward edge, so a bleeding tile still shows a complete
    label. **Horizontal bleed is intentional for edge tiles only** — `.t1`, `.t5`,
    `.t9`; labels are never cut, and interior tiles never fall below the fold.
  - Morph ramps re-timed: the ramps now **overlap** (hero fades up as the grow
    begins, copy starts before the tiles finish leaving, grow completes near the
    end). The old mapping left a measured **~118px window with nothing on screen**
    and snapped the hero `0→1` as a hard step under the interpolated clip-path.
  - Regression to watch: any script dividing by `offsetHeight - innerHeight` for
    the old pin **must be rewritten** to viewport-travel progress (§23.6 rule 2
    still forbids CSS transitions on the per-frame writes).
- Homepage wireframe is `02_Wireframes/active/homepage.html`; interior pages sit in
  `02_Wireframes/active/pages/`. Superseded low-fi explorations are in
  `02_Wireframes/archive/`.
- Wireframe HTML files are static — preview by opening the file or with a static
  server from the repo root:
  `python3 -m http.server 8000` → http://localhost:8000/02_Wireframes/...

## Key facts (quick reference)

- Keep the Fullsteam brand identity unchanged — this is a content/IA/UX
  reorganization, not a rebrand.
- Two core stories: (1) acquire & grow vertical software, (2) expand via
  embedded offerings (payments, lending, insurance, hardware, integrations).
- **The two stories are two axes, and the homepage names them:** (1) = **Axis A
  (Portfolio)**, (2) = **Axis B (Growth engine)**. Keep the vocabularies separate —
  **axes** name the homepage's model; **nav labels** (Vertical Software / Embedded
  Offerings) name the sitemap. "The growth engine" is an axis label, never a headline.
- **Nav terminology:** the embedded-expansion axis is labeled **"Embedded
  Offerings"** (client-preferred, 2026-09-10; short form "Offerings" in body copy).
  The client rejected "Platform." See the alternatives considered in
  `PROJECT_KNOWLEDGE_BASE.md` §14 (nav terminology note) and
  `01_Discovery/synthesis/sitemap-rationale.html` §9.
- Primary audiences: software sellers/founders and investors. Secondary:
  employees and customers. **Investors have no dedicated nav/page** — served via
  homepage scale/proof + Contact.
- Primary CTA target: **"Explore our vertical solutions."**
- **Portfolio axis = "Vertical Software"** (renamed from "Solutions", 2026-09-10);
  the CTA stays **"Explore our vertical solutions."**
- **Vertical Software is a single page** (revised 2026-09-15 · sidebar inline 2026-10-01): a
  **sticky sidebar** lists all 11 verticals and **swaps the story inline** (no modal, no tiles);
  **no child pages**, no category labels. The Menu overlay lists the same 11 flat (two columns).
  Homepage shows a revenue-ordered subset only. **find-your-vertical** type-ahead filters the
  sidebar (not header search).
- **Embedded Offerings is a single page** (clarified 2026-09-28 · layout changed 2026-10-01):
  all four offerings (**Payments, Lending, Insurance, AI at Fullsteam**) sit on one page as a
  **sticky sidebar that swaps content inline** on a **white background** — the same pattern as
  Vertical Software (this **replaced** the earlier 2026-10-01 horizontal filmstrip; **flag for
  client ratification**). **No child pages** — **AI is a card/panel, not its own page** (supersedes
  the 2026-09-10 "AI is its own page"). **Hardware and Integrations are not separate pages** (folded
  into Payments / the Embedded Offerings overview), 2026-09-10.
- **Wireframe headlines are intent, not copy (2026-10-01):** every content `h1/h2/h3` across the
  homepage and the 8 interior pages reads as a short **`Intent:`** statement, with a dashed `.anno`
  note carrying detail/constraints; final copy lives in `content-slots.md`. **Primary lens:
  investors**, founders secondary (a lens only — no IA change). See KB §25.5 / §26.
- **Leadership** (`/our-story/leadership`) is a page under Our Story (2026-09-14). **Newsroom is not in the sitemap** (removed 2026-09-23).
- CMS is Duda and is likely retained.

### From discovery interviews (§20) — apply these before messaging decisions

- **The site is a validation/credibility destination, not a lead-gen engine.**
  Outbound (email, trade shows, events) drives the pipeline; the site confirms who
  Fullsteam is before a meeting. No PPC. Optimize for exploration + trust, not funnels.
- **Message order: Software → Verticals → Integrate Payments.** Software is ~3/4 of
  revenue, payments ~1/4 (profit split reversed). Payments is currently over-indexed.
- **Narrative first, data second; "who we are" over "what we do."** Humanize the
  company. Tone: 8th-grade reading level, conversational, no jargon.
- **Never frame the sale as an "exit."** Fullsteam is "a home for your business":
  values fit, certainty of close, and a bigger org that scales the founder.
- **Investors:** large PE + sovereign wealth; 3–7 yr horizon; must convey **scale**.
  Use inferable KPIs (growth, retention, margins, employee/customer counts, payment
  volume). Do **not** publish revenue/run-rate or explicit profitability.
- **AI is required in the 2026 narrative** but explain use cases first; never imply
  staff reduction. Fullsteam's proprietary vertical data is the AI differentiator.
- **Acquisitions are not announced at close** — case-by-case, usually after the
  "graduation phase" (a couple of years). Only show leadership, not full staff.
- **Confidentiality:** do not publish named acquisition case studies, revenue figures,
  or profitability. Genericize case studies (e.g. "a floral-shop software company")
  until the client confirms publishability.

## Wireframes vs. design.md — hard boundary (all agents)

The **wireframes** and the **design document** are two separate tracks. Respect
the split; do not conflate or cross-write them.

- **Wireframes** (`02_Wireframes/**/*.html`, governed by [`wireframes.md`](./wireframes.md))
  = structure, IA, content order, interaction scaffolding. They are explorations.
- **`design.md`** = the UX spec and the future **design document** (visual
  direction) — "the design MD we will work on later."
- **Do not treat wireframe styling as final.** Brand colors, the Instrument
  Sans/Serif + Fragment Mono fonts, spacing, radii, and imagery in the wireframes
  are for legibility during review only — not an approved visual direction.
- **Never edit `design.md` to match a wireframe experiment**, and never edit a
  wireframe to match an unagreed design idea. Changes flow:
  discovery/KB → `design.md` intent → wireframe execution. Reconcile deliberately
  and log it.
- If a change touches one track, say so and update the other only when explicitly
  agreed.

## Homepage opening — Axis A / Axis B (all agents)

**Locked 2026-09-24 · Axis A amended 2026-10-01.** The canonical record is KB
[`§23`](./PROJECT_KNOWLEDGE_BASE.md) + [`§24`](./PROJECT_KNOWLEDGE_BASE.md); the UX
spec is `design.md` §3.1 + §4.1; the build and its fixed defects are in `wireframes.md`. Six
rules that survive any restyle or refactor:

1. **Two states, two jobs.** **Axis A (Portfolio)** = identity/ownership — the mosaic H1 +
   **one identity/scale visual** (not the 11 tiles, as of 2026-10-01), read first. **Axis B
   (Growth engine)** = the growth model — the hero H2, revealed by the grow. Never one merged claim.
2. **The transition is the grow morph.** The **Axis A visual** grows into the hero — an interpolated
   `clip-path` + opacity ramp, **restored 2026-09-24 at the client's request** after the interim
   binary snap read as "just snapping in place." Keep the per-frame writes **free of CSS
   transitions** so the morph cannot smear. Replacing it with a hard cut is a **strategy
   change**, not a polish pass. (The grow source was the Retail tile `t3` until 2026-10-01.)
3. **The deck line is retired from the hero.** "The operating system for vertical markets"
   (KB §19.1) is not the hero message — G-8 resolved 2026-09-24.
4. **"The growth engine" names Axis B** and is an axis label, never a headline.
5. **Both states are content.** Neither is `aria-hidden`; with `prefers-reduced-motion` the
   two states render in document order, A above B. With JS off, the same in-flow fallback
   applies — the pin is gated by a `has-js` class on `<html>` (resolved 2026-09-26).
6. **Scope = the opening only.** Whether the rest of the page is two acts, and whether the
   opening also scroll-snaps, are **open** (`wireframes.md` OI-9). Do not extend it silently.

## Conventions

- All shared knowledge for this project lives at this root so any agent with
  the FullSteam project (or its subfolders, e.g. `clientDocs`) as its workspace
  can reach it.
- When the brief or decisions change, update `PROJECT_KNOWLEDGE_BASE.md` and
  record decisions there rather than scattering notes across files.
- Wireframe changes: update [`wireframes.md`](./wireframes.md) (section table +
  changelog) when structure or order changes.
