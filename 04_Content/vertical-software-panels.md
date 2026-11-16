# Vertical Software — panel copy sheet

One section per sidebar tab, in the order the rail lists them. Each section lists the
slots that exist on **`03_Design/client-review/homepage/vertical-software.html`**, what is
live today, and a blank field for the copy to supply. Fill the blanks and nothing else has
to move — the build slots are already wired.

**Panels are one screen-tall swap, not separate pages.** The sidebar keeps all eleven; the
panel shape is the same for every vertical, and a tier decides how much proof renders:

| Tier | Renders | Verticals |
|---|---|---|
| **min** | title · one paragraph · story photo · 3 stats | Storage & Marina · Health & Wellness · Field Services · Association Management |
| **standard** | min + business-unit logo row + customer/partner logo row | Hospitality · Wine · Retail · Transportation · Automotive · ERP |
| **full** | standard + product screenshot row | Weddings & Events (reference panel) |

Tier is one class + one attribute (`panel--depth-*` / `data-content-depth`), so promoting a
vertical costs nothing until its proof exists. Current record: KB §28.9, `content-slots.md` §5.0.

## Fixed rules for this track

- **Title is a claim, not a label.** All eleven exist as drafts; they are the only copy on this
  page that is already at review quality. 4–9 words, sentence case, no vertical name in it.
- **One paragraph, no lede.** The 2026-11-09 pass removed the second intro line. 24–50 words.
  Say what the industry's software actually has to survive; do not list features.
- **No "exit", no revenue, no run-rate, no profitability.** No named acquisition case studies.
- **Named products, customers, and figures need clearance** (KB §29.7 / OI-16). Stats marked
  *placeholder* below are invented shapes, not client data — do not treat them as approved.
- **No vertical count in prose.** Eleven is shown by the rail; the copy never says a number.
- Read together the eleven paragraphs must not repeat the same sentence rhythm — vary the
  opening (a scene, a constraint, a failure of existing software).

## Coverage at a glance

| # | Vertical | Tier | Title | Paragraph | 3 stats | BU logos | Customer logos | Screens |
|---|---|---|---|---|---|---|---|---|
| 01 | Hospitality | standard | draft | draft | values: placeholder | 4 from manifest | **none** | hidden (tier) |
| 02 | Weddings & Events | full | draft | draft | real, clearance pending | 4 from manifest | **none** | pending (full tier) |
| 03 | Wine | standard | draft | draft | values: placeholder | 2 from manifest | **none** | hidden (tier) |
| 04 | Retail | standard | draft | draft | values: placeholder | 4 from manifest | **none** | hidden (tier) |
| 05 | Storage & Marina | min | draft | draft | values: placeholder | 4 from manifest | **none** | hidden (tier) |
| 06 | Health & Wellness | min | draft | draft | values: placeholder | 4 from manifest | **none** | hidden (tier) |
| 07 | Field Services | min | draft | draft | values: placeholder | 4 from manifest | **none** | hidden (tier) |
| 08 | Transportation | standard | draft | draft | values: placeholder | 4 from manifest | **none** | hidden (tier) |
| 09 | Automotive | standard | draft | draft | values: placeholder | 4 from manifest | **none** | hidden (tier) |
| 10 | Association Management | min | draft | draft | values: placeholder | 4 from manifest | **none** | hidden (tier) |
| 11 | ERP | standard | draft | draft | values: placeholder | 4 from manifest | **none** | hidden (tier) |

---

## 01 · Hospitality

`#panel-hospitality` · tier **standard** · rail label **Hospitality** (locked)

**01 · Panel title (H3, display--m)**

> live: Service runs on the software, not beside it.
>
> copy to supply:
> 

**02 · Panel paragraph (one paragraph, 24–50 words)**

> live: A restaurant's night is a sequence of commitments: the reservation book, the floor plan, the check, the tip pool, the close. Software that models only the point of sale leaves the rest of the shift in notebooks and group chats.
>
> copy to supply:
> 

**03 · Stats (three, value + label)**

| # | Value (placeholder) | Label (generic placeholder) | Copy to supply |
|---|---|---|---|
| 1 | 42K+ | Operators running the software daily | |
| 2 | 11 yr | Average customer tenure | |
| 3 | 118% | Net revenue retention | |

