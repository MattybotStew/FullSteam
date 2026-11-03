---
name: Nebo V2 remaining mockups
overview: The client review page already has the full Happenings flow (cover, listing, RSVP, ticketed, popup, mobile). Most Nebo V2 content is in those frames. What is still missing is a filter-applied frame, an empty-sidebar frame, and a re-import of the newer confirmation and hero treatments.
todos:
  - id: regen-screens
    content: Regenerate screens for the confirmation card, equal hero padding, and checkout without Special Pricing
    status: pending
  - id: reimport-gaps
    content: Re-import only the frames that are still stale (RSVP reserved, ticketed confirmation, heroes) plus add filter-applied and empty-sidebar
    status: pending
isProject: false
---

# Remaining Nebo V2 revisions

Read every top-level frame on [Happenings — Client review](https://www.figma.com/design/jcbtHK67Ih9BsBxFQK7F7l/College-Football---Global-Banner?node-id=634-136) (`634:136`). An earlier pass had opened the wrong page (Space Closure). This page has the flow.

## Frames already in the file

Desktop: `00 Cover`, `01 Listing` (`765:870`), `02 RSVP · Football Fest`, `03 RSVP · Reserved`, two copies of `05 Ticketed · Kickoff` (one is the page before checkout, one includes “You’re going”), `06 Ticketed · pop up`, `07 Ticketed · reserved`, plus a second Gameday capture.

Mobile: `01m Listing`, `Happenings · College Football Hall of Fame` (second listing), `02m RSVP · Football Fest`, `03m RSVP · Reserved`, `04m Ticketed · Kickoff`, `05m Ticketed · Pop Up`, `06m Ticketed · Pop Up`.

Internal only: hero height options and visitor flow. Not client mockups.

## Already covered

- Listing desktop has **Filter by category** and All / Upcoming / Free / RSVP / Ticketed / Exhibitions / Community (`01 Listing`). Mobile listing uses the **Filter** dropdown, which matches the prototype at 390px.
- RSVP form and reserved states exist for Football Fest, desktop and mobile. Reserved copy includes “You’re on the list,” the guest name, and Browse more events / Add to calendar.
- Ticketed Kickoff, the checkout popup, and a reserved state exist. Popup text is Adult, Child, Family 2-Pack, Family 4-Pack, Donation (%), Continue. **Special Pricing is not in any frame.**
- One Kickoff frame and the extra Gameday capture include the page-level “You’re going” line.

## Still needed

- **Filter applied.** There is no frame with one chip selected and the grid reduced (the old `02-listing-filter` screen). `01 Listing` is the all-categories state.
- **Empty sidebar.** No frame where Location and Facebook are hidden and the detail layout is one column.
- **RSVP confirmation card.** `03 RSVP · Reserved` and `03m` still read as the earlier “You’re on the list” block. They do not have the “RSVP confirmed” kicker used on the current ticketed success card. Re-import those two so they match the ticket confirmation (crimson bar, large title, equal-height label-width buttons).
- **Hero spacing.** Frames predate the equal 32px gaps and flexible hero height. Re-import listing, Football Fest, and Kickoff heroes if that spacing is part of the handoff.
- **Duplicate Kickoff.** Two desktop frames are both named `05 Ticketed · Kickoff` (`675:139` without the page confirmation, `767:2360` with it). Keep the one that shows “You’re going” and drop or rename the other so the prototype links are not ambiguous.

Ventrata sandbox keys are still a code handoff, not a missing frame.
