interface NavItem {
  text: string;
  link: string;
}

interface NavConfig {
  text: string;
  'zh-CN': string;
  'en-US': string;
}

const navConfig: NavConfig[] = [
  {
    text: 'nav.guide',
    'zh-CN': '/zh-CN/use-guide/introduction',
    'en-US': '/en-US/use-guide/introduction',
  },
  {
    text: 'nav.component',
    'zh-CN': '/zh-CN/components/introduction/demo',
    'en-US': '/en-US/components/introduction',
  },
  {
    text: 'nav.demo',
    'zh-CN': '/zh-CN/playground/playground',
    'en-US': '/en-US/playground/playground',
  },
];

/**
 * 生成指定语言的导航配置
 * @param locale 语言代码 ('zh-cn' | 'en-us')
 * @returns 导航配置数组
 */
function generateNav(locale: 'zh-CN' | 'en-US'): NavItem[] {
  return navConfig.map((item) => ({
    text: item.text,
    link: item[locale],
  }));
}

export const zhNav: NavItem[] = generateNav('zh-CN');
export const enNav: NavItem[] = generateNav('en-US');

// 导出工具函数，方便将来添加新语言
export { generateNav };
