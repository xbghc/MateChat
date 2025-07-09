import { defineConfig } from 'vitepress';
import { localesConfig } from './config/locales';
import { sharedConfig } from './config/shared';
import { themeConfig } from './config/theme';

export default defineConfig({
  ...sharedConfig,
  themeConfig,
  locales: localesConfig,
});
