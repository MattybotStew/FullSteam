---
name: Sitemap lock
overview: Lock the Fullsteam.com L1 tree and page inventory (For Investors deleted; Solutions hub + all 11 vertical pages; AI nested under Offerings), then reconcile every sitemap/chrome/design artifact to the locked tree.
todos:
  - id: lock-decisions
    content: "Confirm lock decisions: delete For Investors, AI page under Offerings, all 11 vertical pages (one template), Solutions hub with find-your-vertical"
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
    content: "Carry remaining open items: Our Story sub-pages, category pages, For Founders funnel, URL/migration map"
    status: pending
authored: 2026-09-10
---

# Sitemap lock (2026-09-10)

## Locked tree

```
HOME                                      (/)
├─ For Founders                          (/for-founders)      leaf
├─ SOLUTIONS                             (/solutions)         HUB + find-your-vertical
│   ├─ Flat list — all 11 verticals (no macro-category labels)
│   └─ 11 vertical detail pages (one reusable template)
├─ OFFERINGS                             (/offerings)         hub
│   ├─ Payments · Lending · Insurance · Hardware · Integrations
│   └─ AI at Fullsteam                   (/offerings/ai)      own page, nested
├─ Our Story                             (/our-story)         leaf
└─ Careers                               (/careers)           leaf

Utility (not L1 nodes): Contact (/contact) · "Explore Solutions" CTA · Privacy · Terms
```

## Decisions

- **For Investors deleted** — no nav node, no page. Investors served via homepage
  scale/proof + Contact. (Supersedes the audience-led draft.)
- **Solutions is a dedicated hub page** with a find-your-vertical filter.
- **All 11 verticals get a detail page from one reusable template** — flat list on
  the hub and in the Menu overlay; **no macro-category labels** (2026-09-10).
- **AI at Fullsteam is its own page nested under Offerings** (not top-level, not a
  section).
- Chrome may show fewer items than L1; overlay/footer must reach every node.
- ~24 designed pages against the 25-page cap.

## Files reconciled

- `PROJECT_KNOWLEDGE_BASE.md` — §14 locked; §20.11 investor item resolved.
- `prototypes/sitemap.html` — lock note.
- `prototypes/sitemap-rationale.html` — §3 hub + 11 pages; §4 founder-only.
- `prototypes/header-wireframe.html` — For Investors removed from 0/A/B/C.
- `prototypes/homepage-wireframe/v0.1-rough/homepage-bendingspoons-style.html` — footer + copy.
- `prototypes/homepage-wireframe/v0.1-rough/alternative-home-a.html` — predates-lock banner.
- `design.md` — investor nav assumptions removed.
- `wireframes.md` — OI-2 + G-2 resolved; chrome/sitemap refs.
- `plans/header-sitemap-variants.md` + `.cursor/plans/header-sitemap-variants.md` — supersede note.

## Open items

- [ ] Our Story sub-pages — Leadership / Newsroom or single leaf?
- [ ] Category pages — real landing pages or grouping labels only? (affects page count)
- [ ] For Founders funnel content + CTA.
- [ ] URL / migration map — `/our-verticals` + 11 vertical slugs → `/solutions/...`;
      `/acquisition` → `/for-founders`; `/about` → `/our-story`.
