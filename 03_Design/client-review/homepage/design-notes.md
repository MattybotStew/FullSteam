# Homepage — official high-fidelity build

> **Status:** OFFICIAL · client-facing. This is the homepage the project is working from.
> Promoted out of `03_Design/explorations/homev4/` on **2026-10-25**.
> Layout register studied in [`inspiration.md`](../../../inspiration.md) §2.1; content
> order from KB §24 and `wireframes.md` §2, with the deviations listed below.

```
http://localhost:8000/03_Design/client-review/homepage/index.html
```

## What this is

The Fullsteam homepage in a light-canvas, cinematic register: pinned Axis A opening,
vertical filmstrip, proof band, verticals accordion, AI band, careers band, oversized
close — built on **official brand tokens** (KB §15) and **Instrument Sans + Fragment Mono**
(KB §27.2), with Instrument Serif italic reserved for the payoff words.

| | Exploration (homev2) | This build |
|---|---|---|
| Hero | Axis A → grow morph → Axis B (KB §23) | **Axis A stays pinned**; **Axis B** image **scrolls up over it** (reveal + copy fade) |
| Canvas | Blue hero → blue §02 | **Dark Axis A hero**, then **white / off-white** below |
| §02 | Sticky rail / parallax panels | **Replaced by the proof band** — the “What we do” section is not on this page |
| Motion signature | Video + scroll-over | **Pinned identity filmstrip** + floating UI chips |

## Divergences from the wireframe record

The wireframe canonical order (`wireframes.md` §2) has **What we do** between the opening
and the stats. This build drops it and lets the proof band answer the question directly.
It also uses its own headline copy rather than the locked Axis A / Axis B lines:

- Axis A: “Any industry, we own the software.” (wireframe: “Whatever the industry, we own
  the software it runs on.”)
- Axis B: “Then we build what makes it grow.” (wireframe: “Software first. Then we grow it.”)

Both are **decisions still to ratify** — the two-state model and A→B order are unchanged,
but per KB §23.6 rule 1 the headlines are the locked content of their states.

## Take / ignore (`inspiration.md` §2.1)

**Take:** audience kicker; proof under hero; pinned mosaic cycling allowlisted KPIs; bento
for “what we add”; genericized quote; oversized close.

**Ignore:** Book a Demo; “platform” language; six-up SaaS grid as the story; the reference’s
teal/yellow; news filmstrip; adoption framing.

**CTA:** Explore our vertical solutions — header, both headline states, proof band, and close.
Contact and Acquisitions live in the footer.

## Tokens (as built)

| Token | Value | Role |
|-------|-------|------|
| `--brand` | `#00587C` | Bio Blue — links, kicker accent |
| `--brand-sky` | `color-mix(--brand 10%, #00efff)` | Kicker aqua on the dark opening |
| `--gold` | `#FFC600` | Primary pill |
| `--green` | `#84BD00` | AI band + closing accent |
| `--hero-dark` | `color-mix(--brand 72%, #001018)` | Opening ground / header bar |
| `--bg` | `#ffffff` | Canvas |
| `--surface` | `#f4f7f9` | Cards / secondary zones |
| `--ink` | `#0d1a20` | Headlines |
| `--mut` | `#5c6b73` | Body secondary |

Type: **Instrument Sans** + **Fragment Mono** (same as the Figma promotion) + **Instrument
Serif italic** on the payoff words — the serif is still **unsanctioned** (KB §27.4).

## Accessibility (spot check)

- Skip link, focus-visible rings, semantic landmarks, dialog menu with Escape to close.
- Pinned filmstrip: per-frame opacity writes in JS (no CSS transition on scroll-driven
  values); with `prefers-reduced-motion`, pin height collapses and all three stats stack
  in-flow.
- Vertical cards use `aria-pressed`; pin stats use `aria-hidden` when off-screen.
- Placeholder figures marked `[placeholder]` where OI-5 applies.
- **Axe:** not run in CI for this build — before handoff, run axe on `index.html` (normal +
  reduced-motion emulation) and log results here.
- The previous wireframe build had a WCAG 2.2 AA pass with four blockers fixed; this build
  still needs its own audit.

## Opening entrance (2026-10-24)

