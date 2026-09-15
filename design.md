# Design Document: Fullsteam.com Homepage UX

> **Version:** 0.1 (draft for UX only — visual direction to follow)
> **Status:** UX spec to run in parallel with the homepage wireframe
> **Owner:** Matt Stewart (Creative Director) · **Wireframe:** Bionic
> **Related:** `PROJECT_KNOWLEDGE_BASE.md` §14 (sitemap/IA), §15 (palette),
> **§20 (discovery-interview synthesis — read before messaging decisions)**,
> `prototypes/header-wireframe.html` (header v0.2), `prototypes/sitemap-rationale.html`
> **Source of truth (client):** `clientDocs/Fullsteam Web Brief (1).docx` +
> `clientDocs/Fullsteam User Interview Template.xlsx` (internal discovery interviews)

This document is scoped to **UX only**. It describes the intent, user flows, and
section-by-section behavior of the redesigned Fullsteam.com homepage. It does **not**
prescribe visual styling, layout grids, typography, or color beyond what is needed to
explain UX decisions — those are a separate design pass to follow. Brand identity is a
**hard constraint**: we reorganize content and experience, we do not rebrand.

> **Separate track — wireframes.** The HTML wireframes are governed by
> [`wireframes.md`](./wireframes.md), not by this document. Wireframes are structure/IA
> explorations; this file is the UX spec and the future home of the visual design
> direction. Do not treat wireframe styling as approved design, and do not edit this
> document to match a wireframe experiment (or vice-versa) without reconciling
> deliberately. See `AGENTS.md` → "Wireframes vs. design.md — hard boundary."

---

## 1. UX Overview & Core Principles

The current site reads as a **corporate brochure**. The goal of the redesign is to make
fullsteam.com a **bolder, exploratory brand-and-storytelling experience** where a first-time
visitor understands Fullsteam *through its portfolio and offerings*, not through abstract
corporate language.

**Discovery-validated purpose (§20):** the homepage is a **validation/credibility
destination, not a lead-gen engine.** Outbound drives the pipeline; the homepage
confirms who Fullsteam is before a meeting. Optimize for **exploration + trust**, not
funnels. The narrative leads and the data supports; "who we are" outranks "what we do."
Message order is **Software → Verticals → Integrate Payments**, and the tone is
**8th-grade reading level, conversational, human** — no jargon.

Fullsteam tells **two core stories**, and the homepage must give both room without letting one
crowd out the other:

1. **Acquire & Grow** — Fullsteam acquires and grows vertical-specific software companies into
   market leaders (the *portfolio / Vertical Software* story).
2. **Embedded Expansion** — those businesses expand beyond SaaS through **Embedded Offerings**:
   payments, lending, insurance, hardware, and integrations (the *growth-engine* story).

### Core UX principles
1. **Portfolio-first understanding.** A visitor should "get" Fullsteam by seeing what Fullsteam
   owns and operates, not by reading corporate prose. Real, representative verticals and real
   customer outcomes do the explaining.
2. **One dominant call-to-action.** The hero CTA is **"Explore our vertical solutions."** The
   homepage leads with this single, unambiguous next step. Everything else is secondary pathing.
3. **Two audiences served without fragmentation.** The headline journey serves customers/investors
   exploring the portfolio; a secondary header path ("For Founders") pulls in sellers without turning
   the homepage into a directory. Investors are served through the homepage scale/proof story, not a
   nav node (locked 2026-09-10 — "For Investors" deleted from the sitemap; KB §14).
4. **Show, don't just claim.** Scale (software companies owned, users served), the breadth of
   verticals, and the embedded expansion are proven with concrete examples — named verticals,
   representative brands, and outcome-led teasers.
5. **No page-per-industry on the homepage.** Verticals appear as a revenue-ordered subset on the
   homepage; the Vertical Software page and Menu overlay list all 11 flat — no category labels (KB §14).
