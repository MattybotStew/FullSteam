# Module — Section 02 sticky image rail

**Archived from homev2** when beat 02 switched to **Option 14 · Parallax depth stack** (2026-10-23).

## Files

| File | Purpose |
|------|---------|
| [`who-sticky-rail.fragment.html`](./who-sticky-rail.fragment.html) | Full `<section>` markup — paste into a page with `id="who-we-are"` and class `who who--sticky-rail` |
| [`who-sticky-rail.css`](./who-sticky-rail.css) | Styles for the grid / rail / steps (extracted from `index.html`) |
| [`who-sticky-rail.js`](./who-sticky-rail.js) | Rail swap + frame entry (`renderRail`, `renderWho`, `measureWho`) — wire into your scroll loop |

## Restore checklist

1. Replace the live `#who-we-are` block in `index.html` with the fragment (update id/classes if needed).
2. Ensure `who-sticky-rail.css` rules are loaded (or merge back into the page stylesheet).
3. Hook `WhoStickyRail.init({ rootId: 'who-we-are', barSelector: '.hero__bar' })` from the main scroll handler, or paste the JS inline as before.
4. Remove or disable `who--parallax` styles/JS if swapping layouts.

## Do not

- Delete this folder when iterating on parallax — it is the canonical saved rail implementation.
