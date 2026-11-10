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
- **Messaging architecture:** **KB §29** is the client's current messaging architecture
  (marketing, 2026-10-26) — master thesis "Empower the Builders. Lead the Industry.", pillars
  **Essential / Grow / Lead**, personas Sean (founders) / Marcus (investors) / Elena (employees).
  It supersedes **§22** V2's pillars and themes but **changes no IA**; read §29.6 (conflicts) and
  §29.7 (publishability) before using its proof points or named customers in any copy.
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
- **Homepage opening strategy (LOCKED 2026-09-24 · Axis A amended 2026-10-01 · transition
  amended 2026-10-29):** read **KB
  §23** (and **§24**) before touching the homepage's first viewport. The client's two-axis model
  is delivered **in sequence** — **Axis A (Portfolio) → transition → Axis B (Growth engine)**.
  **⚠ The transition is the COPY SWAP, not the grow morph (KB §23.10, 2026-10-29).** Axis A's
  lines leave upward, staggered and blurred on the way out; Axis B's arrive from below on a
  slightly later stagger; the media never cuts and never expands. **The grow morph is retired** —
  it needed a visible source, and every source it was given (the 11-tile mosaic, the filmstrip
  tile, a synthetic 16:9 frame) was furniture the client had already asked to remove. Every
  "grow morph" reference below and elsewhere in this file is **history**; the two headlines must
  still never be merged into one claim. Spec: `design.md` §3.1; build: `wireframes.md`; rules:
  KB §23.6; the retirement: KB §23.10.
  **Amended 2026-09-24 (same day):** the opening was first locked as a **binary snap**
  (discrete cut, no interpolation); at the **client's request** the interpolated **grow morph
  was restored** (the cut read as "just snapping in place"). The **two-state model, the two
  headlines, and the Axis A→B order are unchanged**.
  **Amended 2026-10-01 (client review):** Axis A is **no longer the 11 scattered vertical tiles**
  ("do not want 11 floating vertical bubbles") — it is **one identity/scale visual**, and the 11
  verticals live in the **filmstrip**. The model, the two headlines, the A→B order, and
  both-states-are-content are **unchanged**.
  **Amended 2026-10-29 (client):** the grow morph and the filmstrip are both gone; the opening is
  a **framed plate with a copy swap** (KB §28, §23.10). Axis A's copy is
  **"We acquire / great software / companies."** Axis B is unchanged.
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
  **Vertical Software** · **Our Advantage** · Our Story · Careers. **For
  Investors removed** (no nav node, no page). Under Our Story: **Leadership**.
  **Newsroom removed** (2026-09-23). For Founders is a single-page leaf; no
  category landing pages. See `plans/sitemap-lock.md` and KB §14.
- We are in the **Sitemap/Wireframe** milestone; the **homepage** is the active
  design surface and is still being iterated.
- **Client review 2026-11-09 (KB §28.10)** is the current hi-fi pass. Read it before
  changing interior chrome, the Vertical Software hero, vertical panels, the Our Advantage
  sidebar, the footer, or the Our Story timeline. Wireframes were not redrawn.
- **The official high-fidelity homepage is `03_Design/client-review/homepage/`**
  (promoted **2026-11-02** — ledger redesign; prior build frozen at
  `client-review/homepage-2026-10-29-official/`). It is **client-facing and tracked**:
  the review portal links it and Pages publishes it (`index.html`, **`vertical-software.html`**,
 **`our-advantage.html`**, **`our-story.html`**, **`careers.html`**, **`for-founders.html`**, header logos, hero fallback, `assets/img/` section photography;
  **`assets/logos/`** +
  **`manifest.json`** are **tracked and published** as of 2026-11-03, when the client cleared the
  portfolio marks; `pages.yml` copies them and skips the step if the directory is ever absent).
  Structure: **Axis A → copy swap → Axis B** opening
  (KB §23.10) → **How a Fullsteam company compounds** model steps → AI → verticals gallery
  → founders → careers → close. Same narrative order as the 2026-10-29 build; new editorial
  layout and type ladder. Build notes: `client-review/homepage/design-notes.md`.
