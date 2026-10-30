# html2figma

Converts the Fullsteam wireframe HTML into editable Figma frames, so the
`⚠️ WF v2` page stops drifting from `02_Wireframes/active/`.

Structural fidelity, not pixel fidelity. Every string becomes a real, editable
text node; headings, annotations, pills, image placeholders, cards, FAQ items,
sidebars and accordions are rebuilt as auto-layout frames.

## Pipeline

```
02_Wireframes/active/**.html
        │  parse.py          HTML  -> compact JSON spec
        ▼
   out/<page>.json
        │  bundle.py         spec  + build.js -> one paste-ready script
        ▼
   Figma  (figma_execute via the Desktop Bridge)
```

## Run it

```bash
cd tools/html2figma

# 1. parse one page (or every page)
python3 parse.py ../../02_Wireframes/active/pages/careers.html out/careers.json

# pages whose panels are JS-filled from a <template> carry {{V}} tokens in the
# raw HTML. Substitute them at parse time (the sidebar default is Hospitality):
python3 parse.py ../../02_Wireframes/active/pages/vertical-software.html out/vertical-software.json \
  "--sub={{V}}=Hospitality"

# 2. bundle it for the bridge
python3 bundle.py out/careers.json --page 3:55487 --x 0 --y 0 --out /tmp/bundle.js
```

Then open the Figma Desktop Bridge plugin in `FS-Design`, and run
`/tmp/bundle.js` through `figma_execute`. The script returns
`{id, name, w, h}` for the frame it created.

`--x/--y` place the frame; omit both and it auto-places to the right of
everything already on the page.

## Bulk re-export

```bash
for f in ../../02_Wireframes/active/homepage.html ../../02_Wireframes/active/pages/*.html; do
  n=$(basename "$f" .html)
  python3 parse.py "$f" "out/$n.json"
done
```

## What maps to what

| HTML | Figma |
| --- | --- |
| `h1` / `h2` / `h3` | 56 / 40 / 20px bold text |
| `p.prose` | 16px body |
| `p.lede` | 18px lede |
| `p.beat` | 11px mono uppercase kicker |
| `p.anno` | dashed mono annotation box |
| `.img-ph`, `img` | gray `IMAGE` placeholder rectangle |
| `.pill` / `.pill-lg` | gold button frame |
| `section.tan` / `.dark` | tan / near-black section band |
| `.wrap` | 1120px fixed content column |
| `.split`, `.cards`, `.facts`, `.logo-row`, `.shot-row` | row / grid auto-layout |
| `.steps` | numbered step rows |
| `.faq`, `details` | accordion rows (summary = question) |
| `.v-layout` / `.v-side` / `.v-content` | two-column sticky-sidebar layout |
| `.oe-layout` / `.oe-side` / `.oe-side-list` | Our Advantage's three-group sidebar + inline panels |
| `.compare` | two-column embedded-vs-bolted comparison |
| `.stat-row`, `.logo-line`, `.logo-grid` | 3 / 4 / 3-column rows |
| `.v-photo-pair`, `.v-shot` | 2 / 3-column image rows |
| `.voices`, `.use-grid`, `.li-posts` | 3-column testimony / use-case / post cards |
| `.filmstrip`, `.ai-strip` | 11-column vertical strip / 3-column AI strip |
| `.v-hero-grid`, `.split` | two-column hero and copy+image splits |
| `.bleed-imgs`, `.kpi-row`, `.leaders` | 4 / 4 / 3-column bands (image band, proof strip, leader grid) |
| `.founder-videos`, `.video-row`, `.ucases`, `.agl` | 3-column card and video grids |
| `.menu-btn` | three-bar hamburger (`k:"bars"`), not an image placeholder |
| `.nav-right` | logo-left / menu + CTA-right header row |
| `.pill` | hugs its label, like `inline-flex` in the wireframe |
| `template#tpl-vertical` | rendered as the default panel state (its content is JS-injected) |
| per-side borders | 1px `Rule` rectangle (Figma has no per-side strokes) |

## Fonts

`Archivo` for headings (`h1`–`h6`, mirroring `--display` in the wireframe CSS),
`Archivo` Regular/Bold for body, `Menlo` for mono. Falls back to `Inter` /
`Roboto Mono`, then to whatever loads. The Figma wireframes already used Archivo,
so converter output matches them.

## Coverage

All 11 active pages convert with no dropped body text:

| page | body words kept |
| --- | --- |
| homepage | 100% |
| 404 | 100% |
| careers | 100% |
| contact | 100% |
| embedded-offerings (Our Advantage) | 100% |
| for-founders (Acquisitions) | 100% |
| our-story | 100% |
| privacy | 100% |
| terms | 100% |
| vertical-software | 100% |

Ten pages. The Leadership frame was **deleted from `⚠️ WF v2` on 2026-10-30** along with the
page itself (Leadership is now a section on Our Story).

`parse.py` deliberately drops `<script>`, `<style>`, `<head>` and `<svg>`, and
the header's `nav` overlay (its items are drawn in the footer already). Two
former bugs are fixed and regression-checked: `<details>` bodies that are not
plain FAQ shape (the homepage vertical rows), and `<template>` bodies that hold
the vertical/offering default panel.

## Caveats

- Not pixel-perfect. Spacing, line breaking and column widths are approximations.
- No images — every image is an `IMAGE` placeholder by design.
- No interaction: pins, morphs, counters, marquees and tab switching are
  intentionally absent. These frames are endpoints only.
- Re-running creates a **new** frame. Delete the old one, or rename it first, so
  the page does not accumulate duplicates.
- Sidebar-only panels that are `display:none` in the HTML still convert if they are
  plain `article` siblings of the active panel (Our Advantage renders all seven);
  inside a `.v-content` block only the `.is-active` panel is used, because the
  others are empty shells filled by JS.
