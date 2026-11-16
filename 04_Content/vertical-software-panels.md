# Vertical Software — panel copy sheet

One section per sidebar tab, in the order the rail lists them. Each lists the slots that exist
on **`03_Design/client-review/homepage/vertical-software.html`**, what is live today, and a blank
field for the copy to supply. Fill the blanks; the build slots are already wired.

> **Regenerated 2026-11-16, after the Hospitality / Weddings / Wine copy landed.** Those three
> panels now carry client copy; the other eight still carry first-draft paragraphs and
> placeholder stats. Figma lags this file until the frame is repushed.

**Panels are one screen-tall swap, not separate pages.** The sidebar keeps all eleven; the
panel shape is the same for every vertical, and a tier decides how much proof renders:

| Tier | Renders | Verticals |
|---|---|---|
| **min** | title · one paragraph · story photo · 3 stats | Storage & Marina · Health & Wellness · Field Services · Association Management |
| **standard** | min + business-unit logo row + customer/partner logo row | Hospitality · Wine · Retail · Transportation · Automotive · ERP |
| **full** | standard + product screenshot row | Weddings & Events (reference panel) |

Tier is one class + one attribute (`panel--depth-*` / `data-content-depth`). Current record:
KB §28.9, `content-slots.md` §5.0.

## Fixed rules for this track

- **Title is a claim, not a label.** 4–9 words, sentence case, no vertical name in it.
- **One paragraph, no lede.** The 2026-11-09 pass removed the second intro line.
- **No "exit", no revenue, no run-rate, no profitability.** No named acquisition case studies.
- **Named products, customers, and figures need clearance** (KB §29.7 / OI-16).
- **No vertical count in prose.** Eleven is shown by the rail; the copy never says a number.

## Coverage at a glance

| # | Vertical | Tier | Copy | Stats | BU logos | Partner logos | Screens |
|---|---|---|---|---|---|---|---|
| 01 | Hospitality | standard | client ✓ | client ✓ | 4 file(s) | 1 file(s) | hidden (tier) |
| 02 | Weddings & Events | full | client ✓ | client ✓, clearance pending | 4 file(s) | 0 file(s) | pending (full tier) |
| 03 | Wine | standard | client ✓ | client ✓ | 2 file(s) | 0 file(s) | hidden (tier) |
| 04 | Retail | standard | draft | placeholder | 4 file(s) | 2 file(s) | hidden (tier) |
| 05 | Storage & Marina | min | draft | placeholder | 4 file(s) | 0 file(s) | hidden (tier) |
| 06 | Health & Wellness | min | draft | placeholder | 4 file(s) | 1 file(s) | hidden (tier) |
| 07 | Field Services | min | draft | placeholder | 4 file(s) | 1 file(s) | hidden (tier) |
| 08 | Transportation | standard | draft | placeholder | 4 file(s) | 0 file(s) | hidden (tier) |
| 09 | Automotive | standard | draft | placeholder | 4 file(s) | 2 file(s) | hidden (tier) |
| 10 | Association Management | min | draft | placeholder | 4 file(s) | 1 file(s) | hidden (tier) |
| 11 | ERP | standard | draft | placeholder | 4 file(s) | 2 file(s) | hidden (tier) |

---

## 01 · Hospitality

`#panel-hospitality` · tier **standard** · rail label **Hospitality** (locked)

**01 · Panel title (H3, display--m)**

> live: Service runs on the software, not beside it.
>
> copy to supply (blank = keep):
> 

**02 · Panel paragraph (one paragraph)**

> live: From the resort front desk to the first tee to a once-in-a-lifetime journey abroad, Fullsteam connects the property management, golf, and tour operator systems that hospitality businesses run on. Guests get one seamless experience, and operators get a single connected foundation for bookings, service, and payments.
>
> copy to supply (blank = keep):
> 

**03 · Stats (three, value + label)**

| # | Value | Label |
|---|---|---|
| 1 | 15M | Rounds of golf priced annually (Priswing) |
| 2 | 2533521 | Hotel room nights booked through RoomKey in 2025 |
| 3 | 8950031 | Hotel room nights booked through WRP in 2025 |

Values live in `PANEL_STATS`; labels in the panel markup.

**04 · Story photo caption** — `Hospitality · on the ground` (`assets/img/hospitality.jpg`)

**05 · Business-unit software logos (4 file(s))**

> Maestro PMS · Silverware POS · Club Prophet · The Flybook
>
> confirm names / send artwork for any unit not listed:
> 

