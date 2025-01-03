import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  publicDir: false,
  plugins: [vue(), vueJsx()],
  optimizeDeps: { exclude: ['fsevents'] },
  build: {
    rollupOptions: {
      external: ['vue', '@floating-ui/dom', '@vue/shared', 'lodash', /vue-devui/],
    },
    lib: {
      entry: './components/index.ts',
      name: 'MateChat',
      fileName: 'mate-chat',
      formats: ['es'],
    },
    outDir: './dist',
  },
});
