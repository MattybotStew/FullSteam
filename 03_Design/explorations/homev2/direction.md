# homev2 — video hero + sticky image rail

> **Status:** ★ **OFFICIAL WORKING DESIGN** (declared 2026-10-23) · INTERNAL · not client-facing.
> This is the page the project works from — **supersedes `02-video-hero`**, which is kept
> as history. **WCAG 2.1 AA verified** (axe 4.10.2: 0 violations, normal and
> `prefers-reduced-motion: reduce`) — see [`ada-audit.md`](./ada-audit.md).
> The hero design is still under client review; the accessibility work is not.
> **Figma review (2026-10-23):** comment compile + paste blurbs in [`figma-review-2026-10-23.md`](./figma-review-2026-10-23.md).

## Recent changes (2026-10-23)

**Section 02 → Option 14 parallax depth stack (design pass).** Live `#who-we-are` is
`.who--parallax` (320vh scroll, three drifting planes, A/G/L focus). The previous
**sticky image rail** is archived, not deleted:
[`modules/who-sticky-rail/`](./modules/who-sticky-rail/) (fragment + JS + README).
Wireframe reference: [`02_Wireframes/active/what-we-do-parallax-depth.html`](../../02_Wireframes/active/what-we-do-parallax-depth.html).

**Scale and verticals type.** Review comment: the filmstrip type was hard to read.
Collapsed labels and “Explore all verticals” go from 14px / tracked to **18px**.
The open panel’s description and link leave 12px Fragment Mono for **16px / 15px
Instrument Sans** in white. Photos are unchanged — still the Unsplash stand-ins.

**Founders band scrim.** Figma pin: test section above Careers for AA. Right-edge
scrim raised **0.35 → 0.55** (left **0.72 → 0.82**) so white type clears **≥4.5:1**
even over a bright photo at the light edge of the gradient.

### Hero video (Figma review — sample footage)

Client ask: hero video that reflects priority verticals (**ERP, Wine, Transportation,
Hospitality, Automotive**) and/or **payment processing** — not generic b-roll.

Until a clip is approved:

- Ship target remains **`hero-stock.mp4`** (or equivalent muted loop under `#heroVideo`).
- **Contrast is footage-dependent** — when the file changes, re-run the frame sampling
  in [`ada-audit.md`](./ada-audit.md) (headline tint `.62 − .04·pTint`; worst case must
  stay **≥3:1** for large type, **≥4.5:1** for body/CTA bands as measured today).
- Prefer clips with **mid-tones behind the headline zone** (avoid blown highlights where
  the H1 sits). If footage cannot be graded, add a plate behind copy instead of relying
  on tint alone.

**Out of repo:** licensing, brand approval, and final encode are client/production.

## Recent changes (2026-10-22)

Three deliberate changes landed on top of the original build. All recorded here
rather than left implicit:

### 1. The shrinking video hero (cube) was removed

The video no longer collapses into a cube, and the morph (cube → rail photo) is gone.
The hero is now a **plain full-bleed video that pins only for the headline handoff**
(Axis A → Axis B), then **scrolls away**, and section 02 rises in behind it.

- **Stage `250vh → 180vh`** (80vh of pin travel for the handoff, then the hero's own
  100svh scroll-out). The stage is brand blue, so there is no band, no cube, and no
  colour change — section 02 (also brand blue) rises into it as one continuous field.
- **Handoff now uses the whole pin** (`t = p / 0.82`, was `p / 0.55`), so Axis B holds
  for the last fifth of the pin before the hero lets go.
- **Two fades ride the scroll-out:** the video fades over 0.6vh (so its bottom edge never
  cuts a hard line across the blue) and the copy dissolves over 0.28vh (so the second
  headline is gone before section 02's first block arrives). A bottom scrim on `.hero::after`
  makes the video's foot dissolve into the blue in every state (pinned, scrolling, no-JS,
  reduced motion).
- **Section 02's reveal re-cast as a grow:** the expanding `clip-path` (seeded to the cube)
  is gone, but the *grow* is kept — the rail photo now **scales 70% → 100%** and **fades up**
  as the section arrives (`renderWho`). The grow seeds at **70%, never 0**, so the photo
  expands into the viewport rather than popping in from nothing. The first block's type rises
  on the same progress. Window starts when the frame's top reaches the fold (was its centre)
  and runs 0.6vh. The transform sits on `.who__frame` (inside the sticky rail, never on the
  sticky element itself), so `position:sticky` is untouched.
- **Removed:** `renderMorph`, `renderLift` (the dead-blue lift), the `--cube` / `--cube-fade` /
  `--hero-ax/ay` writes, and all `.is-cubing` / `.is-cubed` CSS. Reduced-motion and no-JS
  paths are unchanged in shape (in-flow hero, both headlines stacked in document order).

**This is a strategy change vs KB §23** if ever promoted: the Axis A → Axis B transition is
now a cross-fade (there is no morph object at all), and the hero no longer collapses. The
two-state model and the two headlines are unchanged.

### 2. Square movement applied (from `squareup.com/us/en`)

