// ============================================
// GROWWSTACKS SITE CONFIGURATION
// Single source of truth for all pages
// Last updated: 2026-02-18
// ============================================

const SITE = {

  // ─── Brand ────────────────────────────────
  name: 'GrowwStacks',
  tagline: 'AI Agents, Voice AI & Business Automation Agency',
  legalName: 'M TEC Software & Business Automation Pvt. Ltd.',

  // ─── URLs ─────────────────────────────────
  domain: 'https://go.growwstacks.com',

  // ─── Contact ──────────────────────────────
  phone: '+91-971-333-9155',
  phoneTel: 'tel:+919713339155',
  email: 'hello@growwstacks.com',

  // ─── Addresses ────────────────────────────
  addressUS: {
    street: '525 Route 73 North, Ste 104',
    city: 'Marlton', state: 'NJ', zip: '08053',
    country: 'US', flag: '🇺🇸'
  },
  addressIN: {
    city: 'Mumbai', state: 'Maharashtra',
    country: 'IN', flag: '🇮🇳'
  },

  // ─── Social & Profiles ────────────────────
  social: {
    linkedin:      'https://www.linkedin.com/company/growwstacks/',
    upwork:        'https://www.upwork.com/agencies/1631885072275017728',
    googleReviews: 'https://share.google/e7U12GrP3UxuzJEGr',
  },

  // ─── Tracking ─────────────────────────────
  googleAdsId: 'AW-17936939840',
  // googleAnalyticsId: 'G-XXXXXXXXXX',  // uncomment when ready

  // ─── Form / Webhook ───────────────────────
  formWebhookUrl: 'https://hook.eu1.make.com/djyya63kealsfy8pa1va2a1ds3hi31om',
  thankYouPage: '/pages/thank-you/',

  // ─── Assets (ImageKit) ────────────────────
  imagekit: {
    base:    'https://ik.imagekit.io/r2zdlyze2o/GS%20Website',
    favicon: 'https://ik.imagekit.io/ui4mpbzoy/growwstacks-favicon-logo.png',
  },

  // ─── Stats ────────────────────────────────
  stats: {
    projects:      '2000+',
    clients:       '500+',
    experts:       '40+',
    costReduction: '60%',
    googleRating:  '5.0',
  },

  // ─── Fonts ────────────────────────────────
  fonts: {
    display: "'Bricolage Grotesque', serif",
    body:    "'Plus Jakarta Sans', sans-serif",
    url:     'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap',
  },

  // ============================================
  // BRAND LOGOS — THE single source of truth.
  // Every logo URL lives here exactly ONCE.
  // Shape per entry: { name, src, fallback, alt, domain? }
  //
  // HOW TO USE:
  //   const BL = SITE.brandLogos;  (defined below)
  //   BL.make.src          → logo URL
  //   BL.make.alt          → alt text
  //   BL.make.fallback     → fallback URL
  //
  // SITE.logos (for page-builder) is auto-derived below.
  // NEVER hardcode logo URLs anywhere else.
  // ============================================
  brandLogos: {

    // ── GrowwStacks ─────────────────────────
    growwstacks: {
      name:     'GrowwStacks',
      src:      'https://ik.imagekit.io/ui4mpbzoy/growwstacks-favicon-logo.png',
      fallback: 'https://ik.imagekit.io/ui4mpbzoy/growwstacks-favicon-logo.png',
      alt:      'GrowwStacks Logo',
    },

    // ── Automation & No-Code ─────────────────
    make: {
      name:     'Make.com',
      src:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/make-color.png?updatedAt=1771322847653',
      fallback: 'https://cdn.worldvectorlogo.com/logos/make-formerly-integromat.svg',
      alt:      'Make.com Logo',
      domain:   'make.com',
    },
    zapier: {
      name:     'Zapier',
      src:      'https://logo.clearbit.com/zapier.com',
      fallback: 'https://cdn.worldvectorlogo.com/logos/zapier.svg',
      alt:      'Zapier Logo',
      domain:   'zapier.com',
    },
    n8n: {
      name:     'n8n',
      src:      'https://logo.clearbit.com/n8n.io',
      fallback: 'https://n8n.io/favicon.ico',
      alt:      'n8n Logo',
      domain:   'n8n.io',
    },

    // ── CRM & Sales ──────────────────────────
    hubspot: {
      name:     'HubSpot',
      src:      'https://logo.clearbit.com/hubspot.com',
      fallback: 'https://www.google.com/s2/favicons?domain=hubspot.com&sz=32',
      alt:      'HubSpot Logo',
      domain:   'hubspot.com',
    },
    salesforce: {
      name:     'Salesforce',
      src:      'https://logo.clearbit.com/salesforce.com',
      fallback: 'https://www.google.com/s2/favicons?domain=salesforce.com&sz=32',
      alt:      'Salesforce Logo',
      domain:   'salesforce.com',
    },
    monday: {
      name:     'Monday.com',
      src:      'https://logo.clearbit.com/monday.com',
      fallback: 'https://cdn.worldvectorlogo.com/logos/monday-1.svg',
      alt:      'Monday.com Logo',
      domain:   'monday.com',
    },

    // ── Database & Productivity ──────────────
    airtable: {
      name:     'Airtable',
      src:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/images.png?updatedAt=1771322869012',
      fallback: 'https://cdn.worldvectorlogo.com/logos/airtable.svg',
      alt:      'Airtable Logo',
      domain:   'airtable.com',
    },
    notion: {
      name:     'Notion',
      src:      'https://logo.clearbit.com/notion.so',
      fallback: 'https://www.google.com/s2/favicons?domain=notion.so&sz=32',
      alt:      'Notion Logo',
      domain:   'notion.so',
    },
    slack: {
      name:     'Slack',
      src:      'https://logo.clearbit.com/slack.com',
      fallback: 'https://www.google.com/s2/favicons?domain=slack.com&sz=32',
      alt:      'Slack Logo',
      domain:   'slack.com',
    },

    // ── Microsoft Suite ──────────────────────
    microsoft: {
      name:     'Microsoft',
      src:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Microsoft_logo.svg.png?updatedAt=1771323050579',
      fallback: 'https://cdn.worldvectorlogo.com/logos/microsoft.svg',
      alt:      'Microsoft Logo',
      domain:   'microsoft.com',
    },
    powerAutomate: {
      name:     'Power Automate',
      src:      'https://logo.clearbit.com/microsoft.com',
      fallback: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=32',
      alt:      'Power Automate Logo',
      domain:   'microsoft.com',
    },
    powerBi: {
      name:     'Power BI',
      src:      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/512px-New_Power_BI_Logo.svg.png',
      fallback: 'https://logo.clearbit.com/powerbi.microsoft.com',
      alt:      'Power BI Logo',
      domain:   'powerbi.microsoft.com',
    },
    powerApps: {
      name:     'Power Apps',
      src:      'https://logo.clearbit.com/microsoft.com',
      fallback: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=32',
      alt:      'Power Apps Logo',
      domain:   'microsoft.com',
    },

    // ── AI & Voice ───────────────────────────
    openai: {
      name:     'OpenAI',
      src:      'https://logo.clearbit.com/openai.com',
      fallback: 'https://www.google.com/s2/favicons?domain=openai.com&sz=32',
      alt:      'OpenAI Logo',
      domain:   'openai.com',
    },
    vapi: {
      name:     'VAPI',
      src:      'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://vapi.ai&size=32',
      fallback: 'https://avatars.githubusercontent.com/u/119600686?s=200&v=4',
      alt:      'VAPI Logo',
      domain:   'vapi.ai',
    },
    retellAi: {
      name:     'Retell AI',
      src:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/6726f234dc6305cc1dee884c_Retell-mark-black.png?updatedAt=1771326562198',
      fallback: 'https://avatars.githubusercontent.com/u/128374519?s=200&v=4',
      alt:      'Retell AI Logo',
      domain:   'retellai.com',
    },

    // ── Messaging & Communication ────────────
    whatsapp: {
      name:     'WhatsApp',
      src:      'https://logo.clearbit.com/whatsapp.com',
      fallback: 'https://www.google.com/s2/favicons?domain=whatsapp.com&sz=32',
      alt:      'WhatsApp Logo',
      domain:   'whatsapp.com',
    },
    telegram: {
      name:     'Telegram',
      src:      'https://logo.clearbit.com/telegram.org',
      fallback: 'https://www.google.com/s2/favicons?domain=telegram.org&sz=32',
      alt:      'Telegram Logo',
      domain:   'telegram.org',
    },
    discord: {
      name:     'Discord',
      src:      'https://logo.clearbit.com/discord.com',
      fallback: 'https://www.google.com/s2/favicons?domain=discord.com&sz=32',
      alt:      'Discord Logo',
      domain:   'discord.com',
    },
    twilio: {
      name:     'Twilio',
      src:      'https://logo.clearbit.com/twilio.com',
      fallback: 'https://www.google.com/s2/favicons?domain=twilio.com&sz=32',
      alt:      'Twilio Logo',
      domain:   'twilio.com',
    },

    // ── Social & Marketing ───────────────────
    meta: {
      name:     'Meta / Facebook',
      src:      'https://logo.clearbit.com/meta.com',
      fallback: 'https://www.google.com/s2/favicons?domain=meta.com&sz=32',
      alt:      'Meta / Facebook Logo',
      domain:   'meta.com',
    },
    instagram: {
      name:     'Instagram',
      src:      'https://www.google.com/s2/favicons?domain=instagram.com&sz=32',
      fallback: 'https://www.google.com/s2/favicons?domain=instagram.com&sz=32',
      alt:      'Instagram Logo',
      domain:   'instagram.com',
    },
    messenger: {
      name:     'Messenger',
      src:      'https://www.google.com/s2/favicons?domain=messenger.com&sz=32',
      fallback: 'https://www.google.com/s2/favicons?domain=messenger.com&sz=32',
      alt:      'Messenger Logo',
      domain:   'messenger.com',
    },
    manychat: {
      name:     'ManyChat',
      src:      'https://www.google.com/s2/favicons?domain=manychat.com&sz=32',
      fallback: 'https://www.google.com/s2/favicons?domain=manychat.com&sz=32',
      alt:      'ManyChat Logo',
      domain:   'manychat.com',
    },
    mailchimp: {
      name:     'Mailchimp',
      src:      'https://logo.clearbit.com/mailchimp.com',
      fallback: 'https://www.google.com/s2/favicons?domain=mailchimp.com&sz=32',
      alt:      'Mailchimp Logo',
      domain:   'mailchimp.com',
    },

    // ── E-Commerce & Payments ────────────────
    shopify: {
      name:     'Shopify',
      src:      'https://logo.clearbit.com/shopify.com',
      fallback: 'https://www.google.com/s2/favicons?domain=shopify.com&sz=32',
      alt:      'Shopify Logo',
      domain:   'shopify.com',
    },
    stripe: {
      name:     'Stripe',
      src:      'https://logo.clearbit.com/stripe.com',
      fallback: 'https://www.google.com/s2/favicons?domain=stripe.com&sz=32',
      alt:      'Stripe Logo',
      domain:   'stripe.com',
    },
    quickbooks: {
      name:     'QuickBooks',
      src:      'https://logo.clearbit.com/quickbooks.intuit.com',
      fallback: 'https://cdn.worldvectorlogo.com/logos/quickbooks-2.svg',
      alt:      'QuickBooks Logo',
      domain:   'quickbooks.intuit.com',
    },

    // ── Google Suite ─────────────────────────
    google: {
      name:     'Google',
      src:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/GrowwStacks%20Google%20Review%20Logo.png',
      fallback: 'https://www.google.com/s2/favicons?domain=google.com&sz=32',
      alt:      'Google Logo',
      domain:   'google.com',
    },
    googleSheets: {
      name:     'Google Sheets',
      src:      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Google_Sheets_logo_%282014-2020%29.svg/512px-Google_Sheets_logo_%282014-2020%29.svg.png',
      fallback: 'https://logo.clearbit.com/sheets.google.com',
      alt:      'Google Sheets Logo',
      domain:   'sheets.google.com',
    },
    gmail: {
      name:     'Gmail',
      src:      'https://www.google.com/s2/favicons?domain=gmail.com&sz=32',
      fallback: 'https://www.google.com/s2/favicons?domain=gmail.com&sz=32',
      alt:      'Gmail Logo',
      domain:   'gmail.com',
    },

    // ── Dev & Cloud ──────────────────────────
    aws: {
      name:     'AWS',
      src:      'https://logo.clearbit.com/amazon.com',
      fallback: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=32',
      alt:      'AWS Logo',
      domain:   'amazon.com',
    },
    jira: {
      name:     'Jira',
      src:      'https://logo.clearbit.com/atlassian.com',
      fallback: 'https://www.google.com/s2/favicons?domain=atlassian.com&sz=32',
      alt:      'Jira Logo',
      domain:   'atlassian.com',
    },

    // ── Scheduling & Meetings ────────────────
    zoom: {
      name:     'Zoom',
      src:      'https://logo.clearbit.com/zoom.us',
      fallback: 'https://www.google.com/s2/favicons?domain=zoom.us&sz=32',
      alt:      'Zoom Logo',
      domain:   'zoom.us',
    },
    calendly: {
      name:     'Calendly',
      src:      'https://logo.clearbit.com/calendly.com',
      fallback: 'https://www.google.com/s2/favicons?domain=calendly.com&sz=32',
      alt:      'Calendly Logo',
      domain:   'calendly.com',
    },

    // ── Review / Freelance Platforms ─────────
    upwork: {
      name:     'Upwork',
      src:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/upwork%20logo.jpeg?updatedAt=1771312194270',
      fallback: 'https://logo.clearbit.com/upwork.com',
      alt:      'Upwork Logo',
      domain:   'upwork.com',
    },
  },

};