6. **"Embedded Offerings," never "Platform."** The embedded-expansion axis is labeled
   **Embedded Offerings** (client-preferred 2026-09-10; short form "Offerings" in body copy).
   This must hold everywhere on the homepage.
7. **Validation over conversion.** The homepage exists to confirm credibility and get a
   warm visitor to take a meeting/call — not to run a lead-gen funnel. CTAs invite
   exploration and contact; proof and trust signals outrank conversion pressure (§20.2).
8. **Narrative first, human voice.** Lead with the story and the people; let data support
   it. "Who we are" over "what we do." Write at an 8th-grade reading level. Never frame
   acquisition as an "exit" — it is "a home for your business" (§20.3/§20.4).
9. **Communicate scale.** Investors are consistently surprised by Fullsteam's size; the
   homepage must convey it (customers, employees, verticals, payment volume) without
   publishing revenue/run-rate or explicit profitability (§20.4).

### Primary CTA vs. nav (do not conflate)
- **Homepage hero CTA** = "Explore our vertical solutions" → funnels into the **Vertical Software**
  hub.
- **Header** surfaces the **For Founders** path (top slot); investors are served by the homepage
  scale/proof story, not a nav node.
- These coexist: the homepage opens with the portfolio CTA; the header carries the seller route.
  KB §14 note is authoritative here.

---

## 2. Priority Audiences & Their 30-Second Job

| Rank | Audience | What they need from the homepage | Their 30-second job |
|------|----------|----------------------------------|---------------------|
| 1 | **Software sellers / founders** | Understand Fullsteam as a credible, fair home for their business | Recognize Fullsteam is serious about acquiring & growing vertical software; find the "For Founders" path |
| 1 | **Investors** | See scale, growth trajectory & the embedded/AI opportunity | Read the scale/proof signals and the two-story model at a glance |
| 2 | **Customers** | Understand the products & embedded ecosystem | Find their vertical quickly; see payments/offerings work in context |
| 2 | **Employees / candidates** | Understand vision & culture | Feel the story; reach Careers/Our Story |

**Shared core message the homepage must land in ~30 seconds:**
> Fullsteam owns modern, system-of-record software serving SMB and mid-market customers and is
> accelerating growth through embedded products and AI-enabled innovation.

A successful homepage means **all four groups can self-identify** and be pointed toward the right
interior path without reading deeply or opening a nav menu.

---

## 3. Homepage User Flow (top-to-bottom narrative)

The homepage is a single, deliberately-ordered scroll narrative. Each block should make a visitor
ask the question the *next* block answers.

```
1  HERO              "Explore our vertical solutions" → immediately define the model + scale
2  THE TWO STORIES   One glance at both the "Acquire & Grow" and "Embedded Expansion" story
3  EXPLORE BY VERTICAL  (Vertical Software proof) → flat vertical list + "Find your vertical"
4  OFFERINGS IN ACTION  (growth-engine proof, via concrete examples, not feature lists)
5  WHY FULLSTEAM      3 reasons / proof that backs the "why choose us"
6  SOCIAL PROOF       Outcomes & real voices (stat bars, quotes, video testimonials)
7  FOR FOUNDERS  Secondary seller re-entry (header + feature tab); investors read scale/proof on-page — no nav node
8  CLOSING CTA        Re-state the journey + "Find your vertical" / Contact
9  (Our Story / Careers / Footer)   Quiet company context + utility
```

> **Design note for Bionic:** sections are reusable building blocks. The homepage should assemble
> these in an order that keeps the *portfolio + offerings* proof above the fold-weighted zone, with
> audience paths and company context beneath. Exact ordering and whether certain bands merge is an
> open wireframe question — see §8 Open Questions.

---

## 4. Section-by-Section UX Intent

### 4.1 Hero (above the fold)
- **UX goal:** In under a few seconds, state what Fullsteam is, prove it's substantial, and hand the
  visitor one clear action.
