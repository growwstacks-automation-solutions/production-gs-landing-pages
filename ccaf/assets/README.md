# /ccaf assets

Binary assets for the **Claude Certified Architect — Foundations** landing page
(`/ccaf`). The brochure PDF is now hosted on ImageKit and wired up; the **OG
image** below is the only item still to add to this folder — the page already
references it at the correct path, so no code change is needed once it exists.

| File | Used by | Spec | Status |
|---|---|---|---|
| `ccaf-og.png` | `og:image` / `twitter:image` (social preview, esp. the LinkedIn post) | 1080×1080 campaign visual | ⏳ **add before going live** |
| `ccaf-program.pdf` | superseded — see Notes | The program brochure | ✅ **wired** to hosted ImageKit URL (no in-repo file needed) |

## Notes

- **OG image** is referenced by absolute URL: `https://growwstacks.com/ccaf/assets/ccaf-og.png`.
  Until the file is committed, social-share previews and the LinkedIn card will
  show no image (the link still works).
- **Brochure PDF** — DONE. Both "Download the Program Details / Program PDF" CTAs
  link to the hosted brochure (opens in a new tab):
  `https://ik.imagekit.io/r2zdlyze2o/ccaf/Growwstacks_CCA-Foundations_Program_Brochure.pdf`
  No in-repo `ccaf-program.pdf` is needed.
- **Instructor headshot** is NOT stored here. It points at the existing ImageKit
  photo already used on `/about` (Manish Mandot), so it renders immediately:
  `https://ik.imagekit.io/r2zdlyze2o/Office /website-images /Manish Sir .png`.
  Swap to a dedicated headshot here only if you want a campaign-specific shot.
