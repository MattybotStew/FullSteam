# Fullsteam.com Wireframe Spec

> **Version:** 0.1 (initial — structure & IA only)
> **Status:** Working spec for the homepage + chrome wireframes
> **Owner:** Matt Stewart (Creative Director) · **Wireframe build:** Bionic
> **Related:** [`design.md`](./design.md) (UX spec / later design doc),
> [`content-slots.md`](./content-slots.md) (slot-by-slot copy handoff),
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
| [`02_Wireframes/locked/sitemap.html`](./02_Wireframes/locked/sitemap.html) | Full page tree (L1 = pages); chrome/overlay/footer as access layers | Locked — v1.1 |
| [`02_Wireframes/active/header-wireframe.html`](./02_Wireframes/active/header-wireframe.html) | Stacked chrome options 0 / A / B / C, each with its drawn-open overlay | Comparison — pick pending |
| [`01_Discovery/synthesis/sitemap-rationale.html`](./01_Discovery/synthesis/sitemap-rationale.html) | Rationale for IA/nav terminology decisions (incl. "Offerings") | Reference |
| [`01_Discovery/synthesis/meganav-rationale.html`](./01_Discovery/synthesis/meganav-rationale.html) | Rationale for mega-menu / grouped verticals | Reference |
| [`02_Wireframes/active/homepage.html`](./02_Wireframes/active/homepage.html) | **Current homepage direction** — long-scroll story | Active |
| [`02_Wireframes/archive/alternative-home-a.html`](./02_Wireframes/archive/alternative-home-a.html) | Alternative A — storytelling-led, dual-axis | Archive |
| [`02_Wireframes/active/pages/for-founders.html`](./02_Wireframes/active/pages/for-founders.html) | For Founders — home, how it works, what we look for, talk to us | Active |
| [`02_Wireframes/active/pages/faq.html`](./02_Wireframes/active/pages/faq.html) | Founder FAQ (`/for-founders/faq`) | Active |
| [`02_Wireframes/active/pages/vertical-software.html`](./02_Wireframes/active/pages/vertical-software.html) | Vertical Software — sticky sidebar of 11, swaps content inline | Active |
| [`02_Wireframes/active/pages/embedded-offerings.html`](./02_Wireframes/active/pages/embedded-offerings.html) | Embedded Offerings — sticky sidebar of 4, swaps content inline | Active |
| [`02_Wireframes/active/pages/our-story.html`](./02_Wireframes/active/pages/our-story.html) | Our Story | Active |
| [`02_Wireframes/active/pages/leadership.html`](./02_Wireframes/active/pages/leadership.html) | Leadership — leaders only | Active |
| [`02_Wireframes/active/pages/careers.html`](./02_Wireframes/active/pages/careers.html) | Careers — culture + Workday open-roles CTA | Active |
| [`02_Wireframes/active/pages/contact.html`](./02_Wireframes/active/pages/contact.html) | Contact (utility, not an L1 node) | Active |
| [`02_Wireframes/active/pages/privacy.html`](./02_Wireframes/active/pages/privacy.html) | Privacy policy — lorem placeholder (utility) | Active |
| [`02_Wireframes/active/pages/terms.html`](./02_Wireframes/active/pages/terms.html) | Terms of use — lorem placeholder (utility) | Active |
| [`02_Wireframes/active/pages/404.html`](./02_Wireframes/active/pages/404.html) | 404 — not found (utility) | Active |
| [`404.html`](./404.html) (repo root) | GitHub Pages custom 404 (same message, root-relative links) | Active |

Preview from the repo root:

```
python3 -m http.server 8000
# → http://localhost:8000/02_Wireframes/active/homepage.html
# → http://localhost:8000/02_Wireframes/active/pages/vertical-software.html
```

---

## 2. Current direction — `homepage.html`

The live file is [`02_Wireframes/active/homepage.html`](./02_Wireframes/active/homepage.html). Earlier notes below still say `homepage-bendingspoons-style.html`; that name is the same direction after the folder move.

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

**Reordered 2026-10-01 (client homepage review — see KB §24, `design.md` §3).** The old order
(mosaic of 11 tiles → persona door → founders → software → filmstrip → Offerings → AI → careers) is
replaced. Beats renumber after the opening.

| # | Section | Intent | What's on screen | Status |
|---|---------|--------|------------------|--------|
| 1 | **Header** | Sparse chrome; primary CTA | Logo, "Menu" (overlay toggle), "Explore vertical solutions" pill | Built |
| 2 | **Opening** | Beat **01 — The model**: **Axis A (Portfolio) → grow morph → Axis B (Growth engine)**. Axis A carries identity/ownership; Axis B carries the growth model (software-first) | Axis A = mosaic **H1** ("Whatever the industry, we own the software it runs on.") + kicker + **one identity/scale visual** (a centered media block; **no 11 floating tiles** — removed 2026-10-01) = what Fullsteam owns. Scrolling the pin **grows that visual into the full-bleed hero** = Axis B: audience kicker + **"Software first. Then we grow it."** + the Offerings sub-line. **The transition is interpolated — clip-path + opacity, no CSS transition.** Reduced-motion: in-flow mosaic then settled hero (sequence kept, morph skipped). | Built |
| 3 | **What we do** | Beat **02** — answer "What does Fullsteam do?" | H2 "What does Fullsteam do?" + lede (**systems of record** with **AI, payments, operational excellence**). Three steps: **Acquire** (we buy + keep buying) → **Grow/Build** (AI + payments; links to Offerings) → **Lead** (our software powers industries; links to Vertical Software). Then a banded **founder CTA** ("A home for the business you built.") and the **founder voice** quote. | Built |
| 4 | **Impressive stats** | Scale, for investors (`#investors`) | Dark band cycling/count-up: **11** vertical markets · **100+** specialty software businesses · **2,000+** people · **$75B+** processed on Fullsteam Pay* (`[placeholder]` pending OI-5) + a placeholder note. | Built |
| 5 | **Verticals** | Beat **03** — moved up; the client-liked filmstrip | Square filmstrip: five revenue-ordered panels with a featured overlay (KPI **cycles** 11 / 100+ / 2,000+); all 11 verticals as text links. | Built |
| 6 | **AI** | Beat **04** — use cases first | H2 use-case headline + lede; three **example cards** (forecasting, back-office, support); link to AI at Fullsteam. Never a headcount story. | Built |
| 7 | **Great place to work** | Beat **05** — humanize the company | H2 "A great place to work." + three **real-image placeholders** captioned **"Real team photo — not stock"**; "See Careers." Then the LinkedIn lo-fi strip. | Built |
| 8 | **Closing CTA** | Explore, founders as coda | Beat **06**. "Ready to see where your business can go next?" Primary CTA + quiet For Founders. | Built |
| 9 | **Footer** | Utility + full tree recovery | Company / Explore / Connect / Legal columns | Built |

