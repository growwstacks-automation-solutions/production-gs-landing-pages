# /ccaf assets

Binary assets for the **Claude Certified Architect — Foundations** landing page
(`/ccaf`). Drop the two files below into this folder with these exact names —
the page already references them at the correct paths, so no code change is
needed once they exist.

| File | Used by | Spec | Status |
|---|---|---|---|
| `ccaf-og.png` | `og:image` / `twitter:image` (social preview, esp. the LinkedIn post) | 1080×1080 campaign visual | ⏳ **add before going live** |
| `ccaf-program.pdf` | Both "Download the Program Details / Program PDF" CTAs | The program brochure | ⏳ **add before going live** |

## Notes

- **OG image** is referenced by absolute URL: `https://growwstacks.com/ccaf/assets/ccaf-og.png`.
  Until the file is committed, social-share previews and the LinkedIn card will
  show no image (the link still works).
- **Brochure PDF** CTAs (`assets/ccaf-program.pdf`, with the `download` attribute)
  will 404 until the file is added — wire is correct, file is pending.
- **Instructor headshot** is NOT stored here. It points at the existing ImageKit
  photo already used on `/about` (Manish Mandot), so it renders immediately:
  `https://ik.imagekit.io/r2zdlyze2o/Office /website-images /Manish Sir .png`.
  Swap to a dedicated headshot here only if you want a campaign-specific shot.
