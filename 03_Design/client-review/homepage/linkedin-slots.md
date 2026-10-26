# LinkedIn post strip — status and fill slots (official homepage)

**Module:** `#careersPosts` in [`index.html`](./index.html), at the foot of the careers band.

**State: filled 2026-10-26 with five real posts** taken from the client's own LinkedIn
screenshots, replacing the four placeholder cards. What is in the page is real; what is still
missing is listed under *Outstanding* at the bottom.

## What is on the page

| # | Post | `.li-card__meta` | Artwork ground |
|---|------|------------------|----------------|
| 1 | Hiring — Senior Information Security & Compliance Business Partner | `Oct 2026 · Public` | brand |
| 2 | Fullsteam Voices — Xavier Codrington, Manager, Operations | `Oct 2026 · Public` | ink |
| 3 | Emily Traylor, VP & CISO — Auburn 2026 Young Alumni Achievement Award | `Jul 2026 · Public` | gold |
| 4 | Priswing at HITEC 2026, San Antonio — booth #1252 | `Jun 2026 · Public` | ink |
| 5 | Nilsen Report — up to #28 among U.S. merchant acquirers, up five spots | `Apr 2026 · Public` | brand |

Order is LinkedIn's own feed order, newest first. Add or remove `.li-card` blocks and the nav and
its disabled states follow automatically.

## Rules the copy follows

- **Condensed, never invented.** Each card carries the post's own claim in about two lines. No
  reaction counts, no composite quotes, no post attributed to anyone who did not write it.
- **Emphasis is the source's.** `<em>` renders in the serif italic and is used only where the post
  itself leans on a name (*Emily Traylor*, *Xavier Codrington*), *Nilsen Report*, or *Priswing*.
- **Artwork is rebuilt in tokens, not lifted.** Each post's designed graphic is replaced by the
  same three facts it carried — a mono kicker, a headline, one supporting line — on a flat brand
  ground. No client JPEG is stored in the repo and no stock image stands in for a client's own
  campaign art. See `design-notes.md` "LinkedIn strip — real posts".
- **Article ids stay unique** (`careersPosts`, `liScroller`, `liPrev`, `liNext`).

## Outstanding before launch

| Item | Where | Notes |
|------|-------|-------|
| **Post permalinks** | `.li-card__link` | Currently a non-interactive `<span>` reading "See the post on LinkedIn →". Swap to `<a href="…">` with the live URL, keeping the 44px hit area. |
| **Exact dates** | `.li-card__meta` | Month + year only, inferred from the relative ages in the screenshots (`1W`, `3W`, `3mo`, `4mo`, `6mo` at capture). Pin to real dates or drop the date. |
| **Comms clearing** | cards 2, 3, 5 | Two named employees and one third-party ranking. Both are already public on the client's LinkedIn, but confirm they are still fine to host on the official site. |
| **A current post** | card 1 | The hiring post is time-sensitive. Either keep the strip refreshed or make it evergreen (a Voices or culture post). |

## Behaviour (already wired — do not break)

- `#liScroller` is a `role="region"` with `tabindex="0"`, so keyboard users can arrow-scroll it.
- `#liPrev` / `#liNext` page by exactly one card and disable themselves at each end.
- Scroll-snap is `mandatory`; reduced-motion disables smooth scrolling.
- The right edge carries a mask fade so a clipped card reads as "more to scroll".
- `.li-card__text` is `flex: 1 1 auto`, which keeps every art box and footer link on one line
  regardless of how long the post text runs.
