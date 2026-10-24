# Ocean Prime: masterpiece plan (2026-10-25)

User ask: "make this website your masterpiece in this sector". Decisions are made here (user rule: don't ask); build one step per chat, commit after each.

## Where we stand
Benchmark: Indian exporter sites (Avanti, Falcon, Devi, Sandhya) are static brochure sites with a product grid and a certificate wall.
Ours is already above that: cinematic hero, editorial sections, enquiry list, dark mode, motion pass.
What is still missing is a reason for a buyer to bookmark it. A masterpiece here = the most useful exporter site a buyer has seen, not the flashiest.

## Steps (each = one chat, Opus High)
1. **Spec builder (signature feature).** `/quote` flow, also embedded on the home page (replaces section 03's static grid as its interactive version):
   species → form (HOSO/HLSO/PD/PDTO…) → size grade → freezing (IQF/semi-IQF/block) → glaze % → pack (inner + master carton) → quantity → port.
   Live "spec card" preview builds as you choose. Output: WhatsApp / email message + "Copy spec" + print-ready spec sheet (print CSS).
   Options come from `products.ts` per species (only forms that species really ships). No prices.
2. **Size-grade charts on shrimp/prawn product pages.** Standard industry count grades (U/10 … 91/110 pieces per lb, and per kg for HOSO). These are industry conventions, not company claims. Interactive: tap a grade → "Add to enquiry with this grade".
3. **"Where we ship" route map.** Animated SVG map: Vizag port → markets in `demo.markets`, routes draw on scroll. No transit days or volumes (would be invented). Keep it DEMO-labelled like the markets list.
4. **Catch-to-container scroll story.** Home section 06 → pinned scroll sequence (CSS scroll-driven animations, no GSAP): 4 steps with a temperature line falling to -18 °C, photo cross-fades. Reduced motion = current static cards.
5. **Seasonal availability calendar.** 12-month strip per category. Only the real fact is hard-coded: the east coast fishing ban (15 Apr to 14 Jun). Everything else stays `[NEED: client season data]`, shown as "Ask for this season" until the client confirms.
6. **Product page upgrade.** Image zoom/gallery, a "spec at a glance" table, "Download spec sheet" (print CSS, no PDF lib), related species rail, sticky "Add to enquiry" bar on mobile.
7. **Polish + proof pass.** Lighthouse (performance/accessibility/SEO 100 target), CWV, `web-design-guidelines` review, full `audit.mjs`, screenshots 390/1440 light/dark, keyboard walk-through of every new tool. Then the `security-audit` skill (quick profile) before any deploy.

## Rules that stay
Real content only (DEMO data stays in `site.ts` `demo`, never in JSON-LD); no prices, transit times, volumes or stats unless the client gives them; no em/en dashes; CTA labels fixed; everything gated by prefers-reduced-motion; no new paid images/video unless a step truly needs it (ask first per the budget rules).
