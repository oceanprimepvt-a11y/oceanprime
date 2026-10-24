# Ocean Prime: handoff

Last updated: 2026-10-25 (masterpiece step 4 done)

## State

- 2026-10-25 masterpiece step 4 DONE: catch-to-container scroll story (`ColdChainStory.astro`, home section 06). Pinned stage, pure CSS scroll-driven animations: photos cross-fade, temperature line falls 0 °C to -18 °C. Static cards under reduced motion / Firefox. Decisions in `docs/MASTERPIECE-PLAN.md`. Build 0 errors, 32 pages; probe pass at 390/375/1440 light/dark, motion on/off.
- 2026-10-25 masterpiece step 3 DONE: "Where we ship" route map (`RouteMap.astro`) in home section 05, below a now full-width credentials card. Dotted world map (baked SVG, no runtime library), routes from Vizag to `demo.markets` draw on scroll. Decisions in `docs/MASTERPIECE-PLAN.md`. Build 0 errors, 32 pages; 41-check probe pass at 390/1440 light/dark, motion on/off.
- 2026-10-25 masterpiece step 2 DONE: size-grade charts (`GradeChart.astro`, helpers `gradeSetsFor`/`gradeInfo` in `spec.ts`) on the vannamei and black tiger pages. Pick a grade, add it to the enquiry list or carry it into `/quote`. Decisions in `docs/MASTERPIECE-PLAN.md`. Build 0 errors, 32 pages; 26-check E2E pass; 390/1440 light/dark checked.
- 2026-10-25 masterpiece step 1 DONE: spec builder. Rules in `src/data/spec.ts` (pure, no imports; tested with a node script). UI in `src/components/SpecBuilder.astro` (`mode="page"` on new `/quote`, `mode="embed"` replaces home section 03). Every "Request a quote" button now goes to `/quote` (product pages `/quote?species=<slug>`); footer "Spec builder" link. Draft in localStorage `op-spec`; page mode mirrors the order fields in the URL (never name or notes). "Add to enquiry list" fires `op:enquiry-upsert` (listener in `Enquiry.astro`). Print = `#spec-print` + `html[data-print='spec']`. Build 0 errors, 32 pages; 33-check Playwright E2E all pass; screenshots 390/1440 light/dark checked.
- 2026-10-25 motion pass: native smooth scroll, cross-page View Transitions (header holds still), back-to-top button with gold scroll-progress ring (`BackToTop.astro`, steps above the enquiry button), header firms up on scroll (`data-scrolled`), mobile menu fades in and out, FAQ answers slide open. All gated by prefers-reduced-motion. "Home" added to the desktop nav and the footer. Gotcha: never use `scrollIntoView` for the products chip strip; it cancelled page scrolls (now scrolls the strip only).
- **Site code complete and committed** (local git, first commit eb69cd0; never pushed). Astro **7.4.1** static site + Tailwind v4. Build: 0 errors, 32 pages (home, quote, products, 23 product pages, process, about, faq, privacy, contact, 404). npm audit: 0 vulnerabilities.
- Design tokens in `src/styles/global.css` (navy #0b1a2e, single gold accent #d6a63a, pills / 16px cards / 10px fields; Bricolage display, Geist body, Cinzel wordmark only). Light/dark via `data-theme` + localStorage `theme`.
- Data: `src/data/site.ts` (business facts, `tel`, `waLink`, `nav`), `src/data/products.ts` (23 products, 6 categories, glossary). No invented certifications, markets or stats. Client facts + [NEED] list: `CLIENT.md`.
- Contact form (`src/pages/contact.astro`): no backend; validates, then opens wa.me or mailto with the message. `?product=<slug>` preselects.
- Security: static only; `public/_headers` (nosniff, frame DENY, referrer, permissions, HSTS, immutable `/_astro/*`). All `_blank` links have `rel="noopener"`.
- Logo: `src/components/Logo.astro` = transparent emblem `src/assets/brand/emblem.png` (from `python ../_scripts/logo_cutout.py .`) + live Cinzel wordmark. Measured dead-centre in the header pill at 320 to 1440. Icons/OG still use the navy tile (`logo_tiles.py`).
- DEMO data (user: "create with dummy data"): `demo` block in `src/data/site.ts` feeds the home registrations/markets/buyer-quotes sections and the contact trade-terms card; list in `CLIENT.md`. Never put it in JSON-LD.
- Enquiry list (`src/components/Enquiry.astro`, in BaseLayout): B2B answer to the reference site's cart (fish-king.netlify.app). "Add to enquiry" on product cards and product pages (`data-enq-add`), floating counter, `<dialog>` sheet (bottom on phones, right drawer md+), qty per item, sends via wa.me or mailto. localStorage `op-enquiry`, try/catch. Tested in Playwright (add, toggle, validation, message text, Esc) at 390/1440 light/dark.
- User rule 2026-10-24: do NOT ask anything; images = ChatGPT in "DREAM TEAM SERVICES", video = Flow in "dtc kai" (x1, budget <= 100 credits). Deliver the final website.
- Older detail (premium design pass, pages + audit round, photo and hero video pipeline): `docs/archive/HANDOFF-history-2026-10-24.md`.

## Next steps
0. **Masterpiece plan in progress:** `docs/MASTERPIECE-PLAN.md`, 7 steps, one per chat. Next = the first unchecked step there.
1. Client review of the site. Before going live: domain → `SITE_URL`, then the client's [NEED] items in `CLIENT.md` (real product list, certifications, address, WhatsApp number).
2. When real photos arrive, drop them into `assets-raw/<same name>.jpg` and re-run the import script.
3. Deploy only when the user asks (static host; `public/_headers` is Netlify/Cloudflare Pages format).

## Gotchas
- Sticky/pinned sections inside `.deep-water`: override with `overflow: clip` (its `overflow: hidden` breaks `position: sticky`).
- Port 4392 may be a running `astro dev` (URLs `/_image?href=/@fs...`, slow first image loads), not preview; preview was on 4393 on 2026-10-25.
- Astro pinned to 7.4.1: 7.4.2 needs Node >= 22.23.4 (this PC has 22.23.1).
- While the dev server runs, edit src files with the Edit tool, not `sed -i` (its temp files cause ENOENT errors and a stale Vite overlay).
- `@tailwindcss/vite` is typed against a newer Vite; `astro.config.mjs` casts it to `any` so `astro check` passes.
- `HeroMedia.astro` finds the video via `process.cwd()`; `import.meta.url` points into the build bundle and silently hid the video.
- Run `python` without `-I` for PIL (user site-packages). Don't `rm` relative globs after `cd` (blocked); copy into a fresh folder instead.
- Port 4392/4393 may be taken by an old `astro preview` (it refuses to start a second one and prints the running URL; that one serves the fresh `dist` after a rebuild); check which port `astro preview` printed before screenshotting. `shots.mjs` forces reduced motion, so the hero video never shows in it; `vidcheck.mjs` (scratchpad) checks the video.
- Bash sandbox sometimes denies `head`, `tail` and `ls`; use Read/Grep.
- `build.format: 'file'` makes `Astro.url.pathname` "/index.html" or "/products.html". `Header.astro` and the canonical in `BaseLayout.astro` strip `/index` and `.html` before the active-link check (the nav highlight was silently dead before 2026-10-24).
- In Git Bash, prefix node scripts that get "/" page args with `MSYS_NO_PATHCONV=1`. Without it, "/" becomes a Windows path and the shots land in a stray folder.
- Screenshots: scratchpad `shots.mjs <base> <out> [pages] [widths] [themes]` with `PW_PATH="$(npm root -g)/playwright"` (off-screen, reduced motion, reports overflow and console errors).
- Test scripts (scratchpad, may be gone): `enq.mjs` drives the enquiry flow; with `noopener` the popup URL reads blank, so stub `window.open` to read the WhatsApp text.

## Live preview (2026-10-25)
- Live: https://oceanprime.surge.sh (Surge, logged in as govardhan5009@gmail.com). GitHub: oceanprimepvt-a11y/oceanprime (main).
- Redeploy: `SITE_URL=https://oceanprime.surge.sh npm run build && surge dist oceanprime.surge.sh` (Git Bash). Surge ignores `public/_headers`.
- Not GitHub Pages: a project page lives under /oceanprime/ and every root link would break. Once the client's domain is set, move to Vercel/Cloudflare with SITE_URL.
- Still to do: re-run mobile.mjs + kbd.mjs after commit 0db189e (9 review fixes), then mark step 7 [x] in MASTERPIECE-PLAN.md.
