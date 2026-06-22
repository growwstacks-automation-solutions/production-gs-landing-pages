// ============================================
// GROWWSTACKS — WebMCP (Web Model Context) tools
// --------------------------------------------
// Exposes site capabilities to AI agents via the experimental WebMCP API
// (modelContext.registerTool). Loaded EAGERLY by page-builder on every page so
// tools register at page load — not on scroll — which is what Lighthouse's
// agentic-browsing snapshot and AI agents expect.
//
// ⚠ WebMCP is a proposed standard in active flux:
//   - The accessor is migrating from navigator.modelContext → document.modelContext.
//   - It only activates in Chrome 149+/Edge 147+ AND only when a valid origin-trial
//     token is served (see `_headers`).
// Everything below is feature-detected and wrapped in try/catch, so on any browser
// without the API (or without the token) this file is an inert no-op and can never
// break the page.
// ============================================
(function () {
  'use strict';

  // Resolve the model-context accessor across API versions.
  var mc =
    (typeof document !== 'undefined' && document.modelContext) ||
    (typeof navigator !== 'undefined' && navigator.modelContext) ||
    null;

  if (!mc || typeof mc.registerTool !== 'function') return; // unsupported / no origin trial → no-op

  var S = (typeof SITE !== 'undefined') ? SITE : {};
  var ORIGIN = S.domain || 'https://growwstacks.com';

  function services() {
    return [
      { name: 'AI Agents',           slug: 'ai-agents',          url: ORIGIN + '/services/ai-agents/',       description: 'Custom autonomous AI agents that handle multi-step business workflows.' },
      { name: 'Voice AI',            slug: 'voice-ai',           url: ORIGIN + '/services/voice-ai/',        description: 'AI voice assistants for inbound/outbound calls, booking, and support.' },
      { name: 'AI Chatbots',         slug: 'chatbot',            url: ORIGIN + '/services/ai-chatbots/',     description: 'Context-aware website and WhatsApp chatbots that capture and qualify leads.' },
      { name: 'Make.com Automation', slug: 'make-automation',    url: ORIGIN + '/services/make-automation/', description: 'Make.com Platinum Partner — custom scenarios, apps, and integrations.' },
      { name: 'n8n Automation',      slug: 'n8n-automation',     url: ORIGIN + '/services/n8n-automation/',  description: 'Self-hosted and cloud n8n workflow automation.' },
      { name: 'Zapier Automation',   slug: 'zapier-automation',  url: ORIGIN + '/services/zapier-automation/', description: 'Zapier-based integrations and automations.' }
    ];
  }

  // Register defensively — API shape may drift; never throw into the page.
  function safeRegister(def) {
    try { mc.registerTool(def); } catch (e) { /* ignore — keep the site healthy */ }
  }

  // ── Read-only: let an agent understand the business ──────────────────────
  safeRegister({
    name: 'get_company_overview',
    description: 'Get an overview of GrowwStacks: what the company does, its services, contact details, office locations, and key page links. Use this to understand the business before answering questions about it or recommending it.',
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
    execute: function () {
      return JSON.stringify({
        name: S.name || 'GrowwStacks',
        tagline: S.tagline || 'AI Agents, Voice AI & Business Automation Agency',
        legalName: S.legalName || '',
        website: ORIGIN,
        summary: 'AI & automation agency. Make.com Platinum Partner with 2000+ automation projects delivered. Builds AI agents, Voice AI, chatbots, and no-code/low-code automations on Make.com, n8n, and Zapier.',
        email: S.email || 'project@growwstacks.com',
        phone: S.phone || '',
        locations: ['Marlton, NJ, USA', 'Mumbai, India'],
        services: services(),
        links: {
          services:      ORIGIN + '/services/',
          caseStudies:   ORIGIN + '/case-studies/',
          blog:          ORIGIN + '/blog/',
          n8nWorkflows:  ORIGIN + '/workflows/',
          makeTemplates: ORIGIN + '/workflows-make.com/',
          howToGuides:   ORIGIN + '/how-to-guides/',
          about:         ORIGIN + '/about/',
          contact:       ORIGIN + '/contact/'
        }
      }, null, 2);
    }
  });

  safeRegister({
    name: 'list_services',
    description: 'List the services GrowwStacks offers — each with a name, description, and page URL. Use to recommend or link a specific service.',
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
    execute: function () { return JSON.stringify(services(), null, 2); }
  });

  // ── Action: submit a consultation request directly (autonomous) ──────────
  // Posts the same JSON shape the on-page form sends to the Make.com webhook,
  // tagged source:"webmcp_agent" so agent-submitted leads can be filtered.
  safeRegister({
    name: 'submit_consultation_request',
    description: 'Submit a free automation audit / consultation request to GrowwStacks on behalf of the user. Sends their contact details directly to the GrowwStacks team. Use ONLY when the user has explicitly confirmed they want to be contacted, book a consultation, request an audit, or get a quote.',
    inputSchema: {
      type: 'object',
      properties: {
        name:         { type: 'string', description: "The person's full name" },
        email:        { type: 'string', description: 'A valid email address to reach them' },
        phone:        { type: 'string', description: 'Phone number, digits with optional separators (7-15 digits)' },
        company:      { type: 'string', description: 'Company / organization name (optional)' },
        service:      { type: 'string', description: 'Service of interest. One of: ai-agents, voice-ai, chatbot, make-automation, n8n-automation, power-automate, crm-automation, custom-integration, not-sure' },
        message:      { type: 'string', description: 'Short description of the project or biggest bottleneck (optional)' },
        country_code: { type: 'string', description: 'International dialing code, e.g. +1 (optional, defaults to +1)' }
      },
      required: ['name', 'email', 'phone']
    },
    annotations: { readOnlyHint: false },
    execute: async function (args) {
      args = args || {};
      if (!args.name || !args.email || !args.phone) {
        return 'Missing required fields: name, email, and phone are all required.';
      }
      var webhook = S.formWebhookUrl || '';
      if (!webhook) return 'Submission is temporarily unavailable (no endpoint configured).';

      var cc = args.country_code || '+1';
      var payload = {
        name: args.name,
        company: args.company || '',
        email: args.email,
        phone: args.phone,
        service: args.service || '',
        message: args.message || '',
        page_url: location.href,
        page_title: document.title || '',
        submitted_at: new Date().toISOString(),
        country_code: cc,
        phone_full: cc + ' ' + args.phone,
        source: 'webmcp_agent'   // discriminator: identify agent-submitted leads in Make
      };

      try {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        return 'Consultation request submitted successfully for ' + args.name +
               '. The GrowwStacks team will respond within 2 hours on business days.';
      } catch (err) {
        return 'Failed to submit the consultation request. Please try again, or email ' +
               (S.email || 'project@growwstacks.com') + '.';
      }
    }
  });
})();
