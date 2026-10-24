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
| **Headline** | The three Axis A lines arrive in sequence — 0 / 90 / 215ms, 780ms each — rising `0.42em` and resolving out of a 6px blur. The gold serif *software.* lands last, one beat after the sans lines, so the payoff word is the thing that completes the frame. |
| **Filmstrip** | The band lifts in at 360ms (`18px` + 4px blur), while the frames fade up in a left→right wave — six steps at 55ms apart, 520ms each, applied with `:nth-child(6n+k)` so the duplicated loop copy keeps the same rhythm as the first six. |
| **Trigger** | After `document.fonts.ready`, not `load` — the film pulls a dozen remote frames and `load` would land the entrance seconds late. Skipped when the page opens part-way down (`scrollY > 10`). |
| **Reduced motion** | Nothing runs: the CSS is scoped to `html.has-js:not(.reduce-motion)`, and this page already puts `reduce-motion` on `<html>`. |
| **Cleanup** | Both classes are removed on `animationend` (2.4s fallback) so no held animation can out-rank the scroll-driven inline writes that follow — `--hero-a-fade` on the copy and the marquee's `translate3d` on the track. |

Deliberate choices:

- **No clip on the headline lines.** The last line holds the Instrument Serif
  `em` at `line-height: 0`; a mask would cut the italic. The rise + blur is the
  mask's substitute and matches this page's own `.reveal` register.
- **The thumbs animate opacity only.** Their track transform belongs to the
  marquee loop — any CSS transform on the frames would be overwritten every
  frame.
- **The marquee is not paused for the entrance.** At ~27px/s it barely moves
  across the ~1.1s the entrance runs, and having the frames already sliding
  reads as the strip developing in motion rather than presenting.

## Open

- Client logo strip under hero (currently text placeholders).
- Whether to restore Axis A/B opening in a hybrid or keep Localyzer hero for this track only.
- Git track vs local-only (see explorations README).
