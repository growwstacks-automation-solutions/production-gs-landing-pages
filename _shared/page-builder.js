// ============================================
// GROWWSTACKS PAGE BUILDER
// Loads shared components + injects config values
// Include AFTER site-config.js on every page
// ============================================

(function () {
  'use strict';

  // --- Determine relative path to _shared/ ---
  const pathSegments = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  const depth = pathSegments.length;
  const prefix = depth === 0 ? './_shared/' : '../'.repeat(depth) + '_shared/';

  // --- Components to inject ---
  // `eager: true`  → fetched immediately (navbar + above-fold content)
  // `eager: false` → fetched only when the placeholder nears the viewport
  const COMPONENTS = [
    { id: 'gs-navbar',          file: 'components/navbar.html',          eager: true  },
    { id: 'gs-hero',            file: 'components/hero.html',            eager: true  },
    { id: 'gs-partners',        file: 'components/partners.html',        eager: true  },
    { id: 'gs-ticker',          file: 'components/ticker.html',          eager: true  },
    { id: 'gs-wwd',             file: 'components/what-we-do.html',      eager: true  },
    { id: 'gs-mid-cta',         file: 'components/mid-cta.html',         eager: false },
    { id: 'gs-process',         file: 'components/process.html',         eager: false },
    { id: 'gs-stats',           file: 'components/stats-bar.html',       eager: false },
    { id: 'gs-cases',           file: 'components/cases.html',           eager: false },
    { id: 'gs-industries',      file: 'components/industries.html',      eager: false },
    { id: 'gs-testimonials',    file: 'components/testimonials.html',    eager: false },
    { id: 'gs-consult-section', file: 'components/consult-section.html', eager: false },
    { id: 'gs-consult-form',    file: 'components/consult-form.html',    eager: false },
    { id: 'gs-footer',          file: 'components/footer.html',          eager: false },
    { id: 'gs-schema',          file: 'components/schema-org.html',      eager: false },
    { id: 'gs-timeline',        file: 'components/timeline.html',        eager: false },
  ];

  // --- Token map: {{TOKEN}} → value ---
  function buildTokenMap() {
    if (typeof SITE === 'undefined') {
      console.error('page-builder.js: SITE config not found. Load site-config.js first.');
      return {};
    }
    return {
      // ── Brand & Contact ──────────────────────
      '{{SITE.name}}':                    SITE.name,
      '{{SITE.tagline}}':                 SITE.tagline,
      '{{SITE.legalName}}':               SITE.legalName,
      '{{SITE.domain}}':                  SITE.domain,
      '{{SITE.phone}}':                   SITE.phone,
      '{{SITE.phoneTel}}':                SITE.phoneTel,
      '{{SITE.email}}':                   SITE.email,
      '{{SITE.googleAdsId}}':             SITE.googleAdsId,
      '{{SITE.formWebhookUrl}}':          SITE.formWebhookUrl,
      '{{SITE.thankYouPage}}':            SITE.thankYouPage,
      '{{SITE.imagekit.favicon}}':        SITE.imagekit.favicon,

      // ── Stats ────────────────────────────────
      '{{SITE.stats.projects}}':          SITE.stats.projects,
      '{{SITE.stats.clients}}':           SITE.stats.clients,
      '{{SITE.stats.experts}}':           SITE.stats.experts,
      '{{SITE.stats.costReduction}}':     SITE.stats.costReduction,
      '{{SITE.stats.googleRating}}':      SITE.stats.googleRating,

      // ── Social ───────────────────────────────
      '{{SITE.social.linkedin}}':         SITE.social.linkedin,
      '{{SITE.social.upwork}}':           SITE.social.upwork,
      '{{SITE.social.googleReviews}}':    SITE.social.googleReviews,

      // ── Address US ───────────────────────────
      '{{SITE.addressUS.street}}':        SITE.addressUS.street,
      '{{SITE.addressUS.city}}':          SITE.addressUS.city,
      '{{SITE.addressUS.state}}':         SITE.addressUS.state,
      '{{SITE.addressUS.zip}}':           SITE.addressUS.zip,
      '{{SITE.addressUS.country}}':       SITE.addressUS.country,
      '{{SITE.addressUS.flag}}':          SITE.addressUS.flag,

      // ── Address IN ───────────────────────────
      '{{SITE.addressIN.city}}':          SITE.addressIN.city,
      '{{SITE.addressIN.state}}':         SITE.addressIN.state,
      '{{SITE.addressIN.country}}':       SITE.addressIN.country,
      '{{SITE.addressIN.flag}}':          SITE.addressIN.flag,

      // ── Logos — Automation ───────────────────
      '{{SITE.logos.make}}':              SITE.logos.make,
      '{{SITE.logos.zapier}}':            SITE.logos.zapier,
      '{{SITE.logos.n8n}}':               SITE.logos.n8n,
      '{{SITE.logos.monday}}':            SITE.logos.monday,
      '{{SITE.logos.airtable}}':          SITE.logos.airtable,

      // ── Logos — AI & Voice ───────────────────
      '{{SITE.logos.openai}}':            SITE.logos.openai,
      '{{SITE.logos.vapi}}':              SITE.logos.vapi,
      '{{SITE.logos.retell}}':            SITE.logos.retell,

      // ── Logos — Communication ────────────────
      '{{SITE.logos.slack}}':             SITE.logos.slack,
      '{{SITE.logos.whatsapp}}':          SITE.logos.whatsapp,
      '{{SITE.logos.telegram}}':          SITE.logos.telegram,
      '{{SITE.logos.discord}}':           SITE.logos.discord,
      '{{SITE.logos.messenger}}':         SITE.logos.messenger,

      // ── Logos — CRM & Sales ──────────────────
      '{{SITE.logos.hubspot}}':           SITE.logos.hubspot,
      '{{SITE.logos.salesforce}}':        SITE.logos.salesforce,

      // ── Logos — Microsoft ────────────────────
      '{{SITE.logos.microsoft}}':         SITE.logos.microsoft,

      // ── Logos — Google ───────────────────────
      '{{SITE.logos.google}}':            SITE.logos.google,
      '{{SITE.logos.gmail}}':             SITE.logos.gmail,
      '{{SITE.logos.sheets}}':            SITE.logos.sheets,

      // ── Logos — Commerce & Payments ──────────
      '{{SITE.logos.shopify}}':           SITE.logos.shopify,
      '{{SITE.logos.stripe}}':            SITE.logos.stripe,

      // ── Logos — Productivity ─────────────────
      '{{SITE.logos.notion}}':            SITE.logos.notion,
      '{{SITE.logos.zoom}}':              SITE.logos.zoom,
      '{{SITE.logos.calendly}}':          SITE.logos.calendly,
      '{{SITE.logos.jira}}':              SITE.logos.jira,
      '{{SITE.logos.mailchimp}}':         SITE.logos.mailchimp,

      // ── Logos — Cloud & Dev ──────────────────
      '{{SITE.logos.aws}}':               SITE.logos.aws,
      '{{SITE.logos.twilio}}':            SITE.logos.twilio,

      // ── Logos — Social ───────────────────────
      '{{SITE.logos.meta}}':              SITE.logos.meta,
      '{{SITE.logos.linkedin}}':          SITE.logos.linkedin,
      '{{SITE.logos.instagram}}':         SITE.logos.instagram,
      '{{SITE.logos.manychat}}':          SITE.logos.manychat,

      // ── Logos — Special cases ────────────────
      '{{SITE.logos.quickbooks}}':        SITE.logos.quickbooks,
      '{{SITE.logos.powerbi}}':           SITE.logos.powerbi,
      '{{SITE.logos.azure}}':             SITE.logos.azure,
      '{{SITE.logos.looker}}':            SITE.logos.looker,

      // ── Cases (homepage cards) ───────────────
      '{{CASES.0.img}}':                  SITE.images.CASES[0].img,
      '{{CASES.0.alt}}':                  SITE.images.CASES[0].alt,
      '{{CASES.0.href}}':                 SITE.images.CASES[0].href,
      '{{CASES.1.img}}':                  SITE.images.CASES[1].img,
      '{{CASES.1.alt}}':                  SITE.images.CASES[1].alt,
      '{{CASES.1.href}}':                 SITE.images.CASES[1].href,
      '{{CASES.2.img}}':                  SITE.images.CASES[2].img,
      '{{CASES.2.alt}}':                  SITE.images.CASES[2].alt,
      '{{CASES.2.href}}':                 SITE.images.CASES[2].href,

      // ── Misc ─────────────────────────────────
      '{{YEAR}}':                         String(new Date().getFullYear()),
    };
  }

  // --- Replace all {{TOKENS}} in HTML string ---
  function replaceTokens(html) {
    const tokens = buildTokenMap();
    for (const [token, value] of Object.entries(tokens)) {
      html = html.split(token).join(value || '');
    }
    return html;
  }

  // --- Activate <script> tags inside injected HTML ---
  function activateScripts(container) {
    container.querySelectorAll('script').forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  // --- Load a single component ---
  // Returns a promise so the caller can know when injection (and nested
  // components inside the injected HTML) are ready to be scanned.
  function loadComponent(comp) {
    const el = document.getElementById(comp.id);
    if (!el) return Promise.resolve();
    if (el.innerHTML && el.innerHTML.trim().length > 0) return Promise.resolve();
    if (el.dataset.gsLoading === '1') return Promise.resolve();
    el.dataset.gsLoading = '1';

    return fetch(prefix + comp.file)
      .then(res => {
        if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
        return res.text();
      })
      .then(html => {
        el.innerHTML = replaceTokens(html);
        activateScripts(el);
        if (typeof setupImagesByDataAttribute === 'function') setupImagesByDataAttribute();
        if (typeof setupLinksByDataAttribute === 'function') setupLinksByDataAttribute();
      })
      .catch(err => {
        console.warn('[page-builder] Could not load ' + comp.id + ':', err.message);
      });
  }

  // After eager components inject, sweep the DOM once for any nested
  // component placeholders they introduced and load those too.
  function loadNested() {
    COMPONENTS.forEach(comp => {
      const el = document.getElementById(comp.id);
      if (el && (!el.innerHTML || !el.innerHTML.trim())) {
        if (comp.eager) {
          loadComponent(comp);
        } else {
          observeLazy(comp);
        }
      }
    });
  }

  // --- Lazy loader for below-fold components ---
  const lazyObserver = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          const comp = COMPONENTS.find(c => c.id === entry.target.id);
          if (comp) loadComponent(comp).then(loadNested);
        });
      }, { rootMargin: '400px 0px' })
    : null;

  function observeLazy(comp) {
    const el = document.getElementById(comp.id);
    if (!el) return;
    if (!lazyObserver) { loadComponent(comp).then(loadNested); return; }
    lazyObserver.observe(el);
  }

  // --- Init: load eager components in parallel, lazy ones on-demand ---
  const eagerLoads = COMPONENTS
    .filter(c => c.eager)
    .map(loadComponent);

  COMPONENTS.filter(c => !c.eager).forEach(observeLazy);

  Promise.all(eagerLoads).then(loadNested);

  // ── Footer + floating widgets: load on page-load, not on scroll ──────────
  // The footer hosts two always-on widgets — the live projects ticker (#gs-spw)
  // and the chat widget. Because the footer is a lazy component, both used to
  // appear only once the user scrolled to the bottom. Trigger the footer as soon
  // as the page has fully loaded instead, deferred to idle so it never competes
  // with critical above-the-fold work. The IntersectionObserver above stays as a
  // fallback; loadComponent() is idempotent, so whichever fires first wins.
  function loadFooterNow() {
    const footer = COMPONENTS.find(c => c.id === 'gs-footer');
    if (footer) loadComponent(footer).then(loadNested);
  }
  function whenIdle(fn) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(fn, { timeout: 2000 });
    } else {
      setTimeout(fn, 200);
    }
  }
  if (document.readyState === 'complete') {
    whenIdle(loadFooterNow);
  } else {
    window.addEventListener('load', function () { whenIdle(loadFooterNow); }, { once: true });
  }

  // ── WebMCP (agent tools) ─────────────────────────────────────────────────
  // Register the site's AI-agent tools EAGERLY (not on scroll) so they exist in
  // the Lighthouse agentic snapshot and for agents at load. webmcp.js is fully
  // feature-detected — a no-op on browsers without the API or origin trial.
  (function loadWebMCP() {
    var s = document.createElement('script');
    s.src = prefix + 'webmcp.js';
    s.async = true;
    (document.head || document.documentElement).appendChild(s);
  })();

  // --- Shared Scripts ---
  window.addEventListener('scroll', function () {
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Force-load any component placeholders that haven't been injected yet.
  // Used before scrolling so the target reaches its FINAL layout position in
  // one go (otherwise lazy sections load mid-scroll and push the target down).
  function forceLoadAll() {
    COMPONENTS.forEach(function (comp) {
      const el = document.getElementById(comp.id);
      if (el && (!el.innerHTML || !el.innerHTML.trim())) {
        loadComponent(comp).then(loadNested);
      }
    });
  }

  // Smoothly scroll to a hash target, accounting for the fixed navbar and
  // re-adjusting until the layout settles (lazy components finish injecting).
  function scrollToHashStable(hash) {
    forceLoadAll();
    const nav = document.querySelector('.nav') || document.getElementById('nav');
    const navHeight = nav ? nav.offsetHeight : 80;
    const deadline = performance.now() + 5000;
    let lastTop = null;
    let stable = 0;
    function step() {
      let target = null;
      try { target = document.querySelector(hash); } catch (e) { return; }
      if (target) {
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight);
        if (lastTop !== null && Math.abs(top - lastTop) < 2) {
          stable++;
        } else {
          stable = 0;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
        lastTop = top;
        // Position held steady across several ticks → layout has settled.
        if (stable >= 3) {
          window.scrollTo({ top: top, behavior: 'smooth' });
          return;
        }
      }
      if (performance.now() < deadline) setTimeout(step, 180);
    }
    step();
  }
  // Exposed so per-page scripts (e.g. on-load hash handling) can reuse it.
  window.gsScrollToHash = scrollToHashStable;

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href]');
    if (!link || link.target === '_blank') return;
    // Match same-page hash links: "#section" or "/#section" (not "/page/#x").
    const match = /^\/?(#.+)$/.exec(link.getAttribute('href'));
    if (!match) return;
    const hash = match[1];
    let target = null;
    try { target = document.querySelector(hash); } catch (err) { return; }
    if (!target) return;
    e.preventDefault();
    if (window.location.hash !== hash) {
      history.pushState(null, '', hash);
    }
    scrollToHashStable(hash);
  });

  document.addEventListener('click', function (e) {
    const facade = e.target.closest('.yt-facade');
    if (!facade) return;
    const videoId = facade.dataset.videoId;
    if (!videoId) return;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
    iframe.title = facade.getAttribute('aria-label') || 'YouTube video';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border-radius:inherit;';
    facade.style.position = 'relative';
    facade.innerHTML = '';
    facade.appendChild(iframe);
  });

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const item = btn.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('active'); });
    if (!wasActive) item.classList.add('active');
  });


  // --- Random theme tinting (blog / workflows / how-to-guides) ---------------
  // Lives here (eager, on every page) rather than inside the lazily-injected
  // footer — otherwise the colors only applied after the user scrolled the
  // footer into view, so on reload the page rendered untinted. The themed
  // elements (.cs-hero-bg, .cs-tag, .cs-bottom-cta, blog TOC, etc.) are part of
  // the static page HTML and already exist at DOMContentLoaded.
  function applyRandomTheme() {
    const path = window.location.pathname;

    if (
      !path.includes('/blog') &&
      !path.includes('/workflows') &&
      !path.includes('/how-to-guides')
    ) return;

    const themes = [
      { gradient: 'linear-gradient(to right,#FFD6E0,#FFF1F5)', tagColor: '#e85a8a', tagText: '#ffffff' },
      { gradient: 'linear-gradient(to right,#E6F7FF,#F0FBFF)', tagColor: '#2b7de9', tagText: '#ffffff' },
      { gradient: 'linear-gradient(to right,#E8F8F5,#F0FFF9)', tagColor: '#2a9d8f', tagText: '#ffffff' },
      { gradient: 'linear-gradient(to right,#FFF6E5,#FFFBEF)', tagColor: '#e67e22', tagText: '#ffffff' },
      { gradient: 'linear-gradient(to right,#F3E8FF,#FAF5FF)', tagColor: '#7b61ff', tagText: '#ffffff' },
      { gradient: 'linear-gradient(to right,#FFEAF4,#FFF4F8)', tagColor: '#d63384', tagText: '#ffffff' },
      { gradient: 'linear-gradient(to right,#EAF4FF,#F6FAFF)', tagColor: '#1c7ed6', tagText: '#ffffff' },
      { gradient: 'linear-gradient(to right,#EAFBEA,#F5FFF6)', tagColor: '#2f9e44', tagText: '#ffffff' },
    ];

    const theme = themes[Math.floor(Math.random() * themes.length)];

    function setBg(sel) {
      document.querySelectorAll(sel).forEach(el =>
        el.style.setProperty('background', theme.gradient, 'important'));
    }
    function setBorder(sel) {
      document.querySelectorAll(sel).forEach(el => { el.style.borderColor = theme.tagColor; });
    }
    function setText(sel) {
      document.querySelectorAll(sel).forEach(el => { el.style.color = theme.tagColor; });
    }
    function setTag(sel) {
      document.querySelectorAll(sel).forEach(el => {
        el.style.background = theme.tagColor;
        el.style.color = theme.tagText;
      });
    }

    // Gradient backgrounds
    setBg('.cs-hero-bg');
    setBg('.blog-toc');
    setBg('.cs-highlight');
    setBg('.blog-section--tinted');
    setBg('.cs-bottom-cta');

    // Tags & buttons
    setTag('.cs-tag');
    document.querySelectorAll('.btn-accent').forEach(el => {
      el.style.background = theme.tagColor;
      el.style.color = theme.tagText;
      el.style.borderColor = theme.tagColor;
    });
    document.querySelectorAll('.btn-outline').forEach(el => {
      el.style.borderColor = theme.tagColor;
      el.style.color = theme.tagColor;
    });

    // Text accents
    setText('.blog-toc-title');
    setText('.cs-breadcrumb a');
    setText('.cs-toc-title + ol li a');

    // Borders
    setBorder('.blog-toc');
    setBorder('.cs-highlight');
    setBorder('.cs-toc');

    // Reading time & download button
    setTag('.blog-reading-time');
    document.querySelectorAll('.btn-download').forEach(el => {
      el.style.background = theme.tagColor;
      el.style.borderColor = theme.tagColor;
      el.style.color = theme.tagText;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyRandomTheme);
  } else {
    applyRandomTheme();
  }

  // Mobile nav toggle
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.nav-mobile-toggle');
    if (!toggle) {
      // Click outside — close menu
      var links = document.querySelector('.nav-links');
      var btn = document.querySelector('.nav-mobile-toggle');
      if (links && links.classList.contains('show')) {
        links.classList.remove('show');
        if (btn) btn.classList.remove('open');
      }
      return;
    }
    var links = document.querySelector('.nav-links');
    if (!links) return;
    links.classList.toggle('show');
    toggle.classList.toggle('open');
  });

})();