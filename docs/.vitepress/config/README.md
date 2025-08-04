# VitePress 配置模块化

为了保持配置文件的可维护性，我们将VitePress配置按功能模块拆分：

## 文件结构

```
.vitepress/
├── config.ts           # 主配置文件（入口）
└── config/
    ├── shared.ts        # 基础配置（标题、描述、插件等）
    ├── nav.ts          # 导航配置（中英文导航）
    ├── theme.ts        # 主题配置（侧边栏、主题设置等）
    ├── locales.ts      # 国际化配置
    └── README.md       # 说明文档
```

## 各模块说明

### shared.ts
- 包含网站基础信息（标题、描述、meta等）
- Markdown配置
- Vite插件配置
- 全局设置

### nav.ts
- 统一导航配置 (`navConfig`)
- 自动生成中英文导航
- 支持扩展更多语言

### theme.ts
- 主题配置整合
- 侧边栏配置
- 社交链接等

### locales.ts
- 多语言配置
- 各语言对应的主题配置

## 添加新配置

### 1. 添加新的导航项
编辑 `nav.ts` 中的 `navConfig` 数组：

```typescript
const navConfig: NavConfig[] = [
  // 现有配置...
  {
    text: 'nav.blog',
    zh: '/blog',
    en: '/en-us/blog',
  },
];
```

### 2. 添加新的语言（如法语）
步骤1：在 `nav.ts` 中扩展接口和配置：

```typescript
interface NavConfig {
  text: string;
  zh: string;
  en: string;
  fr: string; // 新增
}

const navConfig: NavConfig[] = [
  {
    text: 'nav.guide',
    zh: '/use-guide/introduction',
    en: '/en-us/use-guide/introduction',
    fr: '/fr/use-guide/introduction', // 新增
  },
  // ...其他配置
];

// 新增法语导航
export const frNav: NavItem[] = generateNav('fr');
```

步骤2：在 `locales.ts` 中添加法语配置：

```typescript
fr: {
  label: 'Français',
  lang: 'fr',
  link: '/fr/',
  themeConfig: frThemeConfig,
},
```

### 3. 修改主题设置
编辑 `theme.ts`

### 4. 添加插件或全局设置
编辑 `shared.ts`

## 优势

- 🏗️ **模块化**：按功能分离，易于维护
- 📝 **可读性**：每个文件职责单一，便于理解
- 🔧 **可扩展**：新增配置不会让主文件变得臃肿
- 🌐 **国际化友好**：语言相关配置独立管理
- 🤝 **团队协作**：减少配置文件冲突