A one-pass entrance on the first screen, at the CD's direction. No layout, copy, or
motion-model change — the pinned Axis A, the filmstrip marquee, and the Axis B scroll-over
are untouched.

| | |
|---|---|
| **Headline** | A **masked rise**, line by line: each line travels `112%` out of its own mask and resolves out of a depth-of-field blur, with the opacity landing at 30–35% of the move — so the words *arrive, then settle* instead of tracking their own fade. Line 1 `100→1280`, line 2 `360→1540`, line 3 `620→2120` — a **260ms stagger**; the gap between lines is what carries the drama, not the length of any one line. Easing `cubic-bezier(.16,1,.3,1)` (expo-out). |
| **Payoff** | The serif *software.* is the only line that scales (`0.93 → 1`) and the only one with a 13px starting blur. It is the longest move and the last thing to resolve, so it closes the frame rather than merely following the other two. |
| **Filmstrip** | Waits for the headline arc, then loads slowly on purpose: the band lifts in at `1350ms` (`18px` + 4px blur) and the frames develop over **900ms each** on a **90ms stagger** — six steps, expo-out, via `:nth-child(6n+k)` so the duplicated loop copy keeps the same rhythm. The strip is still arriving after the headline has settled, so it reads as the **second movement** rather than a second entrance. Last frame lands ≈ `2700ms`. |
| **Trigger** | After `document.fonts.ready`, not `load` — the film pulls a dozen remote frames and `load` would land the entrance seconds late. Skipped when the page opens part-way down (`scrollY > 10`). |
| **Reduced motion** | Nothing runs: the CSS is scoped to `html.has-js:not(.reduce-motion)`, and this page already puts `reduce-motion` on `<html>`. |
| **Cleanup** | Both classes are removed on `animationend` (3.4s fallback) so no held animation can out-rank the scroll-driven inline writes that follow — `--hero-a-fade` on the copy and the marquee's `translate3d` on the track. |

Deliberate choices:

- **The mask needs an inner span.** A `.line` cannot both carry the clip and
  move, so each line wraps its text in `.ln`; `.ln` animates, `.line` clips. The
  mask is scoped to `.hero--axis-a` — the Axis B headline reuses `.line` for a
  different scroll-driven reveal and must not be clipped.
- **The mask is padded, not tight.** `.line` gets `0.18em` block padding with a
  matching negative margin (`.26em` on the payoff line, whose serif sits at
  `line-height: 0`), so the mask never cuts an ascender, the comma, or the
  italic's descender — checked at rest at 1440 and 390.
- **Blur is budgeted per breakpoint** through `--ln-blur` (9px, 13px on the
  payoff; 5px / 7px under 760px) — it is the expensive part of the animation,
  and 13px on a 50px phone headline is mush anyway.
- **The thumbs animate opacity only.** Their track transform belongs to the
  marquee loop — any CSS transform on the frames would be overwritten every
  frame.
- **The marquee is not paused for the entrance.** At ~27px/s it barely moves
  across the ~1.1s the entrance runs, and having the frames already sliding
  reads as the strip developing in motion rather than presenting.

## Axis A ground — blue → green (2026-10-24)

The opening's field is now a **blue → green diagonal**: the brand's own dark at
the top (the exact `--hero-dark` the solid header bar uses, so there is no seam
under the bar — verified identical computed colour), brand blue through the
middle, and a deep green at the bottom right where the filmstrip sits.

```
linear-gradient(158deg,
  var(--hero-dark)                             0%,
  color-mix(in srgb, var(--brand) 92%, #001018) 40%,
  color-mix(in srgb, var(--green) 36%, #003a33) 100%)
```
plus the original `50% -20%` brand glow on top, which keeps the depth the flat
linear had.

Notes / open:

- **In palette, but a bigger call than a shade change.** Green is a sanctioned
  brand colour (KB §15) yet the art direction gives it the *rarest* role —
  confirmation, one moment at a time, never a field (art direction §2). Using it
  as half the opening's ground needs a client read, not just a CD one.
- **The green is pulled, not painted.** It is mixed 36% into a dark teal rather
  than used at full strength: the lime at full value is ~1.9:1 against white and
  would wreck the headline and the white film labels.
- **The sky headline is clear of it.** The type sits in the blue-teal band; the
  green only arrives below the headline, behind the filmstrip.