// ─── Convenience alias ────────────────────────────────────────────────────────
// BL.make.src  →  logo URL for Make.com (everywhere)
const BL = SITE.brandLogos;

// ============================================
// SITE.logos — AUTO-DERIVED from brandLogos.
// ⚠️  DO NOT hardcode URLs here.
//     DO NOT rename keys — page-builder.js reads them directly.
//     To change any logo URL → edit brandLogos above.
// ============================================
SITE.logos = {
  make:      BL.make.src,
  monday:    BL.monday.src,
  zapier:    BL.zapier.src,
  n8n:       BL.n8n.src,
  microsoft: BL.microsoft.src,
  airtable:  BL.airtable.src,
  vapi:      BL.vapi.src,
  retell:    BL.retellAi.src,
  google:    BL.google.src,
  upwork:    BL.upwork.src,
};

// ============================================
// TICKER ROWS — reference BL, zero duplicate URLs
// ============================================
SITE.tickerRow1 = [
  BL.make, BL.zapier, BL.slack, BL.hubspot, BL.salesforce,
  BL.airtable, BL.n8n, BL.monday, BL.whatsapp, BL.stripe,
  BL.openai, BL.shopify, BL.powerAutomate,
];

SITE.tickerRow2 = [
  BL.telegram, BL.notion, BL.zoom, BL.calendly, BL.twilio,
  BL.meta, BL.discord, BL.powerBi, BL.quickbooks, BL.aws,
  BL.jira, BL.mailchimp, BL.googleSheets, BL.powerApps,
];

