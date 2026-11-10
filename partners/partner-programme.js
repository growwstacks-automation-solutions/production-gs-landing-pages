/* GrowwStacks Partner Network — D-022
   One object for every published tier number. Cards, worked examples
   and the referral calculator all read from PARTNER_PROGRAMME. */
(function (root) {
  'use strict';

  var PROGRAMME = {
    payoutDays: 15,
    protectionDays: 90,
    pipelineMonths: 6,
    referral: {
      key: 'referral',
      name: 'Referral',
      oneLiner: 'Introduce a client. We do the rest.',
      bestFor: 'Consultants, fractional executives, advisors',
      projectRate: 0.15,
      retainerRate: 0.10,
      retainerMonths: 12,
      creditMonths: 12,
      branding: 'GrowwStacks-branded delivery',
      extras: '—',
      minDeals: 0,
      brandingNote: 'GrowwStacks-branded delivery',
      cta: 'Refer a client',
      ctaKind: 'refer',
      example: {
        projectFee: 12000,
        retainerMonthly: 2000,
        milestoneCount: 2
      }
    },
    reseller: {
      key: 'reseller',
      name: 'Reseller',
      nameNote: 'white-label',
      oneLiner: 'Sell our delivery under your brand.',
      bestFor: 'Digital agencies, web studios, IT and SaaS resellers',
      discountMin: 0.25,
      discountMax: 0.30,
      branding: 'Your brand. We stay invisible.',
      extras: 'Partner rate card, proposal support',
      minDeals: 1,
      periodMonths: 6,
      cta: 'Apply as a reseller',
      ctaKind: 'reseller',
      example: {
        listPrice: 10000,
        discount: 0.25,
        clientPrice: 13000
      }
    },
    strategic: {
      key: 'strategic',
      name: 'Strategic',
      oneLiner: 'Build a joint AI practice with us.',
      bestFor: 'Consultancies, systems integrators, platforms with an install base',
      year1Rate: 0.20,
      year2Rate: 0.10,
      creditMonths: 24,
      minDeals: 3,
      revenueMin: 50000,
      branding: 'Co-branded deals earn commission. White-label deals use reseller pricing, agreed per deal.',
      extras: 'Joint webinars, joint case studies, shared pipeline reviews',
      cta: 'Book a partner call',
      ctaKind: 'call',
      tag: 'Highest earnings',
      example: {
        year1: 40000,
        year2: 24000
      }
    }
  };

  function pct(rate) {
    return Math.round(rate * 100);
  }

  function money(amount) {
    var n = Math.round(Number(amount) || 0);
    return '$' + n.toLocaleString('en-US');
  }

  function wordsUnderTwenty(n) {
    var words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
    return words[n] || String(n);
  }

  function referralMath(projectFee, retainerMonthly) {
    var tier = PROGRAMME.referral;
    var project = Math.max(0, Number(projectFee) || 0);
    var monthly = Math.max(0, Number(retainerMonthly) || 0);
    var projectEarn = project * tier.projectRate;
    var retainerBase = monthly * tier.retainerMonths;
    var retainerEarn = retainerBase * tier.retainerRate;
    return {
      projectFee: project,
      retainerMonthly: monthly,
      projectEarn: projectEarn,
      retainerBase: retainerBase,
      retainerEarn: retainerEarn,
      totalEarn: projectEarn + retainerEarn,
      clientTotal: project + retainerBase
    };
  }

  function referralExample() {
    var ex = PROGRAMME.referral.example;
    var math = referralMath(ex.projectFee, ex.retainerMonthly);
    var count = ex.milestoneCount;
    var milestoneFee = count ? ex.projectFee / count : 0;
    var milestoneEarn = milestoneFee * PROGRAMME.referral.projectRate;
    var monthEarn = ex.retainerMonthly * PROGRAMME.referral.retainerRate;
    return Object.assign({}, math, {
      milestoneCount: count,
      milestoneFee: milestoneFee,
      milestoneEarn: milestoneEarn,
      monthEarn: monthEarn
    });
  }

  function resellerExample() {
    var ex = PROGRAMME.reseller.example;
    var payUs = ex.listPrice * (1 - ex.discount);
    return {
      listPrice: ex.listPrice,
      discount: ex.discount,
      payUs: payUs,
      clientPrice: ex.clientPrice,
      margin: ex.clientPrice - payUs
    };
  }

  function strategicExample() {
    var ex = PROGRAMME.strategic.example;
    var tier = PROGRAMME.strategic;
    var year1Earn = ex.year1 * tier.year1Rate;
    var year2Earn = ex.year2 * tier.year2Rate;
    return {
      year1: ex.year1,
      year2: ex.year2,
      year1Earn: year1Earn,
      year2Earn: year2Earn,
      total: year1Earn + year2Earn
    };
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }

  function earnSentence(tier) {
    if (tier.key === 'referral') {
      return '<strong>' + pct(tier.projectRate) + '%</strong> of the first project + <strong>' + pct(tier.retainerRate) + '%</strong> of retainer revenue for ' + tier.retainerMonths + ' months';
    }
    if (tier.key === 'reseller') {
      return '<strong>' + pct(tier.discountMin) + '–' + pct(tier.discountMax) + '% off</strong> our price for each project, depending on volume, agreed per partner.';
    }
    return '<strong>' + pct(tier.year1Rate) + '%</strong> of year-1 revenue + <strong>' + pct(tier.year2Rate) + '%</strong> of year-2 revenue per client';
  }

  function qualifySentence(tier) {
    if (tier.key === 'referral') return 'No minimum';
    if (tier.key === 'reseller') {
      return tier.minDeals + ' closed deal every ' + tier.periodMonths + ' months keeps your rate';
    }
    return tier.minDeals + ' deals or ' + money(tier.revenueMin) + ' in revenue per year';
  }

  function bookHref() {
    return 'https://calendly.com/groww-stacks/consultation';
  }

  function ctaMarkup(tier) {
    if (tier.ctaKind === 'refer') {
      return '<a class="pn-btn pn-btn-primary" href="/partners/#join?refer=1" data-cta="refer">' + esc(tier.cta) + '</a>';
    }
    if (tier.ctaKind === 'reseller') {
      return '<a class="pn-btn pn-btn-primary" href="/partners/#join?type=reseller" data-cta="apply-reseller">' + esc(tier.cta) + '</a>';
    }
    return '<a class="pn-btn pn-btn-primary" href="' + bookHref() + '" target="_blank" rel="noopener noreferrer" data-cta="book">' + esc(tier.cta) + '</a>';
  }

  function tierArticle(tier) {
    var strategic = tier.key === 'strategic';
    var title = esc(tier.name);
    if (tier.nameNote) title += ' <span class="pn-tier-note">(' + esc(tier.nameNote) + ')</span>';
    var tag = tier.tag ? '<span class="pn-tag">' + esc(tier.tag) + '</span>' : '';
    return (
      '<article class="pn-tier' + (strategic ? ' is-strategic' : '') + '" id="tier-' + tier.key + '">' +
        '<header class="pn-tier-name"><h3>' + title + '</h3>' + tag + '</header>' +
        '<p class="pn-tier-line">' + esc(tier.oneLiner) + '</p>' +
        '<p class="pn-tier-row"><span class="pn-k">Best for</span> ' + esc(tier.bestFor) + '</p>' +
        '<p class="pn-tier-earn">' + earnSentence(tier) + '</p>' +
        '<p class="pn-tier-row"><span class="pn-k">Branding</span> ' + esc(tier.branding) + '</p>' +
        '<p class="pn-tier-row"><span class="pn-k">Extras</span> ' + esc(tier.extras) + '</p>' +
        '<p class="pn-tier-row"><span class="pn-k">To qualify</span> ' + esc(qualifySentence(tier)) + '</p>' +
        '<p class="pn-tier-cta">' + ctaMarkup(tier) + '</p>' +
      '</article>'
    );
  }

  function renderHero() {
    var ex = referralExample();
    var map = {
      'ref-project-fee': money(ex.projectFee),
      'ref-project-earn': money(ex.projectEarn),
      'ref-retainer-monthly': money(ex.retainerMonthly),
      'ref-retainer-months': String(PROGRAMME.referral.retainerMonths),
      'ref-retainer-earn': money(ex.retainerEarn),
      'ref-total': money(ex.totalEarn),
      'payout-days': String(PROGRAMME.payoutDays)
    };
    Object.keys(map).forEach(function (key) {
      document.querySelectorAll('[data-pn="' + key + '"]').forEach(function (node) {
        node.textContent = map[key];
      });
    });
  }

  function renderTiers() {
    var host = document.getElementById('pn-tiers');
    if (!host) return;
    host.innerHTML = ['referral', 'reseller', 'strategic'].map(function (key) {
      return tierArticle(PROGRAMME[key]);
    }).join('');
  }

  function renderExamples() {
    var ref = referralExample();
    var res = resellerExample();
    var str = strategicExample();
    var refHost = document.getElementById('pn-ex-referral');
    var resHost = document.getElementById('pn-ex-reseller');
    var strHost = document.getElementById('pn-ex-strategic');
    if (refHost) {
      refHost.innerHTML =
        '<p class="pn-ex-lead">You introduce a client. They sign a ' + money(ref.projectFee) + ' first project, then a ' + money(ref.retainerMonthly) + '/month support retainer.</p>' +
        '<div class="pn-table-wrap"><table class="pn-table"><thead><tr><th scope="col">Item</th><th scope="col">Client pays</th><th scope="col">Your share</th><th scope="col">You earn</th></tr></thead><tbody>' +
          '<tr><th scope="row">First project</th><td>' + money(ref.projectFee) + '</td><td>' + pct(PROGRAMME.referral.projectRate) + '%</td><td>' + money(ref.projectEarn) + '</td></tr>' +
          '<tr><th scope="row">Retainer, first ' + PROGRAMME.referral.retainerMonths + ' months</th><td>' + money(ref.retainerBase) + '</td><td>' + pct(PROGRAMME.referral.retainerRate) + '%</td><td>' + money(ref.retainerEarn) + '</td></tr>' +
          '<tr class="is-total"><th scope="row">Total</th><td>' + money(ref.clientTotal) + '</td><td></td><td>' + money(ref.totalEarn) + '</td></tr>' +
        '</tbody></table></div>' +
        '<p class="pn-ex-note">If the project is billed in ' + wordsUnderTwenty(ref.milestoneCount) + ' ' + money(ref.milestoneFee) + ' milestones, you get ' + money(ref.milestoneEarn) + ' within ' + PROGRAMME.payoutDays + ' days of each milestone being paid. Then ' + money(ref.monthEarn) + ' for each paid retainer month.</p>' +
        '<form class="pn-calc" id="pn-calc" aria-labelledby="pn-calc-title">' +
          '<h3 id="pn-calc-title">What you\'d earn</h3>' +
          '<div class="pn-field"><label for="pn-calc-project">Project fee</label><input id="pn-calc-project" name="projectFee" inputmode="decimal" autocomplete="off" value="' + PROGRAMME.referral.example.projectFee + '"></div>' +
          '<div class="pn-field"><label for="pn-calc-retainer">Monthly retainer</label><input id="pn-calc-retainer" name="retainerMonthly" inputmode="decimal" autocomplete="off" value="' + PROGRAMME.referral.example.retainerMonthly + '"></div>' +
          '<p class="pn-calc-result">You earn <strong id="pn-calc-total">' + money(ref.totalEarn) + '</strong></p>' +
          '<p class="pn-calc-detail" id="pn-calc-detail" aria-live="polite"></p>' +
        '</form>';
    }
    if (resHost) {
      resHost.innerHTML =
        '<p class="pn-ex-lead"><strong>Example:</strong> A ' + money(res.listPrice) + ' project at ' + pct(res.discount) + '% off costs the partner ' + money(res.payUs) + '. If they resell it for ' + money(res.clientPrice) + ', they keep ' + money(res.margin) + '.</p>';
    }
    if (strHost) {
      strHost.innerHTML =
        '<p class="pn-ex-lead">A co-branded client pays us ' + money(str.year1) + ' in their first year and ' + money(str.year2) + ' in their second.</p>' +
        '<ul class="pn-ex-list">' +
          '<li>Year 1: ' + pct(PROGRAMME.strategic.year1Rate) + '% × ' + money(str.year1) + ' = <strong>' + money(str.year1Earn) + '</strong></li>' +
          '<li>Year 2: ' + pct(PROGRAMME.strategic.year2Rate) + '% × ' + money(str.year2) + ' = <strong>' + money(str.year2Earn) + '</strong></li>' +
          '<li><strong>Total: ' + money(str.total) + '</strong></li>' +
        '</ul>';
    }
  }

  function updateCalculator() {
    var project = document.getElementById('pn-calc-project');
    var retainer = document.getElementById('pn-calc-retainer');
    var total = document.getElementById('pn-calc-total');
    var detail = document.getElementById('pn-calc-detail');
    if (!project || !retainer || !total || !detail) return;
    var math = referralMath(project.value, retainer.value);
    total.textContent = money(math.totalEarn);
    detail.textContent = money(math.projectEarn) + ' from the first project + ' + money(math.retainerEarn) + ' from ' + PROGRAMME.referral.retainerMonths + ' months of retainer.';
  }

  function track(name, params) {
    var payload = params || {};
    root.dataLayer = root.dataLayer || [];
    var entry = { event: name };
    Object.keys(payload).forEach(function (key) { entry[key] = payload[key]; });
    root.dataLayer.push(entry);
    if (typeof root.gtag === 'function') root.gtag('event', name, payload);
  }

  function isBookLink(href) {
    return !href || href.charAt(0) === '[';
  }

  function reducedMotion() {
    return root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function scrollToJoin() {
    var target = document.getElementById('join');
    if (!target) return;
    target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }

  function setDealOpen(open) {
    var toggle = document.getElementById('hasDeal');
    var deal = document.getElementById('pn-deal');
    var submit = document.getElementById('pn-submit');
    if (toggle) toggle.checked = !!open;
    if (deal) {
      deal.hidden = !open;
      toggle && toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    if (submit) submit.textContent = open ? 'Register my client →' : 'Send →';
  }

  function setPartnerType(value) {
    var input = document.querySelector('input[name="partnerType"][value="' + value + '"]');
    if (input) input.checked = true;
  }

  function readFlag(source) {
    return /(?:^|[?&#])refer=1(?:&|$)/.test(source || '');
  }

  function readType(source) {
    var match = /(?:^|[?&#])type=([a-z-]+)/.exec(source || '');
    return match ? match[1] : '';
  }

  function applyEntryState() {
    var blob = (root.location.search || '') + (root.location.hash || '');
    var refer = readFlag(blob);
    var type = readType(blob);
    if (refer) setDealOpen(true);
    if (type === 'reseller' || type === 'referral' || type === 'strategic' || type === 'not-sure') {
      setPartnerType(type);
    }
    if (refer || /join|apply/.test(root.location.hash || '')) scrollToJoin();
  }

  function showFieldError(id, message) {
    var field = document.getElementById(id);
    var slot = document.getElementById(id + '-error');
    if (!field) return;
    var wrap = field.closest('.pn-field') || field.closest('.pn-choice') || field.closest('fieldset');
    if (wrap) wrap.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    if (slot) {
      slot.hidden = false;
      slot.textContent = message;
    }
  }

  function clearErrors() {
    document.querySelectorAll('.pn-form .is-invalid').forEach(function (node) {
      node.classList.remove('is-invalid');
    });
    document.querySelectorAll('.pn-form [aria-invalid="true"]').forEach(function (node) {
      node.removeAttribute('aria-invalid');
    });
    document.querySelectorAll('.pn-form .pn-error').forEach(function (node) {
      node.hidden = true;
      node.textContent = '';
    });
    var summary = document.getElementById('pn-form-errors');
    if (summary) {
      summary.hidden = true;
      summary.textContent = '';
    }
  }

  function looksLikeUrl(value) {
    var v = value.trim();
    if (!v) return false;
    if (!/^https?:\/\//i.test(v)) v = 'https://' + v;
    try {
      var url = new URL(v);
      return !!url.hostname && url.hostname.indexOf('.') !== -1;
    } catch (err) {
      return false;
    }
  }

  function validateForm() {
    clearErrors();
    var errors = [];
    var name = document.getElementById('fullName');
    var email = document.getElementById('email');
    var company = document.getElementById('company');
    var website = document.getElementById('website');
    var type = document.querySelector('input[name="partnerType"]:checked');
    var deal = document.getElementById('hasDeal');
    var clientCompany = document.getElementById('clientCompany');
    var aware = document.getElementById('clientAware');
    var consent = document.getElementById('consent');

    if (!name || name.value.trim().length < 2) {
      showFieldError('fullName', 'Please add your full name.');
      errors.push('Please add your full name.');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showFieldError('email', 'Please add your work email so we can reply.');
      errors.push('Please add your work email so we can reply.');
    }
    if (!company || !company.value.trim()) {
      showFieldError('company', 'Please add your company.');
      errors.push('Please add your company.');
    }
    if (!website || !looksLikeUrl(website.value)) {
      showFieldError('website', 'Please add your website or LinkedIn.');
      errors.push('Please add your website or LinkedIn.');
    }
    if (!type) {
      showFieldError('partnerType', 'Please choose a partner type.');
      errors.push('Please choose a partner type.');
    }
    if (deal && deal.checked) {
      if (!clientCompany || !clientCompany.value.trim()) {
showFieldError('clientCompany', 'Please tell us the client\'s company name to register them.');
      errors.push('Please tell us the client\'s company name to register them.');
      }
      if (!aware || !aware.checked) {
        showFieldError('clientAware', 'Please confirm the client knows you\'re introducing GrowwStacks.');
        errors.push('Please confirm the client knows you\'re introducing GrowwStacks.');
      }
    }
    if (!consent || !consent.checked) {
      showFieldError('consent', 'Please agree to the terms and privacy policy.');
      errors.push('Please agree to the terms and privacy policy.');
    }
    if (errors.length) {
      var summary = document.getElementById('pn-form-errors');
      if (summary) {
        summary.hidden = false;
        summary.textContent = errors.join(' ');
      }
      var first = document.querySelector('.pn-form .is-invalid input, .pn-form .is-invalid textarea, .pn-form fieldset.is-invalid input');
      if (first) first.focus();
    }
    return errors.length === 0;
  }

  function utm(name) {
    try {
      return new URLSearchParams(root.location.search).get(name) || '';
    } catch (err) {
      return '';
    }
  }

  function buildPayload(token) {
    var deal = document.getElementById('hasDeal').checked;
    var fullName = document.getElementById('fullName').value.trim();
    var now = new Date().toISOString();
    return {
      type: 'partner_application',
      page: 'partners',
      page_url: root.location.href,
      submittedAt: now,
      submitted_at: now,
      fullName: fullName,
      name: fullName,
      email: document.getElementById('email').value.trim(),
      company: document.getElementById('company').value.trim(),
      website: document.getElementById('website').value.trim(),
      partnerType: (document.querySelector('input[name="partnerType"]:checked') || {}).value || '',
      hasDeal: deal ? 'yes' : 'no',
      clientCompany: deal ? document.getElementById('clientCompany').value.trim() : '',
      clientWebsite: deal ? document.getElementById('clientWebsite').value.trim() : '',
      clientNeed: deal ? document.getElementById('clientNeed').value.trim() : '',
      clientAware: deal && document.getElementById('clientAware').checked ? 'yes' : 'no',
      consent: 'yes',
      utm_source: utm('utm_source'),
      utm_medium: utm('utm_medium'),
      utm_campaign: utm('utm_campaign'),
      utm_content: utm('utm_content'),
      utm_term: utm('utm_term'),
      referrer: document.referrer || '',
      'cf-turnstile-response': token || ''
    };
  }

  function webhookUrl() {
    if (root.SITE && root.SITE.formWebhookUrl) return root.SITE.formWebhookUrl;
    return 'https://hook.eu1.make.com/348zga9r5guhanfwrp2ehmd86iwj2vq6';
  }

  function turnstileToken() {
    try {
      if (typeof root.turnstile !== 'undefined') return root.turnstile.getResponse() || '';
    } catch (err) {}
    return '';
  }

  function verifyCaptcha(token) {
    var body = new URLSearchParams();
    body.append('token', token);
    return fetch('https://script.google.com/macros/s/AKfycbxaCgJa3Swn_khuefJdS83fMii6xKWgzU_L5ssI95WZ9aiqniqB0fIY20fB3gerdS8K/exec', {
      method: 'POST',
      body: body
    }).then(function (res) { return res.text(); }).then(function (text) {
      return JSON.parse(text);
    });
  }

  function showSuccess(firstName, registered) {
    var form = document.getElementById('pn-form');
    var success = document.getElementById('pn-success');
    var nameSlot = document.getElementById('pn-thanks-name');
    var registeredLine = document.getElementById('pn-thanks-registered');
    if (nameSlot) nameSlot.textContent = firstName;
    if (registeredLine) registeredLine.hidden = !registered;
    if (form) form.hidden = true;
    if (success) {
      success.hidden = false;
      success.focus();
    }
  }

  function bindForm() {
    var form = document.getElementById('pn-form');
    var toggle = document.getElementById('hasDeal');
    if (toggle) {
      toggle.addEventListener('change', function () { setDealOpen(toggle.checked); });
    }
    if (!form || form.dataset.bound === '1') return;
    form.dataset.bound = '1';
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!validateForm()) return;
      var token = turnstileToken();
      var captchaError = document.getElementById('captcha-error');
      if (!token) {
        if (captchaError) {
          captchaError.hidden = false;
          captchaError.textContent = 'Please verify you are human.';
        }
        return;
      }
      if (captchaError) captchaError.hidden = true;
      var button = document.getElementById('pn-submit');
      var payload = buildPayload(token);
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }
      verifyCaptcha(token).then(function (verify) {
        if (!verify || !verify.success) throw new Error('captcha');
        return fetch(webhookUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(function (res) {
          if (!res.ok) throw new Error('webhook');
        });
      }).then(function () {
        var first = payload.fullName.split(/\s+/)[0];
        track('partner_form_submit', { partner_type: payload.partnerType, has_deal: payload.hasDeal === 'yes' });
        if (typeof root.gtag === 'function') {
          root.gtag('event', 'partner_application_submitted', { event_category: 'Partnership', event_label: payload.partnerType });
          root.gtag('event', 'conversion', { send_to: 'AW-17936939840/partner_application' });
        }
        showSuccess(first, payload.hasDeal === 'yes');
      }).catch(function (err) {
        if (button) {
          button.disabled = false;
          button.textContent = payload.hasDeal === 'yes' ? 'Register my client →' : 'Send →';
        }
        try { if (typeof root.turnstile !== 'undefined') root.turnstile.reset(); } catch (err) {}
        var summary = document.getElementById('pn-form-errors');
        if (err && err.message === 'captcha' && captchaError) {
          captchaError.hidden = false;
          captchaError.textContent = 'Please verify you are human.';
        } else if (summary) {
          summary.hidden = false;
          summary.textContent = 'We couldn\'t send that. Please try again, or email project@growwstacks.com.';
        }
      });
    });
  }

  function bindTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;
    function select(tab) {
      tabs.forEach(function (item) {
        var on = item === tab;
        item.setAttribute('aria-selected', on ? 'true' : 'false');
        item.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(item.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (event) {
        var next = null;
        if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
        if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
        if (event.key === 'Home') next = tabs[0];
        if (event.key === 'End') next = tabs[tabs.length - 1];
        if (next) {
          event.preventDefault();
          select(next);
          next.focus();
        }
      });
    });
  }

  function bindCalculator() {
    ['pn-calc-project', 'pn-calc-retainer'].forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('input', updateCalculator);
    });
    var calc = document.getElementById('pn-calc');
    if (calc) calc.addEventListener('submit', function (event) { event.preventDefault(); });
    updateCalculator();
  }

  function bindClicks() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('[data-cta]');
      if (!link) return;
      var kind = link.getAttribute('data-cta');
      if (kind === 'book') {
        track('partner_cta_book_call');
        if (isBookLink(link.getAttribute('href'))) {
          event.preventDefault();
          var note = document.getElementById('pn-calendly-note');
          if (note) note.focus();
        }
        return;
      }
      if (kind === 'refer' || kind === 'apply-reseller' || kind === 'form') {
        if (kind === 'refer') track('partner_cta_refer');
        event.preventDefault();
        if (kind === 'refer') {
          setDealOpen(true);
          setPartnerType('referral');
        } else if (kind === 'apply-reseller') {
          setDealOpen(false);
          setPartnerType('reseller');
        } else {
          setDealOpen(false);
        }
        if (root.history && root.history.replaceState) {
          var hash = kind === 'refer' ? '#join?refer=1' : (kind === 'apply-reseller' ? '#join?type=reseller' : '#join');
          root.history.replaceState(null, '', '/partners/' + hash);
        }
        scrollToJoin();
      }
    });
  }

  function bindTiersScroll() {
    var scroller = document.getElementById('pn-tiers');
    var prev = document.getElementById('pn-tier-prev');
    var next = document.getElementById('pn-tier-next');
    if (!scroller || !prev || !next) return;
    function step(dir) {
      var card = scroller.querySelector('.pn-tier');
      var amount = card ? card.getBoundingClientRect().width + 16 : scroller.clientWidth * 0.86;
      scroller.scrollBy({ left: dir * amount, behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
    prev.addEventListener('click', function () { step(-1); });
    next.addEventListener('click', function () { step(1); });
  }

  function bindReveal() {
    if (reducedMotion() || !('IntersectionObserver' in root)) {
      document.querySelectorAll('.pn-reveal').forEach(function (node) { node.classList.add('is-in'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.pn-reveal').forEach(function (node) { observer.observe(node); });
  }

  function init() {
    renderHero();
    renderTiers();
    renderExamples();
    bindTabs();
    bindCalculator();
    bindForm();
    bindClicks();
    bindTiersScroll();
    bindReveal();
    setDealOpen(false);
    applyEntryState();
    document.documentElement.dataset.pnReady = '1';
  }

  root.PARTNER_PROGRAMME = PROGRAMME;
  root.PN = {
    money: money,
    pct: pct,
    referralMath: referralMath,
    referralExample: referralExample,
    resellerExample: resellerExample,
    strategicExample: strategicExample,
    qualifySentence: qualifySentence,
    earnSentence: earnSentence,
    buildPayload: buildPayload,
    validateForm: validateForm,
    renderHero: renderHero,
    renderTiers: renderTiers,
    renderExamples: renderExamples,
    init: init,
    webhookUrl: webhookUrl
  };
})(typeof window !== 'undefined' ? window : globalThis);