## Proof cards — taller frames, deeper parallax (2026-10-25)

The three cards under “70,000+ customers rely on our software.” were a shallow landscape
strip (378px at 1440×900) with a single shared nudge (±90px). They are now **portrait
frames** — `clamp(480px, 66vh, 700px)` on desktop (594px at 900px tall) and **34vh** under
900px — a **landscape** frame (287px on a 390×844 phone, 1.19:1) that keeps the row reading
as a strip rather than a column of portraits — and the movement is **two layers**:

- **The card** travels on its own multiplier (`[0.84, 1.26, 0.64]`), so the three
  separate vertically instead of sliding as one block. Range is clamped to ±200px.
- **The photo inside** is 36% oversized (`inset: -18% 0`) and counter-moves at 32% of the
  card's travel, which is the layer that reads as depth rather than a nudge. Hover scale
  moved from `transform` to the independent `scale` property so the per-frame write cannot
  collide with it.

**Mobile is photo-only.** Under 900px the cards stack, so the per-card multipliers made them
overlap each other (measured ~112px overlap between cards 2 and 3) and the proof list. There
the card stays in flow and only the photo travels (clamped ±40px). Same effect, no collision.

Both writes are per-frame `transform` (no CSS transition on the moving values), cleared
under `prefers-reduced-motion`, where the cards sit flat at all three. The extra height is
what the parallax needs: without it the photo runs out of image before it can travel.

**Still placeholder art.** The three photos (kitchen, wine, corridor) are generic Unsplash
frames; they prove the motion, not the Acquire → Grow → Lead story. Real art direction
should swap them before this reads as narrative.

## Image frames — one border language (2026-10-25)

Every photograph on the page used to carry its own edge: proof cards **24px** with a white
inner hairline, the careers figure **20px** with no hairline at all, filmstrip thumbs **10px**
with a *real* 1px border, LinkedIn art **8px**, and the verticals stage square. Same page,
five edges. This pass gives them one system:

| Token | Value | Applies to |
|---|---|---|
| `--frame-r` | `24px` | large figures — `.kpi__card`, `.careers__media` |
| `--frame-r-sm` | `12px` | small tiles — `.vert-film__thumb`, `.vert-grow`, `.li-card__art`, `.vpanel`, `.verts__all-box` |
| `--frame-hair-dark` | `rgba(255,255,255,.16)` | frames sitting on a dark band |
| `--frame-hair-light` | `rgba(13,26,32,.12)` | frames sitting on a light band |

**The rule:** one radius scale by size class, **one 1px hairline on every frame**, and the
photographic grade on every photo surface. The two radii are deliberately unequal — a 24px arc
on a 320×180 marquee tile with 14px gaps would collide with its neighbour, and a 12px arc on a
594px-tall proof card reads as unrounded. `.li-card__art` takes the small radius but no
hairline: it sits inside `.li-card`, which already draws the edge.

**The verticals stage joined the language (second pass, same day).** It was first left square
as a "plane", but the stage is not edge-to-edge — it sits in the same 1240px measure as the
proof cards and the careers figure, so square panels read as the odd one out. It now carries
`--frame-r-sm` and the dark hairline too, on `.vpanel` and on the sixth cell
(`.verts__all-box`, radius only — it is a control block, not a photograph).

Two consequences had to be handled together, because a radius only reads correctly when the
seam is wider than it:

- **Seams 5px → 14px**, matching the opening filmstrip's gap. At 5px a 12px arc pinched into an
  hourglass; at 14px each seam is a clean sliver.
- **`--strip` made fluid**, `clamp(110px, 9.5vw, 140px)`. Six cells and five seams have to fit
  the stage at 1024 as well as 1920, and a hard 140px strip squeezed the open panel to a sliver
  at the narrow end (99px before this pass, 54px with the wider seams). Measured open-panel
  width after the fix: **204px at 1024**, 280 at 1100, 360 at 1200, 402 at 1280, 486 at 1440.

**Still open at the narrow desktop end:** at 1024 the open panel is 204px wide, so a
single-word title (`Transportation`, ~248px at the vw-scaled clamp) is clipped by
`overflow: hidden`. This is **pre-existing** — the panel was 99px there before this pass, so
the squeeze is now less than half of what it was — but 204px is still not enough for that word
at a display size. The fix is structural, not a font tweak: either raise the accordion's
stacking breakpoint from 1023px to ~1150px (the stacked layout already exists below 1024), or
size `.vpanel__h` against the panel with `container-type: inline-size` + `cqw`. Do not paper
over it by shrinking the type — the word still will not fit.

