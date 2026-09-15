---
name: Sitemap lock
overview: Lock the Fullsteam.com L1 tree and page inventory (For Investors deleted; Vertical Software hub + all 11 vertical pages; Embedded Offerings = Payments/Lending/Insurance/AI; Newsroom a dynamic CMS page under Our Story), then reconcile every sitemap/chrome/design artifact to the locked tree.
todos:
  - id: lock-decisions
    content: "Confirm lock decisions: delete For Investors, AI page under Offerings, all 11 vertical pages (one template), Vertical Software hub with find-your-vertical"
    status: completed
  - id: kb-section-14
    content: "Rewrite PROJECT_KNOWLEDGE_BASE.md §14 as the locked sitemap + nav + budget; resolve §20.11 investor item"
    status: completed
  - id: sitemap-artifacts
    content: "Add lock note to sitemap.html; update sitemap-rationale.html §3 (hub + 11 pages) and §4 (founder-only)"
    status: completed
  - id: header-chrome
    content: "Remove For Investors from header-wireframe.html Options 0/A/B/C labels, chrome, and overlays"
    status: completed
  - id: homepage-reconcile
    content: "Remove footer investor link + fix investor copy in homepage-bendingspoons-style.html"
    status: completed
  - id: design-md-reconcile
    content: "Remove investor nav-path assumptions from design.md (§1, §4.2/§4.7, §6, §8)"
    status: completed
  - id: wireframes-md
    content: "Resolve OI-2 + G-2 and update chrome table + sitemap reference in wireframes.md"
    status: completed
  - id: alt-a-note
    content: "Banner note on alternative-home-a.html that it predates the lock"
    status: completed
  - id: open-items
    content: "Resolve remaining open items: Leadership (page under Our Story), category labels (deleted — no labels, no landing pages), For Founders funnel (single page), URL/migration map (lock doc only)"
    status: completed
  - id: finalize
    content: "Finalize sitemap.html (v1.0) with Leadership node; reconcile KB §14 + wireframes.md"
    status: completed
authored: 2026-09-10
finalized: 2026-09-14
---

# Sitemap lock (2026-09-10 · finalized 2026-09-14)

## Locked tree

```
HOME                                      (/)
├─ For Founders                          (/for-founders)      leaf
├─ VERTICAL SOFTWARE                     (/vertical-software) HUB + find-your-vertical
│   ├─ Flat list — all 11 verticals (no category labels)
│   └─ 11 vertical detail pages (one reusable template)
├─ EMBEDDED OFFERINGS                    (/offerings)         hub
│   ├─ Payments · Lending · Insurance
│   │   (Hardware & Integrations folded in — no separate pages)
│   └─ AI at Fullsteam                   (/offerings/ai)      own page, nested
├─ Our Story                             (/our-story)
│   ├─ Newsroom                          (/our-story/newsroom) single dynamic CMS page
│   └─ Leadership                        (/our-story/leadership) page (leaders only)
└─ Careers                               (/careers)           leaf

Utility (not L1 nodes): Contact (/contact) · "Explore Solutions" CTA · Privacy · Terms
```

## Decisions

- **For Investors deleted** — no nav node, no page. Investors served via homepage
  scale/proof + Contact. (Supersedes the audience-led draft.)
