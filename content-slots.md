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
| Overlay finder line | "find your vertical" | Draft | Type-ahead hint |
| Footer columns | Tree recovery | Locked | Company · Explore · Connect · Legal |
| Footer legal labels | Privacy · Terms · Complaints | Locked | Labels only; **no pages** exist and none are planned here |

The **11 verticals** (exact labels, used in chrome, the mosaic, and the Vertical Software page):
Hospitality · Weddings & Events · Wine · Retail · Storage & Marina · Health & Wellness ·
Field Services · Transportation · Automotive · **Association Management** · ERP.

---

## 2. Homepage — `02_Wireframes/active/homepage.html`

The opening is a **two-state pinned sequence** (Axis A → grow morph → Axis B). Both states are
content. See KB §23 before touching anything above the fold.

| # | Slot | Role | Status | Note |
|---|---|---|---|---|
| — | Mosaic kicker "For founders of industry software" | Audience kicker (Axis A) | Draft | Never a product claim |
| — | **Mosaic H1** "Whatever the industry, we own the software it runs on." | Axis A — identity/ownership | **Locked** | The document H1; read first |
| — | Mosaic sub "The software they already run. We keep it." + `[placeholder]` | Axis A support | Draft | |
| — | 11 mosaic tiles (labels) | Axis A proof of portfolio | Locked | Exactly the 11 names above |
| 01 | Beat "01 — The model" | Section marker | Draft | |
| 01 | Axis B kicker "For founders of industry software — and anyone confirming who we are." | Audience + validation | Draft | Echoes mosaic kicker deliberately |
| 01 | **Axis B H2** "Software first. Then we grow it." | Axis B — the growth model | **Locked** | Agreed line (2026-09-24) |
| 01 | Axis B lede | Growth model support | Placeholder | States both halves, Software-first |
| 01 | CTAs: "Explore our vertical solutions" + "Careers" | Primary + secondary | Locked (CTA) | |
| 02 | Beat "02 — Who it's for" + H2 "Find the part that is for you." | Persona door | Draft | |
| 02 | Cards: "For people joining" / "For founders" / "For investors" | Persona doors | Draft | Investors: numbers below; no investor page |
| 03 | Proof strip: `11` vertical markets · `80k+` SMB businesses `[placeholder]` · `2,000+` people `[placeholder]` | Scale, for investors | **Placeholder** | 11 is settled; other two are for layout only — pending publishability (OI-5) |
| 03 | Proof note | Placeholder disclosure | Draft | Makes the placeholders unmistakable |
| 03 | Beat + H2 "A home for the business you built." | Founders value | Locked framing | Never "exit" |
| 03 | Founder voice quote + attribution | Social proof | Placeholder | Genericized; no names until confirmed |
| 04 | Beat + H2 "The system they already run." + link "Browse all verticals" | The software | Draft | |
| 04 | AI card "AI at Fullsteam" + "Learn more" | AI teaser | Draft | Use cases first; never headcount |
| 04b | Beat + H2 "Keep the businesses growing." | The verticals | Draft | |
| 04b | Filmstrip: 5 revenue-ordered panels + 11 text links | Verticals in action | Draft | Panel copy placeholder |
| 04b | KPI cycle card (`11` / `80k+` / `2,000+`) | Scale cycle | **Placeholder** | Mirrors the proof strip |
| 05 | Beat + H2 "Keep the software they trust. Supercharge how they monetize." + link "See all Offerings" | The growth engine (Axis B proof) | Draft | Never "Platform" |
| 05b | Beat + H2 "Use cases first. Never a headcount story." | AI | Locked framing | The AI rule, literally |
| 06 | Beat + H2 "Work across the verticals." + link "See Careers" | Employer story | Draft | |
| 06 | LinkedIn feed (6 cards + dates + follow) | Social feed | Placeholder | No real feed data |
| 07 | Beat + H2 "Ready to see where your business can go next?" + CTA + "For Founders — a home for your business" | Close | Draft | |

---

## 3. For Founders — `pages/for-founders.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| Beat "For founders" + **H1** "A home for the business you built." | Page promise | Locked framing | Never "exit" |
| Lede | Support | Placeholder | |
| 01 "Why Fullsteam" + H2 "Your name stays. Your team stays." | The offer | Draft | Values fit, close, scale |
| → 4-step list (We talk → real fit → clean close → keeps going) | Process | Placeholder | Structural only: no timelines, multiples, or deal terms |
| 03 "What we look for" + H2 "Software built for one industry." | Fit | Draft | Lead with industry, not an acquisition count |
| 03 CTA "Explore our vertical solutions" | Cross-link | Locked | |
| 04 "Talk to us" + H2 "Confirm who we are. Then ask for a conversation." + CTAs | Close | Draft | |

---

## 4. FAQ — `pages/faq.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| Beat "For founders · FAQ" + H1 "Questions founders ask before a meeting." | Framing | Draft | |
| Lede | Support | Placeholder | |
| 6 question rows (Do you only care about payments? / Is this an exit? / name+team / close certainty / do you understand what we do? / when customers hear) | Q&A | Placeholder | Answers must record the locked constraints: software before payments; never "exit"; brands stay standalone; no announcement at close |

---

## 5. Vertical Software — `pages/vertical-software.html`

One page, 11 verticals, no child pages.

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 "The software these verticals already run." | Framing | Draft | |
| Lede "Eleven verticals. One page." | Support | Draft | 11 is the settled count |
| "Read the story" control | Jump to active story | Locked | |
| 11 tiles (labels) | The list | Locked | Exact 11 names; **no category labels** |
| Per-vertical story (title + body + fact chips) | Detail | Placeholder | Genericize; no named case studies until confirmed |

---

## 6. Embedded Offerings — `pages/embedded-offerings.html`

One page: Payments · Lending · Insurance · AI at Fullsteam.

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 "Keep the software. Grow how it makes money." | Framing | Draft | |
| Lede (integrations live here, not their own page) | Support | Draft | |
| "Read the story" control | Jump | Locked | |
| 4 tiles (labels) | The list | Locked | Hardware folds into Payments |
| Per-offering story + fact chips | Detail | Placeholder | No rates/terms (Lending/Insurance); AI = use cases, never headcount |

---

## 7. Our Story — `pages/our-story.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 "Who we are, before what we do." + CTAs (Explore + Leadership) | Framing | Draft | |
| Image band | Supporting | — | Imagery TBD |
| "Scale, pending publishability" KPI strip (4 KPI labels) | Proof | **Placeholder** | Labels only, **no figures** — no revenue/run-rate/profitability |
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
| 6 leader cards (Name / Role) | People | Placeholder | **No names until the client confirms who is public.** No bios |

---

## 9. Careers — `pages/careers.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 "A big company that does not work like one." | Framing | Draft | |
| Lede | Support | Placeholder | Mostly remote; close to decision-makers |
| 01 "How it feels" + H2 "Room to own the work." | Culture | Draft | Authentic, not a recruiting poster |
| 02 "Who thrives" + H2 "People who pick up the problem." | Profile | Draft | AI is never a replacing-the-team story |
| 03 "Open roles" + H2 "What is open right now." + role table | Roles | **Placeholder** | Rows are layout only; real roles from the client; **no invented job titles** |

---

## 10. Contact — `pages/contact.html`

| Slot | Role | Status | Note |
|---|---|---|---|
| H1 "Ask for a conversation." | Framing | Draft | Site confirms; meeting is next; no campaign |
| Lede | Support | Draft | |
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
