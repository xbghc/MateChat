import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import { defineConfig } from 'vitepress';
import {
  VitePluginDemoblock,
  demoblockPlugin,
} from 'vitepress-theme-demoblock';

export const sharedConfig = defineConfig({
  title: 'MateChat - 轻松构建你的AI应用',
  description:
    'MateChat - 前端智能化场景解决方案UI库，轻松构建你的AI应用。已服务于华为内部多个应用智能化改造，并助力CodeArts、InsCode AI IDE等智能化助手搭建。是一款企业级开箱即用的产品。全部代码开源并遵循 MIT 协议，任何企业、组织及个人均可免费使用。',

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'chat,AI,vue,GPT,web,MateChat,开源,open source,智能化,components,组件库',
      },
    ],
  ],

  markdown: {
    config: (md) => {
      md.use(demoblockPlugin);
    },
  },

  vite: {
    plugins: [VitePluginDemoblock(), vueI18n({ ssr: true })],
    ssr: {
      noExternal: ['devui-theme', 'vue-devui', 'xss'],
    },
  },

  ignoreDeadLinks: true,
  lang: 'zh',
});