- **Content needs:**
  - Headline expressing the "acquire & grow + embedded expansion" model in plain, confident language.
  - **Single primary CTA:** "Explore our vertical solutions."
  - A **secondary, quieter CTA** for founders/investors ("Selling your business?" / "For investors") —
    present but not competing with the primary CTA.
  - Optional **proof strip** (scale signals) — a short run of credible stats. (See §4.5 before duplicating.)
- **Discovery direction (§20.8):** update the hero; use **full-width imagery / video
  showing the people behind the brand**; more whitespace; a modern, premium feel.
  Message order Software → Verticals → Payments; do not lead with payments.
- **UX intent:** No jargon, no "platform," no dense corporate sentence. The visitor should be able to
  say "they buy and grow software companies and add payments/etc." The CTA is the primary job; all
  other text serves that CTA.

### 4.2 The two stories
- **UX goal:** Give the business model a memorable, two-part shape so both the acquirer story and the
  embedded-growth story register.
- **Content needs:** Two clearly-labeled story lanes —
  1. **Acquire & Grow** (the portfolio / vertical software / "system of record").
  2. **Embedded Expansion / Embedded Offerings** (payments, lending, insurance, hardware, integrations, AI).
- **UX intent:** This is the conceptual spine. It makes Fullsteam legible to investors (who care about
  the growth model) and to customers/founders (who care about the software). Use the **Embedded
  Offerings** label, never "Platform."

### 4.3 Explore by vertical (Vertical Software proof — the "meat")
- **UX goal:** Let each customer self-identify and click through to their world. This is the **primary
  conversion moment** and should feel like an invitation to explore, not a product catalog.
