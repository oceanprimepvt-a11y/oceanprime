# Ocean Prime: masterpiece plan (2026-10-25)

User ask: "make this website your masterpiece in this sector". Decisions are made here (user rule: don't ask); build one step per chat, commit after each.

## Where we stand
Benchmark: Indian exporter sites (Avanti, Falcon, Devi, Sandhya) are static brochure sites with a product grid and a certificate wall.
Ours is already above that: cinematic hero, editorial sections, enquiry list, dark mode, motion pass.
What is still missing is a reason for a buyer to bookmark it. A masterpiece here = the most useful exporter site a buyer has seen, not the flashiest.

## Steps (each = one chat, Opus High)
1. [x] **Spec builder (signature feature).** DONE 2026-10-25, decisions below. `/quote` flow, also embedded on the home page (replaces section 03's static grid as its interactive version):
   species → form (HOSO/HLSO/PD/PDTO…) → size grade → freezing (IQF/semi-IQF/block) → glaze % → pack (inner + master carton) → quantity → port.
   Live "spec card" preview builds as you choose. Output: WhatsApp / email message + "Copy spec" + print-ready spec sheet (print CSS).
   Options come from `products.ts` per species (only forms that species really ships). No prices.
2. [x] **Size-grade charts on shrimp/prawn product pages.** DONE 2026-10-25, decisions below. Standard industry count grades (U/10 … 91/110 pieces per lb, and per kg for HOSO). These are industry conventions, not company claims. Interactive: tap a grade → "Add to enquiry with this grade".
3. [x] **"Where we ship" route map.** DONE 2026-10-25, decisions below. Animated SVG map: Vizag port → markets in `demo.markets`, routes draw on scroll. No transit days or volumes (would be invented). Keep it DEMO-labelled like the markets list.
4. **Catch-to-container scroll story.** Home section 06 → pinned scroll sequence (CSS scroll-driven animations, no GSAP): 4 steps with a temperature line falling to -18 °C, photo cross-fades. Reduced motion = current static cards.
5. **Seasonal availability calendar.** 12-month strip per category. Only the real fact is hard-coded: the east coast fishing ban (15 Apr to 14 Jun). Everything else stays `[NEED: client season data]`, shown as "Ask for this season" until the client confirms.
6. **Product page upgrade.** Image zoom/gallery, a "spec at a glance" table, "Download spec sheet" (print CSS, no PDF lib), related species rail, sticky "Add to enquiry" bar on mobile.
7. **Polish + proof pass.** Lighthouse (performance/accessibility/SEO 100 target), CWV, `web-design-guidelines` review, full `audit.mjs`, screenshots 390/1440 light/dark, keyboard walk-through of every new tool. Then the `security-audit` skill (quick profile) before any deploy.

## Rules that stay
Real content only (DEMO data stays in `site.ts` `demo`, never in JSON-LD); no prices, transit times, volumes or stats unless the client gives them; no em/en dashes; CTA labels fixed; everything gated by prefers-reduced-motion; no new paid images/video unless a step truly needs it (ask first per the budget rules).

## Step 1 decisions (spec builder, 2026-10-25)
- Files: rules `src/data/spec.ts` (pure, testable), UI `src/components/SpecBuilder.astro` (`page` on `/quote`, `embed` in home 03, replacing the glossary grid; glossary meanings now sit in the option tiles).
- 9 steps: Species, Form, Size grade, Freezing, Glaze, Packing, Quantity, Port, Send. Glaze only for IQF / semi-IQF (skipped and struck through on the rail otherwise). Any step can be skipped; empty lines read "To be agreed".
- Count-grade chips only where `products.ts` states a range (vannamei HOSO per kg 20/30 to 100/120, HLSO per lb 16/20 to 91/110; black tiger HLSO U/8 to 41/50). Everything else is free text with the species' grading as a hint. Step 2 will reuse `gradesFor` / `LB_GRADES`.
- Packing: block frozen = 2 kg / 1.8 kg / 4 lb blocks; IQF = 250 g to 5 kg bags; master carton counts per inner; label (Ocean Prime / private / plain); free note. Live, chilled and dry goods: free text only.
- Incoterm choice (FOB Visakhapatnam, CFR, CIF, Not sure yet) is the buyer's preference, not a company claim. Ports = typing suggestions only.
- A tap on a single-choice tile auto-advances after 280 ms; keyboard arrows never do. Focus moves to the step question on navigation.
- Outputs: WhatsApp, email (name required), copy spec, print sheet, add to enquiry list, copy share link (page mode). Ref `OP-yymmdd-XXX` (first 3 letters of the slug).
- No prices, no lead times, nothing sent anywhere until the buyer presses send.

## Step 2 decisions (size-grade charts, 2026-10-25)
- Files: helpers `gradeSetsFor` / `gradeInfo` in `src/data/spec.ts` (tested in scratchpad `spec.test.mjs`), UI `src/components/GradeChart.astro`, placed on the product page above "You may also need"; the Grading row links to `#grades`.
- Charts only where spec.ts grades the species (vannamei HLSO per lb + HOSO per kg with a form switch; black tiger HLSO). Scampi and wild sea shrimp have no stated range, so no chart (add a rule in `gradeRules` when the client confirms grades).
- Each row: grade, gold bar scaled to average piece weight, "one piece weighs" range in grams, same grade in the other unit. Pure arithmetic from the count (1 lb = 453.6 g), labelled as industry convention.
- Pick a grade → "Add to enquiry with this grade" fires `op:enquiry-upsert` (line "HLSO 21/25 per lb", replaces an earlier line for that species) and "Build the full spec" links `/quote?species&form&grade`.
- Phones/tablets: once a grade is picked the panel sticks above the call bar (z 35, over the floating buttons). Desktop: panel in the sticky left column. DOM order intro → chart → panel, so Tab goes through the grades before the buttons.
- Tested: 26-check Playwright run (scratchpad `grades.mjs`), 390/1440 light/dark, no overflow, no console errors.

## Step 3 decisions (route map, 2026-10-25)
- Files: `src/components/RouteMap.astro`; dots baked once into `src/assets/map/world-dots.svg` (33 KB, loaded lazily as an image, cached) and pin positions in `src/data/worldMap.ts`. Generator: `scripts/gen-world-map.cjs` (needs npm `dotted-map` 2 installed in a temp folder; not a project dependency). To add a market: add it to `demo.markets` and its lat/lng to the generator, then re-run it; a market without a pin is still listed, just without a route.
- Home section 05: credentials card now full width; "Where we ship" is its own dark panel below it (map + numbered market list + "Request a quote" to `/quote`). Pins sit at region centres, not named ports.
- Routes are drawn arcs bowed north, not real shipping lanes; no transit days, volumes or distances. Markets stay DEMO data from `site.ts`.
- Motion: routes draw in one by one when the map is 35% in view, pins and labels fade in on arrival, a white glint runs along each route, Vizag pulses. Reduced motion or no JS: everything shown fully drawn and still. Hovering a market (list or map) brings its route forward. Map labels hidden under 640 px (the numbered list carries the names).
- Tested: scratchpad `map.mjs` (41 checks: 6 routes, image loaded, fully drawn, no overflow, no console errors, hover) at 390/1440 light/dark, motion on and off.
