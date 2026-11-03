---
name: Prototype UI tasks
overview: Update the React prototype for the three UI tasks that are fully specified in the tickets. Product-page redesigns and the two new landing pages stay out of this pass until Figma mockups and copy are available.
todos:
  - id: lpl
    content: "Show Horizon MYGA as available on #lpl-landing and add brochure plus rate-sheet resource rows"
    status: completed
  - id: newsroom
    content: "Surface Client Resources rates and downloads on #newsroom and link Compliance Corner"
    status: completed
  - id: brochures
    content: "Add Brochures / Spec Sheets / App Packs / Other tabs on #brochures"
    status: completed
  - id: verify
    content: Verify the three hash routes in the browser at desktop and narrow width
    status: completed
isProject: false
---

# Prototype updates for specified UI tasks

This repo is the React prototype (`#` routes), not the WordPress theme. Plugin audit, CapLock LD+JSON on staging, WP revision restore, and stage-to-prod deploy are out of scope.

Product and audience page redesigns (Harbourview FIA, CapLock, Professionals, Individuals, Sky Harbourview, Harbourview MYGA, Current Rate, Renewal Rates, LevelCap) need the Figma mockups. They are not part of this implementation.

## 1. LPL landing — Horizon MYGA available

[`src/components/LPLLandingPage.jsx`](src/components/LPLLandingPage.jsx) sets `comingSoon: true` on Horizon MYGA. [`PartnerLandingPage.jsx`](src/components/PartnerLandingPage.jsx) renders that as a “Coming Soon” badge and hides the product CTA.

- Remove `comingSoon` so Horizon shows as available with its existing “Learn More About MYGAs” CTA.
- Add Horizon brochure and rate-sheet rows under the existing resources categories (Client Brochures and Rate Sheets), same pattern as the Harbourview FIA rows. Links stay UI-only (no real PDF URLs in the prototype).

## 2. Newsroom — rates, downloads, compliance

[`NewsroomPage.jsx`](src/components/NewsroomPage.jsx) already has filter tabs (including Compliance Corner and Rate Updates) over static article cards. [`ClientResourcesPage.jsx`](src/components/ClientResourcesPage.jsx) already owns live prototype sections for Rates and Downloads.

- Add a “From client resources” band on `#newsroom` that renders the existing Rates and Downloads tab bodies (extract or reuse those section components so they are not copy-pasted).
- Keep Compliance Corner as the existing newsroom filter, and add a short link into that tab from the new band.
- No AJAX or WordPress shortcodes; the prototype equivalent is shared React sections.

## 3. Brochures module — tabs

[`BrochuresPage.jsx`](src/components/BrochuresPage.jsx) is two stacked brochure grids (MYGA and FIA) only. [`DownloadsPage.jsx`](src/components/DownloadsPage.jsx) already lists spec sheets, forms, and other PDFs as rows.

- Add a sticky tab bar on `#brochures`: Brochures, Product Spec Sheets, App Packs, Other.
- Brochures tab keeps the current cards.
- The other tabs reuse the download-row pattern and group the matching document types already listed on the downloads page (prototype labels, PDF buttons remain non-functional).

## Verify

Dev server is already at http://localhost:5173/oceanview/. Check `#lpl-landing` (no Coming Soon, Horizon resources present), `#newsroom` (rates + downloads visible), and `#brochures` (all four tabs). Desktop and a narrow viewport for the tab bars.