**`#axisBFrame` stays square**: it is the one true plane on the page — full-bleed, 100svh,
touched on all four sides by the viewport edge.

**Fixed in passing:** `.vert-grow` — the layer that *is* the filmstrip thumb during the grow
morph — had `border-radius: 0` against the thumb's 10px, so the sourced frame snapped square
at the hand-off. It now carries the same `--frame-r-sm` / `--frame-hair-dark`, and the script
reads the token (`frameRSm`) instead of hard-coding `10` when it interpolates
`--frame-r-sm → 0` across the morph: the layer starts *as the thumb* and ends *as the
full-bleed plane*, so its radius still resolves to 0 by full size. Measured at 1440×900:
`9.28px` at 574×343, `5.28px` at 947×583, `0px` at 1440×900 — the thumb is 12px throughout.

**Grade extended:** the "one photographic grade across every band" rule listed three
surfaces and missed two. `.vert-film__img` and `.li-card__art--photo` are now graded as well,
so the opening filmstrip and the LinkedIn strip match the proof and careers photos.

Verified at 320, 390, 560, 768, 1024, 1100, 1200, 1280, 1440 and 1920: `border-radius` and the
hairline resolve on every frame class, no document overflow at any width, and the rounded
corners actually clip — the proof card and careers figure show the band through their corners,
and on the stage a hit-test 1px inside the bottom corners returns the stage while 8px in
returns the panel, so the arc is real and not just a declared value.

## Axis A ground — the living field (2026-10-26)

The opening's blue → green ground now **moves**. A Stripe-register aurora: three luminous
masses — aqua, gold, lime — orbit the frame on independent non-harmonic periods, so the
composition never repeats a frame. The static gradient stays underneath; this is added light,
not a new palette.

| | |
|---|---|
| **Layers** | Base `linear-gradient(158deg)` (unchanged, §"Axis A ground" above) + `.hero__blob--blue` (aqua, left) + `.hero__blob--gold` (gold, right) + `.hero__blob--green` (lime, bottom-right) + `.hero__blob--ink` (**static**, painted last) |
| **Colour** | Blue = `--brand-sky` 64% in `--brand`; gold = `--gold` 92% in `#8f5200`; green = `--green` 58% in `#003a33` — all brand tokens. Every gradient fades to `transparent 100%` through a mid stop (see *rims*) |
| **Motion** | `transform` + `opacity` only, `28s` / `36s` / `32s`, `cubic-bezier(.45,.05,.55,.95)`, each running base → out → back through a third stop so the path is an orbit, not a metronome. Travel 26–34% of the mass + a small scale breath |
| **Size** | `84vmax` per mass (`92vmax` for the static guard) |
| **Not animated** | The **ink mass**, deliberately — it is the contrast guard and a constant floor is worth more than a fourth moving layer |

**The visualiser is in the repo.** `03_Design/explorations/hero-motion/` (gitignored) holds 24 real
renders 1.5 s apart, a contact sheet, an amplified difference map, and an `index.html` that plays
the sequence at 12× with a scrubber. Run the static server and open
`http://localhost:8123/03_Design/explorations/hero-motion/index.html`. This is the only way this
work was actually *looked at* — the pixel measurements below could not see the rims or the band.

### What three failed passes taught (each caught differently)

1. **First pass — static.** Two masses, `92vmax`, 44s/58s, 13% travel, no gold. Measured mean |Δ|
   **5.2/255 across a half cycle**; the client called it static, correctly. The sampling was too
   coarse to see the real problem: the travel was simply too small a fraction of the mass.
2. **Second pass — olive, still half-dead.** Shorter periods, plus a gold mass built as `--gold`
   40% in `#2e2600`: source ≈ `130,102,0`, a dark mustard that renders olive, with the right
   flank still swinging only **8%**. *A tint is not a colour.*
3. **Third pass — right numbers, wrong picture.** Contrast and swing measured well, but the
   contact sheet showed **three floating discs with visible rims**, a **horizontal band** where the
   mask ramp ended (~y 350), and gold that went **ochre** wherever the lime mass crossed it.

