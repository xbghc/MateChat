import sideBarEn from '../theme/themeConfig/sideBar-en';
import sideBarZh from '../theme/themeConfig/sideBar-zh';
import { enNav, zhNav } from './nav';

export const themeConfig = {
  nav: zhNav,
  sidebar: {
    ...sideBarZh,
    ...sideBarEn,
  },
  outline: { level: 3 },
  socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
};

export const zhThemeConfig = {
  nav: zhNav,
};

export const enThemeConfig = {
  nav: enNav,
};
