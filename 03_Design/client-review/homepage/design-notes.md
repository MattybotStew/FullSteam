# Homepage folder — official client-review builds

**Homepage (`index.html`) — promoted 2026-11-02** into this path
(`client-review/homepage/`). The prior official is frozen at
`../homepage-2026-10-29-official/` (not published). Narrative, section order, and the
locked opening (Axis A → copy swap → Axis B) are unchanged; the design system is the
editorial ledger layout, framed opening plate, local section photography, and larger type
ladder.

**Vertical Software (`vertical-software.html`) — added 2026-11-03** in the same folder;
ledger tokens/components aligned to the homepage in the parity pass below. Sitemap IA is
unchanged (one page, 11 sidebar panels). **Official (2026-11-03): no `.index` eyebrows**
on this page — hero, verticals band, and FAQ use headlines only (no mono chapter labels).

Review portal + `pages.yml` publish this folder (`index.html`, `vertical-software.html`,
`our-advantage.html`, `our-story.html`, `careers.html`, tracked assets under `assets/` per
allow-list; **`assets/logos/`** and **`manifest.json`** are gitignored but staged on deploy).

---

## 2026-11-03 — Careers page (client-review hi-fi)

**File:** `careers.html` · **Figma:** FS-Design node `11489:9827` · **Wireframe:**
`02_Wireframes/active/pages/careers.html` · **Chrome parity:** VS / OA / Our Story
(ledger bar, menu, footer; Careers marked `aria-current`).

| Area | Build |
|---|---|
| Hero | **MediaDark** (`hero--media-dark`, same ink + glow as Vertical Software): **2-col split** (H1 + lede left · **1:1** `assets/img/careers/hero-team.jpg` right) → **2-cell fact strip** on dark (2,000+ / 11); `data-surface="dark"` |
| 01 How it feels | Split head + two ledger cells (“The problem is yours to pick up.” / “A bigger company behind a small team.”) + remote footnote |
| 02 Who thrives | Stacked head; **Our Values** 3×2 slot grid. **Six `Value [placeholder]` tiles — no invented values**; note says leadership confirmation is pending |
| 03 Testimonials | Tan `--tan #F3E6D0` band; three voices in story order (founder / founder who stayed / employee), 56px round local placeholder portraits (`assets/img/careers/voice-*.jpg`), mono note that quotes and photos are draft placeholders |
| 04 Open roles | Workday handoff — `View opportunities on Workday` pill (new tab); **no in-page table**, no Open Roles child page |
| LinkedIn | Tan band **directly below Open Roles**; three cards condensed from the client’s own company-page posts + Follow pill (same company URL as the homepage strip) |
| 05 FAQ | Shared two-column FAQ pattern: where people are based · moving between verticals · how to apply · will AI replace roles |
| Order | **No close band** — the wireframe/Figma ends on FAQ, and the Workday CTA in 04 is the conversion point |
| Cross-links | Homepage (menu, careers band, footer), VS, OA, Our Story now point at in-folder `careers.html`; portal has hi-fi + wireframe links; `pages.yml` stages the file and **`assets/img/` recursively** (banner, `careers/` voice portraits, `leaders/`) |
| CSS hygiene | **2026-11-03 pass:** removed accidental Our Story / timeline / leadership stylesheet copy from `careers.html`; page CSS is chrome + CompactLight + section blocks only |

**Placeholders / before publish:** values list (leadership), the three quotes + real
employee portraits, real employee photography for the banner, LinkedIn permalinks/dates.
The local careers images are review stand-ins only (Unsplash License, credited).
The 2,000+ / 11 claims are already established elsewhere on the site (KB §29.4).

---

## 2026-11-03 — Our Advantage page (client-review hi-fi)

**File:** `our-advantage.html` · **Figma:** FS-Design node `11489:10607` · **Wireframe:**
`02_Wireframes/active/pages/our-advantage.html` · **Chrome parity:** `vertical-software.html` /
`index.html` (ledger tokens, bar/menu/footer, FAQ two-column pattern).