- **Interior hero archetypes (hi-fi, `design.md` §4.10, amended 2026-11-09):** subpages share one **paper-mesh** system (serif-italic payoff, solid white bar, gold as a mark never text on paper) but **each page has its own composition**. Default interior recipe is left type, 90/48/32 content padding, mesh pooled right. Photography is a **CSS background** on `.hero__photo` — a short 8% join into the paper, never a 20% dissolve, never inline furniture (no polaroids, arches, phones, or inset cards). **Photo pages turn the mesh off**; mesh is atmosphere for type-only / filmstrip plates. Do not clone one page’s hero onto another. Recipes:
  **Vertical Software** = type only, left-aligned, no photo. **Our Advantage** = till photograph as the field, tighter crop on the work, green payoff. **Our Story** = three industry photographs as a flush triptych (fade only on the wine pane). **Acquisitions** = **10-28 Axis A recipe** — centered type on paper mesh, founder videos as a **filmstrip of tabs under the copy** (`.founder-film`), not a side stage and not a lifestyle still. **Careers** = type-only paper mesh (same left recipe as Vertical Software), then a paper **factband** under the stage — same role as Our Story’s `.story-spine`, not a card inside the mesh. **Contact** = quieted corridor field, Direct lines card sitting on it. Legal pages remain wireframe.
- **Vertical Software — second client-review HTML page (2026-11-03):**
  `03_Design/client-review/homepage/vertical-software.html`, linked from the homepage
  (`index.html`, nine gallery/CTA targets vs wireframe cross-links). **IA unchanged** — single
  page, sticky sidebar, 11 inline panels (`plans/sitemap-lock.md`). **Panel content depth**
  (min / standard / full) gates how much proof each vertical shows — **KB §28.9**,
  `content-slots.md` §5.0; wireframe still draws one full shape for all eleven. **Weddings &
  Events** is the **full** reference: copy/stats (`PANEL_STATS`), **story gallery + lightbox**
  (not product screens), product `.screens` row, logos from **`manifest.json`**. Other verticals
  are min or standard with placeholders. Named products/figures need **client clearance
  (KB §29.7 / OI-16)** before publish. Provenance: `assets/credits.json`; build:
  `design-notes.md` §2026-11-03.
  **Amended 2026-11-09 (KB §28.10):** panels are a title plus one paragraph (lede removed). Logo rows are full-width and labeled — business units, then stats, then customers & partners. Min still hides logos; screens stay on Weddings only.
  **Hero (2026-11-09):** left-aligned paper mesh, not the dark imagery band. Headline is two lines that must not reflow into one: “Mission-critical” in Instrument Sans, “software.” on its own line in Instrument Serif italic **Bio Blue** (`#00587C`). Type matches the homepage hero (`clamp(50px, 8.34vw, 120px)` — 120px at 1440). Content padding is 90px desktop, 48px under 900px, 32px under 640px. Mesh pools to the right; type stays on paper. Do not restore MediaDark or put gold on “software.”
  **Figma:** frame **`11541:657`** “Vertical Software — Fullsteam” on page `✅ Design [WIP] 2` (file `3oHvScSPrK5l6N1qfv9WCw`) was redrawn **2026-11-09** to that hero plus the solid white header. Edit that frame in place. Do not recapture it as the old dark plate.
- **Our Advantage — third client-review HTML page (2026-11-03):**
  `03_Design/client-review/homepage/our-advantage.html`, linked from homepage and Vertical
  Software chrome. **IA unchanged** — single page, sticky sidebar with three groups
  (**Embedded Fintech**, then **AI at Fullsteam** — mono label plus a `--green-ink` frame around the
  bright-green row, Figma `11541:1393`, client 2026-11-09 — then **Operational Excellence**;
  `#ai` stays the default panel), seven inline panels (`#ai` default without hash). **Payments** full ledger shape;
  **AI** full panel (use cases + video; **green** featured-rail accent); Sales & Marketing / Talent / Lending / Insurance / Peer Community panel placeholders until M2. Figma AI reference **`11462:8214`** (WF v2 chunk).
  FAQ matches Vertical Software two-column pattern. Figma wireframe reference **`11489:10607`**
  on WF v2; hi-fi Figma frame not yet captured. Build: `design-notes.md` §2026-11-03.
- **Our Story — fourth client-review HTML page (2026-11-03):**
  `03_Design/client-review/homepage/our-story.html`, linked from homepage, Vertical Software,
  and Our Advantage chrome. **IA unchanged** — paper-mesh hero with industry **triptych field**
  (wine / warehouse / auto; fade on the wine pane only), 01 company mission/vision video slot, 02 chapter timeline (**four milestones, years removed** — founding, office openings, building on LLMs, SDR team expansion; KB **§28.10**, 2026-11-09), `#leadership` ink band (six card placeholders; heading centered), homepage-style close. Figma
  wireframe **`11489:10772`**. Build: `design-notes.md` §2026-11-03.
