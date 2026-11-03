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
`our-advantage.html`, `our-story.html`, `careers.html`, `for-founders.html`, tracked assets
under `assets/` per allow-list; **`assets/logos/`** and **`manifest.json`** are gitignored
but staged on deploy).

---

## 2026-11-03 — Acquisitions page (client-review hi-fi)

**File:** `for-founders.html` (on-page name **Acquisitions**) · **Wireframe:**
`02_Wireframes/active/pages/for-founders.html` · **Archetype:** **NarrativeLight**
(`design.md` §4.10) · **Chrome parity:** other client-review pages.

| Area | Build |
|---|---|
| Hero | **NarrativeLight** stack: ink **photo hero** + CTAs → white **hero__company** with **founder video gallery** (16:9 stage + thumb rail; demo reel on slot 1) |
| 01 Why Fullsteam | Paper solo `band__head` + **two-col** ledger (Careers pattern) |
| 02 How it works | **Surface band**; homepage-style **four-column steps** ledger (talk → fit → close → continuity) — no deal terms |
| 03 What we look for | **Ink band** · homepage-style **founders split** + serif quote · **Explore our vertical solutions** → VS |
| Close | Bio **close** band: **Contact us** → wireframe `contact.html` |
| FAQ | Eight founder questions (shared accordion pattern); constraints baked into placeholder answers |
| Cross-links | Homepage founders band + menu/footer on all hi-fi pages → `for-founders.html`; `pages.yml` stages file |

**Placeholders / before publish:** founder videos, confirmed mailbox, FAQ answer copy pass,
named customers in fit section. Never frame the sale as an **exit**.

---

## 2026-11-03 — Careers page (client-review hi-fi)

**File:** `careers.html` · **Figma:** FS-Design node `11489:9827` · **Wireframe:**
`02_Wireframes/active/pages/careers.html` · **Chrome parity:** VS / OA / Our Story
(ledger bar, menu, footer; Careers marked `aria-current`).

**Approved in client preview (2026-11-03):** the Careers hero **MediaDark split** is the approved review design — retain over CompactLight or stacked banner variants.

