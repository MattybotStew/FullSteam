# Design Exploration Sandbox

> **Status:** Internal only · unreviewed · **NOT client-facing.**
> **This folder is gitignored by default** (`03_Design/explorations/*`). Exception:
> **`02-video-hero/`** is tracked for an internal GH Pages preview (HTML + logo only;
> Square reference video/poster stay gitignored — see `inspiration.md` §2.2). Do not
> add other explorations to git or the Pages allowlist without an explicit decision.

This is a scratch space for **visual / interaction exploration before anything is proposed.**
Throw multiple directions at the wall here, compare them, and only promote a winner into the
real design track. Nothing here is a decision.

---

## The rules

1. **Never client-facing.** Do not link anything in here from `index.html` (the client review
   portal) or add it to `.github/workflows/pages.yml`. The client sees the portal and the
   wireframes; exploration stays behind the curtain until it's chosen and approved.
2. **It is gitignored on purpose — that is the only thing keeping it private.** The repo is
   public, so a *tracked* file is world-readable even if it's not on the portal. If you want
   this folder under version control or shared with the internal team, that needs a **private**
   repo or a shared Figma page — not this folder in this repo (see "If you need to share").
3. **Label everything.** Every page here should carry the banner: *INTERNAL EXPLORATION —
   UNREVIEWED — NOT CLIENT-FACING.* Assume any file could be screenshotted and forwarded.
4. **No confidential client material.** No client docs, no unpublished figures (the OI-5
   publishability list), no named acquisitions. Same rules as the rest of the project.
5. **This is not the design track.** It does not edit `design.md`, `wireframes.md`, or
   `03_Design/style-guide/`. Those change only when a direction is deliberately promoted.

---

## How to preview it

Same workflow as the wireframes — serve from the repo root:

```
python3 -m http.server 8000
# → http://localhost:8000/03_Design/explorations/
```

(The board at `index.html` is a manual list — add a card per exploration set.)

---

## Structure

```
03_Design/explorations/
  index.html            ← the board: one card per exploration set
  README.md             ← this file
  _template/            ← copy this to start a new exploration set
    index.html
  01-dark-cinematic/    ← one folder per exploration set (name: NN-topic)
    index.html
    direction.md
  02-video-hero/
    index.html
    direction.md
```

One folder per exploration set, named `NN-topic` (e.g. `01-dark-cinematic`,
`02-video-hero`). Keep each set self-contained and static (open with the
local server; no build step), so any agent can pick it up cold.

---

## Promotion path (exploration → decision → client)

1. **Explore** here — as many directions as you like.
2. **Choose** one (internally).
3. **Promote** it into the real design track:
   - tokens / rules → `03_Design/style-guide/` (e.g. `homepage-art-direction.md`)
   - intent that changes the spec → `design.md`, with a reconciliation note
   - structural change → `wireframes.md` §2 + changelog (and `design.md` first if it's intent)
4. **Only then** surface it to the client — via the portal (`index.html`) or Figma.

Keep the record honest: the promotion step is what makes something "the direction." Until then,
it's an experiment.

---

## If you need to share exploration internally

- **Cloud sync / team access:** use the **Figma** file (`FS-Design`) — put exploration on a
  dedicated **"Explorations (internal)" page**, and keep the client's Figma links pointed at the
  approved pages only. Figma access is the sharing boundary, not this repo.
- **A private repo** if you want HTML explorations under version control but not public.
- **This folder** stays local-only.

> Owner decision still open: the residual client-doc exposure at commit `33c60f5` (KB §22.7)
> needs the GitHub Support purge request — that's about the *public* repo and is unrelated to
> this sandbox, but worth closing while we're doing hygiene.
