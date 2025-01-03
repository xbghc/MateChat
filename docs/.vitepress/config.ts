import { defineConfig } from 'vitepress';
import { demoblockPlugin, VitePluginDemoblock } from 'vitepress-theme-demoblock';
import sideBarEn from './theme/themeConfig/sideBar-en';
import sideBarZh from './theme/themeConfig/sideBar-zh';

export default defineConfig({
  title: 'MateChat',
  description: 'MateChat',
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin);
    },
  },
  vite: {
    plugins: [VitePluginDemoblock()],
    ssr: {
      noExternal: ['devui-theme', 'vue-devui', 'xss'],
    },
  },
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: 'nav.guide', link: '/use-guide/introduction' },
      { text: 'nav.component', link: '/components/introduction/demo' },
      { text: 'nav.demo', link: '/playground/playground' },
    ],
    sidebar: {
      ...sideBarZh,
      ...sideBarEn,
    },
    outline: { level: 3 },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
  lang: 'zh',
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
    },
  },
});
