---
title: Prompt 提示
desc: 用于展示一组预定义的问题或建议
iconSrc: '/promptIcon.png'
---

### 参数

| 参数名    | 类型                            | 默认值 | 说明                      |
| --------- | ------------------------------- | ------ | ------------------------- |
| direction | [ListDirection](#listdirection) | ''     | logo 图片地址             |
| list      | [Prompt](#prompt)               | ''     | header 标题               |
| variant   | [ListVariant](#listvariant)     | false  | header 标题区域是否可点击 |

### 事件

| 事件名    | 类型                     | 说明                 |
| --------- | ------------------------ | -------------------- |
| itemClick | `(item: Prompt) => void` | 点击 prompt 时的事件 |

### 类型定义

#### ListDirection

```ts
enum ListDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}
```

#### Prompt

```ts
interface Prompt {
  value: string | number;
  label: string;
  iconConfig?: IconConfig;
  desc?: string;
}

interface IconConfig {
  name: string;
  size?: string;
  color?: string;
  component?: Component; // 支持传入自定义 vue 组件
}
```

#### ListVariant

```ts
enum ListVariant {
  Transparent = 'transparent',
  Filled = 'filled',
  Bordered = 'bordered',
  None = 'none',
}
```
