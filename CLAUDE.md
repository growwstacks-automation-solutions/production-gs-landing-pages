# CLAUDE.md — GrowwStacks Landing Pages

> Auto-loaded by Claude Code at the start of every session. Keep this short and
> high-signal; detailed references live in [`docs/`](docs/). This file + the docs
> are the durable project memory — read them first, update them last.

## What this repo is

The production marketing website for **GrowwStacks** ([growwstacks.com](https://growwstacks.com))
— an AI & automation agency. It is a **static, no-build site** (plain HTML/CSS/JS,
no framework, no bundler) deployed to **Cloudflare Pages** on every push to `main`.
Pages are assembled at runtime from **shared components** injected by
[`_shared/page-builder.js`](_shared/page-builder.js).

## Start-of-session checklist

1. Read this file.
2. Read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how the site is wired.
3. Read [`docs/ROADMAP.md`](docs/ROADMAP.md) — current state + what's next.
4. Skim the latest entries in [`docs/DEVELOPMENT_LOG.md`](docs/DEVELOPMENT_LOG.md) — recent changes & decisions.
5. **After any change:** append a `DEVELOPMENT_LOG.md` entry and update `ROADMAP.md`.

> This file is the project context and `docs/ROADMAP.md` is the plan — together they
> supersede the generic `PROJECT_CONTEXT.md` / `PLAN.md` convention.

## Golden rules (this repo's real gotchas)

- **Pages are built from shared components.** Most sections are empty
  `<div id="gs-*"></div>` placeholders filled at runtime from
  `_shared/components/*.html`. To change a section, edit the **shared component**
  — and remember the change hits **every page that uses it** (the navbar is on
  ~13,000 pages, the consult section on ~12,700).
- **page-builder skips pre-filled placeholders.** If a `#gs-*` element already has
  inline content (e.g. the hero in `index.html`), page-builder leaves it alone.
  That is why the homepage hero is editable directly in `index.html`.
- **Two design systems coexist.** The original pastel/green system lives in
  `_shared/global.css`. The newer refined **"Claude design"** (deep green + ink +
  JetBrains Mono) is being ported **piecemeal as self-contained, scoped CSS blocks**
  (e.g. `.gs-hero-ds`, `.gs-creds-ds`) that redefine their own tokens so they never
  collide with `global.css`. See ARCHITECTURE → Design systems.
- **Do not touch the form or webhook** unless explicitly asked. The consult form
  posts to a Make.com webhook (`SITE.formWebhookUrl`); changing field `name`s
  breaks the automation. Copy/labels are fine; structure and field names are not.
- **No build step.** What's in the repo is what ships. `{{SITE.*}}` tokens are
  substituted at runtime by page-builder from `_shared/site-config.js`.
- **Deploy = push to `main`.** Cloudflare Pages rebuilds automatically; there is no
  PR/CI gate, so treat `main` as production. Show the diff and confirm before pushing.
- **Config & content** (stats, logos, phone, addresses, webhook, tickers) live in
  `_shared/site-config.js` — edit there, not inline in pages.

## Docs index

| File | Purpose |
|---|---|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | How the site is built — components, CSS, config, deploy, conventions. |
| [`docs/DEVELOPMENT_LOG.md`](docs/DEVELOPMENT_LOG.md) | Append-only history of changes & decisions (project memory). |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Current state + prioritized next actions / open decisions. |