Studied the live Square homepage's motion and applied the two cleanest transfers
(see `inspiration.md` §2.2 for the full study):

- **Closing marquee** (`HomePageClosing__trail` analog) — a continuous horizontal scroll of
  the **11 verticals**, brand blue, placed right before the close. `aria-hidden` (decorative
  repetition; the verticals are already in the footer and the verts band). CSS-only loop,
  `prefers-reduced-motion` stops it.
- **Scroll-reveal** (`HomePageV3RevealAnimations` analog) — a `.rv` utility: content rises +
  fades in via `IntersectionObserver` (`.is-in`). Applied to `verts__head`, `verts__stage`,
  `ai__head`, `ai__main`, `careers__head`, `careers__grid`, `close__inner`. Progressive
  enhancement: default state is visible, so no-JS and reduced-motion readers see everything.

### 3. Homepage revision pass — client 2026-10-22 list, homepage only

Applied the six-item client revision list to the homepage (interior pages not touched):

1. **Nav** — the mega-menu is gone; the open menu is a **single column of six rows**
   (`Vertical Software · Our Advantage · AI at Fullsteam · Our Story · Acquisitions · Careers`),
   with Leadership / FAQ / Open roles nested in the same column. Footer labels updated
   (Embedded Offerings → **Our Advantage**, For Founders → **Acquisitions**). AI at Fullsteam
   wayfinds to `our-advantage.html#ai`.
2. **Hero** — the **Careers CTA is removed**; one CTA ("Explore vertical solutions").
3. **Acquire / Grow / Lead** — section 02 keeps the **sticky image rail** but the blocks are now
   **Acquire → Grow → Lead** (Founders moved out), each with a **big metric** pulled out of the
   paragraph: Acquire `70,000+` · Grow `$75B` (labelled **payment volume**) · Lead `2,000+`.
   "Top-20 payment processor" is flagged `[placeholder — client to confirm]` (KB §22.5).
4. **Founders** — a **standalone section below AI** (`#founders`): "A home for the business you
   built." + founder quote + **"Explore Acquisitions"** wayfinder. **No "Talk to us" / form /
   email on the homepage** (that lives on the Acquisitions page only).
5. **Verticals** — the featured five are now **ERP · Wine · Transportation · Hospitality ·
   Automotive**, each with a **vertical-specific stat** (`bottles of wine shipped`, `black-car
   rides completed`, `oil changes booked`… all `[placeholder]`, never invented figures), plus a
   sixth **"Explore all verticals"** tile. The text list under the boxes was dropped.
6. **AI** — the three items now introduce the three use cases: **Modernize** existing software,
   **Customer features** (new customer-facing AI), **Automate** workflows.

The `#who-we-are` section gains a `.who__head` (intro above the grid); the reveal now measures
the frame's own offset (which accounts for the head). Verified: rail caption walks 01 → 02 → 03,
rail stays pinned through the Lead headline, 0 JS errors, no horizontal overflow, menu renders
as one column.

### 4. Polish pass — color rhythm + hero handoff subject (2026-10-22)

- **Color rhythm.** Founders is now a **quiet white** moment (a near-white wash over the photo,
  ink title, brand-blue serif accent) instead of another blue band; the **closing marquee is
  folded into the close** (transparent, on the close canvas, full-bleed via negative margins).
  The page no longer ends on a stack of blue/dark bands: blue → white → light-gray → white →
  dark → darker.
- **Hero handoff subject.** The video now **zooms 5% and drifts 3% left** as Axis B lands
  (tied to `--pVideo`), so the A→B swap has a subject again without the cube.
- **Motion tokens.** Added `--ease-out` / `--ease-inout` / `--dur-fast/mid/slow` to `:root` and
  wired them into the reveal (`.rv`), the rail crossfade (`.who__shot`) and the verticals
  accordion (`.vpanel`) — the start of a single motion system.

### 5. The stats band was cut, not redesigned (2026-10-23)

The band was rebuilt twice the same day — scrubbed sentence → three KPI blocks → a two-track
"ledger" — and all three shared one flaw: **they restated the page.** Every figure in the band
already appears in `#who-we-are`, 640–1,825px above it:

| Figure | §02 `#who-we-are` | Band (removed) | Filmstrip |
|---|---|---|---|
| **70,000+** | step 1, 68px (`y 1707`) | 118px (`y 3532`) | — |
| **$75B** | step 2, 68px (`y 2275`) | 118px | — |
| **11** | step 3 caption, "across 11 verticals" | 118px | the section's whole subject |
| **2,000+** | step 3, 68px (`y 2781`) | — | — |

So the band's unique content was **zero figures**. It said 70,000+ at 68px, again at 118px
1,825px later, and again as "11 Industries" immediately before a section whose entire subject is
eleven verticals. It was also the only section on the page with no heading or kicker, which made
it read as filler rather than a claim.

**Removed:** `#statsBand`, `.stats`, `.stats__inner`, `.kpis`, `.kpi__num`, `.kpi__label`, and
their 900px overrides. `.verts` absorbed the old `.scale` wrapper's stacking context and
`--mono-d` alias; the section keeps `id="investors"` and now takes its accessible name from its
own `h2` (`aria-labelledby="vertsTitle"`, replacing `aria-label="Scale and verticals"`).