### The two corrections that needed eyes, not numbers

**Rims.** Each gradient ended at a hard stop (`transparent 78–82%`), which leaves a readable edge —
the slope breaks and the eye finds it. They now run to `transparent 100%` through a mid stop, so
there is no edge to find. **This costs nothing in motion:** travel is a percentage of the mass's
own size, so growing the mass scales the distance and the falloff together
(`travel/radius` is invariant). Earlier notes in this file claimed shrinking the mass made motion
more legible — **that was wrong**; what actually moved the right flank from 8% to 81% was a larger
travel percentage, a deeper opacity swing, and a genuinely saturated gold.

**Gold that is yellow, not ochre — it's arithmetic.** The ground beneath is G ≈ 90. For a result
with `R ≈ G` (i.e. yellow), a source at alpha *a* needs
`a·(R−G)_src = (1−a)·90`. Plain `--gold` has `R−G = 57`, so at `a = 0.58` the left side is 33 and
the right is 38 — **it can never read yellow, at any brightness.** The core is therefore mixed
slightly orange (`#8f5200`, `R−G ≈ 68`) at `a = 0.62`, and the plateau is widened to 32% so a real
yellow *area* survives the base's green, not just a highlight point.

### The guard, the mask, the band

**The ink mass is the contrast guard, and it is why the amplitudes can be this big.** Painted
**last**, over the moving masses, wrapping the headline box with margin: a bright mass can walk as
far under the type as it likes and the type still lands on ink. It is static, so the floor is a
constant. Density is the lever — `0.86` desktop, `0.93` at ≤ 700px, where every mass is sized by
`vmax` and ends up *wider than the frame* (84vmax = 709px at 390), so the type always sits on a
blend rather than a flank.

**The header seam is protected by a mask, not by luck.** The bar is painted in the hero's own
`--hero-dark`, and `.hero__field` carries a `mask-image` that holds the bar's full height
(`.bar-h + 8px`) at exactly zero field contribution. The ramp below it is **eased over 380px with
five stops** — a linear two-stop ramp leaves a visible horizon where its slope ends, which is
exactly what the contact sheet showed. Verified by row-averaging: **y ≤ 92 is bit-identical** to
the field-off build (`0,68,96` at the bar, `0,77,108` just below).

### Measured

**Contrast across the whole cycle** — twelve phases, headline box, 25th-percentile luminance as
background. The headline is display-size, so AA large (3:1) is the real bar; 4.5:1 is the
self-imposed floor. Figures below are **with grain on**:

| | desktop 1440×900 | mobile 390×844 |
|---|---|---|
| sky headline | `5.58 – 5.92 : 1` | `5.04 – 6.05 : 1` |
| gold payoff | `5.30 – 5.63 : 1` | `4.79 – 5.74 : 1` |

**Motion, in real time** (two untouched frames 2.5 s apart): mean |Δ| **6.60/255** over the field,
right flank `9.27` with **60% of pixels** changing ≥ 8 levels, left flank `4.96`. Across the cycle
the left flank swings **48%**, the right **73%**.

**Reduced motion / off-screen.** Nothing runs under `html.reduce-motion` or the media query: all
four blobs sit at `transform: none` with the class opacity, i.e. each animation's 0% frame —
verified frozen across 1.8 s. The script adds `opening-out` from an `IntersectionObserver` on
`#openingStage`, pausing all three animations once the opening has left the viewport.

**No layout change.** `scrollHeight` identical to the build before this work at 1440 (`7864`) and
390 (`9636`); no horizontal overflow; no console errors. The field is `position: absolute` inside a
`contain: paint` wrapper and never enters flow.

### Grain (2026-10-26)

A gradient this smooth reads as CSS; grain is what makes it read as film. `.hero__grain` is a
160px `feTurbulence` tile drawn as an inline SVG data URI — no image request, no base64 blob, and
the browser rasterises the tile once and repeats it.

Three decisions worth recording, because two of them were wrong the first time:

1. **It lives inside `.hero__field`.** That buys the header mask for free (the grain fades in under
   the bar exactly like the light does) and puts it *under* `.hero__center`, so the headline stays
   crisp — grain over type softens it at display sizes, and the type is the point.
