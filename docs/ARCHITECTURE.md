# Architecture — GrowwStacks Landing Pages

_Last updated: 2026-06-08_

This is the technical reference for how the site is built. For "what changed and
why," see [`DEVELOPMENT_LOG.md`](DEVELOPMENT_LOG.md); for "what's next," see
[`ROADMAP.md`](ROADMAP.md).

---

## 1. Overview

| | |
|---|---|
| **Product** | Marketing / lead-gen website for GrowwStacks (AI & automation agency) |
| **Live domain** | https://growwstacks.com |
| **Stack** | Vanilla HTML + CSS + JS. **No framework, no bundler, no build step.** |
| **Hosting** | Cloudflare Pages (preview domains under `*.pages.dev` are `noindex` via `_headers`) |
| **Deploy** | Push to `main` → Cloudflare Pages auto-rebuilds and serves the repo as-is |
| **Repo** | `github.com/growwstacks-automation-solutions/production-gs-landing-pages` |
| **Primary purpose** | Google Ads landing pages + organic blog/SEO content |

Because there is no build step, **the repo *is* the deployed artifact**. Any file
committed to `main` is publicly served (keep that in mind for internal notes — see
ROADMAP → Open decisions).

---

## 2. Directory layout

```
/
├── index.html              # Homepage. Hero is INLINED; rest is gs-* placeholders.
├── CLAUDE.md               # Session entry point (auto-loaded by Claude Code)
├── docs/                   # This documentation set
├── _shared/                # The shared engine + components (the heart of the site)
│   ├── page-builder.js     # Injects components, replaces {{tokens}}, scroll, mobile nav
│   ├── site-config.js      # SITE = { name, logos, stats, webhook, addresses, tickers… }
│   ├── global.css          # Full original design system (pastel/green), ~2,400 lines
│   ├── webhook-tracker.js   # Form/webhook tracking helper
│   └── components/         # All shared sections (see §4)
│       ├── navbar.html  hero.html  partners.html  ticker.html  what-we-do.html
│       ├── process.html  stats-bar.html  cases.html  industries.html
│       ├── testimonials.html  consult-section.html  footer.html  faq-component.js …
├── assets/js/              # Page-specific JS (images-helper, index, hero-orb, schema)
├── about/ contact/ services/ industries/ partners/ masterclass/ sales-playbook/
├── blog/                   # ~thousands of SEO articles (each a standalone HTML page)
├── case-studies/ how-to-guides/ workflows/ workflows-make.com/  sitemap/
├── privacy-policy.html  terms-of-service.html  thank-you-lead.html
├── _redirects              # Cloudflare Pages redirects (www→apex, legacy URLs)
├── _headers                # Cloudflare Pages headers (noindex preview domains, etc.)
└── robots.txt  analytics-loader.js
```

Every content page (homepage, blog post, landing page) links the same `_shared`
engine and is composed from the same component library.

---

## 3. The component system (`page-builder.js`)

This is the single most important thing to understand. Pages are mostly **empty
placeholders** that get filled at runtime.

### How it works
1. A page contains placeholders like `<div id="gs-partners"></div>`.
2. `page-builder.js` holds a `COMPONENTS` registry mapping each `id` → a file in
   `_shared/components/` and an `eager`/lazy flag.
3. For each placeholder it `fetch()`es the component HTML, runs
   **`replaceTokens()`** (substitutes `{{SITE.*}}` from `site-config.js`), sets
   `innerHTML`, and re-activates any `<script>` tags inside it.

### Critical behaviors (gotchas)
- **Skip-if-filled:** `loadComponent()` returns early if the placeholder already
  has non-empty `innerHTML`. → An inline section (like the homepage hero in
  `index.html`) overrides the shared component file; the matching
  `_shared/components/*.html` becomes a *fallback* for other pages.
- **Eager vs lazy:** `eager: true` components load immediately (navbar, hero,
  partners, ticker, what-we-do). Lazy ones load via `IntersectionObserver`
  (`rootMargin: 400px`) as they near the viewport.
