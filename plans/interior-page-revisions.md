# Interior pages — revisions

> **Status:** wireframe track · internal · **not promoted**.
> **Source of intent:** client review **2026-10-28**; applied to the wireframes **2026-10-30**.
> **Scope:** the five interior pages called out in that review, the shared chrome on every page,
> and the Figma board. Copy is still placeholder; every content `h1/h2/h3` stays an `Intent:`
> statement, per the 2026-10-01 convention (`wireframes.md` §9).
>
> Only the homepage has a client-facing high-fidelity build
> ([`03_Design/client-review/homepage/`](../03_Design/client-review/homepage/design-notes.md)).
> Nothing here creates an equivalent folder — these pages remain wireframes.

## At a glance

| Page | File | Revision |
|---|---|---|
| Vertical Software | `02_Wireframes/active/pages/vertical-software.html` | New hero; one flowing panel shape; operational advantages removed |
| Our Advantage | `02_Wireframes/active/pages/our-advantage.html` | Three-group / seven-panel sidebar; Payments and AI expanded |
| Our Story | `02_Wireframes/active/pages/our-story.html` | Acquire / Grow / Lead hero; Leadership embedded as section 03 |
| Acquisitions | `02_Wireframes/active/pages/for-founders.html` | Featured + three videos; lead form replaced by CTA + mailbox |
| Careers | `02_Wireframes/active/pages/careers.html` | Our Values, three testimonials, LinkedIn directly under Open Roles |
| Leadership | ~~`pages/leadership.html`~~ | **Deleted** — folded into Our Story |

## Vertical Software

**Goal:** lead with software, and read as one story rather than a card stack.

- Hero: the "software first / not a horizontal provider" intro now sits beside a **customer photo
  and two product screenshots**, so the page opens on the product, not on a claim.
- Panel template (one shape for all 11 verticals, in order): description → photo pair →
  surprising stats → business-unit logos → **customer and partner logos in their own full-bleed tan
  band** → three product screenshots.
- Hairline rules and space replace the bordered-card stack; the panel reads as a narrative.
- The template's `{{V}}` tokens now also substitute inside `figcaption`, `span` and `b`.
- Removed: **all operational-advantages content** (it lives on Our Advantage), plus the earlier
  S/M/L switcher and the acquired-business card row.
- Kept: the 11-item sticky sidebar, no category labels, no child pages, hash deep links (`#retail`).
- FAQ stays on the page.

## Our Advantage

**Goal:** every capability visible from the left navigation, swapped inline.

- Sidebar is **three groups / seven panels**, all inline swaps:
  - **Embedded Fintech** — Payments · Lending · Insurance
  - **AI at Fullsteam** — own panel; the nav wayfinder lands here
  - **Operational Excellence** — Sales & Marketing · Talent · **Peer Community**
- Payments: why embedded beats bolted-on (two-column comparison), key stats, hardware photo + text,
  optional testimonial.
- AI: Modernize / Build / Automate examples, each with its own example body, plus one video slot.
- Sales & Marketing, Talent and Peer Community each keep: intent H2 + overview → three cards → fact
  grid → photo slot → constraint `.anno`. Talent carries the optional **See open roles** CTA.
- Hashes: `#payments`, `#lending`, `#insurance`, `#ai`, `#sales-marketing`, `#talent`,
  `#peer-community`.
- Removed: the stale duplicate full-width operational-advantages block and the orphaned markup left
  from the previous layout.
- **Divergence:** this reverses the 2026-10-22 decision to place operational advantages *below* the
  Offerings block. Same content, different container — **client ratification pending**.

## Our Story

**Goal:** the narrative is the company, and leadership is part of it.

- Hero restates **Acquire / Grow / Lead** (lede + three steps). The KPI strip is unchanged.
- Company section holds the **mission/vision video slot** (Mike and Greg; no asset yet).
- Chapters follow, numbered 02.
- **Leadership is section 03**, below the chapters (`#leadership`): six cards — portrait, name,
  title, short bio slot — mirroring the current public leadership page. Leaders only, no staff
  directory, no invented names or bios.
- Removed: the Leadership teaser card, and the standalone `pages/leadership.html`.
- All Leadership links point at `our-story.html#leadership`; the section carries
  `scroll-margin-top:84px` so the sticky header does not cover it.

## Acquisitions

**Goal:** reassure the founder, then hand off without a form.

- Why Fullsteam: **one featured video slot plus three more**, each with its own caption below.
- How it works: the four-step list is unchanged (we talk → test the fit → certainty of close →
  continuity after close).
