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
- **Vocabulary:** the embedded axis is **"Embedded Offerings"** (short form "Offerings"),
  **never "Platform."** The primary CTA is **"Explore our vertical solutions."**
- **Axes vs nav:** *Axis A / Axis B* name the homepage model; *Vertical Software / Embedded
  Offerings* name the sitemap. Do not mix them in copy.

---

## 1. Shared chrome (every page)

| Slot | Role | Status | Note |
|---|---|---|---|
| Logo wordmark | Home link | Locked | `FULLSTEAM` |
| "Menu" button | Opens overlay | Locked | Label fixed |
| "Explore vertical solutions" pill | Primary CTA (short form) | Locked | Header uses the short form; body uses the full form |
| Menu overlay column heads | Sitemap L1 | Locked | Vertical Software · Embedded Offerings · Our Story · Careers · Contact · For Founders |
| Menu overlay vertical list | 11 verticals | Locked | Flat list; **do not** add category labels. Includes **Association Management** |
| Menu overlay "Open roles" | Workday job search | Locked | External: `https://fullsteam.wd1.myworkdayjobs.com/External` · `target="_blank"` · not `careers.html#roles` |
| Overlay finder line | "find your vertical" | Draft | Type-ahead hint |
| Footer columns | Tree recovery | Locked | Company · Explore · Connect · Legal |
| Footer Company links | Tree recovery | Locked | Our Story · Leadership · Careers · **Open roles** (Workday, external) |
| Footer Explore links | Tree recovery | Locked | Vertical Software · Embedded Offerings · For Founders · **FAQ** |
| Footer Connect links | Tree recovery | Locked | Contact · Partner inquiries (`#partner`) |
| Footer legal labels | Privacy · Terms · Complaints | Locked | Labels only; **no pages** exist and none are planned here |

The **11 verticals** (exact labels, used in chrome, the mosaic, and the Vertical Software page):
Hospitality · Weddings & Events · Wine · Retail · Storage & Marina · Health & Wellness ·
Field Services · Transportation · Automotive · **Association Management** · ERP.

---

## 2. Homepage — `02_Wireframes/active/homepage.html`

The opening is a **two-state pinned sequence** (Axis A → grow morph → Axis B). Both states are
content. See KB §23 (and **§24** for the 2026-10-01 client review) before touching anything above
the fold. **The page was reordered 2026-10-01** — this table reflects the new order.

**2026-10-01 messaging pass (intent-first):** the wireframe's supporting copy is replaced by
**section intent notes** (`.anno` — the same convention the interior pages use). The wireframe now
records *what each section must do and for whom*, not final wording; the final copy is written
here. **Primary lens: investors**, founders secondary. This is a **lens change only** — the locked
Axis A/B opening is unchanged (it still addresses founders first), and no IA/order changed.
Messaging themes: forward-thinking, a repeatable process, best stewards of the products (for
founders), and *acquire and make the software companies run better* (for investors).

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
| 03 | Stats band: `70,000+` customers `[placeholder]` · `$75B+` processed `[placeholder]` · `480M+` transactions `[placeholder]` · `2,000+` people `[placeholder]` `*cumulative` | Impressive scale, for investors (`#investors`) | **Placeholder** | **Deck p28 authority set** (2026-10-01); all pending publishability (OI-5). "Profitable" is a *feeling*, never a claim |
| 03 | Investor intent note | Trust signal + disclosure | **Intent** | Imply scale via inferable signals only; no revenue/run-rate/profitability. Marquee backers (Aquiline · Sixth Street · ADIA) **pending publishability — do not ship names** (matches `our-story.html:307`) |
| 04 | Beat + H2 "Keep the businesses growing." | The verticals | Draft | Filmstrip kept — client likes it; moved up 2026-10-01 |
| 04 | Filmstrip: 5 revenue-ordered panels + 11 text links | Verticals in action | Draft | Structural labels only; featured businesses generic until publishability confirmed |
| 04 | KPI cycle card (`70,000+` / `$75B+` / `480M+` / `2,000+`) | Scale cycle | **Placeholder** | Mirrors the stats band (deck p28 set) |
| 05 | Beat + H2 "AI that already knows the business." + lede | AI | **Intent** | Use cases first; never a headcount story; investor-primary lens (AI strengthens the software side) |
| 05 | Three AI example cards (forecasting / back office / support) | AI examples | **Intent** | Headline labels only; client asked to "highlight examples of AI"; genericize the final copy |
| 05 | Link "See AI at Fullsteam" | Cross-link | Draft | → Embedded Offerings#ai |
| 06 | Beat + H2 "A great place to work." + lede | Employer story | **Intent** | Humanizing (2026-10-01); employer-brand track (tertiary) |
| 06 | Three real-image placeholders + "Real team photo — not stock" captions | Culture imagery | **Placeholder** | **Actual people, not stock photos** |
| 06 | Link "See Careers" + LinkedIn strip (cards + follow) | Careers + feed | Placeholder | No real feed data |
| 07 | Beat + H2 "Ready to see where your business can go next?" + CTA + "For Founders — a home for your business" | Close | Draft | |

