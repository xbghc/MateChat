import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@matechat/core': fileURLToPath(new URL('../components', import.meta.url)),
    },
  },
});