- What we look for: unchanged; still leads with industry, not an acquisition count.
- Close: **Explore more** (→ `contact.html`) plus a generic **`acquisitions@fullsteam.com`**
  mailto. **The lead form is gone.**
- FAQ stays inline on the page; questions unchanged.
- Never frames the sale as an "exit".

## Careers

**Goal:** prove the culture with voices, and hand off to the live job board.

Band order:

1. **01 — How it feels** (copy left, image right)
2. **02 — Who thrives**, now carrying **Our Values** — six placeholder slots, explicitly *not* a
   draft list; final wording needs leadership confirmation
3. **03 — Testimonials** — three voices in story order: **the founder** (sold the business), **the
   founder who stayed** (grew with it), **the employee** (joined normally). Genericized; no real
   names or companies until the client supplies publishable quotes
4. **04 — Open Roles**, external Workday, no in-page job table
5. **LinkedIn module** — directly below Open Roles
6. **05 — FAQ**
7. Footer

Removed: the old Culture & Connection cards (replaced by the three testimonials) and the duplicate
LinkedIn block that had been sitting further down the page.

**Note:** bands 02 and 03 are both tan and sit adjacent, separated only by the 1px rule. Deliberate —
they read as one culture chapter split in two.

## Shared chrome (every page, homepage included)

- Menu: **six flat links** — Vertical Software · Our Advantage · AI at Fullsteam · Our Story ·
  Acquisitions · Careers. **No chevrons, no accordion children.**
- `For Founders` → **Acquisitions**; `AI` → **AI at Fullsteam** (`our-advantage.html#ai`);
  `Leadership` → `our-story.html#leadership`.
- Footer Company column keeps Leadership, now pointing at the Our Story anchor.
- Repaired literal `{prefix}` hrefs that had left the AI and Acquisitions links dead on the
  homepage, Contact, Terms, Privacy and 404.

## Docs reconciled

| File | What was updated |
|---|---|
| `wireframes.md` | 2026-10-30 changelog row; inventory (Leadership row removed); §5 sitemap reference; §9 interior-page table; review notes; new **OI-15** |
| `content-slots.md` | §1 chrome; §3 Acquisitions; §5 Vertical Software; §6 Our Advantage (Peer Community); §7 Our Story; §8 Leadership-as-section; §9 Careers |
| `plans/sitemap-lock.md` | Tree amendment + decision entry; **re-lock pending** |
| `PROJECT_KNOWLEDGE_BASE.md` | §14 Leadership decision + locked tree + open-items line |
| `AGENTS.md` | Leadership is a section, not a page |
| `04_Content/README.md` | Leadership row repointed to the section |
| `tools/html2figma/README.md` | Both pipelines, what sits on the board |

## Figma — `FS-Design` › `⚠️ WF v2`

Thirteen frames, each a **1:1 copy measured from the rendered page**:

- 10 site pages: Homepage · Vertical Software · Our Advantage · Our Story · Acquisitions · Careers ·
  Contact · Terms · Privacy · Page not found
- 3 supporting wires: Header chrome options · Who we are — layout lab · What we do — Option 14
  parallax (captured in `.rm-parallax`, because its planes are scroll-transformed)
- Deleted: the Leadership frame, and a stale early import named "AI" that was really an old Our
  Advantage conversion is **still present**, pending a decision.

Pipeline: `tools/html2figma/extract.js` measures the DOM → `capture.py` receives the JSON →
`exact_build.js` replays it as an absolutely positioned frame (flat layers; no auto-layout).

## Verification

- 390 / 768 / 1440 on all pages: **no horizontal overflow**, no `{{V}}` leftovers, no
  `leadership.html` links, no broken local links, no dead in-page anchors.
- Vertical Software's panel slide is disabled under 900px so the full-bleed band cannot flash a
  horizontal scrollbar.
- Menu drawer opens with six items and a scrim on mobile.

## Open items

1. **Sitemap re-lock** — Leadership is no longer a page; whether `/our-story/leadership` 301s to the
   section is undecided (**OI-15**).
2. **Our Advantage sidebar** — the reversal of the 2026-10-22 layout needs a yes.
3. **Careers** — Our Values and the three testimonials are placeholders pending leadership sign-off
   and publishable quotes.
4. **Payments stats** — client-supplied and still unreconciled with KB §22.5 (OI-5).
5. Stale **"AI" frame** on `⚠️ WF v2` — delete or keep.

## Commits

| Commit | What |
|---|---|
| `21a76ff` | Interior pages: apply the 10/28 client feedback pass |
| `c5d9150` | Figma sync: layout matching (superseded) |
| `2c3f73b` | Figma sync: pixel copies taken from the rendered pages |
| `aba52b7` | Figma: add the three supporting wires to the board |
