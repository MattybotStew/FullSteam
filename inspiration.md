# Fullsteam.com — Inspiration & Layout Patterns

> **Version:** 0.1 (first pattern study)
> **Started:** 2026-09-23
> **Audience:** any agent, model, or human working on Fullsteam layout — this file is
> written to be handed to another model cold, with no other context.
> **Related:** [`wireframes.md`](./wireframes.md) (wireframe track — structure/IA),
> [`design.md`](./design.md) (UX spec / future design doc),
> [`PROJECT_KNOWLEDGE_BASE.md`](./PROJECT_KNOWLEDGE_BASE.md) §9 (client-flagged
> reference sites) and §14 (crawled nav patterns).

---

## 0. Read this first — this is a pattern library, not a moodboard

This file records **what we borrow from each reference site, what we explicitly
reject, and why**. It is the accumulation point for layout study. Every reference
gets the same treatment: who they are, their page architecture, their interaction
patterns, a **take** list, and an **ignore** list.

**Three rules, no exceptions:**

1. **Layout, structure, and interaction ONLY. No visual direction.** Nothing here
   is an approved look. Colors, type, imagery, spacing, and radii in wireframes are
   placeholders for legibility during review — not a design decision. Do not derive
   a visual direction from this file.
2. **"Reference" ≠ approved direction.** A pattern appearing below means the
   pattern is *worth considering*. It is implemented only when it lands in
   `wireframes.md` with a changelog entry (and, if it changes intent, in `design.md`
   first — see the boundary rules in [`wireframes.md`](./wireframes.md) §0).
3. **The guardrails below apply to every pattern.** These come from the discovery
   synthesis (KB §20) and the sitemap lock, not from this file. Re-read them before
   proposing anything.

### Hard guardrails (from KB §20 + the sitemap lock)

| # | Guardrail | Source |
|---|-----------|--------|
| G1 | **Terminology:** the embedded-expansion axis is **"Embedded Offerings"**. Never "Platform" — the client rejected it. Portfolio axis is **"Vertical Software"**. | KB §14 |
| G2 | **Never frame the sale as an "exit."** Fullsteam is *"a home for your business"* — values fit, certainty of close, a bigger org that scales the founder. | KB §20 |
| G3 | **Validation/credibility destination, not lead-gen.** No PPC, no funnels, no demo walls. CTA stays **"Explore our vertical solutions"** + Contact. | KB §20.2 |
| G4 | **KPI allowlist.** Allowed: growth, retention, margins, employee/customer counts, payment volume. **Never publish** revenue, run-rate, or explicit profitability. | KB §20, §19 |
| G5 | **Genericize case studies** until the client confirms publishability (e.g. "a floral-shop software company"). **Acquisitions are not announced at close** — show leadership only, never full staff. | KB §20, confidentiality convention |
| G6 | **Narrative first, data second.** "Who we are" over "what we do." Message order is **Software → Verticals → Integrate Payments**. Payments is currently over-indexed and must not lead. | KB §20 |
| G7 | **AI is required, but use cases first** — never a headcount-reduction story. Fullsteam's proprietary vertical data is the differentiator. | KB §20 |
| G8 | **Wireframes stay lo-fi.** No pattern imported here justifies abandoning the low-fi skin. | `wireframes.md` §0 |

---

## 1. Reference index

