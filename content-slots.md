# Content slots — wireframe handoff

**What this is.** A slot-by-slot inventory of every place copy goes on the Fullsteam
wireframes, in document order. The wireframes show **structure only** — most body copy is
lorem or `[placeholder]`. This file is the bridge for the team writing the real copy: it
says what each slot *is*, what job it does, and what it must not say.

**Scope note.** This is a **structural** artifact. Do not treat the wireframe's lorem as
copy to edit; replace it. Do not add or move slots without a `wireframes.md` change (the
structure is locked — see `AGENTS.md` and `plans/sitemap-lock.md`).

**Status key**

| Status | Means |
|---|---|
| **Locked** | Decided copy — change only via a recorded decision (KB / `design.md`). |
| **Draft** | Real heading written during the wireframe pass; open to edit, pending sign-off. |
| **Placeholder** | Lorem / `[placeholder]` / blank — must be written. |
| **Intent** | The wireframe shows the section's *intention* (a short `Intent:` heading + a `.anno` detail note), not final copy. The real wording is written here. |

> **2026-10-01 — intent-first (all pages).** Every content headline on the homepage and the 8
> interior pages now reads as a short `Intent:` statement (heading tags kept), with a dashed
> `.anno` note carrying detail, constraints, and audience. **Primary lens: investors**, founders
> secondary — a lens only, no IA change. This is why many rows below show **Intent** rather than
> a written heading: the wireframe no longer carries final copy. The two locked homepage lines
> (Axis A H1, Axis B H2) are quoted inside their notes. See `wireframes.md` §8 changelog and KB §25.5.

---

## 0. Cross-cutting rules (apply to every slot)

From KB §20–§22 (`PROJECT_KNOWLEDGE_BASE.md`). These are hard constraints, not style notes.

- **Never frame the sale as an "exit."** Fullsteam is "a home for your business" — values
  fit, certainty of close, an org that scales the founder.
- **Message order:** Software → Verticals → Integrate Payments. Software is ≈ ¾ of revenue.
- **Narrative first, data second; "who we are" over "what we do."** 8th-grade reading level,
  conversational, no jargon.
- **Do not publish** revenue / run-rate / profitability, named acquisition case studies, or
  employee bios. Genericize examples until the client confirms publishability.
- **AI:** use cases first; **never** imply staff reduction.
- **Counts:** state **11 verticals** (settled — the locked IA). Do **not** state a customer
  count until OI-5 clears (see `wireframes.md` §7).
- **Vocabulary:** the embedded axis is **"Our Advantage"** (client rename 2026-10-22),
  **never "Platform."** **"Offerings"** survives only as the on-page group name for the
  Payments / Lending / Insurance + AI block — it is not a nav short form.
  The primary CTA is **"Explore our vertical solutions."**
- **Axes vs nav:** *Axis A / Axis B* name the homepage model; *Vertical Software / Our
  Advantage* name the sitemap. Do not mix them in copy.

---

## 1. Shared chrome (every page)

| Slot | Role | Status | Note |
|---|---|---|---|
| Logo wordmark | Home link | Locked | `FULLSTEAM` |
| Menu button | Opens the menu | Locked | Hamburger (three bars). Accessible name "Menu". `aria-expanded` reflects open/closed |
| "Explore vertical solutions" pill | Primary CTA (short form) | Locked | Header uses the short form; body uses the full form |
| Menu rows | Sitemap L1 | Draft — 2026-10-22 client request, applied; formal re-lock pending | Single column, one item per line: Vertical Software · Our Advantage · AI at Fullsteam (`our-advantage.html#ai`, not a new page) · Our Story · Acquisitions · Careers. Labels now match the docs; structure unchanged |
| Menu children | Recovery | Locked | Indented in the same column: Leadership under Our Story · FAQ under Acquisitions · Open roles under Careers. The 11 verticals stay on the Vertical Software page, not in this menu |
| Menu "Open roles" | Workday job search | Locked | External: `https://fullsteam.wd1.myworkdayjobs.com/External` · `target="_blank"` · not `careers.html#roles` |
| Finder line | "find your vertical" | Draft | Not in the single-column menu. Type-ahead stays on the Vertical Software page |
| Footer columns | Tree recovery | Locked | Company · Explore · Connect · Legal |
| Footer Company links | Tree recovery | Locked | Our Story · Leadership · Careers · **Open roles** (Workday, external) |
| Footer Explore links | Tree recovery | Draft — 2026-10-22 | Vertical Software · Our Advantage · AI at Fullsteam · Acquisitions · **FAQ** |
| Footer Connect links | Tree recovery | Locked | Contact · Partner inquiries (`#partner`) |
| Footer legal links | Privacy · Terms · Complaints | Locked | **Privacy** → `pages/privacy.html` · **Terms** → `pages/terms.html` (lorem wireframes; client legal replaces copy) · **Complaints** label only (`#`) |