- **Portfolio axis renamed Solutions → Vertical Software** (Figma comment #1);
  the primary CTA stays "Explore our vertical solutions."
- **Vertical Software is a dedicated hub page** with a find-your-vertical filter.
- **All 11 verticals get a detail page from one reusable template** — flat list on
  the hub and in the Menu overlay; **no category labels** (2026-09-10).
- **Embedded-expansion axis = "Embedded Offerings"** (client-preferred, 2026-09-10;
  short form "Offerings" in body copy). **Embedded Offerings = Payments, Lending,
  Insurance + AI.** **Hardware & Integrations dropped as separate pages** (Figma
  comments #8/#9), folded into Payments / the Embedded Offerings overview.
- **AI at Fullsteam is its own page nested under Embedded Offerings** (not
  top-level, not a section).
- **Newsroom is a single dynamic CMS page** under Our Story, nested at
  `/our-story/newsroom` (2026-09-10; nested 2026-09-14).
- **Leadership is a page under Our Story** at `/our-story/leadership`
  (2026-09-14) — leaders only, per the confidentiality rule (no full staff listing).
- **For Founders is a single-page leaf** (2026-09-14) — no sub-pages.
- **No category labels and no category landing pages** (2026-09-14) — the 11
  verticals stay a flat list on the hub. (Category labels were deleted after the
  client call; supersedes the earlier "labels only" note.)
- "All Verticals" folded into the hub (Figma comment #2) — not a separate page.
- Chrome may show fewer items than L1; overlay/footer must reach every node.
- ~24 designed pages against the 25-page cap (~1 slot free).

## Files reconciled

- `PROJECT_KNOWLEDGE_BASE.md` — §14 locked; §20.11 investor item resolved.
- `prototypes/sitemap.html` — lock note.
- `prototypes/sitemap-rationale.html` — §3 hub + 11 pages; §4 founder-only.
- `prototypes/header-wireframe.html` — For Investors removed from 0/A/B/C.
- `prototypes/homepage-wireframe/v0.1-rough/homepage-bendingspoons-style.html` — footer + copy.
- `prototypes/homepage-wireframe/v0.1-rough/alternative-home-a.html` — predates-lock banner.
- `design.md` — investor nav assumptions removed; voice rule ("you") added.
- `wireframes.md` — OI-2 + G-2 resolved; chrome/sitemap refs.
- `plans/header-sitemap-variants.md` + `.cursor/plans/header-sitemap-variants.md` — supersede note.

### Revision (2026-09-10b) — Figma review comments

- Renamed axis **Solutions → Vertical Software** across all artifacts.
- Dropped **Hardware** and **Integrations** as Offerings pages; folded in.
- Folded **All Verticals** into the hub; recorded voice rule (#7) in `design.md`.
- Files touched in the rename pass: `PROJECT_KNOWLEDGE_BASE.md` §14, `AGENTS.md`,
  `design.md`, `wireframes.md`, `prototypes/sitemap.html`,
  `prototypes/sitemap-rationale.html`, `prototypes/meganav-rationale.html`,
  `prototypes/header-wireframe.html`, homepage wireframe, and both plan files.

### Revision (2026-09-10c) — axis title + Newsroom

- Renamed the embedded-expansion axis **Offerings → Embedded Offerings**
  (client-preferred; short form "Offerings" in body copy).
- Added **Newsroom** as a single **dynamic CMS page** under Our Story.
- Same files re-touched, plus `prototypes/sitemap.html` (Our Story node now has a
  Newsroom child) and the homepage overlay/footer.

### Revision (2026-09-14) — finalization

- Added **Leadership** as a page under Our Story (`/our-story/leadership`).
- Nested **Newsroom** under Our Story (`/our-story/newsroom`).
- **Category labels deleted** after the client call — the 11 verticals stay a flat
  list; no labels and no category landing pages.
- **For Founders** confirmed a single-page leaf; **URL/migration map** kept here.
- Files touched: `PROJECT_KNOWLEDGE_BASE.md` §14, `AGENTS.md`, `wireframes.md`,
  `prototypes/sitemap.html`, `prototypes/sitemap-rationale.html`, both plan copies.

## Open items — resolved (2026-09-14)

- [x] **Our Story sub-pages** — **Newsroom** (`/our-story/newsroom`) is a single
      dynamic CMS page; **Leadership** (`/our-story/leadership`) is a page. Both
      nested under Our Story.
- [x] **Leadership** — **separate page** under Our Story (`/our-story/leadership`),
      not a section. Uses one of the free budget slots.
- [x] **Category pages** — **no category labels and no landing pages.** The hub keeps
      the flat 11-vertical list (labels deleted after the client call, 2026-09-14).
- [x] **For Founders funnel** — **stays a single-page leaf** (`/for-founders`) with
      the four locked sections (Why · process · what we look for · contact).
- [x] **URL / migration map** — **kept in this lock doc only**, not on the HTML page:
      `/our-verticals` + 11 vertical slugs → `/vertical-software/...`;
      `/acquisition` → `/for-founders`; `/about` → `/our-story`;
      `/newsroom` → `/our-story/newsroom`; add `/our-story/leadership`.

> No open sitemap items remain. Future changes fall under the SOW's revision rounds.