Values are set in `PANEL_STATS` in the page script; labels sit in the panel markup. Both
were shaped to fit the cell — keep values to 5 characters and labels to 6 words.

**04 · Story photo caption**

> live: Hospitality · on the ground   (photo: `assets/img/hospitality.jpg`)
>
> copy to supply (optional — the default pattern is "[Vertical] · on the ground"):
> 

**05 · Business-unit software logos (up to 4)**

> live: Maestro PMS · Silverware POS · Club Prophet · The Flybook
>
> confirm / add (names, in display order):
> 

**06 · Customers & partners logos (up to 4)**

> live: **none** — the row is hidden until there is at least one entry.
>
> names to supply (needs written permission before publish):
> 

---

## 02 · Weddings & Events

`#panel-weddings-events` · tier **full** · rail label **Weddings & Events** (locked)

**01 · Panel title (H3, display--m)**

> live: Every event is a one-off, and every one has a date.
>
> copy to supply:
> 

**02 · Panel paragraph (one paragraph, 24–50 words)**

> live: Our software runs more than 2,200 bridal boutiques around the world where the dress is found, powers the independent florists who design the bouquets and centerpieces, and helps more than 8,000 wedding and event professionals every month orchestrate every detail from the first inquiry to the last dance.
>
> copy to supply:
> 

**03 · Stats (three, value + label)**

| # | Value | Label | Status |
|---|---|---|---|
| 1 | 1.2M | Weddings since 2013 | live — clearance pending |
| 2 | 424K | Dresses sold per year on average—brides, or bridezillas. | live — clearance pending |
| 3 | 5K+ | Weddings across the U.S. on a typical day | live — clearance pending |

**04 · Story photo caption**

> live: Weddings & Events · on the ground   (photo: `assets/img/weddings-reception.jpg`)
>
> copy to supply (optional — the default pattern is "[Vertical] · on the ground"):
> 

**05 · Business-unit software logos (up to 4)**

> live: BridalLive · Floranext · TPP · Aisle Planner Pro
>
> confirm / add (names, in display order):
> 

**06 · Customers & partners logos (up to 4)**

> live: **none** — the row is hidden until there is at least one entry.
>
> names to supply (needs written permission before publish):
> 

**07 · Product screenshots (three, full tier only)**

> live: Screen 01 BridalLive UI · Screen 02 Floranext · Screen 03 Aisle Planner Pro
>
> supply: one real UI screen per business unit, plus the caption tag under each.
> 

**08 · Story gallery (Weddings only, 4–6 frames)**

> live: horizontal carousel + lightbox, caption *Weddings & Events · on the ground*.
>
> supply: frame-by-frame caption if the client wants each image named.
> 

---

## 03 · Wine

`#panel-wine` · tier **standard** · rail label **Wine** (locked)

**01 · Panel title (H3, display--m)**

> live: Vintage, allocation, and compliance in one ledger.
>
> copy to supply:
> 

**02 · Panel paragraph (one paragraph, 24–50 words)**

> live: A winery's inventory is not a count; it is a set of commitments by vintage, club tier, and channel. Compliance adds a second ledger on top, and the two disagree at the worst possible moment.
>
> copy to supply:
> 

**03 · Stats (three, value + label)**

| # | Value (placeholder) | Label (generic placeholder) | Copy to supply |
|---|---|---|---|
| 1 | 3.5K+ | Operators running the software daily | |
| 2 | 12 yr | Average customer tenure | |
| 3 | 121% | Net revenue retention | |

Values are set in `PANEL_STATS` in the page script; labels sit in the panel markup. Both
were shaped to fit the cell — keep values to 5 characters and labels to 6 words.

**04 · Story photo caption**

> live: Wine · on the ground   (photo: `assets/img/wine.jpg`)
>
> copy to supply (optional — the default pattern is "[Vertical] · on the ground"):
> 

**05 · Business-unit software logos (up to 4)**

> live: Commerce7 · WinePulse
>
> confirm / add (names, in display order):
> 

**06 · Customers & partners logos (up to 4)**

> live: **none** — the row is hidden until there is at least one entry.
>
> names to supply (needs written permission before publish):
> 

---

## 04 · Retail

`#panel-retail` · tier **standard** · rail label **Retail** (locked)