// ============================================
// IMAGES — all logo references point to BL
// ============================================
SITE.images = {

  HERO: {
    carousel: [
      {
        src: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/3.png?tr=w-600,h-380,q-100',
        alt: 'Make Platinum Partner Award'
      },
      {
        src: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/4.png?tr=w-600,h-380,q-100',
        alt: 'GrowwStacks Team Celebration'
      }
    ]
  },

  // Partner logos — sourced from BL, no duplication
  PARTNERS: {
    make:      BL.make,
    monday:    BL.monday,
    zapier:    BL.zapier,
    n8n:       BL.n8n,
    microsoft: BL.microsoft,
    airtable:  BL.airtable,
    vapi:      BL.vapi,
    retellAi:  BL.retellAi,
  },

  TICKER_ROW_1: SITE.tickerRow1,
  TICKER_ROW_2: SITE.tickerRow2,

  CASES: [
    {
      title:    'AI Lead Qualification Agent for SaaS Platform',
      img:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/AI%20Lead%20Qualification%20Agent%20for%20SaaS%20Platform.jpeg?updatedAt=1771319768887',
      alt:      'AI Lead Qualification Agent for SaaS Platform',
      category: 'SaaS'
    },
    {
      title:    'Voice AI for Patient Appointment Booking',
      img:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/Voice%20AI%20for%20Patient%20Appointment%20Booking.png?updatedAt=1771320381007',
      alt:      'Voice AI for Patient Appointment Booking',
      category: 'Healthcare'
    },
    {
      title:    'AI Chatbot + Social Media Automation for Real Estate',
      img:      'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/AI%20Chatbot%20+%20Social%20Media%20Automation%20for%20Real%20Estate.png?updatedAt=1771325461368',
      alt:      'AI Chatbot + Social Media Automation for Real Estate',
      category: 'Real Estate'
    }
  ],

  TESTIMONIALS: {
    andrey: {
      img: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/Andrey-Avatov-GrowwStacks-Client.png?updatedAt=1771326788524',
      alt: 'Andrey Avetov'
    },
    noor: {
      img: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/Noor-Israel-GrowwStacks-Client.png?updatedAt=1771326788512',
      alt: 'Noor Webbed'
    },
    ankit: {
      img: 'https://ik.imagekit.io/r2zdlyze2o/GS%20Website/Home%20Page/Ankit-GrowwStacks-Client.png?updatedAt=1771326788415',
      alt: 'Ankit'
    }
  },

  VIDEOS: {
    hero:   'https://i.ytimg.com/vi/x3RdjxHS2pI/hqdefault.jpg',
    andrey: 'https://i.ytimg.com/vi/VxRCbwp8HEY/hqdefault.jpg',
    noor:   'https://i.ytimg.com/vi/OkRWr5TL-QY/hqdefault.jpg',
    ankit:  'https://i.ytimg.com/vi/-GhflHmCmFM/hqdefault.jpg'
  },

  REVIEW_BADGES: {
    google: BL.google.src,
    upwork: BL.upwork.src,
  },

  BRANDING: {
    favicon: BL.growwstacks.src,
    logo:    BL.growwstacks.src,
  },
};