**06 · Customers & partners logos (1 file(s))**

> Arryved
>
> names + artwork (written permission required):
> 

---

## 02 · Weddings & Events

`#panel-weddings-events` · tier **full** · rail label **Weddings & Events** (locked)

**01 · Panel title (H3, display--m)**

> live: Every event is a one-off, and every one has a date.
>
> copy to supply (blank = keep):
> 

**02 · Panel paragraph (one paragraph)**

> live: Behind the biggest moments in people’s lives is a network of small businesses that make them happen. Our software runs more than 2,200 bridal boutiques around the world where the dress is found, powers the independent florists who design the bouquets and centerpieces, and helps more than 8,000 wedding and event professionals every month orchestrate every detail from the first inquiry to the last dance. Built by bridal, floral, and event pros for their peers, we help turn once-in-a-lifetime celebrations into thriving, well-run businesses.
>
> copy to supply (blank = keep):
> 

**03 · Stats (three, value + label)**

| # | Value | Label |
|---|---|---|
| 1 | 1.2M | Weddings since 2013 |
| 2 | 424K | Dresses sold per year on average—brides, or bridezillas. |
| 3 | 5K+ | Weddings across the U.S. on a typical day |

Values live in `PANEL_STATS`; labels in the panel markup.

**04 · Story photo caption** — `Weddings & Events · on the ground` (`assets/img/weddings-reception.jpg`)

**05 · Business-unit software logos (4 file(s))**

> BridalLive · Floranext · TPP · Aisle Planner Pro
>
> confirm names / send artwork for any unit not listed:
> 

**06 · Customers & partners logos (0 file(s))**

> none
>
> names + artwork (written permission required):
> 

**07 · Product screenshots (three, full tier only)** — needs real UI per business unit.

**08 · Story gallery (Weddings only, 4–6 frames)** — captions optional.

---

## 03 · Wine

`#panel-wine` · tier **standard** · rail label **Wine** (locked)

**01 · Panel title (H3, display--m)**

> live: Wine sells better when you know who you’re selling to.
>
> copy to supply (blank = keep):
> 

**02 · Panel paragraph (one paragraph)**

> live: Our direct-to-consumer commerce platform gives more than 4,000 wineries around the world a single view of every guest across the tasting room, wine club, online store, and reservations, with recommendations, churn predictions, and agentic actions taken to increase revenue. Other platforms manage the transaction; we help wineries grow the relationship.
>
> copy to supply (blank = keep):
> 

**03 · Stats (three, value + label)**

| # | Value | Label |
|---|---|---|
| 1 | 3 | Wineries operating on the Commerce7 platform |
| 2 | 500+ | Average customer tenure |
| 3 | 12 yr | Net revenue retention |

Values live in `PANEL_STATS`; labels in the panel markup.

**04 · Story photo caption** — `Wine · on the ground` (`assets/img/wine.jpg`)

**05 · Business-unit software logos (2 file(s))**

> Commerce7 · WinePulse
>
> confirm names / send artwork for any unit not listed:
> 

**06 · Customers & partners logos (0 file(s))**

> none
>
> names + artwork (written permission required):
> 

---

## 04 · Retail

`#panel-retail` · tier **standard** · rail label **Retail** (locked)

**01 · Panel title (H3, display--m)**

> live: The counter and the back office are one system.
>
> copy to supply (blank = keep):
> 

**02 · Panel paragraph (one paragraph)**

> live: Pricing, purchasing, loyalty, and shrink all meet at the counter, usually in front of a customer. When the systems behind them disagree, the store absorbs the cost in time and trust.
>
> copy to supply (blank = keep):
> 

**03 · Stats (three, value + label)**

| # | Value | Label |
|---|---|---|
| 1 | 18K+ | Operators running the software daily |
| 2 | 8 yr | Average customer tenure |
| 3 | 115% | Net revenue retention |

Values live in `PANEL_STATS`; labels in the panel markup.

**04 · Story photo caption** — `None` (`assets/img/retail.jpg`)

**05 · Business-unit software logos (4 file(s))**

> Logo with  · Logo with  · The letters \ · retail units 4
>
> confirm names / send artwork for any unit not listed:
> 

**06 · Customers & partners logos (2 file(s))**

> retail partners 2 · retail partners 3
>
> names + artwork (written permission required):
> 

---

## 05 · Storage & Marina

