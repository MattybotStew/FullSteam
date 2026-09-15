# FullSteam — Agent Orientation

Welcome. This is the project workspace for the **Fullsteam.com website redesign**.
This file is the canonical agent entry point (works with Cursor, which reads
`AGENTS.md` at the repo root).

## Start here
- **Project knowledge base:** read [`PROJECT_KNOWLEDGE_BASE.md`](./PROJECT_KNOWLEDGE_BASE.md)
  before doing any work. It distills the client brief into goals, audiences,
  scope, constraints, and next steps. **§20 is the discovery-interview synthesis**
  (four internal stakeholder sessions, Sept 2026) — the most current source of
  client intent; read it before making positioning/messaging decisions.
- **Sitemap lock:** read [`plans/sitemap-lock.md`](./plans/sitemap-lock.md) before
  changing L1 nav, page inventory, or chrome. Locked 2026-09-10.
- **Wireframe spec:** read [`wireframes.md`](./wireframes.md) before editing any
  wireframe. It is the source of truth for the wireframe track — inventory,
  section-by-section structure, known gaps, and open items.
- **Homepage UX spec / design doc:** read [`design.md`](./design.md) before working
  on the homepage. It is the UX-only spec (audiences, flow, section intent,
  constraints, open questions) and the future home of the visual design direction.
- **Source assets:** the original client brief lives at
  `clientDocs/Fullsteam Web Brief (1).docx`; the internal discovery interviews live
  at `clientDocs/Fullsteam User Interview Template.xlsx`. Treat them as source of
  truth; the knowledge base is a distillation that should stay in sync.

## Current state (active phase)
- **Discovery is complete** — four internal stakeholder interviews were run
  (Sept 2026) and synthesized in `PROJECT_KNOWLEDGE_BASE.md` §20. Use §20 as the
  current source of client intent.
- **Sitemap locked (2026-09-10, finalized 2026-09-14):** L1 = For Founders ·
  **Vertical Software** · **Embedded Offerings** · Our Story · Careers. **For
  Investors removed** (no nav node, no page). Under Our Story: **Newsroom** (single
  dynamic CMS page) and **Leadership**. For Founders is a single-page leaf; no
  category landing pages. See `plans/sitemap-lock.md` and KB §14.
- We are in the **Sitemap/Wireframe** milestone; the **homepage** is the active
  design surface and is still being iterated.
- **Header chrome (provisional):** Option **B revised** — Logo · For Founders ·
  Menu · Explore vertical solutions. Full L1 in the Menu overlay + footer. Compare
  options in `prototypes/header-wireframe.html`.
- Homepage wireframes live under `prototypes/homepage-wireframe/`. The
  `v0.1-rough/` subfolder holds low-fi explorations (`alternative-home-a.html`,
  `homepage-bendingspoons-style.html` — current direction).
- Wireframe HTML files are static — preview by opening the file or with a static
  server from the repo root:
  `python3 -m http.server 8000` → http://localhost:8000/prototypes/...

## Key facts (quick reference)
- Keep the Fullsteam brand identity unchanged — this is a content/IA/UX
  reorganization, not a rebrand.
- Two core stories: (1) acquire & grow vertical software, (2) expand via
  embedded offerings (payments, lending, insurance, hardware, integrations).
- **Nav terminology:** the embedded-expansion axis is labeled **"Embedded
  Offerings"** (client-preferred, 2026-09-10; short form "Offerings" in body copy).
  The client rejected "Platform." See the alternatives considered in
  `PROJECT_KNOWLEDGE_BASE.md` §14 (nav terminology note) and
  `prototypes/sitemap-rationale.html` §9.
- Primary audiences: software sellers/founders and investors. Secondary:
  employees and customers. **Investors have no dedicated nav/page** — served via
  homepage scale/proof + Contact.
- Primary CTA target: **"Explore our vertical solutions."**
- **Portfolio axis = "Vertical Software"** (renamed from "Solutions", 2026-09-10);
  the CTA stays **"Explore our vertical solutions."**
- **Vertical Software verticals:** flat list of all 11 on the hub and in the Menu
  overlay (two columns) — **no category labels** (deleted after the client call,
  2026-09-14; e.g. no "Hospitality & Events"). Homepage shows a revenue-ordered
  subset only. Hub includes **find-your-vertical** filter (not header search).
- **Embedded Offerings = Payments, Lending, Insurance + AI at Fullsteam.**
  **Hardware and Integrations are not separate pages** (folded into Payments /
  the Embedded Offerings overview), 2026-09-10.
- **Newsroom** (`/our-story/newsroom`) and **Leadership** (`/our-story/leadership`) are both pages under Our Story (2026-09-14).
- CMS is Duda and is likely retained.

### From discovery interviews (§20) — apply these before messaging decisions
- **The site is a validation/credibility destination, not a lead-gen engine.**
  Outbound (email, trade shows, events) drives the pipeline; the site confirms who
  Fullsteam is before a meeting. No PPC. Optimize for exploration + trust, not funnels.
- **Message order: Software → Verticals → Integrate Payments.** Software is ~3/4 of
  revenue, payments ~1/4 (profit split reversed). Payments is currently over-indexed.
- **Narrative first, data second; "who we are" over "what we do."** Humanize the
  company. Tone: 8th-grade reading level, conversational, no jargon.
- **Never frame the sale as an "exit."** Fullsteam is "a home for your business":
  values fit, certainty of close, and a bigger org that scales the founder.
- **Investors:** large PE + sovereign wealth; 3–7 yr horizon; must convey **scale**.
  Use inferable KPIs (growth, retention, margins, employee/customer counts, payment
  volume). Do **not** publish revenue/run-rate or explicit profitability.
- **AI is required in the 2026 narrative** but explain use cases first; never imply
  staff reduction. Fullsteam's proprietary vertical data is the AI differentiator.
- **Acquisitions are not announced at close** — case-by-case, usually after the
  "graduation phase" (a couple of years). Only show leadership, not full staff.
- **Confidentiality:** do not publish named acquisition case studies, revenue figures,
  or profitability. Genericize case studies (e.g. "a floral-shop software company")
  until the client confirms publishability.

## Wireframes vs. design.md — hard boundary (all agents)

The **wireframes** and the **design document** are two separate tracks. Respect
the split; do not conflate or cross-write them.

- **Wireframes** (`prototypes/**/*.html`, governed by [`wireframes.md`](./wireframes.md))
  = structure, IA, content order, interaction scaffolding. They are explorations.
- **`design.md`** = the UX spec and the future **design document** (visual
  direction) — "the design MD we will work on later."
- **Do not treat wireframe styling as final.** Brand colors, the Instrument
  Sans/Serif + Fragment Mono fonts, spacing, radii, and imagery in the wireframes
  are for legibility during review only — not an approved visual direction.
- **Never edit `design.md` to match a wireframe experiment**, and never edit a
  wireframe to match an unagreed design idea. Changes flow:
  discovery/KB → `design.md` intent → wireframe execution. Reconcile deliberately
  and log it.
- If a change touches one track, say so and update the other only when explicitly
  agreed.

## Conventions
- All shared knowledge for this project lives at this root so any agent with
  the FullSteam project (or its subfolders, e.g. `clientDocs`) as its workspace
  can reach it.
- When the brief or decisions change, update `PROJECT_KNOWLEDGE_BASE.md` and
  record decisions there rather than scattering notes across files.
- Wireframe changes: update [`wireframes.md`](./wireframes.md) (section table +
  changelog) when structure or order changes.
