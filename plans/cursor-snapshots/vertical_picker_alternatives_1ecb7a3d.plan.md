---
name: Vertical picker alternatives
overview: The Vertical Software sidebar is a control column. Three other patterns can still show all 11 verticals, swap one story, and keep the hash links, without child pages or categories.
todos:
  - id: pick
    content: "Wait for a choice: tile index, chip row, or accordion"
    status: completed
  - id: wire
    content: Replace only the Vertical Software picker, keeping hashes, the hero, and one open story
    status: completed
  - id: log
    content: Note the pattern in wireframes.md
    status: completed
isProject: false
---

# Alternatives to the vertical sidebar

The current picker in [`02_Wireframes/active/pages/vertical-software.html`](02_Wireframes/active/pages/vertical-software.html) is a sticky column of 11 text buttons. Yellow marks the selected one. The story swaps in the panel beside it. That is why it reads like a settings list.

What has to stay the same, from the sitemap lock and [`wireframes.md`](wireframes.md):

- One page. No child pages. No category labels. No search.
- All 11 names stay visible and flat: Hospitality through ERP.
- One story is open at a time. The hash (`#retail`) still selects it, including from the menu.
- The hero stays one page-level headline. Body copy stays lorem.

Embedded Offerings can keep its sidebar. This is only the Vertical Software page.

## Tile index

Eleven name tiles in a grid under the hero. The selected tile is yellow. The story, collage, and fact chips open underneath, full width.

This is the closest relative of the homepage mosaic: the verticals are a field of names, not a menu. Every name stays on screen. The page gets taller by one grid, and the story is no longer beside a column.

## Chip row

The 11 names sit in a wrapping row under the hero. The selected chip is yellow. The story goes full width below, so the collage has more room.

Smallest change. It still looks like controls, just a contents line instead of a sidebar. Eleven names will wrap to two rows on a laptop.

## Accordion

The names stay a single column. The open name reveals its story directly under itself. The others stay in the list, so you scroll the list to move between verticals.

The control and the content are the same object, which is less “tabs.” The open story pushes the names below it down, so the list is no longer a fixed index you can scan in one glance.

## Not these

A prev/next control that hides the other ten names. The page’s job is to show the whole portfolio.

Eleven full stories stacked with no swap. That is a different page, and it drops the one-panel model the lock describes.

No build until you pick one. The wireframe change stays in the Vertical Software HTML and a line in [`wireframes.md`](wireframes.md). `design.md` stays untouched.
