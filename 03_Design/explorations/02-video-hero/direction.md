# Exploration 02 — "Video hero"

> **Status:** INTERNAL · UNREVIEWED · **unofficial.** Not client-facing.
> Lives in the gitignored sandbox — see [`../README.md`](../README.md).
> **Companion:** [`index.html`](./index.html) — the visual exploration.
> **Board:** [`../index.html`](../index.html).

## Where this came from

Built 2026-10-12 from Figma **`FS-Design`** → canvas **`6-124`** (`✅ Design [WIP]`).
The canvas holds two hero frames, which are **the two states of this scroll interaction**:

| | State 1 — `Desktop - 1` (load) | State 2 — `Desktop - 2` (scroll) |
|---|---|---|
| Node | `11256:591` (hero `11256:618`) | `11256:658` (hero `11256:659`) |
| Overlay | **none** (build: `#003F55` tint @ 80%) | `linear-gradient(180deg, rgba(0,89,120,.7) 0%, rgba(0,165,222,0) 62%)`; build thins the tint 80 → ~38% |
| Headline | **120px** — “Any industry, / we own the / *software.*” (rewritten 2026-10-12, was “Whatever the *industry,* / we own the software / it runs on.”) | **120px** — “Then we build / what makes it / *grow.*” (rewritten 2026-10-12, was Figma's “Software *first.* / Then we *grow* it.”, which restated punch 1 — one gold italic word each now: *software.* then *grow.*) |

Buttons / header are identical in both. Scroll uses a **phased vertical handoff** (portfolio out/up → software in/up, staggered second line)—not a linear crossfade.
Assets: `assets/hero-video.mp4` + `.webm` and `assets/hero-poster.jpg` — the Square hero clip
(1440×1080), plus `assets/fullsteam-logo.svg` (white/gold lockup).

## The behaviour (as specified by the CD)

> “the overlay changes on scroll but the video starts at load”

- **Video starts at load** — `<video autoplay muted loop playsinline>`, no interaction,
  and it keeps playing through the scroll.
- **Overlay changes on scroll** — the hero pins (`180vh` as specified; **`250vh`** in the
  2026-10-14 build — see *The cube collapse* below); scroll progress drives `--p` `0 → 1`
  and the whole sequence now spans that pin (2026-10-12: remapped — it previously completed at 52%
  of the pin, leaving ~48% dead scroll). Tint/gradient ease first (gradient 19→77%), then the
  portfolio exits line-by-line (35→77%: fade + translate up; shrink only in the last 20% of exit)
  while the software headline enters from below (line 1 at 50→77%, line 2 lags to 65→92%). Subtle
  video scale (1 → 1.03) runs alongside. ~8% hold at the end.
- **Fallbacks** — no JS → no pin, static hero showing the portfolio headline. `prefers-reduced-motion`
  → same static hero, no scroll-linked change.

## Typography (2026-10-12)

- **One size for both headlines** — `--title-max` lives on `.hero__headlines` and both `.hero__title`
  variants read it, so they can never drift: `clamp(50px, 8.34vw, 120px)` (mobile
  `clamp(41px, 12.6vw, 65px)`). Portfolio is +20% on the old 100px; software now matches it at
  120px (was 100px / 83px before the +20% pass). Both blocks are therefore the **same height**
  (350px @1440) and the swap is a clean 1:1 replacement in the same space.
  *The portfolio still shrinks to 83% of that while it exits — a transition effect, not a size.*
- **Leading `0.95em`** (`--lh`), down from an effective ~1.26em — the old stack had
  `line-height: 1` **plus** `padding-block: .06em` **plus** `gap: .14em`. Those are gone;
  the gap is now `0.02em`, so line rhythm is set by `--lh` alone.
- **Tracking `-0.045em`** (was `-0.02em`). Display type wants tighter tracking, and it is what
  makes the +20% size fit the column.
- **`em { line-height: 0 }`** — Instrument Serif's taller content box was inflating the line box on
  any line containing the gold accent (portfolio line 1 measured 117px vs 114px, so its advance was
  119.4 vs 116.4). Zeroing it makes every advance identical.
- **Headline box is back to 1100px** — the shortened copy fits the column at every breakpoint
  (widest line is “Any industry,” at 681px / 120px), so no override is needed.
- **Portfolio copy rewritten (2026-10-12)** to mirror the software headline's shape — 3 words /
  3 words / one gold word:

  | | line 1 | line 2 | line 3 |
  |---|---|---|---|
  | before | Whatever the *industry,* | we own the software | it runs on. |
  | **after** | Any industry, | we own the | ***software.*** |
  | software | Then we build | what makes it | ***grow.*** |

  The gold accent moved from mid-line-1 to the **payoff line**, matching the software headline.
  Widths now descend in both (portfolio 681 / 593 / 389; software 601 / 595 / 198).
  `em:only-child` (not `nth-child(3)`) grants a real line box to a whole-line payoff.

  ⚠ **Copy note:** “Any industry,” drops the KB's established voice opener
  (*“Whatever the industry, we own the software it runs on.”*). Flag to the CD if that line is
  still considered signature.
- **Button text `#00202B`** (2026-10-12) — was the Figma's `#005978`. It is now the brand blue
  `#003F55` at 50% (50% darker), so it reads as deep navy on the gold. Applies to `--ink`, i.e.
  every `.pill--gold` (header CTA **and** hero CTA); the ghost “Careers” pill stays white.
  Contrast on gold improves from **4.95:1 → 10.6:1**. Flag if `#005978` was deliberate.

## Chrome: navigation + buttons (2026-10-12 · bar 2026-10-14)

- **Sticky blue bar (2026-10-14).** The header is now `position: fixed; top: 0` (was `absolute`
  inside the hero, so it scrolled away), with a **`--blue` `#003F55` background** — the same blue the
  hero uses — so it reads as a solid bar and matches the hero behind it. It's kept **outside `.hero`**
  (a direct child of `<body>`, `z-index: 60`) so the hero's `overflow: hidden` + `isolation: isolate`
  can't clip it and the `.after-hero` band (which has its own `z-index: 1`) can't paint over it. It
  stays pinned through the whole scroll: the pinned hero → the cube collapse → “What we do”.
  *(The hero copy stays centred in `100svh`, so with a 68px bar it sits ~34px below the visible
  area's centre — flagged, not yet compensated.)*
- **Navigation dropdown built** — the hamburger now opens a panel below the header (`.menu`,
  `position: fixed; top: var(--bar-h)`), so the chrome stays visible and the toggle becomes an **X**.
  `--bar-h` is measured from the real header, so the offset is right at every breakpoint
  (68px desktop / 64px mobile).
- **Contents = the locked L1**, taken from the homepage wireframe's `#siteOverlay` (Option B
  revised): **Vertical Software** (with all 11 verticals, two columns) · **Embedded Offerings**
  (Payments/Lending/Insurance/AI) · **Our Story** (Leadership) + **Careers** · **Contact** +
  **For Founders** (A home for your business / FAQ). For Founders sits **here**, not in the header
  strip, per the 2026-09-23 chrome decision. Links point at the real wireframe pages
  (`../../../02_Wireframes/active/pages/*`) — all verified 200.
- **Behaviour:** toggles `aria-expanded`, locks body scroll while open, focuses the first link,
  closes on **Escape**, on a link click, or on a click outside the panel (the scrim).
- **Button hover** — replaced the flat `brightness()` + 1px lift with a **fill that wipes up from
  the bottom and flips the colours**: gold pill → ink fill with gold text; ghost pill → gold fill
  with ink text. Both get a −2px lift and a gold glow. Disabled under `prefers-reduced-motion`.
- **Menu dividers** — hairline rules (`rgba(255,255,255,.14)`) separate the columns, with 32px of
  padding either side so each rule sits optically centred. They re-orient with the layout:
  **vertical** rules in the 4-column layout, vertical + a horizontal rule between rows at 2 columns,
  and **horizontal only** when the columns stack at ≤560px.
- **Panel colour is shared** — the bar is `--blue` `#003F55` by default and takes `--menu-bg`
  `#002C3C` while the menu is open (`.hero__bar:has(.menu-btn[aria-expanded="true"])`), which is the
  dropdown panel's colour. The header's bottom edge meets the panel's top edge with **0px seam**, so
  the two read as one continuous surface.

## The cube collapse (2026-10-14, internal)

After the software headline has **fully settled**, scrolling on collapses the whole hero into a
small rounded cube: the video shrinks to a centred square, the copy fades and drifts up, and the
blue stays full-bleed behind it. The video **keeps playing** inside the cube. The pin then releases
and the hero (blue + cube) scrolls away as “What we do” rises — the cube collapses in place, then
leaves with the hero.

- **Trigger.** Only *after* phase 1 (the headline handoff) has completed — the cube ramps from
  `p = 0.62 → 0.92` of the pin, so the second message is fully in (line 3 settles at `p ≈ 0.42`)
  well before the collapse starts.
- **Geometry.** `.hero__media` goes from `100%`/`100%` → `clamp(140px, 17vw, 210px)` square via a
  `--cube` `0 → 1` variable
  (`width/height: calc(100% - (100% - var(--cube-size)) * var(--cube))`), centred with
  `left/top: 50%` + `translate(-50%,-50%)`, plus `border-radius` `0 → 28px` and a drop shadow. The
  subtle scroll zoom fades out so the cube measures exactly `--cube-size`.
- **Copy fade.** `.hero__headlines` and `.hero__cta` fade to 0 (`opacity: 1 − --cube`) and drift
  up; the tint / gradient / scrim each multiply by `(1 − --cube)` so nothing tints the cube.
  `.hero.is-cubing` drops `pointer-events` on the inner content.
- **Pin.** `250vh` (was `200vh`) to buy the collapse travel; `total` travel at 1440×900 is 1350px.
- **Fallbacks.** Unchanged — no JS / reduced motion never set `--cube` (default `0`), so the hero
  stays full-bleed and the two headlines stack in document order.
- **Pin release (option 1, 2026-10-14).** Once `--cube ≈ 1`, `.hero` drops from `100svh` to
  `--cube-band` (cube size + 180–240px pad). `.is-cubing` = collapse in progress (height
  `min(100svh, 1059px)`); `.is-cubed` = settled. `.hero-stage.is-cubed` uses a negative
  `margin-bottom` so What we do shares the laptop frame with the cube instead of waiting
  behind a leftover viewport of `#003F55`. What we do `padding-top` is 100px (80px under 900px).

⚠ **This is still not the locked grow morph.** A video that collapses into a cube is a new
mechanic layered on the video-pin experiment — promoting it is an explicit **strategy** decision
(KB §23/§24), not a polish pass.

## Read this before judging it

1. **This is a strategy change, not a restyle.** The homepage opening is **locked** as the
   **Axis A (Portfolio) → grow morph → Axis B (Growth engine)** sequence (KB §23 + §24,
   `design.md` §3.1). This exploration uses a **video pin + headline crossfade** (portfolio
   line → software line), plus an internal **cube collapse** on exit (2026-10-14), not the locked
   grow morph. It still **sequences** two messages but
   is a **strategy change** if promoted — needs an explicit decision, not a polish pass.
2. **Palette is on-brand**, but note the blue is the *chrome* `#003F55`, not the KB §15
   Bio Blue `#00587C` — reconcile which is canonical.
3. **Type move.** Instrument Serif **italic** in gold (`#FEC50A`) as the accent on
   “*software.*” / “*grow.*”. New; confirm it's an approved direction.
4. **Photography/video.** KB §18 says **avoid stock**; homepage + careers copy call for
   **real imagery**. The clip should be Fullsteam's own — see the sourcing keywords note.

## Open flags

- **Color overlay: 80% → 20% across the scroll (the CD's target).** The `#003F55` tint over the video
  starts at **80%** on load (`Desktop - 1` — legible without a gradient) and thins toward the
  software-headline screen (`Desktop - 2`). The build **floors it at ~38%**
  (`calc((.8 − .42·--pTint) × (1 − --cube))`, smoothstepped) rather than a flat 20%, so white type
  holds on bright footage (2026-10-14). Flag if the CD needs the full 20%.
- **First screen on load = `Desktop - 1` (locked).** Nothing extra renders at `p = 0`. The header strip
  and the internal “video slot” chip I had added are **removed**.
- **Internal banner removed (2026-10-12, at the CD's request).** The red
  *“INTERNAL EXPLORATION — UNREVIEWED — NOT CLIENT-FACING”* bar is gone from the page.
  ⚠ This **deviates from sandbox rule 3** (`../README.md`), which asks every exploration page to carry
  the label. The hero now starts at `y = 0`, so the first screen is the design exactly. The folder is
  still gitignored — but with the on-page label gone, **don't screenshot or forward this page without
  re-adding it**, since nothing on screen marks it as internal.
- **Video is in.** `assets/hero-video.mp4` (7.3 MB) + `.webm` (3.2 MB) + `hero-poster.jpg`, copied from
  `03_Design/assets/reference/square/`. Chromium/Firefox take the webm; the mp4 is the fallback.
  Verified: plays from load (muted/loop/playsinline), 1440×1080, `object-fit: cover`.
- **Button case.** Figma style is `textCase: TITLE`; rendered sentence case to match the locked
  CTA copy.
- **Hero height.** Figma is a fixed 844px; the pinned build uses `100svh` (min 620px) so the
  hero stays full-bleed while stuck.
- **`Careers` second CTA** competes with the primary “Explore vertical solutions” action.

## What to test in this set

- Does the **video + scroll overlay** read as “premium, alive” — and does the hero still work
  when the clip is slow or absent (poster path)?
- Both headlines are now the same size (120px), so the handoff is a clean 1:1 swap — does the
  swap read as one message handing off to the next, or as two separate headlines?
- Does white type hold up at **1440 / 1024 / 390** across the whole `0 → 1` overlay range?
- Does the **cube collapse** read as the hero shrinking into a small card, or as the footage
  “zooming out”? Is the blue full-bleed behind it the right call, or should it hand off to the page?

## Changelog — 2026-10-14 (polish pass)

Internal polish of the scroll handoff and a11y. Still an exploration — not a strategy
promotion (video pin + headline crossfade ≠ the locked grow morph).

### Fixed
- **Empty mid-scroll window.** Retimed the line ramps so portfolio exit and software
  enter overlap; a headline stays majority-visible through the swap. Sequence remapped
  to finish by ~80% of the pin, with a settled hold to 100%.
- **CTA jump.** Portfolio shrink is now `transform: scale(...)` on the title (not
  `font-size`), so the CTA row no longer reflows (~26px jump removed). Headline box
  min-height stays fixed.
- **State-2 contrast.** Tint floors at ~38% (was 20%). Added a soft radial `.hero__scrim`
  that fades in with the software handoff.
- **End hold + release.** Pin is `250vh` (was `200vh`, `180vh` before that; +50vh for the cube
  phase). What we do section (Figma `11264:332`) follows the pin so the release can be judged.
- **Scroll cue.** “Scroll” + chevron at the bottom of state 1; fades out as the handoff
  begins (`--pCue`).
- **a11y.** Both headlines stay in the a11y tree (no `aria-hidden` toggle). Reduced-
  motion and no-JS stack both headlines in document order. Video pause/play control
  (WCAG 2.2.2); video pauses off-screen via IntersectionObserver and under
  `prefers-reduced-motion`.
- **Mobile header.** At ≤560px the header CTA shortens to “Explore” so it fits at 390px.
- **Perf.** Blur capped at `0.04em`. Video `preload="metadata"` (was `auto`).

### Still open (needs CD / assets)
- **Footage sync.** Montage still cuts on its own clock — “…grow.” can land on the
  googly-eye hydrant. Options to explore: one continuous shot, one clip per state with
  a scroll crossfade, or scrub `currentTime` from `--p`. Cut the hydrant googly-eye
  frame from the edit either way.
- **Careers secondary CTA** still competes with the primary (flagged earlier).
- **“Any industry,”** still drops the signature “Whatever the industry…” opener.

### Docs synced (2026-10-14)
Brought the surrounding docs back in line with the build (they still described the pre-polish
state): the exploration board card (`../index.html`) no longer says “gradient + 100→83px
headline”; the README structure lists the two real set folders (`01-dark-cinematic`,
`02-video-hero`); and above — the state table now shows both headlines at **120px** with the
current copy, the overlay row notes the `#003F55` tint (80 → ~38%), the “Type move” note cites
“*software.*” / “*grow.*”, the `KG §18` typo is fixed to **KB §18**, and the headline-scale test
question was rewritten for the 1:1 swap.

## Changelog — 2026-10-14 (cube collapse)

- **Hero collapses into a cube after the handoff.** New phase 2 in `render()`: `--cube` drives the
  media geometry, the copy fade, and the overlay fade-out, gated to `p = 0.62 → 0.92` so it only
  runs once the second message has fully settled. Pin `200vh → 250vh`. Full spec above
  (*The cube collapse*). Verified at **1440×900** (collapse → `210×210px`, centred, copy opacity 0)
  and **390px** (→ `140×140`); no console errors.
- **Still an exploration** — video pin + headline crossfade + cube collapse ≠ the locked grow morph.

## Changelog — 2026-10-14 (sticky blue bar)

- **Header pinned + transparent over the hero.** `.hero__bar` moved from `position: absolute`
  **inside** `.hero` to a `position: fixed` direct child of `<body>` (`z-index: 60`). Background is
  **transparent on load** and gains `.is-solid` (`background: var(--blue)`) only once
  `.hero-stage` has scrolled past the bar. Reason it had to leave `.hero`: the hero's
  `overflow: hidden` + `isolation: isolate` trapped it.
- **Menu unchanged** — still swaps the bar to `--menu-bg` while open (`:has(...)`), so the bar and
  panel stay seamless.

## Changelog — 2026-10-14 (What we do)

- Replaced the stub `.after-hero` band with Figma **`11264:332`** (*What does Fullsteam do?* /
  Acquire · Grow · Lead · **Founders**). `--blue` stage; cyan section title; gold Instrument
  Serif italic verbs at 120px; 100px stack gap / 30px verb→copy / 200px padding. Founders
  ends with **Talk to us**.

## Changelog — 2026-10-14 (cube pin → What we do, option 1)

After `--cube` hit 1 the sticky hero was still `100svh`, so a full extra viewport of `#003F55`
sat between the 210px cube and “What does Fullsteam do?”. Figma `11264:200` is a ~1059px hero
band, then What we do on the same blue.

- **`.is-cubing` / `.is-cubed`.** Collapse animation vs settled cube (no longer one class).
- **Settled height.** `.hero.is-cubed` → `--cube-band` (`--cube-size` + ~180–240px pad). During
  collapse only: `min(100svh, 1059px)`.
- **Pin.** `.hero-stage.is-cubed { margin-bottom: calc(var(--cube-band) - 100svh) }` pulls What
  we do up so the pin releases a cube-block. Handoff / video / `--cube` ramp unchanged until
  `pCube ≈ 1`.
- **What we do.** `padding-top` 200 → 100px (80px <900px) so the title sits under the cube.
- **Fallbacks.** Reduced-motion / no-JS still stacked, no cube.

## Changelog — 2026-10-14 (What we do — Figma restyle + Bending Spoons readout)

Figma **`11264:332` was restyled** (same node). Motion is no longer a one-slot swap.

- **Visual.** Title + support copy are **`#00BDFF`**. Support copy is **34px** (was 60px white).
  All four beats stay **stacked** as in Figma (Acquire, Grow, Lead, Founders + Talk to us).
- **Motion (Bending Spoons).** Words in the title, verbs, and copy are wrapped in `.wwd-w`.
  Scroll maps each word to a focus line ~42% down the viewport: words at/above it stay
  sharp; words below fade and blur out (the “Not to sell on…” readout). Same rAF `render()`
  as the hero. No pin, no overlay slot.
- **Fallbacks.** `prefers-reduced-motion` / no-JS: no per-word filter; the stacked Figma
  layout is fully readable.

## Changelog — 2026-10-15 (Square-style type counters)

White band, **no cards**. Three equal columns of black type: big metric + one-line
caption (Square retail-stats pattern). 70,000+ customers · $75 billion Pay volume
(not revenue) · 11 verticals. Count-up 1.2s cubic ease-out still on intersection.
Stacks at ≤768.

## Changelog — 2026-10-15 (Scale → verticals · four concepts)

Replaced the Square `#investors` band with a dark **scale → verticals** section
(`#0a0a0a`). Four switchable explorations (bars / dots / odometer / sentence)
shared stats, 11 verticals, and a filmstrip; compared via `?stats=` or an
INTERNAL chip. **Superseded same day** — only sentence remains (below).

## Changelog — 2026-10-15 (Scale → verticals · sentence only)

Kept **only the live-sentence** concept. Removed bars, dots, odometer, the
INTERNAL `?stats=` switcher chip, and all URL-param / `data-variant` switching.

- **sentence** — live sentence with inline count-up on the focus band (~42%
  viewport); vertical chips expand card previews near focus / on hover; hands
  off to the filmstrip.
- **Shared (kept)** — `.vstrip` filmstrip (all 11 → wireframe anchors);
  reduced-motion / no-JS → static fallback row + filmstrip (`is-flow`);
  placeholders marked; Pay volume ≠ revenue.

## Changelog — 2026-10-15 (stats + verticals redesign)

The section the CD called *"the exact same as before"* — it was, because both
halves were older scaffolding. Rebuilt as the **new design pass**, in this
exploration's own language. Two canvases inside `#investors`:

- **Verticals — white, Square's "audience moment".** Headline
  *Keep the businesses growing.* → five equal cards; the selected card **un-dims**
  (the other four sit behind a 50% scrim) and reveals name → rule → figure →
  descriptor → **Explore →**. Retail is featured by default. **Stacks below 1024px**
  — collapsed 78px rows, featured card opens to `min(58svh, 460px)`.
- **Stats — white, the live sentence.** See the entry below for the scrub.

Type: Instrument Sans for the verticals headline; **Instrument Serif italic** for
the sentence. The inline figures are static text in the markup.

**Removed:** the `.vstrip` filmstrip and the `.scale-fallback` / `.scale-sr`
reduced-motion and no-JS scaffolding. Numbers are written into the markup, so
**no-JS and `prefers-reduced-motion` both render the final state.**

**Open tension:** the KPI figures recur in the featured cards, because the
allowlist only carries five publishable numbers — a card cannot have its own.
Flagged for the CD: either accept the recurrence, or give the cards no figure
(Square's pattern loses its stat) — or supply per-vertical figures.

## Changelog — 2026-10-15 (the sentence comes back, scrubbed by scroll)

CD decision: the four-KPI grid is replaced by **the live sentence again**, set in
**Instrument Serif italic**, and **controlled by scrolling** — the reveal is a
scrub, not a timer, modelled on the CD's reference screenshot.

- **Reading order, not line order.** One global progress drives the 19 words
  handed out in order, so line 1 lights, then line 2, word by word — the sweep
  advances *across* each line rather than revealing a whole line at once.
- **Words ramp opacity `0.08 → 1` and blur `6px → 0`.** Unlit words stay legible
  as ghosts, so the sentence reads as present-but-unwritten.
- **Travel:** spread over `max(sentence height, 55vh)`, so the reveal lingers
  instead of snapping past.
- Per-frame writes are **quantised to 1/40** and skipped when unchanged, and carry
  **no CSS transition** (KB §23.6 rule 2).
- **Rects are read live every frame, deliberately not cached.** The pinned hero
  above collapses as you scroll and drags the sentence ~474px up the document, so
  a cached document offset drifts and the reveal never fires. Two rect reads a
  frame is the cheap price of correctness.
- Inline count-up on the three teal numbers, triggered at the same playhead.
- `prefers-reduced-motion` and no-JS: all 19 words render lit, no blur, numbers
  final — verified in both.

Verified: 0 console errors · no horizontal overflow 320→1920 · the ramp reads
`...................` → `########+..........` → `#################.` → all lit.

## Changelog — 2026-10-15 (chrome strip)

CD pass: remove the surrounding labels so the sentence and verticals headline
carry the section alone.

- Deleted `stats__kicker` (*For investors*), `stats__note` (publishability
  disclaimer), and `verts__beat` (*03 — Built for every industry*), plus unused CSS.
- `#statsBand` / `.scale` stay **white** with dark sentence text (`#0d1a20`) and
  teal count numbers. Kept `h2.verts__title` and the filmstrip.

## Changelog — 2026-10-15 (verticals → expanding accordion)

Replaced the equal-width **un-dim** "audience moment" cards with a Square-style
**expanding accordion** (width grow), on the same white canvas:

- Five revenue-ordered featured strips (Hospitality → ERP → Retail →
  Transportation → Wine). Collapsed = narrow strip + rotated centered label;
  open = wide panel with brand-tint plane, big title, shared placeholder figure
  (`70,000+` / `11` / `$75B` from the scale sentence), descriptor, **Learn more**.
- Hover (fine pointer) or click expands one strip and collapses the previous;
  first panel open by default. Arrow / Home / End keys move focus.
- Stacks below 1024px (horizontal label on collapsed rows).
- `prefers-reduced-motion`: no width transition; panel switch still works.
- All eleven verticals remain as links under the accordion.
- Deleted the dashed `.verts__note` annotation. No Square photos — navy tonal
  panels only. Cursor-following decoration still rejected (`inspiration.md`).

## Changelog — 2026-10-15 (verticals Unsplash + full-bleed; cube fade-out)

- **Accordion photos.** Featured panels use Unsplash cover backgrounds (hotlinked
  `images.unsplash.com`, crop `w=1600&h=1000&q=70`) + dark scrim for white labels.
  Credits in an HTML comment above `#vertStage`. Hospitality / ERP / Retail /
  Transportation / Wine. Navy `--panel` remains the no-image fallback.
- **Full-bleed stage.** `.verts__stage` is `width: 100%`, no max-width / side
  padding / gap; title stays in the readable centered measure. Panels:
  `border-radius: 0` (sharp, Square-like).
- **Cube disappears.** After the shrink ramp, `.hero__media` opacity falls to 0
  in the last ~28% of `--cube` (`0.72 → 1`); `.is-cubed` forces
  `opacity: 0; visibility: hidden` so no leftover silhouette. Pause control
  hides with cubing/cubed. Pin / handoff / `--cube` size math unchanged.

## Changelog — 2026-10-15 (Pages hero video: royalty-free stock)

Pages had no video because Square's `hero-video.*` must stay gitignored
(`inspiration.md` §2.2). Shipped a Mixkit free clip instead:

- **`assets/hero-stock.mp4`** (Mixkit **15875** — professional chefs in a restaurant
  kitchen, normal speed). Earlier IDs 4240/4242 were mis-mapped Mixkit slugs and
  shipped **highway traffic** — replaced. Square files stay ignored.
- `<video>` sources point at `hero-stock.mp4` only (no 404 spam on deploy).
- Local Square reference files remain on disk for study; they are not autoplayed.
- **Tint lowered** (load ~55% → ~30%, was 80%→38%) so the stock clip isn't
  buried under brand blue on Pages (pause control was on, footage looked like
  the fallback plate).

## Changelog — 2026-10-15 (hero fallback: designed for the no-asset deploy)

The deployed hero read as a **flat brand-blue plate**, because the only background
was the video plus a `poster` that does not exist on Pages. Both are gitignored
(the Square clip is copyrighted and must never reach a public repo), so the
deployed page had nothing to show. Fixed without shipping third-party media.

- **`.hero__fallback` — a brand-owned CSS visual.** Layered dark brand blues
  (two corner blooms + a floor bloom + a diagonal base) over a faint 84px hairline
  grid, with a 48s `background-position` drift so it isn't a dead plate. Drift is
  disabled under `prefers-reduced-motion`.
- **The video now only takes over if it really plays.** `.hero` gains
  `has-media` on the video's `playing` event; only then does the fallback fade.
  So local runs still get the clip, and the deploy gets the fallback.
- **Geometry is shared, not duplicated.** `.hero__media, .hero__fallback` carry
  the same cube rules, so the fallback collapses into the cube identically
  (verified: 1440x900 -> scroll-zoom -> 210x210 at `--cube` 1) and
  `.is-cubed` hides both.
- **The tint lifts when there is no footage.** `--media-tint` is `1` normally and
  `.42` on `.hero:not(.has-media)`, so the overlay stops flattening the fallback
  into the plate it replaced. Unchanged when media is present.
- **404 spam stopped.** The `poster` attribute is gone (it re-fetched on every
  paint - ~20 failed requests per load); the CSS `url()` to the same file is gone
  too. A no-asset deploy now makes exactly **2** requests (one per `<source>`)
  instead of 20+.
- **The pause control hides** when there is no video, rather than offering a
  control that cannot do anything.

Verified with the video requests stubbed to 404 (the Pages condition): 0 JS
errors, no horizontal overflow 320/390/768/1024/1440/1920, reduced-motion
disables the drift and renders the sentence fully lit, unchanged with the video
present.

## Changelog — 2026-10-15 (AI band · Claude /overview layout)

Figma **`11294:2`** content (H2 + three use cases + **See AI at Fullsteam**), placed
after `#investors` / verticals. Layout reference: **[Claude product overview](https://claude.com/product/overview)** — mono **Put AI to work** label, horizontal use-case pills, **one product panel at a time** (UI schematic frame + title + short descriptor). Not the Figma three-grey-card grid.

- **Canvas:** `#f2f7f9` tint + top hairline so the band separates from white verticals.
- **Type:** Instrument Sans headline; gold **Instrument Serif italic** on *knows the business.*; Fragment Mono kicker; locked H3 strings from Figma.
- **Motion:** panel swap only (short fade-in); no scroll scrub. `prefers-reduced-motion` drops tab transition animation. No-JS stacks all three panels.
- **a11y:** `role="tablist"` / `tabpanel`; arrow keys + Home/End on tabs.

## Changelog — 2026-10-15 (AI panels · Unsplash, square corners)

- Replaced schematic UI frames with **Unsplash cover** + light scrim (same `--photo` pattern as verticals).
- **`border-radius: 0`** on panel images and tab buttons (Square-like sharp edges).
- **Fix:** Support Unsplash id `1556767544…` returned **404** (flat `--blue` frame). Swapped to `1573496359142…`; panels use `<img class="ai__photo">` + scrim `::after` instead of CSS `var(--photo)` on an empty span.

## Changelog — 2026-10-15 (AI tabs · Claude cells, Fullsteam chrome)

Tabs match **Claude /overview** role row (bold name + muted hint, shared baseline rule, active **3px `--blue` underline**) — not filled pills. **Instrument Sans**, square corners, hairline dividers; horizontal scroll on narrow viewports.

## Changelog — 2026-10-15 (AI · vertical accordion)

Horizontal tabs → **vertical accordion** (`.ai-acc`): name + hint triggers, **inset `--blue` rule** + chevron, image + copy in body. One open at a time; **Arrow Up/Down / Home / End** open target + focus trigger; click always selects. No-JS: all bodies expanded. *(Supersedes tab `tablist`.)*

## Changelog — 2026-10-15 (AI · two-column swap + centered intro)

*(Superseded below — was accordion left / centered intro right via `order`.)*

## Changelog — 2026-10-15 (AI · intro left, accordion right)

Desktop **≥900px:** natural DOM order — intro (`.ai__head`) **left** (`5fr`), accordion (`.ai__main`) **right** (`7fr`); no grid `order`. Intro: `text-align: left`, no auto horizontal margins; `max-width: 26em`. Row `align-items: center`. Mobile unchanged: single column, intro on top (centered), accordion below.
## Changelog — 2026-10-15 (sentence: no counter)

CD decision — **the count-up is removed from the sentence.** Two things were
animating at once in the same 19 words; only the scrub should.

- Deleted `paintNum` / `countUp` / `counts` / `counted`, the `data-count`,
  `data-prefix` and `data-suffix` attributes, and the now-dead `fmt` / `easeOut`
  helpers. Nothing rewrites the numbers any more.
- The three figures — **70,000+ · 11 · $75B** — are now static text read straight
  from the markup, so they read final from first paint instead of starting at `0`.
- The scroll **scrub is unchanged** and is now the only motion in the band: one
  rAF scroll handler that lights the 19 words in reading order.

Verified: identical values at scroll 0 / 1200 / 2000 / 2800 / 3080 / 3400 · scrub
ramp still reads `###########+.......` at the playhead · 0 JS errors.

## Changelog — 2026-10-15 (AI · drop “Put AI to work” label)

Removed the mono **Put AI to work** kicker above the accordion (`.ai__work-label` / `#aiAccLabel`) and its CSS. `#aiAcc` now names the region via `aria-labelledby="aiTitle"` (section H2) instead of the deleted label.

## Changelog — 2026-10-15 (AI · CTA in intro column)

Moved **See AI at Fullsteam** (`.ai__foot`) from `.ai__main` to `.ai__head` after `.ai__lede` (left desktop / centered mobile; 28px below lede).

## Changelog — 2026-10-15 (Careers / Great place to work band)

**`#careers`** after `#ai`, before the menu block — content-slots **§2 row 06** (intent-level copy + placeholders).

- **Canvas:** warm brand-green tint `#eef6e0` (`--green` `#84BD00` in `:root`); top hairline; square-corner cards (matches AI accordion).
- **Layout:** 3-col desktop — flanking **layered `--blue` proof stacks** (Fragment Mono labels; no counterfeit GPTW / Glassdoor claims) + center **white card** (“What our team says”, decorative gold star row, three stacked quote cards with fade). Mobile: headline → center → flanks (`order`).
- **Type:** H2 + green **Instrument Serif italic** on *work.*; 8th-grade lede.
- **CTA:** **See Careers** → `careers.html` via new **`.pill--blue`** (dark `--blue`, white text).
- **a11y:** `aria-labelledby` on section + card; decorative stacks / rear quotes `aria-hidden`; only top quote in tab order.
- **Static:** no JS.

## Changelog — 2026-10-15 (Careers band · dark blue + gold)

Restyled **`#careers`** from warm green tint `#eef6e0` to **`--blue` (`#003F55`)** canvas with **gold-forward type** (matches hero / What we do accent vocabulary).

- **Canvas:** `var(--blue)` fill; top hairline `rgba(254, 197, 10, .22)` (replaces green hairline).
- **Type:** H2 **`--gold`**; **Instrument Serif italic** on *work.* in **`--white`**; lede **`rgba(254, 197, 10, .82)`**. Center white card unchanged (dark quote copy inside).
- **Proof stacks:** semi-transparent panels + **`--gold`** border (no blue-on-blue stacks); mono labels **`--cyan`**, values **`--gold`**.
- **CTA:** **See Careers** → **`.pill--gold`** (`.pill--blue` was illegible on blue).

## Changelog — 2026-10-15 (Careers · testimonial grid)

Replaced GPTW-style **proof stacks + center white quote card** with a single **3-column testimonial grid** on the dark **`--blue`** band.

- **Removed:** `.careers-stack`, `.careers__flank`, `.careers__card`, `.careers-quotes` (HTML + CSS).
- **Added:** `.careers-testimonial` — circular Unsplash headshot (`400×400` crop, same hotlink pattern as `#ai` `.ai__photo`), headline with **Instrument Serif italic `--gold`** + **white Instrument Sans**, body copy in white sans, Fragment Mono `[placeholder]` attribution.
- **Layout:** `repeat(3, 1fr)` from **900px**; **≤899px** single column, centered text + avatars.
- **Unchanged:** section H2/lede gold styling, **See Careers** `.pill--gold` CTA, static HTML/CSS only.

## Changelog — 2026-10-15 (Careers · middle testimonial avatar)

- Middle `.careers-testimonial__avatar` Unsplash URL **`photo-1472099645785`** returned **404**; swapped to **`photo-1507003211169-0a1dd7228f2d`** (same `?auto=format&fit=crop&w=400&h=400&q=70`). First and third avatars verified **200**, unchanged.

## Changelog — 2026-10-15 (Careers · lede white)

- `.careers__lede` color gold tint → **`rgba(255, 255, 255, .88)`** (matches `.careers-testimonial__text`).

## Changelog — 2026-10-15 (Careers · title color flip)

- `.careers__title` **white** sans; `.careers__title em` **gold** serif italic (*work.*).

## Changelog — 2026-10-15 (Careers · darker band)

- **`#careers` canvas:** `var(--blue)` → **`color-mix(in srgb, var(--blue) 80%, black)`** (computed **`#003244`**, ~20% darker than `#003F55`); `:root --blue` unchanged. Gold top hairline **`rgba(254, 197, 10, .22)`** and white/gold type unchanged.

## Changelog — 2026-10-15 (Careers · head left-align)

- **`.careers__head`:** dropped `max-width: 36em`, `margin: 0 auto`, and `text-align: center` — block is flush left with **`.careers__grid`** inside **`.careers__inner`**.
- **`.careers__lede`:** readable width via **`max-width: 36em`** on the lede only (head spans full inner width).
- **≤899px:** removed centered testimonials (avatar auto margins + `text-align: center`) so head and grid share the same left edge on mobile.

## Changelog — 2026-10-15 (Careers · grid column dividers)

- **≥900px `.careers__grid`:** vertical hairlines between the three `.careers-testimonial` columns — copied from **`.menu__col`** (`.menu__inner` `gap: 0`; `padding: 0 32px` with first/last flush; adjacent sibling `border-left: 1px solid rgba(255,255,255,.14)`). Grid uses `align-items: stretch` so rules span the full row height.
- **≤899px:** unchanged single-column stack (`gap` + no vertical rules).

## Changelog — 2026-10-15 (Careers · CTA in head)

Moved **See Careers** (`.careers__cta` / `.pill--gold`) from below the testimonial grid into **`.careers__head`** after `.careers__lede` — same pattern as AI intro CTA. Left-aligned; `margin: 28px 0 0` (was centered `48px` top after grid). Link unchanged.

## Changelog — 2026-10-15 (Careers · head row / CTA baseline)

- **`.careers__head-row`** wraps `.careers__lede` + `.careers__cta` (h2 stays above).
- **≥900px:** flex row, `align-items: baseline`, `justify-content: space-between`, lede `max-width: 36em` left, **See Careers** right (`margin-left: auto`, `text-align: right`).
- **≤899px:** flex wrap; lede then CTA with `gap: 24px`, both left-aligned.
- Lede top spacing moves to **`margin-top: 18px`** on the row (lede `margin` reset).

## Changelog — 2026-10-15 (Footer · menu chrome)

- **`#siteFooter.site-footer`** after `#close` — duplicates the open **Menu** overlay IA (four columns, verticals split, dividers, type). Reuses **`.menu__inner` / `.menu__col` / `.menu__list`** styles; **`--menu-bg`** fill + top hairline (no dropdown shadow).
- **`.site-footer__legal`:** `© 2026 All Rights Reserved | Fullsteam` + **Follow on LinkedIn** (blue **in** mark, company page URL).

## Changelog — 2026-10-15 (Close band · Figma 11304:33)

- **`#close`** after `#careers` — H2 “Ready to see where your business can go next?”, gold **Explore our vertical solutions**, **For Founders** text link (content-slots §2 row 07).
- **Canvas:** `--close-canvas` = `color-mix(in srgb, var(--careers-canvas) 70%, black)` (~**30% darker** than careers / LinkedIn `--careers-canvas`). Shared tokens in `:root`.

## Changelog — 2026-10-15 (Careers · LinkedIn self-contained)

- **`.careers__posts`** (mock horizontal cards + scroller) moved **inside** **`.careers__linkedin`** so company header, Follow CTA, and feed share one bordered panel.
- **`.careers__linkedin-top`:** company id + body | Follow pill (860px+ two-column row).
- Posts band: top hairline, padding; **`.li-scroller`** negative horizontal margin so cards scroll edge-to-edge within the panel padding.