2. **`overlay` is neutral only if the tile's mean is 128.** `feTurbulence`'s `fractalNoise` is not
   centred: measured, the raw tile averages **186/255**, so a naive overlay can only lighten — it
   lifted the field **17 levels** and dropped headline contrast with it. The `feFunc*` linear stops
   (`slope 1.15`, `intercept −.36`) recentre it on **121.8** with a 0–203 range. It is set slightly
   *below* 128 on purpose: overlay is not symmetric across a dark base, so a small dark bias buys
   back most of the residual lift. The turbulence also leaves the alpha channel noisy;
   `feFuncA table "1 1"` forces the tile opaque, without which the blend is not reproducible.
3. **Density was set by eye, three times.** `.18` read as *not grain enough*, `.34` as *too grainy*,
   `.24` still too much; **`.20` is the shipped value**. Coarseness is a separate dial (below).

**Two independent knobs, if it needs tuning again:**

| | effect | value |
|---|---|---|
| `opacity` | how much grain you see | `.20` (`.18` too subtle, `.24` and `.34` too heavy) |
| `baseFrequency` | the size of the grain | `.7` chunkier, film-like · `.92` = 1px, more like dither |

`numOctaves` is `3` at `.7`; fewer octaves flattens the clumping.

**Checks.** Grain amplitude at `.20`: adjacent-pixel |Δ| goes `0.20 → 5.8/255` in flat areas
(p95 ≈ 19.5), and it reads the same in the dark teal and the warm gold zones. Residual lift at
`.24` is **+5.4 levels** on a ~95-level field, costing ~0.06 of contrast. Cost: **none measurable**
— 90-frame rAF timing is 8.33 ms mean with grain, 8.34 ms without, p95 9.3 vs 9.2. The grain never
touches the type or the photographs.

**Open:** whether `.20` is right. It is a film grain, not a texture overlay: visible at 100% on the
gradient, invisible behind the photographs and never on the type. The two knobs above are the only
dials.

**Open:** whether the **gold** is right for the brand — it now occupies a meaningful share of the
right half at its peak, and it is the boldest thing in the opening (`--gold` used as *light*, not
paint). The client has not seen it. If it reads as a second accent rather than warmth in the
ground, the lever is the mix and the peak opacity, not the position: the mass has to stay off the
right edge or the type stops being the focal point.

### Founders band — `#for-founders` (2026-10-26)

Added directly **under the AI band**, from Figma `FS-Design` node `11362:2949`. It is the page's
first seller's-voice section: the AI band explains what the company builds, this one answers the
founder's actual question. Full-bleed photograph, oversized serif pull quote, and the pitch in the
right column. **Revised the same day** — taller, animated, and re-photographed (below).

#### Shape: a screen-tall breathe-out

It takes **`min-height: clamp(600px, 82svh, 900px)`** + `display: grid; align-content: center`,
so it measures **738px at 1440×900** and **692px on a phone** (it was 436px). This is the page's
one slow band between the AI band and the careers band: the next band peeks at the fold, and the
quote gets enough air to be the only thing on screen for a beat. `align-content` is what keeps the
two columns optically centred rather than dumping the extra height under the copy.

#### The pull quote assembles word by word

The quote is the only type on the page that is *itself* the motion. Each word is a
`<span class="fw">` with an inline `--i`; on entry (`is-in`, own sweep trigger at 0.88 of the
viewport, same rule as every other band) the words rise out of a 5px blur, 28ms apart — 17 words
land in ~1.1s, measured: word 0 opaque at 700ms, word 16 at 1.1s. The copy column uses the site's
existing `.reveal` stagger, so the band's motion is the same language as the rest of the page.

Three gates, all deliberate: the word styles are scoped to `.has-js`, so **with JS off the quote is
plain visible text**; `prefers-reduced-motion: reduce` pins every word at `opacity: 1`, no
transform, no transition (verified under CDP emulation); and the spans carry no meaning to a
screen reader — `innerText` reads as one sentence.

#### Retail frame, and the licence problem it solved

