# Ocean Prime: handoff

Last updated: 2026-10-25

## State

- 2026-10-25 motion pass: native smooth scroll, cross-page View Transitions (header holds still), back-to-top button with gold scroll-progress ring (`BackToTop.astro`, steps above the enquiry button), header firms up on scroll (`data-scrolled`), mobile menu fades in and out, FAQ answers slide open. All gated by prefers-reduced-motion. "Home" added to the desktop nav and the footer. Gotcha: never use `scrollIntoView` for the products chip strip; it cancelled page scrolls (now scrolls the strip only).
- **Site code complete and committed** (local git, first commit eb69cd0; never pushed). Astro **7.4.1** static site + Tailwind v4. Build: 0 errors, 31 pages (home, products, 23 product pages, process, about, faq, privacy, contact, 404). npm audit: 0 vulnerabilities.
- Design tokens in `src/styles/global.css` (navy #0b1a2e, single gold accent #d6a63a, pills / 16px cards / 10px fields; Bricolage display, Geist body, Cinzel wordmark only). Light/dark via `data-theme` + localStorage `theme`.
- Data: `src/data/site.ts` (business facts, `tel`, `waLink`, `nav`), `src/data/products.ts` (23 products, 6 categories, glossary). No invented certifications, markets or stats. Client facts + [NEED] list: `CLIENT.md`.
- Contact form (`src/pages/contact.astro`): no backend; validates, then opens wa.me or mailto with the message. `?product=<slug>` preselects.
- Security: static only; `public/_headers` (nosniff, frame DENY, referrer, permissions, HSTS, immutable `/_astro/*`). All `_blank` links have `rel="noopener"`.
- Logo: `src/components/Logo.astro` = transparent emblem `src/assets/brand/emblem.png` (from `python ../_scripts/logo_cutout.py .`) + live Cinzel wordmark. Measured dead-centre in the header pill at 320 to 1440. Icons/OG still use the navy tile (`logo_tiles.py`).
- Photos: 28 ChatGPT images ("DREAM TEAM SERVICES"; prompts `docs/image-prompts.md`), originals in gitignored `assets-raw/`, imported with `python ../_scripts/import_photos.py .` (hero 1920x1080, others 1536x1024). All QC'd on contact sheets.
- Hero video: `public/video/hero.mp4` (Flow, "dtc kai", Veo 3.1 Fast, start frame = `assets-raw/hero.png`, 20 credits, 1 take). Cropped to remove the Veo mark, muted, 16 s forward+reverse loop, 1280x720 CRF 30, 3.0 MB. Plays only at >= 1024 px, no reduced motion, no save-data; mobile keeps the photo.
- DEMO data (user: "create with dummy data"): `demo` block in `src/data/site.ts` feeds the home registrations/markets/buyer-quotes sections and the contact trade-terms card; list in `CLIENT.md`. Never put it in JSON-LD.
- Enquiry list (`src/components/Enquiry.astro`, in BaseLayout): B2B answer to the reference site's cart (fish-king.netlify.app). "Add to enquiry" on product cards and product pages (`data-enq-add`), floating counter, `<dialog>` sheet (bottom on phones, right drawer md+), qty per item, sends via wa.me or mailto. localStorage `op-enquiry`, try/catch. Tested in Playwright (add, toggle, validation, message text, Esc) at 390/1440 light/dark.
- **Premium design pass (2026-10-24, user: "very very normal, not a masterpiece")**:
  - Floating glass pill header. Height contract: outer padding + pill = 4rem on mobile, 4.5rem from md. The products sticky bar `top-16 md:top-[4.5rem]` and `scroll-padding-top: 5rem` depend on it.
  - Full-screen "deep water" mobile menu: numbered links with photo thumbs, a gold current page, a live Vizag IST clock, the export desk contact panel and 2 CTAs.
  - New `global.css` components:
    - `.deep-water`: navy with drifting light pools and grain. It never sets `position`, so add `relative` yourself. Background images inside it use `-z-20`.
    - `.glass-tile`, `.eyebrow` ("01 —— Label") and `.h-section`.
  - The home page is rebuilt as numbered editorial sections 01–08. The spec, cold chain and markets bands, and the footer, are deep-water.
  - The footer has a giant Cinzel gold wordmark.
  - Product cards are `@container`: the short "Details" label shows on narrow cards.
- **Pages + audit round (2026-10-24, user: "keep all required pages, logo without background, misaligned, check like a real user")**: added `/about`, `/faq` (native `<details>`, DEMO terms, no FAQ JSON-LD), `/privacy` (honest: no server storage, localStorage `theme` + `op-enquiry`). Nav = Products, Process, About, Contact; footer has a Company column (`companyLinks`). Fixed: logo rode 3.5px high (inline lockup on a text baseline; the link is now `flex items-center`); header overflowed 33px at 768 (CTA now `lg:` only); canonical URLs ended in `.html`; tap targets under 24px; meta descriptions over 160 chars (product pages pick the longest version that fits). Audit script: scratchpad `audit.mjs <base>` (sitemap crawl, links, anchors, canonicals, dashes, overflow, images, tap targets, logo geometry at 5 widths x 2 themes).
- User rule 2026-10-24: do NOT ask anything; images = ChatGPT in "DREAM TEAM SERVICES", video = Flow in "dtc kai" (x1, budget <= 100 credits). Deliver the final website.

## Next steps
0. **Masterpiece plan in progress:** `docs/MASTERPIECE-PLAN.md`, 7 steps, one per chat. Next = the first unchecked step there.
1. Client review of the site. Before going live: domain → `SITE_URL`, then the client's [NEED] items in `CLIENT.md` (real product list, certifications, address, WhatsApp number).
2. When real photos arrive, drop them into `assets-raw/<same name>.jpg` and re-run the import script.
3. Deploy only when the user asks (static host; `public/_headers` is Netlify/Cloudflare Pages format).

## Gotchas
- Astro pinned to 7.4.1: 7.4.2 needs Node >= 22.23.4 (this PC has 22.23.1).
- While the dev server runs, edit src files with the Edit tool, not `sed -i` (its temp files cause ENOENT errors and a stale Vite overlay).
- `@tailwindcss/vite` is typed against a newer Vite; `astro.config.mjs` casts it to `any` so `astro check` passes.
- `HeroMedia.astro` finds the video via `process.cwd()`; `import.meta.url` points into the build bundle and silently hid the video.
- Run `python` without `-I` for PIL (user site-packages). Don't `rm` relative globs after `cd` (blocked); copy into a fresh folder instead.
- Port 4392 may be taken by an old server; check which port `astro preview` printed before screenshotting. `shots.mjs` forces reduced motion, so the hero video never shows in it; `vidcheck.mjs` (scratchpad) checks the video.
- Bash sandbox sometimes denies `head`, `tail` and `ls`; use Read/Grep.
- `build.format: 'file'` makes `Astro.url.pathname` "/index.html" or "/products.html". `Header.astro` and the canonical in `BaseLayout.astro` strip `/index` and `.html` before the active-link check (the nav highlight was silently dead before 2026-10-24).
- In Git Bash, prefix node scripts that get "/" page args with `MSYS_NO_PATHCONV=1`. Without it, "/" becomes a Windows path and the shots land in a stray folder.
- Screenshots: scratchpad `shots.mjs <base> <out> [pages] [widths] [themes]` with `PW_PATH="$(npm root -g)/playwright"` (off-screen, reduced motion, reports overflow and console errors).
- Test scripts (scratchpad, may be gone): `enq.mjs` drives the enquiry flow; with `noopener` the popup URL reads blank, so stub `window.open` to read the WhatsApp text.
