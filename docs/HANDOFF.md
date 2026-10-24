# Ocean Prime: handoff

Last updated: 2026-10-24

## State
- Astro 5 static site + Tailwind v4, mobile-first B2B seafood-export site (Vizag). Design tokens in `src/styles/global.css` (navy #0b1a2e, single gold accent #d6a63a, pills / 16px cards / 10px fields; Bricolage display, Geist body, Cinzel wordmark only).
- Data: `src/data/site.ts` (business facts, `tel`, `waLink`, `nav`), `src/data/products.ts` (23 products, 6 categories, glossary). Forms/grades are "typical, agreed per order"; no invented certifications, markets or stats.
- Logo: `src/components/Logo.astro` = untouched emblem tile (`_scripts/logo_tiles.py`) + live Cinzel wordmark. Never key the JPEG (it punched holes in the globe).
- Photos: `src/assets/photos/*.jpg` are placeholders until ChatGPT images land in `assets-raw/` (prompts: `docs/image-prompts.md`), then convert with `_scripts/import_photos.py`.
- User rule 2026-10-24: do NOT ask anything; images = ChatGPT in "DREAM TEAM SERVICES", video = Flow in "dtc kai" (x1, budget <= 100 credits). Deliver the final website.

## Next steps
1. Layout + components (BaseLayout SEO/JSON-LD, Header, MobileBar, Footer, Icon, ProductCard) and pages (index, products, products/[slug], process, contact, 404).
2. Import real images, QC each.
3. Hero video from Flow (one ambient clip, muted loop, poster = hero.jpg, desktop only).
4. Build, screenshots 390/1440 light/dark, fix; security-audit; CLIENT.md [NEED] list; git commit.

## Gotchas
- Bash sandbox denies `head`, `tail` and `ls` into node_modules; use node or Glob.
- Off-screen Playwright: global `playwright` via `npm root -g` (scratchpad `shot.mjs`).
