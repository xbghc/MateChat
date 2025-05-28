import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: ['vue'],
      dirs: ['./src'],
    }),
  ],
  resolve: {
    alias: {
      '@view': path.resolve(__dirname, './src/view'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
