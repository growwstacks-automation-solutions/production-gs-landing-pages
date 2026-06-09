# Roadmap — GrowwStacks Landing Pages

_Last updated: 2026-06-08_

Current state of the site and the prioritized list of what's next. Update this every
session: move finished items into [`DEVELOPMENT_LOG.md`](DEVELOPMENT_LOG.md) and
re-rank what remains.

---

## Current state (snapshot)

- **Homepage hero** — ✅ on the refined Claude design (`.gs-hero-ds`, scoped). Live.
- **Credentials strip** (`partners.html`) — ✅ on the refined design (`.gs-creds-ds`). Live.
- **CTA copy** — ✅ "Book a Free Automation Audit" across the hero consult fold and
  the global nav button. Live.
- **Everything else** (what-we-do, process, stats, cases, industries, testimonials,
  footer, all blog/landing pages) — still on the **original** design system in
  `global.css`. Unchanged.
- **Lead form / Make.com webhook** — untouched and working.

The site is in a **mixed-design state**: homepage first fold + credentials use the
refined system; the rest uses the original. This is intentional and stable.

---

## Next actions (prioritized)

### P1 — Likely next
- [ ] **Finance / Healthcare / Operations "problem strip"** (design section 2).
      Not built yet. Agreed placement: **a new inline section in `index.html`
      directly below the hero** (second fold). Build with the scoped-CSS pattern
      (`.gs-problem-ds` or similar). Copy from the design: loan re-keying / missed
      clinic calls / off-the-shelf AI that doesn't fit ops.

### P2 — Small polish
- [ ] **Form submit button copy** → optionally "Book a Free Automation Audit →" to
      match the new CTA wording (currently "Get My Free Automation Audit →").
      Text-only change; no webhook impact. Confirm with Manish first (it's on the
      "form side" he asked to leave alone).
- [ ] **Commit the Claude design bundle** under `docs/design-system/` (or a
      reference link) so future sessions have the source of truth for the refined
      system without re-fetching the export.

### P3 — Bigger decisions (need Manish's call before starting)
- [ ] **Full design migration.** Decide whether to roll the refined Claude design
      across the whole site (what-we-do, process, cases, industries, testimonials,
      footer, blog/landing templates). This is a large, site-wide effort and would
      likely mean evolving `global.css` itself — big blast radius (~13k pages).
      Until decided, keep using **per-section scoped blocks**.
- [ ] **Nav button length.** "Book a Free Automation Audit →" is longer than the old
      label; it fits on desktop and is hidden < 1024px, but watch for awkwardness on
      mid-width desktops. Revisit if it looks tight.

---

## Open decisions / questions

- **Public exposure of `docs/` and `CLAUDE.md`.** Because Cloudflare Pages serves the
  repo as-is with no build step, these files are reachable at
  `growwstacks.com/CLAUDE.md`, `/docs/…`. They contain internal notes (not secrets —
  the webhook URL is already public in `site-config.js`). Options: (a) keep local /
  don't push, (b) push but block via `robots.txt` + a `_redirects` 404 rule, or
  (c) push as-is. **Pending Manish's preference** — see DEVELOPMENT_LOG entry.
- **Design source of truth.** The refined design currently lives only in the external
  Claude Design export. Committing a copy (P2) removes that dependency.

---

## Known issues (low priority)

- Pre-existing **unmatched `</div>`** near the `#consultation` wrapper in
  `index.html`. Browsers tolerate it; fix only if doing a broader cleanup of that file.
- `global.css` still carries styles for components that may have been superseded by
  scoped blocks (e.g. legacy `.partners`/`.partner-badge`). Dead but harmless; prune
  only as part of a deliberate cleanup pass.

---

## Done (recent — see DEVELOPMENT_LOG for detail)

- 2026-06-08 — Hero redesign, credentials strip, CTA copy alignment (`3d0af1c8`, live).
- 2026-06-08 — Project documentation set established.
