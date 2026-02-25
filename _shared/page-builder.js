// ============================================
// GROWWSTACKS PAGE BUILDER — OPTIMISED
// Key improvements:
//  1. Above-fold components load immediately (navbar, hero, partners, ticker)
//  2. Below-fold components load via IntersectionObserver (lazy)
//  3. YouTube uses youtube-nocookie.com (no ad tracker)
//  4. data-image-key resolved at inject time (no blank src)
//  5. Logo <img> tags use lazyLogo() — no forced reflow, no gstatic on load
//  6. Favicon src set via data-lazy-src + IntersectionObserver (fixes cache warning)
// ============================================

(function () {
  'use strict';

  // --- Relative path to _shared/ ---
  const pathSegments = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  const depth = pathSegments.length;
  const prefix = depth === 0 ? './_shared/' : '../'.repeat(depth) + '_shared/';

  // ─── Component list ───────────────────────────────────────────────────────
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

  // ─── PERF FIX 1: Convert favicon/logo img[src] → data-lazy-src ───────────
  // After token replacement, any <img> whose src points to our favicon-proxy
  // or gstatic.com gets converted so it ONLY fires when scrolled into view.
  // This eliminates the "10+ gstatic requests on load" PageSpeed warning.
  function convertLogosToLazy(container) {
    container.querySelectorAll('img').forEach(function(img) {
      const src = img.getAttribute('src') || '';

      const isFavicon = src.includes('/favicon-proxy') ||
                        src.includes('gstatic.com')    ||
                        src.includes('google.com/s2/favicons');

      if (!isFavicon) return;
      if (img.dataset.lazySrc) return; // already converted

      // Move src → data-lazy-src so browser won't fetch it yet
      img.dataset.lazySrc = src;
      img.removeAttribute('src');

      // Prevent CLS: reserve space while image is not yet loaded
      if (!img.hasAttribute('width'))  img.setAttribute('width',  '32');
      if (!img.hasAttribute('height')) img.setAttribute('height', '32');
      if (!img.hasAttribute('alt'))    img.setAttribute('alt', '');
    });
  }

  // ─── PERF FIX 2: Lazy-load logos via IntersectionObserver + rAF ──────────
  // requestAnimationFrame batches all src assignments into ONE layout pass.
  // This is what eliminates the "Forced reflow 32ms" PageSpeed warning.
  var _lazyLogoQueue      = [];
  var _lazyLogoRafPending = false;

  function _flushLazyLogos() {
    _lazyLogoRafPending = false;
    // Batch: all src writes happen in one animation frame = zero forced reflow
    var batch = _lazyLogoQueue.splice(0);
    for (var i = 0; i < batch.length; i++) {
      var img = batch[i];
      if (img.dataset.lazySrc && !img.src) {
        img.src = img.dataset.lazySrc;
        img.removeAttribute('data-lazy-src');
      }
    }
  }

  var _logoObserver = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          _lazyLogoQueue.push(entry.target);
          if (!_lazyLogoRafPending) {
            _lazyLogoRafPending = true;
            requestAnimationFrame(_flushLazyLogos);
          }
        });
      }, { rootMargin: '300px 0px' }) // start loading 300px before viewport
    : null;

  function activateLazyLogos(container) {
    container.querySelectorAll('img[data-lazy-src]').forEach(function(img) {
      if (_logoObserver) {
        _logoObserver.observe(img);
      } else {
        // Fallback for very old browsers without IntersectionObserver
        img.src = img.dataset.lazySrc;
      }
    });
  }

  // ─── Fix data-image-key — resolve blank src at inject time ───────────────
  function resolveImageKeys(container) {
    container.querySelectorAll('img[data-image-key]').forEach(function(img) {
      const key = img.dataset.imageKey;
      if (!key || img.src) return;
      try {
        const value = key.split('.').reduce(function(obj, k) {
          return obj[isNaN(k) ? k : Number(k)];
        }, SITE.images);
        if (value) {
          img.src = value;
          img.removeAttribute('data-image-key');
        }
      } catch (e) {
        console.warn('[page-builder] Could not resolve image key:', key);
      }
    });
  }

  // ─── Add loading="lazy" + decoding to non-favicon images ─────────────────
  function lazyifyImages(container, isPriority) {
    container.querySelectorAll('img').forEach(function(img) {
      // Skip images already handled by lazy logo system
      if (img.dataset.lazySrc) return;
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
    container.querySelectorAll('script').forEach(function(oldScript) {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(function(attr) {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  // ─── Fetch and inject a component ────────────────────────────────────────
  function loadComponent(comp) {
    const el = document.getElementById(comp.id);
    if (!el || (el.innerHTML && el.innerHTML.trim().length > 0)) return;

    fetch(prefix + comp.file)
      .then(function(res) {
        if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
        return res.text();
      })
      .then(function(html) {
        // Step 1: Replace {{TOKENS}} — logo URLs are now in src attributes
        el.innerHTML = replaceTokens(html);

        // Step 2: Resolve data-image-key attributes
        resolveImageKeys(el);

        // Step 3: Convert favicon src → data-lazy-src (MUST run before lazyifyImages)
        convertLogosToLazy(el);

        // Step 4: Set loading="lazy" on all remaining non-logo images
        lazyifyImages(el, comp.priority);

        // Step 5: Start observing lazy logo images
        activateLazyLogos(el);

        // Step 6: Re-activate <script> tags in injected HTML
        activateScripts(el);

        // Step 7: Legacy helpers
        if (typeof setupImagesByDataAttribute === 'function') setupImagesByDataAttribute();
        if (typeof setupLinksByDataAttribute  === 'function') setupLinksByDataAttribute();
      })
      .catch(function(err) {
        console.warn('[page-builder] Could not load ' + comp.id + ':', err.message);
      });
  }

  // ─── IntersectionObserver for lazy components ─────────────────────────────
  function setupLazyComponents(lazyComps) {
    if (!('IntersectionObserver' in window)) {
      lazyComps.forEach(loadComponent);
      return;
    }

    const io = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        const compId = entry.target.id;
        const comp = lazyComps.find(function(c) { return c.id === compId; });
        if (comp) {
          loadComponent(comp);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '400px 0px' });

    lazyComps.forEach(function(comp) {
      const el = document.getElementById(comp.id);
      if (el) io.observe(el);
    });
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  const priorityComps = COMPONENTS.filter(function(c) { return c.priority; });
  const lazyComps     = COMPONENTS.filter(function(c) { return !c.priority; });

  priorityComps.forEach(loadComponent);
  setupLazyComponents(lazyComps);

  // ─── Shared event listeners ───────────────────────────────────────────────

  // Navbar scroll shadow
  window.addEventListener('scroll', function() {
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Smooth scroll for anchor links
  document.addEventListener('click', function(e) {
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
  document.addEventListener('click', function(e) {
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
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const item = btn.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('active'); });
    if (!wasActive) item.classList.add('active');
  });

  // Mobile nav toggle
  document.addEventListener('click', function(e) {
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