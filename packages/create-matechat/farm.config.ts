import { defineConfig } from '@farmfe/core';

export default defineConfig({
  compilation: {
    input: {
      index: './src/index.ts',
    },
    output: {
      path: './dist',
      targetEnv: 'library',
      format: 'cjs',
    },
    sourcemap: false,
    external: ['archons', 'chalk'],
  },
});