- **Careers — fifth client-review HTML page (2026-11-03):**
  `03_Design/client-review/homepage/careers.html`, linked from the homepage (menu, careers
  band, footer) and from Vertical Software, Our Advantage, and Our Story chrome. **IA unchanged** —
  single leaf page; **type-only paper-mesh hero** (same recipe as Vertical Software), then a paper **factband** under the stage (Our Story spine pattern — 2,000+ / 11 Verticals), stat grid, dark testimonials
  and open roles, homepage LinkedIn scroller, FAQ. Build: `design-notes.md` §2026-11-03.
- **Acquisitions — sixth client-review HTML page (2026-11-03 · hero amended 2026-11-09):**
  `03_Design/client-review/homepage/for-founders.html` (on-page label **Acquisitions**), linked
  from homepage founders band, menu, and footer across hi-fi pages. **IA unchanged** — wireframe
  order stands. **Hero (2026-11-09):** matches `homepage-2026-10-28` Axis A — centered H1 / lede / CTAs on paper mesh; founder videos sit as a **filmstrip of tabs under the text** (`.founder-film`), not a right-hand stage and not a kitchen still. Demo reel on slot 1; other slots pending client assets. Below the hero: Why (two-col) → How (four-step
  ledger) → What we look for (ink split + quote) → FAQ → **Contact us** close. No lead form.
  Deploy: `pages.yml`; portal + wireframe hi-fi banner. Build: `design-notes.md` §2026-11-03 / §2026-11-09.
- **Frozen prior official — `03_Design/client-review/homepage-2026-10-29-official/`**
  (snapshot of `homepage/` at promotion). Dark scale chapter, `vpanel` verticals, pre-ledger
  chrome. Read-only reference; not linked from the review portal or staged by `pages.yml`.
- **Homepage explorations (internal, unpromoted, gitignored unless tracked).**
  `03_Design/explorations/homev2/` is the blue/video direction the official homepage
  came from. `homev3/` is the **"calm canvas"** pass (Asana-style system, no serif, no
  video) built on the historical grow morph. Both are sandboxes, not
  decisions — see `03_Design/explorations/README.md` for the promotion path.
- **Header chrome (provisional):** Option **B revised** — Logo · hamburger Menu · Explore
  vertical solutions. The open menu is a **single column** (2026-10-22), not a mega-menu.
  **For Founders is not in the header strip** as of 2026-09-23; Acquisitions (that page)
  lives in the menu, footer, and the closing CTA. Compare options in
  `02_Wireframes/active/header-wireframe.html` (B revised is the current drawing).
  **⚠ Two CTA wordings are live.** The site-wide locked label is "Explore our vertical
  solutions"; the homepage builds (official + 2026-11-02) ship **"Explore our verticals"**
  per the 2026-10-29 client note (KB §28.3). Global ratification is still open.
  **Interior header (2026-11-09):** Our Advantage, Vertical Software, Our Story, Careers, Acquisitions, and Contact use a **solid white** bar from first paint (`#fff`, ink logo, ink menu, gold Explore fill). It stays white over dark bands. The homepage opening bar stays transparent over the dark plate. Menu foot line is **Building on Great** (menu only).
- **Homepage opening = Axis A → copy swap → Axis B (locked 2026-09-24 · Axis A amended
  2026-10-01 · transition amended 2026-10-29).** The first viewport is a **two-state pinned
  sequence**, not one hero: Axis A (what Fullsteam owns) hands off to Axis B (the growth model)
  **over one continuous media plate**. The transition is the **copy swap** — A's lines leave
  upward, B's arrive from below, the media never cuts or expands (KB §23.10). **Axis A is one
  visual, not the 11 tiles** (client 2026-10-01). Canonical record: KB **§23** (guardrails
  §23.6) + **§24** (the review) + **§23.10** (the copy swap).
