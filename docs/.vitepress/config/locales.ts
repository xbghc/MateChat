import { enThemeConfig, zhThemeConfig } from './theme';

export const localesConfig = {
  'zh-CN': {
    label: '简体中文',
    lang: 'zh-CN',
    link: '/zh-CN/',
    themeConfig: zhThemeConfig,
  },
  'en-US': {
    label: 'English',
    lang: 'en-US',
    link: '/en-US/',
    themeConfig: enThemeConfig,
  },
};