**Removed 2026-10-01 (homepage only):** the persona door ("Find the part that is for you"), the two-up
"who we are," the **Software** scene (old 04), and the **Offerings** scene (old 05). **Kept:** the
opening's Axis A/B two-state model, the founder voice, the filmstrip, the stats, the LinkedIn strip,
the close, and the footer. The **Embedded Offerings page + nav node stay** (sitemap lock).

### Deliberate choices in this wireframe

- **Primary CTA** appears in header, hero, and closing — always
  **"Explore our vertical solutions"** (full form); header uses the short form
  "Explore vertical solutions."
- **"Embedded Offerings"** is the axis label (client-preferred; short form "Offerings" in body copy; never "Platform").
- **Verticals** appear as the **filmstrip** (five revenue-ordered panels + all 11 as text links) —
  Square's "seamless verticals," without brand logos. The client **likes this treatment**, so it is
  kept (and moved up after "What we do"). (Hero marquee removed 2026-09-23; the 11 vertical tiles
  left the opening 2026-10-01.)
- **Menu overlay = the sitemap at L1**, with a note that the finder is here (not a
  header search field).
- **Metrics** sit in the **impressive-stats band** (`#investors`) with `[placeholder]`
  figures — same numbers for every visitor, not a founders/investors split. **For investors**
  is an in-page anchor to that band, never a page or a nav node. (The persona door was removed
  2026-10-01.)
- **For Founders** lives in the Menu overlay, footer, the **What we do** founder CTA (`#founders`),
  and a quiet close link — not in header chrome. The scroll is: what we do (+ founder CTA & stats) →
  verticals → AI → people joining → close.
