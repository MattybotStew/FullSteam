# Design Document: Fullsteam.com Homepage UX

> **Version:** 0.1 (draft for UX only — visual direction to follow)
> **Status:** UX spec to run in parallel with the homepage wireframe
> **Owner:** Matt Stewart (Creative Director) · **Wireframe:** Bionic
> **Related:** `PROJECT_KNOWLEDGE_BASE.md` §14 (sitemap/IA), §15 (palette),
> **§20 (discovery-interview synthesis — read before messaging decisions)**,
> `02_Wireframes/active/header-wireframe.html` (header v0.2), `01_Discovery/synthesis/sitemap-rationale.html`
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
1  OPENING           Axis A (identity/scale) → grow morph → Axis B (growth model) — §3.1
2  WHAT WE DO        "What does Fullsteam do?" — Acquire → Grow/Build (AI + payments) → Lead → founder CTA → impressive stats
3  VERTICALS         The filmstrip (Vertical Software proof; the client-liked treatment)
4  AI                AI at Fullsteam — use cases / examples first; never a headcount story
5  GREAT PLACE TO WORK  Humanizing company story (real imagery, not stock) + Careers/LinkedIn
6  CLOSING CTA       Re-state the journey + Explore / Contact
7  (Our Story / Careers / Footer)   Quiet company context + utility
```

> **Revised 2026-10-01 (client homepage review).** The client asked to (a) make the landing feel
> *more impressive* — scale, modern tech/AI, US/Canada reach — and drop the "11 floating vertical
> bubbles"; (b) lead with a **"What does Fullsteam do?"** breakout (Acquire → Grow/Build → Lead +
> founder CTA + impressive stats); (c) move the **verticals filmstrip up** after it; (d) **kill the
> Software section and the homepage Offerings section in favor of AI** (the Embedded Offerings
> *page* stays); (e) make **Great place to work** humanizing with **real images**. Full record:
> KB **§24**. The opening model (§3.1 / §4.1) is amended, not replaced.

> **Design note for Bionic:** sections are reusable building blocks. The homepage should assemble
> these in an order that keeps the *portfolio + growth/AI* proof in the fold-weighted zone, with
> audience paths and company context beneath. Exact ordering and whether certain bands merge is an
> open wireframe question — see §8 Open Questions.

### 3.1 Opening sequence — Axis A (Portfolio) → grow morph → Axis B (Growth engine)

**Decided 2026-09-24 · Axis A amended 2026-10-01.** The locked two-axis model (KB §14: *portfolio +
growth engine*) is delivered on the homepage **in sequence**, not side by side. The parallel two-lane
treatment in `alternative-home-a.html` is retired for the live build; the same pairing now plays as
two states of the pinned opening:

| | State | Job | Carries |
|---|---|---|---|
| **Axis A** | Portfolio | identity / ownership | Mosaic H1 + audience kicker + **one identity/scale visual** — *what Fullsteam owns* |
| **Axis B** | Growth engine | the growth model | Hero H2 + kicker + the Offerings sub-line — *how those businesses get bigger* |

- **Axis A amended 2026-10-01 (client review).** The 11 scattered vertical tiles ("floating
  bubbles") were **replaced by one identity/scale visual**; the 11 verticals now live in the
  **filmstrip** section (§4.3). The model, the two headlines, the A→B order, the grow morph, and
  both-states-are-content are **unchanged**. KB §24.1/§24.2.
- **Why A comes first:** "portfolio-first understanding" is the page's first UX principle (§1) and
  the message order is Software → Verticals → Payments (§20.1 #4). Axis A earns the right to Axis B's
  claim; Axis B then pays off with the AI / growth proof.
- **The transition is the grow morph.** As the pin scrolls, the **Axis A visual grows to fill the
  sticky frame** while the mosaic and its heading fade and the Axis B copy fades in — an
  interpolated `clip-path` traced per frame from the visual's live rect, plus opacity ramps. It is
  **not** a cut. This was first locked as a **binary snap** on 2026-09-24; the same day the client
  read the discrete cut as "just snapping in place," and the morph was **restored** at the client's
  request. §4.1 for the hero-level rules; `wireframes.md` changelog 2026-09-24 + 2026-09-26 for the
  build and the reconciliation. (Before 2026-10-01 the grow source was the Retail tile `t3`.)
- **Both states are content, not decoration.** Neither is `aria-hidden`: assistive tech reads the H1
  (Axis A) and then the hero H2 (Axis B) regardless of scroll position, and nothing depends on
  seeing the cut. With `prefers-reduced-motion` the pin is skipped and the two states appear in
  document order, A above B — the sequence survives without the motion.
- **Scope guard:** this decision governs the **opening**. Whether the rest of the page is also
  organized as two acts with a hard boundary is open (§8; `wireframes.md` OI-9).
- **Canonical record:** KB **§23** states the same decision as project strategy, with the
  guardrails (§23.6) and the axis vocabulary table (§23.5) this spec assumes.

---

## 4. Section-by-Section UX Intent

### 4.1 Hero (above the fold)
- **UX goal:** In under a few seconds, state what Fullsteam is, prove it's substantial, and hand the
  visitor one clear action.
- **Two statements share the first viewport (decided 2026-09-24).** The pinned opening is not one
  headline but two — **Axis A then Axis B** (§3.1), opened one into the other by the grow morph — and they must not
  say the same thing:
  1. **Axis A — mosaic H1 = identity / ownership** — the document H1, read first: *"Whatever the
     industry, we own the software it runs on."* + audience kicker + *"The software they already
     run. We keep it."* + **one identity/scale visual** (amended 2026-10-01 — before that, the 11
     verticals as scattered tiles; the client rejected the "floating bubbles"). The client wants
     this first screen to feel **more impressive** — scale, modern tech/AI, US/Canada reach.
  2. **Axis B — hero H2 = the growth model** — revealed by the grow: states how the businesses
     Fullsteam owns get bigger. This is the only place the two-story model can reach the first
     viewport (investors and founders are both rank-1 audiences, §2).
- **The transition is the grow morph, not a cut (decided 2026-09-24; morph restored same day).**
  The pinned opening **opens one state into the other** — the **Axis A visual** grows to fill the
  frame as the mosaic recedes and the Axis B copy arrives (before 2026-10-01 the grow source was
  the Retail tile `t3`). Treat this as a strategy rule, not a technicality: a hard cut reads as
  "snapping in place" and was rejected by the client. The two states are declared in CSS; JS writes
  the per-frame `clip-path`/opacity, with **no CSS transition on either state** so the morph cannot
  smear. §3.1; `wireframes.md` changelog 2026-09-24 + 2026-09-26 + 2026-10-01.
- **Content needs:**
  - **Audience kicker** above the hero H2 — it answers *is this for me?* before the headline is read
    and is the standing fix for G-8 (`wireframes.md`). It repeats the mosaic kicker deliberately, as
    a callback across the transition, and adds the validation clause. Never a product claim.
  - **Hero H2 = the growth model in plain words, software-first** — Software → Verticals → Payments
    (§20.1 #4). Agreed line (2026-09-24): **"Software first. Then we grow it."**
  - **Sub-line = who we are, then what we do** — agreed line (2026-09-24): *"A permanent home for each
    software business we buy — plus the Offerings that help it grow: payments, lending, insurance,
    and AI."* Uses the short form **Offerings**; never "Platform."
  - **Single primary CTA:** "Explore our vertical solutions."
  - A **secondary, quieter CTA** for founders/investors ("Selling your business?" / "For investors") —
    present but not competing with the primary CTA.
  - Optional **proof strip** (scale signals) — a short run of credible stats. (See §4.5 before duplicating.)
- **Lane naming (corrected 2026-09-24):** **"the growth engine" is the name of Axis B** (§3.1) — the
  opening's second state, and the axis that beat 04 proves. It is an *axis* name, not a hero
  headline: beat 01 stays the **model** beat and states both halves in plain words rather than
  borrowing the axis label, so the hero doesn't pre-empt the Offerings proof.
- **Discovery direction (§20.8):** update the hero; use **full-width imagery / video
  showing the people behind the brand**; more whitespace; a modern, premium feel.
  Message order Software → Verticals → Payments; do not lead with payments.
- **UX intent:** No jargon, no "platform," no dense corporate sentence. The visitor should be able to
  say "they buy and grow software companies and add payments/etc." The CTA is the primary job; all
  other text serves that CTA.
- **Retired for the hero (2026-09-24):** the deck positioning line *"Fullsteam is the operating system
  for vertical markets"* (KB §19.1). It was never confirmed as the hero message (G-8) and its identity
  job is done better, in visitor language, by the mosaic H1. It stays available for interior pages and
  sales material. See `wireframes.md` G-8 + changelog.

### 4.2 The two stories
- **UX goal:** Give the business model a memorable, two-part shape so both the acquirer story and the
  embedded-growth story register.
- **Content needs:** Two clearly-labeled story lanes —
  1. **Acquire & Grow** (the portfolio / vertical software / "system of record").
  2. **Embedded Expansion / Embedded Offerings** (payments, lending, insurance, hardware, integrations, AI).
- **UX intent:** This is the conceptual spine. It makes Fullsteam legible to investors (who care about
  the growth model) and to customers/founders (who care about the software). Use the **Embedded
  Offerings** label, never "Platform."
- **Lane naming (decided 2026-09-24):** lane 2's plain name is **"the growth engine"** — it names
  **Axis B** in the opening (§3.1), and the **What we do → Grow/Build** block plus the **AI** section
  pay it off. The hero (beat 01) *states* the model without borrowing the axis label. The homepage
  carries no separate "two stories" block: the mosaic H1 (ownership, Axis A) and the hero H2 (growth
  model, Axis B) deliver both lanes above the fold through the morph, and "Grow/Build" + AI prove
  lane 2 in detail.

### 4.3 Verticals (filmstrip — Vertical Software proof, moved up 2026-10-01)
- **UX goal:** Let each customer self-identify and click through to their world. This is the **primary
  conversion moment** and should feel like an invitation to explore, not a product catalog.
- **Placement (2026-10-01).** The filmstrip moves **up to right after "What we do"** (client review,
  Message 3). The client **likes this treatment**, so its design/animation is kept.
- **Content needs:**
  - A revenue-ordered **filmstrip** of representative verticals (a featured panel + shrinking cards)
    and **all 11 verticals as text links** beneath — no category labels.
  - All **11 verticals** in a flat list (two columns in the Menu overlay) — no category labels.
  - Each vertical with a **plain-language, outcome-oriented** descriptor ("modern software for
    wineries to manage, grow, and optimize sales") — not a feature dump.
  - A **"Find your vertical"** picker / filter control (Vertical Software page + Menu overlay).
- **UX intent:** Zero friction for a wine-business owner who doesn't know Fullsteam's product names —
  they find "Wine / Hospitality" and click. Supports "no page-per-industry." The 11 verticals live
  here now, **not** in the opening mosaic (amended 2026-10-01).

### 4.4 AI in action (the growth-engine proof — replaces the homepage Offerings section)
- **UX goal:** Prove the growth story is real through **AI use cases** — concrete examples, not
  abstract feature lists (client review Message 4: "highlight examples of AI").
- **Content needs:**
  - **AI at Fullsteam** introduced with **2–3 example use cases** (forecasting, back-office
    automation, grounded support — genericized). **Use cases first; never a headcount story** (§20.5).
  - **Payments** acknowledged as part of "Grow/Build" in **§4-section "What we do"**, not a separate
    homepage scene. The full **Embedded Offerings** story (payments, lending, insurance, AI) lives on
    its **locked L1 page** — the homepage no longer duplicates it (2026-10-01).
- **UX intent:** Converts "they're a holding company" into "they make their software companies
  *grow*." Particularly persuasive for **investors** (the growth story) and reassures **customers**
  that AI and payments are built into the software they already run.
- **Note (2026-10-01).** The client **removed the homepage Embedded Offerings section in favor of AI**.
  The **Embedded Offerings page and nav node stay** (sitemap lock); only the homepage emphasis changed.

### 4.5 What we do — Acquire / Grow / Lead (added 2026-10-01)
- **UX goal:** Answer the plain question the client wants answered first: **"What does Fullsteam do?"**
  (client review Message 2). This replaces the old persona door / two-up "who we are."
- **Content needs:**
  - A three-part breakout — **Acquire** (we buy great vertical software companies, and keep buying) →
    **Grow/Build** (we grow them with **AI and payments**) → **Lead** (our software powers entire
    industries across 11 verticals).
  - A **founder call to action** ("A home for the business you built" → For Founders) as a banded
    callout after the triad — the client listed it between Acquire and Grow/Build; final position
    to confirm.
  - A lede that carries **Message 1**: Fullsteam's companies are **systems of record** with **AI,
    payments, and operational excellence** built in.
  - The **impressive stats** cap the section (§4.6).
- **UX intent:** A short, scannable answer to "what do they do," proof-forward and modern — avoid
  V2's internal pillar titles (§22.6.4) and never "Platform."

### 4.6 Social proof, stats & outcomes
- **UX goal:** Build trust through credible evidence and human voices — and land the client's
  "way more impressive than you thought" feeling (2026-10-01).
- **Content needs:**
  - **Impressive stats band** (`#investors`) — caps **What we do** (Message 2). Current placeholders:
    **11** verticals · **100+** specialty software businesses · **2,000+** people · **$75B+**
    processed on Fullsteam Pay *(all but 11 pending publishability — OI-5)*. Presented cleanly
    (Quilt reference §18); **do not** overload.
  - A **founder voice** quote (genericized) — kept from the prior build; unpublished until the
    client confirms.
  - The **LinkedIn** lo-fi strip under **Great place to work** carries ongoing proof.
  - **Testimonials** — quotes and/or **video testimonials** from named customers, when the client
    supplies assets (OI-6).