The **11 verticals** (exact labels, used in chrome, the mosaic, and the Vertical Software page):
Hospitality · Weddings & Events · Wine · Retail · Storage & Marina · Health & Wellness ·
Field Services · Transportation · Automotive · **Association Management** · ERP.

---

## 2. Homepage — `02_Wireframes/active/homepage.html`

The opening is a **two-state pinned sequence** (Axis A → grow morph → Axis B). Both states are
content. See KB §23 (and **§24** for the 2026-10-01 client review) before touching anything above
the fold. **The page was reordered 2026-10-01** — this table reflects the new order.

**2026-10-01 messaging pass (intent-first):** the wireframe records *what each section must do and
for whom*, not final wording; the final copy is written here. Both the **supporting copy** and the
**headlines (h1/h2/h3)** now read as intent statements — supporting copy as `.anno` notes, headings
as intent text with the locked lines quoted inside (`homepage.html`). Section **beat markers**
(`02 — What we do`), the audience kickers, structural labels (Acquire/Grow/Lead, vertical names),
CTAs, and the stat placeholders remain. **Primary lens: investors**, founders secondary. This is a
**lens change only** — the locked Axis A/B opening is unchanged (still founder-first visible
framing), and no IA/order changed. Messaging themes: forward-thinking, a repeatable process, best
stewards of the products (for founders), and *acquire and make the software companies run better*
(for investors).

| # | Slot | Role | Status | Note |
|---|---|---|---|---|
| — | Kicker "For founders of industry software" | Audience kicker (Axis A) | Draft | Never a product claim |
| — | **H1** "Whatever the industry, we own the software it runs on." | Axis A — identity/ownership | **Locked** | The document H1; read first |
| — | Sub (now a section intent note) | Axis A support | **Intent** | Investor-primary lens; final copy in this file |
| — | Axis A identity visual | Axis A — the owned software | Placeholder | **One visual, not 11 tiles** (client 2026-10-01); it is the grow morph's source |
| 01 | Beat "01 — The model" | Section marker | Draft | |
| 01 | Axis B kicker "For founders of industry software — and anyone confirming who we are." | Audience + validation | Draft | Echoes kicker deliberately |
| 01 | **Axis B H2** "Software first. Then we grow it." | Axis B — the growth model | **Locked** | Agreed line (2026-09-24) |
| 01 | Axis B lede (now a section intent note) | Growth model support | **Intent** | Forward-thinking, repeatable process; investor-primary lens |
| 01 | CTAs: "Explore our vertical solutions" + "Careers" | Primary + secondary | Locked (CTA) | |
| 02 | Beat + H2 **"What does Fullsteam do?"** | The model in plain words | Draft | Client's #1 question (2026-10-01) |
| 02 | Lede (now a section intent note) | Intro | **Intent** | Answer "What does Fullsteam do?" in plain words; the thesis is **acquire and make them run better**; investor-primary lens |
| 02 | Steps: **Acquire / Grow / Lead** | Three things we do | **Intent** | Structural headline labels only; Acquire = buy + keep buying; Grow = make each business run better (AI + embedded payments + shared back office, deck p19/p28); Lead = enterprise scale without bureaucracy (Pillar 3) |
| 02 | Founder CTA "A home for the business you built." + "Talk to us" | For founders | Locked framing | Heading locked; body is now a section intent note. Never "exit" or "turn-and-burn"; founder track (secondary lens); link For Founders |
| 02 | Founder voice quote + attribution | Social proof | **Intent** | Genericized; no names until confirmed |
| 03 | H2 **"How a Fullsteam company compounds."** | The band, named | Draft | **2026-10-29**: the "Acquire. Grow. Lead." headline and the mono kicker were both removed and the kicker's line promoted to the H2 (client). The three steps below still carry the sequence |
| 03 | Step 01 **Acquire** — "We acquire great vertical software companies." + `70,000+` customers rely on our software | What we buy | Draft (copy) / **Placeholder** (figure) | Client line, 2026-10-29. Figure pending publishability (OI-5) |
| 03 | Step 02 **Grow** — "Our AI and embedded fintech unlock new growth opportunities." + `$75B` in sales processed + `#20` largest payment processor | How they get bigger | Draft (copy) / **Unreconciled** (figures) | Client lines, 2026-10-29. ⚠ `#20` **contradicts the LinkedIn card in §06** ("moved up to #28 among top U.S. merchant acquirers") — one of the two is wrong and both are on the same page |
| 03 | Step 03 **Lead** — "We built the next generation of AI-powered vertical software." + `2,000+` employees + `11` vertical markets | Where it ends up | Draft (copy) / **Placeholder** (figures) | Client asked for "select vertical stats" — only the settled **11** is used; no per-vertical figures exist yet. The band has **no quote and no closing statement**: both were removed 2026-10-29, the quote because it duplicated the founder voice in the founders band |