- **`<style>` inside an injected component works**; `<script>` is re-created by
  `activateScripts()` so it executes (innerHTML scripts don't run on their own).
- **Hash scrolling:** `gsScrollToHash()` force-loads all lazy components first so
  the target reaches its final position before smooth-scrolling.

### Component registry (ids → files)
`gs-navbar, gs-hero, gs-partners, gs-ticker, gs-wwd, gs-mid-cta, gs-process,
gs-stats, gs-cases, gs-industries, gs-testimonials, gs-consult-section,
gs-consult-form, gs-footer, gs-schema, gs-timeline`.

---

## 4. Shared components (`_shared/components/`)

| File | Section | Notes |
|---|---|---|
| `navbar.html` | Top nav + CTA button | **Global, ~13k pages.** CTA text set in HTML *and* JS (partners page shows "Register"). |
| `hero.html` | Hero (fallback) | Homepage hero is inlined in `index.html`; this is the fallback for other pages. |
| `partners.html` | Credentials strip | Rebuilt to the Claude design: "Certified & partnered with" + 5 badges, scoped `.gs-creds-ds`. |
| `ticker.html` | Scrolling logo ticker ("apps moving") | Filled by `images-helper.js` from `SITE.tickerRow1/2`. |
| `what-we-do.html` | Services pillars | Original design system. |
| `process.html` | How we work (3 steps) | Original design system. |
| `stats-bar.html` | Stats band | From `SITE.stats.*`. |
| `cases.html` | Case study cards | Images from `SITE.images.CASES`. |
| `industries.html` | Industries grid (6 cards) | Original design system. |
| `testimonials.html` | Testimonials | YouTube facades + reviews. |
| `consult-section.html` | Consult fold + **lead form** | Left = pitch copy; right = form → Make.com webhook + Turnstile captcha. **Don't change field names.** |
| `footer.html` | Footer | Global. |
| `faq-component.js` | FAQ renderer | FAQ data is passed in per page (see `index.html`). |
| `timeline.html`, `schema-org.html`, `mid-cta.html` | Misc | — |

---

## 5. CSS architecture

Three layers, in cascade order:

1. **Critical inline CSS** — a `<style>` block in each page `<head>` for instant
   first paint (nav, hero, buttons, CLS reservations like `#gs-x:empty{min-height}`).
2. **`_shared/global.css`** — the full original design system (the "pastel/green"
   look: `--green-*`, `--peach`, `--lavender`, `--cs-accent` orange, pastel cards,
   emoji icons). Loaded async (`preload` → `stylesheet`). ~2,400 lines.
3. **Scoped component CSS** — newer sections ship their own `<style>` namespaced
   under a unique wrapper class with **locally redefined tokens**, so they don't
   depend on or collide with `global.css`.

### Design tokens (originals, in `global.css` `:root`)
`--green-700:#1a6e30` (brand), `--cs-accent:#e8590c` (CTA orange),
`--font-display:'Bricolage Grotesque'`, `--font-body:'Plus Jakarta Sans'`,
plus pastel accents (`--peach`, `--lavender`, `--sky`, `--amber`, `--mint`).

---

## 6. Design systems (important context)

There are **two** visual systems in play:

| | Original system | Refined "Claude design" |
|---|---|---|
| **Where it lives** | `_shared/global.css` (in repo) | An external Claude Design export bundle (NOT committed); ported into the repo piece by piece. |
| **Look** | Pastel accents, AI orb, emoji icons, glassmorphism, rounded cards | Deep green (#1a6e30) + ink near-black (#0e1512), JetBrains Mono "precision" layer, hairline borders, thin-line system diagrams, single orange CTA |
| **Fonts** | Bricolage Grotesque + Plus Jakarta Sans | + **JetBrains Mono** (added 2026-06-08) |
| **Applied so far** | Everything except the homepage hero & credentials strip | Homepage **hero** (`.gs-hero-ds`) and **credentials strip** (`.gs-creds-ds`) |

**Migration pattern (the agreed approach):** because `global.css` does not contain
the refined classes and the brief was "don't add global CSS," each refined section
is implemented as a **self-contained scoped block** — a unique wrapper class
(`.gs-hero-ds`, `.gs-creds-ds`), all design tokens redefined locally on that
wrapper, every selector descendant-scoped, and any icons inlined as SVG. Result:
zero blast radius, no dependency on `global.css`. New refined sections should follow
this same pattern. A full migration of `global.css` to the refined system is a large,
site-wide decision — see ROADMAP.

> Design source: the Claude Design bundle (`ui_kits/marketing-site/` — `nav-hero.jsx`,
> `proof.jsx`, `kit.css`, `colors_and_type.css`, `components.css`). Consider committing
> a copy under `docs/design-system/` for future reference (see ROADMAP).

---

## 7. Config & content (`_shared/site-config.js`)

A single `const SITE = { … }` object is the source of truth for content/config:
`name`, `tagline`, `domain`, `phone`, `email`, **`formWebhookUrl`** (Make.com),
`thankYouPage`, `logos.*` (favicon-based partner logos), `stats.*`
(projects/clients/experts/rating), `addressUS` / `addressIN`, `social.*`, and the
ticker rows. Pages reference these via `{{SITE.*}}` tokens that page-builder
replaces at runtime. **Edit content here, not inline in pages.**

---

## 8. JavaScript

| File | Role |
|---|---|
| `_shared/page-builder.js` | Component injection, token replacement, hash scroll, mobile nav, YouTube facades, FAQ toggles, random theming for blog/workflows. |
| `_shared/site-config.js` | The `SITE` config object. |
| `_shared/webhook-tracker.js` | Form/webhook tracking. |
| `assets/js/images-helper.js` | Resolves images from `SITE` (`data-image-key`, partner badges, ticker, cases). |
| `assets/js/index.js` | Homepage-specific JS. |
| `assets/js/hero-orb.js` | Animated the old AI orb. **Now inert on the homepage** (guards on `#gs-orb`, returns early). |
| `assets/js/schema.js` | JSON-LD structured data. |
| `analytics-loader.js` | Analytics bootstrap. |

---

## 9. Forms & webhook

The lead form lives in `consult-section.html`. It posts to the Make.com webhook in
`SITE.formWebhookUrl` and uses a Cloudflare Turnstile captcha. Field `name`
attributes map to the Make scenario — **changing them breaks lead capture.** Labels,
headings, and the submit button *text* are safe to edit; the `<form>` structure,
field names, hidden inputs, and webhook are not.

---

## 10. Routing & deployment

- **`_redirects`** — Cloudflare Pages redirects: `www → apex`, legacy URL mappings.
- **`_headers`** — headers incl. `noindex` for `*.pages.dev` preview domains.
- **Deploy:** commit → push `main` → Cloudflare Pages rebuilds. No CI gate, no
  preview-approval step. **`main` is production.** Always show the diff and confirm
  before pushing; a bad push is live immediately.

---

## 11. Conventions

- Edit shared components for anything that appears on multiple pages; edit the page
  only for page-unique content (e.g. the homepage hero).
- New refined sections → self-contained scoped CSS block (see §6).
- POSIX hygiene: LF line endings, trailing newline, no trailing whitespace.
- Keep `{{SITE.*}}` tokens for anything in `site-config.js`; don't hardcode.
- Log every change in `DEVELOPMENT_LOG.md` and reflect status in `ROADMAP.md`.
