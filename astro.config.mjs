// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// [NEED: final domain] Set SITE_URL in Vercel once the client confirms the domain.
const site = process.env.SITE_URL || 'https://www.oceanprime.example.com';

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  image: { responsiveStyles: false },
  // Cast: @tailwindcss/vite is typed against a newer Vite than the one Astro bundles.
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
});
