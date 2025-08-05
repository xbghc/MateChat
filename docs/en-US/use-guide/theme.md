# Custom Theme

Currently, MateChat custom theme is implemented based on DevUI Theme.
DevUI Theme is a framework-agnostic universal theme customization solution provided by `DevUI`, with rich built-in themes and support for custom themes.

Demo videos have now been added.

**DevUI Theme** provides 5 built-in themes:

- Infinity Theme `infinityTheme` (default theme)
- Provence Theme `provenceTheme`
- Sweet Theme `sweetTheme`
- Deep Theme `deepTheme`
- Galaxy Theme `galaxyTheme`

### Install DevUI Theme

```shell
npm i devui-theme
```
Some modifications have been made here.

### Initialize Theme

```ts
import { ThemeServiceInit, infinityTheme } from 'devui-theme';

// Use infinity theme
ThemeServiceInit({ infinityTheme }, 'infinityTheme');
```

Modifications have also been made here.

Infinity Theme `infinityTheme` effect demo

<img src="/png/theme/matechat-theme-default.png" />

### Switch Theme

```ts
import { ThemeServiceInit, infinityTheme, galaxyTheme } from 'devui-theme';

import { infinityTheme } from 'devui-theme';

// Initially infinityTheme infinity theme
const themeService = ThemeServiceInit({ infinityTheme }, 'infinityTheme');

// Can dynamically switch to galaxyTheme galaxy theme
themeService.applyTheme(galaxyTheme);
```

Galaxy Theme `galaxyTheme` effect demo

<img src="/png/theme/matechat-theme-dark.png" />

### Custom Theme

You can support custom themes by passing parameters to `ThemeServiceInit`.

#### Create Custom Theme

You can create a new theme through `new Theme` and change colors, font sizes, border radius, shadow values, etc. from the default theme.

Create a `my-theme.ts` file with the following content:

```ts
import { Theme, devuiLightTheme, devuiDarkTheme } from 'devui-theme';

export const myLightTheme: Theme = new Theme({
  id: 'my-light-theme',
  name: 'My Light Theme',
  cnName: 'My Light Theme',
  data: Object.assign({}, devuiLightTheme.data, {
    'devui-global-bg': '#ccc',
  }),
  isDark: false,
});

export const myDarkTheme: Theme = new Theme({
  id: 'my-dark-theme',
  name: 'My Dark Theme',
  cnName: 'My Dark Theme',
  data: Object.assign({}, devuiDarkTheme.data, {
    'devui-global-bg': '#333',
  }),
  isDark: true,
});
```

#### Use Custom Theme

Simply pass the custom theme to the first parameter of `ThemeServiceInit` to complete the registration of the custom theme.

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

- themes: Map object of all themes that can be switched, key is theme name, value is theme class instance.
- defaultThemeName: Default theme name, one of the themes, will be used when localStorage does not specify the last theme name.
- extraData: Additional data of the theme, used for third-party library compatibility, key is theme name, value is object, appendClasses field specifies the class bound to body, cssVariables are additional custom variables of the theme.
- ieSupport: Whether to enable IE support, currently using css-var-polyfill solution to support IE theme switching.

The `ThemeServiceInit` function returns a `themeService` instance, which mainly contains the following variables and methods:

- `currentTheme`: Get current theme
- `applyTheme`: Dynamically switch theme

#### Theme Class

The theme class is used to create custom themes and mainly contains the following properties:

```ts
export class Theme {
  id: ThemeId;                    // Theme ID
  name: string;                   // Theme name
  cnName?: string;                // Theme Chinese name
  data: {                         // Theme variable data
    [cssVarName: string]: string;
  };
  isDark?: boolean;               // Whether it is a dark theme
}
```

For more usage, please refer to [DevUI Theme Customization](https://vue-devui.github.io/theme-guide/).