- **Homepage reordered from client review (2026-10-01).** Order is now Opening → **What we do**
  (Acquire/Grow/Lead + founder CTA + impressive stats) → **Verticals** filmstrip → **AI** →
  **Great place to work** → Close. The old persona door, two-up "who we are," **Software** scene,
  and homepage **Offerings** scene were removed; the **Our Advantage page + nav node stay**.
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
- **Figma `FS-Design` is now the source of truth for design TOKENS** (palette variables,
  text styles, the Button component). The repo remains the source of truth for
  **decisions**. Canonical record: **KB §27** — read it before touching anything visual.
 - **`Design System` page = OFFICIAL, client-safe.** Holds `Fullsteam Brand` (**27** colour
   variables — KB §15 + ledger `color/ui/*`, **2026-11-02**) and **8** text styles (Instrument
   Sans + Fragment Mono + Instrument Serif payoff, reconciled **2026-11-02** to this homepage).
 - **Repo→Figma token sync + fix pass ran 2026-11-03** on a **duplicate** page
   `✅ Design [WIP] 2 — SYNC 2026-11-03`; the original page is untouched. Now: **453/763** text
   nodes on an official style (3 styles added: `Body/Small`, `Body/Label`, `Mono/Label`),
   **1,168/1,194** solid fills bound to `Fullsteam Brand`, hero overflow 1,310px → **0**, and the
   opening's **Axis B state exists** for the first time as its own frame `Opening — Axis B state`.
   Read **KB §27.8–§27.9** before touching styles or variables — they record the drift table, the
   two API traps (binding drops `opacity`/`blendMode`; spread-based paint writes silently no-op),
   and the open items **OI-21…OI-24**.
  - **`Explorations (internal)` page = QUARANTINED, never client-facing.** Holds the
    off-brand exploration palette. **Never point a client `FS-Design` link at it.**
  - **⚠ Three Button specs exist.** Figma has the exploration-02 pill (`radius 999px`);
    the wireframe HTML still ships `radius 0`. They disagree — **OI-12**. The wireframe
    skin has *not* been restyled; that is still a deliberate track crossing.
  - **⚠ Exploration palette drift** — the exploration HTML runs on `#003F55` / `#FEC50A`
    / `#00202B`, none of which are KB §15 (**OI-13**). Do not copy those values into
    anything official.
- Wireframe HTML files are static — preview by opening the file or with a static
  server from the repo root:
  `python3 -m http.server 8000` → http://localhost:8000/02_Wireframes/...
- **HTML→Figma converter:** `tools/html2figma/` (`parse.py` → JSON spec → `bundle.py` →
  paste into `figma_execute` via the Desktop Bridge) rebuilds wireframe HTML as editable
  Figma frames on page `⚠️ WF v2`. Structural fidelity only — no images, no animation.
  Headings come out in **Archivo** to match the wireframes. See its `README.md`.
  Re-running creates a new frame; delete the old one to avoid duplicates.

## Key facts (quick reference)

- Keep the Fullsteam brand identity unchanged — this is a content/IA/UX
  reorganization, not a rebrand.
- **Palette is LOCKED (KB §15):** Bio Blue `#00587C`, Gold `#FFC600`, Green
  `#84BD00`, Black, White. Now also encoded as Figma variables in the
  `Fullsteam Brand` collection. Tints at 10/30/50/70/90 are **computed**
  (p% colour + (100−p)% white), not transcribed from the cheat-sheet PDF —
  verify before treating them as final.
- **Typography promoted 2026-10-17** (Instrument Sans display/body + Fragment
  Mono). **Instrument Serif italic** is a **client-approved third voice**
  (2026-11-02) on the official homepage — payoff words, quotes, and emphasis
  (`em`); see KB §27.4. Do not use it for full headings or body paragraphs.
  As of **2026-11-03 gold text follows its surface**: `--accent` resolves to brand gold
  `#FFC600` on dark surfaces and to **`--ink` on light ones** — one uniform colour on paper,
  no darkened gold variant (client call: a darker gold reads muddy). Set once on the base
  `.display em, .serif-em` rule — never per headline, never `!important`. **Never put
  `#FFC600` text on paper**: 1.58:1. Gold stays a *mark* on light surfaces (rules, dots,
  button fills) and a *text* colour only on dark.
- **The homepage is the design system (client decision 2026-11-03).**
  `client-review/homepage/index.html` defines the visual system; the five interior
  pages conform to it rather than carrying private rhythms. If an interior page needs
  a component the homepage lacks, add it to the homepage first — or ask. The full
  conformance table, the two defects it surfaced, and the short list of deliberate
  exceptions are in **KB §27.10**.
- Two core stories: (1) acquire & grow vertical software, (2) expand via
  **Our Advantage** (payments, lending, insurance, hardware, integrations).
- **The two stories are two axes, and the homepage names them:** (1) = **Axis A
  (Portfolio)**, (2) = **Axis B (Growth engine)**. Keep the vocabularies separate —
  **axes** name the homepage's model; **nav labels** (Vertical Software / Our
  Advantage) name the sitemap. "The growth engine" is an axis label, never a headline.
- **Nav terminology:** the embedded-expansion axis is labeled **"Our Advantage"**
  (client rename 2026-10-22; was "Embedded Offerings", client-preferred 2026-09-10).
  **"Offerings" survives only as that page's group name** (Payments / Lending / Insurance + AI),
  not as a nav short form. The client rejected "Platform." See the alternatives considered in
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
  **no child pages**, no category labels. The Menu overlay is a **single column** and does not list the 11 verticals (they stay on this page).
  Homepage shows a revenue-ordered subset only. **find-your-vertical** type-ahead filters the
  sidebar (not header search). **Hero and panels as of 2026-11-09:** see the client-review bullet above and KB **§28.10**.