| Area | Build |
|---|---|
| Hero | **EngineLight** (`hero--light`, `design.md` §4.10): paper band, stacked H1 + lede, **`--green-ink`** serif payoff; `data-surface="light"` (header scrim off at load). Not a dark ledger plate |
| Sidebar | Three groups · seven items: **AI at Fullsteam first** (featured **`--green-ink`** wrapper + paper tab label — active tab = **green** `#84BD00` fill) · Embedded Fintech (Payments, Lending, Insurance) · Operational Excellence (Sales & Marketing, Talent, Peer Community). **Default panel without hash:** `#ai` |
| Panels | Inline swap + hash routing (`#payments`, `#ai`, `#sales-marketing`, `#talent`, etc.) — one panel per sidebar item |
| **Payments** | Full layout: compare columns, unreconciled stats + mono notes, hardware pending frame, testimonial placeholder |
| **AI** | Full panel: three use-case cards + overview video (homepage hero sources until AI master). **Green** AI nav accent; active tab = paper on green |
| **Other 3** | Lending, Insurance, Peer Community — structural placeholders |
| FAQ | Three questions from wireframe; sticky H2 left / accordion right |
| Cross-links | `index.html` + `vertical-software.html` menu/footer Our Advantage targets → `our-advantage.html` (in-folder) |
| Deploy | `pages.yml` copies `our-advantage.html` beside homepage + VS |

**Publishability:** Payment stats, “Top 20,” and any future testimonial remain **review-only**
(OI-5 / OI-14 / KB §29.7) until client clearance.

**Preview (ledger):** `03_Design/client-review/homepage/our-advantage.html` — not
`02_Wireframes/active/pages/our-advantage.html` (structural wireframe; banner + portal
links updated 2026-11-03 so review traffic hits hi-fi).

### 2026-11-03 — Our Advantage: AI prominence

Client-review + wireframe sidebar: **AI at Fullsteam** group moved to the top (above Embedded Fintech). Featured rail block (**`--green-ink`** outer wrapper, paper tab label; active = lime **`--green`** fill on desktop; mobile pill matches ink/green states). **`#ai` is the default** when the URL has no hash (`DEFAULT_SLUG` in panel JS). Footer Explore sub-links mirror AI-first order under Our Advantage.

### 2026-11-03 — Our Advantage: AI accent green

Per client direction: **green is the AI color** on this page (KB §15 `--green` / `--green-ink`). Replaced gold on `rail__block--featured`, `rail__item--featured`, and mobile AI pill active state. Site buttons/CTAs stay gold. AI `#ai` panel aligned to wireframe / Figma `11462:8214` (no `.ex` rows or dashed asset note in hi-fi). **Active AI tab:** `--green` fill with **`--paper` label + dot** (desktop rail + mobile pill; Figma parity).

### 2026-11-03 — Interior hero differentiation (VS + OA)

Spec: **`design.md` §4.10**. Subpages no longer share one dark hero template.

| Page | Modifier | At-a-glance |
|------|----------|-------------|
| **Vertical Software** | `hero--media-dark` | Ink plate, gold payoff, **3-frame media band** under copy |
| **Our Advantage** | `hero--light` | Paper hero, green payoff, no hero imagery → white `#offerings` engine |
| **Our Story** | `hero--narrative-full` | Full-bleed homepage media plate + paper lower band (AGL + proof) |

**QA (1440 / 390):** VS reads dark + imagery; OA reads light text band + green `em` — distinguishable without reading lede. OA header uses light-bar treatment at load (`data-surface="light"` on `#top`); VS keeps `is-on-dark` scrim over `#top`.

### 2026-11-03 — Homepage: ledger line backgrounds removed

**File:** `index.html` only. Dropped decorative `repeating-linear-gradient` column
grids from `.band--ink`, `#ai.band--ink`, `.hero__media-fallback`, `.vp--all`, and
`.close::before`. Solid `--brand-ink` / band fills and non-line scrims (opening
`.hero__media-scrim`, `.vp__shade`, AI green wash, close radial highlight) unchanged.
`vertical-software.html` was not using the ledger line pattern.