The Figma photo is a client asset with no recorded licence, and
`03_Design/client-review/homepage/assets/*` is a gitignored allow-list whose rule is *"no
third-party media that is not licensed"* — in a **public** repo. The first build therefore shipped
with the image untracked and a `--hero-dark` fallback. **Replaced 2026-10-26 with a retail frame
under the Unsplash License** (free for commercial use, attribution not required), hotlinked from
`images.unsplash.com` exactly as the careers band already is — so nothing unlicensed enters the
repo, and the band no longer depends on a file that can 404. The local JPEG was deleted.

The frame is **a card payment at a shop counter** — retail and payments in one image, which is the
two axes of the company. Mobile asks Unsplash for a **portrait crop with `crop=faces`** instead of
zooming into the middle of a landscape.

Four free-licence candidates were rendered into the band and measured before choosing: boutique
interior, grocery aisle, clothes-store interior, POS payment. The POS frame won on *visible
detail* (band luminance spread `0.082` vs `0.045–0.067`) at a contrast cost that still cleared AA.

#### The photograph is left as shot

The photo is its own layer (`.founders::before`) with the scrim above it (`.founders::after`), so
the mobile crop can swap independently of the wash — but it carries **no `filter`**. An earlier
pass lifted it with `brightness(1.6) saturate(.92)` to pull the band out of near-black; at the
client's call that read as *"some weird image filter"* and was removed. A photograph on a brand
site should look like the photograph.

So the whole contrast budget is carried by the wash alone, and the wash is **solved, not
eyeballed**: the bare plate was captured, then the gradient stops were swept numerically against
every text layer. Without a filter the band sits at median luminance **0.040** (the lifted
version was 0.063; the first, over-washed pass was 0.027) — dim, but a dim photograph rather than
a manipulated one. Anything lighter fails the 17px body text.

#### Contrast, measured against the real background

Screenshotted with the text hidden, so every number is the actual photograph + wash behind each
layer, at 1440 / 1024 / 768 / 390. Two tests per layer: the 95th-percentile background patch in
the text box, and **the single brightest pixel** in it — the second is the one that catches a
highlight sitting under one letter.

| layer | size | worst, any width (p95) | worst, brightest pixel | needs |
|---|---|---|---|---|
| pull quote | 63 / 34 / 30px serif | `5.73 : 1` | `5.31 : 1` | 3.0 (large) |
| kicker `FOR FOUNDERS` | 11px mono | `5.31 : 1` | `5.00 : 1` | 4.5 |
| h2 `A home for the business you built.` | 28 / 22px | `5.73 : 1` | `5.46 : 1` | 3.0 (large) |
| `built.` in gold | 28 / 22px serif | `3.52 : 1` | `3.47 : 1` | 3.0 (large) |
| body | 17 / 16px | `5.18 : 1` | `4.94 : 1` | 4.5 |
| placeholder note | 12px mono | `6.52 : 1` | `5.39 : 1` | 4.5 |
| CTA pill | 14px bold on solid gold | `11.24 : 1` | — | 4.5 |

Every layer clears its bar under both tests. Text alphas were raised to buy that over an
unfiltered photo: kicker `.78 → .95`, body `.88 → .94`, note `.72 → .90`. These are 11–12px labels
and 16–17px body copy — none of them is large text, so none of them gets a discount — and the
note is a placeholder marker but still 12px text.

**ADA / axe-core 4.10.2: 0 violations** at 1440×900, 1024×800, 768×900 and 390×844.

#### Corrections to the Figma, and audit fixes

Two deliberate departures from the frame:

1. **Palette.** The frame is built on `#FEC50A` and `#00202B` — the *exploration* palette, which KB
   §15 / **OI-13** bars from anything official. The band uses `--gold` `#FFC600` for the pill and
   the `built.` accent, `--ink` for the button label.
2. **The overlay.** The frame's `.72 → .35` left-to-right gradient protects the quote and leaves the
   *copy* column on the weakest part of the wash. Rebuilt as a horizontal + vertical pair, tuned
   against the measured photograph.

Four more fixes came out of the audit:

- **Focus ring.** `.pill:focus-visible` defaults to brand blue, which measures 2.25:1 on ink. The
  band joins the `outline-color: #fff` group with `.hero` / `.ai` / `.kpi` — 3px white.
- **Deep links.** `#for-founders` landed under the fixed bar; the band sets `scroll-margin-top:
  calc(var(--bar-h) + 16px)`.
- **Semantics.** The quote is a `<blockquote>`, the section is `aria-labelledby` its `<h2>`, heading
  order stays h2 with no skipped level.
