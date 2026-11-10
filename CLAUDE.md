# CLAUDE.md — Fullsteam project

`AGENTS.md` at this root is the canonical agent orientation file: read it first, and read
`PROJECT_KNOWLEDGE_BASE.md` before making positioning, messaging, or visual decisions. This file
does not repeat either of them. It tracks **the decisions and open questions from the 2026-11-10
design cleanup** of the client-review pages (`03_Design/client-review/homepage/`), so a fresh
session does not silently re-decide them.

Everything below is uncommitted work in the tree. Nothing has been committed, pushed, or
branched.

---

## Resolved 2026-11-10

### 0. Client feedback round (applied)

- **Vertical Software** — every panel's title moved into the left column above its
  paragraph (`.panel__intro`), and the `border-top` rule above `.panel__body` is gone, so
  the title's first line sits level with the top of the figure. All 11 panels.
- **Acquisitions hero** — one film card, labelled **"See a Featured Story"**; the two CTA
  buttons are gone. The other three cards are preserved as a dormant HTML comment inside
  `.founder-film__track`, and the four-up grid is preserved as a commented CSS block —
  restore both together when the real founder films land.
- **Footer (all seven pages)** — Our Advantage now carries exactly three sub-labels:
  **Embedded FinTech · AI at Fullsteam (green) · Operational Excellence**. The standalone
  AI category and the separate "Payments" link are gone (Embedded FinTech still lands on
  `#payments`). `.footer__cat > a` is now a colour-only rule (no mono/uppercase) so it sits
  in the list evenly. **Building on Great** sits between the logo and the blurb.
- **Our Story** — the chapter index under the hero is gone (see below); nothing else in
  the top section changed.
- **Homepage model band** — Acquire/Grow/Lead run as a **chained sequence**: Acquire lights
  on scroll, its counters run to completion, then Grow lights, then Lead (`32bc961`,
  2026-11-10 — chosen over the earlier independent-observer version in `6b6ae08`). Do not
  "fix" this back to independent firing; it is deliberate. Reduced-motion shows final figures.
- **Interior hero blobs** — each hero now declares its own `--blob-a/b/c` brand colours at
  `opacity: 1` (`8d00eee`), replacing the old cyan/orange/teal dye-lot mixes.
- **Acquisitions film card** — 16:9 thumb (104–140px) with the play badge bottom-right
  (`c23c8db`); the card itself sits under the lede, under the copy column.

### 1. Shared stylesheets can now deploy (needs the files committed)

`assets/site.css` and `assets/hero.css` were both unreachable on Pages: `assets/*` deny-lists
the folder, and `pages.yml` copies only named files.

Fixed in two places, both outside the design folder:
- `.gitignore` — allow-list lines for **both** stylesheets.
- `.github/workflows/pages.yml` — `site.css` and `hero.css` added to the `cp` that stages
  `assets/`.

Both files are now untracked-but-committable (`git status` shows `??`). **They must be
`git add`-ed with the seven pages**, or the deploy ships HTML that 404s its stylesheets.

### 2. Homepage header: two systems, on purpose

`.bar`, `.bar.is-solid` / `.bar.is-on-dark` and the logo swap stay page-local in `index.html`
(transparent over the opening plate → translucent white on scroll → dark scrim over dark bands)
versus solid white from first paint on the six interior pages. Decided to keep them split until
the transparent-bar-over-plate behaviour is itself decided; unifying now would repaint the
homepage opening or turn its menu ink on the dark scrim. Everything else about the bar is shared.

### 3. Contact's mobile footer rules now apply

The `@media (max-width: 640px)` footer block sat above the base footer rules, so the tap-target
spacing was dead. The four duplicate base rules that had been keeping it dead are gone, so the
media block wins as intended. Measured at 375px: footer 1428 → **1330px**, link hit areas
**19 → 41px**, sub-links 17 → 40px. Desktop (≥641px) is unchanged.

### 4. `--brand-deep` deleted

It held the exploration teal `#003F55` (OI-13) and had **no consumers** anywhere in the build,
so the token was removed rather than re-pointed. No visual change.

---

## Still open

### 5. Footer link colour — two variants, and the counts are easy to get wrong

Three pages set it explicitly (`our-advantage`, `our-story`, `vertical-software`):
`.footer a { color: rgba(255,255,255,.86) }`. The other **four** (`index`, `contact`, `careers`,
`for-founders`) only set the transition, so their links inherit `.footer`'s
`rgba(255,255,255,.62)`.

So the "explicit .86" version is the **minority**, not the majority. Unifying on it brightens
every footer link on four pages. Unifying on the plain version would dim three. Either way it is
a taste call with a visible change on one group — not a cleanup. Decision needed before touching.

(The **AI at Fullsteam** label is exempt: those three pages restate `.footer__cat > a { color:
var(--green) }` locally, because their `.footer a` rule outranks `site.css` on order alone.)

### 6. Hero dye-lot colours — resolved 2026-11-10

The old mixes (`#00C8FF`, `#FF6A00`, `#FF9D00`, `#FFE9A3`) are gone. `8d00eee` gives each
interior hero its own `--blob-a/b/c` pair from the brand palette at `opacity: 1`
(Careers `#2F86B0 / #FFC600 / #C9E88A`, Our Story `#84BD00 / #00587C / #FFC600`). Page
backgrounds are unchanged. No action needed unless the client wants the mixes back.

### 7. The `.vp--all` gradient — not a one-line fix

`index.html` paints the sixth verticals index cell with
`linear-gradient(160deg, #006C99, #003F55, #032B39)`. `#003F55` is the same exploration teal as
item 4, but replacing only the middle stop leaves `#006C99` and `#032B39` off-palette, so the
tile would change appearance without the palette actually being clean. Either treat it as art
direction (same bucket as item 6) or derive all three stops from Bio Blue. `--brand-deep`'s
deletion does not touch it — this is a literal.

---

## Settled this pass (do not re-litigate silently)

- **Stylesheet order is load-bearing.** `assets/site.css` is linked **before** each page's
  `<style>` so page-local rules win on a tie; `assets/hero.css` is linked **after** `</style>`
  so shared hero mechanics win over the page's remaining overrides. Reversing either will
  quietly change the layout.
- **`variants/hero-A-paper-mesh-2026-10-29.html` stays.** It is linked from the review portal
  (`index.html`), staged by `pages.yml`, and tracked — the A/B arm (KB §27.10).
- **`contact-hero-pilot.html` was deleted** (orphan copy, no inbound links).
- **No copy, content, or page structure changed** in the cleanup; the seven pages rendered
  pixel-identical at 1440 and 375 before the two items above were applied.
