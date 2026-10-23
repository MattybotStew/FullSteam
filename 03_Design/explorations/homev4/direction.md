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

## Open

- Client logo strip under hero (currently text placeholders).
- Whether to restore Axis A/B opening in a hybrid or keep Localyzer hero for this track only.
- Git track vs local-only (see explorations README).