| Area | Build |
|---|---|
| Hero | **MediaDark** (`hero--media-dark`, same ink + glow as Vertical Software): **2-col split** (H1 + lede left · **1:1** `assets/img/careers/hero-team.jpg` right) → **2-cell fact strip** on dark (2,000+ / 11); `data-surface="dark"` |
| 01 How it feels | `band__head` (H2 two lines: Room to *own* / the work.) + two ledger cells + remote footnote; **`#how-it-feels { padding-bottom: 0 }`** |
| 02 Who thrives | `band__head` (title left · lede right); **ledger stat grid** (2,000+ / 11 / 70,000+ / 100+ / #20 / $75B+) — not value placeholders |
| 03 Testimonials | **`band--ink`** dark; three voices + local portraits (`assets/img/careers/voice-*.jpg`); no draft footnote |
| 04 Open roles | **`band--ink`** dark; **`See open roles`** → Workday (new tab); **`#roles { padding-top: 0 }`** |
| LinkedIn | **`band--paper`** white; homepage **`.posts`** scroller (5 cards, prev/next) + Follow pill **directly below Open Roles** |
| 05 FAQ | Shared two-column FAQ; **`#faq { padding-top: 0 }`**; no section eyebrows site-wide |
| Order | **No close band** — ends on FAQ |
| Cross-links | Homepage, VS, OA, Our Story → in-folder `careers.html`; `pages.yml` stages file + **`assets/img/`** recursively |
| CSS hygiene | Chrome + careers sections only (~1,260 lines); no Our Story timeline/leadership CSS |

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

---

## 2026-11-03 (client review) — Acquisitions naming + gold italics

Applied to **this official build**. A scratch copy opened the same morning
(`homepage-2026-11-03-working/`) was **discarded 2026-11-03** — it took a different direction and
nothing was promoted from it.

### Emphasis: every serif italic is brand gold

`.display em, .serif-em` now carries `color: var(--gold)` as the base, so the accent is no
longer limited to the four headlines named in the old `#modelTitle / #vertsTitle / #careersTitle
/ #aiTitle` list (that rule is now just `letter-spacing: 0`). The founders headline's `<em>built.</em>`
was the visible gap — it had no colour rule at all.

Interior pages each got the same one-rule addition:

```css
.display em, .hero__title em, #faq-title em, h2 em, h3 em { color: var(--gold); }
```

`our-advantage.html` additionally overrides `.hero--light .hero__title em`, which had been
**green-ink** under the EngineLight archetype (`design.md` §4.10) — that payoff is gold now too,
per the client instruction, so the green-ink exception no longer exists anywhere.

Verified: **0 emphasis `<em>` outside gold** across all six pages (the only remaining non-gold
serif on the site is deliberate: none).

> ⚠ Gold `#FFC600` on the paper surface measures **1.58:1**. This was raised in the design audit
> as Q-CONTRAST-01 and is now the accepted brand treatment on the three light-band headlines
> ("compounds.", "growing.", "2,000+ people.") and on the Our Advantage hero. Decorative display
> type is exempt from WCAG 1.4.3, but it is the lightest reading experience on the site.

### Acquisitions band on the homepage

| | Was | Now |
|---|---|---|
| Eyebrow | `FOR FOUNDERS` (mono, uppercase) | removed — band opens on the H2; `.founders__kicker` CSS deleted with it |
| CTA | "Explore more" | **"Explore Acquisitions"** |

That CTA also closes an inconsistency this file's own header note has carried since the 2026-11-02
build: line 41 lists `"Explore Acquisitions", not §28's "Explore more"` as a deliberate deviation,
but the markup still shipped "Explore more". Note and build agree now.

Nav and footer already read **Acquisitions** on all six pages (client rename, 2026-10-22). The
`for-founders.html` filename and the `#for-founders` anchor are unchanged, so links still resolve.

Verified at 1440 and 390: 0 console errors, 0 HTTP failures, no horizontal overflow.

> **Discarded branch:** a scratch copy (`homepage-2026-11-03-working/`) held a separate refactor
> from the same day — serif stripped site-wide, vertical tiles → typographic index, 4px ghost
> buttons, `#FBFBFA` surface. It contradicted this build on typography, was not the source of
> truth, and was **deleted 2026-11-03** (client decision). Not recoverable; not referenced by
> `pages.yml` or the review portal.

### Careers band head — vertical alignment fixed (2026-11-03)

Reported off-centre. Cause: `.band__head` is a **12-column grid with `align-items: end`**, and the
careers head put three items into it — `h2` (1/8), `.lede` (9/13) and `.careers__cta` (no
`grid-column`, so it auto-placed into a **second row**, col 1). So the lede was bottom-aligned to
the headline box instead of to the headline-plus-button block, and the CTA landed outside the
header's own box (`cta.b 894` vs `head.b 868` at 1440).

Fix: `h2` + CTA are wrapped in `.careers__intro` (1/8) and the head is `align-items: center`, so
the lede centres against the whole left block.

| | before | after |
|---|---|---|
| Lede centre vs left-block centre @1440 | +26px | **0** |
| Lede centre vs left-block centre @2000 | +26px | **0** |
| CTA inside the header box | no (26px out) | **yes** |

The wrapper also had to go `grid-column: 1 / -1` in the `max-width: 1080px` and `600px` blocks —
without it the headline stayed pinned to 5/8 of the page and wrapped to three short lines at 390
("A great / place / to work."). Now: one line, full width, 350px.

Verified 1440, 2000, 390: 0 console errors, no overflow.

---

## 2026-11-03 — homepage as the design system; interior pages reconciled

Ran a rule-level diff of the `<style>` blocks across all six pages, with the homepage as the
reference, then fixed every conflict where the homepage already states the answer. Tokens were
already identical everywhere (`--brand`, `--gold`, `--sans/--serif/--mono`, `--t-*`, `--sect`) —
the drift was all in **component usage**.

### Fixed

| Component | Conflict | Resolution |
|---|---|---|
| `.display em` | only the homepage's base rule carried `color: var(--gold)`; the other five relied on per-ID lists, so 8 Our Story timeline names and the Acquisitions hero rendered ink | base rule now states gold on all six, and the four one-off `#modelTitle / #vertsTitle / …` colour overrides are reduced to `letter-spacing: 0` |
| Emphasis patches | my earlier per-page `!important` overrides became redundant and contradictory | deleted from all five pages; one rule now does the job |
| `.arrow-link` | Our Story / Acquisitions used `gap 8px`, `color: var(--brand)`, **no underline**, 14px arrow | homepage pattern everywhere: `gap 10px`, `--t-small`, `1px solid currentColor` underline, 15px arrow with `translateX(4px)` on hover |
| `.btn--ghost` | the homepage defined it white-on-dark only, so Our Story and Acquisitions each **invented `.btn--ghost-ink`** (`hero--narrative-full` special-cased inside it) | `.btn--ghost` is now surface-aware on all six; both invented variants deleted and their two CTAs use the shared class |
| `.hero__title` tracking | Our Advantage / Our Story / Acquisitions carried `letter-spacing: -0.02em`; homepage display is `-0.035em` | removed the override — all six now measure `-3.78px` at 108px, `-4.2px` at 120px |
| `.band` | homepage is `position: relative`; Our Story / Careers / Acquisitions were not | added |
| `.band__head` rhythm | `clamp(40px, 5vw, 64px)` on two pages vs the homepage's `clamp(48px, 6vw, 84px)` | aligned |
| `.ai-video` frame | `6px` on Our Story, `4px` on Our Advantage | `4px` both |
| `.stat__c` | Careers dropped the `margin-top: 12px` under the number | restored |
| FAQ toggle | three variants of `summary::after` (no `line-height`, colour transition on one of three) | one state set |

**Also fixed, not a system conflict — a real defect:** `for-founders.html` overflowed **128px at
390px** (`scrollWidth 518` vs `390`). `.founder-gallery__stage` combined `aspect-ratio: 16/9` with
`min-height: 280px`, so the box derived its *width* from the minimum height (280 × 16/9 = 498px).
Sized from the grid track below 900px instead (`min-height: 0; aspect-ratio: 4/3`) → **350 × 263**.

### Measured after

| | result |
|---|---|
| Emphasis `<em>` rendering off-gold | **0** on all six pages (only the Our Story timeline chapter names stay ink, by design — they're not `.display`) |
| Hero display tracking | **-0.035em** on all six |
| `.arrow-link` / `.btn--ghost` variants | **1 each**, shared |
| Invented button variants | **0** (was `.btn--ghost-ink` ×2) |
| Horizontal overflow @390 / 768 / 1440 | **none** on all six (was 128px on Acquisitions) |
| Console errors / HTTP failures | 0 / 0 |

### Round 2 — the page-tuned values, decided (2026-11-03, client)

Each of these had drifted for a defensible local reason. Asked, decided, applied — the homepage's
number wins in every case, so no interior page carries a private rhythm anymore.

| Value | Was | Now (homepage) | Where |
|---|---|---|---|
| Close H2 measure | 16ch | **17ch** | Our Story, Acquisitions |
| Close action gap | 14px | **20px** | Our Story, Acquisitions |
| FAQ head rail | 290px | **250px** | Careers, Acquisitions (matches Our Advantage + Vertical Software) |
| Stat numeral scale | `clamp(36px, 3.6vw, 64px)` | **`var(--t-stat)`** | Careers |
| Band-head lede measure | `max-width: none` | **inherits the base 54ch** | Careers, Acquisitions |
| Acquisitions ledger | 28px gutters, 28px step name, arrow `.75`, `min-height: 320px` | **34px, `clamp(24px,2.2vw,30px)`, `.4`, `380px`** | Acquisitions "How" |
| NarrativeLight hero | 88svh / 880px (Acquisitions) | **92svh / 960px** | Acquisitions |
| Dark-hero secondary text | `rgba(255,255,255,.82)` | **`.72`** | Our Story, Acquisitions |

Both NarrativeLight heroes now measure **828px at 1440×900** — identical. The four-up ledger keeps
four columns above 1080px and reads cleanly at 1100 (names wrap to two lines, copy holds ~30ch).

**Second real defect found by measuring, not by reading:** the Acquisitions ledger's **≤1080px
two-column mode was broken**. `.step { grid-row: 1 / -1 }` (the subgrid span) survived the
column change, so every step stayed on the same rows — at 1000px the four columns collapsed to
**65 / 69 / 374 / 409px** and steps 1–2 overlapped steps 3–4. Reset to plain flow in that
breakpoint (`grid-row: auto`, `grid-template-rows: none`, flex column), mirroring what the
homepage already does below 900px. Now 456px per column at 1000, two per row, no overlap, and
**zero horizontal overflow at 390 / 768 / 1440** across all six pages.

### Still deliberately page-specific (not drift)

- `.frame--pending` placeholders — three shapes because three different assets are missing.
- The numbered column in `.rail__item` — Vertical Software only; no other page has a rail.
- `.split-head__aside` type scale — set against a narrower column, same family and colour.

---

---

## 2026-11-03 — text now passes AA everywhere; gold is a mark, not a text colour

Brand gold `#FFC600` measures **1.58:1** on paper (AA needs 3:1 at ≥24px, 4.5:1 below). A sweep
found 18 of 39 gold elements sitting on white or `--surface`.

### The rule: emphasis follows its surface

Same mechanism the build already used for `--focus`, so it needs no per-rule override and no
`!important`:

```css
:root                  { --accent: var(--gold); }
[data-surface="light"] { --accent: var(--ink); }
[data-surface="dark"]  { --accent: var(--gold); }
```

| Surface | Emphasis | Contrast |
|---|---|---|
| dark (`--brand-ink`) | gold `#FFC600` | 11.9:1 |
| paper / `--surface` | ink `#0C1B21` | 17.6 / 16.2:1 |

**On paper the payoff word is the body colour** — the Instrument Serif italic carries the accent,
not a tint. A darkened gold was built first (`--gold-display #AD8700`, `--gold-ink #956800`) and
**rejected by the client as muddy**; both tokens are gone. There is no gold text on a light surface
anywhere in the build. Gold survives there only as a **mark**: the hairline rules, rail dots, the
inset active bar, button fills.

`color: var(--gold)` → `color: var(--accent)` in **35 text rules** across the six pages.
An attribute-only override was tried first and lost to ID-specificity rules (`#faq-title em` at
1,0,1 beats `[data-surface="light"] .display em`), which is why the property is scoped on the
surface block instead of on the selector.

### Surfaces had to be declared, not inferred

`data-surface` already existed on most sections. Three gaps were fixed:

- the five dark `.vp` cards sit inside the light verticals band → declared dark;
- `.vp--all`, the index cell, paints a **dark blue gradient** → also dark (brand gold measures
  3.70:1 at the gradient's lightest corner, 9.46:1 at its darkest);
- the Acquisitions `.founder-gallery__stage` (a video frame) inside a light band → dark.

The three dark opening heroes also gained the attribute, though `:root` already resolved them.

### The other AA gaps, closed in the same pass

| Where | Was | Now |
|---|---|---|
| Active "AI at Fullsteam" rail item | white on `--green` — **2.27:1** | ink on the same bright green — **8.26:1**. The bright fill still reads as "active" against the darker `--green-ink` block around it; darkening the fill instead would have hidden the state. |
| `.stat__note` review annotations | `#8a989f` @9px — **2.97:1** | `--muted` @10px — **5.65:1** |
| Vertical Software sidebar numerals | `#6a7a81` @11px — **4.46:1** | `--muted`, plus a light variant on the mobile active pill, which paints `--ink` (3.11:1 there) |

### Hero payoff words over photography

Token maths can't see a photograph, so each hero `em` was sampled from a real screenshot with the
text made transparent and the background measured pixel by pixel: median **9.0–11.9:1**, worst 5th
percentile **6.7:1**. An apparent 3.5% failure on Our Story was the neighbouring **white** headline
glyphs inside the sampled box, not photo highlights — the scrim was already sufficient, so a
directional wash added speculatively was reverted.

### Measured after

| | result |
|---|---|
| Text nodes below their AA threshold | **0** — every page × 1440 / 1024 / 768 / 390 |
| Gold-on-light text remaining | none (by design) |
| Console errors / HTTP failures | 0 / 0 |
| Horizontal overflow | none, all six pages, all four widths |

**Still open, logged not fixed:** the copy tic "X, not Y" appears 8 times across the build — a
writing pass, not a design one.

---

## 2026-11-03 — Our Advantage hero: line break, brand green payoff word, mobile rail fix

**The line break.** "How we grow what we own." ran as one line at desktop, so it now breaks
before "what we own." (`<br>` in the `h1`) — two balanced lines, unchanged at 390px where it
already wrapped there.

**The payoff word is brand green.** `.hero--light .hero__title em { color: var(--green); }` —
`#84BD00`, set on the hero rule rather than on `--accent`, so no other page moves.

> **Contrast, logged honestly:** `#84BD00` on paper measures **2.27:1** (108px desktop, 41px
> mobile), under the **3:1** AA floor for large text. Every other gold/ink decision in this build
> passes; this one word does not. It ships as asked because it is the literal brand green.
> The same-hue alternative that passes is **`#6B9A00`** (**3.36:1**, still clearly green) — one
> line: change `var(--green)` to `#6B9A00` on that rule. `--green-ink #4F750E` is 5.41:1 but
> reads olive at display size.

**Pre-existing bug found while checking the break.** At ≤~600px the Our Advantage rail pills
collapsed: `.rail__lists` and `.rail__list` are flex children of a scroll container, so they
were shrunk below their label width and the `nowrap` text overlapped —
"AI at Fullsteam / Payments / Lending / Insurance" stacked on each other. Measured at 390px:
labels 50–52px wide inside pills that need 90–150px. Fixed with `flex: 0 0 auto` on
`.rail__lists`, `.rail__list` and `.rail__item`, which lets `.rail` scroll horizontally as
intended. Verified at 390 / 480 / 768 / 900 / 1024 / 1080: **0 collapsed pills**, rail scrolls
only where the content is wider than the viewport, no document overflow.