**01 · Panel title (H3, display--m)**

> live: The counter and the back office are one system.
>
> copy to supply:
> 

**02 · Panel paragraph (one paragraph, 24–50 words)**

> live: Pricing, purchasing, loyalty, and shrink all meet at the counter, usually in front of a customer. When the systems behind them disagree, the store absorbs the cost in time and trust.
>
> copy to supply:
> 

**03 · Stats (three, value + label)**

| # | Value (placeholder) | Label (generic placeholder) | Copy to supply |
|---|---|---|---|
| 1 | 18K+ | Operators running the software daily | |
| 2 | 8 yr | Average customer tenure | |
| 3 | 115% | Net revenue retention | |

Values are set in `PANEL_STATS` in the page script; labels sit in the panel markup. Both
were shaped to fit the cell — keep values to 5 characters and labels to 6 words.

**04 · Story photo caption**

> live: Retail · on the ground   (photo: `assets/img/retail.jpg`)
>
> copy to supply (optional — the default pattern is "[Vertical] · on the ground"):
> 

**05 · Business-unit software logos (up to 4)**

> live: Logo with  · Logo with  · The letters \ · retail units 4
>
> confirm / add (names, in display order):
> 

**06 · Customers & partners logos (up to 4)**

> live: **none** — the row is hidden until there is at least one entry.
>
> names to supply (needs written permission before publish):
> 

---

## 05 · Storage & Marina

`#panel-storage-marina` · tier **min** · rail label **Storage & Marina** (locked)

**01 · Panel title (H3, display--m)**

> live: Recurring revenue with a physical constraint.
>
> copy to supply:
> 

**02 · Panel paragraph (one paragraph, 24–50 words)**

> live: Occupancy, waitlists, gate access, and autopay are simple in a demo and stubborn in practice: seasonal demand, delinquencies, and a site manager who needs answers on a phone.
>
> copy to supply:
> 

**03 · Stats (three, value + label)**

| # | Value (placeholder) | Label (generic placeholder) | Copy to supply |
|---|---|---|---|
| 1 | 6.4K+ | Operators running the software daily | |
| 2 | 14 yr | Average customer tenure | |
| 3 | 109% | Net revenue retention | |

Values are set in `PANEL_STATS` in the page script; labels sit in the panel markup. Both
were shaped to fit the cell — keep values to 5 characters and labels to 6 words.

**04 · Story photo caption**

> live: Storage & Marina · on the ground   (photo: `assets/img/storage.jpg`)
>
> copy to supply (optional — the default pattern is "[Vertical] · on the ground"):
> 

**05 · Business-unit software logos (up to 4)**

> live: Storage Marina · Storage · storage marina units 3 · Storage Marina
>
> confirm / add (names, in display order):
> 

**06 · Customers & partners logos (up to 4)**

> live: **none** — the row is hidden until there is at least one entry.
>
> names to supply (needs written permission before publish):
> 

---

## 06 · Health & Wellness

`#panel-health-wellness` · tier **min** · rail label **Health & Wellness** (locked)

**01 · Panel title (H3, display--m)**

> live: Schedules, records, and billing that cannot drift.
>
> copy to supply:
> 

**02 · Panel paragraph (one paragraph, 24–50 words)**

> live: Appointments, intake, treatment notes, and reimbursement are one continuous record in practice, and three disconnected systems in most software. The gap shows up as no-shows and denials.
>
> copy to supply:
> 

**03 · Stats (three, value + label)**

| # | Value (placeholder) | Label (generic placeholder) | Copy to supply |
|---|---|---|---|
| 1 | 12K+ | Operators running the software daily | |
| 2 | 7 yr | Average customer tenure | |
| 3 | 116% | Net revenue retention | |

Values are set in `PANEL_STATS` in the page script; labels sit in the panel markup. Both
were shaped to fit the cell — keep values to 5 characters and labels to 6 words.

**04 · Story photo caption**

> live: Health & Wellness · on the ground   (photo: `assets/img/health.jpg`)
>
> copy to supply (optional — the default pattern is "[Vertical] · on the ground"):
> 

**05 · Business-unit software logos (up to 4)**

> live: Health Wellness · EyeCloudPro logo: eye icon next to grey text. · Rosy Salon Software · Logo with three gray circles and the word 
>
> confirm / add (names, in display order):
> 

