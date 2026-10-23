# LinkedIn carousel — client fill slots

**Module:** `#careersPosts` in [`index.html`](./index.html)  
**Figma pin:** use actual LinkedIn posts instead of mocks.

The carousel layout is fixed. Replace each `.li-card` with real company-page content from Fullsteam’s LinkedIn. **Do not ship** placeholder reaction counts or `[placeholder]` body copy as if they were live posts.

## Per post (repeat for each card)

| Field | Where it goes | Notes |
|-------|----------------|-------|
| **Posted** | `.li-card__meta` (e.g. `2d · Public`) | Relative or absolute date from LinkedIn |
| **Body** | `.li-card__text` | Plain text; keep `<em>` only if emphasis exists in source |
| **Image** | `.li-card__art` `--photo` or remove art div if text-only | Optional; respect LinkedIn crop |
| **Link** | Wrap card or add “View on LinkedIn” | URL to the live post |
| **Reactions / comments** | `.li-card__stats` | Only if client approves showing counts |

## Suggested count

Four cards match the current scroller. Add or remove cards in HTML only if the client wants a different number (keep keyboard scroll + prev/next behaviour in sync).

## Approval

Marketing / comms must confirm posts are OK for the public website before paste-in.
