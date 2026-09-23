# Fullsteam.com Wireframe Spec

> **Version:** 0.1 (initial — structure & IA only)
> **Status:** Working spec for the homepage + chrome wireframes
> **Owner:** Matt Stewart (Creative Director) · **Wireframe build:** Bionic
> **Related:** [`design.md`](./design.md) (UX spec / later design doc),
> [`PROJECT_KNOWLEDGE_BASE.md`](./PROJECT_KNOWLEDGE_BASE.md) §14 (sitemap/IA) & §20
> (discovery-interview synthesis)

---

## 0. Read this first — wireframes are a separate track from `design.md`

This file is the **single source of truth for the wireframes**. It documents what the
HTML wireframes currently do, section by section, and what is still open.

**Boundary rules for every agent working in this repo:**

1. **Wireframes ≠ the design document.** `design.md` is the UX spec and the future
   home of the visual/design direction. This file (`wireframes.md`) governs the
   **structure, IA, content order, and interaction scaffolding** only. Do not merge
   the two, and do not let edits to one silently rewrite the other.
2. **Do not treat wireframe styling as final.** Page wireframes use a low-fi
   skin (white / light tan backgrounds, black Helvetica type, yellow CTAs,
   dark-gray image-icon placeholders) **so they read as structure, not a
   designed site**. None of that is an approved visual direction. Fonts, color
   application, spacing, radii, and imagery stay placeholders until the design
   pass.
3. **Do not change a wireframe to match a design idea that hasn't been agreed.**
   If a design decision lands later, record it in `design.md` first, then reconcile
   the wireframe deliberately (and note it in the changelog below).
4. **Do not change `design.md` to match a wireframe experiment.** The wireframes are
   explorations; the spec is intentional. Changes flow: discovery/KB → design.md
   intent → wireframe execution, not the reverse.
5. **Content in wireframes is placeholder unless marked "locked."** Headlines,
   stats, labels, and examples are drafts for layout review. Confidential figures
   and named case studies remain subject to the KB confidentiality convention.

---

## 1. Wireframe inventory

| File | Role | Status |
|------|------|--------|
| [`prototypes/sitemap.html`](./prototypes/sitemap.html) | Full page tree (L1 = pages); chrome/overlay/footer as access layers | Locked — v1.0 final |
| [`prototypes/header-wireframe.html`](./prototypes/header-wireframe.html) | Stacked chrome options 0 / A / B / C, each with its drawn-open overlay | Comparison — pick pending |
| [`prototypes/sitemap-rationale.html`](./prototypes/sitemap-rationale.html) | Rationale for IA/nav terminology decisions (incl. "Offerings") | Reference |
| [`prototypes/meganav-rationale.html`](./prototypes/meganav-rationale.html) | Rationale for mega-menu / grouped verticals | Reference |
| [`prototypes/homepage-wireframe/v0.1-rough/homepage-bendingspoons-style.html`](./prototypes/homepage-wireframe/v0.1-rough/homepage-bendingspoons-style.html) | **Current homepage direction** — Square layout guide, long-scroll story | Active |
| [`prototypes/homepage-wireframe/v0.1-rough/alternative-home-a.html`](./prototypes/homepage-wireframe/v0.1-rough/alternative-home-a.html) | Alternative A — storytelling-led, dual-axis (Solutions / Offerings) | Alternative |
| `prototypes/homepage-wireframe/v0.1-rough/sections/` | Reserved for per-section explorations | Empty |

Preview from the repo root:

```
python3 -m http.server 8000
# → http://localhost:8000/prototypes/homepage-wireframe/v0.1-rough/homepage-bendingspoons-style.html
```

---

## 2. Current direction — `homepage-bendingspoons-style.html`