- **"Profitable" is a feeling, not a claim (2026-10-01).** The client cited profitability as part of
  the impression the site should create. Publishing revenue/run-rate/profitability is **forbidden**
  (§20.4/§20.7) — carry the impression with **inferable KPIs** (scale, headcount, volume), never a
  profitability statement.
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
    for), with its own light CTA. Now a **banded callout inside "What we do"** (the founder call to
    action, 2026-10-01), plus the header Menu overlay, footer, and closing link.
  - **For Investors** → **no dedicated path** (locked 2026-09-10; KB §14). Investors are served by
    the **impressive stats band** and the growth model; contact is the action. On the homepage the
    label is an anchor (`#investors`) to that band, not a page.
- **UX intent:** Position Fullsteam as "a home for your business" and let the portfolio itself prove
  the growth-equity story. Do not create an investor directory page.

### 4.8 Closing CTA
- **UX goal:** Give the committed visitor a final, clear action and never dead-end the scroll.
- **Content needs:** Restate the core journey with a fresh call — re-offer **"Explore our vertical
  solutions,"** a "Find your vertical" picker, or a **Contact** action — plus light company context.
- **UX intent:** Recover anyone who scrolled the full story without clicking and convert momentum into
  a step forward.

### 4.9 Great place to work / Our Story / Careers / Footer
- **UX goal:** Quiet company context for employees/candidates and utility without stealing focus.
- **Content needs:** A homepage **"Great place to work"** section (2026-10-01, client review
  Message 5) with **humanizing imagery of real Fullsteam people — not stock photos** (§20.8) — then
  Our Story, Careers entry, and the standard utility footer (Privacy, Terms, Complaints).
  (Newsroom removed 2026-09-23 — no page, no footer/overlay link; see KB §14 and `plans/sitemap-lock.md`.)
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

