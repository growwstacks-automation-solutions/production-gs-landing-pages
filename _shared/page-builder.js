// ============================================
// GROWWSTACKS PAGE BUILDER — PERFORMANCE MODE
// Optimized for Core Web Vitals + Lighthouse
// ============================================

(function () {
  'use strict';

  // --- Path to _shared/ ---
  const depth = location.pathname.replace(/\/+$/, '').split('/').filter(Boolean).length;
  const prefix = depth === 0 ? './_shared/' : '../'.repeat(depth) + '_shared/';

  // ⚡ Load ONLY below-fold components dynamically
  const COMPONENTS = [
    { id: 'gs-ticker',          file: 'components/ticker.html' },
    { id: 'gs-partners',        file: 'components/partners.html' },
    { id: 'gs-stats',           file: 'components/stats-bar.html' },
    { id: 'gs-mid-cta',         file: 'components/mid-cta.html' },
    { id: 'gs-cases',           file: 'components/cases.html' },
    { id: 'gs-industries',      file: 'components/industries.html' },
    { id: 'gs-testimonials',    file: 'components/testimonials.html' },
    { id: 'gs-consult-section', file: 'components/consult-section.html' },
    { id: 'gs-consult-form',    file: 'components/consult-form.html' },
    { id: 'gs-faq',             file: 'components/faq.html' },
    { id: 'gs-footer',          file: 'components/footer.html' }
  ];

  // --- Token replace ---
  function replaceTokens(html) {
    if (typeof SITE === 'undefined') return html;

    return html.replace(/\{\{(.*?)\}\}/g, (_, key) => {
      try {
        return key.split('.').reduce((o, k) => o[k], SITE) ?? '';
      } catch {
        return '';
      }
    });
  }

  // --- Activate scripts safely ---
  function activateScripts(container) {
    container.querySelectorAll('script').forEach(old => {
      const s = document.createElement('script');
      s.textContent = old.textContent;
      [...old.attributes].forEach(a => s.setAttribute(a.name, a.value));
      old.replaceWith(s);
    });
  }

  // 🚀 Lazy load components ONLY when near viewport
  function lazyLoadComponent(comp) {
    const el = document.getElementById(comp.id);
    if (!el) return;

    const observer = new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return;

      fetch(prefix + comp.file)
        .then(r => r.text())
        .then(html => {
          el.innerHTML = replaceTokens(html);
          activateScripts(el);
        });

      obs.disconnect();
    }, { rootMargin: '300px' });

    observer.observe(el);
  }

  COMPONENTS.forEach(lazyLoadComponent);

  // ============================================
  // ⚡ LIGHTWEIGHT SHARED INTERACTIONS
  // ============================================

  // Passive scroll listener
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', scrollY > 20);
  }, { passive: true });

  // Smooth anchor scroll
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth'
    });
  });

  // 🚀 Ultra-light YouTube facade
  document.addEventListener('click', e => {
    const el = e.target.closest('.yt-lite');
    if (!el) return;

    const id = el.dataset.id;
    el.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${id}?autoplay=1"
        title="YouTube video"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
        loading="lazy"
        style="width:100%;height:100%;border:0;"
      ></iframe>
    `;
  });

  // FAQ accordion
  document.addEventListener('click', e => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;

    const item = btn.parentElement;
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    item.classList.toggle('active');
  });

  // Mobile menu
  document.addEventListener('click', e => {
    const toggle = e.target.closest('.nav-mobile-toggle');
    const links = document.querySelector('.nav-links');

    if (toggle && links) {
      links.classList.toggle('show');
      toggle.classList.toggle('open');
    } else if (links && links.classList.contains('show')) {
      links.classList.remove('show');
    }
  });

})();