| 03 | Investor intent note | Trust signal + disclosure | **Intent** | Imply scale via inferable signals only; no revenue/run-rate/profitability. Marquee backers (Aquiline · Sixth Street · ADIA) **pending publishability — do not ship names** (matches `our-story.html:307`) |
| 04 | Eyebrow **"Built for every industry"** + H2 "Keep the businesses growing." | The verticals | Draft | **Rebuilt 2026-10-15** as Square's "audience moment": eyebrow + headline, then one expandable card per featured vertical. Eyebrow takes Square's categorical frame; "the verticals" is named in the note beneath (never "Platform"). Band is now **white** |
| 04 | Card row: 5 revenue-ordered cards + 11 text links | Verticals in action | Draft | Card = name → hairline rule → figure → descriptor → "Learn more". Structural labels only; featured businesses generic until publishability confirmed |
| 04 | Per-card figure (`70,000+` / `$75B+` / `480M+` / `2,000+` / `11`) | Scale, in context | **Placeholder** | Replaced the KPI cycle; same allowlisted deck p28 set as the stats band, and the settled **11** stays untagged. No revenue/run-rate/profitability |
| 05 | Beat + H2 "AI that already knows the business." + lede | AI | **Intent** | Use cases first; never a headcount story; investor-primary lens (AI strengthens the software side). **Moved above the verticals, on white** (client, 2026-10-29) — the AI band now sits directly under the stats band |
| 05 | Three AI example cards (forecasting / back office / support) | AI examples | **Intent** | Headline labels only; client asked to "highlight examples of AI"; genericize the final copy |
| 05 | Link "See AI at Fullsteam" | Cross-link | Draft | → Our Advantage#ai |
| 06 | Beat + H2 "A great place to work." + lede | Employer story | **Intent** | Humanizing (2026-10-01); employer-brand track (tertiary) |
| 06 | Three real-image placeholders + "Real team photo — not stock" captions | Culture imagery | **Placeholder** | **Actual people, not stock photos** |
| 06 | Three testimonials — **The founder · The founder who stayed · The employee** | Proof, in the client's own three voices (`10/28` feedback) | **Placeholder** | Added 2026-10-29, replacing the three value statements. Each is genericized and carries the unpublishable note; names and real quotes needed. Order is the story: someone who sold, someone who sold and stayed, someone who joined |
| 06 | Link "See Careers" + LinkedIn strip (cards + follow) | Careers + feed | Draft | **Filled 2026-10-26 with 5 real company-page posts** (hiring, Voices, Auburn award, HITEC/Priswing, Nilsen #28). Copy condensed from the client's own posts; artwork rebuilt in brand tokens. Still open: post permalinks, exact dates, comms clearing — see `client-review/homepage/linkedin-slots.md` |
| 07 | Beat + H2 "Ready to see where your business can go next?" + proof line + **Explore Our Advantage** CTA (right) | Close | Draft | **Doors removed 2026-10-29** (client): the two way-finder links and "Any industry. One home." are gone. A single CTA sits to the right of the headline, to `our-advantage.html` |

---

## 3. Acquisitions — `pages/for-founders.html`

On-page name is **Acquisitions** (2026-10-22). File name is unchanged. Sitemap lock still says For Founders.

| Slot | Role | Status | Note |
|---|---|---|---|
| Beat "Acquisitions" + **H1** (intent) | Page promise | Draft — rename | Never "exit". Preferred name over For Founders; lock not amended |
| Lede | Support | Draft | Systems of record + AI/payments/operational excellence; software first, certainty of close (2026-10-01) |
| 01 "Why Fullsteam" + H2 (intent) | The offer | Draft | Values fit, close, scale |
| Founder video row (3 slots) | Video | Placeholder | Multiple videos may sit here. No assets. Do not name a founder until confirmed |
| → 4-step list (We talk → real fit → clean close → keeps going) | Process | Placeholder | Structural only: no timelines, multiples, or deal terms |
| 03 "What we look for" + H2 "Software built for one industry." | Fit | Draft | Lead with industry, not an acquisition count; software = system of record, AI/payments added after |
| 03 CTA "Explore our vertical solutions" | Cross-link | Locked | |
| 04 Acquisitions email + mailto `acquisitions@fullsteam.com` | Close | Draft | Lead form removed. Confirm the mailbox. No form on this page |

---

## 4. FAQ — `pages/faq.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| Beat "For founders · FAQ" + H1 "Questions founders ask before a meeting." | Framing | Draft | |
| Lede | Support | Draft | 2026-10-01 |
| 8 question rows (payments? / exit? / name+team / close certainty / understand what we do? / when customers hear / **what does Fullsteam buy?** / **does AI replace my team?**) | Q&A | Placeholder | Answers must record the locked constraints: software before payments; never "exit"; brands stay standalone; no announcement at close; **AI never framed as staff reduction** |

---

## 5. Vertical Software — `pages/vertical-software.html`

One page, 11 verticals, no child pages.

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 (page intent) | Framing | **Intent** | Investor-primary lens |
| Lede / hero note | Support | **Intent** | Software-first, mission-critical, industry-specific — distinct from a general horizontal provider (2026-10-22) |
| "Read the story" control | Jump to active story | Locked | |
| Sidebar list (labels) | The list | Locked | Exact 11 names; **no category labels**. Sticky sidebar, inline swap. One panel shape for every vertical |
| Per-vertical: description | Detail | **Intent** | What makes Fullsteam unique and critical in that industry. Placeholder |
| Photo | Imagery | Placeholder | Brings the vertical to life |
| Surprising stats | Proof | Placeholder | Vertical-specific. Not revenue or profitability |
| Business-unit logos | Logos | Placeholder | Own row |
| Customer and partner logos | Logos | Placeholder | Separate band from BU logos |
| Product screenshots | Imagery | Placeholder | Own row |

---

## 6. Our Advantage — `pages/our-advantage.html`

On-page name is **Our Advantage** (client rename 2026-10-22, propagated repo-wide). File name stays `our-advantage.html` so the URL and all cross-links hold. Sticky sidebar swaps content inline. No new AI page — `#ai` is the panel.

| Slot | Role | Status | Note |
|---|---|---|---|
| Beat "Our Advantage" + H1 (intent) | Framing | **Intent** | Rename pending re-lock |
| Sidebar — Embedded fintech | The list | Draft | Payments · Lending · Insurance |
| Sidebar — AI at Fullsteam | The list | Draft | Own group. Nav wayfinder lands on `#ai` |
| Sidebar — Operational advantages | The list | Draft | Sales & Marketing · Talent · Vertical Expertise |
| Payments — why embedded is better | Detail | **Intent** | |
| Payments — key stats | Proof | **Unreconciled** | Client lines (“$75B sales processed”, “top 20 payment processor”) vs KB §22.5 “$75B+ processed on Fullsteam Pay*” (cumulative). Not settled KPIs. OI-5 |
| Payments — hardware photo + text | Detail | Placeholder | Stays inside Payments |
| Payments — testimonial | Proof | Placeholder | Optional. Do not publish a named quote until confirmed |
| AI — three use-case examples | Detail | **Intent** | Modernize existing software · new customer-facing features · automate workflows. Never headcount |
| AI — video | Video | Placeholder | Brings the three use cases together. Asset not supplied. Homepage AI block is untouched |
| Lending / Insurance panels | Detail | **Intent** | Unchanged overviews. No rates or terms |
| **Sales & Marketing — overview** | Detail | **Intent** | How the group's go-to-market strength grows a business after the close. An overview, not a service menu — no CRM, lead source, or campaign names |
| **Sales & Marketing — three cards** | Detail | **Intent** | Sales (knows the vertical) · Marketing (niche campaigns, real customer stories) · Cross-sell (payments, lending, insurance into the existing base). Body detail is `[placeholder]` |
| **Sales & Marketing — 2×2 fact grid** | Proof | Placeholder | Reach · Scale (“100+ businesses” — publishability-gated, OI-5) · Proof (no pipeline, conversion, or growth-rate figures) · Constraint (never imply the business needed a new sales team to keep running) |
| **Sales & Marketing — photo + text** | Imagery | Placeholder | Real Fullsteam people, not stock. No asset supplied |
| **Talent — overview** | Detail | **Intent** | The team that built the software stays and gains a much larger company behind it. Never a story about replacing the team that came with the business |
| **Talent — three cards** | Detail | **Intent** | Hiring (a deeper bench) · Mobility (move between the businesses Fullsteam owns without leaving) · Support (group-level finance, legal, HR, compliance). Body detail is `[placeholder]` |
| **Talent — 2×2 fact grid** | Proof | Placeholder | Scale (“2,000+ colleagues” — publishability-gated, OI-5) · Culture (“a big company that doesn't operate like one”) · Proof (no attrition, hiring, or retention figures) · Constraint (never headcount reduction) |
| **Talent — photo + text** | Imagery | Placeholder | Real colleagues, not stock. No asset supplied |
| **Vertical Expertise — overview** | Detail | **Intent** | Industry knowledge stays with the software; shared learnings without homogenizing brands. Keep distinction from the Vertical Software portfolio clear |
| **Vertical Expertise — three cards** | Detail | **Intent** | Industry knowledge · Shared learnings · Product fit (why horizontal isn't the same). Body detail is `[placeholder]` |
| **Vertical Expertise — 2×2 fact grid** | Proof | Placeholder | Focus (software first) · Scale (“11 verticals” settled; “100+ businesses” publishability-gated, OI-5) · Proof (no cross-vertical metrics) · Constraint (never a one-size-fits-all playbook; keep identity) |
| **Vertical Expertise — photo + text** | Imagery | Placeholder | Real examples from the portfolio, not stock. No asset supplied |

---

## 7. Our Story — `pages/our-story.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 (intent) + Acquire / Grow / Lead strip | Framing | Draft | Hero restates the sequence. Homepage layout is a separate pass |
| Image band | Supporting | — | **Real Fullsteam people, not stock** |
| KPI strip — 100+ businesses · 2,000+ people · 70,000+ customers · $75B+ on Fullsteam Pay* | Proof | **Placeholder** | All `[placeholder]`; *cumulative; **no revenue/run-rate/profitability** |
| Marquee backers (Aquiline · Sixth Street · ADIA) | Trust signal | Draft | **Confirm publishability** |
| 01 "The company" + H2 (intent) | Identity | Draft | |
| Mission / vision video | Video | Placeholder | Mike and Greg will produce it. Slot only — no asset |
| 02 "Leadership" + H2 "The people who lead." + CTA | Teaser | Draft | Leaders only |
| 03 "Chapters" + H2 "How the home came together." | Story | Draft | **Do not invent a timeline.** Year labels stay blank |
| 03 chapter cards (6 × year + title + body) | Chapters | Placeholder | Narratives, not a company timeline |
| 04 + open-role rows + close | Careers teaser + close | Draft/Placeholder | Roles come from the client |

---

## 8. Leadership — `pages/leadership.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 (intent) | Framing | Draft | Mirrors the live leadership page: leaders only |
| Lede | Scope | Draft | Leaders only |
| 6 leader cards (portrait / name / title / bio slot) | People | Placeholder | **Do not invent names or bios.** Six is a wireframe count. **Real portraits, not stock** |

---

## 9. Careers — `pages/careers.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 "A big company that does not work like one." | Framing | Draft | |
| Lede | Support | Draft | **2,000+ people across 11 verticals**; mostly remote; close to decision-makers (2026-10-01) |
| 01 "How it feels" + H2 "Room to own the work." | Culture | Draft | Authentic, not a recruiting poster; **real employee imagery, not stock** |
| 02 "Who thrives" + H2 (intent) | Profile | Draft | AI is never a replacing-the-team story |
| Our Values (inside Who Thrives) | Values | Placeholder | **Pending leadership confirmation.** Do not invent a finished list |
| 03 "Open roles" + H2 (intent) + **See open roles** pill | Roles | Locked | External Workday (`fullsteam.wd1.myworkdayjobs.com/External`); **no in-page job table** |
| 04 LinkedIn module | Social | Placeholder | Below Open Roles. Lo-fi posts + follow link (`linkedin.com/company/fullsteam`) |

---

## 10. Contact — `pages/contact.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 "Ask for a conversation." | Framing | Draft | Site confirms; meeting is next; no campaign |
| Lede | Support | Draft | |
| Hero jumps (FAQ for founders · Partner inquiries) | Recovery | Draft | FAQ → `faq.html`; partner → `#partner` |
| FAQ callout band | Founder routing | Draft | Tan block: H2 "Questions answered before you write." + **Read the FAQ** pill → `faq.html` |
| Form labels (Name · Email · Company · What this is about · Message) | Form | Draft | "What this is about" select: software business / work here / something else |
| Send + form note | Form | Draft | Wireframe: nothing transmits |
| "Partner inquiries" + H2 "Same door." | Investor-adjacent | Draft | **No "For Investors" option** — deliberate |

---

## 10b. Legal utility pages (wireframe placeholders)

| Page | Path | Status | Note |
|---|---|---|---|
| Privacy policy | `pages/privacy.html` | **Placeholder** | Lorem sections; client legal replaces all body copy |
| Terms of use | `pages/terms.html` | **Placeholder** | Lorem sections; client legal replaces all body copy |
| Page not found | `pages/404.html` + root `404.html` | **Placeholder** | Lorem lede; CTAs to homepage wireframe + review portal. Root copy is published on GitHub Pages for missing URLs. |

---

## 11. Rules for whoever implements this

- **Chrome is duplicated across 9 files** (no shared stylesheet). If you change a nav label
  or a CTA, change every page — see the checklist in `wireframes.md` §6.
- **Locked copy** must not be reworded in a content pass without a KB/`design.md` decision:
  the mosaic H1, the Axis B H2, the primary CTA, the 11 vertical names, the axis labels.
- **Placeholder slots** are the deliverable. Replace lorem; keep the slot's job and length
  roughly intact so the layout holds.
- **Where decisions are recorded:** `PROJECT_KNOWLEDGE_BASE.md` (§20 discovery, §21 content
  brief, §22 messaging, §23 homepage strategy), `design.md` (UX spec), `wireframes.md`
  (structure + open items), `plans/sitemap-lock.md` (IA).