- [x] ~~Should **For Founders** be a distinct homepage band/feature (§4.7) or a header-only re-entry
      point?~~ **Resolved 2026-10-01:** a banded founder CTA inside **What we do**, plus the header
      Menu overlay, footer, and closing link (§4.7; KB §24). Confirm the exact position.
- [x] ~~Does the homepage carry **its own stat strip** (§4.6) in addition to any hero proof (§4.1)?~~
      **Resolved 2026-10-01:** one **impressive stats band** (`#investors`) caps **What we do**; the
      opening stays claim-only. (KB §24.3.)
- [ ] How many **representative verticals/brands** to feature on the homepage filmstrip vs. hub-only
      inline vs. link to the hub. (KB §14 open item.)
- [x] ~~**AI homepage treatment**~~ **Resolved 2026-10-01:** AI gets its **own homepage section**
      (use cases/examples first). The Software and homepage Offerings scenes were removed; the
      Embedded Offerings page stays. (§4.4; KB §24.)
- [ ] Sticky-header vs. in-content hero CTA dominance when scrolled (§5).
- [ ] **Marquee backers.** The Strategic Positioning 2026 deck (KB §25) names **Aquiline Capital
      Partners, Sixth Street, and the Abu Dhabi Investment Authority** as an underused trust signal.
      Decide whether/where the homepage spotlights them (a strong "impressive" signal).
