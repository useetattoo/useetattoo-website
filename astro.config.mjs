import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://useetattoo.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