---

## 2026-11-03 — Our Story page (client-review hi-fi)

**File:** `our-story.html` · **Figma:** FS-Design node `11489:10772` · **Wireframe:**
`02_Wireframes/active/pages/our-story.html` · **Chrome parity:** VS/OA (ledger bar, menu,
footer).

| Area | Build |
|---|---|
| Hero | **NarrativeLight** (`hero--narrative-full`): full-bleed **still** (`hero.jpg`, scrim, ink fallback) — no autoplay video; copy uses standard `.wrap` width; paper **`hero__lower`** = AGL + KPIs (review notes removed) |
| Chapters | Vertical **timeline** (2018–2025 copy from fullsteam.com/about); gold spine + alternating surface rows + optional photo |
| Leadership | Six executives from live about page; portraits in `assets/img/leaders/` (sourced CDN, 2026-11-03) |
| 01 Company | Split head + **16:9 mission/vision video** slot (homepage hero MP4 until Mike/Greg master) + link to `our-advantage.html` |
| 02 Chapters | Six editorial rows (year pending, optional thumb); no invented timeline |
| 03 Leadership | `#leadership` on **`band--ink`** — 3×2 leader cards (names/bios pending) |
| Close | Homepage-style **`#close`** band — “A home for your business” + Explore / Contact |
| JS | Scroll progress + menu only (no panel routing) |
| Cross-links | Homepage, VS, OA menu/footer → in-folder `our-story.html`; wireframe hi-fi banner |
| Deploy | `pages.yml` + review portal card |

**M2:** Real mission video, leader portraits/names, cleared KPIs/backer logos.

---

## 2026-11-03 — Vertical Software page + Weddings & Events panel

**File:** `vertical-software.html` · **Deploy:** `.github/workflows/pages.yml` copies this
HTML, `cp -R assets/logos/`, and `assets/img/*` beside the homepage build. Do not
force-add gitignored logo assets to git — describe deploy staging only in docs.

**Wayfinding:** homepage `index.html` links here (nine targets vs wireframe interior links).

**Hero H1 (2026-11-03):** shortened to *Mission-critical **software.*** (gold serif `em`); lede still carries software-first / system-of-record detail.

**No eyebrows (2026-11-03, official):** all `p.index` chapter labels removed from hero, `#verticals` band head, and FAQ — headlines stand alone on this page (homepage `index.html` unchanged). Sticky sidebar **`rail__label`** (“The index — 11 markets”) removed; `nav.rail` keeps `aria-label="Vertical index"`. All **`p.eyebrow`** (“Vertical NN / 11”) removed from every panel head — position in the 11-vertical list is shown only in the sticky rail (01–11).

**Header over hero (2026-11-03):** verticals scroll chrome no longer exempts `#top` like the homepage opening — dark hero gets **`is-on-dark`** scrim at load and on scroll; hero **`padding-top`** bumped after eyebrow removal.

**No in-hero CTA (2026-11-03):** removed “Explore the eleven” from the hero — same rule as homepage opening (KB §28); wayfinding is the header **Explore our verticals** pill → `#verticals`.

**Verticals band head (2026-11-03):** removed the `#verticals` section lede — H2 only, like the homepage verticals band (`Keep the businesses growing.`).

**Minimal panel proof (2026-11-03):** mono **`logos__title` / `screens__head` labels hidden** site-wide (names → `aria-label` / `.sr-only` via manifest JS). **FAQ** is two-column (sticky H2 left, accordion right; stacks at ≤1080px).

**Content depth tiers (2026-11-03, official):** panels use `data-content-depth` + `panel--depth-*` — not every vertical ships the same stack. **Canonical record:** `PROJECT_KNOWLEDGE_BASE.md` **§28.9**; slot handoff: `content-slots.md` **§5.0**.