- **Content needs:**
  - All **11 verticals** in a flat list (two columns in the Menu overlay) — no category labels.
  - Each vertical with a **plain-language, outcome-oriented** descriptor ("modern software for
    wineries to manage, grow, and optimize sales") — not a feature dump.
  - A **"Find your vertical"** picker / filter control for the exploratory feel.
  - Representative brands shown as evidence (via the header mega-menu and/or hub) without requiring a
    homepage link to every industry.
- **UX intent:** Zero friction for a wine-business owner who doesn't know Fullsteam's product names —
  they find "Wine / Hospitality" and click. Supports "no page-per-industry."

### 4.4 Embedded Offerings in action (growth-engine proof)
- **UX goal:** Prove the embedded expansion is real and valuable — through concrete examples, not
  abstract feature lists (open Q3 in the brief).
- **Content needs:**
  - **Payments, Lending, Insurance** (and AI) introduced as Embedded Offerings — with
    **Hardware & Integrations folded in** (no separate pages, KB §14).
  - Shown via **real customer examples / case-study teasers** (a winery taking payments, a storage
    facility using a device, etc.).
- **UX intent:** Converts "they're a holding company" into "they make their software companies *grow*."
  Particularly persuasive for **investors** (the growth story) and reassures **customers** that
  payments are seamlessly embedded.

### 4.5 Why Fullsteam (three reasons)
- **UX goal:** Answer the implicit "why choose Fullsteam / why is this better" before the visitor leaves.
- **Content needs:** 3 distinct, concrete proof points (aligned to positioning, e.g. system-of-record
  depth, embedded integration seamlessness, AI-enabled & scalable). These should not be generic —
  they should each map to one of the two core stories.
- **UX intent:** A short, scannable trust-and-differentiation moment. Avoid FrontierGrowth-style dated
  "capabilities" lists; keep it proof-forward and modern.

### 4.6 Social proof & outcomes
- **UX goal:** Build trust through credible evidence and human voices.
- **Content needs:**
  - **Outcome/stat band** — a short, credible set of numbers (scale: companies acquired, users served,
    portfolio verticals) presented cleanly (per Quilt reference §18). **Do not** overload — pick the few
    that matter most and let interior pages carry the rest.
  - **Testimonials** — quotes and/or **video testimonials** from named customers (mission video + customer
    video is a cross-reference theme §18).
- **Discovery guardrails (§20.4/§20.7/§20.8):** show **leadership only**, not full staff;
  feature the business with mentions of its leaders. Do **not** name acquisitions still in
  transformation — genericize case studies ("a floral-shop software company") until the
  client confirms publishability. Videos must have **audio + visual**, not talking-head-only;
  no word walls. For investors, favor **inferable KPIs** (growth, retention, margins,
  employee/customer counts, payment volume) and avoid revenue/run-rate or explicit
  profitability.
- **UX intent:** Mirrors the proven reference pattern (Quilt video testimonials, Frontline growth) to give
  the redesign a "human" center and de-risk adopting Fullsteam. Distinguish this from any separate
  stats strip in the hero so the two don't feel redundant.

### 4.7 For Founders (audience path) & the investor proof
- **UX goal:** Serve the seller audience without fragmenting the homepage story, and let investors
  read the growth story from the portfolio/scale proof already on the page.
- **Content needs:**
  - **For Founders / Sellers** → "a home for your business" framing (acquisition process, what we look
    for), with its own light CTA. Lives in the header and/or a homepage feature tab/band.
  - **For Investors** → **no dedicated path** (locked 2026-09-10; KB §14). Investors are served by
    the scale/proof signals and the two-story model; contact is the action.
- **UX intent:** Position Fullsteam as "a home for your business" and let the portfolio itself prove
  the growth-equity story. Do not create an investor directory page.

### 4.8 Closing CTA
- **UX goal:** Give the committed visitor a final, clear action and never dead-end the scroll.
- **Content needs:** Restate the core journey with a fresh call — re-offer **"Explore our vertical
  solutions,"** a "Find your vertical" picker, or a **Contact** action — plus light company context.
- **UX intent:** Recover anyone who scrolled the full story without clicking and convert momentum into
  a step forward.

### 4.9 Our Story / Careers / Footer
- **UX goal:** Quiet company context for employees/candidates and utility without stealing focus.
- **Content needs:** Our Story, **Newsroom** (single dynamic CMS page), Careers entry; standard utility footer (Privacy,
  Terms, Complaints).
- **UX intent:** Serves the employee/candidate audience (audience rank 2) and satisfies legal/utility
  needs at the bottom of the reading path. Careers should read as growth & culture-forward (see KB
  "Building on Great Starts Here").

---

## 5. Key UX Behaviors & Interactions (for the wireframe)

- **Primary CTA placement discipline.** The phrase "Explore our vertical solutions" is reserved for the
  hero's primary action. Secondary/utility CTAs use shorter forms (e.g. "Explore Solutions," "For
  Founders") and are visually quieter so the hero CTA never competes.
- **Find-your-vertical picker.** Lives on the Vertical Software page and in the header **Menu overlay** — not as a header search field. Lightweight filter/type-ahead; must work on mobile. Feeds the   exploratory feel (KB §14). Header chrome is sparse (option B revised on the homepage wire: For Founders + Menu + CTA); the traditional sitemap L1 is reached via overlay and footer.
- **Flat vertical navigation.** All 11 verticals on the Vertical Software page and in the Menu overlay (two
  columns) plus find-your-vertical filter — **not** 11 chrome nav items and **not** category labels.
- **Embedded Offerings label enforcement.** The axis label is "Embedded Offerings" (short form
  "Offerings" in body copy/CTAs). No "Platform," no "Capabilities," no "Services" as the axis name.
- **Responsive behavior.** All interactions (picker, accordions for vertical groups if used, video,
  video testimonials) must degrade cleanly to mobile; test the filter and sticky behaviors.
- **Sticky header interplay.** If the header is sticky, ensure the homepage doesn't present two competing
  CTAs at once when scrolled (hero CTA in content + header "Explore Solutions"). Decide dominant
  behavior in the wireframe (see §8).

---

## 6. UX Success Criteria (testable)

After the redesign, the homepage should move:

1. **A founder/seller** to the **For Founders** path (self-identification + conversion).
2. **An investor** to understand the growth story (sees both stories + scale/proof).
3. **A customer** to their **vertical** (via "Explore our vertical solutions" / "Find your vertical").
4. **An employee/candidate** to **Careers/Our Story**.

Proxy metrics to watch: exploration depth / session depth (H5 conversion goal is *exploration*, not
pure lead-gen — **confirmed in discovery**, §20.2), demo/portfolio-hub clicks, acquisition inquiries,
and the rate of visitors who reach an interior audience or vertical page from the homepage.

---

## 7. Constraints & Ground Rules

- **Brand identity unchanged** — reorganization of content/IA/UX only (KB §2). Not a rebrand.
- **Use "Embedded Offerings"** for the embedded-expansion axis everywhere (short form "Offerings" in body copy; KB §14 / nav terminology note).
- **Primary CTA** = "Explore our vertical solutions" (brief + KB §4/§8).
- **No page-per-industry** on the homepage; use a revenue-ordered subset + representative proof (KB §4/§14).
- **CMS is Duda** (likely retained) — homepage components should be Duda-friendly/reusable.
- **Video is in scope** for social proof (client references §18) — audio + visual, no
  talking-head-only; flag sourcing/production in planning.
- **Validation, not lead-gen** — no PPC; CTAs invite exploration/contact, not funnels (§20.2).
- **Tone:** 8th-grade reading level, conversational, humanize; narrative first, data second (§20.3).
- **Voice:** external copy addresses the reader as **"you"** — the site is talking *to* the
  visitor. Reserve internal "we" for Fullsteam speaking about itself. (Figma comment #7.)
- **Never frame the sale as an "exit"** — "a home for your business" (§20.4).
- **Confidentiality:** no revenue/run-rate, profitability, or named acquisition case
  studies still in transformation; genericize until cleared (§20.7, top-of-KB convention).
- **AI is required in the narrative** but explain use cases first; never imply staff
  reduction; proprietary vertical data is the differentiator (§20.5).
- **Avoid:** stock photography, dated look & feel, overly GTM/product-led portfolio framing (§18).
- Homepage is one of ~25 design pages; it must reuse templates where sensible (KB §14 budget mapping).

---

## 8. Open UX Questions (for wireframe / discovery)

- [ ] Should **For Founders** be a distinct homepage band/feature (§4.7) or a header-only re-entry
      point? (Investors have no path — resolved, see below.)
- [ ] Does the homepage carry **its own stat strip** (§4.6) in addition to any hero proof (§4.1), or is
      one combined proof moment enough? Avoid redundancy.
- [ ] How many **representative verticals/brands** to feature on the homepage vs. hub-only
      inline vs. link to the hub. (KB §14 open item.)
- [ ] **AI homepage treatment** — page exists (nested under Embedded Offerings); decide whether the
      homepage gives AI a band or keeps it inside the Embedded Offerings story. (KB §14; §20.5.)
- [ ] Sticky-header vs. in-content hero CTA dominance when scrolled (§5).
- [x] ~~Confirm the **conversion goal** framing (exploration vs. lead-gen)~~ — **resolved
      in discovery:** the site is validation/credibility, not lead-gen (§20.2). CTAs stay
      exploration/contact-led.
- [x] ~~**AI placement**~~ — **resolved:** dedicated page nested under Embedded Offerings (KB §14).
- [x] ~~**"For Investors" as a nav destination**~~ — **resolved 2026-09-10: deleted.**
      No investor nav node or page; served via homepage scale/proof + Contact (KB §14).
- [ ] Confirm which **scale/KPI signals** are publishable and where the ~15% employer/careers
      content allocation lives (§20.4/§20.11).
- [ ] Which **video content** exists or must be produced for the homepage's social-proof band (§7).

---

*UX scoping derived from `PROJECT_KNOWLEDGE_BASE.md` (sitemap/IA §14, audiences §4, references §18,
palette §15) and the client brief. Visual design, layout, and brand-application notes are intentionally
out of scope for this version and follow in the design pass.*