**06 · Customers & partners logos (up to 4)**

> live: **none** — the row is hidden until there is at least one entry.
>
> names to supply (needs written permission before publish):
> 

---

## 07 · Field Services

`#panel-field-services` · tier **min** · rail label **Field Services** (locked)

**01 · Panel title (H3, display--m)**

> live: The job is finished in the field, not the office.
>
> copy to supply:
> 

**02 · Panel paragraph (one paragraph, 24–50 words)**

> live: A technician needs the history, the parts, the checklist, and the invoice before leaving the driveway. The office needs the schedule to survive traffic, weather, and a job that runs long.
>
> copy to supply:
> 

**03 · Stats (three, value + label)**

| # | Value (placeholder) | Label (generic placeholder) | Copy to supply |
|---|---|---|---|
| 1 | 25K+ | Operators running the software daily | |
| 2 | 10 yr | Average customer tenure | |
| 3 | 114% | Net revenue retention | |

Values are set in `PANEL_STATS` in the page script; labels sit in the panel markup. Both
were shaped to fit the cell — keep values to 5 characters and labels to 6 words.

**04 · Story photo caption**

> live: Field Services · on the ground   (photo: `assets/img/field-services.jpg`)
>
> copy to supply (optional — the default pattern is "[Vertical] · on the ground"):
> 

**05 · Business-unit software logos (up to 4)**

> live: Field · Logo with the word  · The word  · DRS in gray stylized font.
>
> confirm / add (names, in display order):
> 

**06 · Customers & partners logos (up to 4)**

> live: **none** — the row is hidden until there is at least one entry.
>
> names to supply (needs written permission before publish):
> 

---

## 08 · Transportation

`#panel-transportation` · tier **standard** · rail label **Transportation** (locked)

**01 · Panel title (H3, display--m)**

> live: Margin lives in the details of every load.
>
> copy to supply:
> 

**02 · Panel paragraph (one paragraph, 24–50 words)**

> live: A carrier prices a load, assigns a driver, tracks hours, and settles pay against rules that change by state and by customer. Every handoff is a chance to lose margin quietly.
>
> copy to supply:
> 

**03 · Stats (three, value + label)**

| # | Value (placeholder) | Label (generic placeholder) | Copy to supply |
|---|---|---|---|
| 1 | 9.8K+ | Operators running the software daily | |
| 2 | 13 yr | Average customer tenure | |
| 3 | 117% | Net revenue retention | |

Values are set in `PANEL_STATS` in the page script; labels sit in the panel markup. Both
were shaped to fit the cell — keep values to 5 characters and labels to 6 words.

**04 · Story photo caption**

> live: Transportation · on the ground   (photo: `assets/img/transport.jpg`)
>
> copy to supply (optional — the default pattern is "[Vertical] · on the ground"):
> 

**05 · Business-unit software logos (up to 4)**

> live: Limo Anywhere · Transportation · transportation units 3 · Transportation
>
> confirm / add (names, in display order):
> 

**06 · Customers & partners logos (up to 4)**

> live: **none** — the row is hidden until there is at least one entry.
>
> names to supply (needs written permission before publish):
> 

---

## 09 · Automotive

`#panel-automotive` · tier **standard** · rail label **Automotive** (locked)

**01 · Panel title (H3, display--m)**

> live: The lot, the bay, and the ledger.
>
> copy to supply:
> 

**02 · Panel paragraph (one paragraph, 24–50 words)**

> live: Inventory ages, service bays fill, and finance paperwork has to be right the first time. Most dealers run that on systems that were never designed to talk to each other.
>
> copy to supply:
> 

**03 · Stats (three, value + label)**

| # | Value (placeholder) | Label (generic placeholder) | Copy to supply |
|---|---|---|---|
| 1 | 15K+ | Operators running the software daily | |
| 2 | 9 yr | Average customer tenure | |
| 3 | 113% | Net revenue retention | |

Values are set in `PANEL_STATS` in the page script; labels sit in the panel markup. Both
were shaped to fit the cell — keep values to 5 characters and labels to 6 words.

**04 · Story photo caption**

> live: Automotive · on the ground   (photo: `assets/img/automotive.jpg`)
>
> copy to supply (optional — the default pattern is "[Vertical] · on the ground"):
> 