- **Measured:** page **8,700px → 8,242px** at 1440×900 (−458px). The blue `#who-we-are` block
  now meets the white verticals section directly — a colour change is the boundary, so no gap
  was needed. Mobile 9,486px at 390 and 9,680px at 320 (the band was 596px there); 8,965px at
  1920.
- **No horizontal overflow** at 320 / 390 / 768 / 1440 / 1920. The accordion still initialises —
  five panels, one open by default, five disclosures.
- **AA:** axe 4.10.2, WCAG 2.1 AA — **0 violations** in normal, fully-revealed, and
  `prefers-reduced-motion: reduce` (26 rules passing). Nothing new was added; the section is the
  filmstrip it already was.

**Why not consolidate into the band instead?** That was the alternative: cut §02's three metrics
and keep a four-figure row (adding `480M+ transactions` from the wireframe's `proof-strip`). It
was rejected because §02's figures sit directly under the claim each one proves — *we keep
buying* → 70,000+; *what's behind it* → $75B; *the software leads its market* → 2,000+ people
across 11 verticals. Relocating them would cost three evidence anchors to remove one repetition,
and `480M+` is still a placeholder pending publishability (OI-5). If the client later wants one
scannable row for investors, that is the trade to reopen — and it belongs in the wireframe track
first, where `proof-strip` still carries four figures.


### 6. One 100px edge for header, acquire, founders and verticals (2026-10-23)

Four edges that were within one viewport of each other and shared nothing: the header had a
hardcoded `20px` inset (`padding: 10px 20px`, inherited from the Figma "home" frame), the acquire
section sat on `24px`, the founders band on `8vw` (115px at 1440), and "Keep the businesses
growing." on `10%` (144px). All four now share **100px**.

- `.hero__bar` `10px 20px` → **`10px 100px`** (logo left edge and CTA pill right edge both at 100).
- `.who` (acquire) `56px 24px` → **`56px 100px`**; the sticky rail's right edge follows to 100.
- `.founders` `clamp(72px, 10vh, 120px) 8vw` → **`… 100px`**.
- `.verts` (verticals) `--gutter: 10%` → **`--gutter: 100px`**. One variable drives the head, the
  stage and the eleven links, so all three rows moved together. The stage widens 1152 → 1240 at
  1440; the open panel goes 465 → 515. The `.verts__title` keeps its 1160px readable measure and
  stays centred inside the wider box (140px each side at 1440), so the headline is not re-set.

**100px is a desktop measure, so it steps down at the existing breakpoints.** At 320px a 100px
inset leaves 120px of content, and the header's logo + menu + CTA need 262px of row — the CTA ran
42px off-screen. So: **≤900px → 40px**, **≤560px → 24px** for `.who` / `.founders` / `.verts`,
and **20px** for the header (tighter because its row is fixed-height content, not flowing text).

Verified at 320 / 390 / 560 / 768 / 900 / 1023 / 1024 / 1280 / 1440 / 1920: `padding-left` reads
20 / 24 / 40 / 100 with no horizontal overflow at any width; logo, acquire step, founders copy,
verticals head, stage and links all land on the same 100px edge at ≥1023; the accordion still
initialises (five panels, one open, 515 + 4×140 at 1440); and axe 2.1 AA stays at **0 violations**
normal and fully revealed.

Not touched, so the page still runs on several edges: hero `min(1100px, 100vw−48px)` centred
(170px at 1440), `#ai`/`#careers` inner `160px`, `#close` inner `240px`, footer nav `160px`.

## What this is

A full homepage built on exploration 02's **video hero + cube collapse**, with the
**second section replaced** by the "who we are / sticky image rail" band (variant E from
[`../03-section-two-sandbox/`](../03-section-two-sandbox/)).

```
http://localhost:8000/03_Design/explorations/homev2/index.html
```

Self-contained static page — no build step, same asset folder as exploration 02 (logo +
the Square reference clip, both local-only / gitignored).

## The one change

| | Exploration 02 | homev2 |
|---|---|---|
| Section 02 | `What does Fullsteam do?` — stacked **Acquire / Grow / Lead / Founders** at 120px serif on brand blue | `Who we are` — four content blocks on the left, **sticky image rail** on the right |
| Height | 1,542px | 3,298px |
| Page height | 7,725px | 9,840px |

Everything else is inherited unchanged: the pinned video hero, the headline handoff, the
cube collapse, `#investors` (scale band + verticals), `#ai`, `#careers`, `#close`, and
the footer.

## ⚠ This is a strategy change, not a polish pass

It changes a **client-reviewed section** that is locked in KB §24
(`Opening → What we do → Verticals → AI → Careers → Close`). Two consequences to be
explicit about:

1. **The explicit model is gone from the homepage opening.** "What does Fullsteam do?"
   was added 2026-10-01 in direct response to *"the client's #1 question"*. The new band
   answers a different question — *who are you* — and answers it well. But the page no
   longer states the model in one place. It still appears, implicitly, as the kicker
   under each block: Who we are → **Acquire** → **Grow** → **Founders**.
2. **"Lead" is dropped entirely.** Accepted deliberately (this build). The only place it
   survived in the sandbox candidates was the four-beat model list, and that list is what
   this section replaces. If the client wants it back, the cheapest options are a fifth
   block (+1 photo, ~+0.5 screen) or folding it into the Grow block's copy.

Promoting any of this requires `wireframes.md` §2 + changelog, `design.md` if it changes
intent, and a KB entry — **not** a quiet edit. Per the wireframe/design boundary rules,
nothing in `02_Wireframes/` or the design track has been touched.

## How the rail works

- The rail is **CSS `position: sticky; top: 104px`**. JS only decides *which* block is
  current; the holding-in-place is native.
- **Activation line at 55% of viewport height** — the photo changes as the next block's
  heading arrives, not after you have started reading it.
- Caption is `NN — Kicker`, driven off each block's `data-cap`.
- **`46vh` trailing pad on `.who__steps` is load-bearing.** A sticky element can only
  travel (column height − rail height). Without the pad the rail ran out of travel and
  released ~300px *before* the final block had been read.
- **≤900px:** the rail goes `static` and every block renders its own image inline above
  its copy, so nothing is lost and the swap JS isn't needed.

### Section-entry reveal — "the cube opens into the section" (2026-10-16)

The hero hand-off was *too* clean: everything from hero to section 02 is one `#003F55`
field, so there was no seam left to look at and therefore nothing to notice. Two additions
give the transition a subject, both driven by **one** scroll progress:

1. **The rail's photo opens out of a cube-sized square.** `.who__frame` carries an
   expanding `clip-path`, seeded to a **210px** square — the exact size of the hero's
   settled cube — and rounded to the same **28px**, which drives to `0` as it opens. The
   photo stops being an unrelated image and starts as the object the hero just dissolved.
2. **The first block's type rises with it.** `.who__kicker` / `.who__title` / `.who__body`
   fade up on a `0.12` stagger with a 22px rise, on the same progress.

**Driven by the SECTION's own entry, not by `--cube`.** This was the first thing tried and
it does not work: the cube settles and fades at `p = 0.92` (scrollY ≈1242), but section
02's top only reaches the fold around scrollY ≈1350. They do not overlap, so a
`--cube`-driven reveal would finish before the section was ever on screen.

**Progress is computed from document position, never the live rect.** The first attempt
used `getBoundingClientRect().top`, and stalled: once the rail goes sticky its on-screen
top freezes at `0`, so progress froze at ~50% and the reveal never completed. `.who`
itself is not sticky, so `whoSec.getBoundingClientRect().top + scrollY` is stable.
`measureWho()` recomputes it on resize.

- **Window:** `p = 0` when the frame's centre reaches the fold, `p = 1` a further
  `0.85vh` down — deliberately placed to run *entirely* while the rail is pinned
  (scrollY 2360 → 3130 at 1440×900).
- **Clip-path is on `.who__frame` ONLY.** On `.who` or `.who__rail` it would break
  `position: sticky` for the rail — the same class of bug as the `overflow: hidden`
  ancestor that killed it earlier. The frame already has `overflow: hidden` and sits
  inside the sticky element, so it is safe. Verified: rail stays `sticky` at every
  scroll position through the whole reveal.
- **The caption is faded in over `p 0.86 → 1`, not earlier.** It sits at the bottom of
  the full frame, so the expanding clip hides it until the bottom inset is nearly gone
  (~p 0.92). Fading it earlier fades an element that is still clipped away.
- **Per-frame writes are quantised (skip when Δ < 0.004) and carry no CSS transitions**
  (KB §23.6 rule 2).
- **Settles back to the stylesheet.** At `p ≥ 1` every inline `clip-path`, `opacity` and
  `transform` is cleared rather than pinned forever.
- **Reduced motion / no-JS: fully open.** `renderWho()` returns early when
  `reduce.matches`, so no clip is ever applied and nothing is hidden by default.

### Verified

- Reveal ramps and settles at 1920×1080, 1440×900, 1024×768, 768×900, 390×844, 320×700
  (`clip-path` → `none`, caption → default, all four `.who__rise` → default).
- **Rail remains `sticky`** at ≥1024 throughout, `static` at ≤900 — the clip-path did not
  break it.
- Reduced motion verified by screenshot: no clip, no inline opacity overrides, caption and
  CTA both visible.
- Full-page walk (30 × 420px): 0 JS errors, 0 broken images, no horizontal overflow, page
  height unchanged at 9,948px.

### The morph — video → cube → the rail's photo (2026-10-16)

The cube used to die where it was born (viewport centre) while the rail's photo opened
out of the rail's own centre — two unrelated places, so the hand-off read as a cut. Now
the collapse **anchor travels**, so the cube shrinks toward the photo that is about to
open out of it:

- **`.hero__media` / `.hero__fallback` use `left: var(--hero-ax)` / `top: var(--hero-ay)`**
  (defaults `50%`, i.e. the original centred behaviour). Written per frame.
- **`ease = smoothstep(segment(--cube, 0.78, 1))`** lerps the anchor from the viewport
  centre to the rail's live centre. Once `ease = 1` the anchor *is* the frame's centre —
  which is already where the reveal's `clip-path` seeds, so **the reveal needed no change
  at all**. It meets the cube by construction.
- **The target is clamped to keep the cube on screen.** While the section is still rising,
  its rail centre is below the fold; an unclamped anchor dove the cube off the bottom of
  the screen between scrollY ~1150–1350 and brought it back up. Clamping to
  `[CUBE/2+8, vh−(CUBE/2+8)]` goes inert the moment the rail centre is on screen, which is
  the only time the handoff matters.
- **The cube no longer fades on `--cube`.** It holds at full strength until the reveal
  starts, then hands off over its first 28% via a new `--cube-fade`. Fading on `--cube`
  killed the cube before it reached the rail. `.hero.is-cubed` also no longer hides it.
  **This supersedes the earlier "return the video to how it was" instruction** — the morph
  cannot happen if the cube dies before the photo arrives.
- **`.hero` gets `z-index: 2` while `.is-cubing` / `.is-cubed`.** Without it, section 02
  (`z-index: 1`) covers the cube where it lands. Both canvases are brand blue so the
  overlap itself is invisible; only the cube reads.

### Verified

Measured cube centre vs rail centre at 1440×900 — **coincident for the entire handoff**:

| scrollY | 1100 | 1250 | 1320 | 1400 | 1500 | 1600 | 1700 |
|---|---|---|---|---|---|---|---|
| cube | [720,450] | [1033,787] | [1033,762] | [1033,630] | [1033,530] | [1033,450] | [1033,450] |
| rail | [1033,1710] | [1033,1204] | [1033,762] | [1033,630] | [1033,530] | [1033,450] | [1033,450] |
| on screen | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `--cube-fade` | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 | 0.91 | 0.44 |

(The gap at 1100–1250 is the clamp holding the cube on screen while the section is still
below the fold; they lock together at 1320 and stay locked.)

- X-coordinates coincide at **every** breakpoint (1920×1080 → 320×700).
- Rail still pins at `top: 0` through blocks 02–04 and releases after; `--cube-fade`
  reaches `0` and the reveal's `clip-path` returns to `none`.
- Reduced motion: none of it runs — no anchor vars, no `--cube-fade`, no clip, no lift.
- Full-page walk (32 × 400px): 0 JS errors, 0 broken images, no horizontal overflow, page
  unchanged at 8,610px.

### Load-time entrance — the CD brief (2026-10-17)

A brief arrived describing a **timed** two-screen hero. Built as a **hybrid**: the entrance
plays on load, the existing scroll sequence (handoff → cube → morph → section) is untouched
and takes over as soon as you scroll. A fully timed handoff would have replaced the locked
Axis A → Axis B model in KB §23.

**Screen 1 — headline.** Masked line reveal (each line in its own `overflow: hidden`
wrapper, sliding up from behind it), **130ms stagger**; video **1.15 → 1** over 1.5s.

**Screen 2 — subtext + rule + CTA.** Subtext fades/rises in (700ms), the gold rule draws
`scaleX 0 → 1` (640ms), the CTA pops `scale 0.9 → 1` with a spring overshoot (820ms), and
the video parallaxes **x −5%** for the "new scene" beat. Axis A lifts `y −40px` as it
arrives.

**Section B.** The brief wanted the image at `x: 100% → 0`. Kept the **clip-path reveal
seeded at the cube** instead — it already satisfies "grows where the video shrank", and
swapping it would have broken the morph. Only the **text** gained the brief's `x: −40 → 0`
(added to the existing `y: 22 → 0`).

### Deviations from the brief — deliberate, both flagged

1. **Screen 1 does not fade to `opacity: 0`.** The brief says it should, but Axis A has to
   survive on screen to hand off to Axis B on scroll (KB §23). It lifts `y −40px` and dims
   to a **floor of 0.6** instead.
2. **The video zoom is 1.15 → 1 on load**, not scroll-linked. It composes with the
   existing `--pVideo` scroll zoom rather than replacing it, so the cube collapse is
   untouched.

### New content added

The brief's "subtext" and "divider" did not exist. Added:
- `.hero__sub` — **placeholder copy**: *"We buy them. We keep them growing."* 8th-grade
  plain language per KB §20, no figures. **Needs client sign-off.**
- `.hero__rule` — 62 × 2px gold rule, `transform-origin: left`.

### Bugs hit while building this

- **The mask wrapper broke `:nth-child()`.** Wrapping each line in a single-child span
  made *every* line `:nth-child(1)`, collapsing the three staggered exit ramps into one —
  the scroll handoff would have gone out as a single block. Fixed by stamping `data-li`
  on every line up front (before any wrapping) and indexing the CSS by `[data-li="n"]`
  instead of `:nth-child(n)`. Verified after the rewrite: Axis B still staggers in at
  **100 / 49 / 2** across the handoff.
- **The mask clipped the scroll exit.** The exit moves lines *up*, so an `overflow: hidden`
  mask around them would slice the exit in half. The masks are **removed again** once the
  entrance finishes (`masks: 0` after cleanup), handing the stylesheet back rather than
  pinning inline styles forever.
- **The entrance and the scroll renderer both write transforms.** They are kept disjoint by
  construction: the entrance writes `--ly` (composed into the line transform alongside the
  scroll `--line-exit`), `--hero-zoom`, `--hero-x`, `--h1-lift`, `--cta-*`; the scroll
  renderer writes `--p*` and `--cube`. Same for the video, whose transform composes
  `--hero-zoom`, `--pVideo` and `--cube` multiplicatively.

### Verified

Sequence sampled from inside the page (rAF log, 250ms intervals):

| t | `--hero-zoom` | `--hero-x` | line1 `--ly` | sub | rule | CTA scale |
|---|---|---|---|---|---|---|
| 251ms | 1.0907 | 0.00% | 47.49% | 0 | 0 | 0.9000 |
| 751ms | 1.0407 | 0.00% | 0.00% | 0 | 0 | 0.9000 |
| 1251ms | 1.0000 | −1.02% | 0.00% | 0.204 | 0.035 | 0.9000 |
| 1501ms | 1.0000 | −2.80% | 0.00% | 0.560 | 0.425 | **1.0186** ← overshoot |
| 2001ms | 1.0000 | −5.00% | 0.00% | 1 | 1 | 1.0005 |
| 2251ms | cleaned up — all inline styles removed, masks unwrapped |

- **Scroll handoff unbroken** after the DOM rewrite: Axis A 100 → 0, Axis B staggering in
  100 / 49 / 2 → 100.
- **Reduced motion:** the intro returns immediately — no masks, no inline styles, subtext
  `opacity: 1`, rule `transform: none`. Default CSS state *is* the finished state.
- Content fits inside the hero at 1440 / 768 / 390 / 320; no horizontal overflow anywhere.
- 0 JS errors.

## Rail geometry (2026-10-16)

- **Rail is 55% of the canvas and flush to the canvas's right edge.** Two changes:
  the grid no longer sits in a centred `min(1240px, 100%)` box (that left the rail
  floating ~100px inside the edge at desktop widths), and the columns became
  `calc(45% - var(--who-gap)) 55%`.
- **The gap is taken off the *content* column, not split.** With `45fr 55fr` the fr
  units divide the space *remaining after* the gap, so the rail measured **52–53%**
  of the canvas, not 55%. `(45% − gap) + gap + 55% = 100%` puts the rail at exactly
  55% at every width.
- **Images are a full viewport tall** — `height: 100svh` on `.who__frame`, replacing the
  1:1 aspect ratio. `svh` rather than `vh`: identical on desktop (where the rail is
  sticky) but won't outgrow the fold on mobile browsers with a collapsing URL bar.
- **The sticky offset went `104px → 0` to go with it.** These two are coupled — at
  `top: 104px` a full-viewport image hangs 104px below the fold and its caption is
  never seen. At `0` the frame fills the viewport exactly. The consequence is that the
  top 68px of the image sits behind the fixed header bar; that is normal for sticky
  content, and the alternative (`top: var(--bar-h)` + `height: calc(100svh - var(--bar-h))`)
  would make the image *not* 100vh.
- **≤900px: the rail is static, so the frame must not stay 100svh** —
  `height: auto; aspect-ratio: 4/3`. Without that override a full-width mobile image
  would be a screen tall.
- Sticky travel shrinks as the rail grows (it can only travel *column − rail*). Measured
  at 1440×900: rail pinned at `top: 0` through blocks 01–04, released after the last.

## Empty scrolling after the video (2026-10-16)

Measured at 1440×900, the video finishes at scrollY **1242** (`--cube` reaches 1 at
`p = 0.92`) and the last line of section 02's copy ends at **4846** — **3,604px of scrolling
containing only 969px of text**. Three separate causes, two of them now fixed:

| Empty stretch | was | now |
|---|---|---|
| Settled hero band — cube gone, empty blue pinned at top | ~1,000px | ~980px *(see below)* |
| Block air — 78vh blocks holding 161–238px of text | ~1,440px | ~1,020px |
| Trailing pad on `.who__steps` (rail travel only) | 414px | 414px |
| **Page total** | **9,948px** | **9,390px** |

- **Blocks `78vh → 60vh`, last `62vh → 54vh`.** Still paced, but far less scroll per px
  of content. Section 02: 3,298 → 2,740px.
- **Settled band `--cube-band` 426px → `--cube-band-settled: 120px`.** The band is empty
  *by definition* when `.is-cubed` lands (the cube has already faded to 0), and section
  02 is brand blue too, so there is no seam for the band to hide. The cube overflows
  120px but is fully transparent at that point and `.hero` clips it. Kept as a short
  blue tail so the release still reads as a release rather than a snap.

### The dead-blue lift (2026-10-16, option 1 chosen)

The remaining empty zone is now **consumed by the next section** rather than left as blue.
`.hero-stage` gets a negative `margin-bottom` that ramps in over `p 0.86 → 1`:

```
margin = −(vh − B)          B = --cube-band-settled (120px)
```

At `p = 1` the pin has travelled exactly `S − vh`, so the section's top lands at
`vh − margin = B` — i.e. **flush under the settled band**. Both canvases are brand blue,
so the overlap is invisible and the only thing the reader sees is content arriving sooner.

- **Ramped, not toggled.** Snapping the margin when `.is-cubed` flips would be a visible
  jump. Ramping it over `0.86 → 1` makes it overlap the cube's own fade (`0.72 → 1`), so the
  section rises as the cube dissolves.
- **Quantised to 2px** — it is a layout write, so don't thrash it every frame.
- **Reversible.** Scrolling back up unwinds it smoothly (measured: 1800 → −780px,
  1200 → −86px, 900 → 0) and the hero re-expands. No snap in either direction.
- **Scales with the viewport**: `vh − 120` = 960 / 780 / 648 / 580 at 1080 / 900 / 768 /
  700px tall.
- **`measureWho()` re-runs when the lift settles**, because the reveal is measured from the
  section's real document position, which the lift changes.
- **Reduced motion: no lift.** `renderLift()` sits below the `syncMode()` early return, and
  under reduced motion the stage is `.is-flow` (no pin), so there is no dead zone to
  consume and nothing to lift.

### Bug found while verifying this

**The reveal's `clip-path` inset was over-constrained.** The inset applies to top *and*
bottom (and left *and* right), and the seed used the **full** margin:

```js
var ix = (1 - CUBE / fw) * 100;   // full margin…
…'inset(' + iy*k2 + '% ' + ix*k2 + …'   // …applied to BOTH sides
```

At `p = 0` the two insets summed to >100%, so the clip region was **empty** — the reveal
appeared to do nothing for the first half of its travel, then popped open. It only became
obvious once the lift meant the section arrived earlier and the early frames were actually
on screen. Fixed with `* 50` (half margin per side), which yields an exact **210×210**
square at `p = 0`, opening to 766×900:

| scrollY | 1500 | 1700 | 1800 | 1950 | 2100 | settled |
|---|---|---|---|---|---|---|
| visible | 210² | 297² | 370² | 479² | 588² | 766×900 |

### Result

| | before | after |
|---|---|---|
| Dead blue after the video | ~1,000px | **~230px** (the section's own entry beat) |
| Page total | 9,948px | **8,610px** |

**Verified:** lift lands the section flush under the band at every breakpoint (1920×1080 →
320×700), unwinds smoothly in reverse, rail still pins at `top: 0` through blocks 01–04,
reveal settles everywhere, reduced motion untouched, full-page walk (30 × 420px) 0 JS
errors, 0 broken images, no horizontal overflow.

**Known trade-off (unchanged):** sticky travel is `column − rail`, so the rail releases
~380px before section 02's final block finishes reading.

## Bugs carried over from the sandbox (both fixed here)

Both were caught building variant E and are worth not repeating in the real build:

1. **`overflow: hidden` on any ancestor silently kills `position: sticky`.** Because it
   also *clips*, nothing looks broken — the rail just scrolls away like an ordinary
   column. The section here has no clipping ancestor; containment lives on `.who__frame`
   alone.
2. **A rAF scroll handler that early-returns before clearing its own queue flag latches
   `true` forever** and silently stops responding. `renderRail()` is called *after*
   `ticking = false` is set, so an early return can't strand it. `renderRail()` is also
   called **above** the `syncMode()` early-return, so the rail still updates under
   `prefers-reduced-motion` — swapping which photo shows is content, not motion.

## Also changed from exploration 02

### The seam — blue hero → section 02 (2026-10-16)

**The problem.** Exploration 02's cube collapse hands off to a section that is *also* brand
blue, so the band it leaves behind is blue-on-blue and invisible. The moment section 02
went white, that same hand-off produced: full-bleed blue hero → cube → cube fades out →
a 426px band of dead blue → a hard full-bleed cut to white. The colour change had nothing
in it.

**What shipped: section 02 went back to brand blue.** The hero and section 02 are now the
same canvas, so there is no longer a colour change at the hand-off to make clean — the
seam is gone because there is no seam.

Three attempts got here:

| Attempt | Result |
|---|---|
| Keep the cube alive on the seam, pull the white section up to meet it | Worked (`gap = 0` at all breakpoints) but kept the cube past its exit, which is inherited hero behaviour that had deliberately faded it. Too much change for the problem. |
| Dissolve the hero canvas blue → white across the collapse | Read well, but lost the brand blue the client sees first, and forced a blue header-bar pin so the white wordmark survived. |
| **Section 02 on brand blue (current)** | Hero reverts to solid blue, the video keeps its original fade, and the hand-off is continuous. Least change. |

**Section 02 was restyled onto blue**, not just given a background:

| | was | now |
|---|---|---|
| Canvas | white | `var(--blue)` |
| Heading | ink `#00202B` | white |
| Heading accent `em` | blue | **gold** `#FEC50A` |
| Body | `#41525b` | `rgba(255,255,255,.88)` |
| Kicker | `#5b6b74` | `rgba(255,255,255,.58)` |
| Placeholder note | `#7d8d95` | `rgba(255,255,255,.52)` |
| CTA | `pill--blue` | `pill--gold` — the dark-blue pill disappeared into the blue |

The rail, its caption and the photos are unchanged; the caption sits on its own gradient so
it reads the same on either canvas.

**The cube behaviour is exactly exploration 02's** — the `0.72 → 1` opacity fade and the
`.is-cubed` hide are untouched, `margin-bottom` is `0`, and there is no contact shadow.
Nothing about the hero collapse was modified to achieve this.

**The colour change moved, it didn't disappear.** It is now section 02 → `#investors`
(blue → white), which lands *after* ~3.3 screens of content rather than at the hero exit.

### Verified

- Hero and section 02 report the **identical** background (`rgb(0, 63, 85)`) at
  1920×1080, 1440×900, 1280×800, 1024×768, 768×900, 390×844, 320×700 — and the hero band
  and `.who` are **flush (`gap = 0`)** at every one of them. The whole run reads as a single
  blue field, so the transient sticky-band geometry is invisible rather than merely hidden.
- `#investors` confirms `rgb(255,255,255)` — the remaining cut is section-boundary, not
  hero-boundary.
- CTA pill resolves to `rgb(254, 197, 10)` (gold), i.e. legible on blue.
- Reduced motion: stage `.is-flow`, hero full-bleed blue, section 02 blue, white heading,
  both headlines stacked in document order (KB §23.6 rule 5 intact).
- Full-page walk (26 × 420px): 0 JS errors, 0 broken images, no horizontal overflow at any
  breakpoint.

## Guardrails observed

- No revenue, run-rate, or profitability anywhere (G4).
- The founder quote is genericized and marked `[placeholder]` — **not publishable as
  written** (G5). It is carried over from the sandbox deliberately so nobody mistakes it
  for approved copy.
- All four photographs are **Unsplash placeholders**, explicitly alt-labelled as such.
  KB §18 says avoid stock; these stand in for real Fullsteam imagery and are not a
  direction.
- Terminology untouched: "Embedded Offerings", "Vertical Software", never "Platform" (G1).
- Not framed as an exit — "a home for the business you built" (G2).
- No sitemap or nav changes.

## Verified (1440×900 unless noted)

- **0 JS errors** on a full-page scroll walk (26 × 420px).
- **No broken images**; all four Unsplash ids return 200 (checked with `curl` before
  wiring — this project has been bitten by 404s producing flat brand-blue frames).
- **No horizontal overflow** at 320 / 390 / 768 / 900 / 1024 / 1440 / 1920.
- **Seam measures `gap = 0`** — cube bottom edge exactly meets the white section's top
  edge — at every one of 1920×1080, 1440×900, 1280×800, 1024×768, 768×900, 390×844,
  320×700. Because the fix is a pure function of `--cube-pad-y` rather than a tuned
  pixel value, it holds by construction rather than by coincidence.
- **Mid-collapse** (verified at `--cube` 0.65 and 0.96): the video stays fully opaque
  through the final third and lands as a solid cube, instead of fading to nothing.
- **Reduced motion:** stage goes `.is-flow`, hero stays full-bleed at 900px, **no cube and
  no contact shadow**; both headlines stack in document order (KB §23.6 rule 5 intact).
- Rail behaviour: caption walks `01 Who we are → 02 Acquire → 03 Grow → 04 Founders`,
  rail locked at `top: 0` through all four blocks, released only once the last block had
  left.
- **Rail width = 55.0% of the canvas and `rightGap = 0`** (flush to the canvas edge) at
  1920×1080, 1440×900, 1280×800, 1024×768. At ≤900 it stacks to 100% as designed.
- **Frame height = 100% of the viewport** at every desktop size (1080/900/800/768 →
  1080/900/800/768), and the caption stays inside the viewport throughout.
- Responsive: `sticky` + no inline images at ≥1024; `static` + inline image per block at
  ≤900.
- Computed styling confirmed: white canvas `rgb(255,255,255)`, ink `rgb(0,32,43)`, title
  Instrument Sans 46px/700, accent `em` Instrument Serif italic in brand blue
  `rgb(0,63,85)`, kicker + caption Fragment Mono 11px.

**One open observation:** the settled band is ~426px of blue with nothing in it (the cube
fades as it always did), and section 02's first block is `78vh` with centred content — so
there is roughly a screen between the hero and *"A home for the business you built."* That
is inherited pacing, not a defect, and it now reads as blue breathing room rather than as a
hole.

**Not verified:** nothing outstanding. (An earlier note here said screenshots wouldn't
settle — that turned out to be a wedged browser session, fixed by reopening it.)

## Open questions for the client

1. Is **"Lead"** coming back, and if so as a fifth block or folded into Grow?
2. The section is **+1,756px** on the page. Is a ~3.6-screen narrative band acceptable as
   the second section, or does that cost buy more than it earns?
3. Photography: four real Fullsteam images are needed, or the band should be rebuilt
   without imagery.