**Layout concept:** Homepage as a **long scrolling story**, using
[squareup.com/us/en](https://squareup.com/us/en) as the layout guide: full-bleed
visual hero with type over the image, a two-up “who we are” pair, then open image+copy scenes,
then industries + general proof. Low-fi skin: white / tan, black type (hero
overlay is white on the placeholder for contrast), yellow CTAs, image-icon
placeholders. One general story — not audience tabs.

**Chrome (Option B revised, 2026-09-23):** `Logo · Menu · Explore Solutions`. For Founders is in the Menu overlay, footer, and beat 07 close — not in the header strip.
The menu opens a full-width overlay containing the sitemap L1 (**For Founders**,
**Vertical Software**, Embedded Offerings, Our Story, Careers, Contact). No header search; the "find
your vertical" finder lives in the overlay / Vertical Software page.

### Section-by-section

| # | Section | Intent | What's on screen | Status |
|---|---------|--------|------------------|--------|
| 1 | **Header** | Sparse chrome; primary CTA | Logo, "Menu" (overlay toggle), "Explore vertical solutions" pill | Built |
| 2 | **Hero** | Square: mosaic of verticals, then full-screen on scroll | White scatter of image-placeholders + line doodles and a center line (“Whatever the industry…”). Scrolling the pin grows a full-bleed hero (H1 + yellow CTA). | Built |
| 3 | **Who we are** | Two-up pair (Square “Terminal / Stand”) | Beat **02**. H2 “Scale your vertical software without losing your legacy.” + Empower and supercharge growth \| Embedded Offerings. | Built |
| 4 | **The software** | Scene: image + copy | Beat **03**. “The system they already run.” Link to all verticals. | Built |
| 5 | **What we add** | Flipped scene | Beat **04**. “Keep the software they trust. Supercharge how they monetize.” Lending/insurance stay in the body. | Built |
| 6 | **AI** | Scene, use cases first | Beat **05**. AI at Fullsteam — never a headcount story. | Built |
| 7 | **Industries + proof** | Square “Keep your business growing” filmstrip | Beat **06**. Dark band, revenue-ordered subset (5 panels), center featured with inferable KPI overlay. All 11 as text links. | Built |
| 8 | **Closing CTA** | Explore, founders as coda | Beat **07**. “Ready to see where your business can go next?” Primary CTA + quiet For Founders. | Built |
| 9 | **Footer** | Utility + full tree recovery | Company / Explore / Connect / Legal columns | Built |

### Deliberate choices in this wireframe

- **Primary CTA** appears in header, hero, and closing — always
  **"Explore our vertical solutions"** (full form); header uses the short form
  "Explore vertical solutions."
- **"Embedded Offerings"** is the axis label (client-preferred; short form "Offerings" in body copy; never "Platform").
- **Verticals** appear as a **flat 11-name
  row** in the proof band — Square’s “seamless verticals,” without brand logos. (Hero marquee removed 2026-09-23.)
- **Menu overlay = the sitemap at L1**, with a note that the finder is here (not a
  header search field).
- **Metrics** sit in a **general proof band** (beat 03) with **[verify publishability]**
  placeholders — same numbers for every visitor, not a founders/investors split.
- **For Founders** lives in the Menu overlay, footer, and a quiet close link — not in header chrome. The scroll itself is
  one company story.

### Known gaps & issues (do not silently fix — see open items)

- ~~**G-1** "Browse all verticals →" linked to `#founders`.~~ **Resolved
  2026-09-10:** now targets `#solutions`.
- ~~**G-2** Footer lists **For Investors** but the chrome does not.~~ **Resolved
  2026-09-10:** For Investors deleted from the sitemap; footer link removed.
- **G-3** Proof-band metrics use **[verify publishability]** placeholders until
  client confirms which scale/KPI signals can go on the site (OI-5).
- **G-4** **No social-proof band** (testimonials / video) despite `design.md` §4.6.
- **G-5** **No Our Story / Careers band** — employer/careers story (~15% of content
  per §20) is footer-only.
- ~~**G-6** "For Founders" as chrome + feature tab.~~ **Resolved 2026-09-21
  (wireframe experiment):** founders path is overlay + close (header chrome link removed 2026-09-23); scroll is general.
- ~~**G-7** JS tabs on the feature section.~~ **Resolved 2026-09-21:** tabs removed;
  long-form stacked chapters (Bending Spoons guide).
- **G-8** Hero headline "The operating system for vertical markets." is the deck
  positioning line — confirm it is the approved hero message.
- ~~**G-9** Hero strip and Our businesses showed the same six verticals.~~
  **Resolved 2026-09-21:** hero is the teaser strip; beat 04 is three deep generic
  chapters, not a second 6-up mosaic.

---

## 3. Alternative — `alternative-home-a.html`

A second homepage ordering for comparison: **storytelling-led, dual-axis**, and
deliberately low-fidelity (grayscale dashed boxes, palette only for legend
legibility).

Order: Hero → **Two stories (Acquire & Grow | Embedded Expansion)** → Scale stat
band → Explore by vertical (flat list) → Offerings in action → Why + social proof →
Audience bands (Founders / Investors) → Closing → Footer.

> **Note:** this alternative predates the 2026-09-10 lock that **deleted For
> Investors**. Its investor band is not part of the locked IA (KB §14). Treat the
> alternative as an ordering comparison, not the final audience structure.

Use this as the counterpoint to the current direction when deciding section order:
- **Current direction** is a Bending Spoons-style **long scroll**: hero strip, then
  thesis, general proof, three vertical chapters, offerings stack.
- **Alternative A** leads with the two stories as a visible dual-axis, then proves
  with stats, then portfolio, then offerings.

---

## 4. Header chrome options (from `header-wireframe.html`)

| Option | Chrome | Feel / risk |
|--------|--------|-------------|
| **0 — Traditional** | All L1 + hover mega-menus | Familiar, but reads as a corporate brochure bar |
| **A — Menu as the map** | Logo · Menu · CTA | Sparse, premium; audience paths one click deeper |
| **B — Founder path in chrome** | Logo · For Founders · Menu · CTA | Audience path without a six-item bar; portfolio moves to overlay (revised: For Investors removed) |
| **C — CTA-first** | Logo · one story link · Explore Solutions · Menu | One job in chrome; Offerings easy to bury |

**Current homepage implements B revised** (For Investors removed). **Provisional
pick: B revised** — pending client sign-off (OI-1). Option 0 is labeled legacy/rejected.

---

## 5. Sitemap reference

**Locked L1 (2026-09-10 · finalized 2026-09-14 · revised 2026-09-15):** For
Founders · **Vertical Software** · **Embedded Offerings** · Our Story · Careers.
**For Investors was deleted.** **Vertical Software is a single page** — a sticky
sidebar lists all 11 verticals and swaps a tabbed panel; **no child pages**, no
category labels. **Hardware & Integrations were dropped** as separate pages (folded
into Embedded Offerings / Payments). AI at Fullsteam is a page nested under Embedded
Offerings. Under Our Story: **Newsroom** (`/our-story/newsroom`, single dynamic CMS
page) and **Leadership** (`/our-story/leadership`, leaders only). **For Founders is
a single-page leaf.** See `PROJECT_KNOWLEDGE_BASE.md` §14 for the full locked tree.

`prototypes/sitemap.html` is the inventory of pages (L1 = pages). The header does
**not** need to list every L1 node; chrome, the Menu overlay, and the footer are
access layers that must still reach every node. Labels in chrome/overlay/footer
must match the sitemap. Utility items (Contact, "Explore Solutions", legal) are
not L1 tree nodes.

---

## 6. Editing conventions

- Static HTML, no build step. Keep files self-contained (inline CSS/JS) so they
  preview by opening the file or via the static server.
- Low-fidelity language: white + light tan (`#F3E6D0`) backgrounds, black type
  (Helvetica / Arial), yellow CTAs (`#FFC600` + black text), 1px black rules.
  Image slots use a dark-gray (`#4A4A4A`) block with the standard landscape
  image icon. Do not reintroduce navy fills, brand fonts, or photography.
- This is a **wireframe skin only** — not an approved visual direction (see
  boundary rule 2). Sitemap / rationale docs may stay as IA diagrams.
- Keep copy short and obviously provisional; mark locked copy explicitly.
- Preserve the constraint words: **"Embedded Offerings"** (never Platform), hero CTA
  **"Explore our vertical solutions."**
- If you change structure or order, update the section table in §2 and the
  changelog in §8.

---

## 7. Open items (decisions needed)

- **OI-1 — Final chrome pattern.** **Provisional: B revised** (Logo ·
  Menu · Explore Solutions; For Founders not in the strip as of 2026-09-23). Confirm with client, then apply the chosen strip to all
  interior pages so chrome is a system, not a homepage trick.
- ~~**OI-2 — "For Investors" placement.**~~ **Resolved 2026-09-10: deleted.**
  No investor nav node or page; investors are served by homepage scale/proof +
  Contact. (KB §14 locked.)
- **OI-3 — Section order.** Wireframe experiment 2026-09-21: long-form Bending
  Spoons scroll (thesis → general proof → 3 vertical chapters → offerings stack).
  Confirm vs Alternative A’s dual-axis. `design.md` not updated.
- **OI-4 — AI homepage treatment.** Dedicated page is **locked under Offerings**
  (KB §14). Current wireframe: AI is the last row in beat 05, not a tab.
- **OI-5 — Stat / proof strategy.** Current: one general proof band (beat 03).
  Which figures are publishable (G-3)?
- **OI-6 — Social proof & video.** Where testimonials/mission video live (G-4).
- **OI-7 — Careers/company band.** How the ~15% employer story surfaces above the
  footer (G-5).
- ~~**OI-8 — Feature interaction.**~~ **Wireframe experiment 2026-09-21:** JS tabs
  removed in favor of stacked long-form. Confirm with client.

---

## 8. Changelog

| Date | Change |
|------|--------|
| 2026-09-10 | Created wireframe spec; documented current direction, alternative A, chrome options, and open items. |
| 2026-09-10 | Post-lock audit: G-1 fixed; G-3 placeholders; sitemap Solutions hub label; doc drift; header palette aligned; OI-1 provisional B revised. |
| 2026-09-10 | Removed category labels for verticals — flat 11-vertical list in overlay, sitemap, and docs. |
| 2026-09-10 | Renamed portfolio axis **Solutions → Vertical Software** (Figma comment #1). Dropped **Hardware & Integrations** as separate Offerings pages (Figma comments #8/#9); folded into Payments / Offerings. "All Verticals" folded into the hub. Voice rule added: external copy uses "you" (Figma #7). |
| 2026-09-10 | Axis label **Offerings → Embedded Offerings** (client-preferred; short form "Offerings"). **Newsroom** added as a single dynamic CMS page under Our Story. |
| 2026-09-14 | **Sitemap finalized.** **Leadership** added as a page under Our Story; **Newsroom** nested at `/our-story/newsroom`. For Founders confirmed a single-page leaf; **category labels deleted** after the client call (flat 11-vertical list, no landing pages); migration map kept in the lock doc. `sitemap.html` marked v1.0 FINAL. |
| 2026-09-15 | **Vertical Software revised to a single page** — sticky sidebar of the 11 verticals swaps a tabbed panel; **11 detail pages removed**, no child pages. `sitemap.html` updated (in-page tab note, not child nodes); budget drops to ~13 pages. |
| 2026-09-21 | Low-fi restyle on homepage + header + Alternative A: white / tan backgrounds, black type, yellow CTAs, dark-gray image-icon placeholders. Structure and IA unchanged. |
| 2026-09-21 | Homepage hero composition: even 6-tile mosaic → **asymmetric type / featured visual split** with a 2×2 Hospitality placeholder, overlapping stacked vertical labels, and five satellite tiles. Copy, CTA, chrome, and lo-fi skin unchanged. |
| 2026-09-21 | Homepage hero option 2: **centered H1 + software-first line + yellow CTA**, then a **horizontal snap-scrolling row of portrait cards** (image-placeholder + title only). Six revenue-ordered verticals + peek “Browse all.” Removed Hospitality 2×2 / overlapping name stack / satellites. Chrome and lo-fi skin unchanged. |
| 2026-09-21 | Hero treated as **beat 01 of a long scroll story**: first viewport; cards **deal from behind the H1** (center-out stagger), then settle into the strip. Handoff “How we grow them ↓”. Beat labels 01–05 on later sections (wireframe scaffolding only). `design.md` not edited. |
| 2026-09-21 | Rest of homepage follows **Bending Spoons long-form**: thesis → general proof band → three generic vertical chapters → offerings stack. Tabs, 6-up mosaic, and founder/investor story-split removed from the scroll. Named people/brands are not the case studies. `design.md` not edited. |
| 2026-09-21 | Homepage **layout guide → Square** (`squareup.com/us/en`): full-bleed overlay hero, verticals marquee, two-up pair, image+copy scenes, industries + general proof. Deal-cards / Bending Spoons chapter stack removed. Chrome, CTA, and lo-fi skin kept. `design.md` not edited. |
| 2026-09-21 | Hero sequence: **mosaic of verticals first** (Square “flavor of business” scatter), then on scroll the **hero grows full-screen**. |
| 2026-09-21 | Beat 06 → Square **industry filmstrip**: five revenue-ordered panels, featured overlay with inferable KPIs **[verify]**, remaining verticals as text. `design.md` not edited. |
| 2026-09-23 | Homepage H2 drafts from **Slack comments by Nicole Williams** (Cloudmellow content PM, 2026-09-22 screenshots) — not discovery interviews: beat 02 “Scale your vertical software without losing your legacy.”; beat 04 “Keep the software they trust. Supercharge how they monetize.”; beat 07 “Ready to see where your business can go next?” Supporting lines unchanged. Placeholder copy, not locked. `design.md` not edited. |
| 2026-09-23 | Homepage: removed hero verticals marquee and header “For Founders” chrome link. Chrome is Logo · Menu · Explore vertical solutions. For Founders remains in Menu overlay, footer, and beat 07 close. `design.md` not edited. |
| 2026-09-23 | Reverted `.scene h2` `max-width` from `min(960px, 100%)` back to **`12ch`**. The 960px change was uncommitted and unexplained (likely spill from wide-headline requests). Beat 02’s long H2 lives on `.band-head` (already 960px); `.scene h2` is the image+copy column (beats 03–05) and stays tightly stacked per the Bending Spoons scene pattern. |
