# LinkedIn post strip — client fill slots (homev4)

**Module:** `#careersPosts` in [`index.html`](./index.html), at the foot of the careers band.

The layout is fixed: four cards in a horizontal scroller. Replace the contents of each
`.li-card` with real company-page content from Fullsteam's LinkedIn. **Do not ship**
invented reaction counts, dates, or body copy as if they were live posts.

## Per post (repeat for each card)

| Field | Where it goes | Notes |
|-------|----------------|-------|
| **Posted** | `.li-card__meta` | Relative or absolute date from LinkedIn, e.g. `2d · Public`. Currently `[date] · Public · [placeholder]`. |
| **Body** | `.li-card__text` | Plain text. Keep `<em>` only where the source has emphasis — it renders in the serif italic. |
| **Image** | `.li-card__art` | Optional. Add `li-card__art--photo` and a `--photo: url(...)`, or keep the default `--data` plate for text-only posts. Delete the `.li-card__slot` label once a real image is in. |
| **Link** | `.li-card__link` | Currently a non-interactive `<span>` slot. Swap to `<a href="…">` pointing at the live post, keep the 44px hit area. |
| **Reactions / comments** | not built | Deliberately omitted. Add a `.li-card__stats` row only if the client approves showing counts. |

## Behaviour (already wired — do not break)

- `#liScroller` is a `role="region"` with `tabindex="0"`, so keyboard users can arrow-scroll it.
- `#liPrev` / `#liNext` page by exactly one card and disable themselves at each end.
- Scroll-snap is `mandatory`; reduced-motion disables smooth scrolling.
- The right edge carries a mask fade so a clipped card reads as "more to scroll".

## Suggested count

Four cards. If the client wants a different number, add or remove `.li-card` blocks only —
the nav and disabled states follow automatically.

## Approval

Marketing / comms must confirm each post is cleared for the public website before paste-in.
