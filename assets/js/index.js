// ============================================
// Index page — consultation form submission
// (Scroll / smooth-anchor / FAQ / YouTube-facade
//  handlers live in _shared/page-builder.js.)
// ============================================

// The consult form is injected asynchronously by page-builder.js, so
// bind via event delegation rather than a direct submit listener.
document.addEventListener('submit', async function (e) {
  const form = e.target.closest('#consultForm');
  if (!form) return;
  e.preventDefault();

  const btn = document.getElementById('submitBtn');
  if (btn) {
    btn.textContent = 'Sending...';
    btn.disabled = true;
  }

  const pageUrlEl = document.getElementById('pageUrl');
  const submittedAtEl = document.getElementById('submittedAt');
  if (pageUrlEl)     pageUrlEl.value     = window.location.href;
  if (submittedAtEl) submittedAtEl.value = new Date().toISOString();

  const data = {};
  new FormData(form).forEach((value, key) => { data[key] = value; });

  const webhookUrl = (typeof SITE !== 'undefined' && SITE.formWebhookUrl) || '';
  const thankYou   = (typeof SITE !== 'undefined' && SITE.thankYouPage)   || '/thank-you/';

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data)
      });
    } catch (err) {
      // Webhook failures shouldn't block the user from reaching thank-you.
    }
  }

  window.location.href = thankYou;
});