// ============================================
// CASE STUDIES — toolIcons sourced from BL
// ============================================
SITE.caseStudies = {

  smartLeadQualification: {
    videoId:        'MShhrHfUDaQ',
    videoThumbnail: 'https://i.ytimg.com/vi/MShhrHfUDaQ/maxresdefault.jpg',
    screenshot1: 'https://ik.imagekit.io/r2zdlyze2o/Ai%20Store%20Screenshots/Ai%20store%20Screenshots/2.%20Smart%20Lead%20Qualification%20System%20(AI)/Untitled%20design%20(40).png?updatedAt=1771396727476&tr=w-800,q-80',
    screenshot2: 'https://ik.imagekit.io/r2zdlyze2o/Ai%20Store%20Screenshots/Ai%20store%20Screenshots/2.%20Smart%20Lead%20Qualification%20System%20(AI)/MAke%20workflow%20.png?updatedAt=1771396727092&tr=w-800,q-80',
    screenshot3: 'https://ik.imagekit.io/r2zdlyze2o/Ai%20Store%20Screenshots/Ai%20store%20Screenshots/2.%20Smart%20Lead%20Qualification%20System%20(AI)/ManyChat%20conversation%20flow.png?updatedAt=1771396727138&tr=w-800,q-80',
    screenshot4: 'https://ik.imagekit.io/r2zdlyze2o/Ai%20Store%20Screenshots/Ai%20store%20Screenshots/2.%20Smart%20Lead%20Qualification%20System%20(AI)/Untitled%20design%20(41).png?updatedAt=1771396728168&tr=w-800,q-80',
    toolIcons: {
      manychat:  BL.manychat,
      gmail:     BL.gmail,
      instagram: BL.instagram,
      messenger: BL.messenger,
      make:      BL.make,
      openai:    BL.openai,
      slack:     BL.slack,
    }
  },

  aiFinanceLoanAutomation: {
    videoId:        'YouAMvn21V4',
    videoThumbnail: 'https://i.ytimg.com/vi/YouAMvn21V4/hqdefault.jpg',
    screenshot1: 'https://ik.imagekit.io/r2zdlyze2o/Ai%20Store%20Screenshots/Ai%20store%20Screenshots/3.%20AI-Powered%20Finance%20&%20Loan%20Application%20Automation%20System/AI%20Voice%20Assistant%20%20Dashboard.png?tr=w-800,h-450,q-80&updatedAt=1771396829418',
    screenshot2: 'https://ik.imagekit.io/r2zdlyze2o/Ai%20Store%20Screenshots/Ai%20store%20Screenshots/3.%20AI-Powered%20Finance%20&%20Loan%20Application%20Automation%20System/N8N%20Workflow%20Automation%20Setup.png?tr=w-800,h-450,q-80&updatedAt=1771396829310',
    screenshot3: 'https://ik.imagekit.io/r2zdlyze2o/Ai%20Store%20Screenshots/Ai%20store%20Screenshots/3.%20AI-Powered%20Finance%20&%20Loan%20Application%20Automation%20System/VAPI%20Calling%20System%20Configuration.png?tr=w-800,h-450,q-80&updatedAt=1771396830013',
    screenshot4: 'https://ik.imagekit.io/r2zdlyze2o/Ai%20Store%20Screenshots/Ai%20store%20Screenshots/3.%20AI-Powered%20Finance%20&%20Loan%20Application%20Automation%20System/Airtable%20Loan%20Database%20Management.png?tr=w-800,h-450,q-80&updatedAt=1771396830304',
    screenshot5: 'https://ik.imagekit.io/r2zdlyze2o/Ai%20Store%20Screenshots/Ai%20store%20Screenshots/3.%20AI-Powered%20Finance%20&%20Loan%20Application%20Automation%20System/Real-time%20Data%20Collection%20Interface.png?tr=w-800,h-450,q-80&updatedAt=1771396830634',
    screenshot6: 'https://ik.imagekit.io/r2zdlyze2o/Ai%20Store%20Screenshots/Ai%20store%20Screenshots/3.%20AI-Powered%20Finance%20&%20Loan%20Application%20Automation%20System/Loan%20Application%20Analytics%20Dashboard.png?tr=w-800,h-450,q-80&updatedAt=1771396829460',
    toolIcons: {
      vapi:   BL.vapi,
      twilio: BL.twilio,
    }
  },
};

// ============================================
// Global aliases
// ============================================
window.SITE         = SITE;
window.BL           = BL;
window.IMAGES       = SITE.images;
window.CASE_STUDIES = SITE.caseStudies;

const IMAGES       = SITE.images;
const CASE_STUDIES = SITE.caseStudies;