| Tier | Class | Sections shown | Verticals (11) |
|------|--------|----------------|----------------|
| **Min** | `panel--depth-min` | H3 · story + photo · stats (no visible lede — first body ¶ acts as lede) | Storage & Marina · Health & Wellness · Field Services · Association Management |
| **Standard** | `panel--depth-standard` | Min + visible **`panel__lede`** + **logo grids** (manifest when present) | Hospitality · Wine · Retail · Transportation · Automotive · ERP |
| **Full** | `panel--depth-full` | Standard + **product screen row** (and story gallery on Weddings) | **Weddings & Events** (reference) |

Promote/demote a vertical by changing class + `data-content-depth` only — markup blocks stay in the DOM for the content track.

### Page-level

- Logo grid populated from **`manifest.json`** via JS; partner row hidden when empty;
  logo images use grayscale treatment in CSS.
- Removed draft review chrome on this page: hero meta, blue CTA band, all
  **`p.logos__count`** headers (logos + product-screens rows).
- **Page FAQ** (`#faq`) matches Figma WF v2 **`11530:1208–1213`** (canvas `11511:2918`): stacked H2 (*Common* / *questions,* / *answered.*), three accordion summaries (20px medium), two-column grid; answer bodies not in Figma — review placeholders until content track. **2026-11-03:** MCP `html_to_figma` sync from `tools/html2figma/out/faq-client-review-snippet.html`; accordion column repositioned to **x=560 / w=720** via `use_figma` (was full-width under heading). Wireframe FAQ markup aligned for future Desktop Bridge re-export.

### Weddings & Events (reference panel)

| Area | Build |
|---|---|
| Copy + stats | Client-facing strings in panel body; figures in **`PANEL_STATS`** JS |
| Story | **Horizontal photo gallery** (separate from product `.screens` row): filmstrip keeps each frame’s aspect ratio; scroll + dots/arrows; **lightbox** on click (Esc / backdrop). Five frames: `weddings-events.jpg` (Unsplash) + boutique aisle/interior + Floranext table + barn reception; figcaption *Weddings & Events · on the ground*. Kitchen export on disk unused |
| Product screens | **01** — BridalLive UI (`weddings-bridallive-product.png`, Figma `11516:3`). **02–03** — lifestyle photos labeled Floranext / Aisle Planner Pro until real product UI |
| Business-unit logos | Fetched via manifest: BridalLive + Floranext **SVG** from Figma vector frames (`11518:6613`, `11530:2`); TPP (`11514:52`, replaces Syvo), Aisle Planner Pro (`11518:6608`). Legacy PNGs on disk superseded for those two slots |
| Provenance | `assets/credits.json` — weddings logos, Figma nodes, Unsplash hero, product PNG, gallery frames |

### Other verticals

Placeholder stats, story photography, and product-screen rows remain. Pattern Weddings
establishes for story gallery, manifest logos, and screens row.

### Publishability

Named products, partner marks, and vertical-specific stats on this page are **not cleared
for public launch** until the client confirms (KB **§29.7**, **OI-16**). Treat as
review-only proof.

### Ledger parity with homepage (2026-11-03)

**File:** `vertical-software.html` only — **no IA or copy change**, **no new sections**
(no close band, scroll reveal, or ink FAQ).

| Area | Change |
|---|---|
| Tokens | Same `:root` ladder as `index.html` (2026-11-02 ledger): `--wrap` 1280px, `--sect`, `--t-*`, `--sans` / `--serif` / `--mono` |
| Layout | `.shell` → `.wrap`; section padding uses `--sect` |
| Type | `display--xxl` / `--l` / `--m` on hero, band heads, panel titles; **no `.index` eyebrows** (see header note) |
| Hero | **MediaDark** (`hero--media-dark`): dark plate + blue/gold glow; 12-col title/lede only (hero imagery deferred — slots in `content-slots.md` §5; `.hero__media` CSS retained for when assets land) |
| Components | Homepage `.btn` pills; panel stats match `--t-stat` / caption scale; story frames use careers photo filter |
| Chrome | Skip link, bar `--focus`, menu panel focus token; footer `--t-small` — matched to homepage |

Weddings story gallery + lightbox (`frame--gallery`, `#storyLightbox`); manifest logos and panel JS otherwise unchanged from parity pass.

---

## 2026-11-02 — review pass (this commit)