**05 · Business-unit software logos (up to 4)**

> live: ISI Software · automotive units 2 · AutoFluent · Automotive Units 4
>
> confirm / add (names, in display order):
> 

**06 · Customers & partners logos (up to 4)**

> live: **none** — the row is hidden until there is at least one entry.
>
> names to supply (needs written permission before publish):
> 

---

## 10 · Association Management

`#panel-association-management` · tier **min** · rail label **Association Management** (locked)

**01 · Panel title (H3, display--m)**

> live: Membership is a system, not a list.
>
> copy to supply:
> 

**02 · Panel paragraph (one paragraph, 24–50 words)**

> live: An association's value is its record of who belongs, what they are entitled to, and what they have done. Spreadsheets and bolt-on tools make that record expensive to keep.
>
> copy to supply:
> 

**03 · Stats (three, value + label)**

| # | Value (placeholder) | Label (generic placeholder) | Copy to supply |
|---|---|---|---|
| 1 | 4.2K+ | Operators running the software daily | |
| 2 | 11 yr | Average customer tenure | |
| 3 | 108% | Net revenue retention | |

Values are set in `PANEL_STATS` in the page script; labels sit in the panel markup. Both
were shaped to fit the cell — keep values to 5 characters and labels to 6 words.

**04 · Story photo caption**

> live: Association Management · on the ground   (photo: `assets/img/association.jpg`)
>
> copy to supply (optional — the default pattern is "[Vertical] · on the ground"):
> 

**05 · Business-unit software logos (up to 4)**

> live: Association · Association Management · Enrollware text in gray. · White text 
>
> confirm / add (names, in display order):
> 

**06 · Customers & partners logos (up to 4)**

> live: **none** — the row is hidden until there is at least one entry.
>
> names to supply (needs written permission before publish):
> 

---

## 11 · ERP

`#panel-erp` · tier **standard** · rail label **ERP** (locked)

**01 · Panel title (H3, display--m)**

> live: The system of record for the whole operation.
>
> copy to supply:
> 

**02 · Panel paragraph (one paragraph, 24–50 words)**

> live: Mid-market operators outgrow entry-level accounting long before they can absorb an enterprise implementation. The gap is where the business runs on exports and reconciliation.
>
> copy to supply:
> 

**03 · Stats (three, value + label)**

| # | Value (placeholder) | Label (generic placeholder) | Copy to supply |
|---|---|---|---|
| 1 | 22K+ | Operators running the software daily | |
| 2 | 15 yr | Average customer tenure | |
| 3 | 119% | Net revenue retention | |

Values are set in `PANEL_STATS` in the page script; labels sit in the panel markup. Both
were shaped to fit the cell — keep values to 5 characters and labels to 6 words.

**04 · Story photo caption**

> live: ERP · on the ground   (photo: `assets/img/erp.jpg`)
>
> copy to supply (optional — the default pattern is "[Vertical] · on the ground"):
> 

**05 · Business-unit software logos (up to 4)**

> live: PIC Business Systems · SOS Inventory · shopVOX · ShopWorks
>
> confirm / add (names, in display order):
> 

**06 · Customers & partners logos (up to 4)**

> live: **none** — the row is hidden until there is at least one entry.
>
> names to supply (needs written permission before publish):
> 

---

## What is not in this sheet

- **Page hero** (H1 "Essential vertical software.", lede "Systems of record built around how
  each industry works.", the mesh) — already approved copy as of 2026-11-16, not a per-tab slot.
- **Page FAQ** — separate slot table, `content-slots.md` §5.2.
- **Sidebar rail labels** — locked, eleven exact names, no category labels, no numbers.
- **Operational advantages** — removed from this page 2026-10-30; lives under Our Advantage ›
  Operational Excellence. Do not reintroduce.

## Where the copy lands

Paste into `03_Design/client-review/homepage/vertical-software.html`: titles and paragraphs in
the panel markup, stat values in `PANEL_STATS`, logo names in `assets/logos/manifest.json`.
Promote a tier by changing `panel--depth-*` and `data-content-depth` only. Record the change in
`design-notes.md`; the client-facing slot inventory in `content-slots.md` §5 stays the source of
truth for status.