- [ ] **Opening treatment.** The client wants the first screen to feel *more impressive*; Axis A is
      now one visual, but whether it is video, a product collage, or a scale graphic is an open
      **design/animation** question (KB §24.5).
- [x] ~~Confirm the **conversion goal** framing (exploration vs. lead-gen)~~ — **resolved
      in discovery:** the site is validation/credibility, not lead-gen (§20.2). CTAs stay
      exploration/contact-led.
- [x] ~~**AI placement**~~ — **resolved:** dedicated page nested under Embedded Offerings (KB §14).
- [x] ~~**"For Investors" as a nav destination**~~ — **resolved 2026-09-10: deleted.**
      No investor nav node or page; served via homepage scale/proof + Contact (KB §14).
- [ ] Confirm which **scale/KPI signals** are publishable and where the ~15% employer/careers
      content allocation lives (§20.4/§20.11).
- [ ] Which **video content** exists or must be produced for the homepage's social-proof band (§7).
- [ ] **How far does the grow morph reach?** The opening's Axis A → Axis B transition is decided (§3.1).
      Open: whether the *rest* of the page is also two acts with a hard boundary, and whether the
      opening additionally means scroll-snapping to each state. The scroll-snap reading is deliberately
      not built — page-wide mandatory snap fights long-form reading and traps keyboard/AT users; it would
      have to be opt-in and pin-scoped. (`wireframes.md` OI-9.)

---

*UX scoping derived from `PROJECT_KNOWLEDGE_BASE.md` (sitemap/IA §14, audiences §4, references §18,
palette §15) and the client brief. Visual design, layout, and brand-application notes are intentionally
out of scope for this version and follow in the design pass.*