Reviewed against the KB, the 2026-10-29 client notes (§28), and the official
build. Everything below was **fixed in this pass**; the divergences listed after
it were **kept deliberately** and need a client call.

### Fixed

| # | Defect | Where |
|---|---|---|
| 1 | **Header had no scrim over dark bands.** Section content scrolled through the logo — `01 THE MODEL` read as part of the mark, and the founders H2 ran through the "A". | `.bar.is-on-dark`, `onScrollFrame()` |
| 2 | **Opening scrim killed the hero photograph.** Three stacked layers composited to ~`#061820`; under reduced motion (taller frame) the image was effectively gone. Retuned and verified legible in both states. | `.opening__grade` |
| 3 | **Gold serif payoff word lost.** §23.10: *"both headlines … white sans with one **gold** serif word each."* Both states had been flattened to white. | `.opening em` |
| 4 | **Header CTA reverted to "Explore vertical solutions".** §28.3 records the client note as *“the CTA drops the word ‘solutions’”*. Back to **Explore our verticals**. | `.bar__cta` |
| 5 | **Ledger rules didn't align.** Only step 2's caption wrapped to two lines, so its stat rule sat 30px higher. Steps and voices now share a **subgrid** — rules land on one line. | `.steps`, `.voices` |
| 6 | **Verticals list left a hole.** 11 items in 4 columns = one empty cell in row 3 and a rule that stopped mid-page. The 11th item now spans the remainder; collapses to a full row at 2 columns. | `.vlist li:last-child` |
| 7 | **Rotated vertical panel names returned.** §28: *"collapsed strips carry a horizontal name (**no vertical writing anywhere**)."* Back to horizontal, wrapping instead of rotating. | `.vp:not(.is-open) .vp__name` |
| 8 | **Careers photo was 1280×800** — nearly a viewport for one stock frame. Now a 21:9 banner. | `.careers__media` |
| 9 | **Founder citation stranded ~800px** from the quote. Now a controlled gap after the text. | `.founders__quote` |
| 10 | **`aria-label` on `.vp__toggle` swallowed the panel content** — the description and "System of record" were never announced. Removed; the index is `aria-hidden`. | verticals markup |
| 11 | **Accordion could end fully collapsed**, leaving a row of empty strips. The open panel is now sticky-on. | accordion JS |
| 12 | **Reduced-motion / no-JS stacked A directly above B** with only a 12px kicker between — one run-on claim (§23.6 rule 1). Added a rule between the acts. Also moved the frame's top inset so the no-JS eyebrow sits inside the plate. | fallback CSS |
| 13 | **Scroll progress bar drew on top of the open menu.** | `body.menu-open .progress` |
| 14 | ~~**Close band dead-ended.** Added a secondary founder door~~ **Removed 2026-11-02 content port** — close matches official (single **Explore Our Advantage** CTA). | `.close__actions` |
| 15 | `<kbd>` used for post-card eyebrows → `span.li__art-kicker`. | posts markup |
| 16 | `id="investors"` was on the model steps (nothing links to it) → `id="model-steps"`. | model band |
| 17 | Per-frame blur reduced 7px → 4.5px; it was the most expensive thing on the page. Still the main perf risk on mid-range Android. | `markOpening()` |
| 18 | **Model steps revealed in one IO burst.** Each `li.step.r` was in the global `.r` observer, so columns could `.in` independently. Now **Step 01** triggers a **260ms stagger** for 02 and 03. | `#model-steps` reveal JS |
| 20 | **Figma `Design System` reconciled (2026-11-02).** Type styles + 7 `color/ui/*` variables synced to this build; chapter index eyebrows removed here and in Figma specimens. Record: KB §27.2, `wireframes.md` §8. | FS-Design |
| 19 | **Copy aligned to official `homepage/index.html` (2026-10-29).** Model / AI / verticals / founders / careers / close strings; founders word-by-word quote + `Explore more`; LinkedIn card feet; hero `<source>` order (sizzle → fallback); Grow/Lead multi-stat counters; removed careers posts footnote strip and close secondary CTA. Ledger band indexes (`01`–`05`) and footer IA unchanged. | `index.html` |

