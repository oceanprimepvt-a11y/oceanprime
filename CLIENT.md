# Ocean Prime (client)

- **Business:** Ocean Prime, seafood exporter, Visakhapatnam (Vizag), Andhra Pradesh, India.
- **Email:** oceanprimepvt@gmail.com
- **Phones:** 9959894159, 6281795092, 8341219770
- **Reference the client sent:** https://fish-king.netlify.app/
- **Scope:** marketing site only (no admin). Design, content, SEO. Mobile first, laptop second.

## Decisions (2026-10-24)
- Static Astro site; quote requests go out through WhatsApp (wa.me) or the email app (mailto). No backend, no stored data.
- Logo: the client's original emblem, untouched, on its own navy tile, with the wordmark set in Cinzel. Never key out or recolour the emblem.
- The product list is a guide to what Andhra/Vizag exporters commonly ship (23 species). Swap it for the client's real list when it arrives (`src/data/products.ts`).
- Photos are AI-generated illustrations (ChatGPT), not photos of the client's plant, boats or product.

## DEMO data on the site now (user asked for dummy data, 2026-10-24)
All of it sits in `src/data/site.ts` (the `demo` block plus `legalName`, `street`, `postalCode`). Replace each item with the client's real details before going live:
- Company name "Ocean Prime Seafoods Pvt. Ltd." (footer copyright, contact page).
- Address "Plot 14, Fishing Harbour Road, Visakhapatnam 530001" (footer, contact page, Maps link).
- Registrations: MPEDA, EIC, HACCP, FSSAI (home page). No numbers shown.
- Markets: USA, China, Japan, Vietnam, EU, Middle East (home page).
- Trade terms: MOQ, payment, Incoterms, lead time (contact page).
- 3 buyer quotes with no names or companies (home page "What buyers say"). **Remove them if the client has no real ones.**
- Kept out of schema.org JSON-LD on purpose, so search engines never index dummy facts.

## [NEED] from the client
1. **Domain name**, to set `SITE_URL` (canonical, sitemap and OG tags use it).
2. **Which number is on WhatsApp.** The site assumes 9959894159 (`src/data/site.ts` → `whatsapp`).
3. **Full address** (plant / office), for the footer, the contact page and the Google Maps link.
4. **Registered company name** (`legalName`, DEMO value now).
5. **Registrations and certifications:** IEC, GSTIN, MPEDA registration, EIC plant approval, HACCP / BRCGS / BAP / FSSAI, etc. Nothing is claimed on the site until the client confirms.
6. **Export markets** they actually ship to (the site says only "Asia, the Middle East, Europe and the Americas" in general terms about the port).
7. **Real product list** with forms, grades, freezing and packing for each.
8. **Real photos** of the plant, products, packing and cartons (these would replace the AI images).
9. **MOQ, payment terms (LC/TT/CAD), Incoterms** offered.
10. **Original vector logo file** (SVG/AI/PDF). The current logo is from a 1024 px JPEG.
11. Any **real buyer testimonials or certifications** they want shown (none are shown now; we never invent them).
