---
title: MarkDown Card API
desc: API reference for the MarkDown Card component
---

### Properties

| Property         | Type                              | Default   | Description                                                   |
| ---------------- | --------------------------------- | --------- | ------------------------------------------------------------- |
| content          | `string`                          | ''        | MarkDown text content                                         |
| theme            | [`Theme`](#theme)                 | 'light'   | MarkDown card theme                                          |
| mdOptions        | `object`                          | {}        | Configure markdown string processing, see [markdown-it](https://www.npmjs.com/package/markdown-it?activeTab=readme) |
| mdPlugins        | [MdPlugin[]](#mdplugin)           | []        | Configure markdown-it plugins                                |
| customXssRules   | [CustomXssRule[]](#customxssrule) | []        | Custom XSS filtering rules for specific tags with whitelisted attributes |
| enableThink      | `boolean`                         | false     | Enable \<think\> tag recognition                            |
| thinkOptions     | [`ThinkOptions`](#thinkoptions)   | --        | \<think\> tag configuration for custom styles              |
| typing           | `boolean`                         | false     | Enable typewriter effect                                     |
| typingOptions    | [`TypingOptions`](#typingoptions) | `{ step: 2, interval: 50, style: 'normal' }` | Typewriter effect configuration |

### Code Block Slots

| Slot        | Return Value | Description                           |
| ----------- | ------------ | ------------------------------------- |
| codeActions | { codeBlockData: [CodeBlockData](#codeblockdata) } | Custom action area in code block header right |
| codeHeader  | { codeBlockData: [CodeBlockData](#codeblockdata) } | Custom code block header area       |
| codeContent | { codeBlockData: [CodeBlockData](#codeblockdata) } | Custom code block content area      |

### Events

| Event          | Return Value | Description                                    |
| -------------- | ------------ | ---------------------------------------------- |
| after-mdt-init | Object       | Returns markdown-it instance mdt after initialization |
| typingStart    | --           | Callback when typing effect starts            |
| typing         | --           | Callback for each step during typing          |
| typingEnd      | --           | Callback when typing effect ends              |

### Type Definitions

#### CustomXssRule

```ts
interface CustomXssRule {
  key: string;
  value: string[] | null;
}
```

#### MdPlugin

```ts
interface MdPlugin {
  plugin: any;
  opts?: Object;
}
```

#### Theme

```ts
type Theme = 'light' | 'dark';
```

#### CodeBlockData

```ts
interface CodeBlockData {
  code: string;
  language: string;
}
```

#### ThinkOptions

```ts
interface ThinkOptions {
  customClass: string;
}
```

#### TypingOptions

```ts
interface TypingOptions {
  step: number | [number, number];  // Can specify step between two numbers
  interval: number;
  style: 'normal' | 'cursor' | 'gradient' | 'color';
}
```