### Kept on purpose (needs a client decision)

1. ~~**The 11-vertical read-more list stays.**~~ **Removed 2026-11-02** (client).
   Wayfinding to all verticals: gallery **Explore all** + `/vertical-software` menu.
2. **Sixth gallery cell** is a simple "All verticals" plate, not §28's 2×2
   collage accordion. Functionally equivalent; visually cheaper.
3. **Footer** is five columns (Explore / Company / Connect / Legal), not §28's
   six-column wayfinder. Deliberate: the §28 grid repeats "Leadership" in two
   columns. Needs client sign-off either way.
4. ~~**Founders CTA copy** is "Explore Acquisitions"~~ → **"Explore more"** (matches official, 2026-11-02 content port).
5. **Body copy** now tracks the official build. Remaining divergence: **footer
   IA** (five columns vs §28 six) and **ledger section indexes** (`01`–`05`).
   The verticals H2 still matches official (`Keep the businesses growing.`) —
   grammar belongs to the content track (`content-slots.md`), not this pass.

## 2026-11-02 (later) — the opening is now the official hero

The framed-plate opening was replaced with the **official 2026-10-29 Axis A /
Axis B implementation**, ported whole:

- full-bleed media plane (brand-field poster → clip → scrim → `--b-wash`)
- line-by-line entrance (`h4-line` / `h4-payoff`)
- per-line exit + arrival copy swap over one continuous shot
- the same phase split (`t = scrolled / 0.55`, b1 0.28–0.46, b2 0.36–0.56, b3 0.44–0.70)

**Four adaptations, all forced by this build's differences:**

1. **Media.** `assets/hero-fallback.mp4` (Mixkit, free licence, tracked) is the
   only `<source>`. The licensed sizzle master goes in as the **first** source —
   the layer order already assumes it sits above the fallback.
2. **Axis B's exit.** The official lets its ink band swallow B. This page's next
   band is **paper**, so B now rises with the leaving plate (`--b-lift`) and
   dissolves (`--b-out`). A pure opacity fade left white type sitting on white
   for the last ~130px, because the pin progress saturates at 1 while the paper
   band is still a screen away — the driver has to be the plate's own bottom edge.
3. **Stage background.** `.opening-stage` carries `background: var(--brand-ink)`
   and `isolation: isolate`, so the dark field is still behind the fixed B copy
   after the sticky plate unsticks. Without it the paper band showed through.
4. **Reduced motion / no-JS** use the same `has-js` + media-query split as the
   rest of this build; B becomes a static ink band after A, and `.axis-b__frame`
   is zeroed so the invisible runway doesn't leave a 900px gap.

**Dropped with the port** (all absent from the official opening): the Axis B
lede, the scroll cue, and the "Portfolio → Growth engine" foot line.

Verified: 0 console errors, no horizontal overflow, swap sequencing intact,
steps still light in order, reduced-motion and no-JS both render A → B in
document order. Type sizes match the official exactly at 1440 / 390 / 320.

---

### Still open
- **Five representatitive testimonials** on one page, all marked
  `PENDING APPROVAL`. Two are founder voices and neither investor nor customer
  is represented, though investors are the primary lens (KB §25.5).
- **The AI pull-quote** is set as a serif testimonial but is house voice.
- **Published LinkedIn cards** name two employees and cite `#28` Nilsen. Check
  KB §29.7 before this leaves the building. The Priswing / HITEC card too.
- **No contact path in the page body** — deliberate per §28 ("no 'Talk to us'
  CTA"), but it means the site still relies on outbound.

### Measured

| | 2026-10-29 official | 2026-11-02 build | after review pass |
|---|---|---|---|
| Page height @1440×900 | 7,707px | 9,381px | 9,124px |
| Opening travel | — | 990px (10.6% of page) | 990px |
| Console errors | 0 | 0 | 0 |
| Horizontal overflow | none | none | none |

Verified at 1440×900, 1024×800, 390×844, 320×700, plus reduced-motion and no-JS.