- **The first viewport is a two-state sequence (2026-09-24; Axis A amended 2026-10-01):**
  **Axis A (Portfolio) → grow morph → Axis B (Growth engine)**. Axis A's mosaic H1 carries
  identity/ownership; Axis B's hero H2 carries the **growth model** — deliberately not the same
  claim (the deck's "operating system for vertical markets" line is retired from the hero, G-8).
  The two kickers echo on purpose: mosaic = audience, hero = audience + validation clause.
  **Axis A carries one identity/scale visual, not the 11 tiles** (client: "do not want 11 floating
  vertical bubbles"); the 11 verticals live in the filmstrip.
- **The transition is the grow morph (restored 2026-09-24; source changed 2026-10-01):** scrolling
  the pin **grows the Axis A visual into the hero** (before 2026-10-01, the Retail tile `t3`) — an
  interpolated clip-path traced per frame from the visual's live rect plus opacity ramps. **No CSS
  transition on either state**, so the per-frame writes cannot smear (the jitter the same-day
  binary-snap interim fixed came from adding transitions, not from the grow). The client read the
  interim discrete cut as "just snapping in place," so the morph is the rule; a hard cut is a
  strategy change, not a polish pass.
- **Both states are content:** neither is `aria-hidden`, so AT reads the H1 (Axis A) then the hero H2
  (Axis B) at any scroll position, and with motion reduced both states appear in flow, A above B.
  **No-JS (resolved 2026-09-26):** the pin is gated by a `has-js` class on `<html>`, so without JS
  the two states render in document order, A above B, and the morph is progressive enhancement.

### Known gaps & issues (do not silently fix — see open items)

- ~~**G-1** "Browse all verticals →" linked to `#founders`.~~ **Resolved
  2026-09-10:** retargeted to `#solutions`. **Moot 2026-10-01:** the Software scene (which held
  that link) was removed in the reorder; the Verticals filmstrip and the What-we-do "Lead" step now
  link to `pages/vertical-software.html`.
- ~~**G-2** Footer lists **For Investors** but the chrome does not.~~ **Resolved
  2026-09-10:** For Investors deleted from the sitemap; footer link removed.
- **G-3** Stats-band metrics use **`[placeholder]`** figures until the client confirms which
  scale/KPI signals can go on the site (OI-5). Current set: 11 / 100+ / 2,000+ / $75B+.
- ~~**G-4** **No social-proof band** (testimonials / video) despite `design.md` §4.6.~~
  **Partial:** genericized founder quote now sits in **What we do** (2026-10-01). Still unpublished;
  no video (OI-6).
- ~~**G-5** **No Our Story / Careers band**~~ **Resolved 2026-10-01:** the **Great place to work**
  section (beat 05) carries the employer story with **real-image placeholders** ("not stock") plus the
  LinkedIn strip. Careers is no longer footer-only. (Newsroom remains removed.)
- ~~**G-6** "For Founders" as chrome + feature tab.~~ **Resolved 2026-09-21
  (wireframe experiment):** founders path is overlay + close (header chrome link removed 2026-09-23); scroll is general.
- ~~**G-7** JS tabs on the feature section.~~ **Resolved 2026-09-21:** tabs removed;
  long-form stacked chapters (Bending Spoons guide).
- ~~**G-8** Hero headline "The operating system for vertical markets." is the deck
  positioning line — confirm it is the approved hero message.~~ **Resolved 2026-09-24:**
  the deck line is **retired from the hero** (it was never confirmed; its identity job is
  done better by the mosaic H1). Beat 01 now states the **growth model** — "Software first.
  Then we grow it." — under a restored **audience kicker**, with the mosaic H1 carrying
  identity/ownership. **"The growth engine" names Axis B** (the opening's second state) and beat 04
  is its proof. See `design.md` §3.1 + §4.1.
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

**Locked L1 (2026-09-10 · finalized 2026-09-14 · revised 2026-09-23):** For
Founders · **Vertical Software** · **Embedded Offerings** · Our Story · Careers.
**For Investors was deleted.** **Vertical Software is a single page** — a sticky
sidebar lists all 11 verticals and swaps the panel **inline** (no modal); **no child
pages**, no category labels. **Embedded Offerings is a single page** using the same
sticky-sidebar pattern (Payments · Lending · Insurance · AI at Fullsteam), swapped
inline. **Hardware & Integrations were dropped** as separate pages (folded into
Embedded Offerings / Payments). **AI at Fullsteam is a card/panel, not its own page.**
Under Our Story: **Leadership** (`/our-story/leadership`, leaders only).
**Newsroom was removed** (2026-09-23). **For Founders is a single-page leaf.** See
`PROJECT_KNOWLEDGE_BASE.md` §14 for the full locked tree.

`02_Wireframes/locked/sitemap.html` is the inventory of pages (L1 = pages). The header does
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

**Shared CSS is duplicated on purpose — change all 9 files, never one.** Each page
is a self-contained static file, so `.nav`, `.page-hero` / `.v-hero`, `.block`, `.lede`,
`.pill`, `.foot`, and `:root` are copied into every page. Editing one copy silently
drifts the set — that is exactly how *Vertical Software* and *Embedded Offerings* ended
up on a different type scale, and how the mobile-nav fix first missed 8 files
(changelog 2026-09-26). Before committing a chrome/type/spacing change, grep the other
files and confirm parity. A local check that catches the common case:

```
# from the repo root — every page should report the same declarations
for f in 02_Wireframes/active/homepage.html 02_Wireframes/active/pages/*.html; do
  printf '%-42s ' "$f"
  grep -oE '\.page-hero|\.v-hero-card|--chrome:[0-9]+px|line-height:1\.45' "$f" | sort -u | tr '\n' ' '
  echo
done
```

Anything present on some pages but not others is drift — decide once and apply to all.

---

## 7. Open items (decisions needed)

- **OI-1 — Final chrome pattern.** **B revised** (Logo · Menu · Explore Solutions; For Founders
  not in the strip since 2026-09-23). *Decision 2026-09-26:* B revised stands and is already applied
  to all 9 pages, so the set is a system, not a homepage trick. Only **client sign-off** remains.
- ~~**OI-2 — "For Investors" placement.**~~ **Resolved 2026-09-10: deleted.**
  No investor nav node or page; investors are served by homepage scale/proof +
  Contact. (KB §14 locked.)
- **OI-3 — Section order.** **Resolved 2026-10-01 (client review).** Order is now: Opening →
  **What we do** (Acquire/Grow/Lead + founder CTA + impressive stats) → **Verticals** filmstrip →
  **AI** → **Great place to work** → Close. The dual axis is delivered **in sequence** in the
  opening — Axis A (Portfolio) → grow morph → Axis B (Growth engine); Alternative A's side-by-side
  `.dual` lanes stay retired. `design.md` §3 + KB §24 record it. **Remaining:** client sign-off.
- **OI-4 — AI homepage treatment.** **Resolved 2026-10-01:** AI gets its **own homepage section**
  (beat 04) with **example use cases**, replacing the old Software + Offerings scenes. The dedicated
  AI page stays **under Embedded Offerings** (KB §14).
- **OI-5 — Stat / proof strategy.** Current: the **impressive-stats band** (`#investors`) + the
  filmstrip **KPI cycle**, both cycling **placeholders (11 / 100+ / 2,000+ / $75B+)**. V2/Cloudmellow
  supply a real,
  marketing-authored set — **70,000+ customers · $75B+ processed on Fullsteam Pay · 480M+
  transactions · 2,000+ employees · 100+ businesses** (KB §22.5) — so this becomes a copy
  swap, not an invention. **Half resolved 2026-09-26:** the **vertical count is settled at 11**
  — the locked IA carries 11 tiles and 11 tabs, so the site states 11, not V2's "13+ industries."
  **Still open:** the **customer count** (placeholder 80k+ vs V2's 70,000+) and **publishability**
  (§20.7 / G-3; the "*cumulative totals" asterisk must ride along with $75B / 480M). Do not patch
  the cycle until the customer figure and publishability are settled (KB §22.6.2).
- **OI-6 — Social proof & video.** *Decision 2026-09-26:* hold. The genericized founder quote
  stays; no testimonials or mission video until the client supplies assets (G-4).
- **OI-7 — Careers/company band.** **Resolved 2026-10-01:** the **"Great place to work"** section
  (beat 05) carries the employer story with **real-image placeholders** + the LinkedIn strip (G-5).
  Still needs the real photos (not stock) and the ~15% allocation content.
- ~~**OI-8 — Feature interaction.**~~ **Wireframe experiment 2026-09-21:** JS tabs
  removed in favor of stacked long-form. Confirm with client.
- **OI-9 — How far the grow morph reaches.** Decided 2026-09-24 for the **opening only**
  (Axis A → Axis B; `design.md` §3.1; canonical record **KB §23**). Two readings stay open: (a) the whole page is **two acts**
  with a hard boundary mid-scroll (portfolio act → growth act); (b) the opening *scroll*-snaps to
  each state (`scroll-snap`). (b) is deliberately **not** built — page-wide mandatory snap
  fights long-form reading and traps keyboard/AT users; if wanted it must be opt-in and pin-scoped.
  Two build caveats: **(i) no-JS — RESOLVED 2026-09-26.** The pin is now gated by a `has-js` class
  on `<html>`, so without JS the two states render in document order (A above B) and Axis B is never
  stranded hidden. **(ii) first frame** — the hero background is a lo-fi placeholder today, so the
  morph starts from a flat visual, but with real artwork the Axis B frame must be preloaded or the
  morph's early frames expose an empty state.
- **OI-10 — Homepage reorder (client review 2026-10-01).** **Applied to the wireframe; awaiting
  client sign-off.** The client asked for: a more impressive landing, no 11 floating bubbles, a
  "What does Fullsteam do?" breakout (Acquire → Grow/Build → Lead + founder CTA + stats), the
  filmstrip moved up, the Software + Offerings scenes replaced by AI, and a humanized Great place to
  work. Applied per KB **§24** / `design.md` §3. **Open:** (a) the **opening visual's treatment**
  ("design/animation TBD") and whether it becomes video; (b) **founder-CTA placement** (applied
  after the triad; the client listed it after Acquire); (c) whether to **spotlight the marquee
  backers** (Aquiline / Sixth Street / ADIA) as an "impressive" signal; (d) client sign-off on
  replacing Axis A's tiles.
- **Legal pages (Privacy / Terms / Complaints).** *Decision 2026-09-26:* remain footer labels
  only. They are outside the content-writing scope and require client-supplied legal copy; not
  built as pages.

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
| 2026-09-23 | Combined Square + Localyzer **structure** (G1–G8): audience kicker on the grown hero; 3-up allowlisted proof strip under the pin (no logos); beat 06 KPI **cycle** (11 / 80k+ / 2,000+); genericized founder quote; Newsroom 4-up filmstrip. No demo CTAs. `design.md` not edited. |
| 2026-09-23 | Opening mosaic: headline **above** the tiles; **11 image tiles**, one per vertical, **title inside each block**. Doodles removed. `design.md` not edited. |
| 2026-09-23 | Mosaic tiles return to **scattered positions** (not a grid). Labels kept. |
| 2026-09-23 | Mosaic headline **30% larger** (`clamp(28px,4.16vw,47px)`), **200px** top/bottom margin. Tiles sit lower and can hang **off-canvas**. `design.md` not edited. |
| 2026-09-23 | Mosaic opening: **Localyzer-style centered stack** (small uppercase kicker + oversized headline + one-line sub); ~200px margin on the block. Tiles unchanged. `design.md` not edited. |
| 2026-09-23 | Mosaic display split: medium lead “Whatever the industry,” + **much larger H1** “we own the software it runs on.” Kicker, sub, 200px block margin, Helvetica black-on-white, scattered tiles kept. Grown hero heading demoted to **h2** so the mosaic is the document H1. `design.md` not edited. |
| 2026-09-23 | Mosaic H1 one size: both lines (“Whatever the industry,” / “we own the software it runs on.”) share the large Helvetica black display; kicker stays smaller. `design.md` not edited. |
| 2026-09-23 | Mosaic H1 **5% smaller**: `clamp(40px,6.4vw,72px)` → `clamp(38px,6.08vw,68.4px)`. Both lines still one size. `design.md` not edited. |
| 2026-09-23 | Mosaic H1 wrap: non-breaking spaces on “runs on.”; `.mosaic-head` **960px → 1200px** so the second line stays one line. Type size unchanged. `design.md` not edited. |
| 2026-09-23 | Mosaic opening stack **150px higher**: `.mosaic-head` margin **200px → 50px**. Sticky chrome unchanged. `design.md` not edited. |
| 2026-09-23 | Hero reveal: after the mosaic (headline + scattered tiles), the full-screen hero **slides up from the bottom** of the sticky pin. Replaces grow/clip-path over the mosaic. Mosaic H1, chrome, and lo-fi skin unchanged. `design.md` not edited. |
| 2026-09-23 | **Mobile hero split (≤768px):** stacked opening — readable H1, 2-col vertical tiles on canvas, then full-bleed hero in document flow. Desktop keeps mosaic scatter + bottom-slide pin. Reduced-motion: no pin/scatter. Header chrome stays Logo · Menu · Explore. `design.md` not edited. |
| 2026-09-23 | Mobile mosaic tiles become **full-width tabs** (label + small placeholder), stacked 1-col. Desktop scatter unchanged. `design.md` not edited. |
| 2026-09-23 | **Newsroom removed** from sitemap and prototype (Menu, footer, homepage filmstrip). Our Story child is **Leadership** only. Desktop hero: **Retail tile grows** into the full-bleed stage (clip-path from the tile). Mobile still stacked tabs + in-flow hero. `design.md` not edited. |
| 2026-09-23 | Mobile mosaic: **tabs removed**. Tiles stay a centered scatter like desktop, **slightly smaller** (`32vw`). Retail grow-hero pin runs on **all breakpoints**; reduced-motion still skips the pin. `design.md` not edited. |
| 2026-09-23 | Mobile mosaic: **one overlapping cluster** filling the lower half (all 11 tiles, some overflow the sides). No separate bottom pile; grow-hero still on all breakpoints. `design.md` not edited. |
| 2026-09-23 | Mobile mosaic: tiles **staggered vertically** below the headline (not a tight bottom pile) with **mixed `--tile-op`**. Grow-hero multiplies `--tile-op` so the mix survives scroll. `design.md` not edited. |
| 2026-09-23 | Newsroom cleanup completed: removed the last **"Press / media kit"** footer link (Connect column). Reconciled `design.md` §4.9 — dropped the stale Newsroom content need so the design track matches the locked sitemap (Our Story child is **Leadership** only). Sitemap tree itself unchanged (Newsroom already absent). |
| 2026-09-24 | **Beat 01 hero copy decided — the growth-model variant (called "Axis B" in review), corrected.** The deck line "The operating system for vertical markets." is **retired from the hero**; the mosaic H1 keeps identity/ownership and the grown hero states the **growth model** — "Software first. Then we grow it." — under a restored **audience kicker**, with the Offerings sub-line beneath. The uncommitted draft copy (markup ids `axis-b-*`, now removed) is replaced. Closes **G-8**; `design.md` §4.1/§4.2 reconciled to match; KB **§22** (V2 strategic messaging architecture) distilled. |
| 2026-09-24 | ⚠️ **Superseded the same day — see the 2026-09-26 row: the transition is the grow morph, not a cut.** Original entry: **Homepage strategy recorded: Axis A (Portfolio) → binary snap → Axis B (Growth engine).** The locked two-axis model (KB §14: portfolio + growth engine) is delivered on the homepage **in sequence**, not side by side — Alternative A's parallel `.dual` lanes are retired for the live build (OI-3 partly resolved). **Axis A = the portfolio mosaic** (H1 identity/ownership + 11 tiles); **Axis B = the growth engine hero** ("Software first. Then we grow it." + Offerings sub-line). **The snap is a mechanism, not a metaphor:** the pinned opening now holds exactly **two states** and cuts at **one threshold** (50% of the pin; 45% to snap back) with **no interpolation, no easing, no CSS transition** — the grow-the-Retail-tile morph (clip-path traced per frame from the tile rect + opacity ramps) is **removed**, which fixes the smear/jitter where those per-frame writes met the 0.1s transitions at the pin edge. JS now flips one class each way (`is-hidden` / `is-axis-b`); the states are declared in CSS. Corrects the previous row's naming clause: **"the growth engine" names Axis B** (the axis, named in the opening) and **beat 04 is its proof**. A11y: neither state is `aria-hidden` (AT reads Axis A then Axis B at any scroll position); reduced-motion skips the pin and shows A above B in flow. `design.md` §3.1 (new) + §4.1/§4.2 reconciled; KB §14/§19.1 updated. |
| 2026-09-24 | **Scroll after the persona door reordered to the V2 narrative:** founders (home + quote) → software + verticals film → Offerings then AI → short people-joining beat (`#careers`) → close. Axis A/B opening unchanged. Body paragraph prose greeked (Greek-script placeholders); headlines, beats, nav, buttons, and persona labels stay English. |
| 2026-09-24 | **Beat 02 is the persona door.** Same side-card layout under the proof strip, now one card each for founders (`#founders`), people joining (`#careers`), and investors (`#investors`). Center: "Find the part that is for you." Hero text links removed; hero keeps the single Explore pill. |
| 2026-09-24 | Beat 02: founders side card removed; center lorem replaced by **For founders** pill (`href="#founders"`, sticky offset like `#investors`). Left keeps people-joining; right keeps investors. Modest left/right orbit parallax (off under `prefers-reduced-motion`). |
| 2026-09-24 | LinkedIn lo-fi module (label + 3 fake posts + Follow pill) inserted above beat 07 close; not a live embed. Close section drops the **For investors** text link (proof strip + orbit investor card kept). |
| 2026-09-24 | LinkedIn module → horizontal scroll strip of 10 lo-fi cards (avatar + lorem + date); label + Follow pill kept above beat 07. |
| 2026-09-24 | **For investors is an anchor, not a page.** Hero ghost link and the beat 07 close jump to `#investors` on the existing proof strip (labeled "For investors"). No nav node, no footer item, no new page — same lock as 2026-09-10. `design.md` §4.7 notes the anchor. |
| 2026-09-24 | **V2 messaging source re-verified against the docx + its Word comments.** The **Strategic Alignment Matrix is unratified** — the file carries an open author comment (Marian Ladenburg, 2026-09-23) saying it can be left in or cut, and it was AI-drafted ("Gemini threw it in") — so KB **§22.1 quarantines it** instead of citing it as a source; the matrix's real cell text is now transcribed there with the caveat. V2's number set recorded against **OI-5** (70,000+ customers / $75B+ processed / 480M+ transactions / 2,000+ employees / 100+ businesses), including the **11 verticals vs 13+ industries** conflict, the **80k+ vs 70,000+** placeholder mismatch, and "100+" reused four ways. Two matrix lines flagged as unshippable (a financial forecast; payments-first framing). **No wireframe structure changed** — `design.md` not edited. |
| 2026-09-24 | Beat 02 `#story` pin: ~220vh runway + sticky orbit so left/right persona cards parallax visibly; reduced-motion skips pin + motion. |
| 2026-09-24 | Proof strip (`#investors`) moved below Beat 02; investor card says numbers are below; count-up + scale/fade on enter (reduced-motion: final nums, no motion). |
| 2026-09-24 | Homepage: “AI at Fullsteam” callout (label + lorem + pill → `#ai`) sits inside `#solutions .scene-copy` under “Browse all verticals” and inside `#offerings .scene-copy` under “See all Offerings” — same bordered-box markup; no sibling between sections. |
| 2026-09-24 | Axis B hero CTAs: ghost **Careers** text link (`#careers`, beat 06) beside the Explore pill. |
| 2026-09-24 | Beat 06 `#careers`: added `is-flip` so image is left, copy right (matches `#offerings`). |
| 2026-09-25 | **Interior page wireframes.** For Founders, FAQ, Vertical Software (sidebar + 11 tabs + type-ahead), Embedded Offerings (Payments / Lending / Insurance / AI tabs), Our Story, Leadership, Careers, and Contact. Same low-fi skin and Option B chrome as the homepage. Homepage Menu, footer, primary Explore CTAs, filmstrip, and “see all” links now open those pages. In-page homepage story anchors stay on the homepage. Privacy, Terms, and Complaints are still unbuilt (content exclusions). `design.md` not edited. |
| 2026-09-25 | Vertical Software: removed the find-your-vertical search field. The sidebar is the list of 11 tabs only. |
| 2026-09-25 | Vertical Software hero: “Read the story” scrolls to the active vertical’s headline. |
| 2026-09-25 | Vertical Software picker: the sticky sidebar is a grid of 11 name tiles. The selected tile is yellow. The story opens full width underneath. Hash still selects the tile. |
| 2026-09-25 | Vertical Software story opens in a window. Arrows and a swipe move through all 11. On a narrow screen the window fills the page and Previous / Next sit at the bottom. |
| 2026-09-25 | Vertical Software: hero image placeholder removed. Name tiles are taller gray image fields with the name overlaid; hover lifts the tile; the open tile stays yellow. |
| 2026-09-25 | Embedded Offerings matches the Vertical Software pattern. Sticky list replaced with four name tiles (Payments, Lending, Insurance, AI at Fullsteam). A tile opens that offering’s story in a window. Arrows and a swipe move through all four. On a narrow screen the window fills the page and Previous / Next sit at the bottom. Hardware stays inside Payments. Integrations stay in the overview. |
| 2026-09-25 | **Our Story** follows the Localyzer `/about` section order, in wireframe styles: hero and CTAs, full-bleed image band, KPI-label proof strip (no figures), split intro with a staggered image cluster, leadership teaser, chapter cards with year placeholders (no invented timeline), open-role rows, oversized close. `design.md` not edited. |
| 2026-09-25 | **Repo cleanup — paths, names, hygiene. No structural or copy change.** Renames: `pages/offerings.html` → **`pages/embedded-offerings.html`** (match the locked page name); `active/homepage-wireframe/homepage-v1.html` → **`active/homepage.html`** (dropped the single-file folder and the version suffix); `archive/v0.1-rough/alternative-home-a.html` → **`archive/alternative-home-a.html`** (dropped the redundant version level); `03_Design/style_guide` → `03_Design/style-guide` (kebab-case, matching the other stage dirs; the dir is empty and untracked). All `prototypes/…` doc references repointed at the real files — the folder no longer exists. Also repaired links broken by the earlier stage-dir reorg: the homepage's `../pages/` → `pages/` (it moved up a level), interior back-links to the homepage, and the `locked/` ↔ `active/` sibling cross-links in the sitemap and header wireframes. Deleted the `.cursor/plans/` mirror of `plans/` — its `sitemap-lock.md` had drifted and still described the pre-lock IA — so `plans/` is the single source of truth. Untracked `.playwright-mcp/` and `.qwen/` scratch output and added them to `.gitignore`. All HTML and markdown links verified resolving; tile→story windows and hash deep-links re-checked in a browser. `design.md` edited only to repoint dead paths. |

| 2026-09-26 | **Responsive audit — 4 fixes, no structural or copy change.** Audited all 10 published pages at 12 widths (320–1920) in a real browser. **(1) Hero headline inversion, the one real bug.** The two locked Axis A / Axis B headlines were not scaling together: `.hero-copy h2` was hard-coded to `32px` in the `max-width:900px` block and `30px` in the `max-width:768px` block, while `.mosaic-head h1` kept its `clamp()`. Result: from ~430px to 900px the Axis B (Growth engine) headline rendered *smaller* than the Axis A (Portfolio) headline — 32px vs 54.7px at 900px, a 1.7× inversion across a 540px band. That contradicts KB §23.6 rule 1, which treats the two states as sequential peers: a large second state is demoted to a caption. Fixed by deleting the 900px override and replacing the 768px one with `clamp(25px, 7vw, 38px)`, mirroring the h1's mobile clamp. B/A now holds a steady 0.95–0.99 at every width, 0 inversions across 14 widths. **(2) Portal 320px overflow.** `.link-grid` used `minmax(300px, 1fr)` inside a container with 24px side padding, so the 300px floor forced a 348px box and overflowed a 320px viewport by 14px. Changed to `minmax(min(300px, 100%), 1fr)`. **(3) Portal tap targets.** The nine wireframe links were 21px tall, under the 24px WCAG 2.2 AA floor (2.5.8) — and they are the portal's primary navigation. Added `padding: 4px 0`. All portal links now ≥24px. **(4) Vertical Software tab clip.** At 320px the 2-up tab grid leaves ~101px of content width and "Transportation" is a single unbreakable word, so it overflowed its button by 3px and was cut by `overflow:hidden`. Added a `max-width:380px` block tightening the tab well to `padding:16px 12px; font-size:14px`. **Corrections to the audit itself, recorded because both were wrong:** the homepage mosaic tiles are 113×113px — excellent targets; the 19px anchors first reported as "mosaic labels" are the footer's `aria-label="Verticals"` lists, not the tiles. The `.hero-sticky` 338px-vs-320px reading is not clipped text either: the h1 sits at 296px with 12px to spare, and the overflow is two mosaic tiles deliberately bled off-edge by `right:-10%` / `left:-8%` in the ≤768 block. The one cosmetic residue is the "Wine" tile label cut by 10px at 320px, which is a consequence of that intentional bleed and was left alone rather than alter locked mosaic composition. Also noted: the interior pages ship one breakpoint (900px) against the homepage's two, and the footer/utility link lists sit at 19–21px — both left as-is, the first because nothing breaks and the second because dense link lists are a debatable AA question. `design.md` not edited. |

| 2026-09-26 | **Design-consistency pass — 2 outlier subpages + chrome. No structural or copy change.** Audited by diffing every shared CSS rule across the homepage and all 8 subpages, aliasing the tile pages' `.v-hero*` hooks onto `.page-hero` so the two systems actually pair up instead of hiding behind different selector names. **(1) Two of the eight subpages had drifted off the design.** Vertical Software and Embedded Offerings used `.v-hero`, and it had grown its own type scale: H1 `clamp(40px,5vw,68px)` / weight 800 / `line-height:.95` / `letter-spacing:-.035em` / `max-width:22ch` / centered, against the six `.page-hero` pages' `clamp(36px,5vw,56px)` / 700 / 1.05 / `-.03em` / `16ch` / left. Their hero also had `padding:48px 0 28px` with no bottom rule against the standard `64px 0 48px` with one, and a `.v-hero .lede` override (higher specificity than the shared `.lede`) forcing 20px/42ch centered instead of the shared 18px/46ch. Separately their `.block` ran `padding:40px 0 80px` against `64px 0` everywhere else, so the section rhythm differed too. Both pages now use the standard scale and the shared `.lede`; the `.v-hero .lede` override is deleted rather than restated. Contained structure (no hero image), the name tiles, the story window, and the arrows/swipe are untouched. **(2) Header chrome measured differently on every page.** The 8 subpages set `body{line-height:1.45}` and the homepage did not, so the header rendered 59px on the homepage against 62px inside — and the pinned hero was already sitting at a hard-coded `57px` offset, 2px above where it belonged. Added `line-height:1.45` to the homepage's `.nav` only, **not** to `body`: a body-level change would reflow the locked Axis A/B pinned hero, which is out of scope here. Header is now 61.8px on all 9 pages. The six hard-coded `57px` offsets are replaced by a new `--chrome:62px` token so chrome changes cannot go stale silently; the pinned hero now seats at top 62 against a header bottom of 61.8 — a 0.2px seam where there was a 2px gap. Pin and unpin verified intact. **(3) The mobile nav fix had only ever been applied to the homepage.** The homepage's `max-width:768px` block gives the nav `white-space:nowrap`, `.menu-btn{flex-shrink:0}`, and `.nav-right{min-width:0;flex:1}`; the 8 subpages never received them, so at 320px the Explore CTA wrapped onto two lines and the header measured 71.8px against the homepage's 55.8. Added the same three rules to the subpages' `max-width:900px` block. Header is now 55.8px on all 9 pages at ≤768. **Verification:** 9 pages × 13 widths (320–1920), zero document overflow anywhere; H1 identical across all 8 subpages at every width (36 / 38.4 / 45 / 51.2 / 56px, weight 700, `line-height` 1.05); hero type, spacing, and color properties byte-identical, with the H1 and lede measuring identically (left 104, widths 498.2 / 460.4 at 1280). **Three things deliberately left alone, recorded so they are not mistaken for oversights.** (a) The homepage breaks at 768px and the subpages at 900px, so in the 769–900 band the header is 61.8px inside and 55.8px on the homepage. Aligning it would mean moving the homepage's `max-width:768px` block, which contains the entire locked mosaic layout (`.mosaic`, `.mosaic-head`, `.t1`–`.t11`, `.hero-copy`) — that is the Axis A opening, and repointing its breakpoint is a strategy decision, not a consistency pass. (b) `.facts` keeps `grid-column:1 / -1` on the two tile pages; the fact chips sit inside their 2-column panel grid and need to span, and the declaration is already scoped to just those two files. (c) `.tabs` is a genuinely different component on the tile pages — an 11-up / 4-up name-tile grid — against the standard pages' scrollable sidebar list. That is the documented structure from 2026-09-25, not drift. `design.md` not edited; it documents no hero type scale. |

| 2026-09-26 | **Vertical label unified: “Associations” → “Association Management”.** One vertical had two names. The homepage called it **Associations** in three places — the Menu overlay, the Axis A mosaic tile (`t10`), and the grow-verticals list under the filmstrip — while the Vertical Software page, all 8 subpage menus, the locked `sitemap.html`, and the content draft (`04_Content/vertical-software.md`) all call it **Association Management**. Aligned the homepage’s three occurrences to the canonical long form, and the four in `header-wireframe.html` (the three option overlays plus the rejected Option 0 legacy bar — that file’s own copy says its labels must match `sitemap.html`). Left `PROJECT_KNOWLEDGE_BASE.md` §“Current site structure (as-is)” as `Associations` on purpose: it records the live-site crawl for migration mapping, not the locked name, and the locked list below it already reads `Association Management`. Verified the longer label fits both renderings: 125.9px wide inside a 145.9px mosaic tile at 1280, and 101px inside a 117px tile at 390, with zero horizontal page overflow. A full sweep of all 11 vertical names across the homepage and 8 subpages found no other drift. `design.md` not edited. |

| 2026-09-26 | **Homepage transition reconciled — the opening is the grow morph, not the binary snap.** The docs had split from the build. `homepage.html` has only ever run the **grow morph** (the Retail tile `t3` grows into the hero; per-frame `clip-path` + opacity ramps; its own comment says "restored 2026-09-24 at the client's request"), and `AGENTS.md`'s opening bullet + same-day amendment agree — but `design.md` §3.1/§4.1, KB **§23/§23.6** ("do not re-introduce interpolation"), and this file all still mandated the **binary snap** and called the morph removed. An agent following the canonical docs would have deleted the client-requested transition. **Decision:** the grow morph is current; the binary snap was the same-day interim the client rejected as "just snapping in place." Reconciled `design.md` §3.1 (heading + both transition bullets) and §4.1, KB §23 (§23.1, §23.2, §23.3, §23.5 vocabulary, §23.6 guardrail 1), and `AGENTS.md`. The two states, the two headlines, the Axis A→B order, both-states-are-content, and reduced-motion flow are unchanged. The 2026-09-24 rows here and in KB are kept and marked superseded. Also fixed in the build: the morph's scroll math still used a hard-coded `57` (now reads the pinned frame's own top) and `--chrome` was a single 62px value while the ≤768 bar is 56px (added a mobile `:root` override) — the seam is now 0.2px at every breakpoint. `design.md` edited (it is the spec of record). |
| 2026-09-26 | **Autonomous decisions pass.** (a) **No-JS hero — fixed.** The Axis A/B pin is gated by a `has-js` class on `<html>`; with JS off the two states render in document order (A above B) instead of stranding Axis B hidden (`.hero` defaults to `opacity:0; clip-path:inset(100% 0 0 0)`). Resolves the OI-9 no-JS caveat. (b) **Vertical count settled at 11** — the locked IA carries 11 tiles and 11 tabs, so the site states 11; only the **customer count** (80k+ vs V2's 70,000+) and proof **publishability** remain open under OI-5. (c) **Chrome stays B revised** (already on every page) pending client sign-off; no code change. (d) **Legal pages** (Privacy / Terms / Complaints) stay footer labels — outside content scope, client-supplied copy. (e) **OI-6 social proof / video** and **OI-7 careers band** unchanged — no assets exist to add. (f) **Repo/public-docs posture:** kept public (the Pages review site depends on it). The client-doc leak at old SHA `33c60f5` — **5 files still return 200, re-verified 2026-09-26** — is recorded with a drafted GitHub Support purge request in KB §22.7; the support request and any repo-visibility change need the owner's GitHub access, not the repo. No structural or copy change. |
| 2026-09-26 | **Placeholders made unmistakable + copy handoff added.** The proof strip's figures read close to final in review, so the two undecided ones now read `[placeholder]` (the settled 11 stays untagged) and a dashed `.proof-note` says they are for layout only and pending verification. The KPI cycle's `vertical markets [verify]` tag was dropped (the 11 count is settled) and its two figures now read `[placeholder]`; no `[verify]` remains anywhere. Added **`content-slots.md`** at the repo root — a slot-by-slot inventory of every place copy goes across the homepage, the 7 subpages, and the shared chrome, each marked **Locked / Draft / Placeholder** with the constraint it must respect, plus the cross-cutting rules from KB §20–§22. It is the handoff to the content team (the wireframes show structure only) and is excluded from the Pages allowlist. Referenced from `AGENTS.md` and this file's header. |
| 2026-10-01 | **Homepage reordered from client review — Axis A replaced, page rebuilt (KB §24).** Client feedback: make the landing feel *more impressive* (scale, modern tech/AI, US/Canada reach); **"do not want 11 floating vertical bubbles"**; animation on scroll is fine. **Opening:** keep the locked **Axis A → grow morph → Axis B** model, but **Axis A is now one identity/scale visual** instead of the 11 scattered tiles; the grow morph's source is that visual (was the Retail tile `t3`). The two headlines, A→B order, both-states-are-content, and reduced-motion/no-JS flow are unchanged. **Page order:** removed the persona door, the two-up "who we are," the **Software** scene (old 04), and the **Offerings** scene (old 05); added **02 What we do** ("What does Fullsteam do?" — Acquire / Grow-Build (AI + payments) / Lead + founder CTA + founder voice), the **impressive-stats band** (`#investors`; 11 / 100+ / 2,000+ / $75B+ placeholders), **03 Verticals** (filmstrip moved up; the client-liked treatment kept), **04 AI** (use cases/examples first; replaces Offerings on the homepage), **05 Great place to work** (real-image placeholders, "not stock," + LinkedIn), **06 Close**. The **Embedded Offerings page + nav node stay** (sitemap lock). Reconciled `design.md` §3/§3.1/§4/§8, `content-slots.md` §2, KB (amended §23; added §24 + §25 for the new Cloudmellow *Strategic Positioning 2026* deck), and `AGENTS.md`. Verified in-browser at 1440 and 390 (desktop + mobile), reduced-motion flow, and a JS-disabled context (A above B). |
| 2026-10-01 | **Embedded Offerings rebuilt as a horizontal filmstrip (white bg).** The page no longer uses the name-tile grid + centered story modal. It now mirrors the homepage's "03 — The verticals / Keep the businesses growing" section: a horizontally scrolling row of cards, one featured, clicked to open — on a **white background** (homepage §03 is ink). The offering stories that lived in the modal now live in each card's featured panel (title + prose + three fact chips). Keyboard (Enter/Space), `hashchange`/deep-link (`#payments`…), and card-centering on select are supported; reduced-motion skips the smooth scroll. Structure/IA unchanged — still one page, four offerings, no child pages, AI a card. Reconciled `AGENTS.md`, KB §14, §24.6, `content-slots.md` §6. Verified 1440 + 390: no page overflow, film scrolls, hash selects, zero console errors. |
| 2026-10-01 | **Embedded Offerings — offering tabs under the lede.** Four bordered tabs (Payments, Lending, Insurance, AI at Fullsteam) sit directly under the hero lede so visitors see what is on the page before they scroll the filmstrip. Tabs stay in sync with the featured card and deep links; arrow keys move focus across the tab row. `design.md` not edited. |
| 2026-10-01 | **Our Story — close band simplified.** Removed the duplicate stacked "A home for your business" line in the close. Dropped the in-page open-role rows (listings live on Workday). `design.md` not edited. |
| 2026-10-01 | **Menu — Open roles → Workday.** Every Menu overlay "Open roles" link now opens Fullsteam's external job search (`fullsteam.wd1.myworkdayjobs.com/External`) in a new tab. The Careers page keeps culture beats; listings are on Workday only. |
| 2026-10-01 | **Careers — open roles → Workday CTA.** Removed the placeholder role table from `#roles`. Beat 03 is now a lede + yellow **See open roles** pill to the same Workday URL (new tab). |
| 2026-10-01 | **Contact — FAQ callout.** Tan band between hero and form points founders to `faq.html` (Read the FAQ pill + hero jump). `design.md` not edited. |
| 2026-10-01 | **Footer — full tree recovery.** All nine published pages: Company adds **Open roles** (Workday, new tab); Explore adds **FAQ**. Connect and Legal unchanged. |
| 2026-10-01 | **Legal wireframes — Privacy + Terms.** Added `pages/privacy.html` and `pages/terms.html` (Option B chrome, lorem sections, dashed wireframe note). Footer Privacy/Terms links updated on homepage + all interior pages. Complaints still `#`. `design.md` not edited. |
| 2026-10-01 | **404 page.** Added `pages/404.html` (full wireframe chrome) and repo-root `404.html` for GitHub Pages (links resolve from project-site base). Pages deploy allowlist copies root `404.html`. Body lorem + recovery CTAs. |
| 2026-10-01 | **Headlines → intent, all pages.** Every content `h1/h2/h3` on the homepage and the 8 interior pages now reads as a short **`Intent:`** statement (heading tags kept), with a dashed `.anno` note beneath carrying detail, constraints, and audience. **Lens: investors primary, founders secondary** — a lens only; no IA/order change. Literal/example headline copy is retired from the wireframes; final copy lives in `content-slots.md`. The homepage's two **locked** lines are quoted inside their notes (Axis A H1, Axis B H2). First pass put the full intent into the headings; the client called it **"too much headline text,"** so headings were shortened and the detail moved to the notes. KB §25.5. |
| 2026-10-01 | **Vertical Software — sticky sidebar, inline swap, modal removed.** The 4-up name-tile grid becomes a true **sticky sidebar** (left column, list of all 11) that swaps the story **inline** in the content column. The centered story window/modal (`v-modal`, backdrop, arrows, Prev/Next bar) is **removed entirely**; hash deep links (`#retail`) and Menu links still select. Panel titles are now intent lines; the software-first story, icon collage, and four fact chips stay. |
| 2026-10-01 | **Embedded Offerings — filmstrip → same sticky sidebar.** **Overrides the same-day 2026-10-01 filmstrip decision** at the client's request. Four offerings (Payments · Lending · Insurance · AI at Fullsteam) in a **sticky sidebar** that swaps content **inline** on a white background; **no modal**. The offering tabs are removed (the sidebar is the list). Hash deep links and Menu links select. **Flag for client ratification** — it reverses a client-approved layout from earlier the same day. |

---

## 9. Interior pages (2026-09-25 · messaging pass 2026-10-01)

Same chrome on every page: Logo · Menu · Explore vertical solutions. The Menu overlay and footer reach the locked tree. Body copy is placeholder. Headlines carry the locked job of the page.

**Messaging pass (2026-10-01, "apply to all pages"):** every page now reflects the new narrative —
**system-of-record software first**, with **AI, payments, and operational excellence** built in;
**software ≈ ¾ of the business** and payments the embedded growth; **AI use cases, never headcount**;
"a home for your business," never "exit"; **real people, not stock photos**; **implied scale**
(placeholders). The sitemap is unchanged (**Embedded Offerings page + nav stay**). KB §24 / §25.

| Page | Structure |
|------|-----------|
| **For Founders** | Why Fullsteam → how it works (4 steps) → what we look for → talk to us. Hero lede states the new line (systems of record + AI/payments/operational excellence; software first). "What we look for" leads with the industry and frames the software as a system of record, AI/payments added after. Never frames the sale as an exit. |
| **FAQ** | **Eight** founder questions (was six). Adds **"What does Fullsteam actually buy?"** (system-of-record software; software ~¾) and **"Does AI replace my team?"** (no — use cases first, never headcount). Answers record the constraints (software before payments, brands stay, no announcement at close). |
| **Vertical Software** | Hero states the intent (software-first; AI and payments added after the close). A **sticky sidebar** lists all 11 verticals and swaps the story **inline** — no modal, no tiles, no arrows. Each panel: title, story paragraphs, an icon collage, and **four fact chips** including **"What we add" (AI and payments)**. No category labels, no child pages, no search field. Hash deep links (`#retail`) select. |
| **Embedded Offerings** | **Sticky sidebar that swaps content inline** on a white background (2026-10-01; replaces the filmstrip). Hero states the intent: software first, then the offerings built into it — **AI, payments, lending, insurance**. The sidebar lists four offerings (Payments, Lending, Insurance, AI at Fullsteam); selecting one swaps the panel inline — **no modal, no tabs**. Payments is framed as **"invisible, embedded"**; **AI is use cases first, never a headcount story**. Hash (`#payments`…) selects. Hardware folds into Payments; integrations live here. |
| **Our Story** | Hero lede states the new line. **KPI strip now carries placeholder figures** — 100+ businesses · 2,000+ people · 70,000+ customers · $75B+ on Fullsteam Pay* (all `[placeholder]`, no revenue/run-rate/profitability). Adds a **marquee-backers** line (Aquiline · Sixth Street · ADIA) as a trust signal pending publishability, and a **real-imagery** note. Chapter cards unchanged (`Year [placeholder]`, no invented timeline). Localyzer-style close: one oversized "A home for your business" line, lede, Explore + Contact. No in-page open-role rows (Careers page only). Links to Leadership and Embedded Offerings. |
| **Leadership** | Six placeholder leader cards. Leaders only. **Real portraits, not stock.** |
| **Careers** | Hero carries **2,000+ people across 11 verticals**. How it feels → who thrives → **open roles CTA** (yellow pill to Workday; no in-page job table). **Real employee imagery, not stock.** AI is never a replacing-the-team story. |
| **Contact** | Conversation form. Reasons: software business, work here, something else. No investor page and no investor option. **Tan FAQ callout** (beat + H2 + pill to `faq.html`) between hero and form; hero jumps include FAQ for founders. |

**Privacy** and **Terms** are wireframe utility pages (`pages/privacy.html`, `pages/terms.html`) with lorem body copy until client legal supplies final text. **Complaints** stays a footer label only (no page yet).
