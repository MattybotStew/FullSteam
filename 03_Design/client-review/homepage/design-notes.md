# Homepage — official working copy (2026-11-02 ledger redesign)

**Promoted 2026-11-02** into this path (`client-review/homepage/`). The prior
official is frozen at `../homepage-2026-10-29-official/` (not published). Narrative,
section order, and the locked opening (Axis A → copy swap → Axis B) are unchanged;
the design system is the editorial ledger layout, framed opening plate, local section
photography, and larger type ladder.

Review portal + `pages.yml` publish this folder.

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
