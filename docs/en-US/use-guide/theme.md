# Custom Themes

Currently, MateChat's custom themes are implemented based on DevUI Theme.  
DevUI Theme is a framework-agnostic universal theme customization solution provided by `DevUI`, featuring built-in rich themes and supporting custom themes.

**DevUI Theme** offers 5 built-in themes:

- Infinity Theme `infinityTheme` (default theme)
- Provence Theme `provenceTheme`
- Sweet Theme `sweetTheme`
- Deep Night Theme `deepTheme`
- Galaxy Theme `galaxyTheme`

### Installing DevUI Theme
```shell
npm i devui-theme
```
Made some modifications here

### Initialize Theme
```ts
import { ThemeServiceInit, infinityTheme } from 'devui-theme';
 
// 使用无限主题
ThemeServiceInit({ infinityTheme }, 'infinityTheme');
```
Changes have also been made here.

Infinity Theme `infinityTheme` Demo

<img src="/png/theme/matechat-theme-default.png" />

### Switching Themes
```ts
import { ThemeServiceInit, infinityTheme, galaxyTheme } from 'devui-theme';

import { infinityTheme } from 'devui-theme';
 
// 初始是 infinityTheme 无限主题
const themeService = ThemeServiceInit({ infinityTheme }, 'infinityTheme');
 
// 可以动态切换成 galaxyTheme 追光主题
themeService.applyTheme(galaxyTheme);
```
Galaxy Theme `galaxyTheme` Demo

<img src="/png/theme/matechat-theme-dark.png" />

### Customizing Themes

You can support custom themes by passing parameters to `ThemeServiceInit`.

#### Creating Custom Themes

You can create a new theme using `new Theme` and modify colors, font sizes, border radii, shadow values, etc. from the default theme.

Create a `my-theme.ts` file and write the following content:
```ts
import { Theme, devuiLightTheme, devuiDarkTheme } from 'devui-theme';
 
export const myLightTheme: Theme = new Theme({
  id: 'my-light-theme',
  name: 'My Light Theme',
  cnName: '我的浅色主题',
  data: Object.assign({}, devuiLightTheme.data, {
    'devui-global-bg': '#ccc',
  }),
  isDark: false,
});
 
export const myDarkTheme: Theme = new Theme({
  id: 'my-dark-theme',
  name: 'My Dark Theme',
  cnName: '我的深色主题',
  data: Object.assign({}, devuiDarkTheme.data, {
    'devui-global-bg': '#333',
  }),
  isDark: true,
});
```
#### Using Custom Themes

Simply pass the custom theme as the first parameter to `ThemeServiceInit` to complete the registration of the custom theme.
```ts
import { ThemeServiceInit } from 'devui-theme';
import { myLightTheme, myDarkTheme } from './my-theme';
 
ThemeServiceInit(
  {
    'my-light-theme': myLightTheme,
    'my-dark-theme': myDarkTheme,
  },
  'my-light-theme'
);
```
### API

#### ThemeServiceInit Function

The function definition of `ThemeServiceInit` is as follows:
```ts
ThemeServiceInit(
    themes?: {[themeName: string]: Theme},
    defaultThemeName?: string,
    extraData?: {[themeName: string]: {
      appendClasses?: Array<string>,
      cssVariables?: {
        [cssVarName: string]: string
      }
    }},
    ieSupport = true
): ThemeService;
```
- themes: A Map object containing all available themes for switching, where the key is the theme name and the value is an instance of the theme class.
- defaultThemeName: The default theme name, which must be one of the keys in `themes`. This will be used when no previous theme name is specified in localStorage.
- extraData: Additional theme data for third-party library compatibility. The key is the theme name, and the value is an object. The `appendClasses` field specifies the classes bound to the body, while `cssVariables` contains additional custom variables for the theme.
- ieSupport: Whether to enable IE support. Currently, the `css-var-polyfill` solution is used to support theme switching in IE.

The `ThemeServiceInit` function returns a `themeService` instance, which mainly includes the following variables and methods:

- `currentTheme`: Gets the current theme
- `applyTheme`: Dynamically switches themes

#### Theme Class

The Theme class is used to create custom themes and primarily includes the following properties:
```ts
export class Theme {
  id: ThemeId;                    // 主题ID
  name: string;                   // 主题名称
  cnName?: string;                // 主题中文名称
  data: {                         // 主题变量数据
    [cssVarName: string]: string;
  };
  isDark?: boolean;               // 是否是深色主题
}
```
For more usage, please refer to [DevUI Theme Customization](https://vue-devui.github.io/theme-guide/).