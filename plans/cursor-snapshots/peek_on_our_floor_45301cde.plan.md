---
name: Peek On Our Floor
overview: "Apply the Figma PM comment: set homepage hero peek titles on cards 01 and 03 to “On Our Floor” in the prototype, theme defaults, and stored ACF on Local + Dev. Peek 02 and full slide headlines stay unchanged."
todos:
  - id: proto-peek
    content: Update index.html data-peek-title on slides 1 and 3 to On Our Floor
    status: completed
  - id: theme-defaults
    content: Update front-page.php peek_title defaults for rows 0 and 2
    status: completed
  - id: apply-acf
    content: Sync theme; set stored home_hero_slides peek_title on Local + Dev; flush Dev caches
    status: pending
  - id: docs
    content: Update AGENTS.md, design-spec peek lines, JOURNAL, .clinerules
    status: in_progress
isProject: false
---

# Homepage peeks 01 + 03 → On Our Floor

## What the comment asks for

Figma pin on the Engineered Solutions peek card (PM, 1 day ago):

- “Update the content for these tabs on **1 and 3**”
- “Content: **-ON OUR FLOOR.**”

Reading that as Title Case **`On Our Floor`** (matches existing gallery eyebrows on MCS / Automation). The leading `-` and trailing `.` are comment formatting, not literal copy. **Peek 02** stays `In-Stock & Ready`. Full slide headlines (e.g. slide 1 “Haas Factory Outlet”, slide 3 “Automation Built for Your Shop Floor”) stay as they are — only the **peek card title** line changes.

## Current → target

- **Peek 01** — eyebrow unchanged (`Haas Factory Outlet`); title `A Division of Gerotech` → **`On Our Floor`**
- **Peek 02** — unchanged (`In-Stock & Ready`)
- **Peek 03** — eyebrow unchanged (`Engineered Solutions`); title `Automation for Michigan` → **`On Our Floor`**

## Code changes

1. **[index.html](index.html)** — `data-peek-title` on slides 1 and 3 (~lines 32 and 69).

2. **[wp-content/themes/gerotech-child/front-page.php](wp-content/themes/gerotech-child/front-page.php)** — matching `peek_title` defaults in the `$slides` array (rows 0 and 2).

3. **Docs** so agents don’t re-assert the old peeks:
   - [AGENTS.md](AGENTS.md) / [CLAUDE.md](CLAUDE.md) (symlink): peek 01 + 03 titles → `On Our Floor`
   - [design-spec.md](design-spec.md) hero table if it still lists the old peek titles
   - Prepend [JOURNAL.md](JOURNAL.md); update Current Session State in [.clinerules](.clinerules)

## ACF on Local + Dev (required)

`home_hero_slides` is already stored on the front page, so template defaults alone will **not** change rendered peeks. After theme sync:

- Update rows `0` and `2` `peek_title` to `On Our Floor` via `update_field( 'home_hero_slides', $rows, $home_id )`.
- Local: start Local if down, then WP-CLI with the usual Local PHP + sock recipe.
- Dev: rsync theme (`-avz --delete`) + chmod + same field update over SSH + `wp page-cache flush` + `wp cdn-cache flush`.

A one-shot `wp eval` (or tiny script) is enough; no seeder change required for this copy fix.

## Verify

- Proto: http://localhost:8080 — peeks 01 and 03 read “On Our Floor”
- Dev: https://gerotechdev.wpenginepowered.com/ — same after cache flush
