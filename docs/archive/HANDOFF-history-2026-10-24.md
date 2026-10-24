# Ocean Prime: handoff history (moved 2026-10-25)

- Photos: 28 ChatGPT images ("DREAM TEAM SERVICES"; prompts `docs/image-prompts.md`), originals in gitignored `assets-raw/`, imported with `python ../_scripts/import_photos.py .` (hero 1920x1080, others 1536x1024). All QC'd on contact sheets.
- Hero video: `public/video/hero.mp4` (Flow, "dtc kai", Veo 3.1 Fast, start frame = `assets-raw/hero.png`, 20 credits, 1 take). Cropped to remove the Veo mark, muted, 16 s forward+reverse loop, 1280x720 CRF 30, 3.0 MB. Plays only at >= 1024 px, no reduced motion, no save-data; mobile keeps the photo.
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
