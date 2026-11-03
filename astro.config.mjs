// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical URLs, the sitemap, RSS and LinkedIn preview images are all built from this.
// Change it if you connect a custom domain.
const SITE = 'https://vimansedissanayake.github.io';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [sitemap({ filter: (page) => !page.includes('/og/') })],
  vite: {
    ssr: { external: ['@resvg/resvg-js'] },
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
