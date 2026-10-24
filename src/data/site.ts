// Business facts supplied by the client. Anything marked [NEED] or DEMO is still to be confirmed.
export const business = {
  name: 'Ocean Prime',
  legalName: 'Ocean Prime Seafoods Pvt. Ltd.', // DEMO: [NEED registered company name]
  tagline: 'Freshness Delivered Worldwide',
  email: 'oceanprimepvt@gmail.com',
  phones: ['+91 99598 94159', '+91 62817 95092', '+91 83412 19770'],
  // [NEED: confirm which number is on WhatsApp] Using the first number until the client confirms.
  whatsapp: '919959894159',
  city: 'Visakhapatnam',
  region: 'Andhra Pradesh',
  country: 'India',
  // DEMO: dummy street address until the client sends the real one.
  street: 'Plot 14, Fishing Harbour Road',
  postalCode: '530001',
} as const;

// DEMO CONTENT (user request 2026-10-24: "create with dummy data").
// Every value below is a stand-in, NOT confirmed by the client. Replace each one with the client's
// real details before the site goes live (see CLIENT.md). Registration numbers are deliberately
// left out: a made-up GSTIN/IEC could belong to a real company.
export const demo = {
  registrations: [
    { name: 'MPEDA', detail: 'Registered seafood exporter' },
    { name: 'EIC', detail: 'Approved processing plant' },
    { name: 'HACCP', detail: 'Food safety system' },
    { name: 'FSSAI', detail: 'Licensed food business' },
  ],
  markets: ['United States', 'China', 'Japan', 'Vietnam', 'European Union', 'Middle East'],
  terms: [
    { term: 'Minimum order', value: 'One 20 ft or 40 ft reefer container. Mixed loads on request.' },
    { term: 'Payment', value: 'LC at sight, TT or CAD.' },
    { term: 'Incoterms', value: 'FOB Visakhapatnam, CFR or CIF to your port.' },
    { term: 'Lead time', value: '2 to 4 weeks from order confirmation, by species and season.' },
  ],
  testimonials: [
    { quote: 'Consistent grading and clean packing on every container. Our vannamei orders arrive exactly to spec.', who: 'Seafood importer', where: 'California, USA' },
    { quote: 'Quick replies on WhatsApp and clear documents. The squid and cuttlefish quality has been steady all season.', who: 'Frozen food distributor', where: 'Osaka, Japan' },
    { quote: 'Ribbonfish and pomfret packed the way our market wants. A reliable partner on the Indian east coast.', who: 'Seafood trader', where: 'Dubai, UAE' },
  ],
} as const;

export const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, '')}`;

export const waLink = (text?: string) =>
  `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const nav = [
  { href: '/products', label: 'Products' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

// Footer "Company" column: everything a buyer or a search engine expects to find.
export const companyLinks = [
  { href: '/about', label: 'About us' },
  { href: '/process', label: 'Our process' },
  { href: '/faq', label: 'Buyer FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy policy' },
] as const;
