// Business facts supplied by the client. Anything marked [NEED] is still to be confirmed.
export const business = {
  name: 'Ocean Prime',
  legalName: 'Ocean Prime Sea Food Exports', // [NEED: registered company name, e.g. "Ocean Prime Pvt. Ltd."]
  tagline: 'Freshness Delivered Worldwide',
  email: 'oceanprimepvt@gmail.com',
  phones: ['+91 99598 94159', '+91 62817 95092', '+91 83412 19770'],
  // [NEED: confirm which number is on WhatsApp] Using the first number until the client confirms.
  whatsapp: '919959894159',
  city: 'Visakhapatnam',
  region: 'Andhra Pradesh',
  country: 'India',
  // [NEED: full street address, GSTIN, IEC code, MPEDA registration, plant approval numbers]
} as const;

export const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, '')}`;

export const waLink = (text?: string) =>
  `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const nav = [
  { href: '/products', label: 'Products' },
  { href: '/process', label: 'Process' },
  { href: '/contact', label: 'Contact' },
] as const;
