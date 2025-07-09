export default {
  '/zh-CN/components/': [
    {
      text: '通用',
      items: [
        {
          text: 'Introduction 介绍',
          link: '/zh-CN/components/introduction/demo',
        },
        { text: 'List 列表', link: '/zh-CN/components/list/demo' },
      ],
    },
    {
      text: '布局',
      items: [
        { text: 'Header 头部', link: '/zh-CN/components/header/demo' },
        { text: 'Layout 布局', link: '/zh-CN/components/layout/demo' },
      ],
    },
    {
      text: '会话',
      items: [{ text: 'Bubble 气泡', link: '/zh-CN/components/bubble/demo' }],
    },
    {
      text: '输入',
      items: [
        { text: 'Input 输入', link: '/zh-CN/components/input/demo' },
        { text: 'Prompt 提示', link: '/zh-CN/components/prompt/demo' },
        { text: 'Mention 快捷操作', link: '/zh-CN/components/mention/demo' },
      ],
    },
    {
      text: '演进中',
      items: [
        { text: 'MarkDown 卡片', link: '/zh-CN/components/markDownCard/demo' },
        {
          text: 'ThoughtChain 思考链',
          link: '/zh-CN/components/thoughtChain/demo',
        },
      ],
    },
  ],
  '/zh-CN/design/': [
    { text: '介绍', link: '/zh-CN/design/intro' },
    {
      text: '基础',
      items: [
        { text: '色彩', link: '/zh-CN/design/color' },
        { text: '字体', link: '/zh-CN/design/font' },
      ],
    },
  ],
  '/zh-CN/use-guide/': [
    // { text: '更新日志', link: '/zh-CN/use-guide/changelog' },
    { text: '快速开始', link: '/zh-CN/use-guide/introduction' },
    { text: '按需引入', link: '/zh-CN/use-guide/require' },
    { text: '国际化', link: '/zh-CN/use-guide/i18n' },
    { text: '自定义主题', link: '/zh-CN/use-guide/theme' },
    {
      text: '模型对接',
      items: [
        { text: 'OpenAI', link: '/zh-CN/use-guide/model/openai' },
        { text: 'DeepSeek', link: '/zh-CN/use-guide/model/deepseek' },
        { text: '其他', link: '/zh-CN/use-guide/model/other' },
      ],
    },
    {
      text: '其他',
      items: [
        { text: '使用MateChat的多种方式', link: '/zh-CN/use-guide/access' },
        { text: '贡献指南', link: '/zh-CN/use-guide/contributing' },
        { text: 'FAQ', link: '/zh-CN/use-guide/faq' },
      ],
    },
  ],
  '/zh-CN/playground/': [
    { text: '演示', link: '/zh-CN/playground/playground' },
  ],
};
