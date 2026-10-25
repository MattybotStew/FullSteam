# homev4 — Localyzer register (layout study)

> **Status:** INTERNAL · UNREVIEWED · **not client-facing.**
> Sibling of [`../homev2/`](../homev2/) and [`../homev3/`](../homev3/).
> Implements layout **take** list from [`inspiration.md`](../../../inspiration.md) §2.1 — not Localyzer’s visual brand or conversion funnel.

```
http://localhost:8000/03_Design/explorations/homev4/index.html
```

## What this is

Full homepage in **Localyzer’s rhythm** (light canvas, cinematic overlay, pinned stat swap, bento, dark feature band, oversized close) with **Fullsteam content order** (KB §24 / `wireframes.md` §2) and **official brand tokens** (KB §15).

| | homev2 | homev4 |
|---|---|---|
| Hero | Axis A → grow morph → Axis B (KB §23) | **Axis A stays pinned**; **Axis B** video (`hero-stock.mp4`) **scrolls up over it** (Localyzer-style reveal + copy fade — not the KB §23 clip-path grow morph) |
| Canvas | Blue hero → blue §02 | **Dark Axis A hero**, then **white / off-white** below |
| §02 | Sticky rail / parallax panels | **Bento + founder band** |
| Motion signature | Video + scroll-over | **Pinned KPI mosaic** + floating UI chips |

## Take / ignore (§2.1)

**Take:** audience kicker; proof under hero; one pinned mosaic cycling allowlisted KPIs; bento for “what we add”; genericized quote; oversized close.

**Ignore:** Book a Demo; “platform” language; six-up SaaS grid as the story; Localyzer teal/yellow; news filmstrip; adoption framing.

**CTA:** Explore our vertical solutions (+ Contact in footer). Secondary hero link anchors `#what-we-do`.

## Tokens (as built)

| Token | Value | Role |
|-------|-------|------|
| `--brand` | `#00587C` | Bio Blue — links, kicker accent |
| `--gold` | `#FFC600` | Primary pill |
| `--green` | `#84BD00` | Accent on dark bands only |
| `--bg` | `#ffffff` | Canvas |
| `--surface` | `#f4f7f9` | Cards / secondary zones |
| `--ink` | `#0d1a20` | Headlines |
| `--mut` | `#5c6b73` | Body secondary |

Type: **Instrument Sans** + **Fragment Mono** (same as Figma promotion; no Instrument Serif in this pass).

## Accessibility (spot check)

- Skip link, focus-visible rings, semantic landmarks, dialog menu with Escape to close.
- Pin mosaic: per-frame opacity writes in JS (no CSS transition on scroll-driven values); with `prefers-reduced-motion`, pin height collapses and all three stats stack in-flow.
- Vertical cards use `aria-pressed`; pin stats use `aria-hidden` when off-screen.
- Placeholder figures marked `[placeholder]` where OI-5 applies.
- **Axe:** not run in CI for this sandbox — before promotion, run axe on `index.html` (normal + reduced-motion emulation) and log results here.

## Opening entrance (2026-10-24)

A one-pass entrance on the first screen, at the CD's direction. No layout,
copy, or motion-model change — the pinned Axis A, the filmstrip marquee, and
the Axis B scroll-over are untouched.

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

## Open

- Client logo strip under hero (currently text placeholders).
- Whether to restore Axis A/B opening in a hybrid or keep Localyzer hero for this track only.
- Git track vs local-only (see explorations README).