- **Bar state.** The AI and founders bands are one dark run in a light page, and the bar turned
  white across them — a floating slab. `syncBar()` keeps the ink treatment over the run.

**Open:** the pull quote is **placeholder founder voice** — the frame marks it "genericized,
unpublishable as written", and the band shows that note on the page rather than shipping it
quietly as a real attribution. It needs a real, cleared founder quote before launch, and the note
comes out with it.

### LinkedIn strip — real posts (2026-10-26)

The four placeholder cards at the foot of the careers band were replaced with **five real posts**
from Fullsteam's company page, in feed order (newest first):

| # | Post | Card artwork carries |
|---|---|---|
| 1 | Hiring — Senior Information Security & Compliance Business Partner | the role + `fullsteam.com/careers` |
| 2 | Fullsteam Voices — Xavier Codrington, Manager, Operations | the name + what the post is about |
| 3 | Emily Traylor, VP & CISO — Auburn 2026 Young Alumni Achievement Award | the award + the affiliation |
| 4 | Priswing at HITEC 2026, San Antonio | the event + booth `#1252` |
| 5 | Nilsen Report — up to #28 among U.S. merchant acquirers | the ranking + the move |

**Copy is condensed, not rewritten.** Each card holds the post's own claim in card length (~two
lines); `<em>` is used only where the source itself emphasises — a person's name, *Nilsen Report*,
*Priswing*. Nothing was invented: no reaction counts (the module has never had them), no quote
attributed to anyone who did not say it.

#### The artwork is rebuilt, not lifted

All five posts ship a designed graphic. Those cannot be pulled out of a screenshot and cannot be
re-exported here, and stock imagery standing in for a client's own campaign art would be worse than
no image. So each card **rebuilds the information of its graphic in our tokens**: a mono kicker, the
post's headline, and one supporting line — the same three things the real graphic says. No client
JPEG enters the repo (nothing to license, nothing to 404), and the strip stays on-palette by
construction.

Grounds rotate **brand → ink → gold → ink → brand**, so five cards read as a set rather than five
identical boxes, and the gold one lands in the middle. `.li-card__art--photo` is kept for a future
post that ships a real photograph; none of these five does.

#### Contrast is deterministic here

Because the type sits on flat token colours (not a photograph), these ratios are exact rather than
sampled — and every one clears its bar:

| pair | ratio | needs |
|---|---|---|
| headline `#fff` on brand `#00587C` | `7.82 : 1` | 4.5 |
| kicker + sub `#fff .82` on brand | `5.82 : 1` | 4.5 |
| `30` accent `--gold` on brand | `4.96 : 1` | 4.5 |
| headline `#fff` on ink | `17.71 : 1` | 4.5 |
| kicker + sub `#fff .82` on ink | `12.11 : 1` | 4.5 |
| headline ink on gold `#FFC600` | `11.24 : 1` | 4.5 |
| kicker + sub ink `.82` on gold | `7.53 : 1` | 4.5 |

**axe-core 4.10.2: 0 violations** at 1440×900 and 390×844; no overflow at either (cards are 320px
wide on desktop / 268px on a phone, art a fixed 136px).

#### One layout fix the real copy forced

Post length varies 2–4 lines, so with the art flowing after the text the artwork boxes staggered
up and down the strip and the row read ragged. `.li-card__text` is now `flex: 1 1 auto`, so the
copy absorbs the slack and every art box, and every footer link, sits on the same line.

#### Still outstanding

- **Post URLs.** The footer is still a non-interactive `View on LinkedIn` span; real permalinks are
  needed (see `linkedin-slots.md`).
- **Dates.** Shown as month + year (`Oct 2026`, `Jul 2026`, …), inferred from the relative ages in
  the client's screenshots. They need pinning to the real dates, or dropping.
- **Comms clearing.** Two named employees and one third-party ranking now appear on the official
  page. Both are already public on the client's own LinkedIn, but a public site carries more weight
  than a feed — marketing should confirm each is still fine to host.

## Open
- Whether the opening's headline copy is ratified over the locked wireframe lines.
- **Real team photos (not stock)** behind the careers band — it currently shows an Unsplash
  placeholder whose alt text says so; the client still has to supply the real image.