`#panel-storage-marina` · tier **min** · rail label **Storage & Marina** (locked)

**01 · Panel title (H3, display--m)**

> live: Recurring revenue with a physical constraint.
>
> copy to supply (blank = keep):
> 

**02 · Panel paragraph (one paragraph)**

> live: Occupancy, waitlists, gate access, and autopay are simple in a demo and stubborn in practice: seasonal demand, delinquencies, and a site manager who needs answers on a phone.
>
> copy to supply (blank = keep):
> 

**03 · Stats (three, value + label)**

| # | Value | Label |
|---|---|---|
| 1 | 6.4K+ | Operators running the software daily |
| 2 | 14 yr | Average customer tenure |
| 3 | 109% | Net revenue retention |

Values live in `PANEL_STATS`; labels in the panel markup.

**04 · Story photo caption** — `None` (`assets/img/storage.jpg`)

**05 · Business-unit software logos (4 file(s))**

> Storage Marina · Storage · storage marina units 3 · Storage Marina
>
> confirm names / send artwork for any unit not listed:
> 

**06 · Customers & partners logos (0 file(s))**

> none
>
> names + artwork (written permission required):
> 

---

## 06 · Health & Wellness

`#panel-health-wellness` · tier **min** · rail label **Health & Wellness** (locked)

**01 · Panel title (H3, display--m)**

> live: Schedules, records, and billing that cannot drift.
>
> copy to supply (blank = keep):
> 

**02 · Panel paragraph (one paragraph)**

> live: Appointments, intake, treatment notes, and reimbursement are one continuous record in practice, and three disconnected systems in most software. The gap shows up as no-shows and denials.
>
> copy to supply (blank = keep):
> 

**03 · Stats (three, value + label)**

| # | Value | Label |
|---|---|---|
| 1 | 12K+ | Operators running the software daily |
| 2 | 7 yr | Average customer tenure |
| 3 | 116% | Net revenue retention |

Values live in `PANEL_STATS`; labels in the panel markup.

**04 · Story photo caption** — `None` (`assets/img/health.jpg`)

**05 · Business-unit software logos (4 file(s))**

> Health Wellness · EyeCloudPro logo: eye icon next to grey text. · Rosy Salon Software · Logo with three gray circles and the word 
>
> confirm names / send artwork for any unit not listed:
> 

**06 · Customers & partners logos (1 file(s))**

> Health Wellness
>
> names + artwork (written permission required):
> 

---

## 07 · Field Services

`#panel-field-services` · tier **min** · rail label **Field Services** (locked)

**01 · Panel title (H3, display--m)**

> live: The job is finished in the field, not the office.
>
> copy to supply (blank = keep):
> 

**02 · Panel paragraph (one paragraph)**

> live: A technician needs the history, the parts, the checklist, and the invoice before leaving the driveway. The office needs the schedule to survive traffic, weather, and a job that runs long.
>
> copy to supply (blank = keep):
> 

**03 · Stats (three, value + label)**

| # | Value | Label |
|---|---|---|
| 1 | 25K+ | Operators running the software daily |
| 2 | 10 yr | Average customer tenure |
| 3 | 114% | Net revenue retention |

Values live in `PANEL_STATS`; labels in the panel markup.

**04 · Story photo caption** — `None` (`assets/img/field-services.jpg`)

**05 · Business-unit software logos (4 file(s))**

> Field · Logo with the word  · The word  · DRS in gray stylized font.
>
> confirm names / send artwork for any unit not listed:
> 

**06 · Customers & partners logos (1 file(s))**

> Field
>
> names + artwork (written permission required):
> 

---

## 08 · Transportation

`#panel-transportation` · tier **standard** · rail label **Transportation** (locked)

**01 · Panel title (H3, display--m)**

> live: Margin lives in the details of every load.
>
> copy to supply (blank = keep):
> 

**02 · Panel paragraph (one paragraph)**

> live: A carrier prices a load, assigns a driver, tracks hours, and settles pay against rules that change by state and by customer. Every handoff is a chance to lose margin quietly.
>
> copy to supply (blank = keep):
> 

**03 · Stats (three, value + label)**

| # | Value | Label |
|---|---|---|
| 1 | 9.8K+ | Operators running the software daily |
| 2 | 13 yr | Average customer tenure |
| 3 | 117% | Net revenue retention |

Values live in `PANEL_STATS`; labels in the panel markup.

**04 · Story photo caption** — `Transportation · on the ground` (`assets/img/transport.jpg`)

