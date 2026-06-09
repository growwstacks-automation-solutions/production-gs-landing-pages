# Development Log — GrowwStacks Landing Pages

Append-only, **reverse-chronological** record of changes and decisions. This is the
project's memory: each entry should let a future session reconstruct *what* changed,
*why*, *which files*, and *what was deliberately left alone*.

**How to add an entry (newest on top):**

```
## YYYY-MM-DD — <short title>
**Commit(s):** <hash> · **Scope:** <files/areas>
**What:** <what changed, in plain terms>
**Why:** <the reason / the user's intent>
**Decisions:** <key choices and trade-offs made>
**Left untouched (on purpose):** <things deliberately not changed>
**Follow-ups:** <anything deferred → mirror into ROADMAP.md>
```

---

## 2026-06-08 — Homepage hero redesign, credentials strip, CTA copy alignment
**Commit:** `3d0af1c8` (pushed to `main` / live) · **Scope:** `index.html`,
`_shared/components/partners.html`, `_shared/components/navbar.html`,
`_shared/components/consult-section.html`

**What:**
- **Hero** (`index.html`): replaced the AI-orb hero with the Claude design's hero —
  Anthropic Services Partner lockup (Claude logo) → headline "Enterprise AI,
  *actually shipped.*" → verticals lead → "Book an Architecture Call →" CTA +
  "See client results" link → 3 proof chips → a dark **"Live architecture" panel**
  (Patient call → Voice agent → Claude decides → Appointment booked, cycling every
  1.5s). Added **JetBrains Mono** to the font load. Pruned the now-dead legacy
  hero + AI-orb critical CSS.
- **Credentials strip** (`partners.html`): replaced the 8 platform badges with the
  design's "Certified & partnered with" + 5 badges (Anthropic, Make.com, Upwork,
  n8n, Microsoft).
- **CTA copy**: consult-section heading "Get Your Free Automation Audit" → "Book a
  Free Automation Audit"; global nav button "Free Consultation" → "Book a Free
  Automation Audit" (changed in both the HTML default and the JS default branch).

**Why:** Bring the homepage's first fold and partner section in line with the
approved Claude Design export, and harmonize the call-to-action wording the user
saw across the hero, nav, and consult fold.

**Decisions:**
- **Scoped-CSS port, not a global migration.** `global.css` has none of the refined
  design's classes and the brief was "styling comes from the shared CSS, don't add
  CSS." Resolved by porting the hero and credentials strip as **self-contained
  scoped blocks** (`.gs-hero-ds`, `.gs-creds-ds`) with locally-redefined tokens and
  inlined Lucide SVGs → zero blast radius. (This is now the standard pattern — see
  ARCHITECTURE §6.)
- Edited the **inline** homepage hero in `index.html` (page-builder skips it because
  it's pre-filled); `_shared/components/hero.html` was left as the fallback.
- Claude logo + credential icons use the Google favicon service (the design's exact
  source), keeping marks small and uniform.
- Nav + consult are **shared components**, so the CTA copy change is **site-wide**
  (~13k pages nav, ~12.7k pages consult). Accepted as intended.

**Left untouched (on purpose):**
- The lead **form** entirely: structure, field names, hidden inputs, Turnstile,
  submit button ("Get My Free Automation Audit →"), form-card heading ("Book Your
  Free Audit"), and the Make.com webhook.
- `_shared/global.css` and all other sections (what-we-do, process, cases,
  industries, testimonials, footer) — still on the original design system.
- A pre-existing unmatched `</div>` near the `#consultation` wrapper in `index.html`
  (browsers tolerate it; out of scope).

**Follow-ups (mirrored to ROADMAP):**
- Finance / Healthcare / Operations "problem strip" (design section 2) — not built;
  agreed placement is "new section after the hero."
- Optional: change the form submit button text to "Book a Free Automation Audit" for
  exact consistency (text-only, no webhook impact).
- Decide whether to migrate the rest of the page (and `global.css`) to the refined
  Claude design, or keep the scoped-section approach.

---

## 2026-06-08 — Project documentation established
**Scope:** `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/DEVELOPMENT_LOG.md`,
`docs/ROADMAP.md`, `robots.txt`, `_redirects`

**What:** Created the cross-session documentation set — a root `CLAUDE.md` hub
(auto-loaded by Claude Code) plus `docs/` for architecture, this log, and the roadmap.

**Why:** Give future Claude Code sessions durable context so the whole system is
understood quickly and progress stays tracked.

**Decisions:** Hub-and-spokes layout; `CLAUDE.md` is high-signal and links to the
detailed docs. Logging convention defined at the top of this file. Committed to git
for durability, but **guarded from public exposure**: `robots.txt` disallows
`/docs/` + `/CLAUDE.md`, and `_redirects` bounces those paths to `/` (Cloudflare
follows redirects even when the file exists), so the docs are never served or indexed
publicly while remaining readable locally by Claude Code.