| Site | Type | Status | What we took | Where it landed |
|------|------|--------|--------------|-----------------|
| [squareup.com](https://squareup.com/us/en) *(aspirational, client-flagged)* | Layout guide — current | **Active** | Full-bleed overlay hero, mosaic-of-verticals opening, two-up pair, image+copy scenes, industry filmstrip | `homepage-bendingspoons-style.html` (2026-09-21) |
| [bendingspoons.com](https://bendingspoons.com) *(client-flagged)* | Layout guide — superseded | Superseded | Long-form chapter stack; portfolio-as-homepage; premium sparse feel | Partly retained (long-form chapters, 2026-09-21); portfolio cards removed |
| [localyzer.io](https://www.localyzer.io/) | Layout study | **Partial — 2026-09-23** | Kicker, early proof strip, KPI cycle, quote, news filmstrip | `homepage-bendingspoons-style.html` |
| [quiltsoftware.com](https://quiltsoftware.com) *(client-flagged)* | Layout study | Not yet studied | — | — |
| [togetherwork.com](https://togetherwork.com) *(client-flagged)* | Layout study | Not yet studied | — | — |
| [daysmart.com](https://daysmart.com) *(client-flagged)* | Layout study | Not yet studied | — | — |
| [frontiergrowth.com](https://frontiergrowth.com) *(client-flagged)* | Layout study | Not yet studied | — | — |

> Client-flagged references and the "what we like" notes behind them live in
> **KB §9**. Crawled *nav* patterns for the peer set (TogetherWork, DaySmart, Square,
> ECI, Banyan, CORA, Bending Spoons, Quilt) live in **KB §14**. This file covers
> **homepage layout and interaction patterns** — it complements those, it does not
> replace them.

---

## 2. Pattern library

### 2.1 Localyzer — `localyzer.io` (studied 2026-09-23)

**Layout study. Selected patterns implemented 2026-09-23** (kicker, proof strip, KPI cycle, quote, news). Conversion machinery still rejected.

#### Why they are NOT a model for us

It is important to state this up front, because the layout craft is genuinely good
and the temptation is to import the whole thing.

| | Localyzer | Fullsteam |
|---|---|---|
| **Product** | SaaS co-op local marketing automation | Acquiring and growing vertical software businesses |
| **Buyer** | HQ marketing leader at a franchise/dealer network | A founder selling a software business; secondarily investors |
| **Job to be done** | "Run campaigns across our locations" | "Find a good home for the business I built" |
| **Site's job** | **Demo machine** — every path funnels to a booked demo | **Validation destination** — confirm who we are before a meeting |
| **Company story** | Parked on `/about`; homepage never says who they are | **Narrative first** — "who we are" is the point (G6) |

Their homepage is optimized to convert a known-category buyer. Ours is optimized to
help an unfamiliar visitor decide we are credible. **Most of their conversion
machinery is therefore actively wrong for us.**

#### Chrome

| Element | Localyzer | Fullsteam (current) |
|---|---|---|
| Pattern | Sticky dark bar | Sticky, sparse (Option B revised) |
| Contents | Logo · Solutions · About · Blog · Careers · Contact · EN/DE · **Book a Demo** | Logo · Menu · Explore vertical solutions |
| Full L1 in header? | **Yes** — no overlay, full L1 always visible | **No** — Menu overlay + footer carry L1 |
| CTA behavior | Persistent demo CTA in chrome, hero, every beat, and an **overlay lead form** | One primary CTA (**Explore our vertical solutions**) + Contact |

Their footer repeats L1 + legal (Imprint, Terms, Privacy) + social. Their **only**
public conversion path is the hidden demo form (Full Name / Email / Phone + consent
checkbox). There is **no pricing page — it returns 404**, consistent with a
demo-gated sales model. *(We do not have this problem: our site isn't selling a
subscription.)*

#### Homepage section sequence (~14,500 px)

1. **Hero** — audience kicker *"For franchise networks, dealer groups and branch
   organisations"* → large outcome headline → one-line how → **Get Started** +
   **How it Works** → *"Trusted by leading brands…"* + **logo filmstrip**
2. **Cinematic product overlay** — full-bleed lifestyle photo with a floating UI
   card; oversized stat type (*70%+ adoption*) resolves as you scroll in
3. **Pinned mosaic** — long-scroll pin. Left/right photo tiles labeled
   *Launch / Location / Template / Budget* orbit a **center statistic that swaps on
   scroll** (80k campaigns → 70%+ locations → millions in co-op). The supporting line
   and "Get started" repeat inside the pin. This is the page's signature motion.
4. **Challenge bento** — four cards (*Efficient Budget Usage / Scalable Solutions /
   Automation & Simplicity / Consistent Branding*) over large type → then a
   **3-KPI strip** (*1200 campaigns/month · 70%+ adoption · €1.4M co-op budget*)
5. **Feature mosaic (dark)** — six tiles mixing product UI, diagrams, and copy
   (*Expand your reach / Co-Op Budget Management / Steer by Results / Paid Ads /
   Social Posting / Dedicated Support*); numbers **tick while pinned**
6. **Testimonials** — two-up carousel: cropped location photo + long **named** quote
   + company logo. Named brands appear (Sparda-Bank West, Jeans Fritz, LBS,
   Electrolux). Dots + arrows.
7. **Insights filmstrip** — horizontal article cards + "View all articles". Their
   archive is surfaced in full, including articles back to 2018.
8. **Close** — oversized type repeating the CTA line, then one line of copy + CTA
9. **Slim footer**

#### Interaction patterns (structural)

- **Pin-and-swap** — one layout held on screen while headline and statistic cycle.
  Not tabs, not a carousel of different layouts. This is their core motion device.
- **Mosaic / bento as the default container** for both product *and* benefits
- **Filmstrip** for logos and news; **carousel** for quotes
- **Density lives in tiles, not paragraphs** — very large headlines, one- or
  two-line body copy, generous whitespace between beats
- **Motion:** logo marquee, live-looking UI chips, numbers that tick

**Pinned stages:** roughly four (hero → cinematic → product mosaic → feature mosaic).

#### Credibility vs. conversion

| What earns credibility | What is pure conversion (do not import) |
|---|---|
| Named logos, immediately under the hero | "Book a Demo" in chrome on every page |
| Named customer quotes with title + company | "Get started" repeated in every beat |
| Inferable scale (campaigns, adoption %, locations) | Hidden overlay lead form |
| Product-in-context photography | A six-up SaaS feature grid as the value prop |
| UI shown doing the work, not just claimed | "One platform / one connected system" pitch |
| Blog as evidence they understand the market | Pricing gated behind a demo |

**Two observations that matter for us:**

1. **They do not lead with company story.** There is no "who we are" on the

#### ✅ Take — 5 patterns worth considering

Each pattern carries its guardrail inline. Do not lift a pattern without its
constraint.

1. **Audience kicker above the H1.** Their kicker (*"For franchise networks, dealer
   groups and branch organisations"*) instantly answers *is this for me?* before the
   headline is even read. **Fullsteam analog:** a kicker naming the founders /
   operators we serve — which would also resolve **G-8** in `wireframes.md` (our hero
   deck currently rests on the generic "operating system for vertical markets" line).
   **Constraint:** the kicker must not imply a lead-gen relationship (G3) and must not
   use "platform" (G1).

2. **Proof in the first viewport.** Their logo filmstrip sits *immediately* under the
   hero — proof before product. For a validation site this is a better use of early
   real estate than stacking CTAs. **Fullsteam analog:** a client-logo or
   scale-proof strip under the first story beat. **Constraint:** logos require client
   sign-off on publishability; acquisitions are not announced at close (G5), so the
   strip may need to be genericized or built from permitted portfolio brands only.

3. **One pinned mosaic cycling 2–3 inferable statistics.** One layout, swapping
   headline. This maps cleanly onto our pinned mosaic + rise-from-bottom hero —
   it adds a second dimension to a pin we already have, with **no demo and no new
   page**. **Constraint:** every number must sit inside the KPI allowlist — growth,
   retention, margins, employee/customer counts, payment volume. **Not** revenue,
   run-rate, or profitability. Their "millions in budget activated" has no
   permissible Fullsteam equivalent; use something like verticals owned, business
   count, employees supported, or payment volume instead. Mark figures `[verify]`
   until client-confirmed.

4. **Named quote + real place photo + logo, placed after the product beats.** Human
   proof lands harder *after* the product and industry story than before it.
   **Constraint:** genericize until publishable — "a floral-shop software company,"
   not a named acquisition (G5). Leadership only, never full staff. Do not present
   this as a testimonial of a customer relationship; it is a founder/partner voice.

5. **News as a filmstrip, not an archive dump.** Their insights strip is a
   thought-leadership pattern. **Fullsteam analog:** do not add a Newsroom page or
   homepage filmstrip (Newsroom is off the sitemap, 2026-09-23). Credibility stays
   on Our Story / Leadership and allowlisted proof.

*Lighter, optional:* a **3-up KPI strip** after the industry filmstrip (same KPI
allowlist constraint); a **benefit bento** — but only if it frames *who we are /
what we add*, never as a feature matrix.

#### ❌ Ignore — 5 things not to import

1. **Lead-gen chrome.** "Book a Demo" in the header, "Get started" in every beat,
   the hidden overlay form. Our CTA stays **Explore our vertical solutions** +
   Contact (G3). This is the single largest thing to leave behind.
2. **"Platform" language.** They use it hard — it's the section heading, the hero
   tagline, the recurring product frame. The client **rejected** this term (G1). Use
   **Embedded Offerings**, verticals, software.
3. **The six-up SaaS feature mosaic as the story.** Their feature grid *is* their
   value proposition. Ours is not a feature set — a product mosaic must never
   replace "who we are" or displace the Software → Verticals → Payments order (G6).
4. **Their visual brand.** Teal/yellow bento tiles, playful illustration, the
   condensed display type treatment. None of this is a visual direction for us
   (rule 1; G8).
5. **The wrong job-to-be-done mechanics.** "Locations actually use it" works when
   the buyer manages locations. Our visitor is deciding whether to hand over a
   company. Do not import adoption-style framing.

#### Delta vs. Fullsteam's current wireframe

`homepage-bendingspoons-style.html` already has a 7-beat structure: sticky chrome →
mosaic → Retail-tile grow-hero → who-we-are (02) → software (03) → offerings (04)
→ AI (05) → industries (06) → founders close (07).

**Localyzer's real delta is not IA — it is three placements.** Nothing here
justifies changing the locked sitemap.

| Gap in Fullsteam's homepage | Localyzer pattern that would close it |
|---|---|
| No audience kicker; the hero deck is the weakest line on the page (**G-8**) | Audience kicker above the H1 |
| No proof in the first viewport — proof is buried at beats 03 and 06 | Logo / scale-proof strip directly under the first story beat |
| Beat 06 proof is a static filmstrip; the scrolling pin is spent on the hero | Pin that cycles 2–3 statistics from the KPI allowlist |

Plus a **quote block before the close**. Do not add a Newsroom filmstrip (Newsroom
is off the sitemap, 2026-09-23). G-4 remains open for video.

#### If this is ever implemented

> Keep the Square grow-hero. Add an **audience kicker** at beat 01 and a
> **logo / scale-proof strip** beneath it. Convert the **beat 06** treatment to cycle
> 2–3 allowlisted KPIs within one layout. Insert a **genericized founder quote**

### 2.2 Square — `squareup.com/us/en` (current layout guide)

**Status: active.** Client-flagged as aspirational in KB §9 ("look and feel; seamless
way of introducing broad verticals").

**What we took:** full-bleed overlay hero with type over the image; a mosaic of
verticals as the opening move, then the **Retail tile growing** into the full-screen
hero (clip-path from that tile’s rect — not a panel sliding up); a two-up
"who we are" pair; open image+copy scenes; an industry filmstrip for proof.

**Where it lives:** the current homepage wireframe, with a full section table in
[`wireframes.md`](./wireframes.md) §2. Read that for the authoritative section
list — this entry records only why Square was chosen.

**Still open on this reference:** the verticals marquee was removed 2026-09-23, so
the mosaic now carries vertical naming alone. See `wireframes.md` §8 changelog.

**Desktop vs mobile split (layout pattern, 2026-09-23):** Square’s pinned mosaic +
**Retail tile grow-hero** is a **wide-viewport** beat. On small screens (≤768px) we do
**not** run scatter, sticky pin, or overlay. The same story is a stack in document
flow: headline → full-width vertical tabs (all on canvas) → full-bleed hero as the next
section. Reduced-motion uses that in-flow stack on every width.

---

### 2.3 Bending Spoons — `bendingspoons.com` (superseded layout guide)

**Status: superseded by Square** (2026-09-21), but not discarded.

**What survives:** the **long-form chapter stack** — a scroll that reads as a guide
rather than a feature tour. Our beat numbering (01–07) and the stacked-chapter
approach to offering detail come from here.

**What was dropped:** the deal-card portfolio treatment and the founder/investor
story split, both removed from the scroll on 2026-09-21.

**Client note (KB §9):** "unique, engaging experience; premium product feel."

---

### 2.4 Reserved — not yet studied

These are client-flagged references (KB §9) with no layout study yet. Add a `§2.x`
entry in the same format when one is studied.

| Site | Why it was flagged | Angle worth studying |
|---|---|---|
| quiltsoftware.com | Brand consistency, premium feel, company stats, mission + customer video | **Video** (KB §9): mission video + customer video testimonials |
| togetherwork.com | Introduces verticals on the homepage without multiple pages | **Verticals-on-one-page** — directly analogous to our single Vertical Software page. Caution: client dislikes their stock photography. |
| daysmart.com | How they showcase a product portfolio; mission and values | **Portfolio presentation.** Caution (KB §9): "too GTM-focused for us." |
| frontiergrowth.com | Hero video; homepage content blocks; how they show value-add | **Hero video + content blocks.** Caution: client dislikes the font; look feels dated. |

---

## 3. Adding to this file

When a new reference is studied:

1. Add a row to the **§1 index** with status `Studied — not implemented`.
2. Add a **§2.x** entry in the Localyzer format: who they are → why they are or
   aren't a model → chrome → section sequence → interaction patterns → credibility
   vs conversion → **Take** (numbered, each with its guardrail inline) → **Ignore**
   (numbered, each with the reason) → delta vs our current wireframe → implementation
   sketch if warranted.
3. **Every take must carry its constraint inline.** A pattern handed to another
   model without its guardrail will be implemented wrong — that is the main failure
   mode this file exists to prevent.
4. **Cross-check the KB confidentiality convention** before recording any figure or
   named brand taken from a reference site.
5. Mark the status honestly. `Studied` does not mean `approved`. If a pattern ships,
   say where — the wireframe changelog in [`wireframes.md`](./wireframes.md) §8 is
   the system of record for implementation.

**Do not** edit `design.md` or a wireframe on the strength of this file alone.
Patterns move: discovery/KB → `design.md` intent → wireframe execution. See the
boundary rules in [`wireframes.md`](./wireframes.md) §0.

---

   homepage — it lives on `/about`. Fullsteam's intent (G6) is the **inverse**.
2. **Their scale numbers are the trap.** Volume, adoption percentage, and budget
   activated are all easy for a SaaS to publish. Our equivalent numbers are
   revenue and profitability, which are **not publishable** (G4). Any numeric
   device we borrow must be re-cast into the allowlist.

---
