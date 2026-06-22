// @ts-check
import { defineConfig } from 'astro/config';
// Phase 3 rollback: uncomment next line + `adapter` below + set `output: 'server'` to restore SSR.
// import node from '@astrojs/node';

export default defineConfig({
  output: 'static',
  // Phase 3 rollback: adapter: node({ mode: 'standalone' }),
});