- **Our Advantage is a single page** (clarified 2026-09-28 · layout changed 2026-10-01):
  all four offerings (**Payments, Lending, Insurance, AI at Fullsteam**) sit on one page as a
  **sticky sidebar that swaps content inline** on a **white background** — the same pattern as
  Vertical Software (this **replaced** the earlier 2026-10-01 horizontal filmstrip). **Group order (2026-11-09, Figma `11541:1393`):** Embedded Fintech, then AI at Fullsteam (mono label plus a `--green-ink` frame; the active row is bright green with ink type), then Operational Excellence. Seven links. `#ai` stays the default panel. **No child pages** — **AI is a card/panel, not its own page** (supersedes
  the 2026-09-10 "AI is its own page"). **Hardware and Integrations are not separate pages** (folded
  into Payments / the Our Advantage page), 2026-09-10.
- **Wireframe headlines are intent, not copy (2026-10-01):** every content `h1/h2/h3` across the
  homepage and the 8 interior pages reads as a short **`Intent:`** statement, with a dashed `.anno`
  note carrying detail/constraints; final copy lives in `content-slots.md`. **Primary lens:
  investors**, founders secondary (a lens only — no IA change). See KB §25.5 / §26.
- **Leadership** is a **section on Our Story** (`our-story.html#leadership`) as of the
  2026-10-28 client feedback (applied 2026-10-30) — the standalone page is retired in the
  wireframes, formal re-lock pending. **Newsroom is not in the sitemap** (removed 2026-09-23).
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

**Locked 2026-09-24 · Axis A amended 2026-10-01 · transition amended 2026-10-29.** The
canonical record is KB [`§23`](./PROJECT_KNOWLEDGE_BASE.md) + [`§24`](./PROJECT_KNOWLEDGE_BASE.md)
+ [`§23.10`](./PROJECT_KNOWLEDGE_BASE.md); the UX
spec is `design.md` §3.1 + §4.1; the build and its fixed defects are in `wireframes.md`. Six
rules that survive any restyle or refactor:

1. **Two states, two jobs.** **Axis A (Portfolio)** = identity/ownership — the H1 plus one
   continuous media plate, read first. **Axis B
   (Growth engine)** = the growth model — the hero H2, revealed by the swap. Never one merged claim.
2. **The transition is the copy swap.** Axis A's lines leave upward (staggered, blurred on the
   way out); Axis B's arrive from below on a slightly later stagger. The media never cuts and
   never expands — **the grow morph is retired (KB §23.10, 2026-10-29)**. Keep the per-frame
   writes **free of CSS transitions** so the handoff cannot smear. Restoring an expanding
   source frame is a **strategy change**, not a polish pass.
3. **The deck line is retired from the hero.** "The operating system for vertical markets"
   (KB §19.1) is not the hero message — G-8 resolved 2026-09-24.
4. **"The growth engine" names Axis B** and is an axis label, never a headline.
5. **Both states are content.** Neither is `aria-hidden`; with `prefers-reduced-motion` the
   two states render in document order, A above B. With JS off, the same in-flow fallback
   applies — the pin is gated by a `has-js` class on `<html>` (resolved 2026-09-26).
6. **Scope = the opening only.** Whether the rest of the page is two acts, and whether the
   opening also scroll-snaps, are **open** (`wireframes.md` OI-9). Do not extend it silently.

## Conventions

- **Multiple agent CLIs.** This project is worked by more than one agent CLI —
  `opencode` (this harness) and `qwen` (Qwen CLI, added 2026-10-15). Both read the
  same root files, so treat `AGENTS.md`, `PROJECT_KNOWLEDGE_BASE.md`, `wireframes.md`,
  `design.md`, `content-slots.md`, and `inspiration.md` as **re-read-before-edit**:
  another agent may have changed them since your last look. Do not assume your view
  of a file is current, and do not overwrite another agent's edit — diff first.
- All shared knowledge for this project lives at this root so any agent with
  the FullSteam project (or its subfolders, e.g. `clientDocs`) as its workspace
  can reach it.
- When the brief or decisions change, update `PROJECT_KNOWLEDGE_BASE.md` and
  record decisions there rather than scattering notes across files.
- Wireframe changes: update [`wireframes.md`](./wireframes.md) (section table +
  changelog) when structure or order changes.