---

## 3. For Founders — `pages/for-founders.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| Beat "For founders" + **H1** "A home for the business you built." | Page promise | Locked framing | Never "exit" |
| Lede | Support | Draft | Systems of record + AI/payments/operational excellence; software first, certainty of close (2026-10-01) |
| 01 "Why Fullsteam" + H2 "Your name stays. Your team stays." | The offer | Draft | Values fit, close, scale |
| → 4-step list (We talk → real fit → clean close → keeps going) | Process | Placeholder | Structural only: no timelines, multiples, or deal terms |
| 03 "What we look for" + H2 "Software built for one industry." | Fit | Draft | Lead with industry, not an acquisition count; software = system of record, AI/payments added after |
| 03 CTA "Explore our vertical solutions" | Cross-link | Locked | |
| 04 "Talk to us" + H2 "Confirm who we are. Then ask for a conversation." + CTAs | Close | Draft | |

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
| H1 "The software these verticals already run." | Framing | Draft | |
| Lede "Eleven verticals. One page." | Support | Draft | 11 is the settled count; **system of record per vertical**, + AI/payments (2026-10-01) |
| "Read the story" control | Jump to active story | Locked | |
| 11 tiles (labels) | The list | Locked | Exact 11 names; **no category labels** |
| Per-vertical story (title + body + fact chips) | Detail | Placeholder | Genericize; no named case studies until confirmed. Chips now include **"What we add" (AI + payments)** |

---

## 6. Embedded Offerings — `pages/embedded-offerings.html`

One page: Payments · Lending · Insurance · AI at Fullsteam. **Presented as a horizontal
filmstrip on a white background (2026-10-01)** — one card featured; click a card to open its story
(mirrors the homepage "03 — The verticals" section).

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 "Keep the software. Grow how it makes money." | Framing | Draft | 2026-10-01 |
| Lede (software first, then AI/payments/lending/insurance; integrations live here) | Support | Draft | **AI-forward; payments framed as invisible/embedded** |
| 4 filmstrip cards (labels) | The list | Locked | Hardware folds into Payments. Ordered Payments→AI; **promote AI to the first card** optional |
| Featured-card story (title + prose + **3 fact chips**) | Detail | Placeholder | No rates/terms (Lending/Insurance); **AI = use cases, never headcount**. Hash (`#payments`…) opens a card |

---

## 7. Our Story — `pages/our-story.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 "Who we are, before what we do." + CTAs (Explore + Leadership) | Framing | Draft | 2026-10-01 |
| Image band | Supporting | — | **Real Fullsteam people, not stock** |
| KPI strip — 100+ businesses · 2,000+ people · 70,000+ customers · $75B+ on Fullsteam Pay* | Proof | **Placeholder** | All `[placeholder]`; *cumulative; **no revenue/run-rate/profitability** |
| Marquee backers (Aquiline · Sixth Street · ADIA) | Trust signal | Draft | **Confirm publishability** |
| 01 "The company" + H2 "Many software businesses. One home." | Identity | Draft | |
| Split intro + staggered image cluster | | Placeholder | |
| 02 "Leadership" + H2 "The people who lead." + CTA | Teaser | Draft | Leaders only |
| 03 "Chapters" + H2 "How the home came together." | Story | Draft | **Do not invent a timeline.** Year labels stay blank |
| 03 chapter cards (6 × year + title + body) | Chapters | Placeholder | Narratives, not a company timeline |
| 04 + open-role rows + close | Careers teaser + close | Draft/Placeholder | Roles come from the client |

---

## 8. Leadership — `pages/leadership.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 "The people who lead Fullsteam." | Framing | Draft | |
| Lede "Leaders only. This is not a staff directory." | Scope | Draft | |
| 6 leader cards (Name / Role) | People | Placeholder | **No names until the client confirms who is public.** No bios. **Real portraits, not stock** |

---

## 9. Careers — `pages/careers.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 "A big company that does not work like one." | Framing | Draft | |
| Lede | Support | Draft | **2,000+ people across 11 verticals**; mostly remote; close to decision-makers (2026-10-01) |
| 01 "How it feels" + H2 "Room to own the work." | Culture | Draft | Authentic, not a recruiting poster; **real employee imagery, not stock** |
| 02 "Who thrives" + H2 "People who pick up the problem." | Profile | Draft | AI is never a replacing-the-team story |
| 03 "Open roles" + H2 "What is open right now." + **See open roles** pill | Roles | Locked | External Workday (`fullsteam.wd1.myworkdayjobs.com/External`); **no in-page job table** |

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