**05 · Business-unit software logos (4 file(s))**

> Limo Anywhere · Transportation · transportation units 3 · Transportation
>
> confirm names / send artwork for any unit not listed:
> 

**06 · Customers & partners logos (0 file(s))**

> none
>
> names + artwork (written permission required):
> 

---

## 09 · Automotive

`#panel-automotive` · tier **standard** · rail label **Automotive** (locked)

**01 · Panel title (H3, display--m)**

> live: The lot, the bay, and the ledger.
>
> copy to supply (blank = keep):
> 

**02 · Panel paragraph (one paragraph)**

> live: Inventory ages, service bays fill, and finance paperwork has to be right the first time. Most dealers run that on systems that were never designed to talk to each other.
>
> copy to supply (blank = keep):
> 

**03 · Stats (three, value + label)**

| # | Value | Label |
|---|---|---|
| 1 | 15K+ | Operators running the software daily |
| 2 | 9 yr | Average customer tenure |
| 3 | 113% | Net revenue retention |

Values live in `PANEL_STATS`; labels in the panel markup.

**04 · Story photo caption** — `Automotive · on the ground` (`assets/img/automotive.jpg`)

**05 · Business-unit software logos (4 file(s))**

> ISI Software · automotive units 2 · AutoFluent · Automotive Units 4
>
> confirm names / send artwork for any unit not listed:
> 

**06 · Customers & partners logos (2 file(s))**

> automotive partners 2 · automotive partners 3
>
> names + artwork (written permission required):
> 

---

## 10 · Association Management

`#panel-association-management` · tier **min** · rail label **Association Management** (locked)

**01 · Panel title (H3, display--m)**

> live: Membership is a system, not a list.
>
> copy to supply (blank = keep):
> 

**02 · Panel paragraph (one paragraph)**

> live: An association's value is its record of who belongs, what they are entitled to, and what they have done. Spreadsheets and bolt-on tools make that record expensive to keep.
>
> copy to supply (blank = keep):
> 

**03 · Stats (three, value + label)**

| # | Value | Label |
|---|---|---|
| 1 | 4.2K+ | Operators running the software daily |
| 2 | 11 yr | Average customer tenure |
| 3 | 108% | Net revenue retention |

Values live in `PANEL_STATS`; labels in the panel markup.

**04 · Story photo caption** — `None` (`assets/img/association.jpg`)

**05 · Business-unit software logos (4 file(s))**

> Association · Association Management · Enrollware text in gray. · White text 
>
> confirm names / send artwork for any unit not listed:
> 

**06 · Customers & partners logos (1 file(s))**

> Association Management
>
> names + artwork (written permission required):
> 

---

## 11 · ERP

`#panel-erp` · tier **standard** · rail label **ERP** (locked)

**01 · Panel title (H3, display--m)**

> live: The system of record for the whole operation.
>
> copy to supply (blank = keep):
> 

**02 · Panel paragraph (one paragraph)**

> live: Mid-market operators outgrow entry-level accounting long before they can absorb an enterprise implementation. The gap is where the business runs on exports and reconciliation.
>
> copy to supply (blank = keep):
> 

**03 · Stats (three, value + label)**

| # | Value | Label |
|---|---|---|
| 1 | 22K+ | Operators running the software daily |
| 2 | 15 yr | Average customer tenure |
| 3 | 119% | Net revenue retention |

Values live in `PANEL_STATS`; labels in the panel markup.

**04 · Story photo caption** — `ERP · on the ground` (`assets/img/erp.jpg`)

**05 · Business-unit software logos (4 file(s))**

> PIC Business Systems · SOS Inventory · shopVOX · ShopWorks
>
> confirm names / send artwork for any unit not listed:
> 

**06 · Customers & partners logos (2 file(s))**

> erp partners 1 · Erp
>
> names + artwork (written permission required):
> 

---

## What is not in this sheet

- **Page hero** — H1 "Essential vertical software." + lede, approved 2026-11-16.
- **Page FAQ** — `content-slots.md` §5.2.
- **Sidebar rail labels** — locked, eleven exact names, no category labels.
- **Operational advantages** — removed from this page 2026-10-30.

## Where the copy lands

`vertical-software.html`: titles/paragraphs/stat labels in the panel markup, stat values in
`PANEL_STATS`, logos in `assets/logos/manifest.json`. Promote a tier by changing
`panel--depth-*` and `data-content-depth` only.
