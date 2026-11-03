---
name: Scrolling hero improvements
overview: Suggestions for the design exploration 03_Design/explorations/02-video-hero (a pinned video hero where "Any industry, we own the software." hands off to "Then we build what makes it grow."). Based on stepping through the scroll at 1440x900 and 390x844, plus reduced motion. All edits stay inside the gitignored exploration sandbox.
todos:
  - id: fix-empty-window
    content: Retime the line ramps so a headline is always readable (no near-empty frame around 55% of the scroll)
    status: pending
  - id: fix-cta-shift
    content: Shrink the exiting headline with transform scale instead of font-size, so the CTAs stop jumping 26px and "grow." clears the buttons
    status: pending
  - id: legibility-state2
    content: Hold enough tint or add a center scrim at state 2 so white type keeps contrast on bright footage
    status: pending
  - id: footage-sync
    content: Try a single continuous clip, or one clip per state, so the second headline does not land on a random cut (for example the fire hydrant)
    status: pending
  - id: end-hold
    content: Lengthen the settled hold at the end of the pin and add a stub next section to judge the exit
    status: pending
  - id: scroll-cue
    content: Add a small scroll cue on load that fades out as the handoff starts
    status: pending
  - id: a11y
    content: Keep both headlines in the accessibility tree, show both in reduced motion, add a video pause control, pause the video offscreen
    status: pending
  - id: mobile-header
    content: Fix the mobile header, where the gold CTA runs off the right edge at 390px
    status: pending
  - id: perf
    content: Drop or cap the per-frame blur on 120px type, and lighten the 7.3 MB video load
    status: pending
  - id: verify
    content: Re-shoot 1440, 1024, and 390 frames across the scroll, plus reduced motion, and log the changes in direction.md
    status: pending
isProject: false
---

# Video hero (exploration 02): suggested improvements

Target: [03_Design/explorations/02-video-hero/index.html](03_Design/explorations/02-video-hero/index.html), plus its notes in [direction.md](03_Design/explorations/02-video-hero/direction.md). This is the gitignored sandbox, so nothing here touches `design.md`, `wireframes.md`, or the style guide.

The first screen is strong. The type scale, the gold serif payoff word, and the tinted video look premium. Most of the issues are in the middle of the handoff and in the final state.

## What I saw

At 1440x900 the pin is 1620px tall, which gives 720px of scroll travel.

- **There's a moment with no headline.** Around 55% of the scroll (scrollY ~396), the portfolio line is 94% gone and the software line is only 28% in. For that stretch the screen is just video and buttons. The cause is the gap between `pPortLine3` (0.38 to 0.58) and `pSoftIn` (0.48 to 0.68), which overlap too little.
- **The buttons jump mid-scroll.** `--pPortShrink` changes the portfolio `font-size`, which reflows the layout. The CTA row moves from 627px to 601px (26px up) partway through. At the end, the descender on "grow." nearly touches the buttons.
- **The second headline is hard to read.** The tint thins to 20% and the gradient only covers the top 62% of the frame. At the end, "what makes it" sits on a white fire hydrant and pale concrete, and contrast drops a lot.
- **The footage fights the message.** The clip is a montage that keeps cutting on its own clock, regardless of scroll. "...grow." can land on a hydrant with cartoon googly eyes, or on whatever shot happens to be playing.
- **The ending is short.** "grow." finishes at t=0.92, which leaves only ~58px of hold. The page then ends, so the pin release can't be judged.
- **No scroll cue.** The first screen looks complete, so many visitors won't know there's a second message.
- **Accessibility gaps:**
  - The script toggles `aria-hidden` between the H1 and H2, so the page's H1 vanishes for screen readers after the switch. KB §23.6 rule 5 says neither state is `aria-hidden`.
  - Reduced motion shows only the portfolio headline, so "Then we build what makes it grow." is never shown at all.
  - The video loops with no pause control. Moving content that lasts more than 5 seconds needs one under WCAG 2.2.2.
- **Mobile header overflows.** At 390px, the gold "Explore vertical solutions" pill runs off the right edge.
- **Performance.** There's a `filter: blur()` on 120px text, written on every frame. The page preloads 7.3 MB of video (3.2 MB as webm) with `preload="auto"`.
- **Copy and CTA (already flagged in direction.md).** "Careers" competes with the primary CTA. "Any industry," drops the signature opener "Whatever the industry...".

## Suggested changes

### 1. Make the handoff read cleanly
- Overlap the ramps so a headline always carries the frame. For example, start `pSoftIn` at about 0.42 and finish `pPortLine3` by about 0.50, keeping the line stagger. The aim is that one headline or the other is always at least about 60% visible.
- Replace the font-size shrink with `transform: scale(1 - .17 * var(--pPortShrink))` on `.hero__title--portfolio`. That removes the reflow, so the CTAs stay still. It also lets the headline box keep a fixed height, giving "grow." room above the buttons.
- Compress the whole sequence to finish by about t=0.80, then hold the settled state to 1.0. Add a placeholder section after the hero to judge the release.

### 2. Keep state 2 legible
- Floor the tint at about 35 to 40% instead of 20%, or add a soft radial scrim behind the headline block that fades in with `pSoftIn`.
- Check white-on-footage contrast at the final frame against 4.5:1 (large text needs 3:1) at 1440, 1024, and 390.

### 3. Tie the footage to the story
Pick one of these to explore:
- **(a)** A single continuous shot, so the cut points don't matter.
- **(b)** Two clips, one per state, crossfading with `pSoftIn`. One is about owning the software, the other about growth.
- **(c)** Scrub `video.currentTime` from scroll progress, so the same frame always sits under the same headline.

Option (b) maps best onto the two-message model. Separately, the googly-eye hydrant frame undercuts the tone and should be cut from the edit. Note also that the clip is stock-like Square footage, while KB §18 says to avoid stock.

### 4. Small UX additions
- A scroll cue (a chevron or "Scroll", in white mono) at the bottom of state 1, fading out over t 0.10 to 0.24.
- Swap the "Careers" ghost button for "For founders" or "How we grow". Flag this to the CD rather than deciding it here.

### 5. Accessibility and fallbacks
- Stop toggling `aria-hidden` on the headlines. Keep the H1 and H2 in the accessibility tree; visual opacity is enough.
- In reduced motion and no-JS, stack both headlines in document order (portfolio then software), as the locked opening rule requires.
- Add a small pause/play button for the video. Pause it via IntersectionObserver when the hero is off screen, and don't autoplay under `prefers-reduced-motion`.

### 6. Mobile and performance
- At 480px and below, shorten the header pill (for example "Explore"), or hide it when the hero CTA is visible, so it fits at 390px.
- Drop the blur, or cap it to the exit and entry phases only. Opacity plus translate already carries the effect.
- Set `preload="metadata"` and rely on the poster. Consider a smaller mobile encode (720p) via `<source media>`.

## Strategy note
As direction.md already says, this hero replaces the locked grow morph (KB §23) with a headline handoff over video. The fixes above make the exploration a fair test. Promoting it would still be a strategy decision, logged in the KB first.

## Order
Do 1 and 2 first, since they're the biggest visual payoff and quick. Then 5 and 6. Then 3 and 4, which depend on footage and copy decisions. Finish by re-shooting the frames and adding a changelog entry to direction.md.
