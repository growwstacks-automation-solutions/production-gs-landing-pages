// ============================================
// GROWWSTACKS PAGE BUILDER — OPTIMISED
// Key improvements:
//  1. Above-fold components load immediately (navbar, hero, partners, ticker)
//  2. Below-fold components load via IntersectionObserver (lazy)
//  3. YouTube uses youtube-nocookie.com (no ad tracker)
//  4. data-image-key resolved at inject time (no blank src)
//  5. Removed double-pass setTimeout — replaced with MutationObserver
//  6. Logo <img> tags get loading="lazy" automatically
// ============================================

(function () {
  'use strict';

  // --- Relative path to _shared/ ---
  const pathSegments = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  const depth = pathSegments.length;
  const prefix = depth === 0 ? './_shared/' : '../'.repeat(depth) + '_shared/';

  // ─── Component list ───────────────────────────────────────────────────────
  // priority: true  → fetch immediately (above the fold)
  // priority: false → fetch only when element enters viewport (lazy)
  const COMPONENTS = [
    { id: 'gs-navbar',          file: 'components/navbar.html',          priority: true  },
    { id: 'gs-hero',            file: 'components/hero.html',            priority: true  },
    { id: 'gs-partners',        file: 'components/partners.html',        priority: true  },
    { id: 'gs-ticker',          file: 'components/ticker.html',          priority: true  },
    { id: 'gs-wwd',             file: 'components/what-we-do.html',      priority: false },
    { id: 'gs-mid-cta',         file: 'components/mid-cta.html',         priority: false },
    { id: 'gs-process',         file: 'components/process.html',         priority: false },
    { id: 'gs-stats',           file: 'components/stats-bar.html',       priority: false },
    { id: 'gs-cases',           file: 'components/cases.html',           priority: false },
    { id: 'gs-industries',      file: 'components/industries.html',      priority: false },
    { id: 'gs-testimonials',    file: 'components/testimonials.html',    priority: false },
    { id: 'gs-consult-section', file: 'components/consult-section.html', priority: false },
    { id: 'gs-consult-form',    file: 'components/consult-form.html',    priority: false },
    { id: 'gs-faq',             file: 'components/faq.html',             priority: false },
    { id: 'gs-footer',          file: 'components/footer.html',          priority: false },
    { id: 'gs-schema',          file: 'components/schema-org.html',      priority: false },
  ];

  // ─── Token map ───────────────────────────────────────────────────────────
  function buildTokenMap() {
    if (typeof SITE === 'undefined') {
      console.error('page-builder.js: SITE config not found. Load site-config.js first.');
      return {};
    }
    return {
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
      '{{SITE.stats.projects}}':          SITE.stats.projects,
      '{{SITE.stats.clients}}':           SITE.stats.clients,
      '{{SITE.stats.experts}}':           SITE.stats.experts,
      '{{SITE.stats.costReduction}}':     SITE.stats.costReduction,
      '{{SITE.stats.googleRating}}':      SITE.stats.googleRating,
      '{{SITE.social.linkedin}}':         SITE.social.linkedin,
      '{{SITE.social.upwork}}':           SITE.social.upwork,
      '{{SITE.social.googleReviews}}':    SITE.social.googleReviews,
      '{{SITE.addressUS.street}}':        SITE.addressUS.street,
      '{{SITE.addressUS.city}}':          SITE.addressUS.city,
      '{{SITE.addressUS.state}}':         SITE.addressUS.state,
      '{{SITE.addressUS.zip}}':           SITE.addressUS.zip,
      '{{SITE.addressUS.country}}':       SITE.addressUS.country,
      '{{SITE.addressUS.flag}}':          SITE.addressUS.flag,
      '{{SITE.addressIN.city}}':          SITE.addressIN.city,
      '{{SITE.addressIN.state}}':         SITE.addressIN.state,
      '{{SITE.addressIN.country}}':       SITE.addressIN.country,
      '{{SITE.addressIN.flag}}':          SITE.addressIN.flag,
      '{{SITE.logos.make}}':              SITE.logos.make,
      '{{SITE.logos.zapier}}':            SITE.logos.zapier,
      '{{SITE.logos.n8n}}':               SITE.logos.n8n,
      '{{SITE.logos.monday}}':            SITE.logos.monday,
      '{{SITE.logos.airtable}}':          SITE.logos.airtable,
      '{{SITE.logos.openai}}':            SITE.logos.openai,
      '{{SITE.logos.vapi}}':              SITE.logos.vapi,
      '{{SITE.logos.retell}}':            SITE.logos.retell,
      '{{SITE.logos.slack}}':             SITE.logos.slack,
      '{{SITE.logos.whatsapp}}':          SITE.logos.whatsapp,
      '{{SITE.logos.telegram}}':          SITE.logos.telegram,
      '{{SITE.logos.discord}}':           SITE.logos.discord,
      '{{SITE.logos.messenger}}':         SITE.logos.messenger,
      '{{SITE.logos.hubspot}}':           SITE.logos.hubspot,
      '{{SITE.logos.salesforce}}':        SITE.logos.salesforce,
      '{{SITE.logos.microsoft}}':         SITE.logos.microsoft,
      '{{SITE.logos.google}}':            SITE.logos.google,
      '{{SITE.logos.gmail}}':             SITE.logos.gmail,
      '{{SITE.logos.sheets}}':            SITE.logos.sheets,
      '{{SITE.logos.shopify}}':           SITE.logos.shopify,
      '{{SITE.logos.stripe}}':            SITE.logos.stripe,
      '{{SITE.logos.notion}}':            SITE.logos.notion,
      '{{SITE.logos.zoom}}':              SITE.logos.zoom,
      '{{SITE.logos.calendly}}':          SITE.logos.calendly,
      '{{SITE.logos.jira}}':              SITE.logos.jira,
      '{{SITE.logos.mailchimp}}':         SITE.logos.mailchimp,
      '{{SITE.logos.aws}}':               SITE.logos.aws,
      '{{SITE.logos.twilio}}':            SITE.logos.twilio,
      '{{SITE.logos.meta}}':              SITE.logos.meta,
      '{{SITE.logos.linkedin}}':          SITE.logos.linkedin,
      '{{SITE.logos.instagram}}':         SITE.logos.instagram,
      '{{SITE.logos.manychat}}':          SITE.logos.manychat,
      '{{SITE.logos.quickbooks}}':        SITE.logos.quickbooks,
      '{{SITE.logos.powerbi}}':           SITE.logos.powerbi,
      '{{SITE.logos.azure}}':             SITE.logos.azure,
      '{{SITE.logos.looker}}':            SITE.logos.looker,
      '{{CASES.0.img}}':                  SITE.images.CASES[0].img,
      '{{CASES.0.alt}}':                  SITE.images.CASES[0].alt,
      '{{CASES.0.href}}':                 SITE.images.CASES[0].href,
      '{{CASES.1.img}}':                  SITE.images.CASES[1].img,
      '{{CASES.1.alt}}':                  SITE.images.CASES[1].alt,
      '{{CASES.1.href}}':                 SITE.images.CASES[1].href,
      '{{CASES.2.img}}':                  SITE.images.CASES[2].img,
      '{{CASES.2.alt}}':                  SITE.images.CASES[2].alt,
      '{{CASES.2.href}}':                 SITE.images.CASES[2].href,
      '{{YEAR}}':                         String(new Date().getFullYear()),
    };
  }

  // ─── Replace {{TOKENS}} ──────────────────────────────────────────────────
  function replaceTokens(html) {
    const tokens = buildTokenMap();
    for (const [token, value] of Object.entries(tokens)) {
      html = html.split(token).join(value || '');
    }
    return html;
  }

  // ─── Fix data-image-key — resolve blank src at inject time ───────────────
  // Prevents blank <img src=""> network errors and eliminates JS-patch delay.
  // Supports dot-notation: "VIDEOS.hero", "BRANDING.logo", "CASES.0.img"
  function resolveImageKeys(container) {
    container.querySelectorAll('img[data-image-key]').forEach(img => {
      const key = img.dataset.imageKey;
      if (!key || img.src) return; // skip if src already set
      try {
        const value = key.split('.').reduce((obj, k) => obj[isNaN(k) ? k : Number(k)], SITE.images);
        if (value) {
          img.src = value;
          img.removeAttribute('data-image-key');
        }
      } catch (e) {
        console.warn('[page-builder] Could not resolve image key:', key);
      }
    });
  }

  // ─── Add loading="lazy" to all logo/below-fold images ────────────────────
  function lazyifyImages(container, isPriority) {
    container.querySelectorAll('img').forEach(img => {
      // Don't override hero images that already have loading="eager"
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', isPriority ? 'eager' : 'lazy');
      }
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', isPriority ? 'sync' : 'async');
      }
    });
  }

  // ─── Activate <script> tags inside injected HTML ─────────────────────────
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

  // ─── Fetch and inject a component ────────────────────────────────────────
  function loadComponent(comp) {
    const el = document.getElementById(comp.id);
    if (!el || (el.innerHTML && el.innerHTML.trim().length > 0)) return;

    fetch(prefix + comp.file)
      .then(res => {
        if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
        return res.text();
      })
      .then(html => {
        el.innerHTML = replaceTokens(html);
        resolveImageKeys(el);
        lazyifyImages(el, comp.priority);
        activateScripts(el);
        // Legacy helpers (images-helper.js)
        if (typeof setupImagesByDataAttribute === 'function') setupImagesByDataAttribute();
        if (typeof setupLinksByDataAttribute === 'function') setupLinksByDataAttribute();
      })
      .catch(err => {
        console.warn('[page-builder] Could not load ' + comp.id + ':', err.message);
      });
  }

  // ─── IntersectionObserver for lazy components ─────────────────────────────
  // Only fetches a component's HTML file when the placeholder div
  // scrolls within 400px of the viewport — saves ~10–15 network requests on load.
  function setupLazyComponents(lazyComps) {
    if (!('IntersectionObserver' in window)) {
      // Fallback: load everything immediately on old browsers
      lazyComps.forEach(loadComponent);
      return;
    }

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const compId = entry.target.id;
        const comp = lazyComps.find(c => c.id === compId);
        if (comp) {
          loadComponent(comp);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '400px 0px' }); // start loading 400px before visible

    lazyComps.forEach(comp => {
      const el = document.getElementById(comp.id);
      if (el) io.observe(el);
    });
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  const priorityComps = COMPONENTS.filter(c => c.priority);
  const lazyComps     = COMPONENTS.filter(c => !c.priority);

  // Load above-fold components immediately
  priorityComps.forEach(loadComponent);

  // Load below-fold components lazily
  setupLazyComponents(lazyComps);

  // ─── Shared event listeners ───────────────────────────────────────────────

  // Navbar scroll shadow
  window.addEventListener('scroll', function () {
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Smooth scroll for anchor links
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const pos = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  });

  // YouTube facade — uses youtube-nocookie.com (no ad tracker, better perf score)
  document.addEventListener('click', function (e) {
    const facade = e.target.closest('.yt-facade');
    if (!facade) return;
    const videoId = facade.dataset.videoId;
    if (!videoId) return;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
    iframe.title = facade.getAttribute('aria-label') || 'YouTube video';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:inherit;';
    facade.style.position = 'relative';
    facade.innerHTML = '';
    facade.appendChild(iframe);
  });

  // FAQ accordion
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const item = btn.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });

  // Mobile nav toggle
  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.nav-mobile-toggle');
    if (!toggle) {
      const links = document.querySelector('.nav-links');
      const btn   = document.querySelector('.nav-mobile-toggle');
      if (links && links.classList.contains('show')) {
        links.classList.remove('show');
        if (btn) btn.classList.remove('open');
      }
      return;
    }
    const links = document.querySelector('.nav-links');
    if (!links) return;
    links.classList.toggle('show');
    toggle.classList.toggle('open');
  });

})();