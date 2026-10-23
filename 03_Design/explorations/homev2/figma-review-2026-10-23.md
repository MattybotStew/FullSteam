# Figma review compile — Exploration 02 · Video hero

**Frame:** FS-Design `11362:2306` (internal, not client-facing)  
**Compiled:** 2026-10-23  
**HTML reference:** [`index.html`](./index.html) · **WCAG proof:** [`ada-audit.md`](./ada-audit.md)

Use this file when replying to pins or annotating a Figma paste from homev2. The repo is the implementation source; Figma may still show pre-fix tokens until pasted.

---

## Comment tracker

| # | Related node (Figma) | Comment (summary) | Status | Repo / next step |
|---|----------------------|-------------------|--------|------------------|
| 1 | Header | Two navigation options: two-column vs one-column | **Documented** | Open menu = **single-column rows** (`.menu__panel`); footer = **4-column** `.menu__inner`. Compare chrome in [`02_Wireframes/active/header-wireframe.html`](../../../02_Wireframes/active/header-wireframe.html) (B revised). No sitemap change. |
| 2 | Homepage hero | Sample video reflecting ERP, Wine, Transportation, Hospitality, Automotive, or payment processing | **Blocked — asset** | Criteria in [`direction.md`](./direction.md) § Hero video (Figma review). Keep `hero-stock.mp4` until client clip; **re-sample hero contrast** when footage changes ([`ada-audit.md`](./ada-audit.md) residual #1). |
| 3 | Section below hero | Is the gradient WCAG AA? Test palette if not | **Done in HTML** | Gold→green gradient `em` is **dark-ground only** (8.66→6.01:1 on `#003244`). Light-ground `.ai__title em` uses solid `--green-ink` (3.94:1 on `#f2f7f9`). See paste blurbs below. |
| 4 | Section below hero | Another, more dynamic version of the section | **Wireframe lab** | [`02_Wireframes/active/who-we-are-layouts.html`](../../../02_Wireframes/active/who-we-are-layouts.html) — baseline, sticky rail (current homev2), tabs, accordion. Pick before changing homev2 structure. |
| 5 | Scale and verticals | Font hard to read — another version? | **Done in HTML** | Labels 18px; panel desc/link Instrument Sans 16px/15px ([`direction.md`](./direction.md) 2026-10-23). |
| 6 | Scale and verticals | Updated images for the section | **Blocked — asset** | Unsplash stand-ins with attribution in HTML comment; replace with client vertical photography. |
| 7 | Section above Careers | Test for AA | **Done in HTML** | `#founders` horizontal scrim tightened (right stop **0.35 → 0.55**) so white type clears ≥4.5:1 over a bright photo at the gradient edge. `#careers` gradient `em` on blue passes on dark ground ([`ada-audit.md`](./ada-audit.md)). |
| 8 | Careers / Great place to work | Use actual LinkedIn posts | **Blocked — content** | Carousel structure ready; slots in [`linkedin-slots.md`](./linkedin-slots.md). Do not ship mock stats as real. |

---

## Paste-ready blurbs (contrast pins)

**Section below hero — gradient text**  
In the built HTML, italic accent words use a gold→green gradient **only on dark backgrounds** (who-we-are blue, careers blue, testimonial cards). On the light AI wash, accents use solid green ink that clears 4.5:1. Verified: axe 4.10.2, 0 violations (normal + reduced motion). Details: `ada-audit.md`.

**Hero text over video**  
Headline tint runs **0.62 → 0.58** (not 0.48). Measured over `hero-stock.mp4`: worst **3.50–3.84:1**, 0% of headline/CTA band under 3:1. Any new hero clip must be re-measured.

**Founders band (above Careers)**  
White quote and body sit on a left-weighted scrim over photography. Scrim gradient runs **0.82 → 0.55** (was 0.72 → 0.35) so the light edge still clears **≥4.5:1** over a bright photo. Gold `em` in title is solid `#FFC600` on scrim, not gradient-on-white.

---

## Out of scope in repo (client / production)

- Final hero video (vertical or payments story)
- Real LinkedIn post copy, dates, and reaction counts
- Production vertical photography for the filmstrip
- Formal client sign-off on Instrument Serif in explorations

---

## Related files

| File | Role |
|------|------|
| [`who-we-are-layouts.html`](../../../02_Wireframes/active/who-we-are-layouts.html) | §02 layout iteration |
| [`header-wireframe.html`](../../../02_Wireframes/active/header-wireframe.html) | Nav chrome options |
| [`ada-audit.md`](./ada-audit.md) | WCAG 2.1 AA verification record |
